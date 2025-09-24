import React, {useEffect, useState} from 'react';
import style from './EditProfile.module.css';
import {useLocation} from 'react-router-dom';
import LoadingWheel from '../../components/LoadingWheel/LoadingWheel';
import {useAlert} from '../../contexts/AlertProvider';
import {useNavigate} from 'react-router-dom';
import type {PartnerDetails} from '../../types/PartnerDetails';

/**
 * EditProfilePage component for editing user profile
 */
const EditProfilePage = () => {

    const [profileData, setProfileData] = useState<PartnerDetails>({
    companyName: '',
    email: '',
    address: '',
    country: '',
    city: '',
    zipCode: ''
    });    
    const [logoErr, setLogoErr] = useState<string>('');
    const [addressErr, setAddressErr] = useState<string>('');
    const [countryErr, setCountryErr] = useState<string>('');
    const [cityErr, setCityErr] = useState<string>('');
    const [zipCodeErr, setZipCodeErr] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(false);
    const location = useLocation();
    const {showAlert} = useAlert();
    const navigate = useNavigate();

    useEffect(() => {
        setProfileData(location.state?.partnerDetails as PartnerDetails || null);
    }, []);

    const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0] as File | Blob;
            setProfileData(prev => ({...prev, logo: file}));
        }
    }

    const validateInput = () => {
        if (!profileData?.logo) 
            setLogoErr('Logo is required');
        else 
            setLogoErr('');

        if (!profileData?.address) 
            setAddressErr('Address is required');
        else
            setAddressErr('');
        
        if (!profileData?.country) 
            setCountryErr('Country is required');
        else 
            setCountryErr('');
        
        if (!profileData?.city) 
            setCityErr('City is required');
        else 
            setCityErr('');
        
        if (!profileData?.zipCode) 
            setZipCodeErr('Zip Code is required');
        else 
            setZipCodeErr('');
        
        return profileData?.logo && profileData?.address && profileData?.country && profileData?.city && profileData?.zipCode;
    }


    const handleSubmit = async (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!validateInput()) {
            // Handle invalid input
            return;
        }

        const token = localStorage.getItem("token");
            if (!token) {
            console.error("Authentication token not found.");
            alert("Please log in before saving your profile.");
            return;
        }
        
        setLoading(true);
        // Proceed with form submission
        const formData = new FormData();
        console.log("logo:",profileData?.logo);
        formData.append("logo", profileData?.logo as File);
        formData.append("address", profileData?.address);
        formData.append("country", profileData?.country);
        formData.append("city", profileData?.city);
        formData.append("zipCode", profileData?.zipCode);

        try {
            await fetch(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_UPDATE_PROFILE, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            }).then((response) => {
                if (response.ok) {
                    showAlert('Profile saved successfully!', '#6ebb6eff', () => navigate('/profile', { replace: true }));
                }
                else{
                    showAlert(`Error saving profile: ${response.status}`, '#c44444ff');   
                }
                return response;
            }).then((data) => {
                console.log("Response Data:", data.json());    
            }).catch((error) => {
                console.error("Error saving profile:", error);
                showAlert(`Login failed: ${error}`, '#c44444ff');
            }).finally(() => {
                setLoading(false);

            });
        } catch (error) {
            console.error("Error during profile update:", error);
            showAlert(`Error during profile update: ${error}`, '#c44444ff');
            setLoading(false);
        }
    }

    return (<>
        <div className={style.profileContainer}>
            {loading == true ? <LoadingWheel isLoading={loading} /> : null}
            <div className={style.formContainer}>
                <h2>Edit Profile</h2>
                <form>
                    <div className={style.imageInput}>
                        {profileData?.logo && typeof profileData.logo === 'object' ? (
                            <img src={URL.createObjectURL(profileData.logo)} alt="Profile" />
                        ) : (
                            !profileData?.logo ?
                                <img src="/image-default.png" alt="Default Image" />
                            :
                                <img src={profileData?.logo as string} alt='profile' />
                        )}                        
                        <label htmlFor="profile-image">
                            <i className="bi bi-pencil"></i>
                        </label>
                        <input 
                            type="file" 
                            id="profile-image" 
                            name="profile-image" 
                            accept="image/*" 
                            onChange={handleImageChange} 
                        />
                    </div>
                    <span style={{ textAlign: 'center', width: '100%', display: 'block', color: 'red' }}>{logoErr}</span>

                    <div className={style.inputGroup}>
                        <label htmlFor={profileData?.address}>Address</label>
                        <input 
                            type="text" 
                            id={profileData?.address} 
                            value={profileData?.address} 
                            onChange={e => setProfileData(prev => ({...prev, address: e.target.value}))}
                        />
                        <span>{addressErr}</span>
                    </div>

                    <div className={style.inputGroup}>
                        <label htmlFor={profileData?.country}>Country</label>
                        <input 
                            type="text" 
                            id={profileData?.country} 
                            value={profileData?.country} 
                            onChange={e => setProfileData(prev => ({...prev, country: e.target.value}))} 
                        />
                        <span>{countryErr}</span>
                    </div>
                    
                    <div className={style.inputGroup}>
                        <label htmlFor={profileData?.city}>City</label>
                        <input 
                            type="text" 
                            id={profileData?.city} 
                            value={profileData?.city} 
                            onChange={e => setProfileData(prev => ({...prev, city: e.target.value}))} 
                        />
                        <span>{cityErr}</span>
                    </div>

                    <div className={style.inputGroup}>
                        <label htmlFor={profileData?.zipCode}>Zip Code</label>
                        <input 
                            type="text" 
                            id={profileData?.zipCode} 
                            value={profileData?.zipCode} 
                            onChange={e => setProfileData(prev => ({...prev, zipCode: e.target.value}))} 
                        />
                        <span>{zipCodeErr}</span>
                    </div>

                    <button onClick={handleSubmit}>Save</button>
                </form>
            </div>
        </div>
    </>);
};

export default EditProfilePage;