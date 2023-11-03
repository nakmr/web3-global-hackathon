import { Container, Box, Text } from "./common/components"

export default function Footer() {
  return (
    <Box bg="gray.50" color="gray.700" as="footer">
      <Container maxW="5xl" py={4}>
        <Text as="small">(c) 2023 kimkim</Text>
      </Container>
    </Box>
  )
}
