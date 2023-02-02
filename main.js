const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3008;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Express Server Home directory");
});

app.get("/products", (req, res) => {
  console.log("GET Products request irlee");

  fs.readFile("./data/products.json", (error, data) => {
    if (error) {
      res.status(500).send({ message: error });
    } else {
      console.log("Products husel irsen ...");
      const tempProducts = JSON.parse(data);

      console.log("content==> ", tempProducts[2]);
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
  fs.readFile("./data/users.json", (error, content) => {
    if (error) {
      res.status(500).send({ message: error });
    } else {
      console.log("Hereglegchiin huselt orj irlee...");

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

app.post("/user/", (req, res) => {
  console.log("User add huselt irlee... ");
  console.log(req.body);

  fs.readFile("./data/users.json", (err, data) => {
    const tempUsers = JSON.parse(data);

    if (err) {
      res.json({ status: "505", message: "File reading error uuslee..." });
    } else {
      console.log("Request body===> ", req.body);
      const newUser = req.body;
    }
  });
});

app.put("/user/:id", (req, res) => {
  console.log("PUT User huselt irlee...");
  console.log("Param id is==> " + req.params.id);

  fs.readFile("./data/users.json", (error, data) => {
    const allUsers = JSON.parse(data);

    if (error) {
      res.json({
        status: "505",
        message: "File unshih ved aldaa garlaa",
      });

      console.log("File read error occur...");
    } else {
      console.log("Dotood users => ", allUsers);
      const reqUserData = req.body;
      console.log("Irsen medeelel===>", reqUserData);

      allUsers.map((user) => {
        if(user.uid === reqUserData.uid) {
          user.fname = reqUserData.fname;
          user.lname = reqUserData.lname;
          user.phone1 = reqUserData.phone1;
          user.phone2 = reqUserData.phone2;
          user.address = reqUserData.address;
          user.email = reqUserData.email;
          user.password = reqUserData.password;
          user.role = reqUserData.role;
        }
      });

      console.log("File ruu bichij bgaa OBJECT====> ", allUsers);

      fs.writeFile(
        "./data/users.json",
        JSON.stringify(allUsers),
        (error) => {
          if (error) {
            res.json({
              status: "505",
              message: "Error when write to file...",
              userData: "none"
            });
          } else {
            res.json({
              status: "200",
              message: "Successful file write",
              userData: "none"
            });
          }
        }
      );
      res.json({
        status: "200",
        message: "Amjilttai unshlaa",
        userData: reqUserData
      });
    }
  });
});

app.post("/product/", (req, res) => {
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

// 404 page
app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});

app.listen(PORT, () => {
  console.log(`Express server listeing port on ${PORT}`);
});
