// users-api.js 

// set up the base URL for the API
const LOCAL_URL = 'http://localhost:5050';
const API_URL = '/api/users';
const URL = LOCAL_URL + API_URL;

export async function signup(userData) {
    
    // fetch uses an options objecst as a second argument to make requests
    // other than basic GET requests, include data, headers, etc
    const res = await fetch(URL,{
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        // fetch requires data payloads to be stringified
        // and assingned to a body property on the options object
        body: JSON.stringify(userData)
    })
    // check if the request was successful
    if (res.ok) {
        // eventuall, res.json will return a token
        return res.json();
    }else{
        // if the request failed, an error message will be returned
        throw new Error('Invalid Sign Up');
    }
    
}