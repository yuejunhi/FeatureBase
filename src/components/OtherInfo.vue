<template>
    <div>
      <SearchOther @searchCondi="searchCondi"></SearchOther>
      <el-row>
        <el-button type="primary" @click="addOtherInfo">新增附属信息</el-button>
      </el-row>
      <SetOtherTable :data="otherData" @getCurrentPageIndex="getCurrentPageIndex"></SetOtherTable>
      <AddOther v-if="dialogOtherVisible" :subjectCode="searchContionObj.SubjectCode" @childByValue="childByValue"></AddOther>
    </div>
</template>

<script>
  import  SearchOther from "./otherInfo/SearchOther"
  import  SetOtherTable from "./otherInfo/SetOtherTable"
  import  AddOther from "./otherInfo/AddOther"
  export default {
    name: "OtherInfo",
    components: {SetOtherTable,SearchOther,AddOther},
    data(){
      return {
        dialogOtherVisible: false,
        otherData:{},
        searchContionObj:{
          SubjectCode: '',
          Keyword: '',
          CategoryId: 15,
          MatchContent: '',
          PageIndex: 1,
          PageSize: 10
        }
      }
    },
    methods:{
      searchCondi(searchCondiObj){
        this.searchContionObj = searchCondiObj
        // this.searchContionObj.MatchContent = escape(searchCondiObj.MatchContent)
        // var searchCon = JSON.parse(JSON.stringify(searchCondiObj))
        // searchCon.MatchContent = escape(searchCondiObj.MatchContent)
        // console.log(this.MatchContent)
        let loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading'
        });
        this.$axios({
          method:'post',  //请求的方式
          url:'/api/AdditionalConstruction/GetAdditionalDetailByCondition',
          // headers:{'Content-Type':'application/json'},
          data:this.searchContionObj
        }).then(res=>{
          console.log(res);
          loading.close();
          if(res.status==200 && res.data != null && res.data.Status==1){
            this.otherData = res.data.Data;
            this.otherData.searchContionObj = this.searchContionObj;
          }
        }).catch(error=>{
          loading.close();
          console.log(error)
        })
      },
      getCurrentPageIndex(pageIndex){
        this.searchContionObj.PageIndex = pageIndex;
        this.searchCondi(this.searchContionObj);
      },
      childByValue(value) {
        // value就是子组件传过来的值
        // 1:说明是添加条件成功，需要请求数据
        // 2说明是关闭页面，不需要请求数据
        if(value == '1'){
          this.dialogOtherVisible = false;
          this.searchContionObj.PageIndex = 1;
          this.searchContionObj.Keyword = '';
          this.searchContionObj.MatchContent = '';
          this.searchContionObj.CategoryId = 15;
          this.searchCondi(this.searchContionObj);
        }
        else if(value == '2'){
          this.dialogOtherVisible = false;
        }
      },
      addOtherInfo(){
        this.dialogOtherVisible = true;
      }
    }
  }
</script>

<style scoped>

</style>
