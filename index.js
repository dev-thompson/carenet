let username = 'inverstor6';
let password = '1234Abc$$';
let confirm_password = '1234Abc$$'
//password required expression regex
let uppercase = /[A-Z]/.test(password);
let symbol = /[!@#$%^&*(),.?:{}|<>]/.test(password)
let number = /[0-9]/.test(password)
let validUsername = /[0-9]/.test(username)


if(username == ""){
    console.log('username is required');
   } 
   else if(!validUsername){
    console.log('username must contain letters and numbers');
    
   }
   else if(password == ""){
        console.log("password is required");    
    }
    else if(password.length < 8){
        console.log("password length must be more than 8");
    }
    else if (!uppercase){
        console.log("must have atleast an uppercase letter");  
    }
    else if(!number){
        console.log("must include a number");   
    }
    else if (!symbol){
        console.log("password must include a symbol");
        
    }
    else if(password != confirm_password){
        console.log("❌password mismatch");
    }
    else if (password.length == 8){
        console.log("password is weak");  
    }
    else{
        console.log(` ✅all checks where passed, welcome ${username}`);
        
    }