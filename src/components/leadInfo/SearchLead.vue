<template>
  <div class="search-lead-part">
    <el-form :inline="true" :model="searchCondi" class="demo-form-inline" label-width="100px">
        <el-form-item label="导语类型">
          <el-select v-model="searchCondi.CategoryId" placeholder="导语类型" @change="changeCon" style="width: 100%;">
    <!--        <el-option label="全部" value="3"></el-option>-->
    <!--        <el-option label="通用导语" value="1"></el-option>-->
    <!--        <el-option label="描述性导语" value="2"></el-option>categorys-->
            <el-option v-for="item in categorys" :key="item.categorys" :label="item.name" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学科">
          <el-select v-model="searchCondi.SubjectCode" placeholder="学科" @change="changeSubjectCode" style="width: 100%;">
            <el-option v-for="item in subjects" :key="item.SubjectCode" :label="item.SubjectName" :value="item.SubjectCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="对应题型">
          <el-select v-model="searchCondi.QTypeCode" placeholder="对应题型" @change="changeTQTypecode" style="width: 100%;">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in tQTypeCodes" :key="item.QTypeCode" :label="item.QTypeName" :value="item.QTypeCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="体裁">
          <el-select v-model="searchCondi.GenreCode" placeholder="体裁" @change="changeCon" style="width: 100%;">
            <el-option :label="primaryGenre.label" :value= "primaryGenre.value" ></el-option>
            <el-option v-for="item in genreCodes" :key="item.GenreCode" :label="item.GenreName" :value="item.GenreCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input v-model="searchCondi.Keyword" clearable placeholder="关键词"></el-input>
        </el-form-item>
        <el-form-item label="匹配特征内容">
          <el-input v-model="searchCondi.MatchContent" clearable placeholder="匹配特征文本内容"></el-input>
        </el-form-item>
        <el-button type="primary" @click="changeCon" style="margin-bottom: 15px;">查询</el-button>
      </el-form>

  </div>
</template>
<script>
// import tQTypeGenreDataObj from "../../js/commonData.js"
// import subjectDataObj from "../../js/commonData.js"
export default {
  name: "SearchLead",
  data() {
    return {
      searchCondi:{       // 搜索条件
        CategoryId: 3,
        SubjectCode: '',
        QTypeCode: '',
        GenreCode: -1,
        Keyword: '',
        MatchContent: '',
        PageIndex: 1,
        PageSize: 10
      },
      quesTypeInfo:{},
      subjects:[],   // 学科信息
      tQTypeCodes:[], //  题型信息
      primaryGenre:{label:'全部',value:-1},
      genreCodes:[],  //  体裁信息
      categorys:[   // 导语类型信息
        {name:'全部',code: 3 },
        {name:'通用导语',code: 1 },
        {name:'描述性导语',code: 2 }
      ]
    }
  },
  methods: {
    changeSubjectCode(){
      if(this.quesTypeInfo[this.searchCondi.SubjectCode]){
        this.tQTypeCodes = this.quesTypeInfo[this.searchCondi.SubjectCode];
        this.genreCodes = [];
      }else{
        this.tQTypeCodes = [];
        this.genreCodes = [];
      }
      // if(this.searchCondi.SubjectCode == 'C'){
      //   this.tQTypeCodes = tQTypeGenreDataObj.tQTypeGenreDataObj;
      // }else{
      //   this.tQTypeCodes = [];
      //   this.genreCodes = [];
      // }
      this.searchCondi.QTypeCode = '';
      this.searchCondi.GenreCode = -1;
      this.searchCondi.PageIndex = 1;
      this.$emit('searchCondi', this.searchCondi);
    },
    changeTQTypecode(){
      this.genreCodes = this.getChildren(this.searchCondi.QTypeCode,this.tQTypeCodes);
      this.searchCondi.GenreCode = -1;
      // if(this.searchCondi.QTypeCode == ''){
      //   this.searchCondi.GenreCode = -1;
      // }
      this.searchCondi.PageIndex = 1;
      this.$emit('searchCondi', this.searchCondi);
    },
    changeCon(){
      console.log(this.searchCondi);
      this.searchCondi.PageIndex = 1;
      this.$emit('searchCondi', this.searchCondi);
    },
    getChildren(QTypeCode,QTypeCodeInfo){ // 根据QTypeCode获取后代
      for(var index = 0;index < QTypeCodeInfo.length;index++){
        if(QTypeCodeInfo[index].QTypeCode == QTypeCode){
          return QTypeCodeInfo[index].GenreInfoList;
        }
      }
      return [];
    },
    getAllData(){
      this.$axios({
        method:'get',  //请求的方式
        url:'/api/BasicInfo/GetSubjectDetail',
        headers:{'Content-Type':'application/json'},
      }).then(res=>{
        console.log(res);
        if(res.status==200 && res.data != null && res.data.Status==1){
          // allData = res.data.Data.RecordData;
          this.subjects = res.data.Data;
          this.searchCondi.SubjectCode = 'C';
          localStorage.setItem('subjecData',JSON.stringify(res.data.Data));
        }
      }).catch(error=>{
        console.log(error)
      });
      this.$axios({
        method:'get',  //请求的方式
        url:'/api/BasicInfo/GetBasicInfoDetail',
        headers:{'Content-Type':'application/json'},
      }).then(res=>{
        console.log(res);
        if(res.status==200 && res.data != null && res.data.Status==1){
          // allData = res.data.Data.RecordData;
          this.quesTypeInfo = res.data.Data.QuesTypeInfo;
          this.searchCondi.SubjectCode = 'C';
          this.tQTypeCodes = this.quesTypeInfo[this.searchCondi.SubjectCode] ? this.quesTypeInfo[this.searchCondi.SubjectCode] : [];
          localStorage.setItem('allData',JSON.stringify(res.data.Data));
        }
      }).catch(error=>{
        console.log(error)
      });
    }
  },
  created() {

  },
  mounted:function(){
    this.getAllData();
    // if(null != localStorage.getItem('subjecData')){
    //   // this.subjects = subjectDataObj.subjectDataObj;
    //   this.subjects = JSON.parse(localStorage.getItem('subjecData'));
    // }
    // if(null != localStorage.getItem('allData') && this.searchCondi.SubjectCode.trim().length > 0){
    //   this.quesTypeInfo = JSON.parse(localStorage.getItem('allData')).QuesTypeInfo;
    //   this.tQTypeCodes = this.quesTypeInfo[this.searchCondi.SubjectCode] ? this.quesTypeInfo[this.searchCondi.SubjectCode] : [];
    // }
    // this.tQTypeCodes = tQTypeGenreDataObj.tQTypeGenreDataObj;

    this.$emit('searchCondi', this.searchCondi);
  }
}
</script>

<style>
  .search-lead-part .el-form-item__content {
    width: calc(100% - 105px);
  }
	.search-lead-part .el-form--inline .el-form-item {
    width: calc(20% - 30px);
    max-width: 344px;
}
</style>
