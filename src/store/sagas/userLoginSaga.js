import { USER_LOG_IN, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE } from '../actions/actionType'
import { put, takeEvery } from 'redux-saga/effects'
import userLoginAPI from '../../service/userLoginAPI'

function* userLogin (action) { 

  try {
    const data = yield userLoginAPI(
                            action.name, 
                            action.telephone, 
                            action.vehicleReg, 
                            action.garageCode, 
                            action.userCode, 
                            action.token
    )    
    console.log ("saga data.......", data)
    yield put({ type: USER_LOGIN_SUCCESS, data })
  } catch (e) {
    yield put({ type: USER_LOGIN_FAILURE, data })
  }
}
function* userLoginSaga () {  
  yield takeEvery(USER_LOG_IN, userLogin)  
}
export default userLoginSaga

