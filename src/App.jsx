import './App.css';
import React, { useState } from 'react';
import logo from './images/logo-white.png';
import { getSearchResults, getMovie } from './api/scripts.js';
import { lang } from './config/lang.js';
import DropDownMenu from './components/dropdownmenu.jsx'
import SearchBar from './components/searchbar.jsx';
import Screen from './components/screen.jsx';

function App() {
  const [input, setInput] = useState('');
  const [completion, setCompletion] = useState([]);
  const [movie, setMovie] = useState(null);
  const [locale, setLocale] = useState(lang.current());

  let handleChange = (event) => {
    setInput(event.target.value);
    getSearchResults(event.target.value, (val) => setCompletion(val));
  }

  let handleClick = (selectedMovie) => {
    getMovie(selectedMovie, (val) => setMovie(val));
  }

  let clearPage = () => {
    setMovie(null);
    setInput('');
    setCompletion([]);
  }

  let handleSelect = (locale) => {
    lang.changeLang(locale, (lng) => setLocale(lng));
  }

  let getMovieProps = () => {
    return (
      {...movie, details: movie.details.map(detail => {
        return({...detail, label: lang.t(detail.label)});
      })}
    );
  }

  return (
    <div className="App">
      <div className={'header'}>
        <DropDownMenu 
          onChange={handleSelect}
          selected={locale}
          menu={lang.supportedLocales()}
        />
      </div>      
      <img src={logo} alt={"Ghibli studio"} style={{display: `${movie ? 'none' : 'inline'}`}}/>
      {
        movie ?
          <div className="app-movie">
            <Screen {...getMovieProps()} />
            <div className={'navigation-back'} onClick={clearPage}>
              {lang.t('caption.back')}
            </div>
          </div> :                          
          <div className="app-search">
            <SearchBar 
              value={input}
              placeholder={lang.t('placeholder.search')}
              onChange={handleChange}
              completion={completion}
              selectItem={handleClick}
            />
          </div>          
      }
    </div>
  );
}

export default App;
