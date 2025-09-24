import React  from 'react';
import style from './Subscription.module.css';
import type {PartnerSubscriptions} from '../../types/PartnerDetails';
import type { BundledProductSpec } from '../../types/ProductSpec';

const Subscription: React.FC<{
    subscription: PartnerSubscriptions;
    offer:BundledProductSpec | undefined;
}> = ({ subscription, offer }) => {
    console.log("offer name :" + offer?.name)
    return (
        <div className={style.subscriptionItem}>
            <i className={subscription.offerIcon}></i>
            <h4>{offer?.name}</h4>
            <p>{offer?.description}</p>
            <span>Start date: {subscription.startDate?.slice(0,10)}</span>
        </div>
    );
};

export default Subscription;
