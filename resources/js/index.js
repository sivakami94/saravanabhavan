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

function initAdmin()
{
     const orderTableBody=document.querySelector("orderTableBody")
    
     let orders=[]
     let markup
    
     axios.get('/admin/orders',{
         headers:{
             "X-Requested-With":"XMLHttpRequest"
         }
     }).then(res => {
        orders=res.data
        markup=generateMarkup(orders)
       orderTableBody.innerHTML=markup
    }).catch(err =>{
        console.log(err)
    })
   

      function renderItems(items)
      {
          let parsedItems =Object.values(items)
          return parsedItems.map((menuItem) =>{
           return <p>${menuItem.item.name } -${menuItem.qty } pcs</p>

          }).join('')
      }


     function generateMarkup(orders)
     {
         return orders.map(order => {
            return  <tr>
              <td>
              <p>${order._id}</p>

              <div>${renderItems(order.items)}</div>
             </td>
        <td>
            ${ order.customerId.name}
        </td>
        <td>
             ${ order.address }
        </td>
        <td>
       <form action ="/admin/order/status" method="POST"class=" form-group  m-3 p-4 bg-light ">
             <input  type="hidden" name="orderId"  class="form-control" value="${order._id}" >
       <select name="status" onchange="this.form.submit()">
        <option value="order_placed">
         ${ order.status === 'order_placed'? 'selected' : '' } placed </option>
        <option value="Confirmed">
        ${ order.status=== 'Confirmed'? 'selected' : '' }Confirmed </option>
        <option value="Prepared">
        ${ order.status=== 'Prepared'? 'selected' :''} Prepared</option>
        <option value="Delivered">
        ${ order.status=== 'Delivered'? 'selected' :''}Delivered</option>
        <option value="Completed">
        ${ order.status=== 'Completed'? 'selected' :''}Completed</option>
        </select>
       </input>
    
        </form>
       </td>
       <td>
            ${moment(order.createdAt).format("hh:mm A")}
       </td>
       </tr>

         }).join('')
     }
}



initAdmin()