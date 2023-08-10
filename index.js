const express = require("express");
const cors = require("cors");
             require("./db/config");
const User = require("./db/User");
const Product = require("./db/product");
const bcrypt = require('bcrypt');
const Jwt = require("jsonwebtoken");
const jwtKey = "e-comm"
const dotenv = require("dotenv")
const path = require("path");


dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());


app.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;

    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            res.send({ result: "Something went wrong, Please try after sometime" });
        }
        res.send({ result, auth: token })
    })
})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "plz filled the data" })
        }
        const user = await User.findOne({ email: email }).select("-password");
        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    res.send({ result: "Something went wrong, Please try after sometime" });
                }
                res.send({ user, auth: token })
            })
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(400).json({ error: "invalid credientails" })
            } else {
                res.status(400).json({ error: "user Signin Successfully" })
            }}else {
            res.send({ result: "user not found" });
     
    } 
} catch (error) {
    res.send({ result: "user not found" });
}
})


app.post("/add-product",verifyToken, async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
});

app.get("/products", verifyToken,async (req, res) => {
    let products = await Product.find();
    if (products.length > 0) {
        res.send(products)
    } else {
        res.send({ result: "no product found" })
    }

})

app.delete("/product/:id", verifyToken,async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id })
    res.send(result);
})

app.get("/product/:id", verifyToken,async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id })
    if (result) {
        res.send(result)

    } else {
        res.send({ result: "No Record Found." })
    }
})

app.put("/product/:id",verifyToken, async (req, res) => {
    let result = await Product.updateOne({ _id: req.params.id },{$set: req.body})
    res.send(result)
});

app.get("/search/:key", verifyToken, async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } }
        ]

    })
    res.send(result);
})

function verifyToken(req, res, next) {
    let token = req.headers["authorization"];
    if (token) {
        token = token.split(" ")[1];
        console.log("middleware called", token)
        Jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                res.status(401).send({ result: "Please provide valid token " })
            } else {
                next();
            }
        })
    } else {
        res.status(403).send({ result: "please add token with header" })
    }


}
//-------------------------Deployment---------------------

   app.use(express.static(path.join(__dirname, "./front-end/build")));

   app.get("*", (req, res) =>{
     res.sendFile(path.join(__dirname, "./front-end/build/index.html"))
   });


 
//-------------------------Deployment---------------------
app.listen(5000);