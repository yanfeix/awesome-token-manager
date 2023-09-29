import React, { FC, useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { Stack } from '@mui/system';
import { useApi, ServiceError, ServiceLoading } from '../../common';
import { GeneratorResponse } from './types';
import { GeneratorDigits } from './GeneratorDigits';

interface GeneratorProps {
  onGenerated: (token: string) => void
}

export const Generator: FC<GeneratorProps> = ({ onGenerated }) => {
  const [selectedDigits, setSelectedDigits] = useState<string[]>([]);
  const [{ data, status: serviceStatus }, request] = useApi<GeneratorResponse>();

  const disabled = selectedDigits.length === 0 || serviceStatus === 'LOADING';

  useEffect(() => {
    if (data) {
      onGenerated(data.token)
    }
  }, [data])

  const onDigitsChange = (digits: string[]) => {
    setSelectedDigits(digits);
  }

  const onGenerateButtonClick = () => {
    const payload = {
      digits: selectedDigits
    }
    request('/api/generator/tokens', { method: 'POST', body: JSON.stringify(payload) })
  }

  return (
    <Stack spacing={2}>
      <GeneratorDigits onChange={onDigitsChange} />
      <Button variant='contained' disabled={disabled} onClick={onGenerateButtonClick}>Generate Token</Button>
      {serviceStatus === 'ERROR' && <ServiceError />}
      {serviceStatus === 'LOADING' && <ServiceLoading />}
      {serviceStatus === 'SUCCESS' && <p>Generated Token: {data?.token}</p>}
    </Stack>
  )
}