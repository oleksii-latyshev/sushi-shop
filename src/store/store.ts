import { configureStore } from '@reduxjs/toolkit';

import * as reducers from './slices';

export default configureStore({
  reducer: { ...reducers },
});
