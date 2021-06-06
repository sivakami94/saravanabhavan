const User=require("../../models/user")
const bcrypt=require("bcrypt")
const passport = require("passport")
function authcontrollers()
   {
          
           return{
              login(req,res)
                {
                   res.render('auth/login')
                },
               postLogin(req,res,next)
                {
                   const {email,password,role,showpass}=req.body
                   //validate request
                    if(!email || !password||!role )
                      {
                        req.flash('error',"All fields are required")
                         return res.redirect("/")
                      }
                      if(role==="Admin" && password!="saravanabhavan123")
                      {
                        req.flash('error',"you are not a admin")
                        return res.redirect("/")
                      }
                     
                    passport.authenticate('local',(err,user,info) =>{
                       if(err)
                        {
                         req.flash('error',info.message)
                         return next(err)
                        }
                      if(!user)
                      {
                        
                          req.flash("error", info.message)
                          return res.redirect("/")
                      }
                      req.logIn(user,(err)=>{
                          if(err)
                          {
                             req.flash('error',info.message)
                            return next(err)
                        }
                    return res.redirect("/menu")
                   })
                 })(req,res,next)
                },
                register(req,res)
                    {
                      res.render('auth/register')
                    },
                async postregister(req,res)
                    {
                      const {role,name,email,password,confirmpassword}=req.body
                        
                       //validate request
                      if(!role ||!name || !email || !password || !confirmpassword )
                      {
                           req.flash('error',"All fields are required")
                           req.flash('role',role)
                           req.flash('name',name)
                           req.flash('email',email)
                           req.flash('password',password)
            
                           return res.redirect("/register")
                       }
                               //check if email exists
                      User.exists({email:email},(err,result)=>{
                        if(result)
                               {
                                    req.flash('error',"Email already exists")
                                    req.flash('role',role)
                                    req.flash('name',name)
                                    req.flash('email',email)
                                    req.flash('password',password)
                                    req.flash('confirmpassword',confirmpassword)
                                return res.redirect("/register")
                              }
                       })
    
                     if(password!=confirmpassword)
                          {
                            req.flash('error1',"password not match")
                            return res.redirect("/register")
                          }
                     if(role==="Admin" && password!="saravanabhavan123")
                     {
                      
                            req.flash('error',"you are not a admin")
                            return res.redirect("/register")
                     }
                     else{
                       console.log("admin")
                     }
                   //Hash password
                      const hashedPassword =await bcrypt.hash(password,10)
                        //create a user
                       const user=new User({
                          role,
                          name,
                          email,
                          password:hashedPassword,
                          confirmpassword:hashedPassword,
                          
                       })
                       console.log(user)
                   /user.save().then((user) =>{
                      passport.authenticate("local")
                      (req,res,function(){
                          res.redirect("/menu");
                      })
                     
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