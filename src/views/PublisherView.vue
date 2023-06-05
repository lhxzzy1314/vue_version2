<template>
  <h1>出版社</h1>
  <button @click="add">添加</button>
  <table>
    <thead>
    <tr>
      <th>id</th>
      <th>pname</th>
      <th>site</th>
      <th>contact</th>
      <th>the</th>
      <th>删除</th>
      <th>修改</th>
    </tr>
    </thead>
    <tr v-for="item in publishers" :key="item.id">
      <td>{{ item.id }}</td>
      <td>{{ item.pname }}</td>
      <td>{{ item.site }}</td>
      <td>{{ item.contact }}</td>
      <td>{{ item.the }}</td>
      <td>
        <button @click="remove(item.id)">删除</button>
      </td>
      <td>
        <button @click="edit(item)">修改</button>
      </td>
    </tr>
  </table>
  <form v-show="state==1">
    {{ publisher }}<br/>
    <input style="display: none;"/>
    出版社：<input v-model="publisher.pname"/><br/>
    地点：<input v-model="publisher.site"/><br/>
    联系方式：<input v-model="publisher.contact"/><br/>
    负责人：<input v-model="publisher.the"/><br/>
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
      publisher: {},
      publishers: []
    }
  },
  methods: {
    query() {
      axios.post('http://localhost:8090/publisher/query').then(data => {
        this.publishers = data.data.data;
        console.log(this.publishers)
      })
    },
    saveOrUpdate() {
      axios.get('http://localhost:8090/publisher/saveOrUpdate', {params: {...this.publisher}}).then(data => {
        if (data) {
          alert("操作成功")
          this.query();
          this.cancel();
        }
      }).catch(error => {
        console.log(error);
      })
    },
    remove(id) {
      alert(id)
      axios.get('http://localhost:8090/publisher/del', {params: {id}}).then(data => {
        if (data) {
          this.query();
        }
      }).catch(error => {
        console.log(error);
      })
    },
    add() {
      this.state = 1;
    },
    edit(item) {
      this.state = 1;
      this.publisher = Object.assign({}, item)
    },
    cancel() {
      this.state = 0;
      this.publisher = {}
    },
  },
  created() {
    this.query()
  }
}
</script>

<style scoped>

</style>