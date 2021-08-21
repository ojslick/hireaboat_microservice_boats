import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { OrderCreatedListener } from '../order-created-listener';
import { OrderCreatedEvent, OrderStatus } from '@hireaboat/common';
import { natsWrapper } from '../../../nats-wrapper';
import { Boat } from '../../../models/boat';

const setup = async () => {
  // Create an instance of the listener
  const listener = new OrderCreatedListener(natsWrapper.client);

  // Create and save a ticket
  const boat = Boat.build({
    userId: new mongoose.Types.ObjectId().toHexString(),
    boatType: 'gnfghg',
    boatManufacturer: 'hjsdjhsd',
    boatModel: 'sjhdhjsdhj',
    city: 'hahdsjhdh',
    boatHarbour: 'hsjdhsjhui',
    captain: true,
    price: 1000,
    cabins: 546,
    bathrooms: 67,
    lengthOfBoat: 876,
    boatCapicity: 56,
    boatDescription: 'smdhjshd',
    photos: ['shhdhjf'],
  });

  await boat.save();

  // Create the fake data event
  const data: OrderCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: 'nnsdfhj',
    bookingAmount: 1000,
    startDate: '2021/08/18',
    endDate: '2021/08/20',
    boat: {
      id: boat.id,
      userId: boat.userId,
      boatType: boat.boatType,
      boatManufacturer: boat.boatManufacturer,
      boatModel: boat.boatModel,
      city: boat.city,
      boatHarbour: boat.boatHarbour,
      captain: boat.captain,
      price: boat.price,
      cabins: boat.cabins,
      bathrooms: boat.bathrooms,
      lengthOfBoat: boat.lengthOfBoat,
      boatCapicity: boat.boatCapicity,
      boatDescription: boat.boatDescription,
      photos: boat.photos,
    },
  };

  //@ts-ignore
  // Ack message
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, boat, data, msg };
};

it('sets the userId of the boat', async () => {
  const { listener, boat, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedBoat = await Boat.findById(boat.id);

  expect(updatedBoat!.orderId).toEqual(data.id);
});
