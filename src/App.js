import { useEffect, useState } from 'react';
import './App.scss';
import { ReactComponent as DarkIcon } from './svg/moon.svg'; //icon
import { ReactComponent as LightIcon } from './svg/sun.svg'; //icon
import { ReactComponent as SearchIcon } from './svg/search_icon.svg'; //icon
import { ReactComponent as ChevronDown } from './svg/chevronDown.svg'; //icon
import CountriesCards from './components/countries_cards';

function App() {

  const regions = ['Africa', 'Antarctic', 'America', 'Asia', 'Europe', 'Oceania'];
  const [mode, setMode] = useState(JSON.parse(localStorage.getItem("mode")));
  const [api, setApi] = useState([]);
  const [search, setSearch] = useState('');
  const [letter, setLetters] = useState([]);
  const [regionSelect, setRegionSelect] = useState(false);
  const [regionFilter, setRegionFilter] = useState('Filter by region');
  const [filterBy, setFilterBy] = useState({
    bySearch: false,
    byRegion: false,
    byLetter: false
  })

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags')
      .then(res => res.json())
      .then(json => setApi(json.sort((a, b) => a.name.common === b.name.common ? 0 : a.name.common < b.name.common ? -1 : 1)))
      .catch(e => console.log(e.message))
  }, []);

  useEffect(() => {
    setLetters(Array.from({ length: 90 - 65 + 1 }, (_, i) => 65 + i).map(item => String.fromCharCode(item)));
  }, [])

  useEffect(() => {
    localStorage.setItem('mode', JSON.stringify(mode));
  }, [mode]);


  function searchFunc(e) {
    const val = e.target.value.toLowerCase();
    setSearch(val.trim());
    setRegionFilter('Filter by region');
    setFilterBy({ bySearch: true, byRegion: false, byLetter: false });
  }

  function letterFunc(e) {
    setSearch(e.target.textContent);
    setRegionFilter('Filter by region');
    setFilterBy({ bySearch: false, byRegion: false, byLetter: true });
  }

  function regionFunc(e) {
    const val = e.target.textContent;
    setSearch(val);
    setRegionFilter(val);
    setFilterBy({ bySearch: false, byRegion: true, byLetter: false });
  }

  {/* <button onClick={() => window.history.back()}>go back</button> */ }

  return (
    <>
      <nav className={mode || mode === null ? 'bar' : 'bar bar_dark_mode'}>
        <h2>Where in the world?</h2>
        <div className="colormode" onClick={() => setMode(prev => !prev)}>
          <div className={mode || mode === null ? 'effect' : 'effect effect2'}></div>
          {mode ? <>
            <DarkIcon />
            <p>Dark Mode</p>
          </> : <>
            <LightIcon />
            <p>Light Mode</p>
          </>}
        </div>
      </nav>
      <div className={mode || mode === null ? 'content' : 'content content_dark_mode'}>
        <div className='content_inputs'>
          <span><SearchIcon /><input type="search" placeholder='Search for a country...' onChange={searchFunc} /></span>
          <span className='letter_search' onClick={letterFunc}>
            {letter.map((item, index) => <span key={index}>{item}</span>)}
          </span>
          <div className='dropdown' >
            <div className='title' onClick={() => setRegionSelect(prev => !prev)}>
              <p>{regionFilter}</p>
              <ChevronDown />
            </div>
            {regionSelect ? <div className='drop_menu' onClick={regionFunc}>
              {regions.map((item, index) => <div className='regions' key={index} value={item}>{item}</div>)}
            </div> : null}
          </div>
        </div>
        <div className='countries'>
          {api.map((item, index) => <CountriesCards item={item} key={index} search={search} filterBy={filterBy} />)}
        </div>
      </div>
    </>
  );
}

export default App;
