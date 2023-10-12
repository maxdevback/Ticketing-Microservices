import { Schema, model } from "mongoose";
import { OrderAttrs, OrderDoc, OrderModel } from "./types";
import { TicketDoc } from "./types";
import { OrderStatus } from "@maxdevback/ticketing-shared/build";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

const orderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Created,
    },
    expiresAt: {
      type: Schema.Types.Date,
    },
    ticket: {
      type: Schema.Types.ObjectId,
      ref: "Ticket",
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

orderSchema.set("versionKey", "version");
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order };
