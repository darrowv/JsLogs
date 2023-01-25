export function formatLog(log) {
  let value = "";

  if (log === null) {
    value = "null";
    return value;
  } else if (log === undefined) {
    value = "undefined";
    return value;
  } else if (log instanceof Error) {
    value = log;
    return value;
  } else if (log instanceof HTMLElement) {
    value = "HTMLElement: " + log.localName;
    return value;
  } else if (log === 0) {
    value = Object.is(log, -0) ? "-0" : 0;
    return value;
  }

  switch (typeof log) {
    case "string":
      value = `"${log}"`;
      break;
    case "bigint":
      value = log + "n";
      break;
    case "object":
      if (Array.isArray(log)) {
        value = arrayTemplate(log);
      } else if (log instanceof Map) {
        value = hashmapTemplate(log);
      } else if (log instanceof Set) {
        value = hashsetTemplate(log);
      } else {
        value = objectTemplate(log);
      }
      break;
    default:
      value = log;
      break;
  }

  return value;
}

function objectTemplate(obj) {
  if (!Object.keys(obj).length) return "{}";

  let str = "{";
  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      if (Array.isArray(obj[key])) {
        str += `\n  ${key}: ${arrayTemplate(obj[key])},`;
      } else {
        str += `\n  ${key}: ${objectTemplate(obj[key])},`;
      }
    } else {
      str += `\n  ${key}: ${formatLog(obj[key])},`;
    }
  }
  str = str.slice(0, -1);
  str += "\n}";
  return str;
}

function arrayTemplate(arr) {
  let str = "[ ";

  arr.forEach((el, index) => {
    if (index !== arr.length - 1) {
      str += formatLog(el) + ", ";
    } else {
      str += formatLog(el);
    }
  });

  str += " ]";

  return str;
}

function hashmapTemplate(hashmap) {
  let str = "Map:";

  hashmap.forEach((value, key) => {
    str += `\n ${formatLog(key)}: ${formatLog(value)}`;
  });

  return str;
}

function hashsetTemplate(hashset) {
  let str = "Set:\n  | ";
  let lastValue;
  hashset.forEach((value) => {
    lastValue = value;
  });

  hashset.forEach((value, _, set) => {
    if (value !== lastValue) {
      str += `${formatLog(value)}, `;
    } else {
      str += `${formatLog(value)} |`;
    }
  });

  return str;
}
