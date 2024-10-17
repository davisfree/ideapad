export default function stringifyObject(object, prefix = "") {
  let string = "";
  for (let key in object) {
    if (string.length > 0) {
      string += "\n";
    }

    let value = object[key];
    if (value instanceof Object) {
      string +=
        prefix +
        key +
        ": {\n" +
        stringifyObject(value, prefix + "  ") +
        "\n" +
        prefix +
        "}";
    } else {
      string += prefix + key + ": " + value;
    }
  }
  return string;
}
