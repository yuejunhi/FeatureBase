<template>
  <div v-cloak>
    <el-tabs v-if="editableTabs.length > 0" v-model="editableTabsValue" type="card">
      <el-tab-pane
        v-for="(item, index) in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name">
        <tab-component :is="item.content" :conditionData="item"></tab-component>
      </el-tab-pane>
    </el-tabs>
    <div v-else style="text-align: center;height: 60px;line-height: 60px;">暂时没有段落特征</div>
  </div>
</template>

<script>
  import ConditionDetail from './ConditionDetail'
  export default {
    name:'ConditionDetailTabs',
    components:{ConditionDetail},
    props:['allConditionsInfo'],
    data() {
      return {
        editableTabsValue: '1',
        editableTabs: []
      }
    },
    methods: {
      setData(){
        this.editableTabs = JSON.parse(JSON.stringify(this.allConditionsInfo));
        for(var index = 0;index < this.editableTabs.length;index++){
          var editableTab = this.editableTabs[index];
          editableTab.title='段落特征'+(index+1);
          editableTab.name = (index + 1) + '';
          editableTab.content = 'ConditionDetail';
        }
        this.tabIndex = this.editableTabs.length;
      },

    },
    watch:{
      allConditionsInfo(){
        this.setData();
      }
    },
    mounted(){
      this.setData();
    }
  }
</script>
