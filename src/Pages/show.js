import React, {useEffect, useState, useReducer} from 'react'
import { useParams } from 'react-router';
import { apiGet } from '../misc/config';

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

    console.log(show,isLoading,error);

    // if(isLoading){
    //     return <div>Data is being loaded</div>
    // }

    // if(error){
    //     return <div>Error Occured : {error}</div>
    // }
    return <div>This is show page</div>
}

export default Show;