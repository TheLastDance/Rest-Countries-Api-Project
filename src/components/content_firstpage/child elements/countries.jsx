import CountriesCards from "./countries_cards";


function Countries({ api, search, filterBy }) {

    return (
        <div className='countries'>
            {api.map((item, index) => <CountriesCards item={item} key={index} search={search} filterBy={filterBy} />)}
        </div>
    )
}

export default Countries;