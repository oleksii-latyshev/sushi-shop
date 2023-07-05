import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SushiList from '@/components/SushiList/SushiList';
import WishlistHeader from '@/components/Wishlist/WishlistHeader';
import { useAppSelector } from '@/hooks';
import { useGetWishlistQuery } from '@/services/user.service';

const Wishlist: FC = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate('/signIn');
    }
  }, [user]);

  const { data, isError, isLoading, isSuccess } = useGetWishlistQuery(null);

  const loadingWishlist = isLoading && <div>loading</div>;
  const errorWishlist = isError && <div>error</div>;
  const successWishlist = isSuccess && data && <SushiList sushi={data} />;

  return (
    <div>
      <WishlistHeader />
      {loadingWishlist}
      {errorWishlist}
      {successWishlist}
    </div>
  );
};

export default Wishlist;
