//import { fireEvent, render, screen } from "@testing-library/react";
import { fireEvent, render, screen } from '@testing-library/react';
import HourlyForecast from "../components/HourlyForecast";
import getFormattedWeatherData from "../components/services/weatherService";

describe(HourlyForecast, () => {
    let weather = new Array(48)

    beforeEach(async () => {
        await getFormattedWeatherData({ q: "Niagara Falls" }, "metric").then((data) => weather = data.hourly)
    })

    it("Initializes to the first page of weather data.", () => {
        //render(<HourlyForecast title="Hourly" items={weather} />)
        render(<HourlyForecast title = "Hourly" items = {weather}/>);
        const pageElement = screen.getByTestId("page") // Not grabbing
        //expect(pageElement).not.toEqual(null)
        //const pageNumber = screen.getByTestId("page").value
        const pageNumber = Number(screen.getByTestId("page").getAttribute('value'))
        expect(pageNumber).toEqual(1)
    })
    it("Increments and does not pass the seventh page", () => {
        render(<HourlyForecast title = "Hourly" items = {weather} />)
        var pageNumber = Number(screen.getByTestId("page").getAttribute('value'))  // Not grabbing
        const incrementPage = screen.getByRole("button", { name: '››' }) // Not grabbing - easy fix

        for (var i = 1; i < 8; i++) {
            expect(pageNumber).toEqual(i)
            fireEvent.click(incrementPage)
            pageNumber = Number(screen.getByTestId("page").getAttribute('value'))
        }
        expect(pageNumber).toEqual(7)
    })
    it("Decrements and does not pass the seventh page", () => {
        render(<HourlyForecast title="Hourly" items={weather} />)
        var pageNumber = Number(screen.getByTestId("page").getAttribute('value'))
        const incrementPage = screen.getByRole("button", { name: "››" })
        const decrementPage = screen.getByRole("button", { name: "‹‹" })

        for (var i = 1; i < 7; i++) {
            fireEvent.click(incrementPage)
        }
        pageNumber = Number(screen.getByTestId("page").getAttribute('value'))
        for (var i = 7; i > 1; i--) {
            expect(pageNumber).toEqual(i)
            fireEvent.click(decrementPage)
            pageNumber = Number(screen.getByTestId("page").getAttribute('value'))
        }
        expect(pageNumber).toEqual(1)
    })
    it("Resets page number on weather data change", () => {
        render(<HourlyForecast title = "Hourly" items = {weather} />)
        var pageNumber = Number(screen.getByTestId("page").getAttribute('value'))
        const incrementPage = screen.getByRole("button", { name: "››" })

        expect(pageNumber).toEqual(1)
        fireEvent.click(incrementPage)
        pageNumber = Number(screen.getByTestId("page").getAttribute('value'))
        expect(pageNumber).toEqual(2)

        let londonWeather = null
        getFormattedWeatherData({ q: "London" }, "metric").then((data) => {
            londonWeather = data.hourly
            screen.HourlyForecast.items = londonWeather
            pageNumber = Number(screen.getByTestId("page").getAttribute('value'))
            expect(pageNumber).toEqual(1)
            // Could have a timing problem - got upset with having expect in this .then() promise catch
        })
    })
})