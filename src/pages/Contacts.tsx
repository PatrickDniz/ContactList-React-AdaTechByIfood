import { ContactList } from '@/components/ContactList'
import { SearchComponent } from '@/components/searchComponent'
import { BsPersonLinesFill } from 'react-icons/bs'
import { ModalRegister } from '@/components/ModalRegister'
import { MenuUser } from '@/components/MenuUser'

const Contacts = () => {
  const handleAddContact = () => {
    console.log('adicionar')
  }

  return (
    <>
      <div className="w-100 flex items-center justify-center gap-4 bg-secondary py-8 text-2xl font-bold text-primary sm:text-4xl ">
        <BsPersonLinesFill /> Meus Contatos
        <MenuUser />
      </div>
      <SearchComponent />
      <div className="search"></div>
      <ContactList />
      <ModalRegister />
    </>
  )
}

export { Contacts }
