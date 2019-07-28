import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import { RichText } from "prismic-reactjs"
import { IndexQuery } from "../graphqlTypes"
import BlogPosts from "../components/BlogPosts"
import SEO from "../components/Layout/seo"

export const query = graphql`
  query index {
    prismic {
      allBlog_homes {
        edges {
          node {
            headline
            description
            image
          }
        }
      }
    }
  }
`

interface Props {
  data: IndexQuery
}

const IndexPage: React.FC<Props> = ({ data }) => {
  const doc = data.prismic!.allBlog_homes.edges!.slice(0, 1).pop()
  if (!doc) return null
  return (
    <Layout>
      <SEO title="Home" />
      <div>
        <img src={doc.node.image.url} alt="avatar image" />
        <h1>{RichText.asText(doc.node.headline)}</h1>
        <p>{RichText.asText(doc.node.description)}</p>
      </div>
      <BlogPosts />
    </Layout>
  )
}

export default IndexPage
