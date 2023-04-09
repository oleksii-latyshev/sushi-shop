import styles from './App.module.scss';
import FoodLIst from './components/FoodList/FoodLIst';
import Header from './layouts/Header/Header';
import Options from './layouts/Options/Options';

const App = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Options />
      <div className={styles.content}>
        <FoodLIst />
      </div>
    </div>
  );
};

export default App;
