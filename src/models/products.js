import { getProducts } from "@/api/products";
// import { appendParamToUrl } from "@/util";

const initState = {
  products: [],
  size: [],
  orderBy: "",
};

const products = {
  namespace: "products",
  state: initState,
  reducers: {
    updateState: (state, { payload }) => {
      const { size = [], orderBy = "", products } = payload;
      return {
        ...state,
        size,
        orderBy,
        products,
      };
    },
  },
  effects: {
    *getProducts({ payload }, { call, put }) {
      try {
        const { data } = yield call(getProducts, payload);
        const { size = [], orderBy = "" } = payload;
        yield put({
          type: "updateState",
          payload: {
            products: data,
            size,
            orderBy,
          },
        });
        // appendParamToUrl({ size, orderBy });
      } catch (error) {
        window.alert(
          (error.response && error.response?.data?.message) || error.message
        );
      }
    },
  },
};

export default products;
