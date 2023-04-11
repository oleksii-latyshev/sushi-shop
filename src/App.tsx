import styles from './App.module.scss';
import ContentFood from './layouts/ContentFood/ContentFood';
import Header from './layouts/Header/Header';
import Options from './layouts/Options/Options';

const App = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Options />
      <ContentFood />
    </div>
  );
};

export default App;
