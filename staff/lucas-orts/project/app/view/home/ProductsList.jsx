import logic from '../../logic'

import { useState, useEffect } from 'react'

import UserProduct from './UserProduct'

export default function ProductsList({ refreshStamp }) {

    const [products, setProducts] = useState([])

    useEffect(() => {
        loadProducts()
    }, [refreshStamp])

    const handleProductDeleted = () => {
        loadProducts()
    }

    const handleProductEnableToggled = () => {
        loadProducts()
    }

    const handleProductImageEdited = () => {
        loadProducts()  // Recargar los productos después de editar la imagen
    }

    const handleProductPriceEdited = () => {
        loadProducts()  // Recargar los productos después de editar el precio
    }

    const handleProductLocationEdited = () => {
        loadProducts()
    }

    const loadProducts = () => {
        try {
            logic.getAllUserProducts()
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
        {products.map(product => <UserProduct
            key={product.id}
            product={product}
            onProductDeleted={handleProductDeleted}
            onProductEnableToggled={handleProductEnableToggled}
            onProductImageEdited={handleProductImageEdited}
            onProductPriceEdited={handleProductPriceEdited}
            onProductLocationEdited={handleProductLocationEdited}
        />)}
    </section>
}