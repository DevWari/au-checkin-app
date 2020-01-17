export default  (
    name, 
    telephone, 
    vehicleReg, 
    garageCode, 
    userCode, 
    token
  ) => { 
    return fetch('https://api.auassist.co.uk/api/shared/add_event',{    
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',    
            'Authorization': "Bearer " + token,
        },
        body: JSON.stringify(
            { name : name,
            phone: telephone,
            vehicle_reg: vehicleReg,
            garage_code: garageCode,
            user_code: userCode                
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