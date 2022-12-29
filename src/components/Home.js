import { useState, useEffect, useContext } from 'react'
import { DataContext } from '../contexts/DataProvider'

export default function Home() {
    const [pokemon, setPokemon] = useState({})
    //const [weather, setWeather] = useState({})
    const [weather, setWeather] = useState({})

    const [loadState, setLoadState] = useState("LOADING")

    const { fetchPokemon } = useContext(DataContext)
    //new code
    const { weatherFetch } = useContext(DataContext)


    useEffect(() => {
        async function getFirstWeather() {
            const data = await weatherFetch(1)
            setWeather(data)
            setLoadState("LOADED")
        }
        getFirstWeather()
    }, [])

    //new code

    async function searchWeather(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        console.log(formData.get('weatherName'))

        const data = await weatherFetch(formData.get('weatherName'))
        setWeather(data)
        setLoadState("LOADED")
        event.target.reset()
    }

    return (
        <div className='weather'>
            <h1>Weather</h1>
            <p>Showing Weather Information: { weather.main }</p>
            <form onSubmit={searchWeather}>
                <input type="text" name="weatherName" />
                <button>Search</button>
            </form>
            {
                (loadState === 'LOADED') ?
                <>
                    {/* <img src={ pokemon.sprites.front_default } alt="" /> */}
                    <h2>{ weather.main }</h2>
                    <p>Forecast: { weather.main }</p>
                    <p>Humidity: { weather.main }</p>    
                </> :
                <p>Loading...</p>
            }
            {/* {
                (pokemon.id > 1) ?
                <button onClick={async () => {
                    pokemon.id--
                    const data = await fetchPokemon(pokemon.id)
                    setPokemon(data)
                    setLoadState("LOADED")                   
                }}>Previous Pokemon</button>
                : <></>
            }
            <button onClick={async () => {
                    pokemon.id++
                    const data = await fetchPokemon(pokemon.id)
                    setPokemon(data)
                    setLoadState("LOADED")     
            }}>Next Pokemon</button> */}
        </div>
    )
}

    //new code 




//     async function searchPokemon(event) {
//         event.preventDefault()
//         const formData = new FormData(event.target)
//         console.log(formData.get('pokemonName'))

//         const data = await fetchPokemon(formData.get('pokemonName'))
//         setPokemon(data)
//         setLoadState("LOADED")
//         event.target.reset()
//     }

//     return (
//         <div className='pokemon'>
//             <h1>Pokemon</h1>
//             <p>Showing pokemon ID: { pokemon.id }</p>
//             <form onSubmit={searchPokemon}>
//                 <input type="text" name="pokemonName" />
//                 <button>Search</button>
//             </form>
//             {
//                 (loadState === 'LOADED') ?
//                 <>
//                     <img src={ pokemon.sprites.front_default } alt="" />
//                     <h2>{ pokemon.name }</h2>
//                     <p>Height: { pokemon.height }</p>
//                     <p>Weight: { pokemon.weight }</p>    
//                 </> :
//                 <p>Loading...</p>
//             }
//             {
//                 (pokemon.id > 1) ?
//                 <button onClick={async () => {
//                     pokemon.id--
//                     const data = await fetchPokemon(pokemon.id)
//                     setPokemon(data)
//                     setLoadState("LOADED")                   
//                 }}>Previous Pokemon</button>
//                 : <></>
//             }
//             <button onClick={async () => {
//                     pokemon.id++
//                     const data = await fetchPokemon(pokemon.id)
//                     setPokemon(data)
//                     setLoadState("LOADED")     
//             }}>Next Pokemon</button>
//         </div>
//     )
// }