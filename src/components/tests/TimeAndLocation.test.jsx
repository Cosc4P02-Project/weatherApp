import { render, screen } from "@testing-library/react";
import TimeAndLocation from "../TimeAndLocation";
import getFormattedWeatherData from "../services/weatherService";

describe(TimeAndLocation, () => {
    let weather = null

    beforeEach(async () => {
        await getFormattedWeatherData({ q: "Niagara Falls" }, "metric").then((data) => weather = data)
    })
    it("initializes to show some date and time data", () => {
        render(<TimeAndLocation weather={weather} />)

        expect(screen).not.toEqual(null)
    })
})