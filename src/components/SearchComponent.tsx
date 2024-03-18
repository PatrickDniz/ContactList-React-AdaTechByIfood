import { Input } from '@/components/ui/input'
import { LuSearch } from 'react-icons/lu'
import { useState } from 'react'
import { getAllContacts, Contato } from '@/api/contact/getAllContacts'
import { useQuery } from '@tanstack/react-query'

interface Props {
  setFilteredContacts: React.Dispatch<React.SetStateAction<Contato[]>>
}

const SearchComponent: React.FC<Props> = ({ setFilteredContacts }) => {
  const [search, setSearch] = useState('')
  const { data: contacts } = useQuery({
    queryKey: ['contacts'],
    queryFn: getAllContacts,
  })

  const filterContactsByName = (contacts: Contato[], query: string) => {
    return contacts.filter((contact) =>
      contact.nome?.toLowerCase().includes(query.toLowerCase()),
    )
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearch(query)
    if (contacts) {
      const filteredContacts = filterContactsByName(contacts, query)
      setFilteredContacts(filteredContacts)
    }
  }

  return (
    <>
      <div className="relative mx-auto mb-6 mt-[-1.5rem] h-9 w-10/12">
        <div className="relative">
          <LuSearch className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="search"
            type="text"
            className="pl-8"
            placeholder="Pesquisar pelo nome"
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>
    </>
  )
}

export { SearchComponent }
