import { useEffect } from 'react';

import { useAuthMeQuery } from '@/services/auth.service';
import { setUser } from '@/store/slices/settings.slice';

import { useAppDispatch } from '.';

export const useInitialization = () => {
  const { data, isSuccess } = useAuthMeQuery(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data));
    }
  }, [isSuccess]);
};
