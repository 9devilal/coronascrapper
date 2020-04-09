/*this file fetches the data of COVID-19 infected people from worldometer */

const request= require('request');
const cheerio=require('cheerio');
const mysql =require('mysql');
/*cheerio is a node module which facilates web scrapping */

var connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"acmicpc21",
    database:"userdata"
}); 


/*configuring your nexmo account */
const Nexmo=require('nexmo');
const nexmo = new Nexmo({
    apiKey: '125d3a29',
    apiSecret:'qGpdf9H85q3wVnm3',
},{debug:true});


const corona=()=>{
    //var message;
    //console.log("for"+x++ +"time");
    connection.connect((err)=>{
        if(err)
        throw err;
        console.log( "connected !! to sql server");
    })
    request('https://www.worldometers.info/coronavirus/country/india/',(error,response
   ,html)=>{
       if(!error&&response.statusCode==200)
         {  
            const $=cheerio.load(html);
            const mobile=$('#maincounter-wrap');
            var meter=mobile.text().trim().toString();
            var array=meter.split(':');
          //removing all non digit characters from string
          for(let i=0;i<4;i++)
            {
                array[i]=array[i].replace(/\D/gm,'');
            }
           console.log("Total cases : "+array[1]+"\nTotal Deaths :"+array[2]+"\nTotal recovered : "+array[3]);

           var sql="SELECT * FROM users ";
           connection.query(sql,(err,result)=>{
               if(err) throw err;
               console.log(result.length);
               for(var x=0;x<result.length;x++)
               {
                  console.log(result[x]);

                  const toNumber =result[x].phone;
                  const toUser=result[x].username;
                  const text="dear "+toUser+" total cases are "+array[1]+" with "+array[2]+" deaths and "+array[3]+" recovered patients in india ";
                  nexmo.message.sendSms(1359,toNumber,text,{type:'unicode'},(err,ressponseData)=>{
                 if(err) 
                     throw err;
                  console.log(ressponseData);   
                   })
               }
           })
       }
})
};
/*making this function available to other files */
module.exports=corona;