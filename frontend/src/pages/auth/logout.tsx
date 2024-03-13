import { LOGOUT } from '@/requests/queries/auth.queries'
import { useQuery } from '@apollo/client'
import { LogoutQuery, LogoutQueryVariables } from '@/types/graphql'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/router'

function Logout() {
  const { loading } = useQuery<LogoutQuery, LogoutQueryVariables>(LOGOUT)

  const router = useRouter()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {loading ? 'Veuillez patienter...' : 'Vous êtes déconnectés.'}

      <Button
        variant="outline"
        onClick={() => {
          router.push('/auth/login')
        }}
      >
        Connexion
      </Button>
    </main>
  )
}

export default Logout
