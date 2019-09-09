<template>
  <el-dialog :title="title" :visible.sync="visible" :show="show" :close-on-click-modal="false"
  @close="$emit('update:show', false)">
    <h3>This is content</h3>
  </el-dialog>
</template>

<script>
export default {
  name: 'demo-dialog',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '新建'
    }
  },
  data () {
    return {
      visible: this.show
    }
  },
  watch: {
    show () {
      this.visible = this.show
    }
  }
}
</script>

<style scoped>

</style>
