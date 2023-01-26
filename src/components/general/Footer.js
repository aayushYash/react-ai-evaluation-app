import React from "react";
import "./Footer.css";

export default function Footer({position='relative'}) {
  return (
    <div className="footer" style={{position: `${position}`}}>
      <div className="leftFooter">
        <h1 className="title ">AI EVALUATOR</h1>

        <div className="footer-address">
          <p className="">Birla Institute of Technology, Lalpur</p>
          <p>+91-9374738384</p>
        </div>
          <p className="">Mail: aievaluater.23@gmail.com</p>
      </div>
      <div className="rightFooter">
        <p>Made with ♥️.</p>
      </div>
    </div>
  );
}
