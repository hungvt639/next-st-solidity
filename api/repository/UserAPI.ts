// import ClientAPI from "../ClientAPI";
import UserRepositoryInterface from "../../interface/api/UserAPI";

// const resource = "user";

// const register = (data: DataRegister) => {
//     return ClientAPI(false).post(`${resource}/register`, data);
// };

// const activateUser = (data: DataActivateUser) => {
//     return ClientAPI(false).post(`${resource}/active_user`, data);
// };

// const login = (data: DataLogin) => {
//     return ClientAPI(false).post(`${resource}/login`, data);
// };

// const sendResetPassword = (data: DataSendResetPassword) => {
//     return ClientAPI(false).post(`${resource}/send-reset-password`, data);
// };

// const resetPassword = (data: DataResetPassword) => {
//     return ClientAPI(false).post(`${resource}/reset-password`, data);
// };

// const changePassword = (data: DataChangePassword) => {
//     return ClientAPI(true).post(`${resource}/change-password`, data);
// };

// const getProfile = () => {
//     return ClientAPI(true).get(`${resource}/profile`);
// };

const userRepository: UserRepositoryInterface = {
    //     login: login,
    //     register: register,
    //     getProfile: getProfile,
    //     changePassword: changePassword,
    //     activateUser: activateUser,
    //     sendResetPassword: sendResetPassword,
    //     resetPassword: resetPassword,
};
export default userRepository;
