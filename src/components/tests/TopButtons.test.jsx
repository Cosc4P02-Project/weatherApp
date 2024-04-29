import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from 'react';
import TopButtons from "../TopButtons";


describe(TopButtons, () => {
    const [units, setUnits] = useState("metric")
    const [query, setQuery] = useState({ q: "Niagara Falls" })

    beforeEach(() => {
        setUnits("metric")
        setQuery({ q: "Niagara Falls" })
    })

    it("initializes to fetch some weather data", () => {
        render(<TopButtons setQuery={query} setUnits={setUnits} units={units} />)

        expect(screen).not.toEqual(null)
    })
    it("fetches weather data for a city location", () => {
        const firstQ = query
        render(<TopButtons setQuery={query} setUnits={setUnits} units={units} />)
        const locationBtn = screen.getByRole("button", { title: "Paris" })

        fireEvent.click(locationBtn)
        expect(firstQ).not.toEqual(query)
    })

})