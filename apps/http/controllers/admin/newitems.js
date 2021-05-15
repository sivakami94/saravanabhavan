const Menu=require("../../../models/menu")
function newitems()
{
    return {
     new(req,res)
        {
            //const menu= new Menu({category:"Dosa",name:"Pure Ghee Roast",image:"card5.jpg",price:55,isavailable:true})
           // await menu.save();  
            res.render("admin/new");
        },
        postnew(req,res){
            
          console.log("hi")
      // const menu=new Menu(req.body.menus)
           //await menu.save();
         return res.redirect("/")
       }
    
        
    }
}
module.exports=newitems