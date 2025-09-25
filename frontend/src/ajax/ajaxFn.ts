import { AjaxError, AjaxErrorBody } from "./error";

type PathParams = Record<string, any> | null;
type Request = Record<string, any> | null;

export const ajax = async <
  Req extends Request = null,
  Res = null,
  P extends PathParams = null
>(
  url: string,
  method: "GET" | "DELETE" | "POST" | "PUT",
  request?: Req,
  pathParams?: P
): Promise<Res> => {
  const isGetOrDelete = method === "GET" || method === "DELETE";

  let parsedUrl = "/ajax" + urlwithParams(url, pathParams);
  if (isGetOrDelete) {
    parsedUrl = urlWithQueryParams(parsedUrl, request);
  }

  const response: Response = await fetch(parsedUrl, {
    method,
    body: isGetOrDelete ? undefined : JSON.stringify(request),
  });

  if (!response.ok) {
    throw new AjaxError(await response.json());
  }

  return response.json();
};

const urlwithParams = <P extends PathParams>(url: string, pathParams?: P) => {
  return url.replace(/{(\w+)}/g, (_, key) => {
    if (!pathParams?.[key]) throw new Error(`Path param ${key} is required`);
    return pathParams?.[key];
  });
};

const urlWithQueryParams = <Req extends Request>(
  url: string,
  request?: Req
) => {
  if (!request) return url;
  return url + "?" + new URLSearchParams(request).toString();
};
