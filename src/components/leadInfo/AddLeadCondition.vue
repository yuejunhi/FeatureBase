<template>
  <div class="condition-common">
    <!-- 上一段 -->
    <div class="relative" v-if="prevItems.length">
      <span class="prev-para w100">上一段:</span>
      <div class="relative" v-for="(item,index) in prevItems" :key="index">
        <ParaEdit :paraDataObj="item"></ParaEdit>
        <!-- <div style="border: 1px solid #DCDFE6; border-radius: 5px; padding: 10px;margin: 0 120px 10px 120px;">
          <el-form :model="item" ref="form" label-width="115px">
            <el-form-item label="段落内容">
              <el-col :span="18">
                <el-input type="textarea" v-model="item.ParaContent"></el-input>
              </el-col>
              <el-col :span="2">&nbsp;</el-col>
              <el-col :span="3">
                <el-button type="primary" @click="getSegContent(item)">提取</el-button>
              </el-col>
            </el-form-item>
            <el-form-item label="分词结果">
              <div class="seg-content">
                <span class="seg-content-span" v-for="(item,index) in item.SegContent" :key="index">{{item}}</span>
              </div>
            </el-form-item>
            <el-form-item label="关键词">
              <el-input type="textarea" v-model="item.Keyword"></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="正向基本特征">
                  <el-select v-model="item.PosFeature" multiple placeholder="导语类型" style="width: 100%;">
                    <el-option v-for="item in leadTypes" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="负向基本特征">
                  <el-select v-model="item.NegFeature" multiple placeholder="导语类型" style="width: 100%;">
                    <el-option v-for="item in leadTypes" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div> -->
        <span class="prev-next-btn w100">
          <el-button icon="el-icon-plus" circle title="添加上一段" @click="addPrevPara(index)"></el-button>
          <el-button icon="el-icon-minus" circle title="删除该段" @click="delPrevPara(index)"></el-button>
        </span>
      </div>
    </div>
    <!-- 当前段落 -->
    <div class="relative">
      <span class="current-para w100">当前段:</span>
      <div class="relative">
        <ParaEdit :paraDataObj="currentPara"></ParaEdit>
        <!-- <div style="border: 1px solid #DCDFE6; border-radius: 5px; padding: 10px;margin: 0 120px 10px 120px;">
          <el-form :model="currentPara" ref="ruleForm" :rules="rules" label-width="115px" class="demo-ruleForm">
            <el-form-item label="段落内容" prop="ParaContent">
              <el-col :span="18">
                <el-input type="textarea" v-model="currentPara.ParaContent"></el-input>
              </el-col>
              <el-col :span="2">&nbsp;</el-col>
              <el-col :span="3">
                <el-button type="primary" @click="getSegContent(currentPara)">提取</el-button>
              </el-col>
            </el-form-item>
            <el-form-item label="分词结果" prop="SegContent">
              <div class="seg-content">
                <span class="seg-content-span" v-for="(item,index) in currentPara.SegContent"
                  :key="index">{{item}}</span>
              </div>
            </el-form-item>
            <el-form-item label="关键词" prop="Keyword">
              <el-input type="textarea" v-model="currentPara.Keyword"></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="正向基本特征" prop="PosFeature">
                  <el-select v-model="currentPara.PosFeature" multiple placeholder="导语类型" style="width: 100%;">
                    <el-option v-for="item in leadTypes" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="负向基本特征" prop="NegFeature">
                  <el-select v-model="currentPara.NegFeature" multiple placeholder="导语类型" style="width: 100%;">
                    <el-option v-for="item in leadTypes" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div> -->
        <span class="add-para-btn w100">
          <el-button style="margin-bottom: 15px;" icon="el-icon-plus" circle title="添加上一段"
            @click="addPrevPara(prevItems.length)"></el-button>
          <br>
          <el-button icon="el-icon-plus" circle title="添加下一段" @click="addNextPara(-1)"></el-button>
        </span>
      </div>

    </div>
    <!-- 下一段 -->
    <div class="relative" v-if="nextItems.length">
      <span class="next-para w100">下一段:</span>
      <div class="relative" v-for="(item,index) in nextItems" :key="index">
        <ParaEdit :paraDataObj="item"></ParaEdit>
        <!-- <div style="border: 1px solid #DCDFE6; border-radius: 5px; padding: 10px;margin: 0 120px 10px 120px;">
          <el-form :model="item" ref="form" label-width="115px">
            <el-form-item label="段落内容">
              <el-col :span="18">
                <el-input type="textarea" v-model="item.ParaContent"></el-input>
              </el-col>
              <el-col :span="2">&nbsp;</el-col>
              <el-col :span="3">
                <el-button type="primary" @click="getSegContent(item)">提取</el-button>
              </el-col>
            </el-form-item>
            <el-form-item label="分词结果">
              <div class="seg-content">
                <span class="seg-content-span" v-for="(item,index) in item.SegContent" :key="index">{{item}}</span>
              </div>
            </el-form-item>
            <el-form-item label="关键词">
              <el-input type="textarea" v-model="item.Keyword"></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="正向基本特征">
                  <el-select v-model="item.PosFeature" multiple placeholder="导语类型" style="width: 100%;">
                    <el-option v-for="item in leadTypes" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="负向基本特征">
                  <el-select v-model="item.NegFeature" multiple placeholder="导语类型" style="width: 100%;">
                    <el-option v-for="item in leadTypes" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div> -->
        <span class="prev-next-btn w100">
          <el-button icon="el-icon-plus" circle title="添加上一段" @click="addNextPara(index)"></el-button>
          <el-button icon="el-icon-minus" circle title="删除该段" @click="delNextPara(index)"></el-button>
        </span>
      </div>
    </div>
    <!-- 上传文件列表 -->
    <div class="relative">
      <span class="next-para w100">样例列表:</span>
      <div class="relative" v-for="(item,index) in fileResInfoList" :key="index">
        <div class="para-border">
          <el-form :model="item" ref="form" label-width="100px">
            <el-form-item label="上传文件">
              <el-progress v-if="item.percentFlag == true" type="circle" :percentage="item.uploadPercent"></el-progress>
              <el-upload v-if="item.percentFlag == false"
                action="http://172.16.63.109:6868/api/LeadConstruction/UploadFile" list-type="picture-card"
                :file-list="item.fileList"
                :on-success="(res,file, fileList)=>{return handleFileSuccess(res,file, fileList,index)}"
                :before-upload="beforeFileUpload"
                :on-progress="(event,file, fileList)=>{return uploadProcess(event,file, fileList,index)}"
                :data="formData" accept=".doc,.docx" :limit="1" :class="{hide:item.fileList.length == 1 ? true:false}"
                :auto-upload="true">
                <i slot="default" title="上传文件" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{file}">
                  <!-- <img
                      class="el-upload-list__item-thumbnail"
                      :src="file.url" alt=""
                    > -->
                  <span>{{file.name}}</span>
                  <span class="el-upload-list__item-actions">
                    <!-- <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                      >
                        <i class="el-icon-zoom-in"></i>
                      </span> -->
                    <span title="下载文件" class="el-upload-list__item-delete" @click="handleDownload(file)">
                      <i class="el-icon-download"></i>
                    </span>
                    <span title="删除文件" class="el-upload-list__item-delete" @click="handleRemove(file,item.fileList)">
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item label="样例说明">
              <el-input type="textarea" v-model="item.FileDescription"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span style="position: absolute;right:10px;top: 50%;margin-top: -20px;width: 100px;">
          <el-button v-if="index == fileResInfoList.length - 1" icon="el-icon-plus" circle title="添加文件信息"
            @click="addFileInfo(index)"></el-button>
          <el-button v-if="fileResInfoList.length > 1" icon="el-icon-minus" circle title="删除该文件信息"
            @click="delFileInfo(index)"></el-button>
        </span>
      </div>
    </div>
    <div style="text-align: right;margin-right: 50px;">
      <el-button v-if="isShowUpdateBtn" type="primary" @click="updateData">确定修改</el-button>
      <el-button v-else type="primary" @click="submitData">提交</el-button>
    </div>

  </div>
</template>
<script>
  import ParaEdit from "../common/ParaEdit"
  export default {
    name: "AddLeadCondition",
    props: ['conditionData', 'tableRowData'],
    components: {ParaEdit},
    data() {
      return {
        LeadId: '',
        ConditionId: '',
        formData: {
          LeadId: ''
        },
        isShowUpdateBtn: false,
        currentPara: {
          ParaContent: '',
          SegContent: [],
          Keyword: '',
          PosFeature: '',
          NegFeature: '',
        },
        prevItems: [],
        nextItems: [],
        fileResInfoList: [{
          fileList: [],
          FileDescription: '',
          percentFlag: false,
          uploadPercent: 0
        }]
      }
    },
    methods: {
      uploadProcess(event, file, fileList, index) {
        this.fileResInfoList[index].percentFlag = true;
        this.fileResInfoList[index].uploadPercent = parseInt(file.percentage);
      },
      handleFileSuccess(res, file, fileList, index) {
        // 上传成功
        // this.fileList = fileList;
        console.log("上传成功" + index)
        console.log(fileList);
        console.log(res)
        this.fileResInfoList[index].percentFlag = false;
        this.fileResInfoList[index].uploadPercent = 0;
        if (res.Status == 1) {
          this.fileResInfoList[index].fileList = fileList;
        } else {
          var indexOf = fileList.indexOf(file);
          if (indexOf > -1) {
            fileList.splice(indexOf, 1);
            this.$message.error(res.Msg);
          }

        }

      },
      beforeFileUpload(file) {
        console.log(file)
        const fileType = file.name.substring(file.name.lastIndexOf('.'))
        if (fileType.toLowerCase() != '.doc' && fileType.toLowerCase() != '.docx') {
          this.$message.error('文件必须为.doc或.docx类型')
          return false
        }
      },
      handleRemove(file, fileList) {
        console.log(file);
        console.log(fileList);
        this.$confirm('确认删除该文件？')
          .then(_ => {
            var _this = this;
            var indexOf = fileList.indexOf(file);
            if (indexOf == -1) {
              this.$message.error('删除失败');
              return;
            }
            fileList.splice(indexOf, 1);
            console.log(this.fileResInfoList)
          })
          .catch(_ => {});
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      getBlob(url) {
        return new Promise(resolve => {
          const xhr = new XMLHttpRequest();
          xhr.header
          xhr.open('GET', url, true);
          xhr.responseType = 'blob';
          xhr.onload = () => {
            if (xhr.status === 200) {
              resolve(xhr.response);
            }
          };

          xhr.send();
        });
      },
      saveAs(blob, filename) {
        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob, filename);
        } else {
          const link = document.createElement('a');
          const body = document.querySelector('body');

          link.href = window.URL.createObjectURL(blob);
          link.download = filename;

          // fix Firefox
          link.style.display = 'none';
          body.appendChild(link);

          link.click();
          body.removeChild(link);

          window.URL.revokeObjectURL(link.href);
        }
      },
      handleDownload(file) {
        console.log(file);
        if (file.response && file.response.Data && file.response.Data.DownloadSrc.trim().length > 0) {
          const url = file.response.Data.DownloadSrc;
          this.getBlob(url).then(blob => {
            this.saveAs(blob, file.response.Data.SrcFileName);
          });

        } else {
          this.$message.warning('文件错误，无法下载')
        }
      },
      addFileInfo(index) {
        if (this.fileResInfoList[index].fileList.length == 0) {
          this.$message.warning('第' + (index + 1) + '个样例未上传的样例文件，请先上传');
          return;
        }
        if (this.fileResInfoList[index].FileDescription.trim().length == 0) {
          this.$message.warning('第' + (index + 1) + '个样例未填写样例说明，请填写');
          return;
        }
        this.fileResInfoList.push({
          fileList: [],
          FileDescription: '',
          percentFlag: false,
          uploadPercent: 0
        });
      },
      delFileInfo(index) {
        this.$confirm('确认删除该样例？')
          .then(_ => {
            this.fileResInfoList.splice(index, 1);
          })
          .catch(_ => {});

      },
      addPrevPara(index) {
        this.prevItems.splice(index, 0, {
          ParaContent: '',
          SegContent: [],
          Keyword: '',
          PosFeature: '',
          NegFeature: '',
        });
      },
      delPrevPara(index) {
        this.$confirm('确认删除该段落？')
          .then(_ => {
            this.prevItems.splice(index, 1);
          })
          .catch(_ => {});

      },
      addNextPara(index) {
        this.nextItems.splice(index + 1, 0, {
          ParaContent: '',
          SegContent: [],
          Keyword: '',
          PosFeature: '',
          NegFeature: '',
        });
      },
      delNextPara(index) {
        this.$confirm('确认删除该段落？')
          .then(_ => {
            this.nextItems.splice(index, 1);
          })
          .catch(_ => {});

      },
      getSegContent(item) {
        // this.ruleForm.segContent = this.ruleForm.leadContent;
        console.log(item);
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
            SrcSegContent: item.ParaContent
          }
        }).then(res => {
          console.log(res);
          loading.close();
          if (res.status == 200 && res.data != null && res.data.Status == 1) {
            item.SegContent = res.data.Data.DstSegContent;
          } else {
            this.$message.warning(res.data.Msg);
          }
        }).catch(error => {
          console.log(error)
          loading.close();
        })
      },
      handlePreview(file) {
        console.log(file);
        const userAgent = navigator.userAgent;
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
          alert('推荐谷歌进行文件预览')
        } else {
          window.open(file.url) //blob格式地址
        }
      },
      setParams(isUpdate) { // 设置参数
        var params = {
          LeadId: this.tableRowData.Id,
          BasicParaDataObj: this.changeSegContentAndFeature(JSON.parse(JSON.stringify(this.currentPara)), 1),
          AboveParaList: this.changeSegContentAndFeature(JSON.parse(JSON.stringify(this.prevItems)).reverse(), 2),
          BelowParaList: this.changeSegContentAndFeature(JSON.parse(JSON.stringify(this.nextItems)), 2),
          FileResInfoList: this.setFileListParam(JSON.parse(JSON.stringify(this.fileResInfoList)))
        }
        if (isUpdate) {
          params.ConditionId = this.ConditionId;
        }
        return params;
      },
      changeSegContentAndFeature(objData, type) {
        if (type == 1) {
          objData.SegContent = JSON.stringify(objData.SegContent)
          objData.PosFeature = this.convertFeature(objData.PosFeature)
          objData.NegFeature = this.convertFeature(objData.NegFeature)
        } else {
          if (objData.length > 0) {
            for (var index = objData.length - 1; index >= 0; index--) {
              var dataObj = objData[index];
              if (dataObj.Keyword.trim().length == 0
              && dataObj.PosFeature.trim().length == 0
              && dataObj.NegFeature.trim().length == 0) {
                objData.splice(index, 1);
                index = objData.length;
              } else {
                break;
              }
            }
            // var lastIndex = objData.length - 1;
            // var dataObj = objData[lastIndex];
            // if(dataObj.Keyword.length == 0 && dataObj.PosFeature.length == 0 && dataObj.NegFeature.length == 0){
            //   objData.splice(lastIndex, 1);
            // }
          }
          objData.forEach((obj, index) => {
            obj.SegContent = JSON.stringify(obj.SegContent)
            obj.PosFeature = this.convertFeature(obj.PosFeature)
            obj.NegFeature = this.convertFeature(obj.NegFeature)
          });
        }
        return objData
      },
      convertFeature(feature){   // 将
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
      setFileListParam(fileResInfoList) {
        var fileListParam = [];
        for (var index = 0, len = fileResInfoList.length; index < len; index++) {
          var file = fileResInfoList[index].fileList[0].response.Data;
          file.FileDescription = fileResInfoList[index].FileDescription;
          fileListParam.push(file);
        }
        return fileListParam;
      },
      revertContent(objData, type) {
        if (type == 1) {
          if (objData.SegContent.length > 0) {
            objData.SegContent = JSON.parse(objData.SegContent)
          } else {
            objData.SegContent = []
          }
          // if (objData.PosFeature.length > 0) {

          //   // objData.PosFeature = JSON.parse(objData.PosFeature)
          // } else {
          //   // objData.PosFeature = []
          // }
          // if (objData.NegFeature.length > 0) {
          //   // objData.NegFeature = JSON.parse(objData.NegFeature)
          // } else {
          //   // objData.NegFeature = []
          // }
          if (objData.PosFeature.length > 0) {
          	objData.PosFeature = this.setFeature(objData.PosFeature)
            // objData.PosFeature = JSON.parse(objData.PosFeature)
          }
          if (objData.NegFeature.length > 0) {
          	objData.NegFeature = this.setFeature(objData.NegFeature);
            // objData.NegFeature = JSON.parse(objData.NegFeature)
          }
        } else {
          objData.forEach((obj, index) => {
            obj.SegContent = JSON.parse(obj.SegContent)
            obj.PosFeature = this.setFeature(obj.PosFeature)
            obj.NegFeature = this.setFeature(obj.NegFeature)
            // obj.PosFeature = JSON.parse(obj.PosFeature)
            // obj.NegFeature = JSON.parse(obj.NegFeature)
          });
        }
        return objData
      },
      setFeature(feature){
        var pattern = /\d+\[[\(\)]*\d+[\(\d\)\|&]*\]/g;  // 匹配'10[1|2]'这种形式的字符串
        var patternArr = [];
        var featureArr = [];
        if(null != (patternArr = feature.match(pattern))){
          // 将feature 拆分成数组
          var findIndex = 0;
          for(var index = 0,len = patternArr.length;index < len;index++){
            var tempStr = patternArr[index];
            var indexOf = feature.indexOf(tempStr,findIndex);
            findIndex = indexOf + tempStr.length;
            if(index < len - 1){
              if(index == 0 && indexOf > 0){
                featureArr.push(this.setHtmlStr(feature.substring(0,indexOf)))
              }
              // 将tempStr转换成html字符串
              var htmlStr = this.setComplexHtmlStr(tempStr);
              featureArr.push(htmlStr);
              var nextStr = patternArr[index+1];
              var nextIndexOf = feature.indexOf(nextStr,findIndex);
              if(nextIndexOf > (indexOf + tempStr.length)){
                featureArr.push(this.setHtmlStr(feature.substring(findIndex,nextIndexOf)))
              }
            }else{
              // 将tempStr转换成html字符串
              var htmlStr = this.setComplexHtmlStr(tempStr);
              featureArr.push(htmlStr);

              featureArr.push(this.setHtmlStr(feature.substring(findIndex)));
            }
          }
          // console.log(featureArr);
        }else{
          return this.setHtmlStr(feature);
        }
        return featureArr.join('');
      },
      setHtmlStr(str){
        var basicFeatureInfo = null == localStorage.getItem('allData') ? [] : JSON.parse(localStorage.getItem('allData')).BasicFeatureInfo;
        if(basicFeatureInfo.length == 0 || str.trim().length == 0 || !(/\d+/.test(str))){
          return str;
        }
        // 匹配str中的所有数字
        var patternArr = str.match(/\d+/g);
        var htmlStrArr = [];
        for(let index = 0,len = patternArr.length;index < len;index++){
          var isMatch = false;
          for(let subIndex = 0, subLen = basicFeatureInfo.length;subIndex < subLen;subIndex++){
            var basicFeature = basicFeatureInfo[subIndex].FeatureInfo;
            for(let subSubIndex = 0, subSubLen = basicFeature.length;subSubIndex < subSubLen;subSubIndex++){
              var feature = basicFeature[subSubIndex];
              if(feature.FeatureId == +patternArr[index]){
                htmlStrArr.push(this.setSpan(feature.FeatureId,feature.FeatureName));
                isMatch = true;
                break;
              }
            }
            if(isMatch){
              break;
            }
          }
        }
        // 将str字符串以数字分隔开
        var splitStrArr = str.split(/\d+/g);
        // 将splitStrArr转化成字符串，中间依次以htmlArr中的元素连接
        var resultStr = '';
        // splitStr.splice(0,1);
        var firsrStr = splitStrArr.splice(0,1);
        for(let index = 0,len = splitStrArr.length;index < len;index++){
          resultStr += (htmlStrArr[index] + splitStrArr[index]);
        }
        return (firsrStr + resultStr);

      },
      setComplexHtmlStr(str){   // 将中括号及前面的数字转换成htmlStr
        var basicFeatureInfo = null == localStorage.getItem('allData') ? [] : JSON.parse(localStorage.getItem('allData')).BasicFeatureInfo;
        if(basicFeatureInfo.length == 0){
          return str;
        }
        // 匹配str中的所有数字
        var patternArr = str.match(/\d+/g);
        var paraContentList = basicFeatureInfo[1].FeatureInfo;
        if(+patternArr[0] != 10 && +patternArr[0] != 11 && +patternArr[0] != 12){
          return str;
        }
        var obj = {},numTypeInfo = [],categoryInfo = [];
        // 找出str所属内容（序号，答题点，或 附属信息）
        for(let index = 0,len = paraContentList.length;index < len;index++){
          var paraContent = paraContentList[index];
          if(paraContent.FeatureId == +patternArr[0]){
            obj = paraContent;
            if(paraContent.FeatureId == 10){ // 序号
              numTypeInfo = paraContent.SNumTypeInfo;
            }else if(paraContent.FeatureId == 11){ // 答题点
              categoryInfo = paraContent.APCategoryInfo;
            }else if(paraContent.FeatureId == 12){ // 附属信息
              categoryInfo = paraContent.AddiCategoryInfo;
            }
            break;
          }
        }
        var htmlStrArr = [];
        htmlStrArr.push(this.setSpan(obj.FeatureId,obj.FeatureName));  // 中括号前面的数字代表的内容
        if(numTypeInfo.length > 0){
          for(let index = 1,len = patternArr.length;index < len;index++){
            for(let subIndex = 0, subLen = numTypeInfo.length;subIndex < subLen;subIndex++){
              var numType = numTypeInfo[subIndex];
              if(numType.SNumTypeId == +patternArr[index]){
                htmlStrArr.push(this.setSpan(numType.SNumTypeId,numType.SNumTypeName));
                break;
              }
            }
          }
        }else if(categoryInfo.length > 0){
          for(let index = 1,len = patternArr.length;index < len;index++){
            for(let subIndex = 0, subLen = categoryInfo.length;subIndex < subLen;subIndex++){
              var category = categoryInfo[subIndex];
              if(category.CategoryId == +patternArr[index]){
                htmlStrArr.push(this.setSpan(category.CategoryId,category.CategoryName));
                break;
              }
            }
          }
        }
        // 将str字符串以数字分隔开
        var splitStrArr = str.split(/\d+/g);
        // 将splitStrArr转化成字符串，中间依次以htmlArr中的元素连接
        var resultStr = '';
        // splitStrArr.splice(0,1);
        var firsrStr = splitStrArr.splice(0,1);
        for(let index = 0,len = splitStrArr.length;index < len;index++){
          resultStr += (htmlStrArr[index] + splitStrArr[index]);
        }
        return (firsrStr + resultStr);
      },
      setSpan(value,name){
        return '<span contenteditable="false" value='+ value +' name='+name+' style="padding:1px 3px;background-color:#f4f4f5;margin-right:2px;">' + name + '</span>';
      },
      setFileResInfoList(fileResInfoList) {
        var filesList = [];
        for (var index = 0, len = fileResInfoList.length; index < len; index++) {
          var fileResInfo = fileResInfoList[index];
          var file = {
            FileDescription: fileResInfo.FileDescription,
            percentFlag: false,
            uploadPercent: 0,
            fileList: [{
              name: fileResInfo.SrcFileName,
              response: {
                Data: fileResInfo
              }
            }]
          };
          filesList.push(file);
        }
        return filesList;
      },
      setDataObj(conditionDataObj) {
        console.log(conditionDataObj)
        if (conditionDataObj.LeadId && conditionDataObj.ConditionId) {
          this.isShowUpdateBtn = true;
          var conditionDataObj = JSON.parse(JSON.stringify(conditionDataObj));
          this.currentPara = this.revertContent(conditionDataObj.BasicParaDataObj, 1);
          this.prevItems = this.revertContent(conditionDataObj.AboveParaList.reverse(), 2);
          this.nextItems = this.revertContent(conditionDataObj.BelowParaList, 2);
          // this.Description = conditionDataObj.Description;
          this.fileResInfoList = this.setFileResInfoList(conditionDataObj.FileResInfoList);
          this.ConditionId = conditionDataObj.ConditionId;
        }
        this.formData.LeadId = this.tableRowData.Id;
        // console.log(this.conditionData)
        // if(this.conditionData.LeadId){
        //   this.isShowUpdateBtn = true;
        //   var conditionDataObj = JSON.parse(JSON.stringify(this.conditionData));
        //   this.currentPara = this.revertContent(conditionDataObj.BasicParaDataObj,1);
        //   this.prevItems = this.revertContent(conditionDataObj.AboveParaList.reverse(),2);
        //   this.nextItems = this.revertContent(conditionDataObj.BelowParaList,2);
        //   this.Description = conditionDataObj.Description;
        // }
      },
      checkParams() {
        // 校验当前段落
        var currentParaObj = this.currentPara;
        if (currentParaObj.ParaContent.trim().length == 0) {
          this.$message.warning('当前段的段落内容不能为空');
          return false;
        }
        if (currentParaObj.SegContent.length == 0) {
          this.$message.warning('当前段的分词结果不能为空');
          return false;
        }
        if (this.prevItems.length == 0 && this.nextItems.length == 0 &&
          currentParaObj.Keyword.trim().length == 0 &&
          currentParaObj.PosFeature.length == 0 &&
          currentParaObj.NegFeature.length == 0) {
          this.$message.warning('当前段要有段落语义特征或者正向段落表现特征或者负向段落表现特征');
          return false;
        }
        // 校验下一段
        var belowParaList = this.nextItems;
        for (var index = 0, len = belowParaList.length; index < len; index++) {
          var belowPara = belowParaList[index];
          if (belowPara.Keyword.trim().length == 0 &&
            belowPara.PosFeature.length == 0 &&
            belowPara.NegFeature.length == 0) {
            continue;
          }
          if (belowPara.Keyword.trim().length > 0 &&
            (belowPara.ParaContent.trim().length == 0 ||
              belowPara.SegContent.length == 0)) {
            this.$message.warning('下一段第' + (index + 1) + '段要有段落内容和分词结果');
            return false;
          }
        }
        // 校验上一段
        var aboveParaList = JSON.parse(JSON.stringify(this.prevItems)).reverse();
        for (var index = 0, len = aboveParaList.length; index < len; index++) {
          var abovePara = aboveParaList[index];
          if (abovePara.Keyword.trim().length == 0 &&
            abovePara.PosFeature.length == 0 &&
            abovePara.NegFeature.length == 0) {
            continue;
          }
          if (abovePara.Keyword.trim().length > 0 &&
            (abovePara.ParaContent.trim().length == 0 ||
              abovePara.SegContent.length == 0)) {
            this.$message.warning('上一段第' + (index + 1) + '段要有段落内容和分词结果');
            return false;
          }
        }
        // 校验文件资源信息列表集合
        var fileResInfoList = this.fileResInfoList;
        if (fileResInfoList.length == 0) {
          this.$message.warning('请上传文件');
          return false;
        }
        for (var index = 0, len = fileResInfoList.length; index < len; index++) {
          var fileResInfo = fileResInfoList[index];
          if (len > 1 && index == len - 1 &&
            fileResInfo.fileList.length == 0 &&
            fileResInfo.FileDescription.trim().length == 0) {
            continue;
          }
          if (fileResInfo.fileList.length == 0) {
            this.$message.warning('第' + (index + 1) + '样例需要上传文件');
            return false;
          }
          if (fileResInfo.FileDescription.trim().length == 0) {
            this.$message.warning('第' + (index + 1) + '样例需要样例说明');
            return false;
          }
        }
        return true;
      },
      submitData() {
        if (!this.checkParams()) {
          return;
        }
        var params = this.setParams(false);
        console.log(params);
        // return;
        let loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading'
        });
        this.$axios({
          method: 'post', //请求的方式
          url: '/api/LeadConstruction/AddCondition',
          data: params
        }).then(res => {
          console.log(res);
          loading.close();
          if (res.status == 200 && res.data != null && res.data.Status == 1) {
            this.$emit('getConditionData', res.data.Data);
            this.conditionData.LeadId = res.data.Data.LeadId;
            this.conditionData.ConditionId = res.data.Data.ConditionId;
            this.ConditionId = res.data.Data.ConditionId;
            this.setDataObj(res.data.Data);
            console.log(this.conditionData)
            this.$message.success(res.data.Msg);
          } else {
            this.$message.warning(res.data.Msg);
          }
        }).catch(error => {
          console.log(error)
          loading.close();
        })
      },
      updateData() {
        if (!this.checkParams()) {
          return;
        }
        var params = this.setParams(true);
        console.log(params);
        let loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading'
        });
        // return;
        this.$axios({
          method: 'put', //请求的方式
          url: '/api/LeadConstruction/UpdateCondition',
          data: params
        }).then(res => {
          console.log(res);
          loading.close();
          if (res.status == 200 && res.data != null && res.data.Status == 1) {
            this.$emit('getConditionData', res.data.Data);
            this.conditionData.LeadId = res.data.Data.LeadId;
            this.conditionData.ConditionId = res.data.Data.ConditionId;
            this.ConditionId = res.data.Data.ConditionId;
            this.setDataObj(res.data.Data);
            console.log(this.conditionData)
            this.$message.success(res.data.Msg);
          } else {
            this.$message.warning(res.data.Msg);
          }

        }).catch(error => {
          console.log(error)
          loading.close();
        })
      }
    },
    watch: {
      conditionData() {
        this.setDataObj(this.conditionData);
      }
    },
    mounted() {
      this.setDataObj(this.conditionData);
    }
  }
</script>

<style>
  @import url("../../assets/css/para-relate.css");
  @import url("../../assets/css/condition-common.css");
  @import url("../../assets/css/common.css");
</style>
