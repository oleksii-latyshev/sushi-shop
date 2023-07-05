import React from 'react';

import { ISushi } from '@/types/sushi.types';

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
