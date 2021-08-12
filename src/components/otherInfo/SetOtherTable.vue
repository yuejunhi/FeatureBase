<template>
  <div class="common-table">
    <el-table
      :data="data.RecordData"
      stripe
      style="width: 100%;" max-height="480">
      <el-table-column fixed type="index" :index="currentIndex" label="序号" width="50"></el-table-column>
      <el-table-column prop="Content" label="内容" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="Keyword" label="关键词" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="CategoryName" label="类型"></el-table-column>
      <el-table-column prop="CreateTime" label="创建时间"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="infoClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="delClick(scope.$index, data.RecordData)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="paginationObj.currentPage"
      :page-size="paginationObj.pageSize"
      layout="prev, pager, next, jumper"
      :total="paginationObj.total">
    </el-pagination>
    <!--查看详情和编辑-->
    <el-dialog
      :title="title"
      width="70%"  top="10vh"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :fullscreen = 'fullscreen'
      :visible.sync="dialogVisible"
      :before-close="handleClose">
      <el-tabs type="card" v-model="activeName" @tab-click="tabClick">
        <el-tab-pane :label="otherObj.otherLabel" name="first">
          <OtherDetail v-if="isInfo" :tableRowData="tableRowData"></OtherDetail>   <!--详情-->
          <EditOther v-else :tableRowData="tableRowData" :searchContionObj="searchContionObj" @resetAdditionObj="resetAdditionObj"></EditOther> <!--编辑-->
        </el-tab-pane>
        <el-tab-pane :label="otherObj.conditionLabel" name="second">
          <div v-if="isClickSecond">
            <ConditionDetailTabs v-if="isInfo" :allConditionsInfo="allConditionsInfo"></ConditionDetailTabs> <!--详情-->
            <AddOtherConditionTabs v-else :tableRowData="tableRowData"  :allConditionsInfo="allConditionsInfo" @getAllConditions = "getAllConditions"></AddOtherConditionTabs> <!--编辑-->
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>

</template>

<script>
import OtherDetail from "./OtherDetail"
import EditOther from "./EditOther"
import ConditionDetailTabs from "../common/ConditionDetailTabs"
import AddOtherConditionTabs from "./AddOtherConditionTabs"
export default {
  name: "SetOtherTable",
  props:['data'],
  components:{OtherDetail,EditOther,ConditionDetailTabs,AddOtherConditionTabs},
  data(){
    return{
      dialogVisible: false,
      fullscreen: false,
      isInfo: false,
      isClickSecond: false,
      activeName: 'first',
      currentIndex:1,
      paginationObj:{  // 分页数据
        currentPage: 1,
        pageSize: 10,
        total:0
      },
      searchContionObj:{  // 搜索条件
        SubjectCode: '',
        Keyword: '',
        MatchContent: '',
        CategoryId: 15,
        PageIndex: 1,
        PageSize: 10
      },
      formLabelWidth: '120px',
      title: '查看详情',
      otherObj:{
        otherLabel:'附属信息详情',
        conditionLabel:'条件详情'
      },
      tableRowData:{
        Id: '',
        Content:'',
        segContent:[],
        Keyword:'',
        CategoryName:''
      },
      allConditionsInfo:[]
    }
  },
  methods:{
    tabClick(tab, event) {
      // console.log(tab, event);
      // console.log(this.activeName);
      if(this.activeName == 'first'){

      }else{
        this.isClickSecond = true;
        this.getAllConditionsInfo();
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    resetAdditionObj(resetAdditionObj){
      this.tableRowData.Id = resetAdditionObj.resetAdditionId;
      this.$emit('getCurrentPageIndex', resetAdditionObj.PageIndex);
      this.allConditionsInfo = [];
    },
    getAllConditions(allConditionsInfo){
      // 当附属信息没有条件时，新加条件时将像条件数组中添加该条件，为了防止切换tab时，将该条件冲掉
      console.log(this.allConditionsInfo);
      this.allConditionsInfo = allConditionsInfo;
      console.log(this.allConditionsInfo);
    },
    getAllConditionsInfo(){
      if(this.allConditionsInfo.length > 0){
        return;
      }
      let loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading'
      });
      this.$axios({
        method:'get',  //请求的方式
        url:'/api/AdditionalConstruction/GetConditionDetailByCondition',
        // headers:{'Content-Type':'application/json'},
        params:{SearchId:this.tableRowData.Id}
      }).then(res=>{
        console.log(res);
        if(res.status==200 && res.data != null && res.data.Status==1){
          this.allConditionsInfo = res.data.Data
        }else{
          this.allConditionsInfo = []
        }
        setTimeout(function(){loading.close();},50)

      }).catch(error=>{
        console.log(error);
        loading.close();
      })
    },
    setPaginationObjAndSearchContionObj(){
      if(this.data.PageIndex){
        this.paginationObj.currentPage = this.data.PageIndex;
        this.paginationObj.pageSize = this.data.PageSize;
        // this.paginationObj.pageSize = 1;
        this.paginationObj.total = this.data.TotalCount;
        this.searchContionObj = this.data.searchContionObj;
        this.currentIndex = (this.paginationObj.currentPage - 1) * this.paginationObj.pageSize + 1;
      }
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$emit('getCurrentPageIndex',val);

    },
    handleClose(){
      this.dialogVisible = false;
      this.isInfo = true;
      this.isClickSecond = false;
      this.allConditionsInfo = [];
    },
    infoClick:function (row) { // 查看详情
       console.log(row);
       this.activeName = 'first';
       this.isInfo = true;
       this.dialogVisible = true;
       this.title = '查看详情';
       this.otherObj.otherLabel = '附属信息详情';
       this.otherObj.conditionLabel = '段落特征详情';
       this.tableRowData = row;
       this.tableRowData.segContent = JSON.parse(row.SegContent);
    },
    editClick:function (row) {  // 编辑导语
      this.activeName = 'first';
      this.isInfo = false;
      this.dialogVisible = true;
      this.title = '编辑';
      this.otherObj.otherLabel = '附属信息编辑';
      this.otherObj.conditionLabel = '段落特征编辑';
      this.tableRowData = row;
      this.tableRowData.segContent = JSON.parse(row.SegContent);
    },
    delClick:function (index, rows) {  // 删除导语
      var rowId = rows[index].Id;
      console.log(rowId);
      this.$confirm('确认删除？')
        .then(_ => {
          let loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading'
          });
          this.$axios({
            method:'delete',  //请求的方式
            url:'/api/AdditionalConstruction/DeleteAdditional',
            // headers:{'Content-Type':'application/json'},
            data:[{Id:rows[index].Id}]
          }).then(res=>{
            console.log(res);
            loading.close();
            if(res.status==200 && res.data != null && res.data.Status==1){
              rows.splice(index, 1);
              var pages = parseInt(this.paginationObj.total / this.searchContionObj.PageSize) + 1;
              console.log(pages);
              if(rows.length == 0 && pages > 1 &&
                pages == this.searchContionObj.PageIndex){
                this.$emit('getCurrentPageIndex',this.searchContionObj.PageIndex - 1);
              }else{
                this.$emit('getCurrentPageIndex',this.searchContionObj.PageIndex);
              }
              this.$message.success(res.data.Msg);
            }else{
              this.$message.warning(res.data.Msg);
            }
          }).catch(error=>{
            console.log(error)
            loading.close();
          })

        })
        .catch(_ => {});
    }
  },
  watch:{
    data:function(newValue,oldValue){
      // console.log(newValue == this.data);
      this.setPaginationObjAndSearchContionObj();
    }
  },
  mounted(){
    // this.tableData.splice(10,20)
    // this.paginationObj.total = this.data.RecordData.length;
   console.log(this.data)
   this.setPaginationObjAndSearchContionObj();
  }
}
</script>

<style>
 @import url("../../assets/css/set-table.css");
</style>
