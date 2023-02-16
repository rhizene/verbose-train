import { screen } from '@testing-library/react';
import resume from 'Components/Home/resume';
import { authenticate } from 'Components/Login/LoginSlice';
import store from 'Containers/App/store';
import { act } from 'react-dom/test-utils';
import { renderWithProviders } from 'Testing/TestingUtils';
import Home from './Home';

describe('Home Container', () => {
  beforeAll(()=>{
    renderWithProviders(<Home />);
    act(()=>store.dispatch(authenticate()));
  });

  it('renders Home', ()=>{
    const name = screen.getByText(resume.name);
    expect(name).toBeInTheDocument();
  })
});
