type PathParams = Record<string, any>;
type Request = Record<string, any>;

export const ajax = async <P extends PathParams, Req extends Request, Res>(
  url: string,
  method: "GET" | "DELETE" | "POST" | "PUT",
  pathParams?: P | null,
  request?: Req | null
): Promise<Res> => {
  const isGetOrDelete = method === "GET" || method === "DELETE";

  let parsedUrl = urlwithParams(url, pathParams);
  if (isGetOrDelete) {
    parsedUrl = urlWithQueryParams(parsedUrl, request);
  }

  const response = await fetch(parsedUrl, {
    method,
    body: isGetOrDelete ? undefined : JSON.stringify(request),
  });
  return response.json();
};

const urlwithParams = <P extends PathParams>(
  url: string,
  pathParams?: P | null
) => {
  return url.replace(/{(\w+)}/g, (_, key) => {
    if (!pathParams?.[key]) throw new Error(`Path param ${key} is required`);
    return pathParams?.[key];
  });
};

const urlWithQueryParams = <Req extends Request>(
  url: string,
  request?: Req | null
) => {
  if (!request) return url;
  return url + "?" + new URLSearchParams(request).toString();
};
