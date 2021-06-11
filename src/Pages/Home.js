import React, { useState} from 'react'
import MainPageLayout from '../Components/MainPageLayout';
import {apiGet} from '../misc/config'

const Home = () => {
    const [input,setInput] = useState('');
    const [results,setResults] = useState(null);
    const [onSearchOption,setOnSearchOption] = useState('shows');

    const showsSearch = onSearchOption === 'shows';

    const onSearch = (ev) => {
        apiGet(`/search/${onSearchOption}?q=${input}`)
        .then(result => setResults(result))
    }

    const onInputChange = (ev) => {
        setInput(ev.target.value);
    }

    const onKeyDown = (ev) => {
        if(ev.keyCode === 13){
            onSearch();
        }
    }

    const onRadioChange = (ev) => {
        setOnSearchOption(ev.target.value)
    }

    const renderResults = () => {
        if(results && results.length === 0){
            return <div>No result</div>
        }

        if(results && results.length > 0){
            return results[0].show ? results.map(item => 
                <div key={item.show.id}>{item.show.name}</div>
                ) :results.map(item => 
                    <div key={item.person.id}>{item.person.name}</div>
                    )
        }

        return null;
    }

    return (
        <MainPageLayout>
            <input type='text' onChange={onInputChange} onKeyDown={onKeyDown} valur={input}/>
            <div>
                <label htmlFor='shows-search'>
                    Shows
                    <input type='radio' value='shows' id='shows-search' checked={showsSearch} onChange={onRadioChange}/>
                </label>

                <label htmlFor='actors-search'>
                    Actors
                    <input type='radio' value='people' id='actors-search' checked={!showsSearch} onChange={onRadioChange}/>
                </label>
            </div>
            <button type='button' onClick={onSearch}>Search</button>
            {
                renderResults()
            }
        </MainPageLayout>
    )
}

export default Home;