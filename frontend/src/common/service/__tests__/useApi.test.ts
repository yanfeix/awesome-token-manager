import React from "react";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useApi } from "../useApi";


describe('useApi', () => {
  type T = {
    name: string
  }

  const mockedResponse = {
    name: 'Jack'
  }
  

  const url = '/api/v1'

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockedResponse)
    } as unknown as Response);
  })
  
  afterEach(() => {
    jest.clearAllMocks()
  });

  it('should initialize IDLE state', () => {
    const { result} = renderHook(() => useApi<T>())
    expect(result.current[0]).toEqual({
      status: 'IDLE'
    })
  });

  it('should call target endpoint', async () => {
    const { result } = renderHook(() => useApi<T>())
    const url = '/api/v1'

    act(() => {
      result.current[1](url)
    })
    
    expect(fetch).toBeCalledWith(url,{"headers": {"map": {"content-type": "application/json"}}})
  })

  it('should set LOADING / SUCCESS state', async () => {
    const { result } = renderHook(() => useApi<T>())

    act(() => {
      result.current[1](url)
    })

    expect(result.current[0]).toEqual({
      status: 'LOADING',
    })

    await waitFor(() => {
      expect(result.current[0]).toEqual({
        status: 'SUCCESS',
        data: mockedResponse
      })
    })
  })

  it('should set LOADING / ERROR state', async () => {
    const mockedError = {message: 'error'}
    jest.spyOn(global, 'fetch').mockRejectedValue(mockedError as unknown as Response);

    const { result } = renderHook(() => useApi<T>())

    act(() => {
      result.current[1](url)
    })

    expect(result.current[0]).toEqual({
      status: 'LOADING',
    })

    await waitFor(() => {
      expect(result.current[0]).toEqual({
        status: 'ERROR',
        error: mockedError
        
      })
    })
  })

})