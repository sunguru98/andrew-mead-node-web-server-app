const express = require("express");
const hbs = require("hbs");
const fs = require("fs");


let serverPort = process.env.PORT||3000;
let app = express();

hbs.registerPartials(__dirname+"/views/partials");

app.use((request,response,next)=>{
    log = `${new Date().toString()} ${request.method} ${request.url}`;
    console.log(log);
    fs.appendFileSync("serverMessages.log",log+"\n");
    next();
})

// app.use((req,res,next)=>{
//     res.render("maintenance.hbs");
    
// })


app.set("view engine","hbs");
app.get("/",(request,response)=>{
    response.render("home.hbs",{
        pageTitle:"Welcome Page",
        pageMessage:"This is the Main welcome page",
        welcomeMessage:"We used hbs to sync with the help of the backend Node.js framework",
        copyrightYear:new Date().getFullYear(),
    });
});

app.get("/contact-us",(request,response)=>{
    response.render("contact-us.hbs",{
        pageTitle:"Contact Us page",
        pageMessage:"This is the Contact-us page",
        welcomeMessage:"We are here in the contact us",
        copyrightYear:new Date().getFullYear(),
    });   
});

app.get("/projects",(request,response)=>{
    response.render("projects.hbs",{
        pageTitle:"Projects page",
        pageMessage:"This is the Projects page",
        welcomeMessage:"We are here in the Projects Page",
        copyrightYear:new Date().getFullYear(),
    });   
});

app.get("/bad",(request,response)=>{
    response.send({
        errorMessage:"There is something wrong about the server connectivity please try again",
    });
    console.log(request);
});

app.listen(serverPort,()=>{
    console.log("The port is "+serverPort);
})