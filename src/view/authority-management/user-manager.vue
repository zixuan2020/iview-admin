<template>
  <div>
    <Card dis-hover style="width:100%;height: 99%">
      <Row class-name="searchBar">
        <Col span="6">
          <Input v-model="value" placeholder="用户名" style="width: 200px" />
        </Col>
        <Col span="3">
          <Button type="primary">查询</Button>
        </Col>
      </Row>

      <Table border :columns="columns" :data="data"></Table>
    </Card>

    <!-- 编辑数据模态框 -->
    <Modal
      v-model="isShowEdit"
      title="Title"
      :loading="isLoading"
      @on-ok="editUser">
      <p>
        <Row class-name="searchBar">
          <Col span="3">ID:</Col>
          <Col span="7">{{editUserObj.id}}</Col>
        </Row>
        <Row class-name="searchBar">
          <Col span="3" style="line-height: 30px">用户名:</Col>
          <Col span="7"><Input clearable v-model="editUserObj.username" placeholder="用户名" style="width: 200px" /></Col>
        </Row>
        <Row class-name="searchBar">
          <Col span="3" style="line-height: 30px">用户名:</Col>
          <Col span="7"><Input clearable v-model="editUserObj.username" placeholder="用户名" style="width: 200px" /></Col>
        </Row>
        <Row class-name="searchBar">
          <Col span="3" style="line-height: 30px">用户名:</Col>
          <Col span="7"><Input clearable v-model="editUserObj.username" placeholder="用户名" style="width: 200px" /></Col>
        </Row>
        <Row class-name="searchBar">
          <Col span="3" style="line-height: 30px">用户名:</Col>
          <Col span="7"><Input clearable v-model="editUserObj.username" placeholder="用户名" style="width: 200px" /></Col>
        </Row>
      </p>
    </Modal>
  </div>

</template>

<script>
import {getUserList} from '@/api/user'

export default {
  name: 'user-manager',
  data () {
    return {
      value: '',
      isShowEdit: false, // 是否显示编辑用户对话框
      isLoading: true, // 是否显示加载
      editUserObj: {
        'id': '',
        'username': '',
        'phone': '',
        'email': '',
        'fullName': ''
      },
      columns: [
        {
          title: 'id',
          key: 'id'
        },
        {
          title: '用户名',
          key: 'username'
        },
        {
          title: '手机号',
          key: 'phone'
        },
        {
          title: '邮箱',
          key: 'email'
        },
        {
          title: '姓名',
          key: 'fullName'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.row)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      data: []
    }
  },
  methods: {
    show (row) {
      this.isShowEdit = true
      this.editUserObj = JSON.parse(JSON.stringify(row))
    },
    // 删除一条用户数据
    remove (index) {
      this.data6.splice(index, 1)
    },
    editUser () {

    }
  },
  mounted () {
    // 数据列表请求
    getUserList().then(({data}) => {
      if (data.code == 200) {
        this.data = data.data.records
      } else {
        this.data = []
      }
    })
  }
}
</script>

<style scoped>
  .searchBar{
    padding: 10px 0 10px 0;
  }
</style>
