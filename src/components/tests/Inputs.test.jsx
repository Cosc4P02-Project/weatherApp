import { fireEvent, render, screen } from "@testing-library/react";
import Inputs from "../Inputs";
import { useState } from 'react';


describe(Inputs, () => {
    const [units, setUnits] = useState("metric")
    const [query, setQuery] = useState({ q: "Niagara Falls" })

    beforeEach(() => {
        setUnits("metric")
        setQuery({ q: "Niagara Falls" })
    })

    it("initializes to fetch some weather data", () => {
        render(<Inputs setQuery={query} setUnits={setUnits} units={units} />)

        expect(screen).not.toEqual(null)
    })
    it("fetches weather data for current location", () => {
        const firstQ = query
        render(<Inputs setQuery={query} setUnits={setUnits} units={units} />)
        const locationBtn = screen.getByRole("UilLocationPoint")

        fireEvent.click(locationBtn)
        expect(firstQ).not.toEqual(query)
    })
    it("fetches weather data for a searched location", () => {
        const firstQ = query
        render(<Inputs setQuery={query} setUnits={setUnits} units={units} />)
        const searchBtn = screen.getByRole("UilSearch")
        const searchBar = screen.getByRole("input")

        fireEvent.change(searchBar, { target: { value: "Thorold" } })
        fireEvent.click(searchBtn)
        expect(firstQ).not.toEqual(query)
    })
    it("changes units", () => {
        const firstUnits = units
        render(<Inputs setQuery={query} setUnits={setUnits} units={units} />)
        const mUnitBtn = screen.getByRole("button", { name: "metric" })
        const iUnitBtn = screen.getByRole("button", { name: "imperial" })

        fireEvent.click(iUnitBtn)
        expect(firstUnits).not.toEqual(units)

        fireEvent.click(mUnitBtn)
        expect(firstUnits).toEqual(units)
    })
})