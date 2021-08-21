import { Message } from 'node-nats-streaming';
import { Listener, OrderCreatedEvent, Subjects } from '@hireaboat/common';
import { queueGroupName } from './queueGroupName';
import { Boat } from '../../models/boat';
import { BoatUpdatedPublisher } from '../publishers/boat-updated-publisher';
import { natsWrapper } from '../../nats-wrapper';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    // Find the boat that the order is reserving
    const boat = await Boat.findById(data.boat.id);

    // If no boat, throw error
    if (!boat) {
      throw new Error('Boat not found');
    }

    // Mark the boat has being reserved by setting its orderId property
    boat.set({ orderId: data.id });

    // Save the boat
    await boat.save();
    await new BoatUpdatedPublisher(natsWrapper.client).publish({
      id: boat.id,
      version: boat.version,
      userId: boat.userId,
      orderId: boat.orderId,
      bathrooms: boat.bathrooms,
      boatCapicity: boat.boatCapicity,
      boatDescription: boat.boatDescription,
      boatHarbour: boat.boatHarbour,
      boatManufacturer: boat.boatManufacturer,
      boatModel: boat.boatModel,
      boatType: boat.boatType,
      cabins: boat.cabins,
      captain: boat.captain,
      city: boat.city,
      lengthOfBoat: boat.lengthOfBoat,
      photos: boat.photos,
      price: boat.price,
    });

    //ack message
    msg.ack();
  }
}
