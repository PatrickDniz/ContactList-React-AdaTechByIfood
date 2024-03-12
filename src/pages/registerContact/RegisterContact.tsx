
import { useForm } from 'react-hook-form';
interface Telephone {
  tipo: string;
  numero: string;
}

interface Address {
  logradouro: string;
  cidade: string;
  estado: string;
  cep: string;
  pais: string;
}

interface Data {
  nome: string;
  apelido?: string;
  email?: string;
  foto?: string;
  telefones?: Telephone[];
  endereco?: Address;
}

const RegisterContact = () => {

  const { register, handleSubmit } = useForm<Data>();

  const onSubmit = (formData: Data) => {
    console.log(formData); 
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Meu Formulário</h1>
  
      <input {...register('nome')} placeholder="Nome" />
      <input {...register('apelido')} placeholder="Apelido" />
      <input {...register('email')} placeholder="Email" />

      <input type="submit" value="Enviar" />
    </form>
  );
};

export { RegisterContact } 