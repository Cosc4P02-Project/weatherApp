import { render, screen } from "@testing-library/react";
import TemperatureAndDetails from "../TemperatureAndDetails";
import getFormattedWeatherData from "../services/weatherService";

describe(TemperatureAndDetails, () => {
    let weather = null

    beforeEach(async () => {
        await getFormattedWeatherData({ q: "Niagara Falls" }, "metric").then((data) => weather = data.hourly)
    })

    it("initializes to show some temperature and weather details", () => {
        render(<TemperatureAndDetails weather={weather} />)

        expect(screen).not.toEqual(null)
    })
})