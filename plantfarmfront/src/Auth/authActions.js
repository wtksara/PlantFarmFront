import {AUTH_REQ,
        AUTH_SUCCESS,
        AUTH_FAILURE} 
        from './authTypes';

// Próba uwierzytelnienia
export const authenticate=()=>{
    return {
        type:AUTH_REQ
    }
}

// Udane uwierzytelnienie 
export const authSuccess= (content)=>{
    // Przechowywanie tokenu lokalnie na komputerze użytkownika
    localStorage.setItem('USER_KEY', content.token);
    return {
        type: AUTH_SUCCESS,
        payload:content
    }
}
// Nieudane uwierzytelnienie 
export const authFailure=(error)=>{
    return {
        type: AUTH_FAILURE,
        payload:error
    }
}