import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Boat } from '../../models/boat';

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

it('returns a 401 if the user is not authenticated', async () => {
  await request(app)
    .put(`/api/boats/${id}`)
    //@ts-ignore
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

it('returns a 401 if the user does not own the boat', async () => {
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
    })
    .expect(201);

  await request(app)
    .put(`/api/boats/${response.body.id}`)
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
    .expect(401);
});

it('returns a 400 if user provides an invalid input', async () => {
  //@ts-ignore
  const cookie = global.signin();
  const response = await request(app)
    .post(`/api/boats`)
    //@ts-ignore
    .set('Cookie', cookie)
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

  await request(app)
    .put(`/api/boats/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      boatType: '',
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

  await request(app)
    .put(`/api/boats/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      boatType: 'Mercedez',
      boatManufacturer: '',
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

  await request(app)
    .put(`/api/boats/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      boatType: 'Mercedez',
      boatManufacturer: 'Passat',
      boatModel: '',
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

  await request(app)
    .put(`/api/boats/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      boatType: 'Mercedez',
      boatManufacturer: 'Passat',
      boatModel: 'ML350',
      city: '',
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

  await request(app)
    .put(`/api/boats/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      boatType: 'Mercedez',
      boatManufacturer: 'Passat',
      boatModel: 'ML350',
      city: 'Lagos',
      boatHarbour: '',
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

  await request(app)
    .put(`/api/boats/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      boatType: 'Mercedez',
      boatManufacturer: 'Passat',
      boatModel: 'ML350',
      city: 'Lagos',
      boatHarbour: 'Lekki',
      captain: '',
      price: 1000,
      cabins: 10,
      bathrooms: 2,
      lengthOfBoat: 100,
      boatCapicity: 30,
      boatDescription: 'A very good boat!!!',
      photos: ['skhdhfgywefuh'],
    })
    .expect(400);

  await request(app)
    .put(`/api/boats/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      boatType: 'Mercedez',
      boatManufacturer: 'Passat',
      boatModel: 'ML350',
      city: 'Lagos',
      boatHarbour: 'Lekki',
      captain: true,
      price: -1000,
      cabins: 10,
      bathrooms: 2,
      lengthOfBoat: 100,
      boatCapicity: 30,
      boatDescription: 'A very good boat!!!',
      photos: ['skhdhfgywefuh'],
    })
    .expect(400);

  await request(app)
    .put(`/api/boats/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      boatType: 'Mercedez',
      boatManufacturer: 'Passat',
      boatModel: 'ML350',
      city: 'Lagos',
      boatHarbour: 'Lekki',
      captain: true,
      price: 1000,
      cabins: -10,
      bathrooms: 2,
      lengthOfBoat: 100,
      boatCapicity: 30,
      boatDescription: 'A very good boat!!!',
      photos: ['skhdhfgywefuh'],
    })
    .expect(400);

  await request(app)
    .put(`/api/boats/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      boatType: 'Mercedez',
      boatManufacturer: 'Passat',
      boatModel: 'ML350',
      city: 'Lagos',
      boatHarbour: 'Lekki',
      captain: true,
      price: 1000,
      cabins: 10,
      bathrooms: -2,
      lengthOfBoat: 100,
      boatCapicity: 30,
      boatDescription: 'A very good boat!!!',
      photos: ['skhdhfgywefuh'],
    })
    .expect(400);

  await request(app)
    .put(`/api/boats/${response.body.id}`)
    .set('Cookie', cookie)
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
      lengthOfBoat: -100,
      boatCapicity: 30,
      boatDescription: 'A very good boat!!!',
      photos: ['skhdhfgywefuh'],
    })
    .expect(400);

  await request(app)
    .put(`/api/boats/${response.body.id}`)
    .set('Cookie', cookie)
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
      boatCapicity: -30,
      boatDescription: 'A very good boat!!!',
      photos: ['skhdhfgywefuh'],
    })
    .expect(400);

  await request(app)
    .put(`/api/boats/${response.body.id}`)
    .set('Cookie', cookie)
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
      boatDescription: '',
      photos: ['skhdhfgywefuh'],
    })
    .expect(400);

  await request(app)
    .put(`/api/boats/${response.body.id}`)
    .set('Cookie', cookie)
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
      photos: [],
    })
    .expect(400);
});

it('returns error if the boat is already reserved', async () => {
  //@ts-ignore
  const signin = global.signin();
  const response = await request(app)
    .post(`/api/boats`)
    .set('Cookie', signin)
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

  const boat = await Boat.findById(response.body.id);

  boat!.set({
    orderId: new mongoose.Types.ObjectId().toHexString(),
  });

  const dbResponse = await boat!.save();

  await request(app)
    .put(`/api/boats/${response.body.id}`)
    .set('Cookie', signin)
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

it('returns a response after updating the boat', async () => {
  //@ts-ignore
  const cookie = global.signin();
  const response = await request(app)
    .post(`/api/boats`)
    //@ts-ignore
    .set('Cookie', cookie)
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
    .put(`/api/boats/${response.body.id}`)
    .set('Cookie', cookie)
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
    .expect(200);

  expect(boatResponse.body.boatType).toEqual('Mercedez');
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
