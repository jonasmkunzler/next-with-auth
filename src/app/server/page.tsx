import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOption } from '../auth/authOptions'

export default async function ServerPage() {
  const session = await getServerSession(authOption)

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/server')
  }

  return (
    <section className="flex flex-col gap-6">
      <h2>{session.user?.name}</h2>
    </section>
  )
}
