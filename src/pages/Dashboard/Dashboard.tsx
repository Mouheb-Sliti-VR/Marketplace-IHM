import React, {useState, useEffect} from 'react';
import style from "./Dashboard.module.css";
import DashboardCatalogItem from "../../components/DashboardCatalogItem/DashboardCatalogItem";
import type { BundledProductSpec } from '../../types/ProductSpec';
import SubscribeForm from "../../components/SubscribeForm/SubscribeForm";
import LoadingWheel from '../../components/LoadingWheel/LoadingWheel';

const Dashboard: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<BundledProductSpec | null>(null);
  const [catalogItems, setCatalogItems] = useState<BundledProductSpec[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCatalog();
  }, []);


  const fetchCatalog = async () => {
    setLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_ODACAT_MOCK}${import.meta.env.VITE_GET_CATALOG}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      console.error("Failed to fetch catalog:", data);
      return;
    }
    else {
      setCatalogItems([...data] as BundledProductSpec[]);
      console.log("Catalog fetched successfully:", [...data]);
    }
    setLoading(false);
  };

  // Slider settings
  const itemsPerSlide = 3;
  const translateX = -currentSlide * (100 / itemsPerSlide) * itemsPerSlide;
  const totalSlides = Math.ceil(catalogItems.length / itemsPerSlide);


  const handlePrev = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1));
  };

  return (<>
    {loading ? 
      <LoadingWheel isLoading={loading} />
      : 
      <div className={`${style.catalogContainer}`}>
        <h2>Our Offers</h2>
        <div className={`${style.sliderContainer}`}>
          <div 
            className={`${style.sliderWrapper}`}
            style={{
              display: 'flex',
              width: `95%`,
              transform: `translateX(${translateX}%)`,
              transition: 'transform 0.5s ease-in-out',
            }}
          >
            {catalogItems.map((item, index) => {
              // Determine the icon based on the product specifications
              let icon = "bi bi-question-circle";
              if (item.ProductSpec.maxModels) {
                icon = "bi bi-box";
              } else if (item.ProductSpec.Images && item.ProductSpec.Videos) {
                icon = "bi bi-back";
              } else if (item.ProductSpec.Images) {
                icon = "bi bi-images";
              } else if (item.ProductSpec.Videos) {
                icon = "bi bi-play-circle";
              }  
              return (
                <div
                  key={index}
                  style={{
                    flex: `0 0 ${100 / itemsPerSlide}%`,
                    padding: '0 10px',
                    boxSizing: 'border-box',
                  }}
                >
                  <a
                    href="#subForm"
                    style={{ textDecoration: 'none' }}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedItem(item);
                    }}
                  >
                    <DashboardCatalogItem
                      name={item.name}
                      description={item.description}
                      icon={icon}
                      subtitle={item.subtitle}
                    />
                  </a>
                </div>
              );
            })}
          </div>
          <button
            onClick={handlePrev}
            disabled={currentSlide === 0}
            style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }}
          >
            &lt;
          </button>
          <button
            onClick={handleNext}
            disabled={currentSlide === totalSlides - 1}
            style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
          >
            &gt;
          </button>
        </div>

        {selectedItem ? 
          <SubscribeForm productItem={selectedItem} />
          : null
        }  
      </div>
    }    
    </>);
}

export default Dashboard;