const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const companyService = require('./company.service');
const { addMentorToCompany } = require('./company.service');

// routes
router.post('/authenticate', authenticateSchema, authenticate);
router.post('/revoke-token', authorize(), revokeTokenSchema, revokeToken);
router.get('/',authorize(), getAll);
router.get('/:id', authorize(), getById);
router.post('/', authorize(), createSchema, create);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);
router.post('/hours/:id', authorize(), checkHoursSchema, createHours);

module.exports = router;    

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    const { email, password } = req.body;
    const ipAddress = req.ip;
    companyService.authenticate({ email, password, ipAddress })
        .then(({ refreshToken, ...account }) => {
            setTokenCookie(res, refreshToken);
            res.json(account);
        })
        .catch(next);
}

function revokeTokenSchema(req, res, next) {
    const schema = Joi.object({
        token: Joi.string().empty('')
    });
    validateRequest(req, next, schema);
}

function revokeToken(req, res, next) {
    // accept token from request body or cookie
    const token = req.body.token || req.cookies.refreshToken;
    const ipAddress = req.ip;

    if (!token) return res.status(400).json({ message: 'Token is required' });

    // users can revoke their own tokens and admins can revoke any tokens
    if (!req.user.ownsToken(token) && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    companyService.revokeToken({ token, ipAddress })
        .then(() => res.json({ message: 'Token revoked' }))
        .catch(next);
}


function getAll(req, res, next) {
    companyService.getAll()
        .then(company => res.json(company))
        .catch(next);
}

function getById(req, res, next) {
    // users can get their own account and admins can get any account
    //Mentors must be able to get one accountById
    if (req.params.id !== req.user.id && req.user.role !== Role.Admin && req.user.role !== Role.Mentor) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    companyService.getById(req.params.id)
        .then(company => company ? res.json(company) : res.sendStatus(404))
        .catch(next);
}

function checkHoursSchema(req, res, next){
    const schema = Joi.object({
        hoursUsed: Joi.number().required(),
        date: Joi.date().required(),
    });

    validateRequest(req, next, schema); 
}

function createHours(req, res, next) {
    
    companyService.createHours({...req.body, user:req.user, id:req.params.id})
        .then(company => res.json(company))
        .catch(next);
}

function createPowerRanking(req, res, next) {
    
    companyService.createPowerRankingCompany({...req.body, user:req.user, id:req.params.id})
        .then(company => res.json(company))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        companyName: Joi.string().required(),
        companyNumber: Joi.string().required(),
        tlfNumber: Joi.string().required(),
        email: Joi.string().email().required(),
        salesRevenue: Joi.string().required(),
        companyDescription: Joi.string().required(),
        phase: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    companyService.create({...req.body, user:req.user})
        .then(company => res.json(company))
        .catch(next);
}


function updateSchema(req, res, next) {
    const schemaRules = {
        companyName: Joi.string().required(),
        companyNumber: Joi.string().required(),
        tlfNumber: Joi.string().required(),
        email: Joi.string().email().required(),
        salesRevenue: Joi.string().required(),
        companyDescription: Joi.string().required(),
        phase: Joi.string().required()
    };

    // only admins can update mentor
    if (req.user.role === Role.Admin) {
        schemaRules.mentor = Joi.string();
    }

    const schema = Joi.object(schemaRules);
    validateRequest(req, next, schema);
}

function update(req,res,next) {
    companyService.addMentorToCompany(req.body.mentor,req.params.id);
    companyService.update(req.params.id,req.body)
        .then(company => res.json(company))
        .catch(next);
        
}




function _delete(req, res, next) {
    // users can delete their own account and admins can delete any account
    if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    companyService.delete(req.params.id)
        .then(() => res.json({ message: 'Account deleted successfully' }))
        .catch(next);
}

