<template>
  <div class="add-other">
    <el-dialog
      :title="title"
      width="70%" top="10vh"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="内容" prop="content">
          <el-col :span="20">
            <el-input type="textarea" v-model="ruleForm.content" :autosize="{ minRows: 2}" @input = "changeContent"></el-input>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="3">
            <el-button type="primary" @click="verifyLeadContent">提取</el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="分词结果" prop="segContent">
          <div class="seg-content" :class="{redBorder:isShowRedBorder && ruleForm.segContent.length == 0}">
            <span class="seg-content-span cursor" @click="addKeyWord(item)"  v-for="(item, index) in ruleForm.segContent" :key="index">{{item}}</span>
          </div>
        </el-form-item>
        <el-form-item label="语义特征" prop="keyWord">
          <el-col :span="20">
            <el-input type="textarea" v-model="ruleForm.keyWord" @blur="getInsertIndex" :autosize="{ minRows: 2}"></el-input>
          </el-col>
          <el-col :span="1"><feature-info></feature-info></el-col>
          <el-col :span="3">
            <el-button type="primary" @click="verifyKeyWord">验证</el-button>
          </el-col>
        </el-form-item>

        <el-form-item label="类型" prop="categoryId">
          <el-select v-model="ruleForm.categoryId" placeholder="类型">
            <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注说明" prop="Remark">
          <el-input type="textarea" v-model="ruleForm.Remark" :autosize="{ minRows: 2}"></el-input>
        </el-form-item>
        <el-form-item style="text-align: right;">
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import FeatureInfo from "../common/FeatureInfo"
export default {
  name: "AddOther",
  props:['subjectCode'],
  components:{FeatureInfo},
  data(){
    return{
      title: '新增附属信息',
      dialogVisible: true,
      isShowRedBorder:false,
      ruleForm: {
        content: '',
        segContent: [],
        keyWord: '',
        categoryId: '',
        Remark: ''
      },
      insertIndex:0,
      types:[
        {label:"答案",value:1},
        {label:"解析",value:2},
        {label:"听力原文",value:4},
        {label:"其他",value:8}
      ],
      rules: {
        content: [
          { required: true, message: '请输入内容', trigger: 'change' }
        ],
        segContent: [
          { required: true, message: '请设置分词', trigger: 'change' }
        ],
        keyWord: [
          { required: true, message: '请设置语义特征', trigger: 'change' }
        ],
        categoryId: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ]
      },
    }
  },
  methods: {
    getInsertIndex(event){
      if(event.target.selectionStart){
        // console.log(event.target.selectionStart)
        this.insertIndex = event.target.selectionStart;
      }
      // console.log(event.target.selectionStart)
      // console.log(event.target.selectionEnd)
    },
    handleClose(){
      this.$emit('childByValue', '2');
      // this.dialogVisible = false;
      console.log(this.dialogVisible)
    },
    changeContent(value){
      // setTimeout(()=>{},500);
      // console.log(value);
      if(this.ruleForm.segContent.length > 0){
        this.ruleForm.segContent = [];
      }
      if(this.ruleForm.keyWord.length > 0){
        this.ruleForm.keyWord = '';
      }
    },
    verifyLeadContent(){
      if(this.ruleForm.content.trim().length == 0){
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
          SentenceContentList:[this.ruleForm.content]
        }
      }).then(res=>{
        console.log(res);
        loading.close();
        if(res.status==200 && res.data != null && res.data.Status==1){
          // this.ruleForm.segContent = res.data.Data.DstSegContent;
          if(res.data.Data.length > 0 && res.data.Data[0].IsMatchSuccess){
            this.$confirm('该附属信息已经存在，是否仍然录入？')
              .then(_ => {
                this.getSegContent();
              })
              .catch(_ => {this.ruleForm.segContent = []});
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
      let loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading'
      });
      // this.ruleForm.segContent = this.ruleForm.leadContent;
      this.$axios({
        method:'post',  //请求的方式
        url:'/api/WordSeg/WordSegmentation',
        // headers:{'Content-Type':'application/json'},
        data:{
          SrcSegContent:this.ruleForm.content
        }
      }).then(res=>{
        console.log(res);
        loading.close();
        if(res.status==200 && res.data != null && res.data.Status==1){
          this.ruleForm.segContent = res.data.Data.DstSegContent;
        }else{
          this.$message.warning(res.data.Msg);
        }

      }).catch(error=>{
        console.log(error)
        loading.close();
      })
    },
    verifyKeyWord(){
      if(this.ruleForm.content.trim().length == 0){
        this.$message.warning('请填写内容');
        return;
      }
      if(this.ruleForm.segContent.length == 0){
        this.$message.warning('请提取分词结果');
        return;
      }
      if(this.ruleForm.keyWord.trim().length == 0){
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
          SentenceContent: this.ruleForm.content,
          Feature: this.ruleForm.keyWord
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
      var preStr = this.ruleForm.keyWord.substring(0,this.insertIndex);
      var lastStr = this.ruleForm.keyWord.substring(this.insertIndex);
      // console.log(preStr)
      // console.log(lastStr)
      this.ruleForm.keyWord = preStr + segStr + lastStr;
      this.insertIndex = preStr.length + segStr.length;

    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isShowRedBorder = false;
          let loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading'
          });
          this.$axios({
            method:'post',  //请求的方式
            url:'/api/AdditionalConstruction/AddAdditional',
            // headers:{'Content-Type':'application/json'},
            data:this.setParams()
          }).then(res=>{
            console.log(res);
            loading.close();
            if(res.status==200 && res.data != null && res.data.Status==1){
              this.$message.success(res.data.Msg);
              this.$emit('childByValue', '1');
            }else{
              this.$message.warning(res.data.Msg);
            }
          }).catch(error=>{
            console.log(error);
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
      this.ruleForm.segContent = [];
    },
    setParams(){   // 设置新增参数
      var ruleForm = this.ruleForm;
      var params = {
        Content:ruleForm.content,                 // 内容
        SegContent:JSON.stringify(ruleForm.segContent),   // 分词结果
        Keyword:ruleForm.keyWord,                         // 关键词
        CategoryId:ruleForm.categoryId,                   // 类型
        SubjectCode:this.subjectCode,                     // 学科
        Remark:ruleForm.Remark                           // 备注
      }
      return params;
    }
  }
}
</script>

<style>
 @import url("../../assets/css/common.css");
.add-other .el-textarea.is-disabled .el-textarea__inner {
    background-color: #fff;
    color: rgb(94, 102, 106);
}
.add-other .el-dialog__body {
  padding-top: 5px !important;
  max-height: 70vh;
  overflow-y: auto;
}
</style>
