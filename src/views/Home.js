import { useContext } from "react";
import { DataContext } from "../contexts/DataProvider";
import FavZip from "../components/FavZip";
import FavCity from "../components/FavCity";

export default function Home() {
    const { toTitleCase, cities, zips, addCity, addZip } = useContext(DataContext)

    function handleAddCity(ev) {
        ev.preventDefault()
        const formData = new FormData(ev.target)
        const cityName = toTitleCase(formData.get('city'))
        
        addCity(cityName)
        
        ev.target.reset()
    }

    function handleAddZip(ev) {
        ev.preventDefault()
        const formData = new FormData(ev.target)
        
        addZip(formData.get('zip'))
        
        ev.target.reset()
    }

    return (
        <div className="Home">
            <h1 className="text-center text-light pb-3"><strong>Your Favorites</strong></h1>
            <div className="row justify-content-center gap-5">
                <div className="col-4" id="citiesLeft">
                    <div className="card p-4 mb-5 shadow-lg rounded">
                        <form id="cityForm" onSubmit={handleAddCity}>
                            <label htmlFor="city" className="form-label fs-3"><strong>Add By City Name</strong></label>
                            <input name="city" type="text" className="form-control mt-2 fs-5" placeholder="Examples: &nbsp; Houston, Denver, London, etc."/>
                            <div className="d-grid mt-3 justify-content-end">
                            <button type="submit" className="btn btn-primary px-5 fs-4"><strong>Add</strong></button>
                            </div>
                        </form>
                    </div>
                    { cities.map(city => <FavCity key={city.id} city={city}/>) }
                </div>

                <div className="col-4"  id="zipsRight">
                    <div className="card p-4 mb-5 shadow-lg rounded">
                        <form id="zipForm" onSubmit={handleAddZip}>
                            <label htmlFor="zip" className="form-label fs-3"><strong>Add By Zip/Post Code</strong></label>
                            <input name="zip" type="text" className="form-control mt-2 fs-5" placeholder="Examples: &nbsp; 90064, 80204, SW1A, etc."/>
                            <div className="d-grid mt-3 justify-content-end">
                            <button type="submit" className="btn btn-primary px-5 fs-4"><strong>Add</strong></button>
                            </div>
                        </form>
                    </div>
                    { zips.map(zip => <FavZip key={zip.id} zip={zip}/>) }
                </div>
            </div>
        </div>
    )
}