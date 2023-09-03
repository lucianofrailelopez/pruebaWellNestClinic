import axios from 'axios';

import { SET_USER,  UPDATE_PROFILE_PICTURE,  UPDATE_PASSWORD,
  PAY_MEMBERSHIP,  CANCEL_MEMBERSHIP, LOGIN_USERMEMBER,  VERIFY_USERNAME,
  VERIFY_ISMEMBER, GENERIC_ERROR, RESET_GENERIC_ERROR, RESET_IS_MEMBER,
  GET_USER_ID } from './type.js';


export const verifyUsername = (userName) => {
  const endPoint = import.meta.env.VITE_BASENDPOINT_BACK + `/userClient/validateUser/?userName=${userName}`
  return (dispatch) => {
    axios.get(endPoint).then(({data}) => {
      return dispatch({
        type: VERIFY_USERNAME,
        payload: data
      })
    }).catch((error) => {
      var err = error.response;
      return dispatch({
        type: GENERIC_ERROR,
        payload: err.data.error
      });
    });
  };
};

export const verifyIsMember = (ID) => {
  const endPoint = import.meta.env.VITE_BASENDPOINT_BACK + `/userClient/isMember/${ID}`
  return (dispatch) => {
    axios.get(endPoint).then(({data}) => {
      return dispatch({
        type: VERIFY_ISMEMBER,
        payload: data
      })
    }).catch((error) => {
      var err = error.response;
      if(err.status === 403){
        return dispatch({
          type: GENERIC_ERROR,
          payload: {...err.data, status: err.status}
        });
      }
      
    });
  };
}

export const resetGenericError = () => {
  return {
    type: RESET_GENERIC_ERROR,
    payload: null
  }
}

export const loginUser = (email, password, dni) => {
  return async function (dispatch) {
    const datos = {
      password: password,
      userName: email,
      dni: dni,
    };
    const endpoint = import.meta.env.VITE_BASENDPOINT_BACK + `/userClient/login` ;
    try {
      const response = await axios.post(endpoint, datos);
      const apiResponse = response.data;

      dispatch({ type: LOGIN_USERMEMBER, payload: apiResponse });

      return response;
    } catch (error) {
      return error.response;
    }
  };
};

export const signUp = async (email, password, id) => {
  const endpoint = import.meta.env.VITE_BASENDPOINT_BACK + `/userClient/register`;
  try {
    const body = {
      email: email,
      password: password,
      id: id,
    };
    const response = await axios.post(endpoint, body);
    return response;

  } catch (error) {
    return error.response;
  }
};

export const resetIsMember = () => ({
  type: RESET_IS_MEMBER,
  payload: null
});

export const getUser = (id) => {
  const endPoint = import.meta.env.VITE_BASENDPOINT_BACK + `/userClient/?id=${id}`;
  return (dispatch) => {
    axios.get(endPoint).then(({data}) => {
      return dispatch({
        type: GET_USER_ID,
        payload: data
      })
    }).catch((error) => {
      var err = error.response;
      return dispatch({
        type: GENERIC_ERROR,
        payload: err.data.error
      });
    });
  };
  
}









export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const updateUserProfilePicture = (newProfilePicture) => ({
  type: UPDATE_PROFILE_PICTURE,
  payload: newProfilePicture,
});

export const updateUserPassword = (newPassword) => ({
  type: UPDATE_PASSWORD,
  payload: newPassword,
});

export const payMembership = () => ({
  type: PAY_MEMBERSHIP,
});

export const cancelMembership = () => ({
  type: CANCEL_MEMBERSHIP,
});
