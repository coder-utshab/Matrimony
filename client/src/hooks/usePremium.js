import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from './useAxiosSecure';

const usePremium = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: isPremium, isPending: isPremiumLoading } = useQuery({
    queryKey: [user?.email, 'isPremium'],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/premium/${user.email}`);
      return res.data?.premium;
    }
  });

  return [isPremium, isPremiumLoading];
};

export default usePremium;
