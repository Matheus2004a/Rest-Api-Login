function formatPrice(price) {
    return Number(price).toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL"
    })
}

module.exports = formatPrice