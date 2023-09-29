import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { GeneratorDigits } from '../GeneratorDigits';

describe('<GeneratorDigits />', () => {
  const onDigitsChange = jest.fn()

  it('should render checkbox with value from 0 to 9', () => {
    render(<GeneratorDigits onChange={onDigitsChange} />);
    const checkboxList = screen.getAllByRole('checkbox');
    expect(checkboxList.length).toEqual(10)
    checkboxList.forEach((checkbox, index) => {
      expect(checkbox.getAttribute('value')).toBe(String(index))
    })
  });

  it('should raise onChange if checkbox state is changed', () => {
    render(<GeneratorDigits onChange={onDigitsChange} />);
    const checkboxList = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxList[5])
    expect(onDigitsChange).toBeCalledWith(['5'])
  });
})
