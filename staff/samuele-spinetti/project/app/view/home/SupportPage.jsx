import { useState } from 'react'

import Heading from '../library/Heading'
import Form from '../library/Form'
import Container from '../library/Container'
import Label from '../library/Label'
import Input from '../library/Input'
import Button from '../library/Button'
import Paragraph from '../library/Paragraph'
import Link from '../library/Link'

export default function SupportPage() {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = event => {
        event.preventDefault()

        alert('Message sent!')
    }

    return <>
        <Container className="flex flex-col justify-center items-center">
            <section className="bg-white p-8 shadow-lg rounded w-96">
                <Heading className="text-2xl font-bold mb-4">Contact Support</Heading>
                <Form onSubmit={handleSubmit} className="space-y-4">
                    <Container>
                        <Label className="block mb-2">Email</Label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Email"
                        />
                    </Container>
                    <Container>
                        <Label className="block mb-2">Message</Label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows="4"
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Write your message here..."
                        ></textarea>
                    </Container>
                    <Button type="submit" className="bg-blue-600 text-white p-2 rounded">Send</Button>
                </Form>
            </section>

            <footer className="text-gray-700 p-4 text-center">
                <Paragraph>&copy; 2024 MyApp. All Rights Reserved.</Paragraph>
                <Paragraph><Link href="/terms" className="underline">Terms of Service</Link> | <Link href="/privacy" className="underline">Privacy Policy</Link></Paragraph>
            </footer>
        </Container>
    </>
}