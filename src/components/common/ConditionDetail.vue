<template>
  <div class="condition-common">
    <!-- 上一段 -->
    <div class="relative" v-if="prevItems.length > 0">
      <span class="prev-para w100">上一段:</span>
      <div class="relative" v-for="(item,index) in prevItems" :key="index" >
        <ParaDetail :paraDataObj="item"></ParaDetail>
        <!-- <div style="border: 1px solid #DCDFE6; border-radius: 5px; padding: 10px;margin: 0 120px 10px 120px;">
          <el-form :model="item" ref="form" label-width="115px">
            <el-form-item label="段落内容">
              <div class="seg-content">{{item.ParaContent}}</div>
            </el-form-item>
            <el-form-item label="分词结果">
              <div class="seg-content">
                <span class="seg-content-span" v-for="(item,index) in item.SegContent" :key="index">{{item}}</span>
              </div>
            </el-form-item>
            <el-form-item label="关键词">
              <div class="seg-content">{{item.Keyword}}</div>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="正向基本特征">
                  <div class="seg-content">
                    <span class="feature-span" v-for="(item,index) in item.PosFeature" :key="index">{{item}}</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="负向基本特征">
                  <div class="seg-content">
                    <span class="feature-span" v-for="(item,index) in item.NegFeature " :key="index">{{item}}</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div> -->
      </div>
    </div>
    <!-- 当前段落 -->
    <div class="relative">
      <span class="current-para w100">当前段:</span>
      <div class="relative">
        <ParaDetail :paraDataObj="currentPara"></ParaDetail>
        <!-- <div style="border: 1px solid #DCDFE6; border-radius: 5px; padding: 10px;margin: 0 120px 10px 120px;">
          <el-form :model="currentPara" ref="form" label-width="115px">
            <el-form-item label="段落内容">
                <div class="seg-content">{{currentPara.ParaContent}}</div>
            </el-form-item>
            <el-form-item label="分词结果">
              <div class="seg-content">
                <span class="seg-content-span" v-for="(item,index) in currentPara.SegContent" :key="index">{{item}}</span>
              </div>
            </el-form-item>
            <el-form-item label="关键词">
              <div class="seg-content">{{currentPara.Keyword}}</div>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="正向基本特征">
                  <div class="seg-content">
                    <span class="feature-span" v-for="(item,index) in currentPara.PosFeature" :key="index">{{item}}</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="负向基本特征">
                  <div class="seg-content">
                    <span class="feature-span" v-for="(item,index) in currentPara.NegFeature" :key="index">{{item}}</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div> -->
      </div>

     </div>
     <!-- 下一段 -->
    <div class="relative" v-if="nextItems.length > 0">
      <span class="next-para w100">下一段:</span>
      <div class="relative" v-for="(item,index) in nextItems" :key="index" >
        <ParaDetail :paraDataObj="item"></ParaDetail>
        <!-- <div style="border: 1px solid #DCDFE6; border-radius: 5px; padding: 10px;margin: 0 120px 10px 120px;">
          <el-form :model="item" ref="form" label-width="115px">
            <el-form-item label="段落内容">
              <div class="seg-content">{{item.ParaContent}}</div>
            </el-form-item>
            <el-form-item label="分词结果">
              <div class="seg-content">
                <span class="seg-content-span" v-for="(item,index) in item.SegContent" :key="index">{{item}}</span>
              </div>
            </el-form-item>
            <el-form-item label="关键词">
              <div class="seg-content">{{item.Keyword}}</div>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="正向基本特征">
                  <div class="seg-content">
                     <span class="feature-span" v-for="(item,index) in item.PosFeature" :key="index">{{item}}</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="负向基本特征">
                  <div class="seg-content">
                    <span class="feature-span" v-for="(item,index) in item.NegFeature" :key="index">{{item}}</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div> -->
      </div>
    </div>

    <!-- 上传文件列表 -->
    <div class="relative" v-if="fileResInfoList.length > 0">
      <span class="next-para w100">样例列表:</span>
      <div class="relative" v-for="(item,index) in fileResInfoList" :key="index" >
        <div class="para-border">
          <el-form :model="item" ref="form" label-width="100px">
          <el-form-item label="上传文件">
            <el-upload
              action="#"
              list-type="picture-card"
              :file-list="item.fileList"
              :limit = "1"
              :class="{hide:item.fileList.length == 1 ? true:false}"
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
                    <span title="下载文件"
                      class="el-upload-list__item-delete"
                      @click="handleDownload(file)"
                    >
                      <i class="el-icon-download"></i>
                    </span>
                  </span>
                </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="样例说明">
            <div class="seg-content" style="padding: 2px 15px;">{{item.FileDescription}}</div>
          </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ParaDetail from "./ParaDetail"
  export default {
    name: "ConditionDetail",
    props:['conditionData'],
    components:{ParaDetail},
    data(){
      return{
        currentPara:{
          ParaContent: '',
          SegContent: [],
          Keyword: '',
          PosFeature: [],
          NegFeature: [],
        },
        prevItems:[{
          ParaContent: '',
          SegContent: [],
          Keyword: '',
          PosFeature: [],
          NegFeature: [],
        }],
        nextItems:[{
          ParaContent: '',
          SegContent: [],
          Keyword: '',
          PosFeature: [],
          NegFeature: [],
        }],
        featureTypes:[],
        fileResInfoList:[]
      }
    },
    methods: {
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
        if(file.response && file.response.Data && file.response.Data.DownloadSrc.trim().length > 0){
          const url = file.response.Data.DownloadSrc;
          this.getBlob(url).then(blob => {
            this.saveAs(blob, file.response.Data.SrcFileName);
          });
        }else{
          this.$message.warning('文件错误，无法下载')
        }
      },
      getLabel(values){ // 根据value获取label
        var featureTypes = this.featureTypes;
        if(values.length == 0 || featureTypes.length == 0){
          return [];
        }
        var labels = [];
        for(var index = 0;index < values.length;index++){
          for(var subIndex = 0;subIndex < featureTypes.length;subIndex++){
            if(values[index] == featureTypes[subIndex].value){
              labels.push(featureTypes[subIndex].label);
              break;
            }
          }
        }
        return labels;
      },
      changeSegContent(objData,type){
        if(type == 1){
          if(objData.SegContent.length > 0){
            objData.SegContent = JSON.parse(objData.SegContent)
          }else{
            objData.SegContent = []
          }
          // if(objData.PosFeature.length > 0){
          //   objData.PosFeature = this.getLabel(JSON.parse(objData.PosFeature))
          // }else{
          //   objData.PosFeature = []
          // }
          // if(objData.NegFeature.length > 0){
          //   objData.NegFeature = this.getLabel(JSON.parse(objData.NegFeature))
          // }else{
          //   objData.NegFeature = []
          // }
          if (objData.PosFeature.length > 0) {
          	objData.PosFeature = this.setFeature(objData.PosFeature)
            // objData.PosFeature = JSON.parse(objData.PosFeature)
          }
          if (objData.NegFeature.length > 0) {
          	objData.NegFeature = this.setFeature(objData.NegFeature);
            // objData.NegFeature = JSON.parse(objData.NegFeature)
          }
        }else{
          objData.forEach((obj, index) => {
            obj.SegContent = JSON.parse(obj.SegContent)
            // obj.PosFeature = this.getLabel(JSON.parse(obj.PosFeature))
            // obj.NegFeature = this.getLabel(JSON.parse(obj.NegFeature))
            obj.PosFeature = this.setFeature(obj.PosFeature)
            obj.NegFeature = this.setFeature(obj.NegFeature)
          });
        }
        return objData
      },
      setData(){
        console.log(this.conditionData)
        var conditionDataObj = JSON.parse(JSON.stringify(this.conditionData));
        this.currentPara = this.changeSegContent(conditionDataObj.BasicParaDataObj,1);
        this.prevItems = this.changeSegContent(conditionDataObj.AboveParaList.reverse(),2);
        this.nextItems = this.changeSegContent(conditionDataObj.BelowParaList,2);
        this.fileResInfoList = this.setFileResInfoList(conditionDataObj.FileResInfoList);
      },
      setFeature(feature){
        var pattern = /\d+\[[\(\)]*\d+[\(\d\)\|&]*\]/g;
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
        // 将ssplitStrArr转化成字符串，中间依次以htmlArr中的元素连接
        var resultStr = '';
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
        var firsrStr = splitStrArr.splice(0,1);
        for(let index = 0,len = splitStrArr.length;index < len;index++){
          resultStr += (htmlStrArr[index] + splitStrArr[index]);
        }
        return (firsrStr + resultStr);
      },
      setSpan(value,name){
        return '<span contenteditable="false" value='+ value +' name='+name+' style="padding:1px 3px;background-color:#f4f4f5;margin-right:2px;">' + name + '</span>';
      },
      setFileResInfoList(fileResInfoList){
        if(fileResInfoList.length == 0){
          return [];
        }
        var filesList = [];
        for(var index = 0,len = fileResInfoList.length;index < len;index++){
          var fileResInfo = fileResInfoList[index];
          var file = {
            FileDescription:fileResInfo.FileDescription,
            fileList:[{
              name:fileResInfo.SrcFileName,
              response:{
                Data:fileResInfo
              }
            }]
          };
          filesList.push(file);
        }
        return filesList;
      }
    },
    watch:{
      conditionData(){
        this.setData();
      }
    },
    created() {

    },
    mounted(){
      // if(null != localStorage.getItem('featureTypes')){
      // 	this.featureTypes = JSON.parse(localStorage.getItem('featureTypes'));
      // }
      this.setData();
    }
  }
</script>

<style>
  @import url("../../assets/css/para-relate.css");
  @import url("../../assets/css/condition-common.css");
  @import url("../../assets/css/common.css");
</style>
