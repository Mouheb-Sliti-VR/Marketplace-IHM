/**
 * Interface representing the details of a partner.
 * @param {string} companyName - The name of the partner's company.
 * @param {string} email - The email address of the partner.
 * @param {string} address - The physical address of the partner.
 * @param {string} country - The country of the partner.
 * @param {string} city - The city of the partner.
 * @param {string} zipCode - The ZIP code of the partner.
 * @param {string} logo - The logo of the partner.
 * @param {string} image1 - The first image of the partner.
 * @param {string} image2 - The second image of the partner.
 * @param {string} video - The promotional video of the partner.
 * @param {number} balance - The current balance of the partner.
 */
export interface PartnerDetails{
    companyName: string;
    email: string;
    address: string;
    country: string;
    city: string;
    zipCode: string;
    logo?: string | File | Blob;
    image1?: string;
    image2?: string;
    video?: string;
    balance?: number;
}

/**
 * Interface representing the subscriptions of a partner.
 * @param {string} id - The unique identifier of the subscription.
 * @param {string} status - The current status of the subscription.
 * @param {string} startDate - The start date of the subscription.
 * @param {object} billing - The billing details of the subscription.
 * @param {number} billing.amount - The amount billed for the subscription.
 * @param {string} billing.currency - The currency of the billing amount.
 * @param {object} offering - The offering details of the subscription.
 * @param {string} offering.id - The unique identifier of the offering.
 * @param {string} offerIcon - The icon representing the offering.
 */
export interface PartnerSubscriptions {
    id?: string;
    status?:string;
    startDate? : string;
    billing? : {
        amount? : number;
        currency? : string;
    }
    offering : {
        id? : string;
    }
    offerIcon? : string;
}
