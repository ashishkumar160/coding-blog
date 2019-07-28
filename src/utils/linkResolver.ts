import { Prismic_Meta } from "../graphqlTypes"

interface LinkResolver {
  uid?: string | null | undefined
  type: string
}

export default function(doc: LinkResolver) {
  if (doc.type === "blog_post") {
    return "/blog/" + doc.uid
  }
  return "/"
}
