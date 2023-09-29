import React from 'react'
import { render, screen } from '@testing-library/react'
import { ServiceError } from '../ServiceError'

it('<ServiceError /> should render', () => {
  render(<ServiceError />)
  expect(screen.getByText(/Something is wrong in the service !/)).toBeInTheDocument()
})