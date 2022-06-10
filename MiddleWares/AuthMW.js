const jwt=require("jsonwebtoken");

module.exports=(request,response,next)=>{
    let token,decodedToken;
    try{
        token=response.get("Authorization").split(" ")[1];
        decodedToken=jwt.verify(token,"MyNameIsAdmin")
        next();
    }
    catch(error){
        next (new Error("Not Authenticated"));
    }
    request.Role=decodedToken.Role;
}
