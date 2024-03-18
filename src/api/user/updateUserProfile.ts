import { api } from '@/lib/axios'
import { getToken } from '@/hooks/useAuthToken'

export interface User {
  id: string
  nome?: string
  email?: string
  senha?: string
  foto?: string
}

export interface UpdateUserResponse {
  data: User
  status: number
}

export async function updateUserProfile(
  data: User,
): Promise<UpdateUserResponse> {
  const token = getToken()
  const response = await api.patch(`/user`, data, {
    headers: {
      Authorization: token,
    },
  })
  return response.data.data
}
