'use strict';

class CheckoutSolution {
    // skus is expected to be a string
    checkout(skus) {
        if (skus === '') { return 0;}
        if (!skus || typeof skus !== 'string' || !skus.match(/^[A-Z]*$/)) {
            return -1;
        }

        

        const prices = {
            A: 50, B: 30, C: 20, D:15, E: 40, F: 10, G:20, H:10, I:35, J:60, K:70, L:90, M:15, N:40, O:10, P:50, Q:30, R: 50, S:20, T: 20, U: 40, V: 50, W: 20, X:17, Y:20, Z:21
        }
        const offers = {
            A: [{quantity: 5, price: 200},{quantity: 3, price: 130}], 
            B: [{quantity: 2, price: 45}],
            E: [{quantity: 2, freeItem: 'B', freeQuantity: 1}],
            F: [{quantity: 3, price: 20}],
            H: [{quantity: 10, price: 80}, {quantity: 5, price:45}],  
            K:[{quantity:2, price: 120}],
            N:[{quantity:3, freeItem: 'M', freeQuantity: 1}],
            P: [{quantity:5, price: 200}],
            Q: [{quantity:3, price: 80}],
            R: [{quantity:3, freeItem: 'Q', freeQuantity: 1}],
            U: [{quantity:4,price: 120}],
            V: [{quantity:3, price: 130}, {quantity: 2, price: 90}],
                  
        }

        const groupItems = ['S','T', 'X', 'Y', 'Z']
        const groupOffer = { quantity:3, price: 45}

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

        let groupTotal = 0;
        let groupItemCount = 0;
        groupItems.forEach(item => {
            groupItemCount += itemCount[item] || 0;
        })

        const groupOfferCount = Math.floor(groupItemCount/groupOffer.quantity);
        groupTotal = groupOfferCount * groupOffer.price;

        let remainingGroupItems = groupOfferCount * groupOffer.quantity;
        if (remainingGroupItems > 0){
            const sortedGroupItems = groupItems.sort((i,j) => prices[j] - prices[i]);
            sortedGroupItems.forEach(item => {
                if (remainingGroupItems > 0 && itemCount[item]){
                    const toRemove = Math.min(remainingGroupItems, itemCount[item] || 0);
                    remainingGroupItems -= toRemove;
                    itemCount[item] -= toRemove;
                }
            })
        }

        const regularTotal =  Object.entries(itemCount).reduce((total, [item, count]) => {

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

        return groupTotal + regularTotal;
    }
}

module.exports = CheckoutSolution;
