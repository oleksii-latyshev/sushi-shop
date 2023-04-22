import React from 'react';

import type { Sushi } from '../../types';
import styles from './SushiList.module.scss';
import SushiListItem from './SushiListItem';
import SushiListItemSkeleton from './SushiListItemSkeleton';

interface SushiListProps {
  sushi: Sushi[];
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const SushiList: React.FC<SushiListProps> = ({ sushi, status }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const skeletons = [...new Array(6)].map((_, i) => <SushiListItemSkeleton key={i} />);

  const sushiListItemElements = sushi.map((sushi) => (
    <SushiListItem key={sushi.id} {...sushi} />
  ));

  const errorBlock = status === 'failed' && <div>error</div>;
  const pending = status === 'pending' && skeletons;
  const succeeded = status === 'succeeded' && sushiListItemElements;
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
