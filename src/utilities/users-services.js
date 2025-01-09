import * as usersAPI from './users-api';

// I need to pass in userData because this is attempting
// to add a new user to the db

export async function signup(userData) {
    // delegate the network request code to the users-api module
    // which will ultimately return a JSON Web Token(JWT)
    const token = await usersAPI.signup(userData);
    console.log(token);
    // for now we wil console.log the token to see that it exists and return
    //the name and the email was sent to us
    // we will also eventually send the token to local storage
    localStorage.setItem('token', token);
    return (getUser());
}

export function getToken() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    // Obtain the payload of the token
    const payload = JSON.parse(atob(token.split('.')[1]));
    //check the expiration
    //A JWT's expiration is expressed in milliseconds not seconds
    // so we need to multiply by 1000
    if (payload.exp < Date.now() / 1000) {
        //Token has expired so we will remove it from local storage
        localStorage.removeItem('token');
        return null;
    }
    return token;

}

export function getUser() {
    const token = getToken();
    // if there is a token, return the user in the payload otherwise return null
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}


export function logOut() {
    localStorage.removeItem('token');
}

export async function login(credentials) {
  
        const token = await usersAPI.login(credentials);
        //persists the token in local storage
        localStorage.setItem('token', token);
        console.log(token);
        return getUser();
    }


export default {login}