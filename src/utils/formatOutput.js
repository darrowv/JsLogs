export function __formatLog(log) {
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
        value = __arrayTemplate(log);
      } else {
        value = __objectTemplate(log);
      }
      break;
    default:
      value = log;
      break;
  }

  return value;
}

export function __objectTemplate(obj) {
  let str = "{";
  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      if(Array.isArray(obj[key])) {
        str += `\n  ${key}: ${__arrayTemplate(obj[key])},`;
      } else {
        str += `\n  ${key}: ${__objectTemplate(obj[key])},`;
      }
    } else {
      str += `\n  ${key}: ${__formatLog(obj[key])},`;
    }
  }
  str = str.slice(0, -1);
  str += "\n}";
  return str;
}

export function __arrayTemplate(arr) {
  let str = "[ ";

  arr.forEach((el, index) => {
    if(index !== arr.length - 1) {
      str += __formatLog(el) + ", ";
    } else {
      str += __formatLog(el);
    }
  })

  str += " ]";

  return str
}