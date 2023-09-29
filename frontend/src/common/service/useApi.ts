import React, { useState } from 'react';
import { LoadStatus } from './types';

interface ApiResult<T> {
  status: LoadStatus
  data?: T
  error?: unknown
}

export const useApi = <T>(): [ApiResult<T>, (input: RequestInfo, init?: RequestInit) => void] => {
  const [apiState, setApiState] = useState<ApiResult<T>>({
    status: 'IDLE'
  });

  const request = (input: RequestInfo, init?: RequestInit) => {
    setApiState({
      ...apiState, status: 'LOADING'
    })
    fetch(input, {
      headers: new Headers({
        'content-type': 'application/json'
      }),
      ...init
    }
    )
      .then((response: Response) => response.json())
      .then((data: T) => setApiState({ ...apiState, status: 'SUCCESS', data }))
      .catch((error: Error) => setApiState({ ...apiState, status: 'ERROR', error }))
  }

  return [apiState, request]
}