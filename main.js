const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 3008;
const PUB_PATH = "./data";

app.use(cors());
app.use(bodyParser.json());



app.get("/", function (req, res) {
  res.send("Express Server Home directory");
});

app.get("/products", function (req, res) {
  console.log("GET Products request irlee");

  fs.readFile(`${PUB_PATH}/products.json`, (error, content) => {
    if(error) {
      res.status(500).send({ message: error });
    } else {
      const tempProducts = JSON.parse(content);
      res.status(200).json(tempProducts);
    }
  });
});

app.get("/product/:id", (req, res) => {
  const tempProdID = req.params.id;
  const leaveProduct = products.find((product) => product.pid === tempProdID);
  console.log("GET by ID found ==> ", leaveProduct);

  if (leaveProduct) {
    res.json(leaveProduct);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

app.get("/users", function (req, res) {
  
  fs.readFile(`${PUB_PATH}/users.json`, (error, content) => {
    if(error) {
      res.status(500).send({ message: error });
    } else {
      const tempUsers = JSON.parse(content);
      res.status(200).json(tempUsers);
    }
  });
});

app.get("/user/:id", (req, res) => {
  const tempUserId = req.params.id;

  if (users[tempUserId]) {
    res.json(users[tempUserId]);
  } else {
    res.status(404).send({ message: "User not found" });
  }
});

app.post("/product/add", (req, res) => {
  console.log("POST request irlee", req.body);
  const body = req.body;

  fs.readFile("./data/products.json", (err, content) => {
    const saveProducts = JSON.parse(content);
    if (err) {
      res.json({
        status: "Read file error",
      });
    } else {
      const newProduct = {
        pid: body.pid,
        description: body.description,
        name: body.name,
        image: body.image,
        price: body.price,
        sale: body.sale,
        category: body.category,
        warranty: body.warranty,
        prodCuDate: body.prodCuDate,
        hidden: body.hidden,
        spec: [...body.spec],
      };

      saveProducts.push(newProduct);

      fs.writeFile(
        "./data/newProducts.json",
        JSON.stringify(saveProducts),
        (error) => {
          if (error) {
            res.json({
              status: "Error when write to file...",
            });
          } else {
            res.json({
              status: "Successful file write",
            });
          }
        }
      );
      res.json({ status: "Successful file read" });
      console.log("Content: ", content);
    }
  });

  const newProduct = {
    pid: genRandomHex(8),
    ...req.body,
  };
  products.push(newProduct);
  console.log("New Products after added: ", products);
});

app.delete("/product/:id", (req, res) => {
  const tempId = req.params.id;
  console.log("DELETE request irlee", tempId);

  try {
    products = products.filter((product) => product.pid !== tempId);

    console.log("After delete: ", products);
    res.send("Successfull delete");
  } catch (error) {
    console.error("Delete hiih uildel aldaa garlaa", error);
  }
});

app.listen(PORT, () => {
  console.log(`Express server listeing port on ${PORT}`);
});