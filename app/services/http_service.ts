import axios from 'axios'

export class HttpService {
  static async get<T = any>(url: string, params: object = {}, headers: object = {}): Promise<T> {
    const response = await axios.get<T>(url, {
      params,
      headers,
    })
    return response.data
  }

  static async post<T = any>(url: string, data: object = {}, headers: object = {}): Promise<T> {
    const response = await axios.post<T>(url, data, {
      headers,
    })
    return response.data
  }

  static async put<T = any>(url: string, data: object = {}, headers: object = {}): Promise<T> {
    const response = await axios.put<T>(url, data, {
      headers,
    })
    return response.data
  }

  static async delete<T = any>(url: string, headers: object = {}): Promise<T> {
    const response = await axios.delete<T>(url, {
      headers,
    })
    return response.data
  }
}
