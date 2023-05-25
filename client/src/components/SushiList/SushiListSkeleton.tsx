import React from 'react';

import styles from './SushiList.module.scss';
import SushiListItemSkeleton from './SushiListItemSkeleton';

const SushiListSkeleton: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const skeletons = [...new Array(6)].map((_, i) => <SushiListItemSkeleton key={i} />);

  return <ul className={styles.list}>{skeletons}</ul>;
};

export default SushiListSkeleton;
