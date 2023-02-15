import { fireEvent, screen } from '@testing-library/react';
import store from 'Containers/App/store';
import { renderWithProviders } from 'Testing/TestingUtils';
import Login from './Login';
import { logout } from './LoginSlice';

describe('Login component', () => {

    afterEach(()=>{
        store.dispatch(logout());
    });

    it('logs in', ()=>{
        const expected = true;
    
        login();

        const actual = store.getState().login.authenticated;
        expect(actual).toEqual(expected);
    });
});

function login() {
    renderWithProviders(<Login />);
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
}

