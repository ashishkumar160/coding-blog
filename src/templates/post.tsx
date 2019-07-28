import React from "react"
import { graphql, Link } from "gatsby"
import { BlogPostQuery } from "../graphqlTypes"
import { RichText } from "prismic-reactjs"
import PostSlices from "../components/PostSlices"
import Layout from "../components/Layout"
import SEO from "../components/Layout/seo"

export const query = graphql`
  query BlogPost($uid: String) {
    prismic {
      allBlog_posts(uid: $uid) {
        edges {
          node {
            question
            body {
              ... on PRISMIC_Blog_postBodySolution_text {
                type
                label
                primary {
                  question_text
                }
              }
              ... on PRISMIC_Blog_postBodySolution_code {
                type
                label
                primary {
                  solution_code
                }
              }
            }
            _meta {
              firstPublicationDate
            }
          }
        }
      }
    }
  }
`

interface Props {
  data: BlogPostQuery
}

const BlogPost: React.FC<Props> = ({ data }) => {
  const doc = data.prismic!.allBlog_posts.edges!.slice(0, 1).pop()
  if (!doc) return null
  return (
    <Layout>
      <SEO title={doc.node.question[0].text} />
      <div>
        <Link to="/">
          <span>go back</span>
        </Link>
        <h1>{RichText.asText(doc.node.question)}</h1>
        <span>
          <em>
            {new Date(doc.node._meta.firstPublicationDate).toLocaleDateString()}
          </em>
        </span>
        <PostSlices slices={doc.node.body} />
      </div>
    </Layout>
  )
}

export default BlogPost
