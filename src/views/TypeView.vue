<template>
  <h1>类型表</h1>
  <button @click="addRole()">添加</button>
  <table>
    <colgroup>
      <col width="20%"/>
      <col width="20%"/>
      <col width="30%"/>
      <col width="15%"/>
      <col width="15%"/>
    </colgroup>
    <tr>
      <th>类型编号</th>
      <th>类型名称</th>
      <th>备注</th>
      <th>状态</th>
      <th>操作</th>
    </tr>
    <tr v-for="item in types" :key="item.tid">
      <td>{{ item.tid }}</td>
      <td>{{ item.tname }}</td>
      <td>{{ item.remark }}</td>
      <td>{{ item.state }}</td>
      <td>
        <button @click="showEditDialog(item)">编辑</button>
        <button @click="del(item.tid)">删除</button>
      </td>
    </tr>
  </table>
  <h2>编辑数据</h2>
  <form v-show="status==1">
    <input v-model="type.tname" placeholder="类型名称" type="text"/>
    <br/>
    <input v-model="type.remark" placeholder="备注" type="text"/>
    <br/>
    <input v-model="type.state" type="radio" value="1"/>正常
    <input v-model="type.state" type="radio" value="0"/>禁用
    <br/>
    <button @click=" saveOrUpdate()">保存</button>
    <button @click="cancel()">取消</button>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      type: {},
      types: [],
      status: 0
    }
  },
  methods: {
    loadData() {
      axios.get('http://localhost:8090/type/query').then(response => {
        this.types = response.data.data;
      })
    },
    showEditDialog(item) {
      this.status = 1,
          this.type = Object.assign({}, item);
    },
    cancel() {
      this.status = 1,
          this.type = {};
    },
    addRole() {
      this.status = 1,
          this.type = {};
    },
    saveOrUpdate() {
      axios.get('http://localhost:8090/type/saveOrUpdate', {
        params: {
          ...this.type
        }
      }).then(response => {
        if (response) {
          alert("操作成功")
          this.loadData()
        }
      }).catch(error => {
        console.log(error);
      })
    },
    del(tid) {
      axios.get('http://localhost:8090/type/del', {
        params: {
          tid
        }
      }).then(response => {
        if (response) {
          alert("删除成功")
          this.loadData()
        }
      }).catch(error => {
        console.log(error);
      })
    }
  },
  created() {
    this.loadData();
  }
}
</script>

<style scoped>

</style>