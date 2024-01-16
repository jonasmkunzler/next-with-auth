'use client'
import SignOut from "../components/SignOut";
import { useSession } from 'next-auth/react'

const dashboard = () => {
    const { data:session } = useSession()
  return (
    <div>
        <h1>Dashboard</h1>
        <p>Hi {session?.user?.email}</p>
        <SignOut />
    </div>
  )
}

export default dashboard