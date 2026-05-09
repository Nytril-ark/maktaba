document.querySelector('form').addEventListener('submit',async function(e) {
    e.preventDefault();
    const emailInput = document.getElementById("email").value;
    const passwordInput = document.getElementById("password").value;

    let user={
      email:emailInput,
      password:passwordInput
    }

   const csrfToken=document.querySelector('[name=csrfmiddlewaretoken]').value

    const response=await fetch('/api/accounts/login/',{
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
    sessionStorage.setItem("currentPassword",result.password)
    if(result.role=="Admin"){
      window.location.replace("../html/admin_dashboard.html");//we need to replace this path with django path
    }
    else{
        window.location.replace("../html/index.html");//we need to replace this path with django path
    }
 }




 
});