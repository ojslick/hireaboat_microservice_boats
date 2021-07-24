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
}

// An interface that describes the properties that a user model has.
interface BoatModel extends mongoose.Model<BoatDoc> {
  build(attrs: BoatAttrs): BoatAttrs;
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
      types: String,
      required: true,
    },
    boatHarbour: {
      types: String,
      required: true,
    },
    captain: {
      types: Boolean,
      required: true,
    },
    price: {
      types: Number,
      required: true,
    },
    cabins: {
      types: Number,
      required: true,
    },
    bathrooms: {
      types: Number,
      required: true,
    },
    lengthOfBoat: {
      types: Number,
      required: true,
    },
    boatCapicity: {
      types: Number,
      required: true,
    },
    boatDescription: {
      types: String,
      required: true,
    },
    photos: {
      types: Array,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

boatSchema.set('versionKey', 'version');
boatSchema.plugin(updateIfCurrentPlugin);

boatSchema.statics.build = (attrs: BoatAttrs) => {
  return new Boat(attrs);
};

const Boat = mongoose.model<BoatDoc, BoatModel>('Boat', boatSchema);

export { Boat };
