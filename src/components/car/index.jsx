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
    this.divElement = null;
    this.handleIconClick = this.handleIconClick.bind(this);
    this.outDivClickHandler = this.outDivClickHandler.bind(this);
  }
  outDivClickHandler(e) {
    e.stopPropagation();
    const target = e.target;
    // 组件已挂载且事件触发对象不在div内
    if (this.divElement && !this.divElement.contains(target)) {
      this.setState({ expansion: false });
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.outDivClickHandler,false);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.outDivClickHandler,false);
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
      <div ref={ node => this.divElement = node} key="car" className={`car ${expansion ? "show" : ""}`}>
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
