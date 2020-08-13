<template>
  <global-footer class="footer custom-render">
    <template v-slot:copyright>
      <a href="http://www.bytter.com" target="_blank">COPYRIGHT (©) 2020 bytter拜特.</a>
    </template>
    <template v-slot:links>
      <a href="http://www.beian.miit.gov.cn/" target="_blank">粤ICP备05105073号-1</a>
    </template>
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  }
}
</script>
