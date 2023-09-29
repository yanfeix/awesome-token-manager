import React, { FC, useEffect, useState } from 'react'
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'

const INPUT_DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

interface GeneratorDigitsProps {
  onChange: (digits: string[]) => void
}

export const GeneratorDigits: FC<GeneratorDigitsProps> = ({ onChange }) => {
  const [digitState, setDigitState] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const selectedDigits = Object.keys(digitState).filter(key => digitState[key] === true);
    onChange(selectedDigits)
  }, [digitState])

  const onCheckboxChange = (value: number, checked: boolean) => {
    setDigitState({
      ...digitState,
      [value]: checked
    })
  }

  return (
    <>
      <p>Please select at least 1 digit:</p>
      <FormGroup row>
        {
          INPUT_DIGITS.map((digit, index) => (
            <FormControlLabel
              onChange={(_, checked) => onCheckboxChange(digit, checked)}
              value={digit}
              key={index}
              control={<Checkbox />}
              label={digit}
            />
          ))
        }
      </FormGroup>
    </>
  )
}