# Abouts
  This is a simple web app which send it's user the detail about number of COVID-19 affected people in india through 
   text messages.
   It fetches the data from [here](https://www.worldometers.info/coronavirus/country/india/)


  # Things you will need
    1 _sql server_
    2 _Nexmo messaging API_
    3 _check the package.json for dependencies_
    4 _make sure you set get your own virtual number and edit the corresponding lines of code_
    
# Screenshots
<img src="public/images/homepage.png" height="400" width="800">
<img src="public/images/otp.png" height="400" width="800">

# Make sure you replace the following snippets with your own details
  1 server/index.js
     
     ``` const Nexmo=require('nexmo');
       const nexmo = new Nexmo({
       apiKey: 'xxxxxxxxx',
       apiSecret:'xxxxxxxx',
     } ,{debug:true});```
     
  
     ```
       var connection=mysql.createConnection({
       host:"localhost",
       user:"xxxx",
       password:"xxxx",
       database:"xxx"
     });
       
     ```
   2 public/javascript/scrap.js
   ``` 
      const Nexmo=require('nexmo');
       const nexmo = new Nexmo({
       apiKey: 'xxxxxxxxx',
       apiSecret:'xxxxxxxx',
     } ,{debug:true});```
     
  
     ```
       var connection=mysql.createConnection({
       host:"localhost",
       user:"xxxx",
       password:"xxxx",
       database:"xxx"
     });
       
     ```
   
