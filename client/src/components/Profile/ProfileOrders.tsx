import { FC, useState } from 'react';

import Pagination from '@/components/Pagination/Pagination';
import { useGetAllOrdersQuery } from '@/services/order.service';

import styles from './Profile.module.scss';
import ProfileOrder from './ProfileOrder';

const ProfileOrders: FC = () => {
  const [localCurrentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isSuccess, isError } = useGetAllOrdersQuery({
    page: localCurrentPage,
  });

  const errorOrders = isError && <div>ошибка</div>;
  const loadingOrders = isLoading && <div>загрузка</div>;

  const successOrders = isSuccess && (
    <ul className={styles.list}>
      {data?.orders.length > 0 &&
        data.orders.map((order) => <ProfileOrder key={order._id} {...order} />)}
    </ul>
  );

  const onClickPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h3>Ваші замовлення:</h3>
      {errorOrders}
      {loadingOrders}
      {successOrders}
      <Pagination
        currentPage={localCurrentPage}
        totalPages={data?.totalPages || 1}
        onChangePage={onClickPage}
      />
    </div>
  );
};

export default ProfileOrders;
