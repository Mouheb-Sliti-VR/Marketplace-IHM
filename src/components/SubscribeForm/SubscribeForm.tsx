import React from "react";
import style from "./SubscribeFrom.module.css";
import type { BundledProductSpec } from "../../types/ProductSpec";
import PaymentPortal from "../PaymentPortal/PaymentPortal";
import LoadingWheel from "../LoadingWheel/LoadingWheel";
import { useAlert } from "../../contexts/AlertProvider";

/**
 *  SubscribeForm component allows users to subscribe to a product offer.
 * @param productItem - The product item to subscribe to (mocked productSpec).
 * @returns - A React component for the subscription form.
 */
const SubscribeForm: React.FC<{ productItem: BundledProductSpec }> = ({ productItem}) => {

    const [images, setImages] = React.useState<File[]>([]);
    const [uploadImageError, setUploadImageError] = React.useState<string>("");
    const [videos, setVideos] = React.useState<File[]>([]);
    const [uploadVideoError, setUploadVideoError] = React.useState<string>("");
    const [models, setModels] = React.useState<File[]>([]);
    const [uploadModelError, setUploadModelError] = React.useState<string>("");
    const [selectedUniverse, setSelectedUniverse] = React.useState<{ UniverseName: string; Thumbnail: string } | null>(null);
    const [total, setTotal] = React.useState<number>(200);
    const [paymentRef, setPaymentRef] = React.useState<string>("");
    const [displayPaymentModal, setDisplayPaymentModal] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [quoteId, setQuoteId] = React.useState<string>("");
    const {showAlert} = useAlert();


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && (e.target.files.length + images.length) <= 4 ) {
            const filesArray = Array.from(e.target.files);
            setImages(prev => [...prev, ...filesArray]); 
            setUploadImageError("");
            setTotal(prev => prev + (filesArray.length * 100)); // Assuming each image costs 100€
        }
        else {
            setUploadImageError("You can upload a maximum of 4 images.");
        }
    };

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && (e.target.files.length + videos.length) <= 2) {
            const filesArray = Array.from(e.target.files);
            setVideos(prev => [...prev, ...filesArray]);
            setUploadVideoError("");
            setTotal(prev => prev + (filesArray.length * 200)); // Assuming each video costs 200€
        } else {
            setUploadVideoError("You can upload a maximum of 2 videos.");
        }
    };

    const handleModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && (e.target.files.length + models.length) <= 1) {
            const filesArray = Array.from(e.target.files);
            setModels(prev => [...prev, ...filesArray]);
            setUploadModelError("");
            setTotal(prev => prev + (filesArray.length * 300)); // Assuming each model costs 300€
        } else {
            setUploadModelError("You can upload a maximum of 1 model.");
        }
    }

    const handleRemoveImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setUploadVideoError("");
        setTotal(prev => prev - 100); // Assuming each image costs 100€
    };

    const handleRemoveVideo = (index: number) => {
        setVideos(prev => prev.filter((_, i) => i !== index));
        setUploadVideoError("");
        setTotal(prev => prev - 200); // Assuming each video costs 200€
    };

    const handleRemoveModel = (index: number) => {
        setModels(prev => prev.filter((_, i) => i !== index));
        setUploadModelError("");
        setTotal(prev => prev - 300); // Assuming each model costs 300€
    };

    const handleSubscribe = async () => {
        if(images.length == 0 && productItem.ProductSpec.Images) 
            setUploadImageError("You must upload at least one image.");

        else if(videos.length == 0 && productItem.ProductSpec.Videos)
            setUploadVideoError("You must upload at least one video.");

        else if(models.length == 0 && productItem.ProductSpec.maxModels)
            setUploadModelError("You must upload at least one model.");

        else{
            let body = { 
                selections:[
                    {
                        offeringId: productItem.id,
                        ...(images.length > 0 && { selectedImagesCount: images.length }),
                        ...(videos.length > 0 && { selectedVideosCount: videos.length }),
                        ...(models.length > 0 && { selectedModelsCount: models.length }),
                    }
                ] 
            };
            setIsLoading(true);

            await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_VALIDATE_OFFER}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(body),
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Server error during offer validation');
                }
                return response.json();
            }).then(data => {
                console.log("Order Validated :", data);
                setQuoteId(data.data.quoteId);
                console.log("Quote ID :", data.data.quoteId);
                setDisplayPaymentModal(true);
            }).catch(error => {
                console.error('Error validating offer:', error);
                console.error(JSON.stringify(body));
                showAlert("Error validating offer. Please try again.", "#c44444ff");
            });

            setIsLoading(false);
        }
        
    }

    const universes = [
        {
            UniverseName : "Undead Assault",
            Thumbnail : "/MockedUniversesThumbnails/zombie-vr.jpg"
        },
        {
            UniverseName : "Wild Sweets",
            Thumbnail : "/MockedUniversesThumbnails/wild-sweets-gen-ai.png"
        },
        {
            UniverseName : "Groovy Blade (Comming Soon)",
            Thumbnail : "/MockedUniversesThumbnails/groovy-vr.png"
        }
    ];

    return (
    <>
        {isLoading ? (
            <LoadingWheel isLoading={isLoading} />
        ) : null}
        <div id="subForm" className={`${style.subscribeForm}`}>
            <form name="subForm">
                <h3>Subscribe To "{productItem.name}"</h3>
                {productItem.ProductSpec.Images ? (
                    // Display image upload section if images are part of the product spec
                    <div className={style.formGroup}>
                        <h4>Upload Images</h4>
                        <div className={style.mediaPreview}>
                            {images.map((image, index) => (
                                <div key={index}>
                                    <img
                                        src={image instanceof File ? URL.createObjectURL(image) : image}
                                        alt={`Uploaded ${index + 1}`}
                                        className="img-thumbnail"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className={style.removeImageButton}
                                        aria-label="Remove image"
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                        <label 
                            htmlFor="images"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('images')?.click();
                            }}
                        >Select Files</label>
                        <input 
                            type="file" 
                            id="images" 
                            name="images" 
                            accept="image/*" 
                            multiple 
                            onChange={handleImageChange} 
                        />
                        <span className={style.errorMsg}>{uploadImageError}</span>
                    </div>
                ) : null}

                {productItem.ProductSpec.Videos ? (
                    // Display video upload section if videos are part of the product spec
                    <div className={style.formGroup}>
                        <h4>Upload Videos</h4>
                        <div className={style.mediaPreview}>    
                            {videos.map((video, index) => (
                                <div key={index}>
                                <video
                                    src={video instanceof File ? URL.createObjectURL(video) : video}
                                    controls

                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveVideo(index)}
                                    className={style.removeImageButton}
                                    aria-label="Remove video"
                                >
                                    X
                                </button>
                                </div>
                            ))}
                        </div>
                        <label 
                            htmlFor="videos"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('videos')?.click();
                            }}
                        >Select Files</label>
                        <span className={style.errorMsg}>{uploadVideoError}</span>
                        <input 
                            type="file" 
                            id="videos" 
                            name="videos" 
                            accept="video/*"
                            onChange={handleVideoChange} 
                            multiple 
                        />
                    </div>
                ) : null}

                {productItem.ProductSpec.maxModels ? (
                    // Display model upload section if models are part of the product spec
                    <div className={style.formGroup}>
                        <h4>Upload 3D Models</h4>
                        <div className={style.mediaPreview}>
                            {models.map((model, index) => (
                                <div key={index} className={style.modelItem}>
                                    <img src="/model-icon.png" alt="" />
                                    <p>{model.name}</p>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveModel(index)}
                                        className={style.removeImageButton}
                                        aria-label="Remove 3D model"
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                        <label
                            htmlFor="models"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('models')?.click();
                            }}
                        >Select Files</label>
                        <span className={style.errorMsg}>{uploadModelError}</span>
                        <input
                            type="file"
                            id="models"
                            name="models"
                            accept=".glb,.gltf"
                            onChange={handleModelChange}
                            multiple
                        />
                    </div>
                ) : null}

                <div className={`${style.formGroup}`}>
                    <h4>Select Mini-game</h4>
                    <div className={style.universeOptions}>
                        {universes.map((universe, index) => (
                            <div 
                                key={index} 
                                className={`${style.universeItem} ${universes.findIndex(item => item.UniverseName == selectedUniverse?.UniverseName) === index ? style.selectedUniverse : ""}`}
                                onClick={() => {
                                    if (selectedUniverse?.UniverseName === universe.UniverseName) {
                                        setSelectedUniverse(null);
                                    } else {
                                        setSelectedUniverse(universe);
                                    }
                                }}
                            >
                                <img src={universe.Thumbnail} alt="" />
                                <p>{universe.UniverseName}</p>
                            </div>
                        ))}    
                    </div>   
                </div>

                <div className={style.totalSection}>
                    <h4>Total : <span>€{(total + (selectedUniverse ? 200 : 0)).toFixed(2)}</span></h4>
                    <button
                        type="button"
                        onClick={handleSubscribe}
                        value={"Subscribe"}
                    >Subscribe</button>
                </div>
            </form>
        </div>
        {displayPaymentModal ? (
            <PaymentPortal
                quoteId={quoteId}
                total={total + (selectedUniverse ? 200 : 0)}
                setPaymentRef={setPaymentRef}
                setDisplayPaymentModal={setDisplayPaymentModal}
                images={images}
                videos={videos}
                models={models}
            />
        ) : null}
    </>
    );
}

export default SubscribeForm;