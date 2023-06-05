<template>
  <h1>材质表</h1>

  <button @click="add()">添加</button>
  <table>
    <thead>
    <tr>
      <th>id</th>
      <th>tename</th>
      <th>删除</th>
      <th>修改</th>
    </tr>
    </thead>
    <tr v-for="item in texture" :key="item.id">
      <td class="text">{{ item.id }}</td>
      <td>{{ item.tename }}</td>
      <td>
        <button @click="remove(item.id)">删除</button>
      </td>
      <td>
        <button @click="edit(item)">修改</button>
      </td>
    </tr>
  </table>
  <form v-show="state==1">
    {{ textures }}<br/>
    <input style="display: none;"/>
    材质：<input v-model="textures.tename"/><br/>
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
      texture: [],
      textures: {}
    }
  },
  methods: {
    query() {
      axios.post('http://localhost:8090/texture/query').then(data => {
        this.texture = data.data.data;
        console.log(this.texture)
      })
    },
    saveOrUpdate() {
      axios.get('http://localhost:8090/texture/su', {params: {...this.textures}}).then(data => {
        if (data) {
          alert("操作成功");
          this.query();
          this.cancel()
        }
      }).catch(error => {
        console.log(error);
      })
    },
    remove(id) {
      alert(id)
      axios.get('http://localhost:8090/texture/del', {params: {id}}).then(data => {
        if (data) {
          this.query()
        }
      }).catch(error => {
        console.log(error)
      })
    },
    edit(item) {
      this.state = 1;
      this.textures = Object.assign({}, item)
    },
    add() {
      this.state = 1;
    },
    cancel() {
      this.state = 0;
      this.textures = {};
    }
  },
  created() {
    this.query();
  }
}
</script>

<style scoped>

</style>