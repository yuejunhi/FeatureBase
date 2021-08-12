<template>
  <div id="app">
    <el-tabs type="card" v-model="activeName" @tab-click="handleClick" style="width: calc(100% - 40px);">
      <el-tab-pane label="导语" name="first">
        <LeadInfo></LeadInfo>
      </el-tab-pane>
      <el-tab-pane label="附属信息" name="second">
        <OtherInfo></OtherInfo>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import  LeadInfo from "./components/LeadInfo"
  import  OtherInfo from "./components/OtherInfo"
  export default {
    name: 'App',
    components: {LeadInfo,OtherInfo},
    data(){
      return {
        activeName: 'first'
      }
    },
    methods:{
      handleClick(tab, event) {
        // console.log(tab, event);
        // console.log(this.activeName);
        if(this.activeName == 'first'){

        }else{

        }
      }
    },
    mounted() {
      // console.log(this.CommonData.allData);
      // console.log(localStorage.getItem('allData'))
    }
  }
</script>

<style>
@import url("./assets/css/app.css");
</style>
