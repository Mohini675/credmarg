import { createContext } from 'react';

const AdminContext = createContext({
  adminData: null,
  setAdminData: () => {},
  isLogin: false,
  setIsLogin: () => {},
});

export default AdminContext;