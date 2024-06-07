import { useEffect, useState } from "react";
import useAuth from "./UseAuth";
import UseAxiosSecure from "./UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useThisUser = () => {
  const { user } = useAuth();
  const [axiosSecure] = UseAxiosSecure();
  const [thisUserLoading, setThisUserLoading] = useState(true);
  const [thisUser, setThisUser] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const res = await axiosSecure.get(`/users/${user.email}`);
          setThisUser(res.data);
          setThisUserLoading(false);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchData();
    }
  }, []);

  return { thisUser, thisUserLoading };
};

export default useThisUser;
