import Categories from '../../components/Categories/Categories';
import Sort from '../../components/Sort/Sort';
import styles from './Options.module.scss';

const Options = () => {
  return (
    <div className={styles.wrapper}>
      <Categories />
      <Sort />
    </div>
  );
};

export default Options;
