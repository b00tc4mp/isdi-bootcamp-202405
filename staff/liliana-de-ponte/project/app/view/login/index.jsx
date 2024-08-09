export default function Login() {

    return <main>
        <Image src="public/+Vibes.jpg" />

        <Form onSubmit={handleLoginSubmit} className="flex-col gap-[0.9rem]">
            <Container className="flex-col items-start">
                <Input className="w-11/12" type="text" id="username-input" name="username" placeholder="Username"></Input>
                <Input className="w-11/12" type="password" id="password-input" name="password" placeholder="Username"></Input>
            </Container>

            <Button type="submit">Login</Button>
        </Form>

        <Paragraph>Don't have an account?</Paragraph>
        <Link onClick={handleRegisterClick}>Sign up</Link>
    </main>

}