var setSpan = function(value,name){
  return '<span contenteditable="false" value='+ value +' name='+name+' style="padding:1px 3px;background-color:#f4f4f5;margin-right:2px;">' + name + '</span>';
};
var setComplexHtmlStr = function(str){   // 将中括号及前面的数字转换成htmlStr
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
  htmlStrArr.push(setSpan(obj.FeatureId,obj.FeatureName));  // 中括号前面的数字代表的内容
  if(numTypeInfo.length > 0){
    for(let index = 1,len = patternArr.length;index < len;index++){
      for(let subIndex = 0, subLen = numTypeInfo.length;subIndex < subLen;subIndex++){
        var numType = numTypeInfo[subIndex];
        if(numType.SNumTypeId == +patternArr[index]){
          htmlStrArr.push(setSpan(numType.SNumTypeId,numType.SNumTypeName));
          break;
        }
      }
    }
  }else if(categoryInfo.length > 0){
    for(let index = 1,len = patternArr.length;index < len;index++){
      for(let subIndex = 0, subLen = categoryInfo.length;subIndex < subLen;subIndex++){
        var category = categoryInfo[subIndex];
        if(category.CategoryId == +patternArr[index]){
          htmlStrArr.push(setSpan(category.CategoryId,category.CategoryName));
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
};
var setHtmlStr = function(str){
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
          htmlStrArr.push(setSpan(feature.FeatureId,feature.FeatureName));
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

};
var setFeature = function(feature){
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
          featureArr.push(setHtmlStr(feature.substring(0,indexOf)))
        }
        // 将tempStr转换成html字符串
        var htmlStr = setComplexHtmlStr(tempStr);
        featureArr.push(htmlStr);
        var nextStr = patternArr[index+1];
        var nextIndexOf = feature.indexOf(nextStr,findIndex);
        if(nextIndexOf > (indexOf + tempStr.length)){
          featureArr.push(setHtmlStr(feature.substring(findIndex,nextIndexOf)))
        }
      }else{
        // 将tempStr转换成html字符串
        var htmlStr = setComplexHtmlStr(tempStr);
        featureArr.push(htmlStr);
        featureArr.push(setHtmlStr(feature.substring(findIndex)));
      }
    }
    // console.log(featureArr);
  }else{
    return setHtmlStr(feature);
  }
  return featureArr.join('');
};
export default {setFeature}
