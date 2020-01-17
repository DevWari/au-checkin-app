import { LOG_IN, LOGIN_SUCCESS, LOGIN_FAILURE, LOG_OUT, LOG_OUT_SUCCESS, LOG_OUT_FAILURE } from '../actions/actionType'
import { put, takeEvery } from 'redux-saga/effects'
import login from '../../service/customerLoginAPI'
import { navigate } from '../../utils/navigation';
import {Alert} from 'react-native'
function* customerLogin (action) { 

  try {
    const data = yield login(action.appCode, action.password)  
    console.log ("saga data..............", data)      
    yield put({ type: LOGIN_SUCCESS, data })    
    return navigate ('CheckInHome')    
  } catch (e) {
    yield put({ type: LOGIN_FAILURE })
    Alert.alert("Warning", "Are you fogot your password?")
  }
}
function* customerLogout (action) { 

  try {    
    yield put({ type: LOG_OUT_SUCCESS })
  } catch (e) {
    yield put({ type: LOG_OUT_FAILURE })
  }
}

function* customerLoginSaga () {  
  yield takeEvery(LOG_IN, customerLogin),
  yield takeEvery(LOG_OUT, customerLogout)
}
export default customerLoginSaga

