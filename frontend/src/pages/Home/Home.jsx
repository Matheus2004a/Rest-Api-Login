import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import Header from "../../components/Header/Header"
import { Spinner } from "../../components/Spinner/Spinner"
import Products from "../../components/Products/Products";

import { api } from "../api"

import "./style.scss"

function Home() {
    const [products, setProducts] = useState([{}])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const url = `${api.defaults.baseURL}/products`
        getProducts(url)
    }, [])

    async function getProducts(url) {
        try {
            setIsLoading(true)
            const response = await axios.get(url)
            const { products } = response.data
            setProducts(products)
        } catch (error) {
            toast.error(error.message)
            setIsLoading(false)
        }
        setIsLoading(false)
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                theme="colored"
            />

            <Header />

            <main className="home">
                <article>
                    <section className="section-products">
                        {isLoading && <Spinner />}

                        {!isLoading && products.map((product, index) => (
                            <Products 
                                key={index}
                                image={product.image}
                                name={product.name}
                                price={product.price}
                            />
                        ))}
                    </section>
                </article>
            </main>
        </>
    )
}

export default Home