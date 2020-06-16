import { expect, server, BASE_URL } from './setup';

describe('Index page test', () => {
  it('gets base url', done => {
    server
      .get('/')
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal(
          'Environment variable is coming across'
        );
        done();
      });
  });
  it('get all items', done => {
    server
      .get(`${BASE_URL}/items`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.items).length.to.be.above(1);
        done();
      });
  });
  
  it('post new item', done => {
    server
      .post(`${BASE_URL}/items`)
	  .send({name:'test1', price:"1.23", id:3})
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  
  it('get item with id', done => {
	var item = {id: '3'};
    server
      .get(`${BASE_URL}/items/` + item.id)
      .expect(200)
      .end((err, res) => {
		expect(res.status).to.equal(200);
        expect(res.body.items[0].name).to.equal('test1');
        done();
      });
  });
  
  it('delete item with id', done => {
	var item = {id: '3'};
    server
      .delete(`${BASE_URL}/items/` + item.id)
      .expect(200)
      .end((err, res) => {
		expect(res.status).to.equal(200);
        expect(res.body.items[0].name).to.equal('test1');
        done();
      });
  });
  
});
