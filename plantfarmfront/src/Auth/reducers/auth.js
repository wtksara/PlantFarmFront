import {AUTH_REQ,
        AUTH_SUCCESS,
        AUTH_FAILURE} 
        from '../authTypes';

// Inclalizacja stanu początkowego
const initialState={
    user:{},
    error:'',
    loading:false
};

// W zależności od rezultatu uwierzytelnienia odpowiednia akcja
const auth=(state=initialState,action)=>{

    switch(action.type){
        case AUTH_REQ:
            return {...state,error:'', loading:true};
        
        case AUTH_SUCCESS:
            const data=action.payload;
            return {...state,error:'', loading:false, user:data};

        case AUTH_FAILURE:
            const error=action.payload;
            return {...state, loading:false, error:error};

        default:
            return state;
    }
}


export default auth;