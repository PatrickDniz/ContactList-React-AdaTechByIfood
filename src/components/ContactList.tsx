import { useMemo, useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { BsPersonDash } from 'react-icons/bs'

const ContactList = () => {
  const [contacts, setContacts] = useState([])
  const [contactsSize, setContactsSize] = useState('')

  useMemo(() => setContactsSize(contacts.length.toString()), [contacts])

  return (
    <>
      <div className="mx-auto my-4 w-10/12">
        <div className="flex items-center gap-4 text-lg font-semibold text-primary sm:text-xl">
          Contatos
          <span className="rounded-full bg-foreground px-2">
            {contactsSize}
          </span>
        </div>
        <div className="my-4 flex flex-col justify-center gap-2">
          <a className="relative mx-auto flex w-11/12 items-center gap-6 rounded-lg border bg-card p-4 text-card-foreground">
            <span>img</span>
            <div className="flex flex-1 flex-col justify-around text-2xl font-bold">
              <span>contato</span>
              <span>Telefone</span>
            </div>
            <div className="flex flex-col gap-4 text-2xl">
              <div className="cursor-pointer hover:text-primary">
                <FiEdit />
              </div>
              <div className="cursor-pointer hover:text-primary">
                <BsPersonDash />
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  )
}

export { ContactList }
