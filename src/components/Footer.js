import React from "react";
import {Link} from "react-router-dom";

export default class Footer extends React.Component {
    render() {
        let textStyle = {
            backgroundColor: "#000",
            fontVariant: "all-small-caps"
        };

        return (
            <footer>
                <img src="/images/footer.png" alt="Footer" className="img-fluid"/>
                <div id="FooterText" style={textStyle}>
                    <div className="container text-secondary text-center py-3">
                        <div className="row">
                            <div className="col-md-4 text-md-right pr-md-4">
                                <h4>Contact</h4>
                                <p>
                                    viviskes@gmail.com<br/>
                                    CCP: 12-812812-7<br/>
                                    IBAN: CH43 0900 0000 1281 2812 7
                                </p>
                            </div>
                            <div className="col-md-4 px-md-4">
                                <h4>Liens utiles</h4>
                                <p>
                                    <Link to="/">Site internet</Link><br/>
                                    <Link to="/intranet/forum">Intranet</Link>
                                </p>
                            </div>
                            <div className="col-md-4 text-md-left pl-md-4">
                                <h4>Copyrights</h4>
                                <p>
                                    Site - Irina Despot<br/>
                                    Artwork - Jonathan Schaffner<br/>
                                    Contenu - Viviskes
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}