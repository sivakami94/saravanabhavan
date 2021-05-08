const User=require("../../models/user")
const bcrypt=require("bcrypt")
const passport = require("passport")
function authcontrollers(){
        const _getRedirectUrl =(req) =>{
            return req.user.name ==='admin' ? '/admin/orders' : '/customer/orders'
        }

    return{
        login(req,res)
        {
            res.render('auth/login')
        },
        postLogin(req,res,next)
        {
            const {email,password}=req.body
            //validate request
            if(!email || !password ){
              req.flash('error',"All fields are required")
            return res.redirect("/")
        }
            passport.authenticate('local',(err,user,info) =>{
                if(err){
                    req.flash('error',info.message)
                    return next(err)
                }
                if(!user){
                    req.flash("error", info.message)
                    return res.redirect("/")
                }
                req.logIn(user,(err)=>{
                    if(err){
                        req.flash('error',info.message)
                        return next(err)
                    }

                    return res.redirect(_getRedirectUrl(req))
                })
            })(req,res,next)
        },
        register(req,res)
        {
            res.render('auth/register')
        },
      async postregister(req,res)
        {
            const {name,email,password}=req.body
           
            //validate request
            if(!name || !email || !password ){
              req.flash('error',"All fields are required")
              req.flash('name',name)
              req.flash('email',email)
             
            
            return res.redirect("/register")
        }
      
        //check if email exists
        User.exists({email:email},(err,result)=>{
            if(result){
                req.flash('error',"Email already exists")
                req.flash('name',name)
                req.flash('email',email)
                req.flash('password',password)
               // req.flash('confirmpassword',confirmpassword)
                return res.redirect("/register")
            }
        })
    
        //Hash password
const hashedPassword =await bcrypt.hash(password,10)

        //create a user
        const user=new User({
            name,
            email,
            password:hashedPassword,
          //  confirmpassword:hashedPassword
        })
      
       user.save().then((user) =>{
              return res.redirect('/menu')
   }).catch(err =>{
               req.flash('error','Something went wrong')
                return res.redirect('/register')
     })  
    
     },
    
     logout(req,res){
         req.logout()
         return res.redirect('/')
     }
  }
}
module.exports=authcontrollers