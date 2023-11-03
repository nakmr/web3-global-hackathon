import { Heading, Button } from "../common/components"
import NextLink from "next/link"

export default function NotFound() {
  return (
    <div>
      <Heading mb={4}>Sorry... Couldn't find out the requested article.</Heading>
      <Button as={NextLink} href="/">
        Back to Top
      </Button>
    </div>
  )
}
