import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { BsPersonAdd } from 'react-icons/bs'
import { useState } from 'react'
import { registerContact } from '@/api/contact/registerContact'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { z } from 'zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { ImSpinner2 } from 'react-icons/im'
import Resizer from 'react-image-file-resizer'

const contactFormSchema = z.object({
  nome: z
    .string()
    .min(3, { message: 'O nome deve conter pelo menos 3 caracteres' }),
  telefones: z
    .array(
      z.object({
        tipo: z.enum(['celular', 'trabalho', 'casa']),
        numero: z.string(),
      }),
    )
    .optional(),
  email: z.string().optional(),
  stack: z.string().optional(),
  foto: z.string().optional(),
})

type ContactForm = z.infer<typeof contactFormSchema>

const initialValues: ContactForm = {
  nome: '',
  telefones: [{ tipo: 'celular', numero: '' }],
  email: '',
  stack: '',
  foto: '',
}

const ModalRegister = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [fotoBase64, setFotoBase64] = useState<string | undefined>(undefined)
  const queryClient = useQueryClient()

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: initialValues,
    mode: 'onChange',
  })

  const { mutateAsync: registerContactFn } = useMutation({
    mutationFn: registerContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] })
    },
  })

  const resizeFile = (file: File): Promise<string> =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        80, // Largura desejada
        80, // Altura desejada
        'JPEG', // Formato de saída
        100, // Qualidade da imagem (0-100)
        0, // Rotação (0 para nenhuma rotação)
        (uri) => {
          resolve(uri as string)
        },
        'base64',
      )
    })

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      resizeFile(file)
        .then((resizedImage) => {
          setFotoBase64(resizedImage)
        })
        .catch((error) => {
          console.error('Erro ao redimensionar a imagem:', error)
        })
    }
  }
  async function onSubmit(data: ContactForm) {
    try {
      setIsLoading(true)
      await registerContactFn({ ...data, foto: fotoBase64 })
      form.reset()
      toast.success('Contato criado com sucesso!')
    } catch (error) {
      toast.error('Erro ao criar contato')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <BsPersonAdd
            type="button"
            className="fixed bottom-8 right-8 z-10 cursor-pointer text-4xl text-foreground hover:text-primary sm:text-5xl"
          />
        </DialogTrigger>
        <DialogContent className="w-11/12 sm:max-w-[500px]">
          <Form {...form}>
            <form
              className="rounded-md p-2 sm:p-8"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <DialogHeader>
                <DialogTitle className="my-4">Adicionar Contato</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative z-0">
                        <FormControl>
                          <input
                            className="peer block h-9 w-full appearance-none border-0 border-b-2 border-input bg-transparent px-0 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-0"
                            placeholder=" "
                            {...field}
                          />
                        </FormControl>
                        <FormLabel className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm font-light leading-none duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary">
                          Nome
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`telefones.${0}.numero`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative z-0">
                        <FormControl>
                          <input
                            className="peer block h-9 w-full appearance-none border-0 border-b-2 border-input bg-transparent px-0 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-0"
                            placeholder=" "
                            {...field}
                          />
                        </FormControl>
                        <FormLabel className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm font-light leading-none duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary">
                          Telefone
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`telefones.${0}.tipo`}
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-3 gap-4"
                    >
                      <FormItem>
                        <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-px text-xs hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                          <FormControl>
                            <RadioGroupItem
                              value="celular"
                              className="peer sr-only"
                            />
                          </FormControl>
                          <span>Celular</span>
                        </FormLabel>
                      </FormItem>
                      <FormItem>
                        <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-px text-xs hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                          <FormControl>
                            <RadioGroupItem
                              value="trabalho"
                              className="peer sr-only"
                            />
                          </FormControl>
                          <span>Trabalho</span>
                        </FormLabel>
                      </FormItem>
                      <FormItem>
                        <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-px text-xs hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                          <FormControl>
                            <RadioGroupItem
                              value="casa"
                              className="peer sr-only"
                            />
                          </FormControl>
                          <span>Casa</span>
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative z-0">
                        <FormControl>
                          <input
                            className="peer block h-9 w-full appearance-none border-0 border-b-2 border-input bg-transparent px-0 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-0"
                            placeholder=" "
                            {...field}
                          />
                        </FormControl>
                        <FormLabel className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm font-light leading-none duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary">
                          Email
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stack"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative z-0">
                        <FormControl>
                          <input
                            className="peer block h-9 w-full appearance-none border-0 border-b-2 border-input bg-transparent px-0 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-0"
                            placeholder=" "
                            {...field}
                          />
                        </FormControl>
                        <FormLabel className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm font-light leading-none duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary">
                          Stack
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="foto"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          placeholder=" "
                          {...field}
                          onChange={handleFileChange}
                        />
                      </FormControl>
                      <FormLabel className="h-10 rounded-md border-muted bg-popover px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                        Adicionar foto
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <ImSpinner2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Adicionar contato
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export { ModalRegister }
