<template>
  <div class="para-border">
    <el-form :model="paraDataObj" ref="form" label-width="130px">
      <el-form-item label="段落内容">
        <!-- <el-input type="textarea" v-model="item.ParaContent"></el-input> -->
        <div class="seg-content">{{paraDataObj.ParaContent}}</div>
      </el-form-item>
      <el-form-item label="分词结果">
        <!-- <el-input type="textarea" v-model="ruleForm.segContent" :disabled="true"></el-input> -->
        <div class="seg-content">
          <span class="seg-content-span" v-for="(item,index) in paraDataObj.SegContent" :key="index">{{item}}</span>
        </div>
      </el-form-item>
      <el-form-item label="段落语义特征">
        <div class="seg-content">{{paraDataObj.Keyword}}</div>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="正向段落表现特征">
            <!-- <el-select v-model="item.PosFeature" multiple  placeholder="导语类型">
              <el-option v-for="item in leadTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select> -->
            <div class="seg-content" v-html="paraDataObj.PosFeature">
              <!-- <span class="feature-span" v-for="(item,index) in paraDataObj.PosFeature" :key="index">{{item}}</span> -->
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="负向段落表现特征">
            <!-- <el-select v-model="item.NegFeature" multiple  placeholder="导语类型">
              <el-option v-for="item in leadTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select> -->
            <div class="seg-content" v-html="paraDataObj.NegFeature">
              <!-- <span class="feature-span" v-for="(item,index) in paraDataObj.NegFeature " :key="index">{{item}}</span> -->
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
 export default{
   name:'ParaDetail',
   props:['paraDataObj'],
   data(){
     return{

     }
   },
   mounted(){
     console.log(this.paraDataObj)
   }
 }
</script>

<style>
  @import url("../../assets/css/common.css");
</style>
