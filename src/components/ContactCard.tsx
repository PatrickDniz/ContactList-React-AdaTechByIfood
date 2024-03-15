import { FC } from 'react'
import { BsPersonDash } from 'react-icons/bs'
import { FiEdit } from 'react-icons/fi'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

interface IContactCardProps {
  nome: string
  telefone: string
  email: string
  stack: string
}

const ContactCard: FC<IContactCardProps> = ({
  nome,
  telefone,
  email,
  stack,
}) => {
  return (
    <div className="flex w-full items-center rounded-lg border bg-card p-4 text-card-foreground">
      <div className="flex w-1/5 items-center justify-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex w-3/5 flex-col justify-around">
        <span className="break-words text-lg font-bold">{nome}</span>
        <span className="break-words text-sm">{telefone}</span>
        <span className="break-words text-sm">{email}</span>
        <span className="break-words text-sm">{stack}</span>
      </div>
      <div className=" jutify-center flex w-1/5 flex-col items-center gap-4 text-2xl">
        <div className="cursor-pointer hover:text-primary">
          <FiEdit />
        </div>
        <div className="cursor-pointer hover:text-primary">
          <BsPersonDash />
        </div>
      </div>
    </div>
  )
}

export { ContactCard }
