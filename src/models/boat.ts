import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

// An interface that describes the properties that are required to create a new user
interface BoatAttrs {
  boatType: string;
  boatManufacturer: string;
  boatModel: string;
  city: string;
  boatHarbour: string;
  captain: boolean;
  price: number;
  cabins: number;
  bathrooms: number;
  lengthOfBoat: number;
  boatCapicity: number;
  boatDescription: string;
  photos: string[];
  userId: string;
}

// An interface that describes the properties that a user model has.
interface BoatModel extends mongoose.Model<BoatDoc> {
  build(attrs: BoatAttrs): BoatDoc;
}

// An interface that describes the properties that a user document has
interface BoatDoc extends mongoose.Document {
  boatType: string;
  boatManufacturer: string;
  boatModel: string;
  city: string;
  boatHarbour: string;
  captain: boolean;
  price: number;
  cabins: number;
  bathrooms: number;
  lengthOfBoat: number;
  boatCapicity: number;
  boatDescription: string;
  photos: string[];
  userId: string;
  orderId: string;
  version: number;
}

const boatSchema = new mongoose.Schema(
  {
    boatType: {
      type: String,
      required: true,
    },
    boatManufacturer: {
      type: String,
      required: true,
    },
    boatModel: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    boatHarbour: {
      type: String,
      required: true,
    },
    captain: {
      type: Boolean,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    cabins: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    lengthOfBoat: {
      type: Number,
      required: true,
    },
    boatCapicity: {
      type: Number,
      required: true,
    },
    boatDescription: {
      type: String,
      required: true,
    },
    photos: {
      type: Array,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    timestamps: true,
  }
);

boatSchema.set('versionKey', 'version');
boatSchema.plugin(updateIfCurrentPlugin);

boatSchema.statics.build = (attrs: BoatAttrs) => {
  return new Boat(attrs);
};

const Boat = mongoose.model<BoatDoc, BoatModel>('Boat', boatSchema);

export { Boat };
