import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  FaInstagram, 
  FaTiktok, 
  FaTimes, 
  FaShareAlt, 
  FaDownload,
  FaQrcode,
  FaCopy,
  FaPrint
} from 'react-icons/fa';
import './LandingPage.css';

function LandingPage() {
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [activePlatform, setActivePlatform] = useState('all');
  const landingPageRef = useRef(null);

  // Tous les réseaux sociaux
  const allSocialLinks = [
    {
      id: 1,
      name: "Mouride Makane",
      platform: "instagram",
      url: "https://www.instagram.com/mouride__makane?igsh=bzEweXU3a3ZjZ2hx&utm_source=qr",
      icon: <FaInstagram />,
      color: "#E4405F",
      username: "@mouride__makane",
      category: "Instagram"
    },
    {
      id: 2,
      name: "Mouride Makane Boutique",
      platform: "instagram",
      url: "https://www.instagram.com/mouride_makane_boutique?igsh=MTMzcXZrcGxhNTEwag%3D%3D&utm_source=qr",
      icon: <FaInstagram />,
      color: "#E4405F",
      username: "@mouride_makane_boutique",
      category: "Instagram"
    },
    {
      id: 3,
      name: "Thialaw Joop",
      platform: "instagram",
      url: "https://www.instagram.com/thialaw_joop_?igsh=dHJ2cjR0dGVleDhs&utm_source=qr",
      icon: <FaInstagram />,
      color: "#E4405F",
      username: "@thialaw_joop_",
      category: "Instagram"
    },
    {
      id: 4,
      name: "Mouride Makane",
      platform: "tiktok",
      url: "https://www.tiktok.com/@mouridemakane?_r=1&_t=ZM-91vXCEKwifz",
      icon: <FaTiktok />,
      color: "#000000",
      username: "@mouridemakane",
      category: "TikTok"
    },
    {
      id: 5,
      name: "Mouride Makane 1",
      platform: "tiktok",
      url: "https://www.tiktok.com/@mouride_makane1?_r=1&_t=ZP-91vXGQ1vxNP",
      icon: <FaTiktok />,
      color: "#000000",
      username: "@mouride_makane1",
      category: "TikTok"
    },
    {
      id: 6,
      name: "Thialaw Joop",
      platform: "tiktok",
      url: "https://www.tiktok.com/@thialawjoop0?_r=1&_t=ZM-91vXIBu9pgx",
      icon: <FaTiktok />,
      color: "#000000",
      username: "@thialawjoop0",
      category: "TikTok"
    }
  ];

  // URL de la page avec le paramètre pour ouvrir automatiquement le modal
  const modalUrl = `${window.location.origin}${window.location.pathname}?showModal=true`;
  
  // URL de la page actuelle
  const currentPageUrl = window.location.href;

  // Filtrer les réseaux sociaux par plateforme
  const filteredSocialLinks = activePlatform === 'all' 
    ? allSocialLinks 
    : allSocialLinks.filter(social => social.platform === activePlatform);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mes Réseaux Sociaux - Scan & Choisis',
          text: 'Scannez le QR code pour accéder à tous mes réseaux sociaux',
          url: currentPageUrl,
        });
      } catch (error) {
        console.log('Erreur de partage:', error);
      }
    } else {
      navigator.clipboard.writeText(currentPageUrl);
      alert('Lien copié dans le presse-papier !');
    }
  };

  const handleLinkClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadPDF = async () => {
    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');
      
      const element = landingPageRef.current;
      
      html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 190;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        pdf.save('qr-code-reseaux-sociaux.pdf');
      });
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      alert('Erreur lors de la génération du PDF. Essayez d\'imprimer la page à la place.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url);
    alert('Lien copié dans le presse-papier !');
  };

  const handleCopyQRUrl = () => {
    navigator.clipboard.writeText(modalUrl);
    alert('Lien du QR code copié dans le presse-papier !');
  };

  // Vérifier si le modal doit s'ouvrir automatiquement
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('showModal') === 'true') {
      setShowSocialModal(true);
    }
  }, []);

  return (
    <div ref={landingPageRef} className="landing-page">
      {/* En-tête */}
      <header className="header">
        <div className="container">
          <h1 className="logo">Mes Réseaux Sociaux</h1>
          <p className="tagline">Scannez, choisissez, connectez-vous !</p>
        </div>
      </header>

      {/* Section principale avec QR code */}
      <main className="main-content">
        <div className="container">
          <div className="qr-section">
            <div className="qr-card">
              <div className="qr-container">
                <div className="qr-wrapper">
                  <QRCodeSVG 
                    value={modalUrl}
                    size={250}
                    level="H"
                    includeMargin={true}
                  />
                  <div className="qr-overlay">
                    <button 
                      className="scan-btn"
                      onClick={() => setShowSocialModal(true)}
                    >
                      Cliquez pour tester
                    </button>
                  </div>
                </div>
                
                <div className="qr-info">
                  <h2 className="qr-title">Scannez ce QR Code</h2>
                  <p className="qr-description">
                    Scannez ce QR code avec votre téléphone pour voir tous mes réseaux sociaux et choisir celui que vous préférez.
                  </p>
                  
                  <div className="qr-url">
                    <code>{modalUrl}</code>
                    <button 
                      className="copy-url-btn"
                      onClick={handleCopyQRUrl}
                      title="Copier le lien"
                    >
                      <FaCopy />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="action-buttons">
                <button
                  className="btn btn-primary"
                  onClick={() => setShowSocialModal(true)}
                >
                  <FaQrcode /> Voir les réseaux
                </button>
                
                <button
                  className="btn btn-secondary"
                  onClick={handleShare}
                >
                  <FaShareAlt /> Partager
                </button>
                
                <button
                  className="btn btn-outline"
                  onClick={handleDownloadPDF}
                >
                  <FaDownload /> Télécharger QR
                </button>
              </div>
            </div>
            
            <div className="instructions">
              <h3>Comment ça marche ?</h3>
              <ol className="steps">
                <li>
                  <span className="step-number">1</span>
                  <span className="step-text">Scannez le QR code avec l'appareil photo de votre téléphone</span>
                </li>
                <li>
                  <span className="step-number">2</span>
                  <span className="step-text">Une fenêtre s'ouvre avec tous mes réseaux sociaux</span>
                </li>
                <li>
                  <span className="step-number">3</span>
                  <span className="step-text">Choisissez le réseau qui vous intéresse</span>
                </li>
                <li>
                  <span className="step-number">4</span>
                  <span className="step-text">Cliquez pour être redirigé directement vers le compte</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p className="footer-text">
            © {new Date().getFullYear()} - Tous droits réservés
          </p>
          <button 
            className="print-btn"
            onClick={handlePrint}
          >
            <FaPrint /> Version imprimable
          </button>
        </div>
      </footer>

      {/* Modal des réseaux sociaux */}
      {showSocialModal && (
        <div className="modal-overlay" onClick={() => setShowSocialModal(false)}>
          <div className="social-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Mes Réseaux Sociaux</h2>
              <button 
                className="close-modal"
                onClick={() => setShowSocialModal(false)}
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="modal-content">
              {/* Filtres par plateforme */}
              <div className="platform-filters">
                <button 
                  className={`filter-btn ${activePlatform === 'all' ? 'active' : ''}`}
                  onClick={() => setActivePlatform('all')}
                >
                  Tous
                </button>
                <button 
                  className={`filter-btn ${activePlatform === 'instagram' ? 'active' : ''}`}
                  onClick={() => setActivePlatform('instagram')}
                >
                  <FaInstagram /> Instagram
                </button>
                <button 
                  className={`filter-btn ${activePlatform === 'tiktok' ? 'active' : ''}`}
                  onClick={() => setActivePlatform('tiktok')}
                >
                  <FaTiktok /> TikTok
                </button>
              </div>
              
              {/* Liste des réseaux sociaux */}
              <div className="social-grid">
                {filteredSocialLinks.map((social) => (
                  <div 
                    key={social.id} 
                    className="social-item"
                    onClick={() => handleLinkClick(social.url)}
                  >
                    <div className="social-icon-wrapper" style={{ backgroundColor: social.color }}>
                      {social.icon}
                    </div>
                    
                    <div className="social-info">
                      <h3 className="social-name">{social.name}</h3>
                      <p className="social-username">{social.username}</p>
                      <span className="social-platform-badge">
                        {social.category}
                      </span>
                    </div>
                    
                    <div className="social-actions">
                      <button 
                        className="visit-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLinkClick(social.url);
                        }}
                      >
                        Visiter
                      </button>
                      
                      <button 
                        className="copy-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyLink(social.url);
                        }}
                        title="Copier le lien"
                      >
                        <FaCopy />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Instructions dans le modal */}
              <div className="modal-instructions">
                <p>✨ <strong>Astuce :</strong> Cliquez sur "Visiter" pour aller directement sur le compte</p>
                <p>📱 <strong>Mobile :</strong> Scannez le QR code avec votre téléphone pour revenir à cette page</p>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowSocialModal(false)}
              >
                Retour
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleShare}
              >
                <FaShareAlt /> Partager cette liste
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;