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

  const successOrders =
    isSuccess &&
    data?.orders.length > 0 &&
    data.orders.map((order) => <ProfileOrder key={order._id} {...order} />);

  const onClickPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h3>Ваші замовлення:</h3>
      {errorOrders}
      {loadingOrders}
      {isSuccess && data.orders.length > 0 ? (
        <>
          <ul className={styles.list}>{successOrders}</ul>
          <Pagination
            currentPage={localCurrentPage}
            totalPages={data?.totalPages || 1}
            onChangePage={onClickPage}
          />
        </>
      ) : (
        <p className={styles.emptyMessage}>У вас немає замовлень 😢</p>
      )}
    </div>
  );
};

export default ProfileOrders;
