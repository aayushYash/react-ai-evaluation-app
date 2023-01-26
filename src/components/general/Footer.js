import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="leftFooter">
        <h2 className="title font-mono text-3xl font-thin">AI EVALUATOR</h2>

        <div className="footer-address">
          <p className=" px-2 font-bold">
            Birla Institute of Technology, Lalpur
          </p>
          <p>+91-9374738384</p>
          <p className="text-sm font-semibold px-2">
            Mail: aievaluater.23@gmail.com
          </p>
        </div>
      </div>
      <div className="rightFooter">
        <p>Made with</p>
      </div>
    </div>
  );
}
