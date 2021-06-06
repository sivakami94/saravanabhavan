import axios from 'axios'
import menu from '../../apps/models/menu';

let minus=document.querySelectorAll("#minus");
let add=document.querySelectorAll("#add");
let cartCounter=document.querySelector("#cartCounter")
document.getElementById("show").addEventListener("click",show);
document.getElementById("showpass").addEventListener("click",showpassword);


function show()
{
  var pass = document.getElementById("pass");

  if(pass.type=="password")
  {
   
    pass.type = "text";
  }
  else{
    pass.type = "password";
  }
}
function showpassword()
{
  var x = document.getElementById("password");
  var y = document.getElementById("conpassword");
  if(x.type=="password"|| y.type=="password")
  {
    x.type = "text";
    y.type = "text";
  }
  else{
    x.type = "password";
    y.type = "password";
  }
}
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


