<template>
  <div class="app-breadcrumb">
    平台后台管理系统<span class="breadBtn">{{version}}</span>
  </div>
</template>

<script>
import { generateTitle } from '@/common/i18n'

export default {
  data () {
    return {
      levelList: null,
      version: require('../../../package').version
    }
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    generateTitle,
    getBreadcrumb () {
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      if (first && first.name !== 'core') {
        matched = [{ path: '/core', meta: { title: 'core' } }].concat(
          matched
        )
      }
      this.levelList = matched
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb {
    display: inline-block;
    font-size: 18px;
    line-height: 50px;
    margin-left: 10px;
    color: #ffffff;
    cursor: text;

    .breadBtn {
      background: #84a9fe;
      font-size: 12px;
      padding: 0 10px;
      display: inline-block;
      height: 20px;
      line-height: 20px;
      border-radius: 10px;
      margin-left: 15px;
    }
  }
</style>
