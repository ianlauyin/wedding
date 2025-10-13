import { GuestInfoView } from "wedding-interface";

export type ModalInfo = CreateModalInfo | DeleteModalInfo | UpdateModalInfo;

export interface CreateModalInfo {
  type: "create";
}

export interface DeleteModalInfo {
  type: "delete";
  guest: GuestInfoView;
}

export interface UpdateModalInfo {
  type: "update";
  guest: GuestInfoView;
}
