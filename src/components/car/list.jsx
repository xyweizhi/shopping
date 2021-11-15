import React, { Component } from "react";
import ShoppingCarIcon from "./shopping-car-icon";
import Item from "./item";
import Footer from "./list-footer";

class List extends Component {
  render() {
    const { data, total, addItem, removeItem, updateItem, clearItem} = this.props;
    return (
      <div className="car-list">
        <div className="car-list-header">
          <div className="car-icon-container">
            <ShoppingCarIcon></ShoppingCarIcon>
            <div className="badge">{total}</div>
          </div>
          <span className="car-list-text">Cart</span>
        </div>
        <div className="list-content">
          {data &&
            data.length > 0 &&
            data.map((item) => {
              return (
                <Item
                  addItem={addItem}
                  removeItem={removeItem}
                  updateItem={updateItem}
                  key={item.sku}
                  {...item}
                ></Item>
              );
            })}
        </div>
        <div className="list-footer">
          <Footer data={data} clearItem={clearItem}></Footer>
        </div>
      </div>
    );
  }
}

export default List;
