<template>
  <div class="menu-wrapper">
    <template v-for="item in routes">
      <div v-if="!item.hidden&&item.children" :key="item.path">
        <router-link
          v-if="(item.children.length===1 && !item.children[0].children && !item.alwaysShow && item.children[0].meta && item.children[0].meta.icon) || (item.root)"
          :to="item.path+'/'+item.children[0].path" :key="item.children[0].name">
          <el-menu-item :index="item.path+'/'+item.children[0].path">
            <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon"
                      :icon-class="item.children[0].meta.icon"></svg-icon>
            <span v-if="item.children[0].meta&&item.children[0].meta.title" slot="title">{{generateTitle(item.children[0].meta.title)}}</span>
          </el-menu-item>
        </router-link>

        <el-submenu v-else :index="item.name||item.path" :key="item.name">
          <template slot="title">
            <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
            <span v-if="item.meta&&item.meta.title">{{generateTitle(item.meta.title)}}</span>
          </template>

          <template v-for="child in item.children">
            <!-- <sidebar-item :is-nest="true" v-if="child.children && child.children.length > 0" :routes="[child]" :key="child.path"></sidebar-item> -->
            <div v-if="!child.hidden" :key="child.path">
              <router-link :to="item.path+'/'+child.path" :key="child.name">
                <el-menu-item :index="item.path+'/'+child.path">
                  <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
                  <span v-if="child.meta&&child.meta.title">{{generateTitle(child.meta.title)}}</span>
                </el-menu-item>
              </router-link>
            </div>
          </template>
        </el-submenu>
      </div>
    </template>
  </div>
</template>

<script>
import { generateTitle } from '@/common/i18n'

export default {
  name: 'layoutSidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    generateTitle
  },
  created () {
  }
}
</script>
