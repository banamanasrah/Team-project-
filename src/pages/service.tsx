import { useState, useEffect, type ChangeEvent, type CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';

interface Service {
  id: string;
  title: string;
  category: string;
  duration: string;
  price: string;
  description: string;
  images: string[];
  createdAt: string;
}

const HomeServicesPage = () => {
  const navigate = useNavigate();

  // State for the dual range slider
  const [minPrice, setMinPrice] = useState(20);
  const [maxPrice, setMaxPrice] = useState(250);

  // State for other filters
  const [rating, setRating] = useState('4.0');
  const [duration, setDuration] = useState('Long');

  // State for services
  const [services, setServices] = useState<Service[]>([]);

  // Load services from localStorage on component mount
  useEffect(() => {
    const storedServices = JSON.parse(localStorage.getItem('services') || '[]');
    setServices(storedServices);
  }, []);

  const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPrice - 10);
    setMinPrice(value);
  };

  const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPrice + 10);
    setMaxPrice(value);
  };

  const minPercent = (minPrice / 250) * 100;
  const maxPercent = (maxPrice / 250) * 100;

  const styles: Record<string, CSSProperties> = {
    pageWrapper: {
      padding: '60px 80px',
      fontFamily: "'Inter', sans-serif",
      backgroundColor: '#F9FAFB',
      minHeight: '100vh',
      color: '#000000',
    },
    headline: {
      fontSize: '42px',
      fontWeight: '800',
      marginBottom: '10px',
    },
    description: {
      fontSize: '18px',
      color: '#4B5563',
      maxWidth: '850px',
      lineHeight: '1.6',
      marginBottom: '40px',
    },
    ctaBox: {
      backgroundColor: '#E5E7EB',
      borderRadius: '32px',
      padding: '40px 50px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '60px',
    },
    buttonGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      minWidth: '220px',
    },
    primaryBtn: {
      backgroundColor: '#4A7291',
      color: '#FFFFFF',
      padding: '14px 24px',
      borderRadius: '50px',
      border: 'none',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      textAlign: 'center',
    },
    secondaryBtn: {
      backgroundColor: 'transparent',
      color: '#4A7291',
      padding: '14px 24px',
      borderRadius: '50px',
      border: '2px solid #4A7291',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      textAlign: 'center',
    },
    mainLayout: {
      display: 'grid',
      gridTemplateColumns: '320px 1fr',
      gap: '50px',
    },
    sidebar: {
      backgroundColor: '#E5E7EB',
      borderRadius: '32px',
      padding: '35px',
      height: 'fit-content',
    },
    filterLabel: {
      fontSize: '18px',
      fontWeight: '700',
      marginBottom: '20px',
      display: 'block',
    },
    sliderWrapper: {
      position: 'relative',
      height: '40px',
      width: '100%',
      marginTop: '10px',
      display: 'flex',
      alignItems: 'center'
    },
    sliderTrack: {
      position: 'absolute',
      width: '100%',
      height: '6px',
      borderRadius: '5px',
      backgroundColor: '#FFFFFF',
      zIndex: 1
    },
    activeRange: {
      position: 'absolute',
      height: '6px',
      backgroundColor: '#4A7291',
      zIndex: 2,
      left: `${minPercent}%`,
      right: `${100 - maxPercent}%`,
      borderRadius: '5px'
    },
    inputRange: {
      position: 'absolute',
      width: '100%',
      appearance: 'none',
      background: 'none',
      pointerEvents: 'none',
      outline: 'none',
      zIndex: 3
    },
    // Main Content Centering
    contentMain: {
      display: 'flex',
      justifyContent: 'center', // Horizontal Center
      alignItems: 'center',     // Vertical Center
      minHeight: '400px',       // Gives it space to be "in the middle"
    },
    noServiceMsg: {
      fontSize: '26px',
      fontWeight: '700',
      color: '#000000', // Solid Black
      textAlign: 'center',
    },
    servicesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
      width: '100%',
      maxWidth: '1200px',
    },
    serviceCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      cursor: 'pointer',
    },
    serviceImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover' as const,
    },
    serviceContent: {
      padding: '20px',
    },
    serviceTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#000000',
      marginBottom: '8px',
    },
    serviceCategory: {
      fontSize: '14px',
      color: '#6B7280',
      marginBottom: '4px',
    },
    serviceDuration: {
      fontSize: '14px',
      color: '#6B7280',
      marginBottom: '8px',
    },
    servicePrice: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#4A7291',
      marginBottom: '12px',
    },
    serviceDescription: {
      fontSize: '14px',
      color: '#4B5563',
      lineHeight: '1.4',
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <h1 style={styles.headline}>Premium Home Services</h1>
      <p style={styles.description}>
        Curated specialists dedicated to the art of Scandinavian living. 
        Reliability meets refined expertise.
      </p>

      <div style={styles.ctaBox}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>
            Looking for a service or want to provide one?
          </h2>
          <p style={{ fontSize: '16px', color: '#4B5563' }}>
            Connect with the best Scandinavian experts or grow your own business.
          </p>
        </div>
        <div style={styles.buttonGroup}>
          <button 
            style={styles.primaryBtn}
            onClick={() => {
              document.getElementById('services-list')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Browse Services
          </button>
          <button
            style={styles.secondaryBtn}
            onClick={() => navigate('/listservice')}
          >
            List Your Service
          </button>
        </div>
      </div>

      <div style={styles.mainLayout}>
        <aside style={styles.sidebar}>
          
          <div style={{ marginBottom: '40px' }}>
            <span style={styles.filterLabel}>Rating</span>
            {[4.0, 2.0, 1.0].map((star) => (
              <label key={star} style={{ display: 'flex', gap: '12px', marginBottom: '12px', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name="rating" 
                  checked={rating === star.toString()} 
                  onChange={() => setRating(star.toString())} 
                />
                {star.toFixed(1)} & up <span style={{ color: '#F1C40F' }}>★</span>
              </label>
            ))}
          </div>

          <div style={{ marginBottom: '40px' }}>
            <span style={styles.filterLabel}>Price Range</span>
            <div style={styles.sliderWrapper}>
              <div style={styles.sliderTrack} />
              <div style={styles.activeRange} />
              
              <input 
                type="range" min="0" max="250" value={minPrice} onChange={handleMinChange}
                style={styles.inputRange} 
                className="dual-slider"
              />
              <input 
                type="range" min="0" max="250" value={maxPrice} onChange={handleMaxChange}
                style={styles.inputRange} 
                className="dual-slider"
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginTop: '10px' }}>
              <span>${minPrice}</span>
              <span>${maxPrice === 250 ? '250+' : maxPrice}</span>
            </div>
          </div>

          <div>
            <span style={styles.filterLabel}>Duration</span>
            <div style={{ display: 'flex', backgroundColor: '#D1D5DB', padding: '5px', borderRadius: '25px' }}>
              <button 
                onClick={() => setDuration('Short')}
                style={{ 
                  flex: 1, padding: '10px', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold',
                  backgroundColor: duration === 'Short' ? '#C6D1D9' : 'transparent',
                  color: duration === 'Short' ? '#4A7291' : '#6B7280'
                }}>Short</button>
              <button 
                onClick={() => setDuration('Long')}
                style={{ 
                  flex: 1, padding: '10px', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold',
                  backgroundColor: duration === 'Long' ? '#C6D1D9' : 'transparent',
                  color: duration === 'Long' ? '#4A7291' : '#6B7280'
                }}>Long</button>
            </div>
          </div>
        </aside>

        {/* Content Area with Services */}
        <main id="services-list" style={styles.contentMain}>
          {services.length === 0 ? (
            <div style={styles.noServiceMsg}>
              No service available yet
            </div>
          ) : (
            <div style={styles.servicesGrid}>
              {services.map((service) => (
                <div key={service.id} style={styles.serviceCard}>
                  {service.images.length > 0 && (
                    <img 
                      src={service.images[0]} 
                      alt={service.title} 
                      style={styles.serviceImage} 
                    />
                  )}
                  <div style={styles.serviceContent}>
                    <h3 style={styles.serviceTitle}>{service.title}</h3>
                    <p style={styles.serviceCategory}>{service.category}</p>
                    <p style={styles.serviceDuration}>{service.duration}</p>
                    <p style={styles.servicePrice}>${service.price}</p>
                    <p style={styles.serviceDescription}>{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <style>{`
        .dual-slider::-webkit-slider-thumb {
          appearance: none;
          pointer-events: auto;
          width: 24px;
          height: 24px;
          background: white;
          border: 3px solid #4A7291;
          border-radius: 50%;
          cursor: pointer;
          position: relative;
          z-index: 10;
        }
      `}</style>
    </div>
  );
};

export default HomeServicesPage;