import logic from '../../logic'

import { useState, useEffect } from 'react'

import CartProduct from './CartProduct'

export default function Cart({ refreshStamp }) {

    const [products, setProducts] = useState([])

    useEffect(() => {
        loadProducts()
    }, [refreshStamp])

    const handleProductCartDeleted = () => {
        loadProducts()
    }
    const loadProducts = () => {
        try {
            logic.getAllCartProducts()
                .then(products => setProducts(products))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <section className='flex flex-col gap-4'>
        {products.map(product => <CartProduct
            key={product.id}
            product={product}
            onProductCartDeleted={handleProductCartDeleted}
        />)}
    </section>
}