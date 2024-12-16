import { API } from '../apiEndPoints/apiEndPoints'
import { axiosGet, axiosPatch, axiosPost } from '../axios/axiosMiddleware'

export const LoginUser = (data) => {
  return axiosPost(API?.AUTH?.LOGIN, data)
}

export const ForgotPassword = (data) => {
  return axiosPost(API?.AUTH?.FORGOT, data)
}

export const OtpVerification = (data) => {
  return axiosPost(API?.AUTH?.VERIFY_OTP, data)
}

export const GetUser = () => {
  return axiosGet(API.AUTH.USER)
}

export const ForgotAddNewPassword = (data) => {
  return axiosPost(API?.AUTH?.ADD_NEW_PASSWORD, data)
}

export const ResetPasswordApi = (data) => {
  return axiosPost(API?.AUTH?.RESET_PASSWORD, data)
}

export const ChangePasswordFistTime = (data) => {
  return axiosPost(API?.AUTH?.CHANGE_PASSWORD, data)
}
export const LogoutApi = (data) => {
  console.log(data)
  console.log("i an logout api");

  return axiosPost(API?.AUTH?.LOGOUT, data)
}
export const GetProfile = () => {
  return axiosGet(API?.AUTH?.GET_PROFILE)
}

export const UpdateUserProfile = (data) => {
  return axiosPatch(API?.AUTH?.UPDATE_PROFILE, data)
}
