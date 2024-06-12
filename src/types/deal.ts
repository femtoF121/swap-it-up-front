import { ItemPayload } from "./item";

export type DealPayload = {
  id: string;
  offeredItem: ItemPayload;
  requestedItem: ItemPayload;
  status: 0 | 1 | 2 | 4;
};
