document.querySelector( 'form' ).addEventListener( 'submit', async function ( e ) {
    e.preventDefault();
    
    const passwordInput = document.getElementById( "password" ).value;
    const confirmPasswordInput = document.getElementById( "confirmPassword" ).value;
    
    if ( passwordInput !== confirmPasswordInput ) {
        alert( "Password and Confirm Password is different" );
        return;
    }

    let user = {
        first_name: document.getElementById( "fname" ).value,
        last_name: document.getElementById( "lname" ).value,
        birth_date: document.getElementById( "birthday" ).value,
        username: document.getElementById( "username" ).value,
        email: document.getElementById( "email" ).value,
        password: passwordInput,
    }

   const csrfToken=document.querySelector('[name=csrfmiddlewaretoken]').value
    
    const response=await fetch('/api/accounts/api/signup/',{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'X-CSRFToken':csrfToken
    },
    body:JSON.stringify(user)
   });
   const result=await response.json();
   if(result.error){
    alert(result.error);
   }
   else{
    alert(result.message);
    window.location.replace("/api/accounts/login/");
   }
});