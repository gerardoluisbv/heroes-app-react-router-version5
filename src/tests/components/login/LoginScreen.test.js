import { mount } from 'enzyme';
import React, { useContext } from 'react';
import { AuthContext } from '../../../auth/AuthContext';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { types } from '../../../types/types';


describe('Pruebas en <LoginScreen />', () => {

    const history = {
        replace: jest.fn(),
    }

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }
    
    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <LoginScreen history = { history } />
        </AuthContext.Provider>
    );

    test(' debe mostrarse correctamente ', () => {
        
        expect( wrapper ).toMatchSnapshot();

    });

    test('debe de realizar el dispatch y la navegacion ', () => {

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <LoginScreen history = { history } />
            </AuthContext.Provider>
        );

        const handleClick = wrapper.find('button').prop('onClick'); // busca el boton y ejecuta el evento click
      
        handleClick();

        expect( contextValue.dispatch ).toHaveBeenCalledWith({
            type: types.login,
            payload: {
                name: 'Gerardo'
            }
        });

        expect( history.replace ).toHaveBeenCalledWith('/');

        localStorage.setItem('lastPath','/dc');
        handleClick();

        expect( history.replace ).toHaveBeenCalledWith('/dc');
        

        
    })
    
    

})
