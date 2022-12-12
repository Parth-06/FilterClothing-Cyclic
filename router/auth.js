const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
require("../DB/conn");
const User = require("../Model/userShema");
const authenticate = require("../Middleware/Authenticate");
const cookieParser = require("cookie-parser");
const Cartlist = require("../Model/Cartshema");
router.use(cookieParser());

router.get("/home", authenticate, async (req, res) => {
  return res.json(req.rootUser);
});

router.get("/cartdata", authenticate, async (req, res) => {
  try {
    const userExists = await Cartlist.findOne({ email: req.rootUser.email });
    if (userExists) {
      return res.json(userExists.cart);
    } else {
      console.log("error in sending data");
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/cartdata", authenticate, async (req, res) => {
  const { cartvalue, prod_id } = req.body;
  try {
    const userExists = await Cartlist.findOne({ email: req.rootUser.email });
    const g = userExists.cart;
    const listtwwo = await Cartlist.findOne({ "cart.id": prod_id });
    const newcartvalue = cartvalue.cart;
    if (userExists) {
      try {
        if (g === 0) {
          const userNew = await Cartlist.findByIdAndUpdate(
            { _id: userExists.id },
            {
              $set: { cart: newcartvalue },
            }
          );
        } else {
          if (listtwwo === null) {
            const userNew = await Cartlist.findByIdAndUpdate(
              { _id: userExists.id },
              {
                $addToSet: { cart: newcartvalue },
              }
            );
          } else {
            console.log("duplicate");
          }
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("saved");
    }
    return res.json(userExists.cart);
  } catch (err) {
    console.log(err);
  }
});

router.post("/changeQty", authenticate, async (req, res) => {
  const { prod_id, quantity } = req.body;
  const userExists = await Cartlist.findOne({ email: req.rootUser.email });

  if (userExists) {
    try {
      const userNeww = await Cartlist.findOneAndUpdate(
        { email: req.rootUser.email, "cart.id": prod_id },
        {
          "cart.$.qty": quantity,
        }
      );
      res.status(210).json({ message: "Success" });
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("not updated");
  }
});

router.get("/logout", async (req, res) => {
  res.clearCookie("jwtoken", { httpOnly: true });

  res.status(200).send({ message: "logout success" });
});

router.post("/deletedata", authenticate, async (req, res) => {
  const { prodid } = req.body;
  try {
    const listtwo = await Cartlist.findOne({ id: prodid });
    if (listtwo) {
      try {
        const userNew = await Cartlist.findOneAndUpdate(
          { "cart.id": prodid, email: req.rootUser.email },
          {
            $pull: {
              cart: { id: prodid },
            },
          }
        );
        res.status(210).json({ message: "Registration Success" });
      } catch (err) {
        console.log(err);
      }
    } else {
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  if (!name || !email || !password || !cpassword) {
    return res.status(422).json({ error: "Error fill please" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Password do not match" });
    } else {
      const user = new User({ name, email, password, cpassword });
      await user.save();
      res.status(210).json({ message: "Registration Success" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  router.use(cookieParser());
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Error fill please" });
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      if (isMatch) {
        token = await userLogin.genrateAuthToken();
        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });

        const cUser = await Cartlist.findOne({ email: email });
        if (cUser) {
          return res.json({ message: "Login success", token });
        } else {
          const userr = new Cartlist({ email, cart: [] });
          await userr.save();
          return res.json({ message: "Login success", token });
        }
      } else {
        return res.status(400).json({ error: "Invalid Credencials password" });
      }
    } else {
      return res.status(400).json({ error: "Invalid Credencials email" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/login", async (req, res) => {
  return res.json(token);
});

module.exports = router;
