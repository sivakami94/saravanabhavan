
function admin(req,res,next)
{
    if(req.isAuthenticated() && req.user.name === 'admin') 
    {
        return next()
    }
    return res.redirect("/")
}


module.exports=admin