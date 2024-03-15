import { useMemo, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { EmptyComponent } from './EmptyContact'
import { ContactCard } from './ContactCard'

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
          {contacts.length < 1 && <EmptyComponent />}
          {contacts.length >= 1 && contacts.map((contact) => <ContactCard />)}
        </div>
      </div>
    </>
  )
}

export { ContactList }
