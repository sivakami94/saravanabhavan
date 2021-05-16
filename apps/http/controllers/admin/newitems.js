const Menu=require("../../../models/menu")
function newitems()
{
    return {
     new(req,res)
        { 
            res.render("admin/new");
        }
        
      
        
    }
}
module.exports=newitems