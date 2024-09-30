import useContext from '../context'
import Container from "../library/Container"
import ResultsProduct from './ResultsProduct'  // Asegúrate de importar el componente para mostrar resultados

export default function LastSearch() {
    const { lastSearch } = useContext()  // Obtener la lista de productos

    console.log(lastSearch)
    const handleProductAdded = () => {
        alert('Product added to cart successfully!') // Puedes cambiar esto según tus necesidades
    }

    return (
        <Container>
            {Array.isArray(lastSearch) && lastSearch.length > 0 ? (
                <section className='flex flex-col gap-4'>
                    {lastSearch.map(product => (
                        <ResultsProduct key={product.id}
                            product={product}
                            onProductAdded={handleProductAdded}
                        />
                    ))}
                </section>
            ) : (
                <p>No hay búsquedas recientes.</p>
            )}
        </Container>
    )
}