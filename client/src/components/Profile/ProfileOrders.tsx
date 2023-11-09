import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FC, useState } from 'react';

import Pagination from '@/components/Pagination/Pagination';
import { useGetAllOrdersQuery } from '@/services/order.service';

import styles from './Profile.module.scss';
import ProfileOrder from './ProfileOrder';
import LoadingBlock from '@/components/Loading/LoadingBlock';
import Popup from '@/components/Popup/Popup';

const ProfileOrders: FC = () => {
  const [parent] = useAutoAnimate();

  const [localCurrentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isSuccess, isError } = useGetAllOrdersQuery({
    page: localCurrentPage,
  });

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
      {isError && <Popup> ❌ Помилка при отриманні замовлень</Popup>}
      {isLoading && <LoadingBlock />}
      {isSuccess &&
        (data.orders.length > 0 ? (
          <>
            <ul ref={parent} className={styles.list}>
              {successOrders}
            </ul>
            {data.totalPages > 1 && (
              <Pagination
                currentPage={localCurrentPage}
                totalPages={data?.totalPages || 1}
                onChangePage={onClickPage}
              />
            )}
          </>
        ) : (
          <p className={styles.emptyMessage}>У вас немає замовлень 😢</p>
        ))}
    </div>
  );
};

export default ProfileOrders;
