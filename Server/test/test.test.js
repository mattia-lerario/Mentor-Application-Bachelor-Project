//const express = require( "express");
const supertest = require("supertest");
//const app = express;

const server = require("../server.js");
const admin = {
    email: "testadmin@testadmin.com",
    password: "testadmin"
};
let token = "";

it('Should login with right credentials', async () => {
    const data = await supertest(server.app).post("/account/authenticate").send({email: admin.email, password: admin.password}).expect(200);
    console.log(data);
})