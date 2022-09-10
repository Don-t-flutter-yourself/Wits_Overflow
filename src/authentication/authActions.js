export const signin = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        
        //const firebase = getFirebase();
        getFirebase.signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS' });
        }).catch((err) => {
            dispatch({ type: 'LOGIN_FAILED', err });
        })
    }
}

export const signout = () => {
    return (dispatch, getState, { getFirebase }) => {
        getFirebase.signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS' });
        });
    }
}

export const forgotPassword = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        getFirebase.sendPasswordResetEmail(
            credentials.email
        ).then(() => {
            dispatch({ type: 'EMAIL_SENT' });
        }).catch((err) => {
            dispatch({ type: 'WRONG_EMAIL', err });
        })
    }
}