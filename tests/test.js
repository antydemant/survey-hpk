//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Book = require('../app/models/book');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
describe('Results', () => {
    beforeEach((done) => { 
        Book.remove({}, (err) => { 
           done();         
        });     
    });

  describe('/GET result', () => {
      it('it should GET all the tests' results, (done) => {
        chai.request(server)
            .get('/result')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });

});
