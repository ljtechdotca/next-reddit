const _shorten = (str: string, join: string) => {
  return str.split(" ").join(join);
};

const _alphaNum = (str: string) => {
  return _shorten(str, "").replace(/[^a-zA-Z0-9]+/gi, "");
};

const _alpha = (str: string) => {
  return _shorten(str, "").replace(/[^a-zA-Z]+/gi, "");
};

const _num = (str: string) => {
  return _shorten(str, "").replace(/[^a-zA-Z]+/gi, "");
};

const _kebab = (str: string) => {
  return _shorten(str, "-").replace(/[^a-zA-Z0-9-]+/gi, "");
};

const _snake = (str: string) => {
  return _shorten(str, "_").replace(/[^a-zA-Z0-9_]+/gi, "");
};

export const handleStrings = {
  shorten: _shorten,
  alphaNum: _alphaNum,
  alpha: _alpha,
  num: _num,
  kebab: _kebab,
  snake: _snake,
};
