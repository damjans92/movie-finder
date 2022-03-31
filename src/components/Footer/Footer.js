import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <div className="footer">
      <div>Movie Finder</div>
      <div>&copy; {new Date().getFullYear()} All right reserved</div>
    </div>
  );
}

export default Footer;
