import React, { Component } from "react";
import { Affix, BackTop, Layout } from "antd";

import Header from "./Header";

export default class MainLayout extends Component {
  state = {
    visible: false
  };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { children } = this.props;
    const { visible } = this.state;
    return (
      <div>
        <Layout>
          <div>
            <BackTop />
          </div>
          <Affix offsetTop={0}>
            <Header
              visible={visible}
              showDrawer={this.showDrawer}
              onClose={this.onClose}
            />
          </Affix>
          {children}
        </Layout>
      </div>
    );
  }
}
