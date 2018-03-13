
module.exports = function (source, map) {
  return source.replace(
      /static\s+([\w\d]+)\s*=\s*([^;]+);/g,
      'static get $1() { return $2;}'
  );
};
