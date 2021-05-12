import axios from 'axios'



let addToCart =document.querySelectorAll(".add-to-cart");
let cartCounter=document.getElementById("cartCounter");
function updateCart(saravanabhavan){
axios.post("/update-cart",saravanabhavan).then(res =>{
          cartCounter.innerHTML= +res.data.totalQty
    
})
}
addToCart.forEach((btn)=> {
    btn.addEventListener("click",(e) =>{
      
        let saravanabhavan=JSON.parse(btn.dataset.saravanabhavan)
     
         updateCart(saravanabhavan)

    })
})
