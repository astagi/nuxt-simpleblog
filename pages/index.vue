<template>
  <section class="section">
    <div class="columns is-mobile">

      <div
        v-for="post in posts" :key="post.slug"
      >
        <h2>{{post.title}}</h2>
        <nuxt-link :to="{name: 'blog-slug', params:{slug: post.slug}}">Read more...</nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import Card from '~/components/Card'

export default {
  name: 'HomePage',
  data () {
    posts: []
  },
  components: {
    Card
  },

  async asyncData ({ app, $axios, $payloadURL, route }) {
    if(process.static && process.client && $payloadURL) {
      return await $axios.$get($payloadURL(route))
    }
    const postsData = await app.$blogClient.getAllPosts();
    return {posts: postsData.data.simplePosts}
  }
}
</script>
