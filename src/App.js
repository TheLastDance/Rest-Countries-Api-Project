import { useEffect, useState } from 'react';
import './App.scss';
import ContentFirstPage from './components/content_firstpage/content_firstpage';
import Navbar from './components/navbar';
import CountryDetails from './components/second_page/country_details';

function App() {
  const url = window.location.pathname.slice(1);
  const [mode, setMode] = useState(JSON.parse(localStorage.getItem("mode")));
  const [api, setApi] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,cca3')
      .then(res => res.json())
      .then(json => setApi(json.sort((a, b) => a.name.common === b.name.common ? 0 : a.name.common < b.name.common ? -1 : 1)))
      .catch(e => console.log(e.message))
  }, []);

  useEffect(() => {
    localStorage.setItem('mode', JSON.stringify(mode));
  }, [mode]);

  function changeMode() {
    setMode(prev => !prev);
  }

  //changed
  return (
    <div className={!mode || mode === null ? null : 'dark_mode'}>
      <nav className='bar'>
        <Navbar mode={mode} changeMode={changeMode} />
      </nav>
      {url === 'Rest-Countries-Api-Project/build/' ? <div className='content'>
        <ContentFirstPage api={api} />
      </div> : null}
      {url !== 'Rest-Countries-Api-Project/build/' ? <CountryDetails mode={mode} mainApi={api} /> : null}
    </div>
  );
}

export default App;
