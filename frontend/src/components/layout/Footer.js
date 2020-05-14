import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaGithub } from "react-icons/fa";

class Footer extends Component {
    render() {
        return (
            <div class="page-footer white">
                <footer>
                    <div class="container">
                        <div class="row">
                            <div class="col l6 s12">
                                <h5 class="black-text">Follow us</h5>
                                <li class="btn-floating waves-effect waves-light hoverable black accent-3" style={{ margin: "5px" }}> <i class="material-icons">code</i>
                                </li>
                                <li class="btn-floating waves-effect waves-light hoverable blue accent-3" style={{ margin: "5px" }}> <i class="material-icons">forum</i>
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