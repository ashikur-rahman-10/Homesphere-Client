import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
