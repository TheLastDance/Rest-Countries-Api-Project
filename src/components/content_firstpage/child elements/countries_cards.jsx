function CountriesCards({ item, search, filterBy }) {
    const exp = (item.name.common.toLowerCase().search(search) === -1 && filterBy.bySearch)
        || (item.name.common[0] !== search && filterBy.byLetter) || (item.region.search(search) === -1 && filterBy.byRegion) ? 'country_card hide' : 'country_card';
    //1
    return (
        <a href={`${item.name.common}`}
            className={exp}>
            <img src={item.flags.png} alt={`${item.name.common}_flag`} />
            <div className="main_info">
                <h3 onMouseOver={(e) => Object.keys(item.name.nativeName).length > 0 ? e.target.textContent = item.name.nativeName[Object.keys(item.name.nativeName)[0]].common : null} onMouseOut={(e) => e.target.textContent = item.name.common}>{item.name.common}</h3>
                <p>Population: <span>{item.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span></p>
                <p>Region: <span>{item.region}</span></p>
                <p>Capital: <span>{item.capital.join(', ')}</span></p>
            </div>
        </a>
    )
}

export default CountriesCards;