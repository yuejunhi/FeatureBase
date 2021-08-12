<template>
  <div class="other-detail common-detail-edit-content">
    <el-form :model="tableRowData">
      <el-form-item label="内容" :label-width="formLabelWidth">
        <div class="common-content">{{tableRowData.Content}}</div>
        <!--<el-input type="textarea" v-model="tableRowData.LeadContent" autocomplete="off" :disabled="disabled"></el-input>-->
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
      <el-form-item label="类型" :label-width="formLabelWidth">
        <div class="common-content">{{tableRowData.CategoryName}}</div>
        <!--<el-input v-model="tableRowData.CategoryName" autocomplete="off" :disabled="disabled"></el-input>-->
      </el-form-item>
      <el-form-item label="备注说明" :label-width="formLabelWidth">
        <div class="common-content">{{tableRowData.Remark}}</div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: "OtherDetail",
    props: ['tableRowData'],
    data() {
      return {
        disabled: true,
        formLabelWidth: '100px'
      }
    }
  }
</script>

<style>
  @import url("../../assets/css/common.css");
  .other-detail .el-textarea.is-disabled .el-textarea__inner {
    background-color: #fff;
    color: rgb(94, 102, 106);
  }
  .other-detail .el-form-item {
    margin-bottom: 15px;
  }
  /* .common-content {
    min-height: 43px;
    padding: 0 15px;
    border: 1px solid #DCDFE6;
    border-radius: 5px;
  }

  .common-content .seg-content-span {
    padding: 5px;
    color: #fff;
    background-color: rgb(235, 108, 108);
    margin-right: 5px;
    border-radius: 4px;
  } */
</style>
