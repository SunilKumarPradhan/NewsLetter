const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https"); 
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  
  console.log(firstName, lastName, email);

  const data={
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: lastName
      }
    }
  ]
};
   
  const jsonData = JSON.stringify(data);

  
    const options = {
      method: "POST",
      auth: "Sunil_47:274d6bc67aa435bc5c776d5c65966bdc-us13",
    };
  


    // URL for the endpoint
    const url = "https://us13.api.mailchimp.com/3.0/lists/83d7f37498";
    // create a request object and send the data
    const request = https.request(url,options,(response)=>{

 
      if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
      }else{
        res.sendFile(__dirname + "/failure.html");
      }

      response.on("data",(data)=>{
        console.log(JSON.parse(data));
      });
    });
  
    request.write(jsonData);
    request.end();
  });
  
  app.post("/failure", (req, res) => { 
    res.redirect("/");
  });
  
  app.listen(process.env.PORT || 3000 , () => {
    console.log("Server is running on port 3000");
  });

