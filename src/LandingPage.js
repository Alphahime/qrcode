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
  const qrCodeRef = useRef(null);

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

  const handleDownloadQRCode = async () => {
    try {
      // Importer dynamiquement les bibliothèques
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');
      
      // Créer un élément temporaire pour le QR code
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'fixed';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '0';
      tempDiv.style.width = '500px';
      tempDiv.style.height = '500px';
      tempDiv.style.padding = '50px';
      tempDiv.style.background = 'white';
      tempDiv.style.borderRadius = '20px';
      tempDiv.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
      
      // Ajouter le QR code au DOM temporaire
      const qrCodeHTML = `
        <div style="
          position: relative;
          width: 400px;
          height: 400px;
          background: white;
          padding: 20px;
          border-radius: 15px;
          border: 15px solid #8B4513;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <svg width="360" height="360" viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg">
            ${document.querySelector('.qr-wrapper svg').innerHTML}
          </svg>
          <div style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border-radius: 10px;
            border: 5px solid #8B4513;
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#8B4513">
              <path d="M1 1h8v8H1zM3 3v4h4V3zM1 15h8v8H1zM3 17v4h4v-4zM15 1h8v8h-8zM17 3v4h4V3zM13 13h2v2h-2zM15 15h2v2h-2zM17 13h2v2h-2zM13 17h2v2h-2zM15 19h2v2h-2zM17 17h2v2h-2zM19 13h2v2h-2zM19 17h2v2h-2zM19 21h2v2h-2z"/>
            </svg>
          </div>
        </div>
      `;
      
      tempDiv.innerHTML = qrCodeHTML;
      document.body.appendChild(tempDiv);
      
      // Attendre que l'image soit chargée
      setTimeout(() => {
        html2canvas(tempDiv, {
          scale: 3, // Haute résolution
          useCORS: true,
          backgroundColor: '#ffffff',
          logging: false
        }).then(canvas => {
          const imgData = canvas.toDataURL('image/png', 1.0);
          
          // Créer le PDF
          const pdf = new jsPDF('p', 'mm', 'a4');
          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();
          
          // Calculer la taille de l'image pour qu'elle s'adapte à la page
          const imgWidth = 120; // mm
          const imgHeight = 120; // mm
          
          // Centrer l'image
          const x = (pageWidth - imgWidth) / 2;
          const y = (pageHeight - imgHeight) / 2;
          
          pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
          pdf.save('qr-code-reseaux-sociaux.pdf');
          
          // Nettoyer
          document.body.removeChild(tempDiv);
        }).catch(error => {
          console.error('Erreur html2canvas:', error);
          fallbackDownload();
        });
      }, 100);
      
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      fallbackDownload();
    }
  };

  // Fallback pour télécharger l'image directement
  const fallbackDownload = () => {
    const qrSvg = document.querySelector('.qr-wrapper svg');
    if (qrSvg) {
      const svgData = new XMLSerializer().serializeToString(qrSvg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      // Créer un SVG complet avec le design marron/blanc
      const completeSVG = `
        <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
          <rect width="400" height="400" fill="white" rx="20" ry="20"/>
          <rect x="15" y="15" width="370" height="370" fill="none" stroke="#8B4513" stroke-width="30" rx="5" ry="5"/>
          ${svgData.replace('<svg', '<g').replace('</svg>', '</g>')}
          <rect x="170" y="170" width="60" height="60" fill="white" stroke="#8B4513" stroke-width="10" rx="10" ry="10"/>
          <path d="M1 1h8v8H1zM3 3v4h4V3zM1 15h8v8H1zM3 17v4h4v-4zM15 1h8v8h-8zM17 3v4h4V3zM13 13h2v2h-2zM15 15h2v2h-2zM17 13h2v2h-2zM13 17h2v2h-2zM15 19h2v2h-2zM17 17h2v2h-2zM19 13h2v2h-2zM19 17h2v2h-2zM19 21h2v2h-2z" 
                transform="translate(190, 190) scale(2)" fill="#8B4513"/>
        </svg>
      `;
      
      img.onload = () => {
        canvas.width = 800; // Haute résolution
        canvas.height = 800;
        ctx.drawImage(img, 0, 0, 800, 800);
        
        const link = document.createElement('a');
        link.download = 'qr-code-marron-blanc.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(completeSVG);
    } else {
      alert('Erreur lors de la génération du QR code. Essayez d\'imprimer la page à la place.');
    }
  };

  const handlePrint = () => {
    // Créer une fenêtre d'impression avec seulement le QR code
    const qrElement = document.querySelector('.qr-wrapper');
    if (!qrElement) return;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>QR Code - Mes Réseaux Sociaux</title>
          <style>
            @media print {
              @page {
                margin: 0;
                size: A4;
              }
              body {
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                background: white;
              }
            }
            body {
              margin: 0;
              padding: 50px;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              background: white;
            }
            .print-qr-container {
              padding: 30px;
              background: white;
              border-radius: 20px;
              border: 15px solid #8B4513;
              box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            }
          </style>
        </head>
        <body>
          <div class="print-qr-container">
            ${qrElement.innerHTML}
          </div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() {
                window.close();
              }, 1000);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url);
    alert('Lien copié dans le presse-papier !');
  };

  // Vérifier si le modal doit s'ouvrir automatiquement
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('showModal') === 'true') {
      setShowSocialModal(true);
    }
  }, []);

  return (
    <div className="landing-page">
      {/* Section principale avec QR code */}
      <main className="main-content">
        <div className="container">
          <div className="qr-section">
            <div className="qr-card">
              <div className="qr-container">
                <div className="qr-wrapper" ref={qrCodeRef}>
                  <div className="qr-code-marron">
                    <QRCodeSVG 
                      value={modalUrl}
                      size={300}
                      level="H"
                      includeMargin={true}
                      fgColor="#8B4513" // Couleur marron pour le QR code
                      bgColor="#FFFFFF" // Fond blanc
                    />
                    <div className="qr-center-icon">
                      <FaQrcode />
                    </div>
                  </div>
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
                      onClick={handleDownloadQRCode}
                    >
                      <FaDownload /> Télécharger QR
                    </button>

                    <button
                      className="btn btn-outline"
                      onClick={handlePrint}
                    >
                      <FaPrint /> Imprimer QR
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

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