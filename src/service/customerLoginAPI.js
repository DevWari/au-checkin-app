export default (appCode,password) => {    
    return fetch('https://api.auassist.co.uk/api/auth/login',{    
        method: 'POST',
        headers: 
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json',            
        },
        body: JSON.stringify(
        {
            app_code : appCode, 
            password : password,
        })    
    })
    .then((response) => response.json())
    .then((responseJsonFromServer) => {           
            return responseJsonFromServer        
    })
    .catch((error) => {
        console.error("errrrr",error);                
    });  
}

  

