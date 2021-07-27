import request from 'supertest';
import { app } from '../../app';

const createBoats = async () => {
  await request(app)
    .post('/api/boats')
    //@ts-ignore
    .set('Cookie', global.signin())
    .send({
      boatType: 'Volkswagen',
      boatManufacturer: 'Passat',
      boatModel: 'ML350',
      city: 'Lagos',
      boatHarbour: 'Lekki',
      captain: true,
      price: 1000,
      cabins: 10,
      bathrooms: 2,
      lengthOfBoat: 100,
      boatCapicity: 30,
      boatDescription: 'A very good boat!!!',
      photos: ['skhdhfgywefuh'],
    })
    .expect(201);
};

it('has a route handler to /api/boats for get request', async () => {
  await request(app).get('/api/boats').send().expect(200);
});

it('can fetch a list of boats', async () => {
  await createBoats();
  await createBoats();
  await createBoats();

  const response = await request(app).get('/api/boats').send().expect(200);

  expect(response.body.length).toEqual(3);
});
