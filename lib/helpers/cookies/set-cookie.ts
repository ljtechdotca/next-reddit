export const setCookie = (name: string, value: any) => {
  document.cookie = `${name}=${value}; path=/;`;
};
