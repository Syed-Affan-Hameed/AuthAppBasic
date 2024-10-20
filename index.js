import jwt from "jsonwebtoken";
import zod from "zod";

const jwt_password = "secret";
const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6);

function signJwt(username, password) {

    const usernameResponse = emailSchema.safeParse(username);
    const passwordResponse = passwordSchema.safeParse(password);

    if(usernameResponse.success===false || passwordResponse.success === false){
        return null;
    }
  const jwTSignature = jwt.sign(
    {
      username,
    },
    jwt_password
  );

  return jwTSignature;
}

function verifyJwt(token) {

    try{
        const isVerified = jwt.verify(token,'jwt_password');
        if(isVerified){
            return true;
         }
         else{
             return false;
         }
    }
    catch(error){
        console.log("Error Verfiying the JWT")
    }



}

function decodeJwt(token) {

    const isDecoded =jwt.decode(token);

    if(isDecoded){
       return true;
    }
    else{
        return false;
    }
}

const output = signJwt("syed@yahoomail.com","affanhameed");

console.log(output);

const canBeDecoded = decodeJwt(output);

console.log("Can be decoded",canBeDecoded);

const canBeVerified = verifyJwt(output);

console.log("Can be verified",canBeVerified);
