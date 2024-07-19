let password  = document.getElementById("exampleInputPassword4");

password.onkeydown = ()=>{
    password.type = "text";
}
password.onkeyup = ()=>{
    setTimeout(()=>{
        password.type = "password";
    },500);
}


