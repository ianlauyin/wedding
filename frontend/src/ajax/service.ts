import { ajax } from "./ajaxFn";
import {
  CreateGuestInfoRequest,
  GetGuestListResponse,
  IdPathParams,
  InvitationInfoResponse,
  LoginRequest,
  LoginResponse,
  UpdateGuestCountRequest,
  UpdateGuestInfoRequest,
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
export const createGuestInfo = async (request: CreateGuestInfoRequest) =>
  await ajax<CreateGuestInfoRequest, null, null>("/guest", "POST", request);

export const getGuestList = async () =>
  await ajax<null, GetGuestListResponse, null>("/guest/list", "GET");

export const updateGuest = async (
  id: string,
  request: UpdateGuestInfoRequest
) =>
  await ajax<UpdateGuestInfoRequest, null, IdPathParams>(
    "/guest/{id}",
    "PUT",
    request,
    {
      id,
    }
  );

export const removeGuest = async (id: string) =>
  await ajax<null, null, IdPathParams>("/guest/{id}", "DELETE", null, {
    id,
  });

// invitation router
export const getInvitationInfo = async (id: string) =>
  await ajax<null, InvitationInfoResponse, IdPathParams>(
    "/invitation/{id}",
    "GET",
    null,
    {
      id,
    }
  );

export const updateGuestCount = async (
  id: string,
  request: UpdateGuestCountRequest
) =>
  await ajax<UpdateGuestCountRequest, null, IdPathParams>(
    "/invitation/{id}/guest-count",
    "PUT",
    request,
    {
      id,
    }
  );
