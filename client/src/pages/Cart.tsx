import React from 'react';
import { useSelector } from 'react-redux';

import CartEmpty from '../components/CartEmpty/CartEmpty';
import CartBlock from '../layouts/CartBlock/CartBlock';
import { selectCartTotalCount } from '../store/slices/cartSlice';

const Cart: React.FC = () => {
  const totalCount = useSelector(selectCartTotalCount);

  return totalCount ? <CartBlock /> : <CartEmpty />;
};

export default Cart;
