import { ContactList } from '@/components/ContactList'
import { api } from '@/lib/axios'
import { isAxiosError } from 'axios'
import { useEffect } from 'react'
import { BsPersonLinesFill, BsPersonAdd } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

const Contacts = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status
          const code = error.response?.data.code

          if (status === 401 && code === 'UNAUTHORIZED') {
            navigate('/sign-in', { replace: true })
          } else {
            throw error
          }
        }
      },
    )

    return () => {
      api.interceptors.response.eject(interceptor)
    }
  }, [navigate])

  const handleAddContact = () => {
    console.log('adicionar')
  }

  return (
    <>
      <div className="w-100 flex items-center justify-center gap-4 bg-secondary py-8 text-2xl font-bold text-primary sm:text-4xl ">
        <BsPersonLinesFill /> Meus Contatos
      </div>
      <div className="search"></div>
      <ContactList />
      <button
        className="absolute bottom-8 right-8 cursor-pointer text-4xl text-foreground hover:text-primary sm:text-6xl"
        onClick={handleAddContact}
      >
        <BsPersonAdd />
      </button>
    </>
  )
}

export { Contacts }
