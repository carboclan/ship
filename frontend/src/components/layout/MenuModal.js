import React from 'react';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'

import {breakpoint, BreakPoint} from '@aragon/ui';
const medium = css => breakpoint('medium', css);
const large = css => breakpoint('large', css);


class SHIPModal  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          injectedProvider: null,
          address: null
        };
      }

  render() {
    return (
      <StyledModal
        {...this.props}
        size="lg"
        aria-labelledby="title"
      >
        <ImageBox>
          <MenuHeader />
          <div className="image-container">
            <img src={logo}></img>
          </div>
        </ImageBox>
        <LinksBox>
          <div className="links">
            <ul>
              <li>
                <Link to={'/create'} onClick={this.props.onHide}>Create</Link>
              </li>
              <li>
                <Link to={'/dashboard'} onClick={this.props.onHide}>Explore</Link>
              </li>
              <li>
                <Link to={'/portfolio'} onClick={this.props.onHide}>Portfolio</Link>
              </li>
              <li>
                <Link to={'/login'} onClick={this.props.onHide}>Login</Link>
              </li>
              <li>
                <Link to={'/myship'} onClick={this.props.onHide}>My $HIP</Link>
              </li>
            </ul>
          </div>
        </LinksBox>
      </StyledModal>
    );
  }
}


class MenuModal extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { modalShow: false };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick () {
    let show = this.state.modalShow;
    this.setState({ modalShow: !show });
  }
  render() {
    let modalClose = () => this.setState({ modalShow: false });

    return (
      <ButtonToolbar>
        <Button
          className={this.state.modalShow == true ? "hamburger hamburger-spin is-active" : "hamburger hamburger-spin"}
          type="button"
          onClick={this.handleClick}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </Button>

        <SHIPModal
          show={this.state.modalShow}
          onHide={modalClose}
        />
      </ButtonToolbar>
    );
  }
}

const MenuHeader = styled.div`
  width: 100%;
  height: 70px;
  border-bottom: solid 1px #3a3a3a;
  display: flex;
  justify-content: flex-end;
  div {
    width: 70px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: solid 1px #3a3a3a;
  }
`

const LinksBox = styled.div`
  ${large('width: calc(100% - 400px);')};
  width: 100%;
  .links {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 0;
    position: relative;
  }
  a {
    color: white!important;
    text-decoration: none!important;
  }
  h6 {
    position: absolute;
    right: 0;
    transform-origin: 0 50%;
    text-transform: uppercase;
    font-size: 1rem;
    line-height: 1;
    letter-spacing: 6px;
    transform: rotate(-90deg) translate(-50%,calc(100% + 278px));
  }
`
const ImageBox = styled.div`
  width: 400px;
  border-right: solid 1px #3a3a3a;
  display: none;
  ${large('display: flex; text-align: center; flex-direction: column;')};
  .image-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100% - 70px);
  }
`
const StyledModal = styled(Modal)`
  background: black;
  transition: all .25s linear;
  .modal-dialog {
    max-width: 80%;
    width: 1000px;
    min-width: 50%;
    margin: 100px auto;
  }
  .modal-content {
    background: black;
    border: solid 1px #3a3a3a;
    border-radius: 0;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    img {
      max-width: 350px;
    }
    ul {
      list-style-type: none;
      padding: 60px 0;
      ${large('padding: 0;')};
    }
    li {
      font-family: 'FontBold';
      font-size: 2.92rem;
      line-height: 4.42rem;
      ${large('font-size: 4.35rem; line-height: 6.57rem;')};
    }
  }
`
export default MenuModal;