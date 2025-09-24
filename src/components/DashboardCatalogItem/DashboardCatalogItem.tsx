import React from "react";
import style from "./DashboardCatalogItem.module.css";

/**
 * DashboardCatalogItem component displays a product item in the dashboard catalog.
 * @param name - The name of the product.
 * @param description - A brief description of the product.
 * @param icon - The icon class for the product.
 * @param subtitle - A subtitle for the product.
 * @returns - A React component representing a catalog item.
 */
const DashboardCatalogItem: React.FC<{
    name: string;
    description: string;
    icon: string;
    subtitle: string;
}> = ({ name, description, icon, subtitle }) => {
    return (
        <div className={`${style.dashboardCatalogItem}`}>
            <div className={style.iconContainer}>
                <i className={icon}></i>
            </div>
            <h2>{name}</h2>
            <h3>{subtitle}</h3>
            <p>{description}</p>
        </div>
    );
}

export default DashboardCatalogItem;