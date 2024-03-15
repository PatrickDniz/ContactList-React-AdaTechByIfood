import { FC } from 'react'
import { RiContactsBookLine } from 'react-icons/ri'

interface IContactCardProps {}

const EmptyComponent: FC<IContactCardProps> = () => {
  return (
    <div className="flex flex-col items-center">
      <RiContactsBookLine size={100} className=" text-muted" />

      <span className="mt-4 text-center font-bold">
        Você ainda não tem contatos cadastrados.
      </span>
      <span className="text-center text-sm">
        Adicione contatos para manter sua lista organizada.
      </span>
    </div>
  )
}

export { EmptyComponent }
