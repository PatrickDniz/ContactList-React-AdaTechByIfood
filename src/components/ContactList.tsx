import { useMemo, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { EmptyComponent } from './EmptyContact'
import { ContactCard } from './ContactCard'
import { getAllContacts, Contato } from '@/api/contact/getAllContacts'
import { useQuery } from '@tanstack/react-query'
import { deleteContact } from '@/api/contact/deleteContacts'
import { toast } from 'sonner'
import { SearchComponent } from './SearchComponent'

const ContactList: React.FC = () => {
  const {
    data: contacts,
    isLoading: isLoadingContacts,
    refetch,
  } = useQuery({
    queryKey: ['contacts'],
    queryFn: getAllContacts,
  })

  const [filteredContacts, setFilteredContacts] = useState<Contato[]>([])

  const handleDeleteContact = async (id: string) => {
    try {
      await deleteContact({ idContato: id })
      toast.success('Contato excluído com sucesso!')
      refetch()
    } catch (error) {
      toast.error('Erro ao excluir contato')
    }
  }

  const sortedContacts = useMemo(() => {
    if (!contacts) return []
    return contacts.slice().sort((a, b) => {
      return a.nome && b.nome ? a.nome.localeCompare(b.nome) : 0
    })
  }, [contacts])

  const displayedContacts = useMemo(() => {
    return filteredContacts.length > 0 ? filteredContacts : sortedContacts
  }, [filteredContacts, sortedContacts])

  return (
    <>
      <SearchComponent setFilteredContacts={setFilteredContacts} />
      <div className="mx-auto my-4 w-10/12">
        <div className="relative mt-12 flex items-center gap-4 text-base font-semibold text-primary">
          Contatos
          <span className="rounded-full bg-secondary px-2 text-base text-muted-foreground">
            {filteredContacts.length > 0
              ? filteredContacts.length
              : sortedContacts.length}
          </span>
        </div>
        <Separator className="mb-8 mt-4 bg-border" />
        <div className="my-4 flex flex-col justify-center gap-2">
          {isLoadingContacts ? (
            <p>Carregando contatos...</p>
          ) : displayedContacts.length === 0 ? (
            <EmptyComponent />
          ) : (
            displayedContacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onDelete={handleDeleteContact}
              />
            ))
          )}
        </div>
      </div>
    </>
  )
}

export { ContactList }
