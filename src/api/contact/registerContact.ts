import { api } from '@/lib/axios'

interface Telephone {
  tipo?: string
  numero?: string
}

interface Address {
  logradouro?: string
  cidade?: string
  estado?: string
  cep?: string
  pais?: string
}

interface Data {
  nome: string
  stack: string
  email: string
  foto: string
  telefones: Telephone[]
  endereco?: Address
}

export async function registerContact(data: Data): Promise<void> {
  try {
    await api.post(
      '/contact',
      { data },
      { headers: { 'Content-Type': 'application/json' } },
    )
  } catch (error) {
    console.error('Erro ao enviar o post:', error)
  }
}
