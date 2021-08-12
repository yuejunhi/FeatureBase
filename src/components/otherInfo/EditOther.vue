<template>
  <div class="edit-other common-detail-edit-content">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="内容" prop="Content">
        <el-col :span="20">
          <el-input type="textarea" v-model="ruleForm.Content" :autosize="{ minRows: 2}" @input = "changeContent"></el-input>
        </el-col>
        <el-col :span="1">&nbsp;</el-col>
        <el-col :span="3">
          <el-button type="primary" @click="verifyLeadContent">提取</el-button>
        </el-col>
      </el-form-item>
      <el-form-item label="分词结果" prop="SegContent">
        <div class="seg-content" :class="{redBorder:isShowRedBorder && ruleForm.SegContent.length == 0}">
          <span class="seg-content-span cursor" @click="addKeyWord(item)" v-for="(item, index) in ruleForm.SegContent" :key="index">{{item}}</span>
        </div>
      </el-form-item>
      <el-form-item label="语义特征" prop="Keyword">
        <el-col :span="20">
          <el-input type="textarea" v-model="ruleForm.Keyword" @blur="getInsertIndex" :autosize="{ minRows: 2}"></el-input>
        </el-col>
        <el-col :span="1"><feature-info></feature-info></el-col>
        <el-col :span="3">
          <el-button type="primary" @click="verifyKeyWord">验证</el-button>
        </el-col>
      </el-form-item>

      <el-form-item label="类型" prop="CategoryId">
        <el-select v-model="ruleForm.CategoryId" placeholder="类型">
          <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注说明" prop="Remark">
        <el-input type="textarea" v-model="ruleForm.Remark" :autosize="{ minRows: 2}"></el-input>
      </el-form-item>
      <el-form-item style="text-align: right;">
        <el-button type="primary" @click="submitForm('ruleForm')">确定修改</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import FeatureInfo from "../common/FeatureInfo"
  export default {
    name: "EditOther",
    props:['tableRowData','searchContionObj'],
    components:{FeatureInfo},
    data(){
      return{
        ruleForm: {
          Id:'',
          Content: '',
          SegContent: [],
          Keyword: '',
          CategoryId: '',
          SubjectCode: '',
          Remark:''
        },
        dataObj:{},
        isShowRedBorder:false,
        insertIndex: 0,
        rules: {
          Content: [
            { required: true, message: '请输入内容', trigger: 'blur' }
          ],
          SegContent: [
            { required: true, message: '请设置分词', trigger: 'change' }
          ],
          Keyword: [
            { required: true, message: '请设置语义特征', trigger: 'change' }
          ],
          CategoryId: [
            { required: true, message: '请选择类型', trigger: 'change' }
          ]
        },
        types:[
          {label:"答案",value:1},
          {label:"解析",value:2},
          {label:"听力原文",value:4},
          {label:"其他",value:8}
        ]
      }
    },
    methods: {
      changeContent(value){
        // setTimeout(()=>{},500);
        // console.log(value);
        if(this.ruleForm.SegContent.length > 0){
          this.ruleForm.SegContent = [];
        }
        if(this.ruleForm.Keyword.length > 0){
          this.ruleForm.Keyword = '';
        }
      },
      getInsertIndex(event){
        if(event.target.selectionStart){
          // console.log(event.target.selectionStart)
          this.insertIndex = event.target.selectionStart;
        }
        // console.log(event.target.selectionStart)
        // console.log(event.target.selectionEnd)
      },
      verifyLeadContent(){
        if(this.ruleForm.Content.trim().length == 0){
          this.$message.warning('请填写内容');
          return;
        }
        let loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading'
        });
        // this.ruleForm.segContent = this.ruleForm.leadContent;
        this.$axios({
          method:'post',  //请求的方式
          url:'/api/FeatureMatch/MatchAddiFeature',
          // headers:{'Content-Type':'application/json'},
          data:{
            SentenceContentList:[this.ruleForm.Content]
          }
        }).then(res=>{
          console.log(res);
          loading.close();
          if(res.status==200 && res.data != null && res.data.Status==1){
            // this.ruleForm.segContent = res.data.Data.DstSegContent;
            if(res.data.Data.length > 0 && res.data.Data[0].IsMatchSuccess){
              this.$confirm('该附属信息已经存在，是否仍然编辑？')
                .then(_ => {
                  this.getSegContent();
                })
                .catch(_ => {});
            } else{
              this.getSegContent();
            }
          }else{
            this.$message.warning(res.data.Msg);
          }

        }).catch(error=>{
          console.log(error)
          loading.close();
        })
      },
      getSegContent(){
        // this.ruleForm.segContent = this.ruleForm.leadContent
        let loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading'
        });
        this.$axios({
          method:'post',  //请求的方式
          url:'/api/WordSeg/WordSegmentation',
          // headers:{'Content-Type':'application/json'},
          data:{
            SrcSegContent:this.ruleForm.Content
          }
        }).then(res=>{
          console.log(res);
          loading.close();
          if(res.status==200 && res.data != null && res.data.Status==1){
            this.ruleForm.SegContent = res.data.Data.DstSegContent;
          }else{
            this.$message.warning(res.data.Msg);
          }
        }).catch(error=>{
          console.log(error);
          loading.close();
        })
      },
      verifyKeyWord(){
        if(this.ruleForm.Content.trim().length == 0){
          this.$message.warning('请填写内容');
          return;
        }
        if(this.ruleForm.SegContent.length == 0){
          this.$message.warning('请提取分词结果');
          return;
        }
        if(this.ruleForm.Keyword.trim().length == 0){
          this.$message.warning('请填写语义特征');
          return;
        }
        let loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading'
        });
        // this.ruleForm.segContent = this.ruleForm.leadContent;
        this.$axios({
          method:'post',  //请求的方式
          url:'/api/FeatureMatch/SingleFeatureMatch',
          // headers:{'Content-Type':'application/json'},
          data:{
            SentenceContent: this.ruleForm.Content,
            Feature: this.ruleForm.Keyword
          }
        }).then(res=>{
          console.log(res);
          loading.close();
          if(res.status==200 && res.data != null && res.data.Status==1){
            this.$message.success(res.data.Msg);
          }else{
            this.$message.warning(res.data.Msg);
          }

        }).catch(error=>{
          console.log(error)
          loading.close();
        })
      },
      addKeyWord(segStr){
        // this.ruleForm.Keyword += segStr;
        var preStr = this.ruleForm.Keyword.substring(0,this.insertIndex);
        var lastStr = this.ruleForm.Keyword.substring(this.insertIndex);
        // console.log(preStr)
        // console.log(lastStr)
        this.ruleForm.Keyword = preStr + segStr + lastStr;
        this.insertIndex = preStr.length + segStr.length;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.isShowRedBorder = false;
            console.log(this.setParams())
            let loading = this.$loading({
               lock: true,
               text: 'Loading',
               spinner: 'el-icon-loading'
            });
            this.$axios({
              method:'put',  //请求的方式
              url:'/api/AdditionalConstruction/UpdateAdditional',
              data:this.setParams()
            }).then(res=>{
              console.log(res);
              loading.close();
              if(res.status==200 && res.data != null && res.data.Status==1){
                if(this.dataObj.Id != res.data.Data.Id){
                  this.$emit('resetAdditionObj',
                  { resetAdditionId:res.data.Data.Id,
                    PageIndex : 1
                  });
                }else{
                  this.$emit('resetAdditionObj',
                  { resetAdditionId:res.data.Data.Id,
                    PageIndex : this.searchContionObj.PageIndex
                  });
                }
                this.dataObj = res.data.Data;
                this.ruleForm.Id = res.data.Data.Id;
                console.log(res)
                this.$message.success(res.data.Msg);
              }else{
                this.$message.warning(res.data.Msg);
              }

            }).catch(error=>{
              console.log(error)
              loading.close();
            })
          } else {
            console.log('error submit!!');
            this.isShowRedBorder = true;
            return false;
          }
        });
      },
      resetForm(formName) {
        this.isShowRedBorder = false;
        this.$refs[formName].resetFields();
        this.getData();
      },
      setParams(){   // 设置新增导语参数
        var ruleForm = this.ruleForm;
        // 编辑参数
        var params = {
          Id: ruleForm.Id,
          Content:ruleForm.Content,                 // 导语内容
          SegContent:JSON.stringify(ruleForm.SegContent),   // 分词结果
          Keyword:ruleForm.Keyword,                         // 关键词
          SubjectCode:ruleForm.SubjectCode,                 // 学科
          CategoryId:ruleForm.CategoryId,                   // 类型
          Remark:ruleForm.Remark,                           // 导语备注
        }
        return params;
      },
      getData(){
        var ruleForm = this.ruleForm;
        var dataObj = this.dataObj;
        ruleForm.Id = dataObj.Id;
        ruleForm.Content = dataObj.Content;
        ruleForm.SegContent = JSON.parse(dataObj.SegContent);
        ruleForm.Keyword = dataObj.Keyword;
        ruleForm.SubjectCode = dataObj.SubjectCode;
        ruleForm.CategoryId = dataObj.CategoryId;
        ruleForm.Remark = dataObj.Remark;
        this.insertIndex = dataObj.Keyword.length;
      }
    },
    watch:{
      // tableRowData(){
      //   this.getData();
      // }

    },
    created() {

    },
    mounted(){
      this.dataObj = JSON.parse(JSON.stringify(this.tableRowData));
      this.getData();
      console.log(this.searchContionObj);
    }
  }
</script>

<style>
  @import url("../../assets/css/common.css");
  .edit-other .el-textarea.is-disabled .el-textarea__inner {
    background-color: #fff;
    color: rgb(94, 102, 106);
  }
</style>
