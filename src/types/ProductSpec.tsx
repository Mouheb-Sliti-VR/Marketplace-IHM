/**
 * BundledProductSpec interface defines the structure of a product specification.
 * It includes the product name, subtitle, description, and product-specific details.
 * @param id - Unique identifier for the product.
 * @param name - The name of the product.
 * @param subtitle - The subtitle of the product.
 * @param description - A brief description of the product.
 * @param ProductSpec - The product-specific details.
 * @param addOnFor - An array of the extended product specifications.
 */
export interface BundledProductSpec {
    id : string;
    name: string;
    subtitle: string;
    description: string;
    ProductSpec: {
        maxModels?: number;
        Images?: number;
        Videos?: number;
    };
    addOnFor?: string[];
}