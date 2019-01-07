<template>
  <div>
    {{ count }}
    <button @click="increment">自增</button>
  </div>
</template>

<script lang="ts">
export default {
  data () {
    return {
      count: 0
    }
  },

  methods: {
    increment () {
      this.count++
    }
  }
}
</script>