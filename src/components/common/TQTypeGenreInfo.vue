<template>
  <el-popover
      placement="top"
      width="200"
      trigger="click">
      <div class="m4" v-html="contentHtml"></div>
      <span slot="reference" class="icon" title="点击查看说明"><i class="el-icon-info"></i></span>
      <!-- <el-button slot="reference" size="mini" circle style="font-size: 12px;"><i class="el-icon-info"></i></el-button> -->
    </el-popover>
</template>

<script>
export default{
  props:['type'],
  data(){
    return{
      contentHtml:''
    }
  },
  mounted() {
    console.log(this.type)
    if(this.type == '0'){
      this.contentHtml = "<p style='margin:4px 0;'>根据导语本身得到的题型体裁</p>"
    }else{
      this.contentHtml = "<p style='margin:4px 0;'>根据试题得到的题型体裁，作为根据导语得到的题型体裁的补充</p>";
    }
  }
}
</script>

<style scoped>
  span.icon{
    display: inline-block;
    font-size: 20px;
    margin-left: 3px;
    cursor: pointer;
  }
</style>
