import React from 'react';
import { useSelector } from 'react-redux';

import CartBlock from '@/components/CartBlock/CartBlock';
import CartEmpty from '@/components/CartEmpty/CartEmpty';
import { selectCartTotalCount } from '@/store/slices/cart.slice';

const Cart: React.FC = () => {
  const totalCount = useSelector(selectCartTotalCount);
  return totalCount ? <CartBlock /> : <CartEmpty />;
};

export default Cart;
