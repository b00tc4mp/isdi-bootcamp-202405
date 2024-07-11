import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import Button from "../Button";

describe("Given a Button component", () => {
    describe("When its rendered whith the text 'Login'", () => {
        test("Then it should show a Button with the text 'Login'", () => {


            render(<Button></Button>)

            const button = screen.getByRole("button")

            screen.debug()

            expect(button).toBeInTheDocument()
        })
    })

    describe("When its rendered and the user click on it", () => {
        test("Then the function handleLogin has been called", async () => {
            const buttonText = 'Login'
            const handleLogin = vi.fn()

            render(<Button onClick={handleLogin}> {buttonText}</Button>)

            const button = screen.getByRole("button", { name: buttonText })

            await userEvent.click(button)


            expect(handleLogin).toHaveBeenCalled()

        })
    })
})