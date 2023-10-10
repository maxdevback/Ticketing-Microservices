import { Document, Model } from "mongoose";

export interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
}

export interface TicketDoc extends Document {
  title: string;
  price: number;
  userId: string;
}

export interface TicketModel extends Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}
