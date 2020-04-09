
/*getting the form details */
document.addEventListener('DOMContentLoaded',()=>{
var numberField = document.querySelector('input[name=phone]');
var textField = document.querySelector('#username');
var button = document.querySelector('input[type=submit]');
var frequency=document.querySelector('input[name=frequency]')
console.log(textField);
console.log(numberField);
console.log(__dirname);
  button.addEventListener('click', send, false);

  /*extracting the transferrable data */
  function send() {
    var number = numberField.value.replace(/\D/g,''); // Remove all non-numeric chars
    var text = textField.value;
    var freq=frequency.value;
    // ... will send the form using fetch here
  
//sending data via fetch api

  fetch('/register', {
    method: 'POST',
    body: JSON.stringify({number: number, name: text,frequency:freq}),
    headers: {
      'Content-Type': 'application/json'
    },
    
  })
  .then(function(res){ console.log(res) })
  .catch(function(error){ console.log(error)});
}
})