const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

router.post(
	"/product/add",
	async (req, res) => {
		const user = req.user;

		if(user != null){
            product=req.body.product;

            console.log(user.product);
            user.products.push(product)
			user.save();
			res.status(200).send({ message: "Product added" });
		}
		else
			res.status(401).send({ message: "User not authenticated" });
	}
);

router.get(
	"/products",
	async (req, res) => {
		const user = req.user;
        //console.log(req.user.products)
        res.send(req.user.products)
	}
);

router.delete(
	"/product/delete/:id",
	async (req, res) => {
		const id= req.params.id
        console.log(id)
        console.log(req.user._id)
        await User.findOneAndUpdate(
            { _id: req.user._id },
            { $pull: { products: { _id: id } } },
          );
          return res.status(200).json({ message: "Album Deleted Successfully" });
	}
);

module.exports=router;