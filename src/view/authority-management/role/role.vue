<template>
  <div>
    <Card dis-hover style="width:100%;height: 99%">
      <Row class-name="searchBar">
        <Col span="4">
          <Input v-model="searchRoleName" placeholder="角色名" style="width: 98%"/>
        </Col>

        <Col span="5">
          <span class="operateTable">
            <Button type="primary" @click="searchRole">查询</Button>
          </span>
          <Button type="info" @click="showAddRoleModal">新增</Button>
        </Col>

      </Row>
      <Table border :columns="columns" :data="data"></Table>

      <div>
        <Page @on-change="changePageNumber"
              @on-page-size-change="changePageSize"
              :current="pageNum"
              :total="total" :page-size="pageSize"
              show-sizer

              :styles="{'textAlign': 'center','padding':'10px'}"/>
      </div>

    </Card>

    <!-- 查看数据模态框 -->
    <Modal
      v-model="isLookRole"
      title="查看角色"
      :loading="isLoading"
      @on-ok="editRole">
      <p>
        <Row class-name="searchBar">
          <Col span="3">ID:</Col>
          <Col span="7">{{editRoleObj.id}}</Col>
        </Row>
        <Row class-name="searchBar">
          <Col span="3">角色名称:</Col>
          <Col span="7">{{editRoleObj.roleName}}</Col>
        </Row>
        <Row class-name="searchBar">
          <Col span="3">角色描述:</Col>
          <Col span="7">{{editRoleObj.description}}</Col>
        </Row>
        <Row class-name="searchBar">
          <Col span="3">更新时间:</Col>
          <Col span="7">{{editRoleObj.updateTime}}</Col>
        </Row>
        <Row class-name="searchBar">
          <Col span="3">创建时间:</Col>
          <Col span="7">{{editRoleObj.createTime}}</Col>
        </Row>
      </p>
    </Modal>

    <!-- 编辑数据模态框 -->
    <Modal
      v-model="isShowEdit"
      title="编辑角色"
      :loading="isLoading"
      @on-ok="editRole">
      <p>
        <Row class-name="searchBar">
          <Col span="3">ID:</Col>
          <Col span="7">{{editRoleObj.id}}</Col>
        </Row>
        <Row class-name="searchBar">
          <Col span="3" style="line-height: 30px">角色名称:</Col>
          <Col span="7"><Input clearable v-model="editRoleObj.roleName" placeholder="手机号" style="width: 200px"/></Col>
        </Row>
        <Row class-name="searchBar">
          <Col span="3" style="line-height: 30px">角色描述:</Col>
          <Col span="7"><Input clearable v-model="editRoleObj.description" placeholder="邮箱" style="width: 200px"/></Col>
        </Row>
      </p>
    </Modal>

    <!-- 新增数据模态框 -->
    <Modal
      v-model="isShowAdd"
      title="新增角色"
      :loading="isLoading"
      @on-ok="addRole">
      <p>
        <Row class-name="searchBar">
          <Col span="3" style="line-height: 30px">角色名称:</Col>
          <Col span="7"><Input clearable v-model="editRoleObj.roleName" placeholder="角色名称" style="width: 200px"/></Col>
        </Row>
        <Row class-name="searchBar">
          <Col span="3" style="line-height: 30px">角色描述:</Col>
          <Col span="7"><Input clearable v-model="editRoleObj.description" placeholder="角色描述" style="width: 200px"/></Col>
        </Row>
      </p>
    </Modal>
  </div>
</template>

<script>
import {getRoleList, getRoleByName, updateRole, deleteRole, insertRole} from '@/api/role'

export default {
  name: 'role-manager',
  data () {
    return {
      pageNum: 1, // 当前页数 默认第一页
      pageSize: 10, // 当前页显示的条数
      total: 0, // 总条数
      searchRoleName: '', // username
      isShowEdit: false, // 是否显示编辑用户对话框
      isShowAdd: false, // 是否显示新增用户对话框
      isLookRole: false, // 是否显示新增用户对话框
      isLoading: true, // 是否显示加载

      editRoleObj: {
        'id': '',
        'roleName': '',
        'description': '',
        'updateTime': '',
        'createTime': ''
      },
      columns: [
        {
          title: 'id',
          key: 'id'
        },
        {
          title: '角色名称',
          key: 'roleName'
        },
        {
          title: '角色描述',
          key: 'description'
        },
        {
          title: '操作',
          key: 'action',
          width: 180,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.lookRole(params.row)
                  }
                }
              }, '查看'),
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
                    this.deleteUser(params.row.id)
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
    // 页面切换
    changePageNumber (currentPage) {
      this.pageNum = currentPage
      this.queryRoleData()
    },

    // 更改页面显示的条数
    changePageSize (newPageSize) {
      if (this.total < 10) {
        this.pageSize = 10
      } else {
        this.pageSize = newPageSize
        this.queryRoleData()
      }
    },

    init () {
      this.editRoleObj = {
        'id': '',
        'phone': '',
        'email': '',
        'fullName': ''
      }
    },
    // 校验新增数据
    checkAddUserData () {
      if (this.editRoleObj.username == '') {
        this.$Message.error('用户名不能为空')
        return false
      }

      if (this.editRoleObj.phone == '') {
        this.$Message.error('手机号不能为空')
        return false
      }

      if (this.editRoleObj.email == '') {
        this.$Message.error('邮箱地址不能为空')
        return false
      }

      if (this.editRoleObj.姓名 == '') {
        this.$Message.error('姓名不能为空')
        return false
      }
    },

    // 请求用户数据
    getRoles () {
      // 数据列表请求
      getRoleList().then(({data}) => {
        if (data.code == 200) {
          this.pageNum = data.data.current
          this.total = data.data.total
          this.pageSize = data.data.size
          this.data = data.data.records
        }
      })
    },

    // 查看用户详细数据
    lookRole (role) {
      this.editRoleObj = role
      this.isLookRole = true
    },

    // 搜索用户
    searchRole () {
      if (this.searchRoleName == '') {
        this.$Message.error('角色名不能为空')
        return false
      }
      this.queryRoleData()
      return true
    },

    queryRoleData () {
      getRoleByName(this.pageNum, this.pageSize, this.searchRoleName)
        .then(({data}) => {
          if (data.code == 200) {
            if (data.data.records.length > 0) {
              this.pageNum = data.data.current
              this.total = data.data.total
              this.pageSize = data.data.size
              this.data = data.data.records
              this.$Message.success('数据查询成功')
            } else {
              this.$Message.error('数据查询失败')
            }
          } else {
            this.$Message.error('数据查询失败')
          }
        })
        .catch((err) => {
          this.$Message.error('数据查询失败')
        })
    },

    // 新增用户
    addRole () {
      insertRole(this.editRoleObj)
        .then(({data}) => {
          if (data.code == 200) {
            this.$Message.success('数据插入成功')
          } else {
            this.$Message.error('数据插入失败')
          }
          this.isShowAdd = false
          this.isLoading = false
          this.getRoles()
        })
        .catch((err) => {
          this.$Message.error('数据插入失败')
          this.isShowAdd = false
          this.isLoading = false
          this.getRoles()
        })
    },

    // 显示添加用户模态
    showAddRoleModal () {
      this.isShowAdd = true
      this.init()
    },

    show (row) {
      this.isShowEdit = true
      this.editRoleObj = JSON.parse(JSON.stringify(row))
    },
    // 删除一条用户数据
    remove (index) {
      this.data6.splice(index, 1)
    },

    editRole () {
      updateRole(this.editRoleObj)
        .then(({data}) => {
          if (data.code == 200) {
            this.$Message.success('更新成功')
          } else {
            this.$Message.error('更新失败')
          }
          this.isLoading = false
          this.isShowEdit = false
          this.getRoles()
        })
        .catch((err) => {
          this.$Message.error('更新失败')
          this.isLoading = false
          this.isShowEdit = false
          this.getRoles()
        })
    },
    deleteUser (id) {
      deleteRole(id)
        .then(({data}) => {
          if (data.code == 200) {
            this.$Message.success('删除成功')
          } else {
            this.$Message.error('删除失败')
          }
          this.isLoading = false
          this.isShowEdit = false
          this.getRoles()
        })
        .catch((err) => {
          this.$Message.error('删除失败')
          this.isLoading = false
          this.isShowEdit = false
          this.getRoles()
        })
    }
  },
  mounted () {
    this.getRoles()
  }
}
</script>

<style scoped>
  .searchBar {
    padding: 10px 0 10px 0;
  }

  .operateTable {
    padding: 10px 10px 10px 0;
  }
</style>
