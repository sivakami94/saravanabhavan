

function auth(req,res,next)
{
    if(req.isAuthenticated() && req.user.role) 
    {
        return next()
    }
    return res.redirect("/")
}


module.exports=auth