//'use strict';
const express= require('express');
const morgan=require('morgan');
const app=express();
const bodyparser=require('body-parser');
const ejs=require('ejs');
const mysql =require('mysql');
const server =app.listen(3000);
const corona=require('../public/javascript/scrap.js')

/*configuring your nexmo message api */

const Nexmo=require('nexmo');
const nexmo = new Nexmo({
    apiKey: 'xxxxx',
    apiSecret:'xxxxxxxxxx',
},{debug:true});




/*connecting to sql server with database named userdata*/

var connection=mysql.createConnection({
    host:"localhost",
    user:"xxxxx",
    password:"xxxxxx",
    database:"xxxxxxx"
});

connection.connect((err)=>{
    if(err)
    throw err;
    console.log( "connected !! to sql server");
})

app.use(morgan('dev'));
app.set('views',__dirname+'/../views');
app.set('view engine','html');
app.engine('html',ejs.renderFile);


/*serving static files from public folder */
app.use(express.static(__dirname +'/../public'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));


/*serving landing page or index page */
app.get('',(req,res)=>{
    res.statusCode=200;
    corona();
    res.render('index');
    //console.log(msg.array);
})


/*routing the user for otp verifcation */
app.post('/register', (req, res) => {
    console.log(req.body);
    otp=Math.floor((Math.random()*10000)+1000);
    console.log(otp);
   
    const toNumber =req.body.phone;
    const toUser=req.body.username;
    const text="dear "+toUser+" your OTP is "+otp;
    nexmo.message.sendSms(1359,toNumber,text,{type:'unicode'},(err,ressponseData)=>{
        if(err) 
            throw err;
         console.log(ressponseData);   
    })

    res.render('verification',{detail:req.body,otp:otp});

  });
  /*Now otp has been confirmed now the details need to be sent 
  to the database  for account creation*/

  app.post('/confirm',(req,res)=>{
      console.log(req.body);
      /*making query */
      var sql="INSERT INTO users(`username`,`phone`,`frequency`,`date_created`) VALUES ('"+req.body.username+"','"+req.body.phone +"','"+req.body.freq+"','"+new Date().toJSON().slice(0, 10)+"')";
      var values=[req.body.username,req.body.phone,req.body.freq,Date.now()];
      connection.query(sql,(err,result)=>{
          if (err)
           throw err;
           console.log("record inserted successfully into the database");  
      })
     /*navigating back to homepage */
      res.redirect('./');
  })
