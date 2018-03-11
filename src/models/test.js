import { queryTest } from '../services/api';

export default {
  namespace: 'test',

  state: {
    test: [],
  },

  effects: {
    *fetchTest(_, { call, put }) {
      const response = yield call(queryTest);
      yield put({
        type: 'testList',
        payload: response,
      });
    },
  },

  reducers: {
    testList(state, { payload }) {
      console.log('asdfasdf11', state, payload);
      return {
        ...state,
        test: payload,
      };
    },
  },
};
