import { createStore } from 'redux';

import { rootReducer } from './reducer/items';

const store = createStore(rootReducer);

export default store;
