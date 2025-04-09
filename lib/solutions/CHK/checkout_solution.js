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
            A: {q: 3, p: 130}, B: {q:2, p:45},
        }
    }
}

module.exports = CheckoutSolution;

