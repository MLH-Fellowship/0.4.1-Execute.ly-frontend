import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Layout } from "antd";
import ExecutelyLogo from "../assets/logo.png";

const { Header } = Layout;

const StyledHeader = styled(Header)`
  display: flex;
  align-items: center;
  background: ${props => props.theme.primary};

  .drawer-btn {
    background: transparent;
    border: none;
    font-size: 2rem;

    &:hover {
      transform: scale(1.3);
    }
  }

  .logo {
    padding: 0 1rem;
    max-height: 100%;
    display: inline-flex;
    align-items: center;

    img {
      width: 2rem;
      margin-right: 1rem;
    }

    .title {
      font-size: 1.8rem;
      font-weight: bold;
      color: #fff;
    }
  }
`;

export default function MyHeader() {
  return (
    <StyledHeader>
      <Link className="logo" to="/">
        <img src={ExecutelyLogo} alt="Executely Logo" />
        <span className="title">Executely</span>
      </Link>
    </StyledHeader>
  );
}

MyHeader.propTypes = {
  visible: PropTypes.bool,
  showDrawer: PropTypes.func,
  onClose: PropTypes.func
};
