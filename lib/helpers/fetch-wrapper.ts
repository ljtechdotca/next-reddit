interface IRequestOptions extends RequestInit {
  method: "GET" | "POST" | "PUT" | "DELETE";
}

function handleResponse(response: Response) {
  return response.text().then((text: string) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}

const _get = (url: string) => {
  const requestOptions: IRequestOptions = {
    method: "GET",
  };
  return fetch(url, requestOptions).then(handleResponse);
};

const _post = (url: string, body: any) => {
  const requestOptions: IRequestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
};

const _put = (url: string, body: any) => {
  const requestOptions: IRequestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
};

function _delete(url: string) {
  const requestOptions: IRequestOptions = {
    method: "DELETE",
  };
  return fetch(url, requestOptions).then(handleResponse);
}

export const fetchWrapper = {
  get: _get,
  post: _post,
  put: _put,
  delete: _delete,
};
