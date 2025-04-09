'use strict';

class CheckoutSolution {
    // skus is expected to be a string
    checkout(skus) {
        if (!skus || typeof skus !== 'string' || !skus.match(/^[A-Z]*$/)) {
            return -1;
        }

        // set up the prices
        const prices = {
            A: 50, B: 30, C: 20, D:15
        }
        const offers = {
            A: {quantity: 3, price: 130}, B: {quantity:2, price:45},
        }

        const itemCount = skus.split('').reduce((acc, item)=>{
            acc[sku] = (acc[sku] || 0) + 1;
            return acc;
        }, {});

        return Object.entries(itemCount).reduce((total, [item, count]) => {
            const offer = offers[item];

            if (offer) {
                const offerCount = Math.floor(count/offer.quantity);
                total += offerCount * offer.price;
                total += (count % offer.quantity) * prices[item];
            } else {
                total += count * prices[item];
            }
            return total;
            
        }, 0);
    }
}

module.exports = CheckoutSolution;


