import { ContactList } from '@/components/ContactList'
import { SearchComponent } from '@/components/searchComponent'
import { BsPersonLinesFill, BsPersonAdd } from 'react-icons/bs'

const Contacts = () => {
  const handleAddContact = () => {
    console.log('adicionar')
  }
  return (
    <>
      <div className="w-100 flex items-center justify-center gap-4 bg-secondary py-8 text-2xl font-bold text-primary sm:text-4xl ">
        <BsPersonLinesFill /> Meus Contatos
      </div>
      <SearchComponent />
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
