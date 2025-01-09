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
    return ({name: userData.name, email: userData.email});
}