const initState = {
    authError: null
} ;

const authReducer = (state = initState, action) => {
    switch(action.type){
//         case 'LOGIN_FAILED':
//             console.log('failed');
//             return{
//                 ...state,
//                 authError: 'login failed'
//             }
//         case 'LOGIN_SUCCESS':
//             console.log('success');
//             return{
//                 ...state,
//                 authError: null
//             }
        case 'EMAIL_SENT':
            console.log('email sent');
            console.log(state);
            return{
                ...state,
                authError: null
            }
        case 'WRONG_EMAIL':
            console.log('failed');
            return{
                ...state,
                authError: 'rest failed'
            }
//         case 'SIGNOUT_SUCCESS':
//             console.log('signed out !')
//             return state;
        default:
            return state;

    }
}
 
export default authReducer;
