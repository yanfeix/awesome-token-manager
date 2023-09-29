import React, { FC, useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { Stack } from '@mui/material'
import { ServiceError, ServiceLoading, useApi, } from '../../common'
import { ValidatorResponse } from './types'
import { ValidationMessage } from './ValidatorMessage'

interface ValidatorProps {
  token: string
}

export const Validator: FC<ValidatorProps> = ({ token }) => {
  const [tokenChanged, setTokenChanged] = useState(false)
  const [{ status: serviceStatus, data }, request] = useApi<ValidatorResponse>();

  useEffect(() => {
    setTokenChanged(true)
  }, [token])

  const onValidateButtonClick = () => {
    setTokenChanged(false)
    request(`/api/validator/tokens/${token}/status`, { method: 'GET' })
  }

  return (
    <Stack spacing={2}>
      <Button variant='outlined' disabled={serviceStatus === 'LOADING' || !token} onClick={onValidateButtonClick}>Validate Token</Button>
      {serviceStatus === 'ERROR' && <ServiceError />}
      {serviceStatus === 'LOADING' && <ServiceLoading />}
      {serviceStatus === 'SUCCESS' && !tokenChanged && data && <ValidationMessage valid={data.valid} token={token} />}
    </Stack>
  )
}

