import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Boat } from '../../models/boat';

it('returns a 401 if the user is not authenticated', async () => {
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

  await request(app)
    .delete(`/api/boats/${response.body.id}`)
    .send()
    .expect(401);
});

it('returns a 404 if the boat is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .delete(`/api/boats/${id}`)
    //@ts-ignore
    .set('Cookie', global.signin())
    .send()
    .expect(404);
});

it('returns 400 if the boat is already reserved', async () => {
  //@ts-ignore
  const cookie = global.signin();
  const response = await request(app)
    .post('/api/boats')
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

  const boat = await Boat.findById(response.body.id);

  boat!.set({
    orderId: mongoose.Types.ObjectId().toHexString(),
  });

  boat!.save();

  await request(app)
    .delete(`/api/boats/${response.body.id}`)
    .set('Cookie', cookie)
    .send()
    .expect(400);
});

it('returns a 401 if the user does not own the boat', async () => {
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

  await request(app)
    .delete(`/api/boats/${response.body.id}`)
    //@ts-ignore
    .set('Cookie', global.signin())
    .send()
    .expect(401);
});
