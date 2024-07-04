// user related api calls
import { publicAxios } from "./axios.service";

//register new user
export const registerAdmin = async (data) => {
  const response = await publicAxios.post(`/admins`, data);
    return response.data;
};

//login user
export const adminLogin = async (loginData) => {
    const response = await publicAxios
        .post(`/admins/getAdmin`, loginData);
    return response.data;
  };

  //all employees
export const allEmployees = async (id) => {
    const response = await publicAxios
        .get(`admins/${id}/employees`);
    return response.data;
  };

 //all vendors
export const allVendors = async (id) => {
  const response = await publicAxios
      .get(`admins/${id}/vendors`);
  return response.data;
};

 //all emails
 export const emailLogs = async (id) => {
  const response = await publicAxios
      .get(`admins/${id}/emails`);
  return response.data;
};

//addEmployee
export const addEmployee = async (id,data) => {
  const response = await publicAxios
      .post(`admins/${id}/employees`, data);
  return response.data;
};

//addVendor
export const addVendor = async (id,data) => {
  const response = await publicAxios
      .post(`admins/${id}/vendors`, data);
  return response.data;
};

//send email
export const sendEmails = async (id,template) => {
  const response = await publicAxios
      .post(`admins/${id}/sendEmail`, template);
  return response.data;
};

 //all emails
 export const getVendor = async (id,email) => {
  const response = await publicAxios
      .get(`admins/${id}/vendor/${email}`);
  return response.data;
};

