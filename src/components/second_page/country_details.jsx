import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { ReactComponent as Arrow } from '../../svg/arrow-left.svg'; //icon



function CountryDetails({ mainApi }) {
    const url = window.location.pathname.slice(1).substring(window.location.pathname.slice(1).lastIndexOf('/') + 1); //changed
    const [api, setApi] = useState([]);

    useEffect(() => {
        fetch(`https://restcountries.com/v3.1/name/${url}?fullText=true`)
            .then(res => res.json())
            .then(json => setApi(json))
            .catch(e => console.error(e))
    }, [url]);

    return (
        <div className='country_details'>
            {api.length === 0 ? <div className="loader_container"><div className="loader"><div><div></div></div></div></div>
                : api.length > 0 ? api.map((item, index) =>
                    <div className="country_details_container" key={index}>
                        <button onClick={() => window.history.back()}><Arrow />Back</button>
                        <div className="country_main">
                            <div className="country_flag">
                                <img src={item.flags.svg} alt={`${item.name.common}_flag`} />
                            </div>
                            <div className="country_info">
                                <h1>{item.name.common}</h1>
                                <div className="country_info_2">
                                    <div className="country_info_2_left">
                                        <p className="p-info">Native name: <span>{item.name.nativeName ? item.name.nativeName[Object.keys(item.name.nativeName)[0]].common : null}</span></p>
                                        <p className="p-info">Population: <span>{item.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span></p>
                                        <p className="p-info">Region: <span>{item.region}</span></p>
                                        <p className="p-info">Sub Region: <span>{item.subregion}</span></p>
                                        <p className="p-info">Capital: <span>{item.capital ? item.capital.join(", ") : null}</span></p>
                                    </div>
                                    <div className="country_info_2_right">
                                        <p className="p-info">Area: <span>{`${item.area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} km2`}</span> </p>
                                        <p className="p-info">Demonym: <span>{item.demonyms.eng.m}</span> </p>
                                        <p className="p-info">Top Level Domain: <span>{item.tld ? item.tld.join(", ") : null}</span></p>
                                        <p className="p-info">Currencies: <span>{item.currencies ? Object.keys(item.currencies).map(item2 => item.currencies[item2].symbol ? `${item.currencies[item2].name} - ${item.currencies[item2].symbol}` : item.currencies[item2].name).join(", ") : 'no'}</span></p>
                                        <p className="p-info">Languages: <span>{item.languages ? Object.values(item.languages).join(", ") : 'no'}</span></p>
                                    </div>
                                </div>
                                <div className="border_countries">
                                    <span>Border Countries: {item.borders ? mainApi.filter(el => item.borders.includes(el['cca3'])).map((item2, index2) =>
                                        <a key={index2} href={`${item2.name.common}`}>{item2.name.common}</a>)
                                        : null}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>) : null}
            {api.status === 404 ? <div>Sorry, this page is currently unavalaible, please check the url</div> : null}
        </div>
    )
}

export default CountryDetails;