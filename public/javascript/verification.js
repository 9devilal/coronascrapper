/*this file is for the otp veriification*/

document.addEventListener('DOMContentLoaded',()=>{
 console.log("<%=detail.frequency%>");
/*accessing the passed parameters */
  var button = document.querySelector('input[type=submit]');

  /*adding an event to submit button for otp verification */
  button.addEventListener('dbclick',verify,false)

  /*fired function */
  function verify(){
    var otpfield=document.querySelector("input[type=number");console.log(otpfield.value);
      if(otp!=otpfield.value)
        {
            alert("Oops!! seems you entered a wrong otp..try again");

        }
       else{
        fetch('/confirm', {
            method: 'POST',
            body: JSON.stringify({number: phone, name: uname,frequency:freq}),
            headers: {
              'Content-Type': 'application/json'
            } 
          })
          .then(function(res){ console.log(res) })
          .catch(function(error){ console.log(error)});
       }
    }
});