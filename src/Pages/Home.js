import React, { useState} from 'react'
import MainPageLayout from '../Components/MainPageLayout';
import {apiGet} from '../misc/config'
import ShowGrid from '../Components/show/ShowGrid'
import ActorGrid from '../Components/actor/ActorGrid'
import { useLastQuery } from '../misc/custom-hooks';

const Home = () => {
    const [input, setInput] = useLastQuery();
    const [results,setResults] = useState(null);
    const [onSearchOption,setOnSearchOption] = useState('shows');

    const showsSearch = onSearchOption === 'shows';

    const onSearch = () => {
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
            return results[0].show ? <ShowGrid data={results}/> :<ActorGrid data={results}/>
        }

        return null;
    }

    return (
        <MainPageLayout>
            <input type='text' onChange={onInputChange} onKeyDown={onKeyDown} valur={input} placeholder='search anything'/>
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