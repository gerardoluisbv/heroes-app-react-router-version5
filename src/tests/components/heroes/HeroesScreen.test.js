import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { HeroesScreen } from '../../../components/heroes/HeroesScreen';


describe('Pruebas en <HeroesScreen />', () => {

    const history = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn(),
    }

    const wrapper = mount (
        <MemoryRouter initialEntries={['/hero']}>
            <HeroesScreen history = { history } />
        </MemoryRouter>
    );

    test(' debe de mostrar el componente <Redirect /> si no hay argumentos en la URL ', () => {
      
        expect( wrapper.find('Redirect').exists() ).toBe(true);

    });

    test('debe de mostrar un hero si el parametro existe y se encuentra ', () => {
        
        const wrapper = mount (
            <MemoryRouter initialEntries={['/heroes/marvel-cyclops']}>
                <Route path="/heroes/:heroeId" component={ HeroesScreen }/>                
            </MemoryRouter>
        );  

        expect( wrapper.find('HeroesScreen').exists() ).toBe(true); // si fue renderizado el componente HeroesScreen
        expect( wrapper.find('.row').exists() ).toBe(true); // si existe el div con la clase row

    });

    test('debe de regresar a la pantalla anterior con PUSH ', () => {

        const history = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn(),
        }

        const wrapper = mount (
            <MemoryRouter initialEntries={['/heroes/marvel-cyclops']}>
                <Route 
                    path="/heroes/:heroeId" 
                    component={ () => <HeroesScreen history={ history } /> }
                />                
            </MemoryRouter>
        ); 

        wrapper.find('#buttonHeroe').prop('onClick')(); // busca el boton por id y ejecuta el evento click

        expect( history.push ).toHaveBeenLastCalledWith('/');
        expect( history.goBack ).not.toHaveBeenCalled();
        
    });

    test(' debe de regresar a la pantalla anterior con GoBack ', () => {

        const wrapper = mount (
            <MemoryRouter initialEntries={['/heroes/marvel-cyclops']}>
                <Route 
                    path="/heroes/:heroeId" 
                    component={ () => <HeroesScreen history={ history } /> }
                />                
            </MemoryRouter>
        ); 

        wrapper.find('#buttonHeroe').prop('onClick')(); // busca el boton por id y ejecuta el evento click

        expect( history.goBack ).toHaveBeenCalledWith();
        expect( history.push ).toHaveBeenCalledTimes(0); // otra forma de saber si se ha llamado la fn, se llamó 0 veces
        expect( history.push ).not.toHaveBeenCalled();
        
    });

    test('debe de llamar el redirect si el hero no existe ', () => {
        
        const wrapper = mount (
            <MemoryRouter initialEntries={['/heroes/marvel-cyclops866464643']}>
                <Route 
                    path="/heroes/:heroeId" 
                    component={ () => <HeroesScreen history={ history } /> }
                />                
            </MemoryRouter>
        ); 

       expect( wrapper.text() ).toBe('');
    })
    
    
    
    
    

})
