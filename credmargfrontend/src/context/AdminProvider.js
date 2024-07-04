import { useState } from 'react';
import AdminContext from './AdminContext';

const AdminProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [adminData, setAdminData] = useState(null);



    //logout
    const doLogout = () => {
      setIsLogin(false);
      setAdminData(null);


    };

  return (
    <AdminContext.Provider
      value={{
        adminData,
        setAdminData,
        isLogin,
        setIsLogin,
        logout:doLogout
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
