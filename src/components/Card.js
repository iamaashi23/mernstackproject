
import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatchCart, useCart } from './ContextReducer'
// import { Dropdown, DropdownButton } from 'react-bootstrap';
export default function Card(props) {
  // let data = useCart();

  // let navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  const priceRef = useRef();
  // // const [btnEnable, setBtnEnable] = useState(false);
  // // let totval = 0
  // // let price = Object.values(options).map((value) => {
  // //   return parseInt(value, 10);
  // // });
  let options = props.options;
  let priceOptions = Object.keys(options || {});
  
   let dispatch = useDispatchCart();
  // const handleClick = () => {
  //   if (!localStorage.getItem("token")) {
  //     navigate("/login")
  //   }
  // }
  // const handleQty = (e) => {
  //   setQty(e.target.value);
  // }
  // const handleOptions = (e) => {
  //   setSize(e.target.value);
  // }
  
  let data=useCart()
  const handleAddToCart = async () => {
 
    
   
    console.log(data)
      let food = []
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;

        break;
      }
    }
   
  //   console.log(food)
  //   console.log(new Date())
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        return
      }
      return
    }
    await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
     
  }

  //   // setBtnEnable(true)

  // }

 

  
  let finalPrice = qty * parseInt(options[size]); 
   //This is where Price is changing
  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])
  return (
    <div>

      <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
        <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          {/* <p className="card-text">This is some random text. This is description.</p> */}
          <div className='container w-100 p-0' style={{ height: "38px" }}>
            <select className="m-2 h-100 w-20 bg-success text-black rounded" onChange={(e)=>setQty(e.target.value)} style={{ select: "#FF0000" }} >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>)
              })}
            </select>
            <select className="m-2 h-100 w-20 bg-success text-black rounded" ref={priceRef} onChange={(e)=>setSize(e.target.value)} style={{ select: "#FF0000" }} >
              {priceOptions.map((i) => {
                return <option key={i} value={i}>{i}</option>
              })}
              
            </select>
            <div className=' d-inline ms-2 h-100 w-20 fs-5' >
              ₹{finalPrice}/-
              
            </div>
          </div>
          <hr></hr>
          <button className={`btn btn-success justify-center ms-2 `} onClick={handleAddToCart}>Add to Cart</button>
          {/* <button className={`btn btn-danger justify-center ms-2 ${btnEnable ? "" : "disabled"}`} onClick={handleRemoveCart}>Remove</button> */}
        </div>
      </div>
    </div>
  )
}
//