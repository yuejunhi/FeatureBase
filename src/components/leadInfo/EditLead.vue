<template>
  <div class="edit-lead common-detail-edit-content">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="导语内容" prop="Content">
        <el-col :span="20">
          <el-input type="textarea" v-model="ruleForm.Content" :autosize="{ minRows: 2}" @input = "changeContent"></el-input>
        </el-col>
        <el-col :span="1">&nbsp;</el-col>
        <el-col :span="3">
          <el-button type="primary" @click="verifyLeadContent">提取</el-button>
        </el-col>
      </el-form-item>
      <el-form-item label="导语分词结果" prop="SegContent">
        <!-- <el-input type="textarea" v-model="ruleForm.segContent" :disabled="true"></el-input> -->
        <div class="seg-content" :class="{redBorder:isShowRedBorder && ruleForm.SegContent.length == 0}">
          <span class="seg-content-span cursor" @click="addKeyWord(item)" v-for="(item,index) in ruleForm.SegContent" :key="index">{{item}}</span>
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
      <el-row>
        <el-col :span="12">
          <el-form-item label="导语类型" prop="CategoryId">
            <el-select v-model="ruleForm.CategoryId" placeholder="导语类型" style="width: calc(100% - 30px);">
              <el-option v-for="item in leadTypes" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
              <!-- <el-option label="全部" value="0"></el-option>
              <el-option label="通用导语" value="1"></el-option>
              <el-option label="描述性导语" value="2"></el-option> -->
            </el-select>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="导语题型体裁" prop="tQTypeAndGenreList">
            <el-cascader ref="cascader" :options="options" v-model="ruleForm.tQTypeAndGenreList"
              :props="{ multiple: true, checkStrictly: true }" clearable filterable @change="getCheckedNodes" style="width: calc(100% - 30px);">
            </el-cascader>
            <TQTypeGenreInfo :type="0"></TQTypeGenreInfo>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="试题题型体裁" prop="tQTypeAndGenreList1">
            <el-cascader
              v-if="ruleForm.tQTypeAndGenreList.length"
              ref="cascader1"
              :options="options" v-model="ruleForm.tQTypeAndGenreList1"
              :props="{ multiple: true, checkStrictly: true}"
              clearable filterable @change="getCheckedNodes1" style="width: calc(100% - 30px);">
            </el-cascader>
            <el-cascader
              v-if="ruleForm.tQTypeAndGenreList.length == 0"
              ref="cascader1"
              :options="options"
              :props="{ multiple: true, checkStrictly: true}"
              clearable filterable disabled placeholder="请先选择导语题型体裁" style="width: calc(100% - 30px);">
            </el-cascader>
            <TQTypeGenreInfo :type="1"></TQTypeGenreInfo>
          </el-form-item>
        </el-col>

      </el-row>
      <el-form-item label="导语备注说明" prop="Remark">
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
  // import tQTypeGenreDataObj from "../../js/commonData.js"
  import FeatureInfo from "../common/FeatureInfo"
  import TQTypeGenreInfo from "../common/TQTypeGenreInfo"
  export default {
    name: "EditLead",
    props: ['tableRowData', 'searchContionObj'],
    components:{FeatureInfo, TQTypeGenreInfo},
    data() {
      return {
        isShowTQtypeGenre:false,
        ruleForm: {
          Id: '',
          Content: '',
          SegContent: [],
          Keyword: '',
          CategoryId: '',
          SubjectCode: '',
          tQTypeAndGenreList: [],
          tQTypeAndGenreList1: [],
          Remark: ''
        },
        dataObj: {},
        isShowRedBorder:false,
        insertIndex: 0,
        rules: {
          Content: [{
            required: true,
            message: '请输入导语内容',
            trigger: 'change'
          }],
          SegContent: [{
            required: true,
            message: '请设置分词',
            trigger: 'change'
          }],
          Keyword: [{
            required: true,
            message: '请设置语义特征',
            trigger: 'change'
          }],
          CategoryId: [{
            required: true,
            message: '请选择导语类型',
            trigger: 'change'
          }]
        },
        leadTypes: [
          {
            label: "通用导语",
            value: 1
          },
          {
            label: "描述性导语",
            value: 2
          },
        ],
        options: [],
        types: [],
        options1: [],
        types1: []
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
          this.$message.warning('请填写导语内容');
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
          url:'/api/FeatureMatch/MatchLeadFeature',
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
              this.$confirm('该导语已经存在，是否仍然编辑？')
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
      getSegContent() {
        // this.ruleForm.segContent = this.ruleForm.leadContent
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
            SrcSegContent: this.ruleForm.Content
          }
        }).then(res => {
          console.log(res);
          loading.close();
          if (res.status == 200 && res.data != null && res.data.Status == 1) {
            this.ruleForm.SegContent = res.data.Data.DstSegContent;
          } else {
            this.$message.warning(res.data.Msg);
          }
        }).catch(error => {
          console.log(error);
          loading.close();
        })
      },
      verifyKeyWord(){
        if(this.ruleForm.Content.trim().length == 0){
          this.$message.warning('请填写导语内容');
          return;
        }
        if(this.ruleForm.SegContent.length == 0){
          this.$message.warning('请提取导语分词结果');
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
            console.log(this.setParams(this.$refs['cascader'].checkedNodes,this.$refs['cascader1'].checkedNodes));
            // return;
            this.isShowRedBorder = false;
            let loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading'
            });
            this.$axios({
              method: 'put', //请求的方式
              url: '/api/LeadConstruction/UpdateLead',
              data: this.setParams(this.$refs['cascader'].checkedNodes,this.$refs['cascader1'].checkedNodes)
            }).then(res => {
              console.log(res);
              loading.close();
              if (res.status == 200 && res.data != null && res.data.Status == 1) {
                // this.$emit('childByValue', 'addLead');
                console.log(res)
                if(this.dataObj.Id != res.data.Data.Id){
                  this.$emit('resetLeadObj',
                  { resetLeadId:res.data.Data.Id,
                    PageIndex : 1
                  });
                }else{
                  this.$emit('resetLeadObj',
                  { resetLeadId:res.data.Data.Id,
                    PageIndex : this.searchContionObj.PageIndex
                  });
                }
                this.dataObj = res.data.Data;
                this.ruleForm.Id = res.data.Data.Id;
                this.getData();
                this.$message.success(res.data.Msg);
              } else {
                this.$message.warning(res.data.Msg);
              }

            }).catch(error => {
              console.log(error)
              loading.close();
            })
            // var QTypeInfoList = this.setParams(this.$refs['cascader'].checkedNodes)
            // console.log(JSON.stringify(QTypeInfoList));
          } else {
            console.log('error submit!!');
            this.isShowRedBorder = true;
            // console.log(this.$refs['cascader'].checkedNodes)
            // var QTypeInfoList = this.setParams(this.$refs['cascader'].checkedNodes);
            // console.log(QTypeInfoList);
            return false;
          }
        });
      },
      resetForm(formName) {
        this.isShowRedBorder = false;
        this.$refs[formName].resetFields();
        this.getData();
      },
      getCheckedNodes() {
        var tempArr = JSON.parse(JSON.stringify(this.ruleForm.tQTypeAndGenreList)); // 深拷贝题型体裁
        var tQArr = this.arr2str(this.ruleForm.tQTypeAndGenreList); // 将二维数组转化为一维数组
        var typeArr = this.arr2str(this.types); // 将二维数组转化为一维数组
        // 先找出点击的是哪个题型体裁
        var tempEle = []; // 当前点击的节点数据
        for (var index = 0; index < tQArr.length; index++) {
          var findIndex = typeArr.indexOf(tQArr[index]);
          if (findIndex == -1) {
            tempEle = this.ruleForm.tQTypeAndGenreList[index];
          }
        }
        // 得到当前点击的元素后，需要再次判断当前点击的元素所在的题型，在当前所有的元素
        // console.log(tempEle)
        for (var index = 0; index < tempArr.length; index++) {
          if (tempArr[index][0] == tempEle[0] &&
            tempArr[index].join('&') != tempEle.join('&')) {
            tempArr.splice(index, 1);
            break;
          }
        }
        this.ruleForm.tQTypeAndGenreList = tempArr;
        this.types = tempArr;
        if(tempArr.length == 0){
          this.ruleForm.tQTypeAndGenreList1 = []
          this.types = []
        }
      },
      getCheckedNodes1() {
        var tempArr = JSON.parse(JSON.stringify(this.ruleForm.tQTypeAndGenreList1)); // 深拷贝题型体裁
        var tQArr = this.arr2str(this.ruleForm.tQTypeAndGenreList1); // 将二维数组转化为一维数组
        var typeArr = this.arr2str(this.types1); // 将二维数组转化为一维数组
        // 先找出点击的是哪个题型体裁
        var tempEle = []; // 当前点击的节点数据
        for (var index = 0; index < tQArr.length; index++) {
          var findIndex = typeArr.indexOf(tQArr[index]);
          if (findIndex == -1) {
            tempEle = this.ruleForm.tQTypeAndGenreList1[index];
          }
        }
        // 得到当前点击的元素后，需要再次判断当前点击的元素所在的题型，在当前所有的元素
        // console.log(tempEle)
        for (var index = 0; index < tempArr.length; index++) {
          if (tempArr[index][0] == tempEle[0] &&
            tempArr[index].join('&') != tempEle.join('&')) {
            tempArr.splice(index, 1);
            break;
          }
        }
        this.ruleForm.tQTypeAndGenreList1 = tempArr;
        this.types1 = tempArr;
      },
      arr2str(arr) { // 二维数组转换成一维数组
        var tempArr = [];
        for (var index = 0; index < arr.length; index++) {
          tempArr.push(arr[index].join('&'));
        }
        return tempArr;
      },
      getLabel(value, tempArr) { // 根据value获取label
        for (var index = 0; index < tempArr.length; index++) {
          if (tempArr[index].value == value) {
            return tempArr[index].label
          }
        }
        return '';
      },
      setQTypeInfoList(checkedNodes, sourceFlag){
        if(sourceFlag != 0 && sourceFlag != 1){
          return [];
        }
        var QTypeInfoList = [];
        for (let index = 0; index < checkedNodes.length; index++) {
          var checkedNode = checkedNodes[index];
          var tempInfoArr = [];
          while(null != checkedNode){
            tempInfoArr.unshift({label:checkedNode.label,value:checkedNode.value});
            checkedNode = checkedNode.parent;
          }
          if(tempInfoArr.length == 1){
            QTypeInfoList.push({
              QTypeCode: tempInfoArr[0].value,
              QTypeName: tempInfoArr[0].label,
              GenreCode: -1,
              GenreName: '未知体裁',
              SourceFlag : sourceFlag
            })
          }else if(tempInfoArr.length == 2){
            QTypeInfoList.push({
              QTypeCode:tempInfoArr[0].value,
              QTypeName:tempInfoArr[0].label,
              GenreCode:tempInfoArr[1].value,
              GenreName:tempInfoArr[1].label,
              SourceFlag : sourceFlag
            })
          }else{

          }
        }
        return QTypeInfoList;
      },
      setParams(checkedNodes,checkedNodes1) { // 设置新增导语参数
        // var QTypeInfoList = [];
        // for (let index = 0; index < checkedNodes.length; index++) {
        //   var checkedNode = checkedNodes[index];
        //   var tempInfoArr = [];
        //   while (null != checkedNode) {
        //     tempInfoArr.unshift({
        //       label: checkedNode.label,
        //       value: checkedNode.value
        //     });
        //     checkedNode = checkedNode.parent;
        //   }
        //   if (tempInfoArr.length == 1) {
        //     QTypeInfoList.push({
        //       QTypeCode: tempInfoArr[0].value,
        //       QTypeName: tempInfoArr[0].label,
        //       GenreCode: -1,
        //       GenreName: '未知体裁'
        //     })
        //   } else if (tempInfoArr.length == 2) {
        //     QTypeInfoList.push({
        //       QTypeCode: tempInfoArr[0].value,
        //       QTypeName: tempInfoArr[0].label,
        //       GenreCode: tempInfoArr[1].value,
        //       GenreName: tempInfoArr[1].label,
        //     })
        //   } else {

        //   }
        // }
        var QTypeInfoList = this.setQTypeInfoList(checkedNodes, 0);   // 来源导语题型体裁
        var QTypeInfoList1 = this.setQTypeInfoList(checkedNodes1, 1); // 来源试题题型体裁
        var ruleForm = this.ruleForm;
        // 编辑参数
        var params = {
          Id: ruleForm.Id,
          Content: ruleForm.Content, // 导语内容
          SegContent: JSON.stringify(ruleForm.SegContent), // 分词结果
          Keyword: ruleForm.Keyword, // 关键词
          CategoryId: ruleForm.CategoryId, // 导语类型
          SubjectCode: ruleForm.SubjectCode, // 学科
          Remark: ruleForm.Remark, // 导语备注
          // CategoryName:this.getLabel(ruleForm.categoryId,this.leadTypes),
          QuesTypeInfo:{0:QTypeInfoList,1: QTypeInfoList1} // 题型体裁
        }
        return params;
      },
      getTQTypeInfoList(QTypeInfoList) {
        var tQTypeInfoList = [];
        for (let index = 0; index < QTypeInfoList.length; index++) {
          var QTypeInfo = QTypeInfoList[index];
          if(QTypeInfo.QTypeCode == '1'){
            continue;
          }
          if (QTypeInfo.GenreCode > -1) {
            tQTypeInfoList.push([QTypeInfo.QTypeCode, QTypeInfo.GenreCode]);
          } else {
            tQTypeInfoList.push([QTypeInfo.QTypeCode]);
          }
        }
        return tQTypeInfoList;
      },
      getData() {
        var ruleForm = this.ruleForm;
        var dataObj = this.dataObj;
        // var tableRowData = JSON.parse(JSON.stringify(this.tableRowData));
        ruleForm.Id = dataObj.Id;
        ruleForm.Content = dataObj.Content;
        ruleForm.SegContent = JSON.parse(dataObj.SegContent);
        ruleForm.Keyword = dataObj.Keyword;
        ruleForm.CategoryId = dataObj.CategoryId;
        ruleForm.SubjectCode = dataObj.SubjectCode;
        ruleForm.Remark = dataObj.Remark;
        ruleForm.tQTypeAndGenreList = this.getTQTypeInfoList(dataObj.QuesTypeInfo[0]);
        ruleForm.tQTypeAndGenreList1 = this.getTQTypeInfoList(dataObj.QuesTypeInfo[1]);
        this.types = ruleForm.tQTypeAndGenreList;
        this.types1 = ruleForm.tQTypeAndGenreList1;
        this.insertIndex = dataObj.Keyword.length;
      },
      setTQTypeAndGenreList(subjectCode){
        if(null != localStorage.getItem('allData') && subjectCode.trim().length > 0){
          var quesTypeInfo = JSON.parse(localStorage.getItem('allData')).QuesTypeInfo;
          var tQTypeCodes = quesTypeInfo[subjectCode] ? quesTypeInfo[subjectCode] : [];
          this.options = [];
          this.options1 = [];
          for(let index = 0,len = tQTypeCodes.length;index < len;index++){
            var tQTypeCode = tQTypeCodes[index];
            if(tQTypeCode.QTypeCode == '1'){
              continue;
            }
            var obj = {value:tQTypeCode.QTypeCode,label:tQTypeCode.QTypeName};
            this.options.push(obj);
            if(!tQTypeCode.GenreInfoList || tQTypeCode.GenreInfoList.length == 0 ){
              continue;
            }
            obj.children = [];
            for(let subIndex = 0,subLen = tQTypeCode.GenreInfoList.length;subIndex < subLen;subIndex++){
              var genre = tQTypeCode.GenreInfoList[subIndex];
              var subObj = {value:genre.GenreCode,label:genre.GenreName};
              obj.children.push(subObj);
            }
          }
        }
      }
    },
    watch: {
      // tableRowData() {
      //   this.getData();
      // }
      // ,
      // types(){
      //   if(this.$refs.cascader){
      //     this.$refs.cascader.dropDownVisible = false
      //   }
      // }

    },
    created() {
      // console.log(tQTypeGenreDataObj.tQTypeGenreDataObj)
      // console.log(this.optionss)
      // this.options = tQTypeGenreDataObj.tQTypeGenreDataObj;
      // this.ruleForm.tQTypeAndGenreList.splice(1,1);

    },
    mounted() {
      this.dataObj = JSON.parse(JSON.stringify(this.tableRowData));
      this.setTQTypeAndGenreList(this.dataObj.SubjectCode);
      this.getData();
      console.log(this.dataObj)
      console.log(this.searchContionObj);
    }
  }
</script>

<style>
  @import url("../../assets/css/common.css");
  .edit-lead .el-textarea.is-disabled .el-textarea__inner {
    background-color: #fff;
    color: rgb(94, 102, 106);
  }

</style>
