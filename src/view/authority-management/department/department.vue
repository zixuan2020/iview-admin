<template>
  <Card dis-hover style="width:100%;height: 99%">
    <Row>
      <Table stripe :loading = "loading"
             :showHeader = false
             border
             :columns = "listcolumns"
             :data = "listauth"
             style = "overflow-y: hidden;max-height: 522px;" > </Table>
    </Row>
  </Card>
</template>

<script>
import {expandRow} from '@/components/authtable-expand'

export default {
  data () {
    return {
      listcolumns: [
        {
          title: '序号',
          key: '_index',
          className: 'index_css',
          render: (h, params) => {
            return h('div', [h('span', {
              style: {
                display: 'inline-block',
                width: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                textAlign: 'center'
              }
            },
            params.row._index)])
          }
        },
        {
          // 添加的expand
          type: 'expand',
          width: 20,
          render: (h, params) => {
            return h(expandRow, {
              style: {
                padding: 0
              },
              props: {
                row: params.row
              }
            })
          }
        },
        {
          title: '权限名称',
          key: 'Title',
          className: 'Title_css',
          ellipsis: true,
          render: (h, params) => {
            return h('div', [h('span', {
              style: {

                display: 'inline-block',
                width: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }
            },
            params.row.Title)])
          }
        }
      ],
      listauth: [
        {
          'Title': 'AA'

        },
        {
          'Title': 'BB'
        }
      ]
    }
  },
  mounted () {},
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

<style scoped>
  .expand-row {
    margin-bottom: 16px;
  }
</style>
