import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import {
  Header, Main, textStyle
} from '@aragon/ui';

class Landing extends Component {
  render() {
    return (
      <LandingSection>
        <Container>
          <div style={{ height: "75vh" }} className="container valign-wrapper">
            <div className="row">
              <div className="col s12">
                <h1 className="flow-text text-darken-1">
                  Create your {" "} first {" "}
                  <b>flash org</b> with <span className="hip">$HIP</span> ⚡️
          </h1>
                <br />
                <div className="col s12">
                  <Link
                    to="/register"
                    style={{
                      width: "140px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px"
                    }}
                    className="btn btn-large waves-effect waves-light hoverable accent-3"
                  >
                    Sign up
              </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </LandingSection>
    );
  }
}

const LandingSection = styled.section`
  min-height: 600px;
  height: 80vh;
`;

const Container = styled.div`
  width: 80%;
  margin: auto;
  height: 100%;
  display:flex
  align-items: center;
  justify-content: flex-start;
  .fist-title,
  .fist-title::after {
    animation-delay: var(--animation-delay, 1s);
    animation-iteration-count: var(--iterations, 1);
    animation-duration: var(--duration, 600ms);
    animation-fill-mode: both;
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  .second-title,
  .second-title::after {
    animation-delay: var(--animation-delay, 1.5s);
    animation-iteration-count: var(--iterations, 1);
    animation-duration: var(--duration, 600ms);
    animation-fill-mode: both;
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  .fist-title {
    position: relative;
    animation-name: clip-text;
    max-width: 90vw;
    &::after {
      content: '';
      position: absolute;
      z-index: 999;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ff7c56;
      transform: scaleX(0);
      transform-origin: 0 50%;
      pointer-events: none;
      animation-name: text-revealer;
    }
  }
  span.hip {
    background: #2196f3;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #f44336, #2196f3);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #f44336, #2196f3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .second-title {
    position: relative;
    animation-name: clip-text2;
    max-width: 90vw;
    &::after {
      content: '';
      position: absolute;
      z-index: 999;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ff5d5d;
      transform: scaleX(0);
      transform-origin: 0 50%;
      pointer-events: none;
      animation-name: text-revealer2;
    }
  }
  @keyframes clip-text {
    from {
      clip-path: inset(0 100% 0 0);
    }
    to {
      clip-path: inset(0 0 0 0);
    }
  }
  @keyframes text-revealer {
    0%,
    50% {
      transform-origin: 0 50%;
    }
    60%,
    100% {
      transform-origin: 100% 50%;
    }
    60% {
      transform: scaleX(1);
    }
    100% {
      transform: scaleX(0);
    }
  }
  @keyframes clip-text2 {
    from {
      clip-path: inset(0 100% 0 0);
    }
    to {
      clip-path: inset(0 0 0 0);
    }
  }
  @keyframes text-revealer2 {
    0%,
    50% {
      transform-origin: 0 50%;
    }
    60%,
    100% {
      transform-origin: 100% 50%;
    }
    60% {
      transform: scaleX(1);
    }
    100% {
      transform: scaleX(0);
    }
  }
  h1 {
    font-family: 'FontBold';
    margin: 0;
    text-align: left;
    color: white;
    font-size: 4.28rem;
    @media only screen and (min-width: 1170px) and (max-width: 1330px) {
      font-size: 9rem;
    }
    @media only screen and (min-width: 962px) and (max-width: 1170px) {
      font-size: 8rem;
    }
    @media only screen and (min-width: 770px) and (max-width: 962px) {
      font-size: 7rem;
    }
  }
  span.pink {
    word-break: break-all;
    color: #ff5d5d;
    background: -webkit-linear-gradient(left, #ff3333, #ff7c56);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .mobile-pink {
    color: #ff5d5d;
  }
`;

export default Landing;
