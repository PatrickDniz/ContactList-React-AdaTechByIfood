import { useMemo, useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { BsPersonDash } from 'react-icons/bs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

const ContactList = () => {
  const [contacts, setContacts] = useState([])
  const [contactsSize, setContactsSize] = useState('')

  useMemo(() => setContactsSize(contacts.length.toString()), [contacts])

  return (
    <>
      <div className="mx-auto my-4 w-10/12">
        <div className="relative mt-12 flex items-center gap-4 text-lg font-semibold text-primary sm:text-xl">
          Contatos
          <span className="rounded-full bg-secondary px-2 text-sm text-muted-foreground sm:text-lg">
            {contactsSize}
          </span>
        </div>
        <Separator className="mb-8 mt-4 bg-border" />
        <div className="my-4 flex flex-col justify-center gap-2">
          <a className="relative mx-auto flex w-11/12 items-center gap-6 rounded-lg border bg-card p-4 text-card-foreground">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-1 flex-col justify-around">
              <span className="text-lg font-bold">Contato</span>
              <span className="text-sm">Telefone</span>
              <span className="text-sm">Email</span>
              <span className="text-sm">Stack</span>
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
