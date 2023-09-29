import React from 'react';
import { mocked } from 'jest-mock';
import { fireEvent, render, screen } from '@testing-library/react';
import { Validator } from '../Validator';
import { ValidationMessage } from '../ValidatorMessage';
import { useApi, ServiceError, ServiceLoading } from '../../../common'

jest.mock('../../../common')
jest.mock('../ValidatorMessage')

describe('<Validator />', () => {
  const token = "3344"
  const mockedRequest = jest.fn()

  beforeEach(() => {
    mocked(useApi).mockReturnValue([{ status: 'IDLE' }, mockedRequest])
  })

  afterEach(() => {
    jest.clearAllMocks()
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

  it('should render error banner if there is a service error', () => {
    const MockedServiceError = <div data-testid="service-error" />
    mocked(useApi).mockReturnValue([{ status: 'ERROR' }, mockedRequest])
    mocked(ServiceError).mockReturnValue(MockedServiceError)

    render(<Validator token={token} />);
    expect(screen.getByTestId('service-error')).toBeInTheDocument()
  });

  it('should render loader if it is calling to validate token', () => {
    const MockedServiceLoading = <div data-testid="service-loading" />
    mocked(useApi).mockReturnValue([{ status: 'LOADING' }, mockedRequest])
    mocked(ServiceLoading).mockReturnValue(MockedServiceLoading)

    render(<Validator token={token} />);
    expect(screen.getByTestId('service-loading')).toBeInTheDocument()
  });

  it('should render token validation result if it is successful to fetch data', () => {
    const MockedValidationMessage = <div data-testid="validation-message" />
    mocked(useApi).mockReturnValue([{ status: 'SUCCESS', data: {valid: true} }, mockedRequest])
    mocked(ValidationMessage).mockReturnValue(MockedValidationMessage)

    render(<Validator token={token} />);
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByTestId('validation-message')).toBeInTheDocument()
  });
})