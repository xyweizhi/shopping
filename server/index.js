const path = require("path");

const express = require("express");
const cors = require("cors");
const data = require("./data.json");

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

const filterFunc = (filter) => (item) => {
  return item.availableSizes.includes(filter);
};

function handleData(data, filter, orderBy) {
  let d = data;
  if (filter) {
    d = d.filter(filterFunc(filter));
  }
  if (orderBy) {
    d.sort(order[orderBy]);
  }
  return d;
}

const app = express();
app.use(cors());

const port = 8001;

app.get("/api/products", async (req, res) => {
  let d = data.data;
  const { size, orderBy } = req.query;

  res.send({
    data: handleData(d, size, orderBy),
  });
});

app.listen(port, () => {
  console.log(`[products] API listening on port ${port}.`);
});
