import React, { useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';



export const LoginScreen = ({ history }) => {


     const { dispatch } = useContext( AuthContext );

     const handleLogin = () => {
         //history.push('/');
         //history.replace('/');

         const lastPath = localStorage.getItem('lastPath') || '/';
         
        const user = {
            name: 'Gerardo'
        }

         const action = {
            type: types.login,
            payload: user
        }

        dispatch( action );

        history.replace(lastPath);
//        history.replace('/');
     }

    return (
        <div className="container mt-5">
            
            <h1> Login </h1>
            < hr />

            <button
                className="btn btn-primary"
                onClick={ handleLogin }
            >
                Login
            </button>
        </div>
    )
}
