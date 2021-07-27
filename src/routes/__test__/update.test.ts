import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

const id = new mongoose.Types.ObjectId().toHexString();

it('returns a 404 if boat is not found', async () => {
  await request(app)
    .put(`/api/boats/${id}`)
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
    .expect(404);
});

it('returns a 401 if the request is unauthorized', async () => {
  await request(app)
    .put(`/api/boats/${id}`)
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
    .expect(401);
});

it('returns error is the boat is already reserved', async () => {
  const response = await request(app)
    .post(`/api/boats`)
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
      orderId: '23747626ssjsjsoioi838672',
    })
    .expect(201);

  console.log(response.body);

  await request(app)
    .put(`/api/boats/${response.body.id}`)
    //@ts-ignore
    .set('Cookie', global.signin())
    .send({
      boatType: 'Mercedez',
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
    .expect(400);
});
