const handleDate = (seconds: number) => {
  const date = new Date();
  if (seconds === -1) {
    return new Date(date.getDate());
  } else {
    return new Date(date.getTime() + seconds * 1000).toUTCString();
  }
};

const _create = (name: string, value: any, seconds: number, path: string) => {
  if (seconds) {
    const expires = handleDate(seconds);
    return `${name}=${value}; expires=${expires}; path=${path};`;
  } else {
    return `${name}=${value}; path=${path};`;
  }
};

const _get = (name: string) => {
  const cookies = decodeURIComponent(document.cookie).split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) == " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) == 0) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
};

const _set = (name: string, value: any, seconds: number, path: string) => {
  if (seconds) {
    const expires = handleDate(seconds);
    document.cookie = `${name}=${value}; expires=${expires}; path=${path};`;
  } else {
    document.cookie = `${name}=${value}; path=${path};`;
  }
};

export const handleCookies = {
  create: _create,
  get: _get,
  set: _set,
};
