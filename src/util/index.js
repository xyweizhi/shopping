export function addEventListener(target, eventType, cb, option) {
  let callback = cb;

  if (target.addEventListener) {
    target.addEventListener(eventType, callback, option);
  }

  return {
    remove: function remove() {
      if (target.removeEventListener) {
        target.removeEventListener(eventType, callback);
      }
    },
  };
}

// up
const lowest = (a, b) => {
  return a.price - b.price;
};

// down
const highest = (a, b) => {
  return b.price - a.price;
};

const order = {
  lowest,
  highest,
};

const filterFunc = (filters) => (item) => {
  return !!filters.find((i) => {
    return item.availableSizes.includes(i);
  });
};

export function handleData(data, filter, orderBy) {
  let d = data;
  if (filter && Array.isArray(filter) && filter.length > 0) {
    d = d.filter(filterFunc(filter));
  }
  if (orderBy) {
    d.sort(order[orderBy]);
  }
  return d;
}

export function addItemToList(items, item) {
  let d = items;
  let index = null;
  d.find((n, i) => {
    if (n.sku === item.sku) {
      index = i;
      return true;
    }
    return false;
  });

  if (index === null) {
    return d.concat({ ...item, quantity: 1 });
  }
  d[index].quantity += 1;
  return d;
}

export const countNumber = (items, key = "quantity") => {
  return items.reduce((acc, cur) => {
    acc += cur[key] || 0;
    return acc;
  }, 0);
};

export const formatCurrency = (num) => {
  return (num / 100).toFixed(2);
};

export const initCarState = () => {
  const str = window.localStorage.getItem("car_state");
  if (!str)
    return {
      items: [],
    };
  try {
    return JSON.parse(str);
  } catch (error) {
    window.alert("解析缓存失败！");
    return {
      items: [],
    };
  }
};

export const wrapSet = (data) => {
  window.localStorage.setItem("car_state", JSON.stringify(data));
  return data;
};

export const parseUrl = () => {
  const [base, urlParam] = window.location.hash.split("?");
  const urls = base.replace("#/", "").split(/\//g);
  if (!urlParam) {
    return [base, null, urls];
  }
  const p = urlParam.split(/&/g).map((str) => {
    const [name, value] = str.split("=");
    return { name, value };
  });
  return [base, p, urls];
};

// 仅限 url parse
export const stringify = (arr) =>
  arr.map((v) => `${v.name}=${v.value}`).join("&");

export function appendParamToUrl(obj) {
  const url = new URL(window.location.href);
  const [base, urlParam] = parseUrl();

  let effective = Object.keys(obj);

  if (!effective || effective.length <= 0) return;

  if (!urlParam) {
    url.hash = `${base}?${effective
      .map((key) => `${key}=${obj[key]}`)
      .join("&")}`;
    window.location.href = url.href;
    return;
  }

  effective.forEach((key) => {
    let curIndex = null;
    urlParam.find((v, index) => {
      if (v.name === key) {
        curIndex = index;
        return true;
      }
      return false;
    });

    if (curIndex !== null) {
      urlParam[curIndex].value = obj[key];
    } else {
      urlParam.push({
        name: key,
        value: obj[key],
      });
    }
  });
  url.hash = `${base}?${stringify(urlParam)}`;
  window.location.href = url.href;
}

export function productUrlParams() {
  const [, params] = parseUrl();
  if (!params) {
    return {
      size: "",
      orderBy: "",
    };
  }
  const p = params.reduce(
    (acc, cur) => {
      if (cur.name === "size" || cur.name === "orderBy") {
        acc[cur.name] = cur.value;
      }
      return acc;
    },
    {
      size: "",
      orderBy: "",
    }
  );

  return p;
}

export function handleUrl() {
  const url = `${window.location.origin}${window.location.pathname}`;
  if (url.lastIndexOf("/") === url.length - 1) {
    return url;
  }
  return `${url}/`;
}

export function figureOutSize(sizes, size) {
  let s = sizes;
  if (s.includes(size)) {
    return s.filter((v) => v !== size);
  }
  s.push(size);
  return s;
}
