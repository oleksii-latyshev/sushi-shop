import '../../sass/variables.scss';

import React from 'react';
import ContentLoader from 'react-content-loader';

import styles from './FoodList.module.scss';

const FoodListItemSkeleton = () => (
  <ContentLoader
    className={styles.item}
    speed={2}
    width={340}
    height={500}
    viewBox='0 0 340 500'
    backgroundColor='#303030'
    foregroundColor='#404040'
  >
    <rect x='0' y='0' rx='0' ry='0' width='340' height='350' />
    <rect x='0' y='360' rx='10' ry='10' width='340' height='32' />
    <rect x='0' y='400' rx='10' ry='10' width='340' height='32' />
    <rect x='190' y='440' rx='10' ry='10' width='150' height='55' />
    <rect x='0' y='440' rx='10' ry='10' width='150' height='55' />
  </ContentLoader>
);
// 5363 5420 9501 4800
export default FoodListItemSkeleton;
