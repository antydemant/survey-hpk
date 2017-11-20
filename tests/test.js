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

describe('/POST result', () => {
  it('it should not POST a result without a mark', (done) => {
    let result = {
      title: "Maths",
      student: "Ivanov",
      class: 5
    }
    chai.request(server)
    .post('/result')
    .send(result)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('errors');
      res.body.errors.should.have.property('mark');
      res.body.errors.pages.should.have.property('kind').eql('required');
      done();
    });
  });

});

it('it should POST a result ', (done) => {
  let result = {
    title: "UkrMova",
    student: "Ivanov",
    class: 5,
    mark: 12
  }
  chai.request(server)
  .post('/result')
  .send(result)
  .end((err, res) => {
    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.should.have.property('message').eql('Result successfully added!');
    res.body.result.should.have.property('title');
    res.body.result.should.have.property('student');
    res.body.result.should.have.property('class');
    res.body.result.should.have.property('mark');
    done();
  });
});

describe('/GET/:id result', () => {
      it('it should GET a result by the given id', (done) => {
        let result = new Result({ title: "Geometry", student: "Antonov", class: 11, mark: 11 });
        result.save((err, result) => {
            chai.request(server)
            .get('/result/' + result.id)
            .send(result)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('student');
                res.body.should.have.property('class');
                res.body.should.have.property('mark');
                res.body.should.have.property('_id').eql(book.id);
              done();
            });
        });

      });
  });

describe('/DELETE/:id result', () => {
      it('it should DELETE a result given the id', (done) => {
        let result = new Result({title: "Chemistry", student: "Petrov", class: 9, mark: 6})
        result.save((err, result) => {
                chai.request(server)
                .delete('/result/' + result.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Book successfully deleted!');
                    res.body.result.should.have.property('ok').eql(1);
                    res.body.result.should.have.property('n').eql(1);
                  done();
                });
          });
      });
  });