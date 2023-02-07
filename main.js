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

app.get("/users", function (req, res) {
  fs.readFile("./data/users.json", (error, content) => {
    if (error) {
      if (content === null) {
        res
          .status(500)
          .json({ status: "Users Empty error!!!!", message: error.message });
      } else {
        res.status(500).send({ message: error });
      }
    } else {
      console.log("Hereglegchiin huselt orj irlee...");
      if (content !== null) {
        const tempUsers = JSON.parse(content);
        res.status(200).json(tempUsers);
      }
    }
  });
});

app.get("/user/:id", (req, res) => {
  const tempReqUserId = req.params.id;

  fs.readFile("./data/users.json", (err, data) => {
    const tempLocalUsers = JSON.parse(data);

    if (err) {
      res.json({ status: "505", message: "File reading error uuslee..." });
    } else {
      console.log("Request body===> ", req.params.id);

      const foundUser = tempLocalUsers.find(
        (user) => user.uid === tempReqUserId
      );
      if (foundUser) {
        console.log("Oldloo====> ", foundUser);
        res.status(200).json({
          message: "Amjilttai file-aas unshij user oldloo.",
          userData: foundUser,
        });
      } else {
        res.status(404).send({ message: "User not found" });
      }
    }
  });
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
      tempUsers.push(newUser);

      fs.writeFile("./data/users.json", JSON.stringify(tempUsers), (error) => {
        if (error) {
          res.json({
            status: "505",
            message: "Error when write to file add user",
          });
        } else {
          res.status(200).json({
            status: "200",
            message: "Amjilttai user add hiilee",
            userData: tempUsers,
          });
        }
      });
    }
  });
});

app.delete("/user/:id", (req, res) => {
  console.log("DELETE User huselt irlee...");
  console.log("Param id is==> " + req.params.id);
  const reqUserID = req.params.id;

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
      let foundUserIndex = "";
      allUsers.map((user, index) => {
        if (user.uid === reqUserID) {
          foundUserIndex = index;
        }
      });

      allUsers.splice(foundUserIndex, 1);

      fs.writeFile("./data/users.json", JSON.stringify(allUsers), (error) => {
        if (error) {
          res.json({
            status: "505",
            message: "Error when write to file...",
          });
        } else {
          res.json({
            status: "200",
            message: "Successful file write",
          });
        }
      });
      res.json({
        status: "200",
        message: "Amjilttai file-d save hiilee",
        userData: allUsers,
      });
    }
  });
});

app.put("/user/:id", (req, res) => {
  console.log("PUT User huselt irlee...");
  console.log("Param id is==> " + req.params.id);
  const reqUserID = req.params.id;

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
        if (user.uid === reqUserID) {
          user.fname = reqUserData.fname;
          user.lname = reqUserData.lname;
          user.phone1 = reqUserData.phone1;
          user.phone2 = reqUserData.phone2;
          user.address = reqUserData.address;
          user.email = reqUserData.email;
          user.password = reqUserData.password;
          user.role = reqUserData.role;

          console.log("Utga olgolt ajillaa !!!!!");
        }
      });

      console.log("File ruu bichij bgaa OBJECT====> ", allUsers);

      fs.writeFile("./data/users.json", JSON.stringify(allUsers), (error) => {
        if (error) {
          res.json({
            status: "505",
            message: "Error when write to file...",
            userData: "none",
          });
        } else {
          res.json({
            status: "200",
            message: "Successful file write",
            userData: "none",
          });
        }
      });
      res.json({
        status: "200",
        message: "Amjilttai file-d save hiilee",
        userData: reqUserData,
      });
    }
  });
});

app.get("/products", (req, res) => {
  console.log("GET Products request irlee");

  fs.readFile("./data/products.json", (error, data) => {
    if (error) {
      res.status(500).send({ message: error });
    } else {
      console.log("Products husel irsen ***********");
      const tempProducts = JSON.parse(data);
      
      // console.log("content==> ", tempProducts[2]);
      console.log("--------------");
      console.log("--------");
      res.status(200).json(tempProducts);
    }
  });
});

app.get("/products/sum", (req, res) => {
  console.log("GET Products LENGTH request irlee");

  fs.readFile("./data/products.json", (error, data) => {
    if (error) {
      res.status(500).send({ message: error });
    } else {
      console.log("Products husel irsen ...");
      const tempProducts = JSON.parse(data);
      const productsCountNumbers = tempProducts.length + 1;
      res
        .status(200)
        .json({
          message: "Successful read and ssend number products",
          productsCount: productsCountNumbers,
        });
    }
  });
});

app.get("/product/:id", (req, res) => {
  const tempRequestProdID = req.params.id;

  fs.readFile("./data/products.json", (err, data) => {
    if (err) {
      res.json({ status: "505", message: "Products read by id aldaa garlaa" });
      console.log("File unshihad aldaa garlaa: Products by ID heseg:");
    } else {
      console.log("Products read successfull");

      const tempProducts = JSON.parse(data);

      const foundProduct = tempProducts.find(
        (product) => product.pid === tempRequestProdID
      );
      console.log("GET by ID found ==> ", foundProduct);

      if (foundProduct) {
        // id -tai neg product hariug ywuulah
        res.json({
          status: "200",
          message: "Amjilttai file-aas unshij oldloo.",
          userData: foundProduct,
        });
      } else {
        res.status(404).send({ message: "Product not found" });
      }
    }
  });
});

app.post("/product/", (req, res) => {
  console.log("POST request irlee", req.body);
  const requestBodyObj = req.body;
  const newProduct = requestBodyObj;
  console.log("Irsen Body Req===> ", requestBodyObj);

  fs.readFile("./data/products.json", (err, content) => {
    if (err) {
      res.status(500).json({
        status: "Read file error",
        message: err,
      });
    } else {
      const localTempProducts = JSON.parse(content);
      console.log("Content: ", content);
      
      localTempProducts.push(newProduct);

      fs.writeFile(
        "./data/products.json",
        JSON.stringify(localTempProducts),
        (error) => {
          if (error) {
            res.json({
              status: "Error when write to file...",
            });
          } else {
            res.status(200).json({ status: "Successful file read" });
          }
        }
      );
    }
  });
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
