import React from 'react'
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import { useState } from 'react';
function FarmerProduct() {
    const [open, setOpen] = useState(false);
  
    const handleClickToOpen = () => {
      setOpen(true);
    };
    
    const handleToClose = () => {
      setOpen(false);
    };

    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [crop, setCrop] = useState("");
 
  const changeSelectOptionHandlerCategory = (event) => {
    setCategory(event.target.value);
  };
  const changeSelectOptionHandlerCrop = (event) => {
    setCrop(event.target.value);
  };
  

  const fruits = ["Apple", "Banana", "Pear"];
  const veggies = ["Potato", "Onion", ];

  let type = null;
  let options = null;
  
  if (category === "Fruits") {
    type = fruits;
  } else if (category === "Vegetables") {
    type = veggies;
  } 

  if (type) {
    options = type.map((el) => <option key={el} >{el}</option>);
  }
  return (
    <div stlye={{}}>
      
      <Button variant="outlined" color="primary" 
              onClick={handleClickToOpen}>
        Add Product
      </Button>
      <Dialog open={open} onClose={handleToClose}>
        <DialogTitle>{"Add Your Product"}</DialogTitle>
        <DialogContent>
          <form >
            <input type="text"
                    onChange={(e)=>setQuantity(e.target.value)} 
                    placeholder="Quantity in Kgs"/>
            <input type="text"
                    onChange={(e)=>setPrice(e.target.value)} 
                    placeholder="Price in Rs"/>
            <div>
            <select onChange={changeSelectOptionHandlerCategory}>
            <option>Choose</option>
            <option>Fruits</option>
            <option>Vegetables</option>
          </select>
        </div>
        <div>
          <select onChange={changeSelectOptionHandlerCrop}>
            <option>Crops</option>
            {
              options
            }
          </select>
          {console.log(category,crop,price,quantity)}
            </div>
            <button></button>    
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToClose} 
                  color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default FarmerProduct
