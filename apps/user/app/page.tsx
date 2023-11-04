import { Heading } from "@chakra-ui/react"
import type { Article } from "./types"
import ArticleList from "./components/ArticleList"
import { ethers } from "ethers"
import dynamic from "next/dynamic"

// AttestationはSSRできないので、dynamic importでSSRを無効にする
const ClientSideOnlyComponent = dynamic(() => import("./components/Attestations"), {
  ssr: false,
})

async function getArticles() {
  const res = await fetch("http://localhost:3000/api/articles", {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch articles")
  }

  const data = await res.json()

  return data.articles as Article[]
}

export default async function Home() {
  const articles = await getArticles()

  return (
    <>
      <div>
        <Heading as="h1" mb={4}>
          Attestations
        </Heading>
        <ClientSideOnlyComponent />
        {/* <Attestations /> */}
        {/* <ArticleList articles={articles} /> */}
      </div>
    </>
  )
}
