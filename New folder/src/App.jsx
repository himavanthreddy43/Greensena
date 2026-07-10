import React, { useState, useEffect } from 'react';
import './index.css';
import ProductSpecifications from './ProductSpecifications';
import { translations } from './translations';

function App() {
  const [lang, setLang] = useState('en');
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showPromoPopup, setShowPromoPopup] = useState(false);
  const [showSmallPopup, setShowSmallPopup] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const timer = setTimeout(() => setShowSmallPopup(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenPromoPopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowPromoPopup(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const closePromoPopup = () => {
    setShowPromoPopup(false);
    sessionStorage.setItem('hasSeenPromoPopup', 'true');
  };

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Mobile Side Menu Overlay */}
      <div className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`} onClick={closeMenu}></div>
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <h2>Menu</h2>
          <button className="close-btn" onClick={closeMenu}>✕</button>
        </div>
        <ul className="mobile-menu-links">
          <li><a href="#" onClick={closeMenu}>🏠 {t.menuHome}</a></li>
          <li><a href="#about" onClick={closeMenu}>🌿 {t.navAbout}</a></li>
          <li><a href="#products" onClick={closeMenu}>📦 {t.navProducts}</a></li>
          <li><a href="#about" onClick={closeMenu}>🌱 {t.menuMission}</a></li>
          <li><a href="#dealer" onClick={closeMenu}>🤝 {t.menuDealer}</a></li>
          <li><a href="#contact" onClick={closeMenu}>💼 {t.menuBulk}</a></li>
        </ul>
        <div className="mobile-menu-lang">
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value)}
          >
            <option value="en">English</option>
            <option value="te">తెలుగు</option>
            <option value="hi">हिंदी</option>
          </select>
        </div>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="container nav-container">
          <a href="#" className="logo">
            <span style={{ fontSize: '2rem' }}>🌿</span>
            Green Sena
          </a>

          {/* Header Elements (Hamburger & Contact) */}
          <div className="header-actions">
            <button className="hamburger-btn" onClick={toggleMenu}>
              ☰
            </button>
            <a href="#contact" className="btn btn-primary contact-btn-header">📞 {t.navContact}</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="contact">
        <img src="/assets/hero_banner.png" alt="Eco Background" className="hero-bg" />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-intro-box">
            <h1>{t.heroTitle}</h1>
            <p>{t.heroSubShort}</p>
          </div>
          
          <div className="hero-contact-box">
            <div className="price-badge">{t.heroContactPrice}</div>
            <h2>{t.heroContactBest}</h2>
          <p>{t.heroSub}</p>
          <div className="hero-quote">{t.heroQuote}</div>
          
          <div className="hero-action-buttons">
            <a href="https://wa.me/919177112894" target="_blank" rel="noreferrer" className="btn-action btn-wa">
              <span className="icon">💬</span>
              <span className="text">{t.heroChatWa}</span>
            </a>
            <a href="tel:+919177112894" className="btn-action btn-call">
              <span className="icon">📞</span>
              <span className="text">{t.heroCallNow}</span>
            </a>
          </div>

          <div className="contact-cards">
            <div className="contact-card">
              <div className="card-left">
                <span className="icon-phone">📞</span>
                <div className="card-details">
                  <span className="card-label">{t.salesTitle}</span>
                  <span className="card-number">9177112894</span>
                </div>
              </div>
              <a href="https://wa.me/919177112894" className="card-wa-link" target="_blank" rel="noreferrer">
                💬 WhatsApp
              </a>
            </div>
            
            <div className="contact-card">
              <div className="card-left">
                <span className="icon-phone">📞</span>
                <div className="card-details">
                  <span className="card-label">{t.supportTitle}</span>
                  <span className="card-number">8919846934</span>
                </div>
              </div>
              <a href="https://wa.me/918919846934" className="card-wa-link" target="_blank" rel="noreferrer">
                💬 WhatsApp
              </a>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="section container" style={{ padding: '40px 20px 20px' }}>
        <h2 className="section-title" style={{ marginBottom: '20px' }}>{t.whyUsTitle}</h2>
        <div className="features-grid-mobile">
          <div className="feature-item-mobile">
            <span className="feature-icon-mobile">🌿</span>
            <span className="feature-text" style={{ whiteSpace: 'pre-line' }}>{t.why100Comp}</span>
          </div>
          <div className="feature-item-mobile">
            <span className="feature-icon-mobile">📍</span>
            <span className="feature-text" style={{ whiteSpace: 'pre-line' }}>{t.whyMadeIn}</span>
          </div>
          <div className="feature-item-mobile">
            <span className="feature-icon-mobile">♻️</span>
            <span className="feature-text" style={{ whiteSpace: 'pre-line' }}>{t.whyEco}</span>
          </div>
          <div className="feature-item-mobile">
            <span className="feature-icon-mobile">🚚</span>
            <span className="feature-text" style={{ whiteSpace: 'pre-line' }}>{t.whyFast}</span>
          </div>
        </div>
      </section>

      {/* Become a Dealer */}
      <section id="dealer" className="dealer-section container premium-dealer-card">
        <div className="dealer-header-new">
          <span className="green-rev-badge">🌿 Join the Green Revolution 🌿</span>
          <h2 className="dealer-title-main">Become a<br/><span className="highlight-text">Green Sena Dealer</span></h2>
          <p className="dealer-subtitle-new">Start Your Eco-Friendly Business Today!</p>
        </div>

        <div className="dealer-top-perks">
          <div className="perk-box">
            <div className="icon-circle yellow-bg">
              <span className="perk-emoji">💰</span>
            </div>
            <p className="perk-top-text">Start with Just</p>
            <h3 className="perk-main-text">₹10,000</h3>
            <p className="perk-sub-text">Low Investment<br/>High Returns</p>
          </div>
          
          <div className="perk-box">
            <div className="icon-circle red-bg">
              <span className="perk-emoji">📣</span>
            </div>
            <p className="perk-top-text">Complete</p>
            <h3 className="perk-main-text highlight-text">Marketing<br/>Support</h3>
            <p className="perk-sub-text">Posters, Flyers,<br/>Social Media & More</p>
          </div>
          
          <div className="perk-box">
            <div className="icon-circle blue-bg">
              <span className="perk-emoji">🚚</span>
            </div>
            <p className="perk-top-text">Fast Delivery<br/>Across</p>
            <h3 className="perk-main-text highlight-text">Telangana</h3>
            <p className="perk-sub-text">Timely Supply<br/>Assured</p>
          </div>
        </div>

        <div className="divider-line"></div>

        <div className="dealer-small-perks">
          <div className="small-perk">
            <div className="small-icon">📈</div>
            <p>High Profit<br/>Margins</p>
          </div>
          <div className="small-perk">
            <div className="small-icon">👥</div>
            <p>Exclusive<br/>Area Support</p>
          </div>
          <div className="small-perk">
            <div className="small-icon">🎁</div>
            <p>Marketing<br/>Materials Free</p>
          </div>
          <div className="small-perk">
            <div className="small-icon">💬</div>
            <p>WhatsApp<br/>Business Support</p>
          </div>
          <div className="small-perk">
            <div className="small-icon">📦</div>
            <p>Fast Stock<br/>Supply</p>
          </div>
        </div>

        <div className="dealer-badges">
          <div className="badge-yellow">⭐ 100+ Happy Dealers Across Telangana</div>
          <div className="badge-red">🔥 Limited Dealer Slots Available!</div>
        </div>

        <div className="dealer-actions">
          <a href="tel:+919177112894" className="dealer-btn-apply">
            <span className="btn-icon">👤+</span>
            <div className="btn-text-group">
              <span className="btn-title">Become a Dealer Now</span>
              <span className="btn-sub">Apply for Dealership</span>
            </div>
          </a>
          <a href="https://wa.me/919177112894" target="_blank" rel="noreferrer" className="dealer-btn-wa">
            <span className="btn-icon">💬</span>
            <div className="btn-text-group">
              <span className="btn-title">Chat on WhatsApp</span>
              <span className="btn-sub">Quick Support</span>
            </div>
          </a>
        </div>

        <div className="dealer-footer-text">
          <span className="check-icon">🛡️</span> Trusted | Transparent | Eco-Friendly
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="section container">
        <div className="about-wrapper">
          <h2 className="section-title">{t.aboutTitle}</h2>
          <div className="about-grid">
            <div className="about-text">
              <h3>{t.aboutMissionTitle}</h3>
              <p>{t.aboutP1}</p>
              <p>{t.aboutP2}</p>
            </div>
            <div className="about-text">
              <h3>{t.aboutMVTitle}</h3>
              <p>
                <strong>{t.missionStrong}</strong> {t.missionText}
              </p>
              <p>
                <strong>{t.visionStrong}</strong> {t.visionText}
              </p>
              <ul className="values-list">
                <li>🌱 {t.val1}</li>
                <li>♻️ {t.val2}</li>
                <li>🤝 {t.val3}</li>
                <li>💚 {t.val4}</li>
                <li>🌍 {t.val5}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="section container" style={{ backgroundColor: '#f7faf8' }}>
        <h2 className="section-title">{t.prodTitle}</h2>
        <p className="text-center" style={{ maxWidth: '800px', margin: '0 auto' }}>
          {t.prodDesc}
        </p>
        
        <div className="products-grid">
          
          <div className="product-card">
            <img src="/assets/u_cut_bag.png" alt={t.prod1Title} className="product-img" />
            <div className="product-info">
              <h3>{t.prod1Title}</h3>
              <p>{t.prod1Desc}</p>
            </div>
          </div>

          <div className="product-card">
            <img src="/assets/d_cut_bag.png" alt={t.prod2Title} className="product-img" />
            <div className="product-info">
              <h3>{t.prod2Title}</h3>
              <p>{t.prod2Desc}</p>
            </div>
          </div>

          <div className="product-card">
            <img src="/assets/butter_cover.png" alt={t.prod3Title} className="product-img" />
            <div className="product-info">
              <h3>{t.prod3Title}</h3>
              <p>{t.prod3Desc}</p>
            </div>
          </div>

          <div className="product-card">
            <img src="/assets/garbage_bag_flat.png" alt={t.prod4Title} className="product-img" />
            <div className="product-info">
              <h3>{t.prod4Title}</h3>
              <p>{t.prod4Desc}</p>
            </div>
          </div>
          
          <div className="product-card">
            <img src="/assets/garbage_bag_roll_bin.jpeg" alt={t.prod5Title} className="product-img" />
            <div className="product-info">
              <h3>{t.prod5Title}</h3>
              <p>{t.prod5Desc}</p>
            </div>
          </div>

          <div className="product-card">
            <img src="/assets/pouche.png" alt={t.prod6Title} className="product-img" />
            <div className="product-info">
              <h3>{t.prod6Title}</h3>
              <p>{t.prod6Desc}</p>
            </div>
          </div>

          <div className="product-card">
            <img src="/assets/grocery.png" alt={t.prod7Title} className="product-img" />
            <div className="product-info">
              <h3>{t.prod7Title}</h3>
              <p>{t.prod7Desc}</p>
            </div>
          </div>

        </div>
        
        <div style={{ textAlign: 'center', marginTop: '40px', padding: '20px', backgroundColor: '#e0f2e5', borderRadius: '8px' }}>
          <h2 style={{ color: '#1a5331', margin: '0' }}>{t.allBagsTitle}</h2>
          <p style={{ color: '#3b8a47', marginTop: '10px', fontSize: '1.1rem' }}>{t.allBagsDesc}</p>
        </div>

        <ProductSpecifications lang={lang} />
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🌿</div>
          <div className="footer-links">
            <a href="#" onClick={(e) => { e.preventDefault(); setShowTerms(true); }}>{t.footPrivacy}</a>
            <span>|</span>
            <a href="#" onClick={(e) => { e.preventDefault(); setShowTerms(true); }}>{t.footTerms}</a>
          </div>
          <p className="copyright" style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setShowDisclaimer(true)}>
            {t.footCopy}
          </p>
        </div>
      </footer>

      {/* Promotional Popup */}
      {showPromoPopup && (
        <div className="promo-popup-overlay">
          <div className="promo-popup-content">
            <button className="promo-close-btn" onClick={closePromoPopup}>✖</button>
            
            <div className="promo-grid">
              <div className="promo-left">
                <div className="promo-logo">
                  <h2>🌿 Green Sena <span className="small-text">Eco Mission</span></h2>
                  <p className="promo-tagline">For a Green Earth, For a Better Future</p>
                </div>
                
                <div className="promo-opportunity">
                  <span className="red-tag">GREAT OPPORTUNITY!</span>
                  <h3>Become Our <span className="green-huge">DEALER</span></h3>
                  <p className="promo-sub-title">and Start Your Own Business</p>
                  
                  <div className="pricing-badges small-badges">
                    <div className="red-ribbon">Just Pay</div>
                    <div className="green-price">₹10,000</div>
                    <div className="blue-ribbon">One Time Registration</div>
                    <div className="white-ribbon">And Become a DEALER</div>
                  </div>
                </div>
                
                <ul className="promo-checklist">
                  <li>✅ 100% Biodegradable Products</li>
                  <li>✅ High Demand - Eco Friendly Products</li>
                  <li>✅ Low Investment - High Returns</li>
                  <li>✅ Unlimited Earning Opportunity</li>
                  <li>✅ Full Support & Training</li>
                  <li>✅ Grow Your Business With Us</li>
                </ul>
              </div>

              <div className="promo-right">
                <div className="circle-text">
                  <p>Build Your</p><p className="red-text">Income</p><p>Secure Your</p><p className="green-text">Future</p>
                </div>
              </div>
            </div>

            <div className="promo-icons-row">
              <div className="promo-icon-item"><span className="icon-circle green-ico">📈</span> High Profit Margin</div>
              <div className="promo-icon-item"><span className="icon-circle pink-ico">🛒</span> Evergreen Business</div>
              <div className="promo-icon-item"><span className="icon-circle blue-ico">🤝</span> Trusted Products</div>
              <div className="promo-icon-item"><span className="icon-circle orange-ico">🪜</span> Be Your Own Boss</div>
              <div className="promo-icon-item"><span className="icon-circle purple-ico">👥</span> Support & Training</div>
            </div>

            <div className="promo-footer-row">
              <div className="promo-gift">
                <span className="gift-emoji">🎁</span> 
                <div className="gift-text">Start Small...<br/>Think Big...<br/>Earn Big...</div>
              </div>
              <div className="promo-quote">
                "Join Green Sena Eco Mission and be a part of the solution for a Plastic-Free Future!"
              </div>
              <div className="promo-cta-box">
                <p>Don't Miss This Opportunity</p>
                <a href="tel:+919177112894" className="promo-register-btn">REGISTER NOW ➔</a>
              </div>
            </div>
            
            <div className="promo-bottom-bar">
              🌐 www.greensena.com &nbsp;&nbsp;|&nbsp;&nbsp; 🌿 Let's Build a Greener World Together
            </div>
          </div>
        </div>
      )}

      {/* Small Awareness Popup */}
      {showSmallPopup && (
        <div className="small-awareness-popup">
          <button className="small-popup-close" onClick={() => setShowSmallPopup(false)}>✖</button>
          <div className="small-popup-content">
            <div className="small-popup-icon">🌱</div>
            <div className="small-popup-text-container">
              <p className="small-popup-text">
                <strong>Green Sena Eco Mission</strong> is an awareness initiative powered by Sri Avani EcoLife products
              </p>
              <a href="tel:+919177112894" className="small-popup-btn">Register Now ➔</a>
            </div>
          </div>
        </div>
      )}

      {/* Terms and Conditions Modal */}
      {showTerms && (
        <div className="modal-overlay" onClick={() => setShowTerms(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Terms and Conditions</h2>
              <button className="close-btn" onClick={() => setShowTerms(false)}>✕</button>
            </div>
            <div className="modal-body">
              <p><strong>Effective Date:</strong> July 2026</p>
              <p>Welcome to Green Sena Eco Mission.</p>
              <p>By accessing or using this website, you agree to the following Terms and Conditions.</p>
              
              <h3>Website Usage</h3>
              <p>This website is intended to promote environmental awareness and sustainable practices.</p>
              
              <h3>Intellectual Property</h3>
              <p>All content, including text, images, logos, and graphics, belongs to Green Sena Eco Mission unless otherwise stated. Unauthorized copying or reproduction is prohibited.</p>
              
              <h3>User Responsibilities</h3>
              <p>Users agree:</p>
              <ul>
                <li>To provide accurate information.</li>
                <li>Not to misuse the website.</li>
                <li>Not to upload harmful or illegal content.</li>
              </ul>
              
              <h3>Volunteer Participation</h3>
              <p>Participation in Green Sena Eco Mission activities is voluntary and subject to the organization's guidelines.</p>
              
              <h3>Third-Party Links</h3>
              <p>Our website may contain links to external websites. We are not responsible for their content or privacy practices.</p>
              
              <h3>Limitation of Liability</h3>
              <p>Green Sena Eco Mission is not liable for any direct or indirect damages arising from the use of this website.</p>
              
              <h3>Changes</h3>
              <p>We reserve the right to modify these Terms and Conditions at any time without prior notice.</p>
              
              <h3>Governing Law</h3>
              <p>These Terms shall be governed by the laws of India.</p>
            </div>
          </div>
        </div>
      )}

      {/* Disclaimer Modal */}
      {showDisclaimer && (
        <div className="modal-overlay" onClick={() => setShowDisclaimer(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Disclaimer</h2>
              <button className="close-btn" onClick={() => setShowDisclaimer(false)}>✕</button>
            </div>
            <div className="modal-body">
              <p>The information provided on the Green Sena Eco Mission website is for general educational and environmental awareness purposes only.</p>
              <p>While we strive to keep the information accurate and up to date, we make no warranties regarding its completeness, reliability, or accuracy.</p>
              <p>Green Sena Eco Mission is not responsible for any loss or damage resulting from the use of information available on this website.</p>
              <p>External links are provided for convenience only. We do not endorse or guarantee the content of third-party websites.</p>
              <p>Participation in environmental campaigns, volunteer programs, or community activities is entirely voluntary and at the participant's own discretion.</p>
              <p>All opinions, articles, photographs, and educational materials published on this website are intended to promote environmental awareness and public participation.</p>
              <p><strong>© 2026 Green Sena Eco Mission. All Rights Reserved.</strong></p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
