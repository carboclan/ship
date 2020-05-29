import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import deadline from '../assets/deadline.png';
import { breakpoint } from '@aragon/ui';

const medium = css => breakpoint('medium', css);

class MyShip extends React.Component {
    render() {
        return (
            <div style={{ height: "75vh"}}>
                <Container>
                    <GovernanceSection id="governance">
                        <Box>
                            <Governance>
                                <h2>
                                    <b>Governance Dashboard <Link
                                        to="/"
                                        className="btn"
                                        style={{ marginLeft: "25px" }}
                                    >
                                        Propose
              </Link></b>
                                </h2>
                                <h6>
                                    <b>Postpone project to June 3, 2020. <span className="grey-text">by @CarboClanC</span><Link
                                        to="/"
                                        className="btn"
                                        style={{ marginLeft: "25px" }}
                                    >
                                        Vote
              </Link></b>
                                </h6>
                                <h6>
                                    <b>Request to add resource to Front End. <span className="grey-text">by @RenChuqiao</span><Link
                                        to="/"
                                        className="btn"
                                        style={{ marginLeft: "25px" }}
                                    >
                                        Vote
              </Link></b>
                                </h6>
                            </Governance>
                            <Deadline>
                                <img src={deadline} alt="deadline" width="325" height="300" />
                                <h6>
                                    <li style={{ color: "yellow" }}> <b>Project Title:
                                    <span style={{ color: "white", marginLeft: "5px" }}>Honeylemon.market</span></b></li>
                                </h6>
                                <h6>
                                    <li style={{ color: "yellow" }}> <b>Equity Token Reward:
                                    <span style={{ color: "white", marginLeft: "5px" }}>15,000 Tokens (1.5%)</span></b></li>
                                </h6>
                                <h6>
                                    <li style={{ color: "yellow" }}> <b>Strike Price (Cash Bounties):
                                    <span style={{ color: "white", marginLeft: "5px" }}>DAI 1,500</span></b></li>
                                </h6>
                                <h6>
                                    <li style={{ color: "yellow" }}> <b>Flash Organization:
                                    <span style={{ color: "white", marginLeft: "5px" }}>@CarboClanC @Jenil04 @RenChuqiao</span></b></li>
                                </h6>
                            </Deadline>
                        </Box>
                    </GovernanceSection>
                </Container>
            </div>
        );
    }
}

const Governance = styled.div`
  background-color: #191919;
  padding: 30px;
  width: 100%;
  ${medium('width: 70%;')};
  iframe {
    width: 100%;
    height: 42vw;
    ${medium('height: 23vw;')};
  }
  h6 {
    margin: 60px 0 20px 0 !important;
  }
  h1 {
    font-size: 10vw;
    ${medium('font-size: 7vw;')};
  }
  h2 {
      font-size: 26px;
      font-family: 'FontBold';
  }
`;
const Deadline = styled.div`
  background-color: #000000;
  width: 100%;
  ${medium('width: 50%;')};
  text-align: center;
  h6 {
    margin: 20px 0 20px 0 !important;
    line-height: 1.4 !important;
  }
  h2 {
    font-size: 22px;
    letter-spacing: 4px;
    color: #ffffff;
  }
  .btn {
  border: solid 1px #BDB76B;
  font-size: 1rem;
  text-align: center;
  letter-spacing: 2.6px;
  text-transform: uppercase;
  width: 200px;
  height: 50px;
  max-width: 100%;
  display: inherit;
  padding: 15px;
  cursor: pointer;
  margin: 20px auto 0 auto;
  text-decoration: none!important;
  color: white!important;
  &:hover {
  background: #BDB76B;
  }
  }
`;

const GovernanceSection = styled.section`
  min-height: 100vh;
  height: auto;
  padding: 0 0 100px 0;
  margin-bottom: 100px;
`;

const Box = styled.div`
  width: 100%;
  min-height: 300px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  ${medium('flex-direction: row;')};
`;

const Container = styled.div`
  width: 80%;
  margin: auto;
  height: 100%;
  .btn {
    border: solid 1px #BDB76B;
    font-size: 1rem;
    text-align: center;
    letter-spacing: 2.6px;
    text-transform: uppercase;
    width: 150px;
    height: 50px;
    max-width: 100%;
    display: inherit;
    padding: 15px;
    cursor: pointer;
    margin: 20px auto 0 auto;
    text-decoration: none!important;
    color: white!important;
    &:hover {
    background: #BDB76B;
    }
`;

export default MyShip;