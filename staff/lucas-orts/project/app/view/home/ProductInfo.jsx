import Button from '../library/Button'
import Form from '../library/Form'
import Container from '../library/Container'
import Label from '../library/Label'
import Input from '../library/Input'
import Image from "../library/Image"
import Paragraph from "../library/Paragraph"

import logic from '../../logic'

export default function ProductInfo({ product, onCancel }) {



    return <>
        <Container className="fixed w-screen top-0 bottom-0 h-screen left-0 right-0 items-center bg-black opacity-50 z-10" />
        <Container className="fixed w-screen top-0 bottom-0 h-screen left-0 right-0 flex items-center justify-center z-20">
            <Container className="p-6 border bg-white rounded-lg shadow-lg flex-col items-center justify-center space-y-6">
                <Container className="flex-col items-start w-full">

                </Container>
                <Container className="flex items-start w-full">
                    <Paragraph>Name:</Paragraph>
                    <Paragraph>{product.name}</Paragraph>
                </Container>
                <Container className="flex items-start w-full">
                    <Paragraph>Type:</Paragraph>
                    <Paragraph>{product.type}</Paragraph>
                </Container>
                <Container className="flex items-start w-full">
                    <Paragraph>Type:</Paragraph>
                    <Paragraph>{product.farmer.name}</Paragraph>
                </Container>
                <Container className="flex-col items-start w-full">
                </Container>
                <Container className="flex items-center justify-center space-x-4">
                    <Button onClick={onCancel} type="button">
                        <Image src="/icons/close.svg" alt="cancel icon" className="h-[30px] w-[30px]" />
                    </Button>
                </Container>
            </Container>
        </Container>
    </>
}