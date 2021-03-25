const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const mentorService = require('./mentor.service');
//const accountService = require('../accounts/account.service');

// routes
router.post('/authenticate', authenticateSchema, authenticate);
router.post('/revoke-token', authorize(), revokeTokenSchema, revokeToken);
router.get('/',authorize(), getAll);
router.get('/:id', authorize(), getById);
router.post('/', authorize(), createSchema, create);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

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
    mentorService.authenticate({ email, password, ipAddress })
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

    mentorService.revokeToken({ token, ipAddress })
        .then(() => res.json({ message: 'Token revoked' }))
        .catch(next);
}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
        acceptTerms: Joi.boolean().valid(true).required()
    });
    validateRequest(req, next, schema);

}function refreshToken(req, res, next) {
    const token = req.cookies.refreshToken;
    const ipAddress = req.ip;
    mentorService.refreshToken({ token, ipAddress })
        .then(({ refreshToken, ...mentor }) => {
            setTokenCookie(res, refreshToken);
            res.json(mentor);
        })
        .catch(next);
}

function register(req, res, next) {
    mentorService.register(req.body, req.get('origin'))
        .then(() => res.json({ message: 'Registration successful, please check your email for verification instructions' }))
        .catch(next);
}

function verifyEmailSchema(req, res, next) {
    const schema = Joi.object({
        token: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function verifyEmail(req, res, next) {
    mentorService.verifyEmail(req.body)
        .then(() => res.json({ message: 'Verification successful, you can now login' }))
        .catch(next);
}

function forgotPasswordSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().email().required()
    });
    validateRequest(req, next, schema);
}

function forgotPassword(req, res, next) {
    mentorService.forgotPassword(req.body, req.get('origin'))
        .then(() => res.json({ message: 'Please check your email for password reset instructions' }))
        .catch(next);
}

function validateResetTokenSchema(req, res, next) {
    const schema = Joi.object({
        token: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function validateResetToken(req, res, next) {
    mentorService.validateResetToken(req.body)
        .then(() => res.json({ message: 'Token is valid' }))
        .catch(next);
}

function resetPasswordSchema(req, res, next) {
    const schema = Joi.object({
        token: Joi.string().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    });
    validateRequest(req, next, schema);
}

function resetPassword(req, res, next) {
    mentorService.resetPassword(req.body)
        .then(() => res.json({ message: 'Password reset successful, you can now login' }))
        .catch(next);
}

function getAll(req, res, next) {
    mentorService.getAll()
        .then(mentor => res.json(mentor))
        .catch(next);
}

function getById(req, res, next) {
    // users can get their own account and admins can get any account
    if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    mentorService.getById(req.params.id)
        .then(mentor => mentor ? res.json(mentor) : res.sendStatus(404))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        mentorName: Joi.string().required(),
        mentorNumber: Joi.string().required(),
        tlfNumber: Joi.string().required(),
        email: Joi.string().email().required(),
        mentorDescription: Joi.string().min(6).required(),
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    mentorService.create({...req.body, user:req.user})
        .then(mentor => res.json(mentor))
        .catch(next);
   // accountService.addMentorToAccount({})
}

function updateSchema(req, res, next) {
    const schemaRules = {
        mentorName: Joi.string().empty(''),
        mentorNumber: Joi.string().empty(''),
        tlfNumber: Joi.string().empty(''),
        email: Joi.string().email().empty(''),
        mentorDescription: Joi.string().empty('')
    };
  
    const schema = Joi.object(schemaRules).with('password', 'confirmPassword');
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    
   // console.log("params ", req.params);
    mentorService.update(req.params.id,req.body)
        .then(mentor => res.json(mentor))
        .catch(next);
}

function _delete(req, res, next) {
    // users can delete their own mentor and admins can delete any mentor
    if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    mentorService.delete(req.params.id)
        .then(() => res.json({ message: 'mentor deleted successfully' }))
        .catch(next);
}

// helper functions

function setTokenCookie(res, token) {
    // create cookie with refresh token that expires in 7 days
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 7*24*60*60*1000)
    };
    res.cookie('refreshToken', token, cookieOptions);
}