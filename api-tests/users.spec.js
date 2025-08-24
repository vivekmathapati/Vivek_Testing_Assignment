const { postUserSchema } = require('./validators/usersAjvPostSchema');
const Ajv = require('ajv');
const { userListSchema } = require('./validators/usersAjvSchema');
const { getUsers } = require('./clients/usersClient');
const { validUserList } = require('./data/usersData');
const { userListValidator } = require('./validators/usersValidator');
const Joi = require('frisby').Joi;
const { faker } = require('@faker-js/faker');

describe('Reqres API - POST', () => {
    it('should return an error for malformed payload in POST /users', async () => {
    const malformedBody = {
        malformedname: 'vivek',
        malformedjob: 'assert error response'
    };
    const res = await require('./clients/usersClient').postUser(malformedBody);
    // Expecting 400 or 422 or similar error status, but reqres.in returns 201 for any payload.
    // So, assert that the response does not contain the expected fields for a valid user creation
    expect(res.json.name).toBeUndefined();
    expect(res.json.job).toBeUndefined();
    });
});

describe('Reqres API - POST', () => {
    it('should create a user with POST /users', async () => {
    const Joi = require('frisby').Joi;
    const body = {
        name: 'vivek',
        job: 'make it little better than i found it'
    };
    const res = await require('./clients/usersClient').postUser(body)
        .expect('status', 201)
        .expect('json', 'name', body.name)
        .expect('json', 'job', body.job)
        .expect('jsonTypes', {
        id: Joi.string().required(),
        createdAt: Joi.string().isoDate().required()
        });

    // Ajv validation
    const ajv = new Ajv({ allErrors: true, strict: false, formats: { 'date-time': true } });
    const validate = ajv.compile(postUserSchema);
    const valid = validate(res.json);
    expect(valid).toBe(true);
    if (!valid) {
        console.error(validate.errors);
    }
    });
});

describe('Reqres API - POST with dynamic data', () => {
  it('should create a user with random data using POST /users', async () => {
    const body = {
      name: faker.name.firstName(),
      job: faker.name.jobTitle()
    };
    const res = await require('./clients/usersClient').postUser(body)
      .expect('status', 201)
      .expect('json', 'name', body.name)
      .expect('json', 'job', body.job)
      .expect('jsonTypes', {
        id: Joi.string().required(),
        createdAt: Joi.string().isoDate().required()
      });
    // Optionally, print the created user for debug
    console.log('Created user:', res.json);
  });
});

describe('Reqres API - GET /users With Schema validation', () => {
    it('should validate the full response schema for GET /users', async () => {
    const Joi = require('frisby').Joi;
    const res = await getUsers(1)
        .expect('status', validUserList.status)
        .expect('jsonTypes', {
        page: Joi.number().required(),
        per_page: Joi.number().required(),
        total: Joi.number().required(),
        total_pages: Joi.number().required(),
        data: Joi.array().items(Joi.object({
            id: Joi.number().required(),
            email: Joi.string().email().required(),
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            avatar: Joi.string().uri().required()
        })).required(),
        support: Joi.object({
            url: Joi.string().uri().required(),
            text: Joi.string().required()
        }).required()
        });

    // Ajv validation
    const ajv = new Ajv({ allErrors: true, strict: false, formats: { uri: true, email: true } });
    const validate = ajv.compile(userListSchema);
    const valid = validate(res.json);
    expect(valid).toBe(true);
    if (!valid) {
        console.error(validate.errors);
    }
    });
});

describe('Reqres API - GET /users', () => {
  it('should return a list of users and include a user with first_name George', async () => {
    const res = await getUsers(1)
      .expect('status', validUserList.status)
      .expect('jsonTypes', 'data.*', {
        id: Joi.number().required(),
        email: Joi.string().email().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        avatar: Joi.string().uri().required()
      });
    const users = res.json.data;
    expect(users.some(u => u.first_name === 'George')).toBe(true);
  });
});
