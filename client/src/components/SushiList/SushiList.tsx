import React from 'react';

import { useQueryOptions } from '../../hooks';
import { useGetAllSushiQuery } from '../../services/api';
import type { Sushi, SushiFromServer } from '../../types';
import { convertSushiId } from '../../utils/helpers/convertSushiId';
import styles from './SushiList.module.scss';
import SushiListItem from './SushiListItem';
import SushiListItemSkeleton from './SushiListItemSkeleton';

interface SushiListProps {
  sushi: SushiFromServer[];
  status: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
}

const SushiList: React.FC<SushiListProps> = ({ sushi, status }) => {
  const sushiListItemElements =
    sushi?.length > 0 &&
    sushi.map((sushiFromServer) => {
      const sushi = convertSushiId(sushiFromServer);
      return <SushiListItem key={sushi.id} {...sushi} />;
    });

  const errorBlock = status.isError && <div>error</div>;
  const succeeded = status.isSuccess && sushiListItemElements;

  return (
    <ul className={styles.list}>
      {errorBlock}
      {succeeded}
    </ul>
  );
};

export default SushiList;

// ! доделать адресную строку
// const dispatch = useDispatch();
// const navigate = useNavigate();
// const isMounted = useRef(false);

// FIXME в асинхронную сагу нужно закинуть, чтоб после загрузки категорий эти действия выполнялись
// useEffect(() => {
//   if (window.location.search) {
//     const params = qs.parse(window.location.search.substring(1));
//     dispatch(
//       setOptions({
//         sortProperty: params.sortProperty,
//         categoryId: params.categoryId,
//         page: +params.page,
//       })
//     );
//     isSearch.current = true;
//   }
// }, []);

// FIXME туда же, что и выше
// useEffect(() => {
//   // если был первый рендер и изменился массив зависимостей, то выполняем вшивание в адресную строку
//   if (isMounted.current) {
//     const queryParams: QueryParams = {
//       sortProperty: selectedSort.byProperty,
//       categoryId: activeCategory.id,
//       page: currentPage,
//     };
//     const options: IStringifyOptions = {};
//     const queryString: string = qs.stringify(queryParams, options);

//     navigate(`?${queryString}`);
//   }
//   isMounted.current = true;
// }, [activeCategory.id, selectedSort.byProperty, searchValue, currentPage]);
