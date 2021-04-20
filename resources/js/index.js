import axios from 'axios'
import Noty from 'noty'
let addToCart =document.querySelectorAll(".add-to-cart");
let cartCounter=document.getElementById("cartCounter");
function updateCart(saravanabhavan){
axios.post("/update-cart",saravanabhavan).then(res =>{
          cartCounter.innerHTML= +res.data.totalQty
     //   new Noty({
      //      type:"success",
      //      timeout:1000,
       //     text: "Notification text",
       //     progressBar:false,
           
       //   }).show();
})
}


addToCart.forEach((btn)=> {
    btn.addEventListener("click",(e) =>{

        let saravanabhavan=JSON.parse(btn.dataset.saravanabhavan)
     
         updateCart(saravanabhavan)

    })
})