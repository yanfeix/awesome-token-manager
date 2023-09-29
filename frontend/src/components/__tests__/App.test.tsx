import React from 'react';
import {mocked} from 'jest-mock'
import { render, screen } from '@testing-library/react';
import { Generator } from '../generator';
import { Validator } from '../validator';
import App from '../App';

jest.mock('../Generator')
jest.mock('../Validator')

describe('<App />', () => {
  it('should render Generator and Validator', () => {
    const MockedGenerator = <div data-testid="generator" />
    const MockedValidator = <div data-testid="validator" />
    mocked(Generator).mockReturnValue(MockedGenerator)
    mocked(Validator).mockReturnValue(MockedValidator)
  
    render(<App />);
    expect(screen.getByTestId('generator')).toBeInTheDocument()
    expect(screen.getByTestId('validator')).toBeInTheDocument()
  });
})
