

import {LOG_OUT, LOG_IN, USER_LOG_IN} from './actionType'

// login action 
export function login (appCode, password) {  
  return {
    type: LOG_IN,
    appCode,
    password,
  }
}
export function logout () {  
  
  return {
    type: LOG_OUT,    
  }
}
export function userLogin (name, telephone, vehicleReg, garageCode, userCode, token) {  

  console.log ("userLogin Action........")
  return {
    type: USER_LOG_IN,
      name,
      telephone,      
      vehicleReg,
      garageCode,
      userCode,
      token    
  }
}


