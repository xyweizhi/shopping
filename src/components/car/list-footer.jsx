import React, { Component } from "react";
import { formatCurrency, countNumber } from "@/util";
import { Modal, Button } from 'antd';

const countPrice = (items) => {
  return items.reduce((acc, cur) => {
    acc += cur.price * (cur.quantity || 1);
    return acc;
  }, 0);
};

export default class ListFooter extends Component {


  state = { visible: false }

  handleOk = (e) => {
    const { clearItem } = this.props;
    console.log(e);
    clearItem();
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    const { currencyFormat = "$", data } = this.props;
    const totalPrice = countPrice(data);
    const totalInstallments = countNumber(data, "installments");
    return (
      <div>
        <div className="footer-item">
          <span className="footer-title">SUBTOTAL</span>
          <span className="text-align-right footer-text">
            {currencyFormat} {formatCurrency(totalPrice)}
          </span>
        </div>
        <div className="footer-item">
          <span></span>
          {!totalPrice || totalPrice === 0 ? null : (
            <span className="text-align-right footer-ins">
              OR UP TO {totalInstallments} x {currencyFormat}{" "}
              {formatCurrency(totalPrice / totalInstallments)}
            </span>
          )}
        </div>
        <div
          className="checkout-btn"
          onClick={() => {
            this.setState({
              visible: true,
            });
          }}
        >
          CHECKOUT
        </div>
        <Modal
          title="结算"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="submit" type="primary" size="large"onClick={this.handleOk}>
              确定
            </Button>,
          ]}
        >
          <p>Total $ ${formatCurrency(totalPrice)}</p>
        </Modal>
      </div>
    );
  }
}
