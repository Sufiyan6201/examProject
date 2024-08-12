const userDB = require("../models/user.Schema");
const jwt = require('jsonwebtoken')
const loginPage = async (req, res) => {
     // const { username, password } = req.body;
     // if(!username || !password){
     //      return res.status(400).json({message:"Please enter both username and password"})
     // }
     // try {
     //      const user= await userDB.findOne({username:username});
     //      if(!user){
     //           return res.status(401).send({error:'user not found'})
     //      }
     //      const isvalidPassword = await bcrypt.compare(password,user.password)
     //      if(!isvalidPassword){
     //           return res.status(401).send({error:'Invalid password'})     
     //           }
     //           const paylode ={
     //                id: user.id,
     //                username: user.username,
     //                email: user.email,
     //                phone:user.phone,
     //                role:user.role,

     //           };

     //           const token = jwt .sign(paylode, process.env.SECRET_KEY ,{expiresIn:'1h'});
     //           res.cookie('token',token,{httpOnly:true,maxAge:3600000});

     //           if(user.role==='user'){
     //                return res.redirect('/user');

     //           }else{
     //                return res.redirect('/blog');
     //           }


     // } catch (error) {
     //      console.log(error);
     //      return res.status(500).send({error:'Internal Server Error'})
     // }
     res.render('login')
};
const signup = (req, res) => {
     try {
          res.render('signup')
     } catch (error) {
          console.log(error);
     }
}
const insertUserData = async (req, res) => {
     const { name, email, password, phone } = req.body;

     try {
          await userDB.create({ name, email, password, phone });
          return res.redirect('/login')
     } catch (error) {
          console.log(error);
     }
}

const login = async (req, res) => {
     const { name, password } = req.body;
     try {
          const user = await userDB.findOne({ name: name });
          if (!user) {
               console.log("User Not Found");
               return res.redirect('/login');
          }
          if (user.password != password) {
               console.log(password);
               console.log(user.password);
               console.log("Password Not Match");
               return res.redirect('/login');

          }
          const paylode = {
               id: user.id,
               username: user.username,
               email: user.email,
               phone: user.phone,
          };
          const token = jwt .sign(paylode,"KEY");
          return res.cookie('user', token).redirect('/')
     }
     catch (error) {
          console.log(error);
     }

}
const logout = async (req, res) => {
     res.clearCookie('user');
     return res.redirect('/login');
}
module.exports = { loginPage, signup, insertUserData, login, logout }