const Menu=require("../../models/menu")
function homecontrollers(){
    return{
        async index(req,res)
        {
            const saravanabhavans= await Menu.find()
            
              return res.render("home",{saravanabhavans: saravanabhavans})
          
       }
      

    }
}


module.exports=homecontrollers