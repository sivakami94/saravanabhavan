
function admin(req,res,next)
{
    if(req.isAuthenticated() && req.user.email === "saravarabhavan@gmail.com") 
    {
        return next()
    }
     return res.redirect("/menu")
   
}


module.exports=admin