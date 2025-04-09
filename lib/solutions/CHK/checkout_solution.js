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

        Object.entries(offers).forEach(([item, itemOffers]) => {
            itemOffers.forEach((offer)=>{
                if (offer.freeItem && itemCount[item]) {
                    const freeCount = Math.floor(itemCount[item] / offer.quantity) * offer.freeQuantity;
                    if (itemCount[offer.freeItem]) {
                        itemCount[offer.freeItem] = Math.max(0, itemCount[offer.freeItem] - freeCount);
                    }
                }
            })
        })

        return Object.entries(itemCount).reduce((total, [item, count]) => {

            if (!offers[item]) { 
                return total + (count * prices[item]);
            }
            let remaining = count;

            offers[item].forEach((offer)=>{
                if (!offer.freeItem){
                     const offerCount = Math.floor(remaining/offer.quantity);
                    total += offerCount * offer.price;
                    remaining = remaining % offer.quantity;
                }
            })

            total += remaining * prices[item];
            return total;

        }, 0);
    }
}

module.exports = CheckoutSolution;


