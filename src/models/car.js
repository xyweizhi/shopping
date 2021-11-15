import { addItemToList, initCarState, wrapSet } from "@/util";

const initState = initCarState();

const car = {
  namespace: "car",
  state: initState,
  reducers: {
    addToCart(state, { payload }) {
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
};

export default car;
