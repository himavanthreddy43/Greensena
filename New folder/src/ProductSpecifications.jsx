import React, { useState } from 'react';
import './ProductSpecifications.css';
import { translations } from './translations';

const SpecAccordion = ({ title, icon, children, isOpen, onToggle }) => {
  return (
    <div className={`spec-table-wrapper ${isOpen ? 'open' : ''}`}>
      <div 
        className="spec-table-header" 
        onClick={onToggle} 
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div className="spec-table-icon">{icon}</div>
          <span>{title}</span>
        </div>
        <div style={{ fontSize: '1.2rem', paddingRight: '10px' }}>{isOpen ? '▲' : '▼'}</div>
      </div>
      {isOpen && (
        <div className="spec-table-content" style={{ animation: 'fadeIn 0.3s' }}>
          {children}
        </div>
      )}
    </div>
  );
};

const ProductSpecifications = ({ lang = 'en' }) => {
  const t = translations[lang];
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (sectionName) => {
    setOpenSection(openSection === sectionName ? null : sectionName);
  };

  return (
    <div className="specs-wrapper">
      <div className="specs-header-container">
        <h1 className="specs-title">
          <span className="leaf-icon left">🌿</span>
          {t.specTitle}
          <span className="leaf-icon right">🌿</span>
        </h1>
      </div>

      <div className="specs-grid">
        {/* Left Column */}
        <div className="specs-col">
          
          {/* U-CUT SHAPE CARRY BAG */}
          <SpecAccordion title={t.specUcut} icon="🛍️" isOpen={openSection === 'ucut'} onToggle={() => toggleSection('ucut')}>
            <table className="spec-table">
              <thead>
                <tr>
                  <th>{t.colSize}</th>
                  <th>{t.colMicrons}</th>
                  <th>{t.colPcs}</th>
                  <th>{t.colLoad}</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>8 × 10</td><td>40</td><td>186</td><td>500 Gms</td></tr>
                <tr><td>10 × 12</td><td>40</td><td>124</td><td>1 Kg</td></tr>
                <tr><td>11 × 14</td><td>40</td><td>96</td><td>2 Kg</td></tr>
                <tr><td>13 × 16</td><td>40</td><td>71</td><td>3 Kg</td></tr>
                <tr><td>16 × 20</td><td>50</td><td>40</td><td>5 Kg</td></tr>
                <tr><td>17 × 23</td><td>50</td><td>32</td><td>7 Kg</td></tr>
                <tr><td>20 × 24</td><td>50</td><td>24</td><td>10 Kg</td></tr>
                <tr><td>24 × 30</td><td>50</td><td>16</td><td>15 Kg</td></tr>
              </tbody>
            </table>
          </SpecAccordion>

          {/* POUCHES */}
          <SpecAccordion title={t.specPouches} icon="✉️" isOpen={openSection === 'pouches'} onToggle={() => toggleSection('pouches')}>
            <table className="spec-table">
              <thead>
                <tr>
                  <th>{t.colSize}</th>
                  <th>{t.colMicrons}</th>
                  <th>{t.colPcs}</th>
                  <th>{t.colLoad}</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>5 × 7</td><td>60</td><td>270</td><td>150 Gms</td></tr>
                <tr><td>5 × 8</td><td>60</td><td>250</td><td>200 Gms</td></tr>
                <tr><td>6 × 9</td><td>60</td><td>180</td><td>250 Gms</td></tr>
                <tr><td>7 × 10</td><td>60</td><td>135</td><td>300 Gms</td></tr>
              </tbody>
            </table>
          </SpecAccordion>

          {/* GROCERY BAGS */}
          <SpecAccordion title={t.specGrocery} icon="🛒" isOpen={openSection === 'grocery'} onToggle={() => toggleSection('grocery')}>
            <table className="spec-table">
              <thead>
                <tr>
                  <th>{t.colSize}</th>
                  <th>{t.colMicrons}</th>
                  <th>{t.colPcs}</th>
                  <th>{t.colLoad}</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>8 × 10</td><td>40</td><td>180</td><td>500 Gm</td></tr>
                <tr><td>9 × 12</td><td>40</td><td>140</td><td>1 Kg</td></tr>
                <tr><td>10 × 15</td><td>40</td><td>95</td><td>2 Kg</td></tr>
                <tr><td>11 × 17</td><td>45</td><td>72</td><td>3 Kg</td></tr>
                <tr><td>13 × 20</td><td>50</td><td>45</td><td>5 Kg</td></tr>
                <tr><td>16 × 25</td><td>55</td><td>27</td><td>10 Kg</td></tr>
              </tbody>
            </table>
          </SpecAccordion>

        </div>

        {/* Right Column */}
        <div className="specs-col">
          
          {/* D-CUT SHAPE CARRY BAG */}
          <SpecAccordion title={t.specDcut} icon="🛍️" isOpen={openSection === 'dcut'} onToggle={() => toggleSection('dcut')}>
            <table className="spec-table">
              <thead>
                <tr>
                  <th>{t.colSize}</th>
                  <th>{t.colMicrons}</th>
                  <th>{t.colPcs}</th>
                  <th>{t.colLoad}</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>9 × 13</td><td>45</td><td>115</td><td>-</td></tr>
                <tr><td>10 × 15</td><td>55</td><td>75</td><td>-</td></tr>
                <tr><td>12 × 16</td><td>65</td><td>50</td><td>-</td></tr>
                <tr><td>12 × 18</td><td>65</td><td>42</td><td>-</td></tr>
                <tr><td>16 × 20</td><td>75</td><td>25</td><td>-</td></tr>
                <tr><td>18 × 24</td><td>75</td><td>19</td><td>-</td></tr>
              </tbody>
            </table>
          </SpecAccordion>

          {/* BUTTER PAPER */}
          <SpecAccordion title={t.specButter} icon="📜" isOpen={openSection === 'butter'} onToggle={() => toggleSection('butter')}>
            <table className="spec-table">
              <thead>
                <tr>
                  <th>{t.colSize}</th>
                  <th>{t.colMicrons}</th>
                  <th>{t.colPcs}</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>9 × 9</td><td>30</td><td>450</td></tr>
                <tr><td>10 × 12</td><td>30</td><td>400</td></tr>
                <tr><td>12 × 12</td><td>30</td><td>360</td></tr>
                <tr><td>12 × 15</td><td>30</td><td>320</td></tr>
                <tr><td>13 × 13</td><td>30</td><td>250</td></tr>
              </tbody>
            </table>
          </SpecAccordion>

          {/* GARBAGE BAGS */}
          <SpecAccordion title={t.specGarbage} icon="🗑️" isOpen={openSection === 'garbage'} onToggle={() => toggleSection('garbage')}>
            <table className="spec-table">
              <thead>
                <tr>
                  <th>{t.colSize}</th>
                  <th>{t.colMicrons}</th>
                  <th>{t.colPcs}</th>
                  <th>{t.colLoad}</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>17 × 19</td><td>40</td><td>46</td><td>1 Kg</td></tr>
                <tr><td>19 × 21</td><td>40</td><td>38</td><td>3 Kg</td></tr>
                <tr><td>29 × 39</td><td>45</td><td>11</td><td>8 Kg</td></tr>
                <tr><td>30 × 50</td><td>55</td><td>7</td><td>12 Kg</td></tr>
              </tbody>
            </table>
          </SpecAccordion>

          {/* MEDICAL WASTE BAGS */}
          <SpecAccordion title={t.specMedical} icon="🛢️" isOpen={openSection === 'medical'} onToggle={() => toggleSection('medical')}>
            <table className="spec-table">
              <thead>
                <tr>
                  <th>{t.colSize}</th>
                  <th>{t.colMicrons}</th>
                  <th>{t.colPcs}</th>
                  <th>{t.colLoad}</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>18 × 18</td><td>35</td><td>52</td><td>2 Kg</td></tr>
                <tr><td>18 × 22</td><td>40</td><td>37</td><td>3 Kg</td></tr>
                <tr><td>30 × 36</td><td>55</td><td>10</td><td>12 Kg</td></tr>
                <tr><td>30 × 40</td><td>55</td><td>9</td><td>13 Kg</td></tr>
              </tbody>
            </table>
          </SpecAccordion>

        </div>
      </div>

      <div className="highlights-header">
        <span className="leaf-icon left">🌿</span>
        {t.highTitle}
        <span className="leaf-icon right">🌿</span>
      </div>
      
      <div className="highlights-section">
        <div className="highlight-item">
          <div className="highlight-icon">🌱</div>
          <p style={{ whiteSpace: 'pre-wrap' }}>{t.h100Bio}</p>
        </div>
        <div className="highlight-item">
          <div className="highlight-icon">♻️</div>
          <p style={{ whiteSpace: 'pre-wrap' }}>{t.hEco}</p>
        </div>
        <div className="highlight-item">
          <div className="highlight-icon">🌿</div>
          <p style={{ whiteSpace: 'pre-wrap' }}>{t.hComp}</p>
        </div>
        <div className="highlight-item">
          <div className="highlight-icon">💪</div>
          <p style={{ whiteSpace: 'pre-wrap' }}>{t.hStrong}</p>
        </div>
        <div className="highlight-item">
          <div className="highlight-icon">🚚</div>
          <p style={{ whiteSpace: 'pre-wrap' }}>{t.hBulk}</p>
        </div>
        <div className="highlight-item">
          <div className="highlight-icon">🌍</div>
          <p style={{ whiteSpace: 'pre-wrap' }}>{t.hEarth}</p>
        </div>
      </div>

    </div>
  );
};

export default ProductSpecifications;
