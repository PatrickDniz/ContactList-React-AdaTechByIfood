
import { Button } from "@/components/ui/button"
import { useForm } from 'react-hook-form';
import { BsPersonAdd } from 'react-icons/bs';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Telephone {
  tipo?: string;
  numero?: string;
}

interface Address {
  logradouro?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  pais?: string;
}

interface Data {
  nome: string;
  stack: string;
  email: string;
  foto: string;
  telefones: Telephone[];
  endereco?: Address;
}

interface ModalProps {
 
}

const ModalRegister: React.FC<ModalProps> = () => {
  const { register, handleSubmit } = useForm<Data>();

  const onSubmit = (formData: Data) => {
    console.log(formData); 
  };


  return (
    <>
    <Dialog>
      <DialogTrigger>
        <Button className="fixed bottom-8 right-8 cursor-pointer text-4xl text-foreground hover:text-primary sm:text-5xl" variant="link" ><BsPersonAdd/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form className="p-8 rounded-lg" onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Registrar Contato</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="relative z-0">
              <input
                  id="nome"
                  type="nome"
                  className="peer block h-9 w-full appearance-none border-0 border-b-2 border-input bg-transparent px-0 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-0"
                  placeholder=" "
                  {...register('nome')}
                    />
              <label
                  htmlFor="nome"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm font-light leading-none duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary"
                  >
                  Nome
              </label>
              </div>
              <div className="relative z-0">
              <input
                  id="telefones"
                  type="telefones"
                  className="peer block h-9 w-full appearance-none border-0 border-b-2 border-input bg-transparent px-0 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-0"
                  placeholder=" "
                  {...register('telefones')}
                    />
              <label
                  htmlFor="telefones"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm font-light leading-none duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary"
                  >
                  Telefones
              </label>
              </div>
              <div className="relative z-0">
                <input
                  id="email"
                  type="email"
                  className="peer block h-9 w-full appearance-none border-0 border-b-2 border-input bg-transparent px-0 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-0"
                  placeholder=" "
                  {...register('email')}
                    />
                <label
                  htmlFor="email"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm font-light leading-none duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary"
                  >
                  E-mail
                </label>
              </div>
              <div className="relative z-0">
                <input
                  id="stack"
                  type="stack"
                  className="peer block h-9 w-full appearance-none border-0 border-b-2 border-input bg-transparent px-0 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-0"
                  placeholder=" "
                  {...register('stack')}
                    />
                <label
                  htmlFor="stack"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm font-light leading-none duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary"
                  >
                  Stack
                </label>
              </div>
              <div className="relative z-0 top-3">
              <label
                  htmlFor="foto"
                  className="flex items-center text-sm justify-center w-14 h-14 text-primary-foreground rounded-full cursor-pointer bg-primary"
                  >
                  Imagem
                </label>
                <input
                  id="foto"
                  type='file'
                  className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer peer block border-0 border-b-2 border-input bg-transparent px-0 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-0"
                  {...register('foto')}
                    />
              </div>
            </div>
          <DialogFooter>
            <Button type="submit">Registrar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
    </>
  );
};

export { ModalRegister } 