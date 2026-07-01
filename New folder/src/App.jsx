import React, { useState } from 'react';
import './index.css';
import ProductSpecifications from './ProductSpecifications';
import { translations } from './translations';

function App() {
  const [lang, setLang] = useState('en');
  const t = translations[lang];

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="container nav-container">
          <a href="#" className="logo">
            <span style={{ fontSize: '2rem' }}>🌿</span>
            Green Sena
          </a>
          <ul className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <li><a href="#about">{t.navAbout}</a></li>
            <li><a href="#products">{t.navProducts}</a></li>
            <li><a href="#why-us">{t.navWhyUs}</a></li>
            <li><a href="#contact" className="btn btn-primary" style={{ padding: '8px 20px' }}>{t.navContact}</a></li>
            <li>
              <select 
                value={lang} 
                onChange={(e) => setLang(e.target.value)}
                style={{ padding: '6px', borderRadius: '4px', border: '1px solid #0b5020', background: 'white', color: '#0b5020', fontWeight: 'bold' }}
              >
                <option value="en">English</option>
                <option value="te">తెలుగు</option>
                <option value="hi">हिंदी</option>
              </select>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <img src="/assets/hero_banner.png" alt="Eco Background" className="hero-bg" />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>{t.heroTitle}</h1>
          <p>{t.heroSub}</p>
          <a href="#products" className="btn btn-primary">{t.heroBtn}</a>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="section container">
        <div className="about-wrapper">
          <h2 className="section-title" style={{ color: '#ffffff' }}>{t.aboutTitle}</h2>
          <div className="about-grid">
            <div className="about-text">
              <h3 style={{ color: '#e0f2e5' }}>{t.aboutMissionTitle}</h3>
              <p>{t.aboutP1}</p>
              <p>{t.aboutP2}</p>
            </div>
            <div className="about-text">
              <h3 style={{ color: '#e0f2e5' }}>{t.aboutMVTitle}</h3>
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
            <img src="/assets/garbage_bag_bin.png" alt={t.prod5Title} className="product-img" />
            <div className="product-info">
              <h3>{t.prod5Title}</h3>
              <p>{t.prod5Desc}</p>
            </div>
          </div>

        </div>
        
        <div style={{ textAlign: 'center', marginTop: '40px', padding: '20px', backgroundColor: '#e0f2e5', borderRadius: '8px' }}>
          <h2 style={{ color: '#1a5331', margin: '0' }}>{t.allBagsTitle}</h2>
          <p style={{ color: '#3b8a47', marginTop: '10px', fontSize: '1.1rem' }}>{t.allBagsDesc}</p>
        </div>

        <ProductSpecifications lang={lang} />

      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="section container">
        <h2 className="section-title">{t.whyUsTitle}</h2>
        <div className="features-container">
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <h4>{t.why1}</h4>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🌟</span>
            <h4>{t.why2}</h4>
          </div>
          <div className="feature-item">
            <span className="feature-icon">💰</span>
            <h4>{t.why3}</h4>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📦</span>
            <h4>{t.why4}</h4>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🎧</span>
            <h4>{t.why5}</h4>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="container">
        <div className="cta-section">
          <h2>{t.ctaPrice}</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
            {t.ctaDesc}
          </p>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '20px 0' }}>
            {t.ctaQuote}
          </div>
          <div className="contact-info">
            <div>
              <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>📞</span>
              <a href="tel:+919177112894" style={{ color: 'white', textDecoration: 'none', marginRight: '15px' }}>{t.btnCall} 9177112894</a>
              <a href="https://wa.me/919177112894" target="_blank" rel="noreferrer" style={{ color: '#25D366', textDecoration: 'none' }}>{t.btnWa}</a>
            </div>
            <div>
              <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>📞</span>
              <a href="tel:+918919846934" style={{ color: 'white', textDecoration: 'none', marginRight: '15px' }}>{t.btnCall} 8919846934</a>
              <a href="https://wa.me/918919846934" target="_blank" rel="noreferrer" style={{ color: '#25D366', textDecoration: 'none' }}>{t.btnWa}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🌿</div>
          <div className="footer-links">
            <a href="#">{t.footPrivacy}</a>
            <span>|</span>
            <a href="#">{t.footTerms}</a>
          </div>
          <p className="copyright">{t.footCopy}</p>
        </div>
      </footer>
    </>
  );
}

export default App;
