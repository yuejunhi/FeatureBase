<template>
  <div class="common-table">
    <el-table
      :data="data.RecordData"
      stripe
      style="width: 100%;" max-height="480">
      <el-table-column fixed type="index" :index="currentIndex" label="序号" width="50"></el-table-column>
      <el-table-column prop="Content" label="导语" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="Keyword" label="导语关键词" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="CategoryName" label="导语类型"></el-table-column>
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
        <el-tab-pane :label="labelObj.leadLabel" name="first">
          <LeadDetail v-if="isInfo" :tableRowData="tableRowData"></LeadDetail>   <!--导语详情-->
          <EditLead v-else :tableRowData="tableRowData" :searchContionObj="searchContionObj" @resetLeadObj="resetLeadObj"></EditLead> <!--导语编辑-->
        </el-tab-pane>
        <el-tab-pane :label="labelObj.conditionLabel" name="second">
          <div v-if="isClickSecond">
            <ConditionDetailTabs v-if="isInfo" :allConditionsInfo="allConditionsInfo"></ConditionDetailTabs>
            <!-- <AddLeadConditionTabs v-else :tableRowData="tableRowData"></AddLeadConditionTabs> -->
            <AddLeadConditionTabs v-else :tableRowData="tableRowData"  :allConditionsInfo="allConditionsInfo" @getAllConditions = "getAllConditions"></AddLeadConditionTabs>
          </div>

        </el-tab-pane>
      </el-tabs>
      <!--<span slot="footer" class="dialog-footer" v-if = "disabled">-->
        <!--<el-button @click="dialogVisible = false">返 回</el-button>-->
      <!--</span>-->
      <!--<span slot="footer" class="dialog-footer" v-if = "!disabled">-->
        <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
        <!--<el-button type="primary" @click="dialogVisible = false" :rowId = "rowId">确 定</el-button>-->
      <!--</span>-->
    </el-dialog>
  </div>

</template>

<script>
  import LeadDetail from "./LeadDetail"
  import EditLead from "./EditLead"
  import ConditionDetailTabs from "../common/ConditionDetailTabs"
  import AddLeadConditionTabs from "./AddLeadConditionTabs"
    export default {
        name: "SetLeadTable",
        props:['data'],
        components:{LeadDetail,EditLead,ConditionDetailTabs,AddLeadConditionTabs},
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
                CategoryId: 0,
                SubjectCode: '',
                QTypeCode: '',
                GenreCode: -1,
                Keyword: '',
                MatchContent: '',
                PageIndex: 1,
                PageSize: 10
              },
              formLabelWidth: '120px',
              title: '查看详情',
              labelObj:{
                leadLabel:'导语详情',
                conditionLabel:'段落特征详情'
              },
              tableRowData:{
                Id: '',
                Content:'',
                segContent:[],
                Keyword:'',
                CategoryName:'',
                QTypeInfoList:[]
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
          // 日期格式化
          dateFormatter (row, column) {
            let datetime = row.CreateTime;
            if(datetime){
              datetime = new Date(datetime);
              let y = datetime.getFullYear() + '-';
              let mon = datetime.getMonth()+1 + '-';
              let d = datetime.getDate();
              let h = datetime.getHours() + ':';
              let min = datetime.getMinutes();
              return y + mon + d +'  ' + h + min;
            }
            return ''
          },
          handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
          },
          resetLeadObj(resetLeadObj){
            this.tableRowData.Id = resetLeadObj.resetLeadId;
            this.$emit('getCurrentPageIndex', resetLeadObj.PageIndex);
            this.allConditionsInfo = [];
          },
          getAllConditions(allConditionsInfo){
            // 当导语没有条件时，新加条件时将像条件数组中添加该条件，为了防止切换tab时，将该条件冲掉
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
              url:'/api/LeadConstruction/GetConditionDetailByCondition',
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

            // console.log(this.data.RecordData)
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
             this.labelObj.leadLabel = '导语详情';
             this.labelObj.conditionLabel = '段落特征详情';
             this.tableRowData = row;
             this.tableRowData.segContent = JSON.parse(row.SegContent);

          },
          editClick:function (row) {  // 编辑导语
            this.activeName = 'first';
            this.isInfo = false;
            this.dialogVisible = true;
            this.title = '编辑';
            this.labelObj.leadLabel = '导语编辑';
            this.labelObj.conditionLabel = '段落特征编辑';
            this.tableRowData = row;
            this.tableRowData.segContent = JSON.parse(row.SegContent);
          },
          delClick:function (index, rows) {  // 删除导语
            var rowId = rows[index].Id;
            console.log(rowId);
            this.$confirm('确认删除该导语？')
              .then(_ => {
                let loading = this.$loading({
                  lock: true,
                  text: 'Loading',
                  spinner: 'el-icon-loading'
                });
                this.$axios({
                  method:'delete',  //请求的方式
                  url:'/api/LeadConstruction/DeleteLead',
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
       mounted(){
          // this.tableData.splice(10,20)
          // this.paginationObj.total = this.data.RecordData.length;
         console.log(this.data)
         this.setPaginationObjAndSearchContionObj();
       },
      watch:{
          data:function(newValue,oldValue){
            // console.log(newValue == this.data);
            this.setPaginationObjAndSearchContionObj();
          }
      }
    }
</script>

<style>
@import url("../../assets/css/set-table.css");
</style>
