const { describe, it } = require('mocha');
const sinon = require('sinon');
const { expect } = require('chai');
const crypto = require('crypto');

const sanitizer = require('./index');

const sandbox = sinon.createSandbox();

describe('Sanitizer', () => {
  let email;
  let password;
  let name;
  let hashedEmail;
  let hashedPassword;
  let obj;

  beforeEach(() => {
    email = 'syuaibi@gmail.com';
    password = 'demo123';
    name = 'Suhendra Ahmad';
    hashedEmail = crypto.createHash('sha256').update(email).digest('hex');
    hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    obj = { email, password, name };
  });

  afterEach(() => sandbox.restore());

  it('should sanitize object', () => {
    const sanitizedObj = sanitizer(obj, ['email', 'password']);

    expect(sanitizedObj).to.have.property('email');
    expect(sanitizedObj).to.have.property('password');
    expect(sanitizedObj).to.have.property('name');
    expect(sanitizedObj.email).equal(hashedEmail);
    expect(sanitizedObj.password).equal(hashedPassword);
    expect(sanitizedObj.name).equal(name);
  });

  it('should not sanitize object when fields is not supplied', () => {
    const sanitizedObj = sanitizer(obj);
    
    expect(sanitizedObj).to.have.property('email');
    expect(sanitizedObj).to.have.property('password');
    expect(sanitizedObj).to.have.property('name');
    expect(sanitizedObj.email).equal(email);
    expect(sanitizedObj.password).equal(password);
    expect(sanitizedObj.name).equal(name);
  });

  it('should not sanitize object when fields is not available in objects', () => {
    const sanitizedObj = sanitizer(obj, ['somefield']);
    
    expect(sanitizedObj).to.have.property('email');
    expect(sanitizedObj).to.have.property('password');
    expect(sanitizedObj).to.have.property('name');
    expect(sanitizedObj.email).equal(email);
    expect(sanitizedObj.password).equal(password);
    expect(sanitizedObj.name).equal(name);
  });
});
