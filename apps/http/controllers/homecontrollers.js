const Menu=require("../../models/menu")
function homecontrollers(){
    return{
        index(req,res)
        {
             Menu.find().then(function(saravanabhavans){
                 console.log(saravanabhavans)
                  return res.render("home",{saravanabhavans:saravanabhavans})
             })
       }

    }
}


module.exports=homecontrollers