import { ajax } from "./ajaxFn";
import {
  CreateOrUpdateGuestInfoRequest,
  GetGuestListResponse,
  GetInvitationInfoPathParams,
  InvitationInfoResponse,
  LoginRequest,
  LoginResponse,
  RemoveGuestPathParams,
} from "wedding-interface";

// admin router
export const getLoginRecord = async () =>
  await ajax<null, LoginResponse, null>("/admin/record", "GET");

export const login = async (request: LoginRequest) =>
  await ajax<LoginRequest, LoginResponse, null>(
    "/admin/login",
    "POST",
    request
  );

export const logout = async () => await ajax("/admin/logout", "POST");

// guest router
export const createGuestInfo = async (
  request: CreateOrUpdateGuestInfoRequest
) =>
  await ajax<CreateOrUpdateGuestInfoRequest, null, null>(
    "/guest",
    "POST",
    request
  );

export const getGuestList = async () =>
  await ajax<null, GetGuestListResponse, null>("/guest/list", "GET");

export const removeGuest = async (id: string) =>
  await ajax<null, null, RemoveGuestPathParams>("/guest/{id}", "DELETE", null, {
    id,
  });

// invitation router
export const getInvitationInfo = async (id: string) =>
  await ajax<null, InvitationInfoResponse, GetInvitationInfoPathParams>(
    "/invitation/{id}",
    "GET",
    null,
    {
      id,
    }
  );
