import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { REGISTER } from '@/requests/mutations/auth.mutations'
import {
  InputRegister,
  RegisterMutation,
  RegisterMutationVariables,
} from '@/types/graphql'
import { useToast } from '@/components/ui/use-toast'

export default function Register() {
  const router = useRouter()
  const { toast } = useToast()

  const [register, { error }] = useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(REGISTER, {
    onCompleted: (data) => {
      console.log(data)
      router.push('/auth/login')
    },
    onError(error) {
      console.log(error)
    },
  })
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData) as InputRegister
    if (data.email && data.password) {
      register({
        variables: { infos: { email: data.email, password: data.password } },
      })
    }
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Créer un compte</CardTitle>
        <CardDescription>
          Entrer votre email pour créer un compte
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="text-"
              type="email"
              name="email"
              placeholder="name@example.com"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" type="password" name="password" />
          </div>
          <Button
            type="submit"
            className="w-full bg-primary"
            onClick={() => {
              console.log('Inscription')
            }}
          >
            Créer un compte
          </Button>
          <div>
            <span className="text-red-500">{error?.message}</span>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
