<template>
  <div class="index">
    <div class="circle">公厕</div>
    <div class="centerBox">
      <!-- ip输入.有默认值，当失去焦点时执行查询 -->
      <el-form label-width="80px">
        <el-form-item label="IP地址">
            <el-input @blur="queryToilet" v-model="input" placeholder="请输入ip地址"></el-input>
        </el-form-item>
        <el-form-item label="公厕列表" v-if="input">
          <el-select v-model="value" style="width: 100%;" @change="pushGuide" filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.gatewaySn"
              :label="item.toiletName"
              :value="item.gatewaySn">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item> -->
      </el-form>
    </div>
    <div class="getOut" @click="getOut">
      退出应用
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Page1',
  data () {
    return {
      input: 'https://120.71.158.206:10443',
      options: [],
      value: ''
    };
  },
  created() {
    // 如果缓存中有ip，则写入ip
    if(window.sessionStorage.getItem('ip')){
      this.input = window.sessionStorage.getItem('ip')
    }
  },
  mounted() {
    this.queryToilet()
  },
  methods: {
    goPath (path) {
      this.$router.push({ path: path, query: { cache: true }});
    },
    queryToilet() {
      // 当ip地址改变则厕所改变,发起axios 请求
      // 每次执行查询，则缓存ip
      window.sessionStorage.setItem('ip', this.input)
      let _this = this
      axios.get(`${_this.input}/ptsa/web/toilet/listAllLoginFree.do`).then(function(res){
        if(res.data.code === '0') {
          _this.options = res.data.data
        }
      })
    },
    pushGuide(val) {
      this.$router.push({
        path: '/guide',
        query: {sn: val,ip: this.input}
      })
    },
    getOut() {
      this.$hatom.page.exit()
    }
  }
};

</script>

<style lang="scss" scoped>

.index {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #e2eff1;
  .logo_wrap {
    position: relative;
    width: 120px;
    height: 120px;
    margin: 120px auto 40px;
  }

  .hello {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;

    ul {
      list-style-type: none;
      padding: 0;

      li {
        display: inline-block;
        margin: 0 10;
        list-style-type: none;
      }
    }

    a {
      color: #42b983;
      text-decoration: underline;
    }

    h2 {
      display: block;
      font-size: 1.5em;
      margin-block-start: 0.83em;
      margin-block-end: 0.83em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      font-weight: bold;
    }

    h3 {
      display: block;
      font-size: 1.17em;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      font-weight: bold;
    }
  }
  .centerBox{
    width: 600px;
    height: 300px;
    border-radius: 8px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -300px;
    margin-top: -150px;
    box-shadow: 0 5px 15px -5px rgba(0,0,0,.5);
    padding: 40px;
  }
}
.circle{
  position: absolute;
  width: 128px;
  height: 128px;
  border-radius: 50%;
  left: 50%;
  margin-left: -64px;
  top: 200px;
  background-color: #ffffff;
  text-align: center;
  line-height: 128px;
  font-size: 38px;
  color: rgb(12, 71, 126);
}
.getOut{
  position: absolute;
  left: 62%;
  top: 66%;
  cursor: pointer;
  color: #42b983;
}
</style>
