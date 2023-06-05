<template>
  <h1>角色管理</h1>
  <button @click="add">添加</button>
  <table>
    <thead>
    <tr>
      <th>rid</th>
      <th>rname</th>
      <th>annotation</th>
      <th>state</th>
      <th>删除</th>
      <th>修改</th>
    </tr>
    </thead>

    <tr v-for="item in roles" :key="item.rid">
      <td>{{ item.rid }}</td>
      <td>{{ item.rname }}</td>
      <td>{{ item.annotation }}</td>
      <td>{{ item.state }}</td>
      <td>
        <button @click="remove(item.rid)">删除</button>
      </td>
      <td>
        <button @click="edit(item)">修改</button>
      </td>
    </tr>
  </table>

  <form v-show="state==1">
    {{ role }}<br/>
    <input style="display: none;"/>
    角色名：<input v-model="role.rname"/><br/>
    角色权限：<input v-model="role.annotation"/><br/>
    状态：<input v-model="role.state"/><br/>
    <button type="button" @click="saveOrUpdate">提交</button>
    <button type="button" @click="cancel">取消</button>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      state: 0,
      roles: [],
      role: {}
    }
  },
  methods: {
    query() {
      axios.post('http://localhost:8090/role/query').then(data => {
        this.roles = data.data.data;
        console.log(this.roles)
      }).catch(error => {
        console.log(error);
      })
    },
    saveOrUpdate() {
      axios.get('http://localhost:8090/role/updateOr', {
        params: {
          ...this.role
        }
      }).then(data => {
        if (data) {
          alert("操作成功")
          this.query();
          this.cancel();
        }
      }).catch(error => {
        console.log(error)
      })
    },
    remove(id) {
      axios.get('http://localhost:8090/role/del', {
        params: {
          id
        }
      }).then(data => {
        if (data) {
          this.query()
        }
      }).catch(error => {
        console.log(error);
      })
    },
    add() {
      this.state = 1
      console.log(this.state)
    },
    edit(item) {
      this.state = 1
      this.role = Object.assign({}, item)
    },
    cancel() {
      this.state = 0
      this.role = {}
    },
  },
  created() {
    this.query();
  }
}
</script>
