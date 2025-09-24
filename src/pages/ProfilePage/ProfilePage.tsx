import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './ProfilePage.module.css';
import LoadingWheel from '../../components/LoadingWheel/LoadingWheel';
import Subscription from '../../components/Subscription/Subscription';
import type {PartnerDetails, PartnerSubscriptions} from '../../types/PartnerDetails';
import type { BundledProductSpec } from '../../types/ProductSpec';


const ProfilePage: React.FC = () => {
  const [partnerDetails, setPartnerDetails] = useState<PartnerDetails | null>(null);
  const [subscriptions, setSubscriptions] = useState<PartnerSubscriptions[]>([]);
  const [catalog, setCatalog] = useState<BundledProductSpec[]>([]);
  const navigate = useNavigate();
  const [fetching, setFetching] = useState(true);

  const token = localStorage.getItem('token');

  const fetchCatalog = async () => {
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
        setCatalog([...data] as BundledProductSpec[]);
        console.log("Catalog fetched successfully:", [...data]);
      }
    };

  const fetchPartnerDetails = async () => {
    // Get partner details
    setFetching(true);
    await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_PARTNER_DETAILS}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        "Cache-Control": "no-cache",
      }
    })
    .then(response => {
      setFetching(false);
      if (response.status === 401) {
        console.error("Token expired or invalid. Redirecting to login.");
        localStorage.removeItem("token");
        navigate('/login', {replace: true});
        return;
      }
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      setPartnerDetails({
        companyName: data.user.companyName,
        email: data.user.email,
        address: data.user.address,
        country: data.user.country,
        city: data.user.city,
        zipCode: data.user.zipCode,
        logo: data.user.logo,
        image1: data.user.image1,
        image2: data.user.image2,
        video: data.user.video,
        balance: data.user.balance,
      });
      localStorage.setItem('partnerDetails', JSON.stringify(data.user));
      console.log("Partner Details:", data.user);
    })
    .catch(error => {
      console.error('Error fetching partner details:', error);
    });
  }

  const fetchSubscriptions = async () => {
    // Get partner subscriptions
    
    await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_GET_SUBSCRIPTIONS}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(response => {
      if (!response.ok) {
          return response.json().then(err => {
              throw new Error(`HTTP error! Status: ${response.status}, Message: ${err.message}`);
          });
      }
      return response.json()
    })
    .then(data => {
      console.log("Full API Response:", data);

      if (!Array.isArray(data.data.subscriptions) || data.data.subscriptions.length === 0) {
          console.log("No offers found for the user.");
          return;
      }

      const updatedSubscriptions = data.data.subscriptions.map((subscription: PartnerSubscriptions) => {
        let offerIcon = ""; // Default icon
        switch (subscription.offering.id) {
          case "IMG_ADS_OFFER_001":
            offerIcon = "bi bi-images";
            break;
          case "VIDEO_ADS_OFFER_001":
            offerIcon = "bi bi-play-circle";
            break;
          case "MIXED_ADS_OFFER_001":
            offerIcon = "bi bi-back";
            break;
          case "3D_MODEL_ADS_OFFER_001":
            offerIcon = "bi bi-cube";
            break;
        }
        return { ...subscription, offerIcon };
      });

      setSubscriptions(updatedSubscriptions);
      localStorage.setItem('subscriptions', JSON.stringify(updatedSubscriptions));
    })
    .catch(error => {
      console.error('Error fetching partner subscriptions:', error);
    });
  }

  useEffect(() => {

    fetchCatalog();
    fetchSubscriptions();
    fetchPartnerDetails();

  }, []);

  return (
    <div className={style.profileContainer}>
      {fetching == true ? 
        <LoadingWheel isLoading={fetching} />
      :<>
      <div className={style.profileContainer}>
        <div className={style.partnerLogo}>
          <div className={style.logoContainer}>
            {partnerDetails?.logo ? (
              <img src={partnerDetails?.logo as string} alt='Profile' />
            ) : (
              <img src="/image-default.png" alt="Default Image" />
            )}
            </div>
          <button
            onClick={() => {
              navigate('/edit-profile', { state: { partnerDetails } });
            }}
          >
            <i className="bi bi-pencil"></i>
            Edit Profile
          </button>
        </div>
        <div className={style.verticalLine}></div>
        <div className={style.detailsSection}>
          <div className={style.profileDetails}> 
            <h2>Profile Details</h2> 
            <div>
              <p>Email </p> <span>{partnerDetails?.email}</span>
            </div>
            <div>
              <p>Address </p> <span>{partnerDetails?.address}</span>
            </div>
            <div>
              <p>Country </p> <span>{partnerDetails?.country}</span>
            </div>
            <div>
              <p>City </p> <span>{partnerDetails?.city}</span>
            </div>
            <div>
              <p>Zip Code </p> <span>{partnerDetails?.zipCode}</span>
            </div>
          </div>
          <div className={style.subscription}>
            <h2>Subscriptions</h2>
            <div className={style.subscriptionItem}>
              {subscriptions.map(subscription => (
                <Subscription 
                  key={subscription?.id} 
                  subscription={subscription} 
                  offer={
                    catalog.find(item => item.id == subscription.offering.id)
                  } />
              ))}
            </div>
          </div>
        </div>
      </div>  
      </>
    }
  </div>
  );
};

export default ProfilePage;