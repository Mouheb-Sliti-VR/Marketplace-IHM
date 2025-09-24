import HomeCatalogItem, { ItemQuality } from '../../components/CatalogItem/CatalogItem';

const HomeOffers: React.FC = () => {
  const offers = [
    {
      name : "Advertise with Images",
      description : "Showcase your brand with up to 4 high-quality images, perfect for highlighting your products, promotional banners, or creating immersive visual stories.",
      icon : "fas fa-image",
      quality: ItemQuality.MEDIUM,
      content : [
        {feature: "Up to 4 images", highlighted: true},
        {feature: "Onboarding", highlighted: false},
        {feature: "Monthly Reporting", highlighted: false},
        {feature: "Customer Service", highlighted: false}  
      ],
    },
    {
      name : "Advertise with Videos",
      description : "Engage users with up to 2 videos, ideal for dynamic storytelling, product demonstrations, or promotional content that captivates and informs.",
      icon : "fas fa-video",
      quality: ItemQuality.MEDIUM,
      content : [
        {feature: "Up to 2 videos", highlighted: true},
        {feature: "Onboarding", highlighted: false},
        {feature: "Monthly Reporting", highlighted: false},
        {feature: "Customer Service", highlighted: false}
      ],
    },
    {
      name : "Mixed Advertising",
      description : "Maximize your reach with a blend of up to 4 images and 2 videos, offering flexibility for diverse engagement styles and a comprehensive advertising experience.",
      icon : "fas fa-images",
      quality: ItemQuality.HIGH,
      content : [
        {feature: "Up to 4 Images", highlighted: true},
        {feature: "Up to 2 Videos", highlighted: true},
        {feature: "Onboarding", highlighted: false},
        {feature: "Monthly Reporting", highlighted: false},
        {feature: "Customer Service", highlighted: false}  
      ],
    },
    {
      name : "Showcase in 3D",
      description : "Get the complete package to upload and showcase 3D models in the metaverse, enabling an immersive and interactive experience for your audience.",
      icon : "fas fa-cube fa-3x",
      quality: ItemQuality.ULTRA,
      content : [
        {feature: "3D Model", highlighted: true},
        {feature: "Up to 4 Images", highlighted: true},
        {feature: "Up to 2 Videos", highlighted: true},
        {feature: "Onboarding", highlighted: false},
        {feature: "Monthly Reporting", highlighted: false},
        {feature: "Customer Service", highlighted: false}  
      ],
    }
  ]

  return (
    <div id='offers' className='bg-black text-white py-5'>
      <h2 className="text-center mb-4 p-5 fw-bold">Our Offers</h2>
      <div className={`d-flex align-items-center justify-content-center mx-auto px-3 mb-5 gap-4`} style={{ width: '95%',}}>
        {offers.map((offer, index) => (
          <HomeCatalogItem
            key={index}
            name={offer.name}
            description={offer.description}
            icon={offer.icon}
            content={offer.content}
            quality={offer.quality}
          />
        ))}
      </div>
    </div>
  );
}

export default HomeOffers;