"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Heading, FormControl, FormLabel, Input, Textarea, Button } from "../../common/components"

export default function CreateArticle() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [isPending, startTransition] = useTransition()

  console.log("Entered! in create page.")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    await fetch("/api/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    })
    setLoading(false)
    router.push("/")
    startTransition(() => {
      router.refresh()
    })
  }

  return (
    <div>
      <Heading mb={4}>Create Article</Heading>

      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />

          <FormLabel>Body</FormLabel>
          <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
          <Button
            type="submit"
            color="white"
            bg="orange.400"
            isLoading={loading || isPending}
            mt={4}
          >
            Create!
          </Button>
        </FormControl>
      </form>
    </div>
  )
}
