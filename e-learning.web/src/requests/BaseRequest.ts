import { AxiosInstance } from 'axios';
import axiosRequest from '@/utils/axios';

class BaseRequest {
  baseRequest: AxiosInstance;

  constructor() {
    this.baseRequest = axiosRequest;
  }

  async get<T = any>(url = '', config: any = {}, showNotification = true) {
    try {
      const response = await this.baseRequest.get<T>(`${url}`, config);
      return this._responseHandler(response, showNotification);
    } catch (error) {
      return this._errorHandler(error);
    }
  }

  async put<T = any>(url = '', data = {}, config: any = {}, showNotification = true) {
    try {
      const response = await this.baseRequest.put<T>(`${url}`, data, config);
      return this._responseHandler(response, showNotification);
    } catch (error) {
      return this._errorHandler(error);
    }
  }

  async post<T = any>(url = '', data = {}, config: any = {}, showNotification = true) {
    try {
      const response = await this.baseRequest.post<T>(`${url}`, data, config);
      return this._responseHandler(response, showNotification);
    } catch (error) {
      return this._errorHandler(error);
    }
  }

  async delete<T = any>(url = '', config: any = {}, showNotification = true) {
    try {
      const response = await this.baseRequest.delete<T>(`${url}`, config);
      return this._responseHandler(response, showNotification);
    } catch (error) {
      return this._errorHandler(error);
    }
  }

  _responseHandler(response: any, showNotification: boolean) {
    const { status } = response;

    if (status >= 400) {
      if (!showNotification) {
        throw new Error('Request failed');
      }

      throw new Error('Request failed');
    }

    return response;
  }

  _errorHandler(err: any) {
    const errorRes = err.response;
    // if (err.response && err.response.status === 401) { // Unauthorized (session timeout)
    //   window.location.href = '/';
    // }

    if (errorRes && errorRes.status === 401) {
      // Unauthorized (session timeout)
      // Solved the problem in interceptor
    }
    // toast.error(errorRes.data.message || 'Something went wrong');
    throw errorRes.data;
  }
}

export default BaseRequest;
