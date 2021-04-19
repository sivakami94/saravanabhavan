import axios from 'axios'
let addToCart =document.querySelectorAll(".add-to-cart");
let cartCounter=document.querySelector("#cartCounter");
function updateCart(saravanabhavan){
axios.post("/update-cart",saravanabhavan).then(res =>{
           console.log(res)
          cartCounter.innerText=res.data.totalQty
         // cartCounter.innerHTML=res.data.totalQty;
        //   document.getElementById("cartCounter").innerHTML=+res.data.totalQty;
            
            
})
}


addToCart.forEach((btn)=> {
    btn.addEventListener("click",(e) =>{

        let saravanabhavan=JSON.parse(btn.dataset.saravanabhavan)
     
         updateCart(saravanabhavan)

    })
})