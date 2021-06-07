
function admin(req,res,next)
{
    if(req.isAuthenticated()  && req.user.password == "saravanabhavan123") 
    {
        return next()
    }
    
     return res.redirect("/")
    
}


module.exports=admin