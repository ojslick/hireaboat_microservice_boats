import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns a 404 if the boat is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app).get(`/api/boats/${id}`).expect(404);
});

it('returns the boat if the boats is found', async () => {
  const response = await request(app)
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

  const boatResponse = await request(app)
    .get(`/api/boats/${response.body.id}`)
    .send()
    .expect(200);

  expect(boatResponse.body.boatType).toEqual('Volkswagen');
  expect(boatResponse.body.boatManufacturer).toEqual('Passat');
  expect(boatResponse.body.boatModel).toEqual('ML350');
  expect(boatResponse.body.city).toEqual('Lagos');
  expect(boatResponse.body.boatHarbour).toEqual('Lekki');
  expect(boatResponse.body.captain).toEqual(true);
  expect(boatResponse.body.price).toEqual(1000);
  expect(boatResponse.body.cabins).toEqual(10);
  expect(boatResponse.body.bathrooms).toEqual(2);
  expect(boatResponse.body.lengthOfBoat).toEqual(100);
  expect(boatResponse.body.boatCapicity).toEqual(30);
  expect(boatResponse.body.boatDescription).toEqual('A very good boat!!!');
  expect(boatResponse.body.photos[0]).toEqual('skhdhfgywefuh');
});
