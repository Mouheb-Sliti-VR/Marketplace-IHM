import React from "react";
import style from "./CatalogItem.module.css";

export const ItemQuality = {
  MEDIUM: "medium",
  HIGH: "high",
  ULTRA: "ultra"
} as const;

export type ItemQualityType = typeof ItemQuality[keyof typeof ItemQuality];

const HomeCatalogItem: React.FC<{
    name: string;
    description: string;
    icon: string;
    content: {feature: string, highlighted:boolean}[];
    quality: ItemQualityType;
}> = ({name, description, icon, content, quality}) => {
    return (
        <div className={`${style.homePackageOffer} ${style[quality]}`}>
            <i className={icon}></i>
            <h2>{name}</h2>
            <p>{description}</p>
            <ul className="d-flex flex-column w-100 list-unstyled p-0 m-0">
                {content.map((item, index) => (
                    <li key={index} className={`${style.contentItem} ${item.highlighted ? style.glowingText : ""}`}>
                        <i className="fas fa-check"></i> {item.feature}
                    </li>
                ))}
            </ul>
        </div>

    );
}

export default HomeCatalogItem;