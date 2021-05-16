import axios from 'axios'
import menu from '../../apps/models/menu';

let minus=document.querySelectorAll("#minus");
let add=document.querySelectorAll("#add");
let cartCounter=document.querySelector("#cartCounter")


 function Minus(menu)
{  
  axios.post("/minus-cart",menu).then((res)=>{
    cartCounter.innerText= res.data.totalQty
   })            
}
 function Add(menu)
{  
     axios.post("/add-cart",menu).then((res)=>{
         cartCounter.innerText= res.data.totalQty
     })
       
     
}
minus.forEach((btn)=> {
       btn.addEventListener("click",(e) =>{
           let menu=JSON.parse(btn.dataset.menu)
            Minus(menu)
       })
})
add.forEach((btn)=> {
      btn.addEventListener("click",(e) =>{
          let menu=JSON.parse(btn.dataset.menu)
          Add(menu)
 
        })
})
