<template>
  <section class="section">
    <div class="is-mobile">
      <div>
        <h2>{{post.title}}</h2>
        <vue-markdown>{{post.content}}</vue-markdown>
      </div>
    </div>
  </section>
</template>

<script>
import Card from '~/components/Card'

export default {
  name: 'BlogPost',
  data () {
    post: undefined
  },
  components: {
    Card
  },
  head() {
    return {
      title: this.post.title,
      meta: [
        { hid: 'og:title', name: 'og:title', content: this.post.title },
      ],
    }
  },
  async asyncData ({ app, payload, $axios, $payloadURL, route }) {
    if (payload) {
      return {post: payload}
    }
    if(process.static && process.client && $payloadURL) {
      return await $axios.$get($payloadURL(route))
    }
    const postsData = await app.$blogClient.getSinglePost(route.params.slug);
    return {post: postsData.data.simplePosts[0]}
  }
}
</script>
