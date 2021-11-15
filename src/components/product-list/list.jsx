import React from "react";
import { Row, Col, Select } from "antd";

import Item from "./item";

const { Option } = Select;

function List({ data, onSelectChange, addToCart, orderBy = "" }) {
  return (
    <div className="container padding-left-8">
      <Row>
        <Col span={22}>
          <Row justify="space-between">
            <Col span={12} className="list-header">
              <div>{data.length} Product(s) found.</div>
            </Col>
            <Col span={12} className="list-header">
              <div className="flex-end">
                <span className="header-text">Order by </span>
                <Select
                  value={orderBy}
                  style={{ width: 200 }}
                  onChange={onSelectChange}
                >
                  <Option value="">Select</Option>
                  <Option value="lowest">Lowest to highest</Option>
                  <Option value="highest">Highest to lowest</Option>
                </Select>
              </div>
            </Col>
          </Row>
          <Row className="margin-bottom-16">
            {data &&
              data.map((item) => {
                return (
                  <Item onClick={addToCart} key={item.sku} {...item}></Item>
                );
              })}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default List;
