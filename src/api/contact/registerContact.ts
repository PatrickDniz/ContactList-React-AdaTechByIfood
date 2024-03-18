import { api } from '@/lib/axios'
import { getToken } from '@/hooks/useAuthToken'

export interface Telefone {
  tipo: 'casa' | 'trabalho' | 'celular'
  numero: string
}

export interface Endereco {
  logradouro: string
  cidade: string
  estado: string
  cep: string
  pais: string
}

export interface ContatoBody {
  nome: string
  stack?: string
  telefones?: Telefone[]
  email?: string
  endereco?: Endereco
  notas?: string
  foto?: string
}

export async function registerContact(contato: ContatoBody) {
  const token = getToken()
  await api.post('/contact', contato, {
    headers: {
      Authorization: `${token}`,
    },
  })
}
