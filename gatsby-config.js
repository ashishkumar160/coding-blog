module.exports = {
  siteMetadata: {
    title: `Coding Blog`,
    description: `A blog focused on coding with actual IDE to test your code.`,
    author: `@ashishkumar160`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-source-prismic-graphql`,
      options: {
        repositoryName: "coding-blog",
        previews: true,
        path: "/preview",
        pages: [
          {
            type: "Blog_post",
            match: "/blog/:uid",
            path: "/blog-preview",
            component: require.resolve("./src/templates/post.tsx"),
          },
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
