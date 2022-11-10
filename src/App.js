import { useEffect, useState } from 'react';
import './App.scss';
import { ReactComponent as DarkIcon } from './svg/moon.svg'; //icon
import { ReactComponent as LightIcon } from './svg/sun.svg'; //icon

function App() {

  const [mode, setMode] = useState(true);
  const [api, setApi] = useState([]);
  const [regions, setRegions] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags')
      .then(res => res.json())
      .then(json => {
        setApi(json.sort((a, b) => a.name.common === b.name.common ? 0 : a.name.common < b.name.common ? -1 : 1));
        setRegions(new Set([...json.map(item => item.region)]))
      })
      .catch(e => console.log(e.message))
  }, []);

  console.log(search);

  return (
    <>
      <nav className={mode ? 'bar' : 'bar bar_dark_mode'}>
        <h2>Where in the world?</h2>
        <div className="colormode" onClick={() => setMode(prev => !prev)}>
          <div className={mode ? 'effect' : 'effect effect2'}></div>
          {mode ? <>
            <DarkIcon />
            <p>Dark Mode</p>
          </> : <>
            <LightIcon />
            <p>Light Mode</p>
          </>}
        </div>
      </nav>
      <div className={mode ? 'content' : 'content content_dark_mode'}>
        <div className='content_inputs'>
          <input type="search" placeholder='Search for a country...' onChange={(e) => setSearch(e.target.value)} />
          <select id="dropdown" className="form-control" required>
            <option defaultValue hidden>Filter by region</option>
            {[...regions].map((item, index) => <option key={index} value={item}>{item}</option>)}
          </select>
        </div>
        <div className='countries'>
          {api.map((item, index) => <a href={`/${item.name.common}`} className='country_card' key={index}>
            <img src={item.flags.png} alt={`${item.name.common}_flag`} />
            <h3 onMouseOver={(e) => Object.keys(item.name.nativeName).length > 0 ? e.target.textContent = item.name.nativeName[Object.keys(item.name.nativeName)[0]].official : null} onMouseOut={(e) => e.target.textContent = item.name.common}>{item.name.common}</h3>
            <p>Population: {item.population}</p>
            {/* split-join */}
            <p>Region: {item.region}</p>
            <p>Capital: {item.capital.join(', ')}</p>
          </a>)}
        </div>
      </div>
    </>
  );
}

export default App;
