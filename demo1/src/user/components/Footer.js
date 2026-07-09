import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  // Common style object for lists links layout parameters
  const linkStyle = {
    color: '#ffffff',
    fontSize: '14px',
    textDecoration: 'none',
    display: 'block',
    marginBottom: '10px',
    transition: 'color 0.2s',
    fontWeight: '400'
  };

  const linkHover = (e) => {
    e.target.style.color = '#f28500';
  };

  const linkOut = (e) => {
    e.target.style.color = '#ffffff';
  };

  return (
    <footer style={{ backgroundColor: '#021114', color: '#ffffff', fontFamily: 'sans-serif', width: '100%', padding: '50px 0 20px 0', textAlign: 'left', borderTop: '4px solid #000000' }}>
      
      {/* 📦 FOUR COLUMN SPLIT WRAPPER LAYOUT PANEL */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'space-between' }}>
        
        {/* Column 1: INFORMATIONS */}
        <div style={{ flex: '1 1 220px', minWidth: '200px' }}>
          <h4 style={{ color: '#f28500', fontSize: '15px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '20px' }}>
            INFORMATIONS
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Link to="/about-us" style={linkStyle} onMouseOver={linkHover} onMouseOut={linkOut}>About Us</Link>
            <Link to="/what-is-ayurveda" style={linkStyle} onMouseOver={linkHover} onMouseOut={linkOut}>What is Ayurveda ?</Link>
            <Link to="/ayurveda-wellness" style={linkStyle} onMouseOver={linkHover} onMouseOut={linkOut}>Ayurveda Wellness</Link>
            <Link to="/search" style={linkStyle} onMouseOver={linkHover} onMouseOut={linkOut}>Search</Link>
            <Link to="/privacy-policy" style={linkStyle} onMouseOver={linkHover} onMouseOut={linkOut}>Privacy Policy</Link>
            <Link to="/terms-conditions" style={linkStyle} onMouseOver={linkHover} onMouseOut={linkOut}>Terms & Conditions</Link>
            <Link to="/sitemap" style={linkStyle} onMouseOver={linkHover} onMouseOut={linkOut}>Sitemap</Link>
          </div>
        </div>

        {/* Column 2: CUSTOMER SERVICES */}
        <div style={{ flex: '1 1 220px', minWidth: '200px' }}>
          <h4 style={{ color: '#f28500', fontSize: '15px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '20px' }}>
            CUSTOMER SERVICES
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Link to="/contact-us" style={linkStyle} onMouseOver={linkHover} onMouseOut={linkOut}>Contact Us</Link>
            <Link to="/international-shipping" style={linkStyle} onMouseOver={linkHover} onMouseOut={linkOut}>International Shipping</Link>
            <Link to="/returns-refunds" style={linkStyle} onMouseOver={linkHover} onMouseOut={linkOut}>Returns & Refunds</Link>
            <Link to="/shipping-delivery" style={linkStyle} onMouseOver={linkHover} onMouseOut={linkOut}>Shipping & Delivery</Link>
          </div>
        </div>

        {/* Column 3: QUICK SHOP */}
        <div style={{ flex: '1 1 220px', minWidth: '200px' }}>
          <h4 style={{ color: '#f28500', fontSize: '15px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '20px' }}>
            QUICK SHOP
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Link to="/login" style={linkStyle} onMouseOver={linkHover} onMouseOut={linkOut}>Sign In</Link>
            <Link to="/register" style={linkStyle} onMouseOver={linkHover} onMouseOut={linkOut}>Create an Account</Link>
            <Link to="/account" style={linkStyle} onMouseOver={linkHover} onMouseOut={linkOut}>My Account</Link>
            <Link to="/wishlist" style={linkStyle} onMouseOver={linkHover} onMouseOut={linkOut}>Wishlist</Link>
          </div>
        </div>

        {/* Column 4: CONTACT US & STAY CONNECTED */}
        <div style={{ flex: '1 1 280px', minWidth: '250px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div>
            <h4 style={{ color: '#f28500', fontSize: '15px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '20px' }}>
              CONTACT US
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', lineHeight: '1.6', color: '#ffffff' }}>
              {/* Address with PIN icon replacement structure */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ color: '#ffffff', fontSize: '16px', transform: 'translateY(2px)' }}>📍</span>
                <span>
                  New No.19, Old No.61, 27th Street,<br />
                  L-Block, Anna nagar East,<br />
                  Chennai - 600 102. India
                </span>
              </div>
              {/* Phone info stack row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#ffffff', fontSize: '14px' }}>📞</span>
                <span>(044) 4859 9296</span>
              </div>
              {/* Email info stack row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#ffffff', fontSize: '14px' }}>✉️</span>
                <span style={{ color: '#ffffff' }}>sales@ayurkart.com</span>
              </div>
            </div>
          </div>

          {/* Social Icons Grid Blocks Row */}
          <div>
            <h5 style={{ color: '#f28500', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 14px 0' }}>
              STAY CONNECTED
            </h5>
            <div style={{ display: 'flex', gap: '10px' }}>
              {/* Circular Social Round Buttons Frame */}
              {['f', 't', 'p', 'i', 'tb', 'y'].map((icon, index) => {
                const labelMap = { 'f': 'Facebook', 't': 'Twitter', 'p': 'Pinterest', 'i': 'Instagram', 'tb': 'Tumblr', 'y': 'YouTube' };
                const glyphMap = { 'f': 'f', 't': ' bird ', 'p': 'P', 'i': '📸', 'tb': 't', 'y': '▶' };
                return (
                  <div 
                    key={index}
                    title={labelMap[icon]}
                    style={{
                      width: '32px', height: '32px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.4)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: '#ffffff',
                      cursor: 'pointer', fontWeight: 'bold', backgroundColor: 'transparent', transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.borderColor = '#f28500'; e.currentTarget.style.color = '#f28500'; }}
                    onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.color = '#ffffff'; }}
                  >
                    {icon === 't' ? (
                      <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    ) : icon === 'i' ? (
                      <span style={{ fontSize: '11px' }}>📸</span>
                    ) : glyphMap[icon]}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* 📜 BOTTOM HORIZONTAL LINE & EXTRA SECURE GAP */}
      <div style={{ maxWidth: '1200px', margin: '30px auto 0 auto', padding: '0 20px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px', fontSize: '12px', color: '#888888', display: 'flex', justifyContent: 'space-between' }}>
        <span>© {new Date().getFullYear()} Ayurkart. All Rights Reserved.</span>
      </div>

    </footer>
  );
};

export default Footer;