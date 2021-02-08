export function countProductsCost(productsReq, products) {
    return productsReq.reduce((number, product) => {
        const amount = 'amount' in product ? product['amount'] : 1;
        products.forEach(prod => {
            if (prod.id === product.id) number =+ (amount * prod.price) + number
        });
        return number;
    }, 0);
}