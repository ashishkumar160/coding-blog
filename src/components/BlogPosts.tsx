import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import { BlogpostsQuery } from "../graphqlTypes"
import { RichText } from "prismic-reactjs"
import linkResolver from "../utils/linkResolver"

const BlogPosts: React.FC = () => {
  const data: BlogpostsQuery = useStaticQuery(graphql`
    query blogposts {
      prismic {
        allBlog_posts(sortBy: meta_firstPublicationDate_DESC) {
          edges {
            node {
              _meta {
                id
                uid
                type
                firstPublicationDate
              }
              question
            }
          }
        }
      }
    }
  `)
  if (!data) return null
  return (
    <ul>
      {data.prismic!.allBlog_posts.edges!.map(post => {
        return (
          <li key={post!.node._meta.id}>
            <Link to={linkResolver(post!.node._meta)}>
              {RichText.asText(post!.node.question)}
            </Link>
            <p>
              <time>
                {new Date(
                  post!.node._meta.firstPublicationDate
                ).toLocaleDateString()}
              </time>
            </p>
          </li>
        )
      })}
    </ul>
  )
}

export default BlogPosts
