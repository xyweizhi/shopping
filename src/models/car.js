import { addItemToList, initCarState, wrapSet, wrapSetAsync } from "@/util";
import { message } from 'antd';

const initState = initCarState();

const car = {
  namespace: "car",
  state: initState,
  reducers: {
    addToCartStatus(state, { payload }) {
      return wrapSet({
        ...state,
        items: addItemToList(state.items, payload.item),
      });
    },
    removeItem(state, { payload }) {
      return wrapSet({
        ...state,
        items: state.items.filter((v) => v.sku !== payload.item.sku),
      });
    },
    updateItem(state, { payload }) {
      return wrapSet({
        ...state,
        items: state.items.map((v) => {
          if (v.sku === payload.item.sku) {
            return {
              ...v,
              quantity:
                payload.type === "add" ? v.quantity + 1 : v.quantity - 1,
            };
          }
          return v;
        }),
      });
    },
    clearItem(state, { payload }) {
      return wrapSet({
        ...state,
        items: [],
      });
    }
  },
  effects: {
    *addToCart({ payload }, { call, put }) {
      try {
        let data = yield call(wrapSetAsync, payload);
        yield put({
          type: "addToCartStatus",
          payload: {
            item: data.item,
          },
        });
        // appendParamToUrl({ size, orderBy });
      } catch (error) {
        console.log(error);
        message.error((error.response && error.response?.data?.message) || error.message);
      }
    },
  },
};

export default car;
