<template>
  <Table stripe :loading="loading" :showHeader=false border :columns="listcolumns" :data="listauth"
         style="overflow-y: hidden;max-height: 522px;"></Table>
</template>

<script>
export default {
  name: 'authtable_expand',
  data () {
    return {
      loading: false,
      listcolumns: [
        // listcolumns暂不展示
      ],
      listauth: []
    }
  },
  mounted () {
  },
  methods: {},
  created () {
    // console.log("authotable_expend created: " + JSON.stringify(this.row.children))
    var object = this.row.children
    console.log('auth expand data:' + JSON.stringify(object))
    this.listauth.splice(0)
    object.forEach(r => {
      this.listauth.push(r)
    })
    // console.log("listauth:" + JSON.stringify(this.listauth))
  }
}
</script>

<style scoped lang="less">
  td.ivu-table-expanded-cell {
    padding: 0;
  }
</style>
