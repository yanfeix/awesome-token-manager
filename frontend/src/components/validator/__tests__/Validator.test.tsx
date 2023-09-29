import React from 'react';
import { mocked } from 'jest-mock';
import { fireEvent, render, screen } from '@testing-library/react';
import { Validator } from '../Validator';

import { useApi } from '../../../common'

jest.mock('../../../common')

describe('<Validator />', () => {
  const token = "3344"
  const mockedRequest = jest.fn()

  beforeEach(() => {
    mocked(useApi).mockReturnValue([{ status: 'IDLE' }, mockedRequest])
  })

  it('should render a disabled button', () => {
    render(<Validator token={''} />)
    const button = screen.queryByRole('button')
    expect(button).toBeInTheDocument()
    expect(button?.innerHTML).toContain('Validate Token')
    expect(button).toBeDisabled()
  })

  it('should render an enabled button', () => {
    render(<Validator token={token} />)
    const button = screen.queryByRole('button')
    expect(button).toBeInTheDocument()
    expect(button?.innerHTML).toContain('Validate Token')
    expect(button).toBeEnabled()
  })

  it('should call API when the Validate Token button is clicked', () => {
    render(<Validator token={token} />)
    fireEvent.click(screen.getByRole('button'))
    expect(mockedRequest).toBeCalledWith(`/api/validator/tokens/${token}/status`, { method: 'GET' })
  })
})