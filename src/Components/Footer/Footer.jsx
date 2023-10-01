// function Footer() {
//   return (
//     <div style={{ height:"20vh", backgroundColor:"white"}}></div>
//   )
// }
// export default Footer

import React from 'react';
import './Footer.css'; 

function Footer() {
  return (
    <section className="footer">
      <div className="title">
        <strong>Contact us:</strong>
      </div>
      <div className="contact-info">
        <p>Eddie Zvonov - 0544466474</p>
        <p>Omer Nofarber - 0558810978</p>
      </div>
    </section>
  );
}

export default Footer;
