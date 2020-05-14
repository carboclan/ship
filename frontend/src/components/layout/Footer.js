import React, { Component } from "react";
import { Link } from "react-router-dom";
import {FaTwitter, FaGithub} from "react-icons/fa";

class Footer extends Component {
  render() {
    return (
        <div class="page-footer white">
        <footer>
          <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="black-text">Follow us</h5>
                <li style={{margin:"5px"}} href="https://materializecss.com/icons.html"> <FaGithub/>
</li>
<li style={{margin:"5px"}}><a href="https://materializecss.com/icons.html"> <FaTwitter/></a>
</li>
              </div>
            </div>
          </div>
        </footer>
        </div>
    );
  }
}
export default Footer;