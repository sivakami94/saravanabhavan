const Menu=require("../../models/menu")
list=[]
function homecontrollers(){
    return{
        async index(req,res)
        {
            const menus= await Menu.find()
            
              return res.render("home",{menus: menus})
          
       }
           
       
      

    }
}


module.exports=homecontrollers