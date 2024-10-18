import Button from '../library/Button'
import Container from '../library/Container'
import Heading from '../library/Heading'
import Image from '../library/Image'
import Paragraph from '../library/Paragraph'


export default function ProductInfo({ product, onCancel }) {

    return <>
        <Container className='fixed w-screen gap-0 p-0 top-0 bottom-0 h-screen left-0 right-0 items-center bg-black opacity-50 z-20' />
        <Container className='fixed w-screen top-0 bottom-0 h-screen left-0 right-0 flex items-center justify-center z-50'>
            {/* Contenedor principal con tamaño máximo ajustado */}
            <Container className='border bg-white rounded-lg shadow-lg flex-col items-center justify-center max-w-[90%] max-h-[90%]'>
                <Container className='flex-col items-start w-full h-20vh'>
                    {/* Imagen con altura máxima del 20% del contenedor */}
                    <Image
                        src={product.image}
                        alt={product.name}
                        className='w-full h-full object-contain rounded-t-lg'
                    />
                </Container>
                <Container className='flex items-center justify-center w-full px-4 py-1'>
                    <Heading level='4' className='font-semibold text-lg'>{product.id}</Heading>
                </Container>
                <Container className='flex items-start w-full px-4 py-1'>
                    <Paragraph className='font-semibold'>Product name:</Paragraph>
                    <Paragraph>{product.name}</Paragraph>
                </Container>
                {product.type && (
                    <Container className='flex items-start w-full px-4 py-1'>
                        <Paragraph className='font-semibold'>Product type:</Paragraph>
                        <Paragraph>{product.type}</Paragraph>
                    </Container>
                )}
                <Container className='flex items-start w-full px-4 pt-2 pb-1'>
                    <Paragraph className='font-semibold'>Product price:</Paragraph>
                    <Paragraph>{product.minprice} - {product.maxprice}</Paragraph>
                </Container>
                <Container className='flex items-start w-full px-4 py-1'>
                    <Paragraph className='font-semibold'>Farmer name:</Paragraph>
                    <Paragraph>{product.farmer.name}</Paragraph>
                </Container>
                <Container className='flex items-start w-full px-4 py-1'>
                    <Paragraph className='font-semibold'>Farmer surname:</Paragraph>
                    <Paragraph>{product.farmer.surname}</Paragraph>
                </Container>
                <Container className='flex items-start w-full px-4 py-1'>
                    <Paragraph className='font-semibold'>Farmer email:</Paragraph>
                    <Paragraph>{product.farmer.email}</Paragraph>
                </Container>
                <Container className='flex items-start w-full px-4 py-1'>
                    <Paragraph className='font-semibold'>Farmer phone:</Paragraph>
                    <Paragraph>{product.farmer.phone}</Paragraph>
                </Container>
                <Container className='flex items-start w-full px-4 py-1'>
                    <Paragraph className='font-semibold'>Farmer address:</Paragraph>
                    <Paragraph>{product.farmer.address}</Paragraph>
                </Container>
                <Container className='flex items-center justify-center space-x-4 py-1'>
                    <Button onClick={onCancel} type='button'>
                        <Image src='/icons/close.svg' alt='cancel icon' className='h-[30px] w-[30px]' />
                    </Button>
                </Container>
            </Container>
        </Container>
    </>

}