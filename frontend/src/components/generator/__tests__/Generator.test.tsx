import React from 'react';
import { mocked } from 'jest-mock'
import { render, screen } from '@testing-library/react';
import { Generator } from '../Generator';
import { GeneratorDigits } from '../GeneratorDigits'
import { useApi } from '../../../common'

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
})
