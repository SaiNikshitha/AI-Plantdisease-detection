const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;
  // console.log("userid"+userUid);
  if (!userUid) return res.redirect("/login");
  const user = getUser(userUid);
  console.log("in log user"+user);
  if (!user) return res.redirect("/login");
  req.user = user;
  next();
}
async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;
  const user = getUser(userUid);
  req.user = user;
  next();
}

function restrictto(roles=[]){
  return function(req,res,next){

    if(!req.user) 
      return res.redirect("/login");

    if(!roles.includes(req.user.role))
      return res.end("UnAuthorized");
    return next();
  }
}
module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
  restrictto,
};