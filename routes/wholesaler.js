const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const Order= require("../models/orders.js")
router.post(
	"/order/add/:id",
	async (req, res) => {
		const user = req.user;

		if(user != null){
            const order=new Order(req.body.order);
            console.log(req.body.order);
            order.wholesalerId=req.user.username
            order.farmerId=req.params.id
            order.date= Date.now()
            order.save()
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
	"/order/delete/:id",
	async (req, res) => {
		const id= req.params.id
        console.log(id)
        console.log(req.user._id)
        await Order.findOneAndUpdate(
            { _id: req.user._id },
            { $pull: { products: { _id: id } } },
          );
          return res.status(200).json({ message: "Album Deleted Successfully" });
	}
);

router.get(
	"/farmers",
	async (req, res) => {
		
		let farmers = await User.find({ isFarmer: true });
		res.status(200).send({ farmers });
	}
);

module.exports=router;