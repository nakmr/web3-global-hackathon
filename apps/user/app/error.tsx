"use client" // Error components must be Client components

import { useEffect } from "react"
import { Heading, Button } from "./common/components"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div>
      <Heading mb={4}>Unpredictable error happened</Heading>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  )
}
