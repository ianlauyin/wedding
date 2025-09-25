import { ajax } from "./ajaxFn";
import {
  CreateGuestInfoRequest,
  GetGuestListResponse,
  LoginRequest,
  LoginResponse,
  RemoveGuestPathParams,
} from "wedding-interface";

// admin router
export const getLoginRecord = async () =>
  await ajax<null, LoginResponse>("/admin/record", "GET");

export const login = async (request: LoginRequest) =>
  await ajax<LoginRequest, LoginResponse>("/admin/login", "POST", request);

// guest router
export const createGuestInfo = async (request: CreateGuestInfoRequest) =>
  await ajax<CreateGuestInfoRequest>("/guest", "POST", request);

export const getGuestList = async () =>
  await ajax<null, GetGuestListResponse>("/guest/list", "GET");

export const removeGuest = async (id: string) =>
  await ajax<null, null, RemoveGuestPathParams>("/guest/", "DELETE", null, {
    id,
  });
