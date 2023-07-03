import React from 'react';

import { ISushi } from '@/types';

import styles from './SushiList.module.scss';
import SushiListItem from './SushiListItem';

interface SushiListProps {
  sushi: ISushi[];
}

const SushiList: React.FC<SushiListProps> = ({ sushi }) => {
  const sushiListItemElements =
    sushi.length > 0 &&
    sushi.map((sushiFromServer) => {
      return <SushiListItem key={sushiFromServer._id} {...sushiFromServer} />;
    });

  return <ul className={styles.list}>{sushiListItemElements}</ul>;
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
