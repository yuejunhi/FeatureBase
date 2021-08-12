<template>
  <div class="para-border">
    <el-form :model="paraDataObj" ref="form" label-width="130px">
      <el-form-item label="段落内容">
        <el-col :span="18">
          <el-input type="textarea" v-model="paraDataObj.ParaContent" :autosize="{ minRows: 2}" @input = "changeContent"></el-input>
        </el-col>
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="3">
          <el-button type="primary" @click="getSegContent(paraDataObj)">提取</el-button>
        </el-col>
      </el-form-item>
      <el-form-item label="分词结果">
        <!-- <el-input type="textarea" v-model="ruleForm.segContent" :disabled="true"></el-input> -->
        <div class="seg-content">
          <span class="seg-content-span cursor" @click="addKeyWord(item)" v-for="(item,index) in paraDataObj.SegContent" :key="index">{{item}}</span>
        </div>
      </el-form-item>
      <el-form-item label="段落语义特征">
        <el-col :span="18">
          <el-input type="textarea" v-model="paraDataObj.Keyword" @blur="getInsertIndex" :autosize="{ minRows: 2}"></el-input>
        </el-col>
        <el-col :span="2"><feature-info></feature-info></el-col>
        <el-col :span="3">
          <el-button type="primary" @click="verifyKeyWord">验证</el-button>
        </el-col>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="正向段落表现特征">
            <!--< el-select v-model="paraDataObj.PosFeature" multiple filterable placeholder="正向基本特征" style="width: 100%;">
              <el-option v-for="item in featureTypes" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select> -->
            <div class="input" @click="showAddFeature(true)" v-html="paraDataObj.PosFeature"></div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="负向段落表现特征">
            <!-- <el-select v-model="paraDataObj.NegFeature" multiple filterable placeholder="负向基本特征" style="width: 100%;">
              <el-option v-for="item in featureTypes" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select> -->
            <div class="input" @click="showAddFeature(false)" v-html="paraDataObj.NegFeature"></div>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item> -->
    </el-form>
    <el-dialog
      :title="title"
      width="66%" top="10vh"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :before-close="handleClose"
      append-to-body>
      <!-- <add-feature v-if="dialogVisible" :id="'container' + randomId" :featureData="featureData" @getFeatureData = "getFeatureData"></add-feature> -->
      <add-feature v-if="dialogVisible" :featureData="featureData" @getFeatureData = "getFeatureData"></add-feature>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitFeature">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import AddFeature from "./AddFeature"
import FeatureInfo from "./FeatureInfo"
export default{
  name:'ParaEdit',
  props:['paraDataObj'],
  components:{AddFeature, FeatureInfo},
  data(){
    return{
      title: '正向段落表现特征录入',
      dialogVisible: false,
      // PosFeature: '',
      // NegFeature: '',
      isPosFeature: true,
      insertIndex: 0,
      featureData: '',
      tempFeatureData: ''
    }
  },
  methods:{
    showAddFeature(isPosFeature){
      if(null == localStorage.getItem('allData')){
        this.$message.error('基本特征数据错误');
        return;
      }

      if(isPosFeature){
        this.isPosFeature = true;
        this.featureData = this.paraDataObj.PosFeature;
        this.title = '正向段落表现特征录入';
      }else{
        this.isPosFeature = false;
        this.featureData = this.paraDataObj.NegFeature;
        this.title = '负向段落表现特征录入';
        console.log(this.featureData);
      }

      this.dialogVisible = true;
    },
    getFeatureData(featureData){
      this.tempFeatureData = featureData;
      console.log(featureData);
    },
    convertFeature(feature){
      if(feature.trim().length == 0){
        return '';
      }
      var nodeList = $('<div>'+feature+'</div>')[0].childNodes;
      var coverArr = [];
      for(var index = 0,len = nodeList.length; index < len; index++){
        var node = nodeList[index];
        if(node.nodeName == 'SPAN'){
          var attrs = node.attributes;
          for(var subIndex = 0,subLen = attrs.length;subIndex < subLen;subIndex++){
            if(attrs[subIndex].nodeName == 'value'){
              coverArr.push(attrs[subIndex].nodeValue);
              break;
            }
          }
        }else{
          coverArr.push(node.textContent);
        }
      }
    	return coverArr.join('');
    },
    submitFeature(){
      // console.log($('<div>' +this.tempFeatureData + '</div>')[0].childNodes);
      var nodeList = $('<div>' +this.tempFeatureData + '</div>')[0].childNodes;
      // 合法性校验
      /*
      nodeList中相邻元素的nodeName不能相同
      中括号前面必须得有数字，且数字必须是10,11,12中的一个，
      先将tempFeatureData转换成数字形式
      */
      var mes = this.isPosFeature ? '正向段落表现特征输入错误' : '负向段落表现特征输入错误';
      var tips = '请修改录入的段落表现特征';
      for(let index = 0,len = nodeList.length;index < len - 1;index++){
        /*
          1. 相邻元素节点名字不能相同
          2. 若是有中括号，中括号后面应该跟着|或者&
        */
        if(nodeList[index].nodeName == nodeList[index+1].nodeName ||
        (nodeList[index].nodeName == '#text' && nodeList[index].textContent.indexOf(']') == 0
        && (null == nodeList[index].textContent.match(/[|&]/g) || nodeList[index].textContent.match(/[|&]/g).length > 1))){
          this.$message.error(mes+'：两个特征中间应该有符号隔开! '+tips);
          return;
        }
        // 若是有中括号，中括号后面应该跟着|或者&
        // if(nodeList[index].nodeName == '#text' && nodeList[index].textContent.indexOf(']') == 0
        // && (null == nodeList[index].textContent.match(/[|&]/g) || nodeList[index].textContent.match(/[|&]/g).length > 1)){
        //   this.$message.error(mes+'：两个特征中间应该有符号隔开! '+tips);
        //   return;
        // }
      }
      var featureNum = this.convertFeature(this.tempFeatureData);
      var pattern = /\d+\[[\(\)]*\d+[\(\d\)\|&]*\]/g;
      var patternArr = [];
      var featureArr = [];

      if(null != (patternArr = featureNum.match(pattern))){
        for(var index = 0,len = patternArr.length;index < len;index++){
          var firstNum = patternArr[index].match(/\d+/)[0];
          if(firstNum != 10 && firstNum != 11 && firstNum != 12){
            this.$message.error(mes+'：中括号用的不合法! '+tips);
            return;
          }
        }
      }
      var splitStrArr = featureNum.split(pattern);
      for(let index = 0,len = splitStrArr.length;index < len;index++){
        if(splitStrArr[index].indexOf('[') > -1 || splitStrArr[index].indexOf(']') > -1){
          this.$message.error(mes+'：中括号用的不合法! '+tips);
          return;
        }
      }
      if(this.isPosFeature){
        this.paraDataObj.PosFeature = this.tempFeatureData;
      }else{
        this.paraDataObj.NegFeature = this.tempFeatureData;
      }
      this.dialogVisible = false;
    },
    handleClose(){
      // this.$emit('childByValue', '2');
      this.dialogVisible = false;
      console.log(this.dialogVisible)
    },
    changeContent(value){
      // setTimeout(()=>{},500);
      // console.log(value);
      if(this.paraDataObj.SegContent.length > 0){
        this.paraDataObj.SegContent = [];
      }
			if(this.paraDataObj.Keyword.length > 0){
			  this.paraDataObj.Keyword = ''
			}
    },
    getInsertIndex(event){    // 获取插入坐标
      if(event.target.selectionStart){
        // console.log(event.target.selectionStart)
        this.insertIndex = event.target.selectionStart;
      }
      // console.log(event.target.selectionStart)
      // console.log(event.target.selectionEnd)
    },
    getSegContent(paraDataObj) {   // 获取分词结果
      if(this.paraDataObj.ParaContent.trim().length == 0){
        this.$message.warning('请填写段落内容');
        return;
      }
      // this.ruleForm.segContent = this.ruleForm.leadContent;
      console.log(paraDataObj);
      let loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading'
      });
      this.$axios({
        method: 'post', //请求的方式
        url: '/api/WordSeg/WordSegmentation',
        // headers:{'Content-Type':'application/json'},
        data: {
          SrcSegContent: paraDataObj.ParaContent
        }
      }).then(res => {
        console.log(res);
        loading.close();
        if (res.status == 200 && res.data != null && res.data.Status == 1) {
          paraDataObj.SegContent = res.data.Data.DstSegContent;
        } else {
          this.$message.warning(res.data.Msg);
        }
      }).catch(error => {
        console.log(error)
        loading.close();
      })
    },
    verifyKeyWord(){
      if(this.paraDataObj.ParaContent.trim().length == 0){
        this.$message.warning('请填写段落内容');
        return;
      }
      if(this.paraDataObj.SegContent.length == 0){
        this.$message.warning('请提取导语分词结果');
        return;
      }
      if(this.paraDataObj.Keyword.trim().length == 0){
        this.$message.warning('请填写段落语义特征');
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
          SentenceContent: this.paraDataObj.ParaContent,
          Feature: this.paraDataObj.Keyword
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
      // console.log(segStr)
      // if(this.paraDataObj.Keyword == undefined){
      //   this.paraDataObj.Keyword = '';
      // }
      // this.paraDataObj.Keyword += segStr;
      var preStr = this.paraDataObj.Keyword.substring(0,this.insertIndex);
      var lastStr = this.paraDataObj.Keyword.substring(this.insertIndex);
      // console.log(preStr)
      // console.log(lastStr)
      this.paraDataObj.Keyword = preStr + segStr + lastStr;
      this.insertIndex = preStr.length + segStr.length;
    }
  },
  watch:{
    paraDataObj(){
      console.log(this.paraDataObj)
    }
  },
  computed: {
    randomId() {
        var Num = "";
        for (var i = 0; i < 6; i++) {
            Num += Math.floor(Math.random() * 10);
        }
        return Num;
    }
  },
  mounted(){
		// if(null != localStorage.getItem('featureTypes')){
		// 	this.featureTypes = JSON.parse(localStorage.getItem('featureTypes'));
		// }
    this.insertIndex = this.paraDataObj.Keyword.length;
    console.log(this.paraDataObj)
  }
}
</script>
<style>
  @import url("../../assets/css/common.css");
  .para-border .el-dialog__body {
    padding-top: 5px !important;
    max-height: 70vh;
    overflow-y: auto;
  }
  .para-border .input{
    font-size: 14px;
    /* padding: 5px 8px; */
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0 5px;
    min-height: 42px;
  }
  .para-border .input:hover{
    cursor: pointer;
  }
</style>
