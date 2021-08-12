<template>
  <div class="add-contion-tabs">
    <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit" @tab-click="clickTabs">
      <el-tab-pane
        :key="item.name"
        v-for="(item, index) in editableTabs"
        :label="item.title"
        :name="item.name">
        <!-- <tab-component :is="item.content" :conditionData="item" :tableRowData = "tableRowData"></tab-component> -->
        <tab-component :is="item.content" :conditionData="item" :tableRowData = "tableRowData" @getConditionData = "getConditionData"></tab-component>
      </el-tab-pane>
    </el-tabs>
    <div v-if="editableTabs.length == 0" style="text-align: center;height: 60px;line-height: 60px;">该附属信息暂时没有段落特征</div>
  </div>
</template>

<script>
  import AddOtherCondition from './AddOtherCondition'
   export default {
     name:'AddOtherConditionTabs',
     components:{AddOtherCondition},
     props:['tableRowData','allConditionsInfo'],
      data() {
        return {
          editableTabsValue: '1',
          dataObj:{},
          editableTabs: [],
          tabIndex: 1
        }
      },
      methods: {
        clickTabs(targetName, action){
          console.log(targetName.name)
          // this.editableTabs[+targetName.name - 1].name = '6'
          this.dataObj = this.tableRowData;
          console.log(this.editableTabsValue)
        },
        handleTabsEdit(targetName, action) {
          console.log(action)
          console.log(targetName)
          if (action === 'add') {
            if(this.editableTabs.length == 0 || this.editableTabs[this.editableTabs.length - 1].AdditionalId){
              let newTabName = ++this.tabIndex + '';
              let title = (this.editableTabs.length+1) + '';
              this.editableTabs.push({
                title: '段落特征'+title,
                name: newTabName,
                content: 'AddOtherCondition'
              });
              this.editableTabsValue = newTabName;
              if(this.editableTabs.length == 1){
                this.$emit('getAllConditions',this.editableTabs);
              }
            }else{
              this.$message.warning('有未提交的段落特征，请提交后再添加！')
            }
          }
          if (action === 'remove') {
            this.$confirm('确认删除该段落特征？')
              .then(_ => {
                var _this = this;
                let tabs = this.editableTabs;
                // 获取当前删除的段落特征的下标
                var optIndex = -1;
                tabs.forEach((tab, index) => {
                  if (tab.name === targetName) {
                    optIndex = index;
                  }
                });
                console.log(optIndex)
                var isCompleteDel = true;
                if(optIndex > -1 && tabs[optIndex].AdditionalId && tabs[optIndex].AdditionalId.length > 0 &&
                  tabs[optIndex].ConditionId && tabs[optIndex].ConditionId.length > 0){
                  this.delCondition(tabs[optIndex],targetName,tabs);
                }else{
                  let activeName = this.editableTabsValue;
                  if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                      if (tab.name === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                          activeName = nextTab.name;
                        }
                      }
                    });
                  }

                  this.editableTabsValue = activeName;
                  this.editableTabs = tabs.filter(tab => tab.name !== targetName);
                  this.editableTabs.forEach((tab, index) => {
                    var newTabName = index + 1 + '';
                    tab.title = '段落特征'+newTabName;
                  });
                }
                this.$message.success('删除成功');
                // this.editableTabsValue = (optIndex + 1) + '';
              })
              .catch(_ => {});
          }
        },
        setData(){
          console.log(this.allConditionsInfo)
          if(this.allConditionsInfo.length == 0){
            this.editableTabs = []
            this.tabIndex = 0
            this.editableTabsValue = '1'
            return;
          }
          this.editableTabs = JSON.parse(JSON.stringify(this.allConditionsInfo));
          for(var index = 0;index < this.editableTabs.length;index++){
            var editableTab = this.editableTabs[index];
            editableTab.title='段落特征'+(index+1);
            editableTab.name = (index + 1) + '';
            editableTab.content = 'AddOtherCondition';
          }
          this.tabIndex = this.editableTabs.length;
          if(this.tabIndex == 1){
            this.editableTabsValue = '1'
          }
        },
        getConditionData(dataObj){
          console.log(dataObj)
          let tabs = this.editableTabs;
          // 获取当前删除的段落特征的下标
          var clickIndex = -1;
          tabs.forEach((tab, index) => {
            if (tab.name === this.editableTabsValue) {
              clickIndex = index;
            }
          });
          if(clickIndex > -1){
            var editableTab = this.editableTabs[clickIndex];
            editableTab.AdditionalId = dataObj.AdditionalId;
            editableTab.ConditionId = dataObj.ConditionId;
          }
          console.log(clickIndex);
        },
        delCondition(dataObj,targetName,tabs) {  // 删除段落特征
          let loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading'
          });
          this.$axios({
            method:'delete',  //请求的方式
            url:'/api/AdditionalConstruction/DeleteCondition',
            // headers:{'Content-Type':'application/json'},
            data:[{
              AdditionalId:dataObj.AdditionalId,
              ConditionId:dataObj.ConditionId
            }]
          }).then(res=>{
            console.log(res);
            loading.close();
            if(res.status==200 && res.data != null && res.data.Status==1){

              let activeName = this.editableTabsValue;
              if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                  if (tab.name === targetName) {
                    let nextTab = tabs[index + 1] || tabs[index - 1];
                    if (nextTab) {
                      activeName = nextTab.name;
                    }
                  }
                });
              }
              this.editableTabsValue = activeName;
              this.editableTabs = tabs.filter(tab => tab.name !== targetName);
              this.editableTabs.forEach((tab, index) => {
                var newTabName = index + 1 + '';
                tab.title = '段落特征'+newTabName;
              });
              this.$message.success(res.data.Msg);
            }else{
              this.$message.warning(res.data.Msg);
            }
          }).catch(error=>{
            console.log(error)
            loading.close();
          })
        }
      },
      watch:{
        allConditionsInfo(){
          this.setData();
        }
      },
      mounted(){
        this.setData();
        if(document.getElementsByClassName('el-tabs__new-tab').length > 0){
          document.getElementsByClassName('el-tabs__new-tab')[0].setAttribute('title','添加段落特征')
          document.getElementsByClassName('el-tabs__new-tab')[0].removeAttribute('tabindex')
        }
      }
    }
</script>

<style>
  .add-contion-tabs .el-tabs__new-tab {
    float: right;
    border: 1px solid #d3dce6;
    height: 24px;
    width: 24px;
    line-height: 24px;
    margin: 8px 0 9px 10px;
    border-radius: 5px;
    text-align: center;
    font-size: 12px;
    color: #d3dce6;
    cursor: pointer;
    -webkit-transition: all .15s;
    transition: all .15s;
}
.add-contion-tabs .el-tabs__new-tab:hover {

    border: 1px solid rgb(77, 145, 214);
    font-size: 12px;
    color: rgb(77, 145, 214);
    cursor: pointer;
    -webkit-transition: all .15s;
    transition: all .15s;
}
</style>
