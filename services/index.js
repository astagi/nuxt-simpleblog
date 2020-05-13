import { createApolloFetch } from 'apollo-fetch'

export default class BlogClient {

  constructor () {
    this.apolloFetch = createApolloFetch({ uri: process.env.BACKEND_ENDPOINT });
  }

  getAllPostsHead () {
    const allPostsQuery = `
      query allSimplePosts {
        simplePosts {
          slug
          title
        }
      }
    `
    return this.apolloFetch({
      query: allPostsQuery
    })
  }


  getAllPosts () {
    const allPostsQuery = `
      query allSimplePosts {
        simplePosts {
          slug
          title
          content
        }
      }
    `
    return this.apolloFetch({
      query: allPostsQuery
    })
  }

  getSinglePost(slug) {
    const simplePostQuery = `
      query singlePost($slug: String) {
        simplePosts (where: {slug: $slug}) {
          title
          content
        }
      }
    `
    return this.apolloFetch({
      query: simplePostQuery,
      variables: {
        slug
      }
    })
  }

}
