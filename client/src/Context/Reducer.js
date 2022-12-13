export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const one = {
        ...state,
        cart: [...state.cart, { ...action.payload, qty: 1 }],
      };
      const cartvalue = { cart: [{ ...action.payload, qty: 1 }] };
      const prod_id = action.payload.id;
      const cartdataa = async () => {
        await fetch("/cartdata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            cartvalue,
            prod_id,
          }),
        });
      };
      cartdataa();
      return one;

    case "REMOVE_FROM_CART":
      const deletec = async () => {
        const res = await fetch("/deletedata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            prodid: action.payload.id,
          }),
        });
      };
      deletec();
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== action.payload.id),
      };
    case "CHANGE_CART_QTY":
      const changeQty = async () => {
        const res = await fetch("/changeQty", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            prod_id: action.payload.prod_id,
            quantity: action.payload.quantity,
          }),
        });
      };
      changeQty();
      return {
        ...state,
        cart: state.cart.filter((c) =>
          c.id === action.payload.prod_id
            ? (c.qty = action.payload.quantity)
            : c.qty
        ),
      };
    case "ADD_TO_PDETAILS":
      return { ...state, details: [{ ...action.payload }] };
    case "CARTDATA":
      return { ...state, cart: action.payload };
    case "RESETCART":
      return { ...state, cart: [] };
    default:
      return state;
  }
};

export const productReducer = (state, action) => {
  switch (action.type) {
    case "SORT_BY_PRICE":
      return { ...state, sort: action.payload };
    case "FILTER_BY_STOCK":
      return { ...state, byStock: !state.byStock };
    case "FILTER_BY_DELIVERY":
      return { ...state, byFastDelivery: !state.byFastDelivery };
    case "FILTER_BY_RATING":
      return { ...state, byRating: action.payload };
    case "FILTER_BY_SEARCH":
      return { ...state, searchQuery: action.payload };
    case "CLEAR_FILTERS":
      return {
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery: "",
      };

    default:
      return state;
  }
};

export const loggedUser = (state, action) => {
  switch (action.type) {
    case "LOGGEDUSER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export const ratingReducer = (state, action) => {
  if (action.type === "RVALUE") {
    return action.payload;
  }
  return state;
};
