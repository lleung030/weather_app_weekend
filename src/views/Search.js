import { useState, useEffect, useContext } from "react"
import { DataContext } from "../contexts/DataProvider"
import Weather from "../components/Weather"

export default function Search() {
    const { toTitleCase, getCityWeather } = useContext(DataContext)
    const [info, setInfo] = useState({})

    useEffect(() => {
        async function loadDefault() {
            const data = await getCityWeather('Los Angeles')
            setInfo(data)
        }
        
        loadDefault()
    }, [])

    async function searchCity(ev) {
        ev.preventDefault()
        const formData = new FormData(ev.target)
        const cityName = toTitleCase(formData.get('city'))

        const data = await getCityWeather(cityName)
        setInfo(data)

        // ev.target.reset()
    }


    return (
        <div className="Search">
            <h1 className="text-center text-light pb-3"><strong>Search Weather By...</strong></h1>
            <div className="row justify-content-center gap-5 pb-4">
                <div className="card col-4 p-4 shadow-lg rounded">
                    <form onSubmit={searchCity}>
                        <label htmlFor="city" className="form-label fs-3"><strong>City Name</strong></label>
                        <input name="city" type="text" className="form-control mt-2 fs-5" placeholder="Examples: &nbsp; Houston, Denver, London, etc."/>
                        <div className="d-grid mt-3 justify-content-end">
                        <button type="submit" className="btn btn-primary px-5 fs-4"><strong>Search</strong></button>
                        </div>
                    </form>
                </div>
            </div>

            <Weather info={info}/>
            {/* <Weather cityName={info.cityName} zipCode={info.zipCode} country={info.country} tempF={info.tempF} tempC={info.tempC} tempLowF={info.tempLowF} tempLowC={info.tempLowC} tempHighF={info.tempHighF} tempHighC={info.tempHighC} forecast={info.forecast} forecastDetails={info.forecastDetails} windMPH={info.windMPH} windKMPH={info.windKMPH} humidity={info.humidity}/> */}
        </div>
    )
}