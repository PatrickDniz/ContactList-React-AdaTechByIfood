import { ContactList } from '@/components/ContactList'
import { SearchComponent } from '@/components/SearchComponent'
import { BsPersonLinesFill } from 'react-icons/bs'
import { ModalRegister } from '@/components/ModalRegister'
import { MenuUser } from '@/components/MenuUser'

const Contacts = () => {
  
  return (
    <>
      <div className="w-100 flex items-center justify-center gap-4 bg-secondary pb-16 pt-8 text-2xl font-bold text-primary sm:text-4xl ">
        <BsPersonLinesFill /> Meus Contatos
        <div className="fixed right-2 sm:right-8">
          <MenuUser />
        </div>
      </div>
      <SearchComponent />
      <div className="search"></div>
      <ContactList />
      <ModalRegister />
    </>
  )
}

export { Contacts }
