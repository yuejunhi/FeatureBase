<template>
  <div>
    <SearchLead @searchCondi="searchCondi"></SearchLead>
    <el-row>
      <el-button type="primary" @click="addLeadInfo">新增导语</el-button>
    </el-row>
    <SetLeadTable :data="leadData" @getCurrentPageIndex="getCurrentPageIndex"></SetLeadTable>
    <AddLead v-if="dialogLeadVisible" :subjectCode="searchContionObj.SubjectCode" @childByValue="childByValue"></AddLead>
  </div>

</template>

<script>
  import  SetLeadTable from "./leadInfo/SetLeadTable"
  import  SearchLead from "./leadInfo/SearchLead"
  import  AddLead from "./leadInfo/AddLead"
  export default {
    name: "LeadInfo",
    components: {SearchLead,SetLeadTable,AddLead},
    data(){
      return {
        dialogLeadVisible: false,
        leadData: {},
        searchContionObj:{
          CategoryId: 3,
          SubjectCode: '',
          QTypeCode: '',
          GenreCode: -1,
          Keyword: '',
          MatchContent: '',
          PageIndex: 1,
          PageSize: 10
        }
      }
    },
    methods:{
      searchCondi(searchCondiObj){
        this.searchContionObj = searchCondiObj
        console.log(this.searchContionObj)
        let loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading'
        });
        this.$axios({
          method:'post',  //请求的方式
          url:'/api/LeadConstruction/GetLeadDetailByCondition',
          // headers:{'Content-Type':'application/json'},
          data:this.searchContionObj
        }).then(res=>{
          console.log(res);

          if(res.status==200 && res.data != null && res.data.Status==1){
            this.leadData = res.data.Data;
            this.leadData.searchContionObj = this.searchContionObj;
          }
          loading.close();
        }).catch(error=>{
          console.log(error)
          loading.close();
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
        console.log(value)
        if(value == '1'){
          this.dialogLeadVisible = false;
          this.searchContionObj.CategoryId = 3;
          this.searchContionObj.PageIndex = 1;
          this.searchContionObj.QTypeCode = '';
          this.searchContionObj.GenreCode = -1;
          this.searchContionObj.MatchContent = '';
          this.searchCondi(this.searchContionObj);
        }
        else if(value == '2'){
          this.dialogLeadVisible = false;
        }
      },
      addLeadInfo(){
        this.dialogLeadVisible = true;
      }
    }
  }
</script>

<style scoped>

</style>
