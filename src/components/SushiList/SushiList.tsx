import React from 'react';

import { useQueryOptions } from '../../hooks';
import { useGetAllSushiQuery } from '../../store/api/api';
import styles from './SushiList.module.scss';
import SushiListItem from './SushiListItem';
import SushiListItemSkeleton from './SushiListItemSkeleton';

const SushiList: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const skeletons = [...new Array(6)].map((_, i) => <SushiListItemSkeleton key={i} />);

  const queryOptions = useQueryOptions();

  const { isLoading, isError, isSuccess, data } = useGetAllSushiQuery(queryOptions, {});

  const sushiListItemElements = data
    ? data.map((sushi) => <SushiListItem key={sushi.id} {...sushi} />)
    : [];

  const errorBlock = isError && <div>error</div>;
  const pending = isLoading && skeletons;
  const succeeded = isSuccess && sushiListItemElements;

  return (
    <ul className={styles.list}>
      {errorBlock}
      {pending}
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
