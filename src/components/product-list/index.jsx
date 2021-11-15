import React from "react";
import { connect } from "dva";

import { Row, Col, Spin } from "antd";

import Sizes from "./sizes";
import List from "./list";

import "./index.css";

class ProductList extends React.Component {
  constructor(props) {
    super(props);

    this.handleSize = this.handleSize.bind(this);
    this.handleOrderBy = this.handleOrderBy.bind(this);
  }

  componentDidMount() {
    const { initData } = this.props;
    initData();
  }

  handleSize(size) {
    const { dispatch, products } = this.props;
    dispatch({
      type: "products/getProducts",
      payload: { size, orderBy: products.orderBy },
    });
  }

  handleOrderBy(orderBy) {
    const { dispatch, products } = this.props;
    if (products.orderBy === orderBy) return;
    dispatch({
      type: "products/getProducts",
      payload: { orderBy, size: products.size },
    });
  }

  render() {
    const { products, addToCart, loading } = this.props;
    return (
      <Row>
        <Col span={4}>
          <Sizes size={products.size} onClick={this.handleSize}></Sizes>
        </Col>
        <Col span={20}>
          <List
            orderBy={products.orderBy}
            addToCart={addToCart}
            data={products.products}
            onSelectChange={this.handleOrderBy}
          ></List>
        </Col>
        {loading && (
          <div key="loading" className="loading-container">
            <Spin size="large"></Spin>
          </div>
        )}
      </Row>
    );
  }
}

const mstp = ({ products, loading }) => ({
  products,
  loading: loading.models.products,
});
const mdtp = (dispatch) => {
  return {
    initData: () =>
      dispatch({
        type: "products/getProducts",
        payload: {},
      }),
    addToCart: (item) =>
      dispatch({
        type: "car/addToCart",
        payload: { item },
      }),
    dispatch,
  };
};

export default connect(mstp, mdtp)(ProductList);
