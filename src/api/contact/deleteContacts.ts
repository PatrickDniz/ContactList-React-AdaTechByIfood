import { api } from '@/lib/axios'
import { getToken } from '@/hooks/useAuthToken'

export interface DeleteContactBody {
  idContato: string
}
export interface DeleteContactResponse {
  data: {
    sucesso: boolean
    msg: string
  }
}

export async function deleteContact({ idContato }: DeleteContactBody) {
  const token = getToken()
  const response = await api.delete<DeleteContactResponse>('/contact', {
    data: { idContato },
    headers: { Authorization: token },
  })
  return response.data.data
}
