import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";


const DATA_BASE = []; // insert database here


export const getCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `${DATA_BASE}/cart.json`
      );
      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart({
        items: cartData.items || [],
        totalQuantity: cartData.totalQuantity,
      }));
    } catch (error) {
      dispatch(
        uiActions.notify({
          status: "failed",
          title: "failed to receive data",
          message: "Receive cart data failed!",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.notify({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data...",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        `${DATA_BASE}/cart.json`,
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Cart data couldn`t be sent!");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.notify({
          status: "success",
          title: "Sending data success!",
          message: "Data sent successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.notify({
          status: "failed",
          title: "failed to send data",
          message: "sending cart data failed!",
        })
      );
    }
  };
};
