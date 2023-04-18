import { useState } from 'react';

import Catalog from '../layouts/Catalog/Catalog';
import Options from '../layouts/Options/Options';
import type { Sushi } from '../types';

const Home = () => {
  const [sushi, setSushi] = useState<Sushi[]>([]);

  return (
    <>
      <Options />
      <Catalog sushi={sushi} setSushi={setSushi} />
    </>
  );
};

export default Home;
