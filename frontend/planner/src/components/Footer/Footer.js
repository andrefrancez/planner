import React, {useState, useEffect} from 'react'
import './Footer.css'

const Footer = () => {
    const year = new Date().getFullYear()
    const [country, setCountry] = useState('')

    useEffect(() => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const {latitude, longitude} = position.coords

                    try{
                        const apiKey = process.env.REACT_APP_OPENCAGE_KEY
                        const response = await fetch(
                            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&language=pt-BR`
                        )
                        const data = await response.json()

                        if(data.results && data.results.length > 0) {
                            const components = data.results[0].components
                            const countryApi = components.country || 'País não encontrado!'
                            setCountry(countryApi)
                        }
                    } catch(error){
                        console.error('Erro ao procurar o país: ', error)
                    }
                }, (error) => {
                    console.error('Erro na busca da localização: ', error)
                }
            )
        }
    }, [])

    return(
        <footer className='footer'>
            <p>{year} - {country}</p>
        </footer>
    )
}

export default Footer