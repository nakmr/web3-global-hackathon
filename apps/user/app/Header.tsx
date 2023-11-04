import { Box, Flex, Heading, Button } from "./common/components"
import NextLink from "next/link"

export default function Header() {
  return (
    <Flex
      bg="white"
      color="grey.600"
      minH={"60px"}
      py={{ base: 2 }}
      px={{ base: 4 }}
      borderBottom={1}
      borderStyle="solid"
      borderColor="gray.200"
      align="center"
    >
      <Flex flex={1} justify="space-between" maxW="5xl" mx="auto">
        <Heading as="h1" size="lg">
          <NextLink href="/">Attestation App by Tokyo Torch</NextLink>
        </Heading>
        <Button
          as={NextLink}
          fontSize="sm"
          fontWeight={600}
          color="white"
          bg="orange.400"
          href="/articles/new"
          _hover={{
            bg: "orange.300",
          }}
        >
          Write an article
        </Button>
      </Flex>
    </Flex>
  )
}
