import { BsPersonDash, BsPersonUp } from 'react-icons/bs'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { useQueryClient } from '@tanstack/react-query'
import { Contato } from '@/api/contact/getAllContacts'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

const ContactCard = ({
  contact,
  onDelete,
}: {
  contact: Contato
  onDelete: (id: string) => void
}) => {
  const queryClient = useQueryClient()

  const handleClickDelete = () => {
    onDelete(contact.id)
    queryClient.invalidateQueries({ queryKey: ['contacts'] })
  }

  return (
    <>
      <div className="mx-auto flex w-full items-center rounded-md border bg-card p-4 text-card-foreground sm:w-1/2">
        <div className="flex w-1/5 items-center justify-center">
          <Avatar>{contact?.foto && <AvatarImage src={contact.foto} />}</Avatar>
        </div>
        <div className="flex w-3/5 flex-col justify-around">
          <span className="break-words text-lg font-bold">{contact?.nome}</span>
          <div>
            {contact?.telefones?.map((contato, index) => (
              <span key={index} className="break-words text-sm">
                {contato.tipo}: {contato.numero}
              </span>
            ))}
          </div>
          <span className="break-words text-sm">{contact.email}</span>
          <span className="break-words text-sm">{contact.stack}</span>
        </div>
        <div className="flex w-1/5 flex-col items-center justify-center gap-4 text-2xl">
          <div className="cursor-pointer hover:text-primary">
            <BsPersonUp className="h-6 w-6" />
          </div>

          <AlertDialog>
            <AlertDialogTrigger>
              <div className="cursor-pointer hover:text-primary">
                <BsPersonDash className="h-6 w-6" />
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Você deseja excluir este contato?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação não pode ser desfeita. O contato{' '}
                  <strong>{contact?.nome}</strong> será excluído e todos os seus
                  dados serão excluídos do nosso servidor.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleClickDelete}>
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </>
  )
}

export { ContactCard }
