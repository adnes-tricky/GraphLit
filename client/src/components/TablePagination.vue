<template>
  <Pagination ref="pagination" v-bind="$attrs" :modelValue="currentPage" @update:model-value="$emit('update:model-value', $event)">
    <slot />
  </Pagination>
</template>

<script>
import Pagination from 'v-pagination-3'

export default {
  name: 'MyPagination',
  components: {
    Pagination
  },
  methods: {
    setPage(page) {
      this.$refs.pagination.setPage(page)
    },
    next() {
      this.$refs.pagination.next()
    },
    prev() {
      this.$refs.pagination.prev()
    },
    nextChunk() {
      this.$refs.pagination.nextChunk()
    },
    prevChunk() {
      this.$refs.pagination.prevChunk()
    }
  }
}
</script>
