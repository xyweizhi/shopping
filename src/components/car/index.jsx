import React, { Component } from "react";
import { connect } from "dva";
import ShoppingCarIcon from "./shopping-car-icon";
import CloseIcon from "./close-icon";
import List from "./list";

import { countNumber } from "@/util";

import "./index.css";

class Car extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expansion: false,
    };

    this.handleIconClick = this.handleIconClick.bind(this);
  }

  handleIconClick() {
    const { expansion } = this.state;

    this.setState({ expansion: !expansion });
  }

  clearItemFuction = () => {
    this.handleIconClick();
    this.props?.clearItem();
  }

  render() {
    const { expansion } = this.state;
    const { car, addItem, removeItem, updateItem } = this.props;
    const total = countNumber(car.items);
    return (
      <div key="car" className={`car ${expansion ? "show" : ""}`}>
        <div className="car-icon-container">
          <div className="car-icon" onClick={this.handleIconClick}>
            {expansion ? (
              <CloseIcon key="closeIcon" width={32} height={32}></CloseIcon>
            ) : (
              <>
                <ShoppingCarIcon key="shoppingCar"></ShoppingCarIcon>
                <div className="badge">{total}</div>
              </>
            )}
          </div>
        </div>
        <List
          total={total}
          data={car.items}
          addItem={addItem}
          removeItem={removeItem}
          updateItem={updateItem}
          clearItem={this.clearItemFuction}
        ></List>
      </div>
    );
  }
}

const mstp = ({ car }) => ({ car });

const mdtp = (dispatch) => {
  return {
    addItem: (item) =>
      dispatch({
        type: "car/addToCart",
        payload: { item },
      }),
    removeItem: (item) =>
      dispatch({
        type: "car/removeItem",
        payload: { item },
      }),
    updateItem: (item, type) =>
      dispatch({
        type: "car/updateItem",
        payload: { item, type },
      }),
    clearItem: () =>
      dispatch({
        type: "car/clearItem",
      }),
    dispatch,
  };
};

export default connect(mstp, mdtp)(Car);
