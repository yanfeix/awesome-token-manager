import { Alert } from '@mui/material'
import React, { FC } from 'react'

interface ValidationMessageProps {
  valid: boolean
  token: string
}

export const ValidationMessage: FC<ValidationMessageProps> = ({ valid, token }) => {
  if (valid) {
    return <Alert severity="success">{`${token} is a valid Luhn token!`}</Alert>
  }

  return <Alert severity="warning">{`${token} is NOT a valid Luhn token!`}</Alert>
}