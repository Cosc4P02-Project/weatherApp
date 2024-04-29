import React, { useState } from 'react'
import { iconUrlFromCode } from './services/weatherService'

function HourlyForecast({ title, items }) {
    const [page, setPage] = useState(1)
    const [prevData, setData] = useState(items)

    const previousPage = () => {
        if (page > 1) setPage(page - 1)
    }

    const nextPage = () => {
        if (page < 7) setPage(page + 1)
    }

    function pageStart() {
        if (items != prevData) {
            setData(items)
            setPage(1)
        }
        return page * 7 > 48 ? 41 : page * 7 - 7
    }

    function pageEnd() {
        return Math.min(page * 7, 48)
    }

    return (
        <div>
            <div className='flex flex row items-center justify-between text-white'>
                <div className="mt-6">
                    <p className="font-medium uppercase"> {title}</p>
                </div>
                <div className='mt-6' value={page} data-testid="page">
                    <button className="text-white font-medium uppercase pr-1" onClick={previousPage}> &#8249;&#8249; </button>
                    {page} / 7
                    <button className="text-white font-medium uppercase pl-1" onClick={nextPage}> &#8250;&#8250; </button>
                </div>
            </div>
            <hr className="my-2" />

            <div className="flex flex-row items-center justify-between text-white">
                {items.slice(pageStart(), pageEnd()).map((item) => (
                    <div className="flex flex-col items-center justify-center">
                        <p className="font-light text-sm">{item.title}</p>
                        <img src={iconUrlFromCode(item.icon)}
                            className="w-12 my-1" alt="" />
                        <p className="font-medium">{`${item.temp.toFixed()}°`}</p>
                    </div>

                ))}


            </div>
        </div>


    )
}

export default HourlyForecast