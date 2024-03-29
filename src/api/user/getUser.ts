import { api } from '@/lib/axios'
import { getToken } from '@/hooks/useAuthToken'

export interface User {
  id: string
  nome?: string
  email?: string
  senha?: string
  foto?: string
}

export interface GetUserResponse {
  data: User
  status: number
}

export async function getUser() {
  const token = getToken()
  const response = await api.get<GetUserResponse>('/user', {
    headers: {
      Authorization: `${token}`,
    },
  })
  return response.data.data
}
