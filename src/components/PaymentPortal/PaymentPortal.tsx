import React from "react";
import style from "./PaymentPortal.module.css";
import LoadingWheel from "../LoadingWheel/LoadingWheel";
import { useAlert } from "../../contexts/AlertProvider";
import axios from "axios";

/**
 * PaymentPortal component for handling payment information.
 * @param total - Total amount to be paid.
 * @param offerId - ID of the offer being subscribed to.
 * @param setPaymentRef - Function to set the payment reference.
 * @param setDisplayPaymentModal - Function to control the display of the payment modal.
 * @param images - Array of image URLs to be uploaded.
 * @param videos - Array of video URLs to be uploaded.
 * @returns JSX.Element
 */
const PaymentPortal: React.FC<{ 
    total: number; 
    quoteId: string;
    images? : File[];
    videos? : File[];
    models? : File[];
    setDisplayPaymentModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ total, quoteId, setDisplayPaymentModal, images, videos, models }) => {
    const [cardNumber, setCardNumber] = React.useState<string>("");
    const [cardNumberErr, setCardNumberErr] = React.useState<string>(" ");
    const [expiryDate, setExpiryDate] = React.useState<string>("");
    const [expiryDateErr, setExpiryDateErr] = React.useState<string>(" ");
    const [cvv, setCvv] = React.useState<string>("");
    const [cvvErr, setCvvErr] = React.useState<string>(" ");
    const [loading, setLoading] = React.useState<boolean>(false);
    const [paymentError, setPaymentError] = React.useState<string>(" ");
    const { showAlert } = useAlert();

    const validateCardNumber = (number: string) => {
        const regex = /^\d{16}$/; // Simple regex for 16-digit card number
        return regex.test(number);
    };

    const validateExpiryDate = (date: string) => {
        const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/; // MM/YY format
        return regex.test(date);
    };

    const validateCvv = (cvv: string) => {
        const regex = /^[0-9]{3}$/; // Simple regex for 3-digit CVV
        return regex.test(cvv);
    };

    const checkForm = () => {
        let isValid = true;
        if (!validateCardNumber(cardNumber)) {
            setCardNumberErr("Invalid card number");
            isValid = false;
        }
        else {
            setCardNumberErr(" ");
        }

        if (!validateExpiryDate(expiryDate)) {
            setExpiryDateErr("Invalid expiry date");
            isValid = false;
        }
        else {
            setExpiryDateErr(" ");
        }

        if (!validateCvv(cvv)) {
            setCvvErr("Invalid CVV");
            isValid = false;
        }
        else {
            setCvvErr(" ");
        }

        return isValid;
    };

    /* const loadContent = async (formData: FormData) => {

        // Add images if they exist
        if (images?.length) {
            images.map((image, index) => {
                formData.append(`image${index+1}`, image);
            });
        }
        
        // Add videos if they exist
        if (videos?.length) {
            videos.map((video, index) => {
                formData.append(`video${index+1}`, video);
            });
        }

        // Add models if they exist
        if (models?.length) {
            models.map((model) => {
                formData.append(`model`, model);
            });
        }
    } */

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (checkForm()){
            setLoading(true);

            const formData = new FormData();
            const token = localStorage.getItem("token");
            let media:File[] = [];
            
            if (images)
                media = [...media, ...images];
            if (videos)
                media = [...media, ...videos];
            if (models)
                media = [...media, ...models];

            media.map((file) => {
                formData.append(`media`, file);
            }
            );
            
            await axios.post(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_UPLOAD_MEDIA}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(async (response) => {
                if(response.status === 200){
                    console.log("Media upload response:", response.data);
                    await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_SUBSCRIBE}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({ quoteId: quoteId }),
                    }).then(res => {
                        if (res.status !== 200) {
                            setPaymentError("Failed to subscribe");
                            throw new Error("Failed to subscribe");
                        }
                    }).then(data => {
                        console.log("Subscription successful:", data);
                        showAlert('Subscribed successfully', '#6ebb6eff');
                        setDisplayPaymentModal(false);
                    }).catch(error => {
                        console.error("Error:", error);
                        setPaymentError("Failed to subscribe");
                    });
                }
                else {
                    throw new Error("Failed to upload media");
                }
            }).catch(error => {
                console.error("Error:", error);
                setPaymentError("Failed to upload media");
            });

            setLoading(false);

            
        }
    }

    return (
        <div className={style.modalOverlay}>
            <div className={style.modalContent}>
                <div className={style.modalHeader}>
                    <h4>Add Payment Details</h4>
                    <button
                        onClick={() => setDisplayPaymentModal(false)}
                    >X</button>
                </div>
                <div className={style.icons}>
                    <i className="fab fa-cc-visa"></i>
                    <i className="fab fa-cc-mastercard"></i>
                    <i className="fab fa-cc-paypal"></i>
                </div>
                <form>
                    <div className={style.formGroup}>
                        <label htmlFor="cardNumber">Card Number</label>
                        <input
                            type="text"
                            id="cardNumber"
                            placeholder="Card Number"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                        />
                        {cardNumberErr && <span className={style.error}>{cardNumberErr}</span>}
                    </div>
                    <div className={style.formRow}>
                        <div className={style.formGroup}>
                            <label htmlFor="expiryDate">Expiry Date</label>
                            <input
                                type="text"
                                id="expiryDate"
                                placeholder="MM/YY"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                            />
                            {expiryDateErr && <span className={style.error}>{expiryDateErr}</span>}
                        </div>
                        <div className={style.formGroup}>
                            <label htmlFor="cvv">CVV</label>
                            <input
                                type="text"
                                id="cvv"
                                placeholder="CVV"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                            />
                            {cvvErr && <span className={style.error}>{cvvErr}</span>}
                        </div>
                    </div>
                    <div className={style.totalSection}>
                        <h4>Total: <span>€{total.toFixed(2)}</span></h4>
                        <button 
                            type="button"
                            onClick={handleSubmit}
                        >Confirm Payment</button>
                        <span className={style.error}>{paymentError}</span>
                    </div>
                </form>
            </div>
            <LoadingWheel isLoading={loading} />
        </div>
    );
}

export default PaymentPortal;
