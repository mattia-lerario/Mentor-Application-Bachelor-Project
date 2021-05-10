
const accountDatabse = require("../accounts/account.model.js")

const supertest = require("supertest");

const server = require("../server.js");

// deleting users so tests can be run again
const resetDB = async () => accountDatabse.collection.drop();
  
  const admin = {
    title: 'Mr',
    firstName: 'test',
    lastName: 'test',
    email: 'test@testing.com',
    password: 'password',
    confirmPassword: 'password',
    role:'Admin'
  };

  const companyUser = {
    title: 'Mr',
    firstName: 'testCompany',
    lastName: 'testCompany',
    email: 'test@company.com',
    password: 'password',
    confirmPassword: 'password',
    role:'Company'
  };

  const mentorUser = {
    title: 'Mrs',
    firstName: 'testMentor',
    lastName: 'testMentor',
    email: 'test@mentor.com',
    password: 'password',
    confirmPassword: 'password',
    role:'Company'
  };


  //-----------------------------------------------------------Register test-------------------------------------------------------
//Register Admin user
it('register a new admin account should give 200', async () => {
    /*try {
      await resetDB();
      console.log('DB does exist')
    } catch (error) {
      console.log('DB does not yet exist, skipping collection dropping')
    }*/

    const registerNew = await supertest(server).post('/accounts/create').send({title: admin.title, firstName: admin.firstName, lastName: admin.lastName, email: admin.email, password: admin.password, confirmPassword: admin.confirmPassword, role: admin.role});
  
    expect(registerNew.status).toEqual(200);
  });

  //Register CompanyUser
  it('register a new company account should give 200', async () => {

    const registerNewCompany = await supertest(server).post('/accounts/create').send({title: companyUser.title, 
        firstName: companyUser.firstName, lastName: companyUser.lastName, 
        email: companyUser.email, password: companyUser.password, 
        confirmPassword: companyUser.confirmPassword, role: companyUser.role});
  
    expect(registerNewCompany.status).toEqual(200);
  });

//Register MentorUser
  it('register a new mentor should give 200', async () => {

    const registerNewMentor = await supertest(server).post('/accounts/create').send({title: mentorUser.title, firstName: mentorUser.firstName, lastName: mentorUser.lastName, email: mentorUser.email, password: mentorUser.password, confirmPassword: mentorUser.confirmPassword, role: mentorUser.role});
  
    expect(registerNewMentor.status).toEqual(200);
  });

  //Failed create
  it('register a new user should give error 500', async () => {
    
    const registerNewCompany = await supertest(server).post('/accounts/create').send({firstName: admin.firstName, lastName: admin.lastName, email: admin.email, password: admin.password, confirmPassword: admin.confirmPassword, role: admin.role});
  
    expect(registerNewCompany.status).toEqual(500);
  });


//-----------------------------------------------------------Log in test---------------------------------------------

let token = "";
let accountId ="";
let accountMentorId ="";
let accountCompanyId ="";

it('Registered user should login with right credentials', async () => {
   
    const data = await supertest(server).post("/accounts/authenticate").send({email: admin.email, password: admin.password}).expect(200);
    //console.log(data.body);
    token = data.body.jwtToken;
    accountId = data.body.id;
})

it('Registered company user should login with right credentials', async () => {
   
    const companyData = await supertest(server).post("/accounts/authenticate").send({email: companyUser.email, password: companyUser.password}).expect(200);
    //console.log(data.body);
    token = companyData.body.jwtToken;
    accountCompanyId = companyData.body.id;
})

it('Registered mentor user should login with right credentials', async () => {
   
    const mentorData = await supertest(server).post("/accounts/authenticate").send({email: mentorUser.email, password: mentorUser.password}).expect(200);
    //console.log(data.body);
    token = mentorData.body.jwtToken;
    accountMentorId = mentorData.body.id;
})

it('Registered user should not login with wrong credentials', async () => {
   
    const data1 = await supertest(server).post("/accounts/authenticate").send({email: "t", password: "t"}).expect(500);
    //console.log(data);
});


  //-----------------------------------------------Update test----------------------------------------------

  it('Account should be updated and respond with the status of 200', async () => {
   
    const data = await supertest(server).put("/accounts/update/" + accountId).send({firstName: admin.firstName, lastName: admin.lastName, email: admin.email, password: admin.password, confirmPassword: admin.confirmPassword, role: admin.role}).expect(200);
    //console.log(data);
});

it('Tries to update with missing credentials, should respond with 500', async () => {
   
    const data = await supertest(server).put("/accounts/update/" + accountId).send({lastName: 1, email: admin.email, password: admin.password, confirmPassword: admin.confirmPassword}).expect(500);
    //console.log(data);
});

it('Update unsimilar password, should respond with 500', async () => {
   
    const data = await supertest(server).put("/accounts/update/" + accountId).send({password: admin.password, confirmPassword: admin.confirmPassword +"d"}).expect(500);
    //console.log(data);
});


//-----------------------------------------Delete test----------------------------------------------------------------------
it('Registered admin should be deleted from the system', async () => {
    console.log("Admin   " + accountMentorId);
    const data = await supertest(server).delete("/accounts/"+ accountId).expect(200);
    
});

it('Registered company should be deleted from the system', async () => {

    const data = await supertest(server).delete("/accounts/"+ accountCompanyId).expect(200);
    //console.log(data);
});

it('Registered mentor should be deleted from the system', async () => {
    console.log("Mentor  "+ accountMentorId);
    const data = await supertest(server).delete("/accounts/"+ accountMentorId).expect(200);
    //console.log(data);
});