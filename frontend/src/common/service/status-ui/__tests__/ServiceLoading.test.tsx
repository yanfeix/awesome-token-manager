import React from 'react'
import { render, screen } from '@testing-library/react'
import { ServiceLoading } from '../ServiceLoading'

it('<ServiceLoading /> should render', () => {
  render(<ServiceLoading />)
  expect(screen.getByRole('progressbar')).toBeInTheDocument()
})