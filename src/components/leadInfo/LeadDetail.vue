<template>
  <div class="lead-detail common-detail-edit-content">
    <el-form :model="tableRowData">
      <el-form-item label="导语内容" :label-width="formLabelWidth">
        <div class="common-content">{{tableRowData.Content}}</div>
        <!--<el-input type="textarea" v-model="tableRowData.Content" autocomplete="off" :disabled="disabled"></el-input>-->
      </el-form-item>
      <el-form-item label="分词结果" :label-width="formLabelWidth">
        <div class="common-content">
          <span class="seg-content-span" v-for="(item,index ) in tableRowData.segContent" :key="index">{{item}}</span>
        </div>
      </el-form-item>
      <el-form-item label="语义特征" :label-width="formLabelWidth">
        <div class="common-content">{{tableRowData.Keyword}}</div>
        <!--<el-input type="textarea" v-model="tableRowData.Keyword" autocomplete="off" :disabled="disabled"></el-input>-->
      </el-form-item>
      <el-form-item label="导语类型" :label-width="formLabelWidth">
        <div class="common-content">{{tableRowData.CategoryName}}</div>
        <!--<el-input v-model="tableRowData.CategoryName" autocomplete="off" :disabled="disabled"></el-input>-->
      </el-form-item>
      <el-form-item label="导语题型体裁" :label-width="formLabelWidth">
        <div class="common-content">
          <span :class="{'feature-span' : item.QTypeCode != '1' ? true : false}" v-for="item in tableRowData.QuesTypeInfo[0]" :key="item.QTypeCode">
          <!-- <span class="feature-span" v-for="item in tableRowData.QuesTypeInfo[0]" :key="item.QTypeCode"> -->
            <span v-if="item.QTypeCode != '1'">{{item.QTypeName}}</span>
            <!-- <span>{{item.QTypeName}}</span> -->
            <span v-if="item.GenreCode > -1">
              <span> / </span>
              <span>{{item.GenreName}}</span>
            </span>
          </span>
        </div>
        <!--<ul class="no-margin">-->
          <!--<li v-for="item in tableRowData.QTypeInfoList" :key="item.QTypeCode">-->
            <!--<span>{{item.QTypeName}}</span>-->
            <!--<span v-if="item.GenreCode > -1">-->
                    <!--<span> / </span>-->
                    <!--<span>{{item.GenreName}}</span>-->
                  <!--</span>-->
          <!--</li>-->
        <!--</ul>-->
      </el-form-item>
			<el-form-item label="试题题型体裁" :label-width="formLabelWidth">
			  <div class="common-content">
			    <span :class="{'feature-span' : item.QTypeCode != '1' ? true : false}" v-for="item in tableRowData.QuesTypeInfo[1]" :key="item.QTypeCode">
			      <span v-if="item.QTypeCode != '1'">{{item.QTypeName}}</span>
			      <span v-if="item.GenreCode > -1">
			        <span> / </span>
			        <span>{{item.GenreName}}</span>
			      </span>
			    </span>
			  </div>
			</el-form-item>
      <el-form-item label="导语备注" :label-width="formLabelWidth">
        <div class="common-content">{{tableRowData.Remark}}</div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: "LeadDetail",
    props:['tableRowData'],
    data(){
      return{
        disabled:true,
        formLabelWidth: '120px'
      }
    },
    methods: {

    },
    watch:{
    },
    created() {


    },
    mounted(){
    }
  }
</script>

<style>
  @import url("../../assets/css/common.css");
  .lead-detail .el-textarea.is-disabled .el-textarea__inner {
    background-color: #fff;
    color: rgb(94, 102, 106);
  }
  .lead-detail .el-form-item {
    margin-bottom: 15px;
  }
</style>
