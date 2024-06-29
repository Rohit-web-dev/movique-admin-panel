import { useState, useEffect } from 'react';
import appwriteService from '../store/appwrite/config';

  const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const user = await appwriteService.getCurrentUser();
          setIsAuthenticated(Boolean(user));
        } catch (error) {
          setIsAuthenticated(false);
        } finally {
          setLoading(false);
        }
      };
  
      checkAuth();
    }, []);
  
    return { isAuthenticated, loading };
  };
  
  export default useAuth;
