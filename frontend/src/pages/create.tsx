import Layout from '@/components/Layout'
import { useAddTestMutation } from '@/types/graphql'
import { useState } from 'react'

interface FormData {
  text: string
}

export default function ReadPage() {
  const [text, setText] = useState('')
  const [createTest] = useAddTestMutation()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createTest({ variables: { text: text } })
  }
  const handleChangeText = (e: any) => {
    setText(e.target.value)
  }
  return (
    <Layout title="Create">
      <form onSubmit={handleSubmit}>
        <input
          className="border"
          type="text"
          onChange={handleChangeText}
          name="text"
          required
          placeholder="Placeholder"
        />
        <button type="submit">Envoyer</button>
      </form>
    </Layout>
  )
}
