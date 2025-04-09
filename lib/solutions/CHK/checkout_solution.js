'use strict';

class CheckoutSolution {
    // skus is expected to be a string
    checkout(skus) {
        if (skus === '') { return 0;}
        if (!skus || typeof skus !== 'string' || !skus.match(/^[A-Z]*$/)) {
            return -1;
        }

        const prices = {
            A: 50, B: 30, C: 20, D:15, E: 40,
        }
        const offers = {
            A: [{quantity: 5, price: 200},{quantity: 3, price: 130}], 
            B: [{quantity: 2, price: 45}],
            E: [{quantity: 2, freeItem: 'B', freeQuantity: 1}],
        }

        const itemCount = skus.split('').reduce((acc, item)=>{
            if (!prices[item]) {
                return -1;
            }
            acc[item] = (acc[item] || 0) + 1;
            return acc;
        }, {});

        if (itemCount === -1) {
            return -1;
        }

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
