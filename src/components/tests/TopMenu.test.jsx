import { fireEvent, render, screen } from "@testing-library/react";
import TopMenu from "../TopMenu";

describe(TopMenu, () => {
    it("initializes to have the feature links", () => {
        render(<TopMenu />)
        expect(screen).not.toEqual(null)
    })
    it("changes to the home page", () => {
        render(<TopMenu />)
        const startScreen = screen
        const homeBtn = screen.getByRole("Link", { id: "Logo" })

        fireEvent.click(homeBtn)
        expect(startScreen).toEqual(screen)
    })
    it("changes to the weather feature", () => {
        render(<TopMenu />)
        const startScreen = screen
        const weatherBtn = screen.getByRole("Link", { id: "Weather" })

        fireEvent.click(weatherBtn)
        expect(startScreen).toEqual(screen)
    })
    it("changes to the mapping feature", () => {
        render(<TopMenu />)
        const startScreen = screen
        const mappingBtn = screen.getByRole("Link", { id: "Mapping" })

        fireEvent.click(mappingBtn)
        expect(screen).not.toEqual(null)
        expect(startScreen).not.toEqual(screen)
    })
})