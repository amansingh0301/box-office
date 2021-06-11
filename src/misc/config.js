const API_BASE_URL = 'http://api.tvmaze.com';

export async function apiGet(querString) {
    const result = await fetch(`${API_BASE_URL}${querString}`)
        .then(r => r.json())
    
    return result;
}