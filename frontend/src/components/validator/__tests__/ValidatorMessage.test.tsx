import React from 'react';
import { render, screen } from '@testing-library/react';
import { ValidationMessage } from '../ValidatorMessage';

describe('<ValidationMessage />', () => {
  const token = "3344"
  it('should render invalid message', () => {
    render(<ValidationMessage valid={false} token={token} />)
    expect(screen.getByText(/3344 is NOT a valid Luhn token!/)).toBeInTheDocument()
  })

  it('should render valid message', () => {
    render(<ValidationMessage valid token={token} />)
    expect(screen.getByText(/3344 is a valid Luhn token!/)).toBeInTheDocument()
  })
})