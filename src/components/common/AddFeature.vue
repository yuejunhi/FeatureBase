<template>
  <div class="basic-panel">
    <div style="position: relative;">
      <div>
        <div class="input" contenteditable="true" ref="divEdit"  @blur="onBlur" @input="inputChange($event)" @keydown="inputChange($event)" @contextmenu=" $event.preventDefault()" style="ime-mode:disabled"></div>
      </div>
      <span style="position: absolute;right: 10px;top: 5px;">
        <el-popover
            placement="top"
            width="280"
            trigger="click">
            <p><span class="red">|</span>: 或,表示多个特征存在一个即可</p>
            <p><span class="red">&</span>: 且,表示多个特征必须同时满足</p>
            <p><span class="red">[ ]</span>: 放在基本特征后面,中间放该特征的属性</p>
            <p><span class="red">( )</span>: 表示优先级,和数学中括号意义一样</p>
            <span slot="reference" title="点击查看说明" style="display: inline-block;font-size: 20px;cursor: pointer;"><i class="el-icon-info"></i></span>
          </el-popover>
      </span>
    </div>
    <div class="basic-content">
      <div class="panel" v-for="(item,index) in baseData" :key="index">
        <p class="panel-title no-copy">{{item.CategoryName}}</p>
        <div class="base-panel">
          <ul>
            <li class="no-copy" v-for="(child,subIndex) in item.FeatureInfo" :key="child.FeatureId + subIndex">
              <label class="fl"><input type="checkbox" :value="child.FeatureId" :name="child.FeatureName" :checked="child.checked" @change="showValue(child)" /></label>
              <span class="label-text fr" :class="{activeColor:child.checked}" @click="showChildren(child,index)">
                <span :title="child.FeatureName">{{child.FeatureName}}</span>
                <span class="fr" v-if="child.FeatureId == 10 || child.FeatureId == 11 || child.FeatureId == 12"> > </span>
              </span>

            </li>
          </ul>
          <!-- 序号类型 -->
          <ul class="common" v-if="childrenData.length > 0 && childrenData[index].length > 0 && childrenData[index][0].SNumTypeId">
            <li class="no-copy" v-for="(child,subIndex) in childrenData[index]" :key="child.SNumTypeId + subIndex">
              <label><input type="checkbox" :value="child.SNumTypeId" :name="child.SNumTypeName" :checked="child.checked" @change="showValue(child)" /></label>
              <span class="label-text fr" :title="child.SNumTypeName" :class="{activeColor:child.checked}">{{child.SNumTypeName}}</span>
            </li>
          </ul>
          <!-- 答题点和 附属信息类型-->
          <ul class="common" v-if="childrenData.length > 0 && childrenData[index].length > 0 && childrenData[index][0].CategoryId">
            <li class="no-copy" v-for="(child,subIndex) in childrenData[index]" :key="child.CategoryId + subIndex">
              <label><input type="checkbox" :value="child.CategoryId" :name="child.CategoryName" :checked="child.checked" @change="showValue(child)" /></label>
              <span class="label-text fr" :title="child.CategoryName" :class="{activeColor:child.checked}">{{child.CategoryName}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import rangy from '../../../static/rangy-core.js'
  export default {
    name: 'AddFeature',
    props:['featureData'],
    data() {
      return {
        isShow: false,
        editContent:'',
        divValue: '',
        checkedValue: [],
        clickedEventArr:[],
        leaveIndex: 0,
        range:null,
        childrenData:[],
        baseData: []
      }
    },
    methods: {
      inputChange(event) {
        console.log(event);
         var keyCode = event.keyCode || event.which || event.charCode;
        if(event.shiftKey && (keyCode == 48 || keyCode == 57 || keyCode == 55 || keyCode == 220)){
          // 48- (  57-)             55-&   220-|

        } else if(keyCode == 219 || keyCode == 221 || keyCode == 8 ||
        keyCode == 46 || keyCode == 35 || keyCode == 36|| keyCode == 37 || keyCode == 39){
          // 8-backspace  219-[  221-]  46-Delete  36-home 35-End 37-向左  39-向右
        }else{
          event.returnValue = false;
          event.preventDefault();
          // return false;
        }
        var html = $(this.$refs.divEdit).html();
        // console.log(this.$refs.divEdit.innerHTML);
        // console.log(html);
        // console.log($('<div>'+ html +'</div>').children())
        // console.log($('<div>' + this.divValue +'</div>').children())

        if($('<div>'+ html +'</div>').children().length != $('<div>' + this.divValue +'</div>').children().length){
          var notMatchCheckValue = [];
          for(var index = 0,len = this.checkedValue.length;index < len;index++){
            var value = this.checkedValue[index];
            var isEquel = false;
            $(this.$refs.divEdit).children().each(function(subIndex,val){
              if(($(val).attr('value') + $(val).attr('name')) == value){
                isEquel = true;
              }
            });
            if(!isEquel){
              notMatchCheckValue.push(value);
              this.checkedValue.splice(index,1);
            }
          }
          console.log(notMatchCheckValue);

          for(var index = 0,len = this.baseData.length;index < len;index++) {
            var temp = this.baseData[index];
            if(notMatchCheckValue.length == 0){
              break;
            }
            for(var subindex = 0,subLen = temp.FeatureInfo.length;subindex < subLen;subindex++){
              if(notMatchCheckValue.length == 0){
                break;
              }
              var featureInfo = temp.FeatureInfo[subindex];
              if((featureInfo.FeatureId + featureInfo.FeatureName) == notMatchCheckValue[0]){
                // childrenV.checked = false;
                this.$set(featureInfo,'checked',false);
                notMatchCheckValue.splice(0,1);
              }
              if(notMatchCheckValue.length == 0){
                break;
              }
              if (featureInfo.FeatureId == 10){  // 序号
                for(var subsubIndex = 0,subsubLen = featureInfo.SNumTypeInfo.length;subsubIndex < subsubLen;subsubIndex++){
                  var subChild = featureInfo.SNumTypeInfo[subsubIndex];
                  if((subChild.SNumTypeId + subChild.SNumTypeName) == notMatchCheckValue[0]){
                    this.$set(subChild,'checked',false);
                    notMatchCheckValue.splice(0,1);
                  }
                  if(notMatchCheckValue.length == 0){
                    break;
                  }
                }
              }else {
                var children = [];
                if (featureInfo.FeatureId == 11){ // 答题点
                  children = featureInfo.APCategoryInfo;
                }else if (featureInfo.FeatureId == 12){ // 附属信息
                  children = featureInfo.AddiCategoryInfo;
                }
                if(children.length > 0){
                  for(var subsubIndex = 0,subsubLen = children.length;subsubIndex < subsubLen;subsubIndex++){
                    var subChild = children[subsubIndex];
                    if((subChild.CategoryId + subChild.CategoryName) == notMatchCheckValue[0]){
                      this.$set(subChild,'checked',false);
                      notMatchCheckValue.splice(0,1);
                    }
                    if(notMatchCheckValue.length == 0){
                      break;
                    }
                  }
                }
              }
            }
          }
        }
        this.divValue = $(this.$refs.divEdit).html();
        this.$emit('getFeatureData',this.divValue);
        // console.log(this.divValue)
      },
      getFirstRange() {
        var sel = rangy.getSelection();
        return sel.rangeCount ? sel.getRangeAt(0) : null;
      },
      onBlur(event) {
        var range = this.getFirstRange();
        if(range.startContainer && range.startContainer.nodeName == '#text' &&
          null != range.startContainer.parentNode &&
          range.startContainer.parentNode.nodeName == 'SPAN'){
            var startOffset = range.startOffset;
            if(range.startContainer.textContent && (startOffset >= range.startContainer.textContent.length/2)){ // 靠近右侧
              range.setEndAfter(range.startContainer.parentNode);
            }else{ // 靠近左侧
              if(null != range.startContainer.parentNode.previousSibling){ // 左侧有节点
                range.setEndAfter(range.startContainer.parentNode.previousSibling);
              }else{// 靠近右侧
                range.setEndAfter(range.startContainer.parentNode);
              }
            }
          range.collapse(false);
          this.range = range;
          return;
        }
        this.range = range;
      },
      showChildren(item, index) {
        if(this.clickedEventArr[index] != null){
          $(this.clickedEventArr[index]).removeClass('fsblod');
        }
        var children = [];
        if (item.FeatureId == 10){  // 序号
          children = item.SNumTypeInfo;
        }else if (item.FeatureId == 11){ // 答题点
          children = item.APCategoryInfo;
        }else if (item.FeatureId == 12){ // 附属信息
          children = item.AddiCategoryInfo;
        }
        console.log(children)
        if (children && children.length > 0) {
          this.$set(this.childrenData,index,children);
          // this.childrenData[index] = children;
          $(event.target).addClass('fsblod');
          this.$set(this.clickedEventArr,index,event.target);
          // this.clickedEventArr[index] = event.target;
        }else{
          this.$set(this.childrenData,index,[]);
        }
      },
      showValue(item) {
        console.log(event.target.checked);
        var value = event.target.value,
        name = event.target.name;
        if (event.target.checked) {
          this.checkedValue.push(value + name);
          var range = this.range;
          this.$set(item,'checked',true);
          if(range != null){
            var el = document.createElement("span");
            el.setAttribute('contenteditable',false);
            el.setAttribute('value',value);
            el.setAttribute('name',name);
            el.style.backgroundColor = "#f4f4f5";
            el.style.padding = "1px 3px";
            // el.style.fontWeight = "bold";
            el.style.marginRight = "2px";
            el.style.userModify = "read-only";
            el.appendChild(document.createTextNode(name));
            range.insertNode(el);   //
            range.setEndAfter(el);
            range.collapse(false);
            rangy.getSelection().setSingleRange(range);
            this.range = range;
          }else{
            var span = '<span contenteditable="false" value='+ value +' name='+name+' style="padding:1px 3px;background-color:#f4f4f5;margin-right:2px;user-modify: read-only;">' + name + '</span>';
            // this.editContent += span;
            $(this.$refs.divEdit).html($(this.$refs.divEdit).html() + span);
          }
        } else {
          var indexOf = this.checkedValue.indexOf(value + name);
          if (indexOf > -1) {
            this.$set(item,'checked',false);
            this.checkedValue.splice(indexOf, 1);
            $(this.$refs.divEdit).children().each(function(index,val){
              if(($(val).attr('value') + $(val).attr('name'))  == (value + name)){
                $(val).remove();
              }
            })
            this.range = null;
          }
        }
        this.divValue = $(this.$refs.divEdit).html();
        // console.log(this.range)
        console.log(this.checkedValue);
        this.$emit('getFeatureData',this.divValue);

      },
      reShowFeature(){   // 回显正负段落表现特征
        this.checkedValue = [];
        this.divValue = $(this.$refs.divEdit).html();
        var notMatchCheckValue = [];
        var that = this;
        $(this.$refs.divEdit).children().each(function(subIndex,val){
          that.checkedValue.push($(val).attr('value') + $(val).attr('name'));
          notMatchCheckValue.push($(val).attr('value') + $(val).attr('name'));
        });

        for(var parentIndex = 0,parentLen = this.checkedValue.length;parentIndex < parentLen;parentIndex++){
          // var value = this.checkedValue[index];
          for(var index = 0,len = this.baseData.length;index < len;index++) {
            var temp = this.baseData[index];
            if(notMatchCheckValue.length == 0){
              break;
            }
            for(var subindex = 0,subLen = temp.FeatureInfo.length;subindex < subLen;subindex++){
              if(notMatchCheckValue.length == 0){
                break;
              }
              var featureInfo = temp.FeatureInfo[subindex];
              if((featureInfo.FeatureId + featureInfo.FeatureName) == notMatchCheckValue[0]){
                // childrenV.checked = false;
                this.$set(featureInfo,'checked',true);
                notMatchCheckValue.splice(0,1);
              }
              if(notMatchCheckValue.length == 0){
                break;
              }
              if (featureInfo.FeatureId == 10){  // 序号
                for(var subsubIndex = 0,subsubLen = featureInfo.SNumTypeInfo.length;subsubIndex < subsubLen;subsubIndex++){
                  var subChild = featureInfo.SNumTypeInfo[subsubIndex];
                  if((subChild.SNumTypeId + subChild.SNumTypeName) == notMatchCheckValue[0]){
                    this.$set(subChild,'checked',true);
                    notMatchCheckValue.splice(0,1);
                  }
                  if(notMatchCheckValue.length == 0){
                    break;
                  }
                }
              }else {
                var children = [];
                if (featureInfo.FeatureId == 11){ // 答题点
                  children = featureInfo.APCategoryInfo;
                }else if (featureInfo.FeatureId == 12){ // 附属信息
                  children = featureInfo.AddiCategoryInfo;
                }
                if(children.length > 0){
                  for(var subsubIndex = 0,subsubLen = children.length;subsubIndex < subsubLen;subsubIndex++){
                    var subChild = children[subsubIndex];
                    if((subChild.CategoryId + subChild.CategoryName) == notMatchCheckValue[0]){
                      this.$set(subChild,'checked',true);
                      notMatchCheckValue.splice(0,1);
                    }
                    if(notMatchCheckValue.length == 0){
                      break;
                    }
                  }
                }
              }
            }
          }
        }

      },
      setBaseData(){
        this.baseData = JSON.parse(localStorage.getItem('allData')).BasicFeatureInfo;
        this.childrenData = [];
        this.clickedEventArr = [];
        for(var index = 0;index < this.baseData.length;index++){
          this.childrenData.push([]);
          this.clickedEventArr.push(null);
        }
        console.log(this.childrenData);
        console.log(this.featureData);
      }
    },
    watch:{
      featureData(){
        rangy.init();
        this.range = null;
        console.log(this.featureData)
        $(this.$refs.divEdit).html(this.featureData);
        this.setBaseData();
        this.reShowFeature();
      }
    },
    mounted() {
      rangy.init();
      console.log(rangy)
      $(this.$refs.divEdit).html(this.featureData);
      console.log($(this.$refs.divEdit).html());
      console.log($(this.$refs.divEdit).html());
      this.$emit('getFeatureData',this.featureData);
      this.range = null;
      this.setBaseData();
      this.reShowFeature();
      console.log(JSON.parse(localStorage.getItem('allData')));
    }
  }
</script>

<style scoped>
  @import url("../../assets/css/add-feature.css");
</style>
<!-- <li >五月份工作完成良好，达到了预期目标，对错误试题检测较为准确，遇到问题能积极主动沟通，解决。六月份工作计划合理，完成该计划需要对各个题型以及试题结构有清楚的认识，能加强对所做项目的认知</li> -->
