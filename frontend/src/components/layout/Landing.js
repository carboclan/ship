import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import LandingDashboard from '../dashboard/LandingDashboard';
import GitHubLogin from 'github-login';
import tick from '../assets/tick.png';
import { breakpoint, BreakPoint, Button } from '@aragon/ui';

const medium = css => breakpoint('medium', css);
const large = css => breakpoint('large', css);

const onSuccess = response => console.log(response);
const onFailure = response => console.error(response);

class NewLanding extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div style={{ height: "75vh" }}>
        <Container>
          <EventsSection id="events">
            <Box>
              <Event>
                <h2>
                  <b>Earn FOUNDER'S EQUITY in a flash</b>
                </h2>
                <h2>
                  <b>with an option to "cop out" to CASH.</b>
                </h2>
                <h6 style={{ color: "yellow" }}>
                  <img src={tick} width="10" height="10" /> Join $HIP to earn
                rewards by accomplishing project milestones:
                <p style={{ color: "white" }}>apply to flash organizations to collaborate on short product sprints.</p>
                </h6>
                <h6 style={{ color: "yellow" }}>
                  <img src={tick} width="10" height="10" /> Summon a $HIP to build the MVP
                for your dream idea:
                <p style={{ color: "white" }}>find accountable contributors prior to proving your product market fit.</p>
                </h6>
              </Event>
              <Offsite>
                <h6>SIGN UP WITH</h6>
                <Link
                  to="/register"
                  className="btn"
                >
                  EMAIL
              </Link>
                <h6>OR</h6>
                <GitHubLogin clientId="fe47d6b2b5729043b08d"
                  className="btn"
                  redirectUri="http://localhost:3001/dashboard"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  buttonText="GITHUB" />
              </Offsite>
            </Box>
            <br />
            <h3>
              Trending
          </h3>
            <LandingDashboard />
          </EventsSection>
        </Container>
      </div>
    );
  }
}

const Event = styled.div`
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
const Offsite = styled.div`
  background-color: #191919;
  padding: 30px;
  width: 100%;
  ${medium('width: 30%;')};
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

const EventsSection = styled.section`
  min-height: 100vh;
  height: auto;
  padding: 0 0 100px 0;
  margin-bottom: 100px;
`;

const Box = styled.div`
  width: 92%;
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
`;

export default NewLanding;