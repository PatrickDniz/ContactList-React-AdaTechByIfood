import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { getUser } from '@/api/user/getUser'
import { signOut } from '@/api/auth/signOut'
import { LuSun, LuMoon } from 'react-icons/lu'
import { useTheme } from './theme/ThemeProvider'
import { Button } from './ui/button'
import { z } from 'zod'
import { useState } from 'react'
import Resizer from 'react-image-file-resizer'
import { ImSpinner2 } from 'react-icons/im'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { updateUserProfile } from '@/api/user/updateUserProfile'

const userFormSchema = z.object({
  nome: z.string().optional(),
  email: z.string().optional(),
  senha: z.string().optional(),
  foto: z.string().optional(),
})

type UserForm = z.infer<typeof userFormSchema>

const MenuUser = () => {
  const { setTheme } = useTheme()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [fotoBase64, setFotoBase64] = useState<string | undefined>(undefined)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const initialValues: UserForm = {
    nome: '',
    email: '',
    senha: '',
    foto: '',
  }

  const form = useForm<UserForm>({
    resolver: zodResolver(userFormSchema),
    defaultValues: initialValues,
    mode: 'onChange',
  })

  const { mutateAsync: updateUserProfileFn } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
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
  async function onSubmit(data: UserForm) {
    try {
      setIsLoading(true)
      await updateUserProfileFn({ ...data, foto: fotoBase64 })
      form.reset()
      toast.success('Dados atualizados com sucesso!')
    } catch (error) {
      toast.error('Erro ao atualizar dados')
    } finally {
      setIsLoading(false)
    }
  }

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    staleTime: Infinity,
  })

  const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      navigate('/sign-in', { replace: true })
    },
  })
  return (
    <>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>{user?.foto && <AvatarImage src={user.foto} />}</Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Conta</DropdownMenuLabel>
            {isLoadingUser ? (
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-2 w-24" />
              </div>
            ) : (
              <>
                <DropdownMenuItem>
                  <span>{user?.nome}</span>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <span className="text-xs font-normal text-muted-foreground">
                    {user?.email}
                  </span>
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <DialogTrigger>
                  <span>Gerenciar Conta</span>
                </DialogTrigger>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <span>Tema Dark/Light</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => setTheme('dark')}>
                      <LuSun className="mr-2 h-4 w-4" />
                      <span>Dark</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme('light')}>
                      <LuMoon className="mr-2 h-4 w-4" />
                      <span>Light</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span>Ajuda</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              asChild
              disabled={isSigningOut}
              className="text-rose-500 dark:text-rose-400"
            >
              <button className="w-full" onClick={() => signOutFn()}>
                <span>Sair</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent className="w-11/12 sm:max-w-[500px]">
          <Form {...form}>
            <form
              className="rounded-md p-2 sm:p-8"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <DialogHeader>
                <DialogTitle className="my-4">Conta</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex items-center gap-4">
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
                        <FormLabel className="cursor-pointer">
                          <Avatar>
                            {user?.foto && <AvatarImage src={user.foto} />}
                          </Avatar>
                        </FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                      <FormItem className="grow">
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
                </div>
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
                  name="senha"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative z-0">
                        <FormControl>
                          <input
                            type="password"
                            className="peer block h-9 w-full appearance-none border-0 border-b-2 border-input bg-transparent px-0 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-0"
                            placeholder=" "
                            {...field}
                          />
                        </FormControl>
                        <FormLabel className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm font-light leading-none duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary">
                          Senha
                        </FormLabel>
                      </div>
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
                    Atualizar conta
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

export { MenuUser }
