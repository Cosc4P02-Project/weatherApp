import { render, screen } from '@testing-library/react';
import { Forecast } from "../Forecast"
import getFormattedWeatherData from "../services/weatherService"
describe(Forecast, () => {
    let weather = new Array(48)

    beforeEach(async () => {
        await getFormattedWeatherData({ q: "Niagara Falls" }, "metric").then((data) => weather = data.daily)
    })

    it("Initializes to hold some weather data", () => {
        render(<Forecast title="daily" items={weather.daily} />)
        expect(screen).not.toEqual(null)

    })
})