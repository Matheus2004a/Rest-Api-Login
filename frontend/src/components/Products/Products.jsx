import Button from "../Button/Button"

function Products({ key, image, name, price }) {
    return (
        <div className="card-product" key={key}>
            <figure>
                <img src={image} alt={name} />
                <figcaption>
                    <p>{name}</p>
                    <span>{price}</span>
                    <Button>Adicionar ao carrinho</Button>
                </figcaption>
            </figure>
        </div>
    )
}

export default Products