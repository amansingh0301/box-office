/* eslint-disable no-underscore-dangle */
import React, {useEffect, useReducer} from 'react'
import { useParams } from 'react-router';
import { apiGet } from '../misc/config';
import ShowMainData from '../Components/show/ShowMainData';
import Details from '../Components/show/Details';
import Cast from '../Components/show/Cast';
import Seasons from '../Components/show/Seasons';

const reducer = (prevState,action) => {
    switch(action.type){
        case 'FETCH_SUCCESS': {
            return {isLoading:false, show:action.show, error:null}
        }

        case 'FETCH_FAILED' : {
            return {...prevState, isLoading:false, error:action.error}
        }

        default: return prevState 
    }
}

const intialState = {
    show:null,
    isLoading:true,
    error:null
}

const Show = () => {

    const { id } = useParams();
    const [{show, isLoading, error},dispatch] = useReducer(reducer,intialState);

    useEffect(() => {
        let isMounted = true;

        apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
        .then(result => {
            if(isMounted){
                dispatch({type:'FETCH_SUCCESS' , show:result})
            }
        })
        .catch(err => {
            dispatch({type:'FETCH_FAILED', error:err.message});
        });

        return () => {
            isMounted = false;
        }
    },[id])

    if(isLoading){
        return <div>Data is being loaded</div>
    }

    if(error){
        return <div>Error Occured : {error}</div>
    }
    return (
        <div>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />

      <div>
        <h2>Details</h2>
        <Details
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </div>

      <div>
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.seasons} />
      </div>

      <div>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
      </div>
    </div>
    )
}

export default Show;