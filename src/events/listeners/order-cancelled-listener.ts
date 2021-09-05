import { Message } from 'node-nats-streaming';
import { Listener, OrderCancelledEvent, Subjects } from '@hireaboat/common';
import { queueGroupName } from './queueGroupName';
import { Boat } from '../../models/boat';
import { BoatUpdatedPublisher } from '../publishers/boat-updated-publisher';
import { natsWrapper } from '../../nats-wrapper';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    // Find the boat that the order is cancelling
    const boat = await Boat.findById(data.boat.id);

    // If no boat, throw error
    if (!boat) {
      throw new Error('Boat not found');
    }

    // Mark the boat as undefined by setting its orderId property
    boat.set({ orderId: undefined });

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
