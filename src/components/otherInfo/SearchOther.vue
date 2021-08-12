<template>
  <div class="search-other-part">
    <el-form :inline="true" :model="searchCondi" class="demo-form-inline" label-width="100px">
      <el-form-item label="学科">
        <el-select v-model="searchCondi.SubjectCode" placeholder="学科" @change="changeCon">
          <!-- <el-option v-for="item in subjects" :key="item.value" :label="item.label" :value="item.value"></el-option> -->
          <el-option v-for="item in subjects" :key="item.SubjectCode" :label="item.SubjectName" :value="item.SubjectCode"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="searchCondi.CategoryId" placeholder="类型" @change="changeCon">
          <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关键词">
        <el-input v-model="searchCondi.Keyword" clearable placeholder="关键词"></el-input>
      </el-form-item>
      <el-form-item label="匹配特征内容">
        <el-input v-model="searchCondi.MatchContent" clearable placeholder="匹配特征文本内容"></el-input>
      </el-form-item>
      <el-button type="primary" @click="changeCon">查询</el-button>
    </el-form>
  </div>

</template>

<script>
import subjectDataObj from "../../js/commonData.js"
export default {
  name: "SearchOther",
  data() {
    return {
      searchCondi:{
        SubjectCode: '',
        Keyword: '',
        MatchContent: '',
        CategoryId: 15,
        PageIndex: 1,
        PageSize: 10
      },
      subjects:[],
      types:[
        {label:"全部",value:15},
        {label:"答案",value:1},
        {label:"解析",value:2},
        {label:"听力原文",value:4},
        {label:"其他",value:8}
      ]
    }
  },
  methods: {
    changeCon(){
      console.log(this.searchCondi);
      this.searchCondi.PageIndex = 1;
      this.$emit('searchCondi', this.searchCondi);
    },
    getAllData(){
      this.$axios({
        method:'get',  //请求的方式
        url:'/api/BasicInfo/GetSubjectDetail',
        headers:{'Content-Type':'application/json'},
      }).then(res=>{
        console.log(res);
        if(res.status==200 && res.data != null && res.data.Status==1){
          this.subjects = res.data.Data;
          this.searchCondi.SubjectCode = 'C';
          localStorage.setItem('subjecData',JSON.stringify(res.data.Data));
        }
      }).catch(error=>{
        console.log(error)
      });
    }
  },
  created() {
    if(null != localStorage.getItem('subjecData')){
      // this.subjects = subjectDataObj.subjectDataObj;
      this.searchCondi.SubjectCode = 'C';
      this.subjects = JSON.parse(localStorage.getItem('subjecData'));
    }else{
      this.getAllData();
    }
  },
  mounted:function(){
    this.$emit('searchCondi', this.searchCondi);
  }
}
</script>

<style>
  .search-other-part .el-form-item__content {
    width: calc(100% - 105px);
  }
	.search-other-part .el-form--inline .el-form-item {
    width: calc(24% - 30px);
    max-width: 344px;
}
</style>
