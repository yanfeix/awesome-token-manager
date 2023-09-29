import React from 'react';
import { mocked } from 'jest-mock'
import { render, screen } from '@testing-library/react';
import { Generator } from '../Generator';
import { ServiceError, ServiceLoading, useApi } from '../../../common';
import { GeneratorDigits } from '../GeneratorDigits'

jest.mock('../GeneratorDigits')
jest.mock('../../../common')


describe('<Generator />', () => {
  const onGeneratedMock = jest.fn()
  const mockedRequest = jest.fn()

  beforeEach(() => {
    const MockedGeneratorDigits = <div data-testid="generator-digits" />
    mocked(GeneratorDigits).mockReturnValue(MockedGeneratorDigits)
    mocked(useApi).mockReturnValue([{ status: 'IDLE' }, mockedRequest])
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render GeneratorDigits and a disabled button', () => {
    render(<Generator onGenerated={onGeneratedMock} />);
    const button = screen.queryByRole('button')

    expect(screen.getByTestId('generator-digits')).toBeInTheDocument()
    expect(button).toBeInTheDocument()
    expect(button?.innerHTML).toContain('Generate Token')
    expect(button).toBeDisabled()
  });

  it('should render error banner if there is a service error', () => {
    const MockedServiceError = <div data-testid="service-error" />
    mocked(useApi).mockReturnValue([{ status: 'ERROR' }, mockedRequest])
    mocked(ServiceError).mockReturnValue(MockedServiceError)

    render(<Generator onGenerated={onGeneratedMock} />);
    expect(screen.getByTestId('service-error')).toBeInTheDocument()
  });

  it('should render loader if it is fetching data', () => {
    const MockedServiceLoading = <div data-testid="service-loading" />
    mocked(useApi).mockReturnValue([{ status: 'LOADING' }, mockedRequest])
    mocked(ServiceLoading).mockReturnValue(MockedServiceLoading)

    render(<Generator onGenerated={onGeneratedMock} />);
    expect(screen.getByTestId('service-loading')).toBeInTheDocument()
  });

  it('should render token if it is successful to fetch data', () => {
    mocked(useApi).mockReturnValue([{ status: 'SUCCESS', data: {token: '123'} }, mockedRequest])

    render(<Generator onGenerated={onGeneratedMock} />);
    expect(screen.getByText(/Generated Token: 123/)).toBeInTheDocument()
  });
})
