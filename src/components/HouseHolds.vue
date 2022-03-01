<template>
    <div class="households">
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">户信息管理</el-breadcrumb-item>
        
        <el-breadcrumb-item><a href="/">户信息列表</a></el-breadcrumb-item>
    </el-breadcrumb>
    <div class="an">
      <el-button type="info" plain @click="goAddHouse('/about/addhouseholds')">主要按钮</el-button>
    </div>
    <!-- （当前页数-1）*当前条数，当前页数*当前条数 -->
  <el-table
    :data="tableData.slice((currentpage-1)*pagesize,currentpage*pagesize)"
    border
    style="width: 100%"
    height="370">
    <el-table-column
      fixed
      prop="hname"
      label="户主"
      width="150">
    </el-table-column>
    <el-table-column
      prop="cun"
      label="村"
      width="200">
    </el-table-column>
    <el-table-column
      prop="zhen"
      label="乡镇/街道"
      width="200">
    </el-table-column>
    <el-table-column
      prop="qu"
      label="区/县"
      width="200">
    </el-table-column>
    <el-table-column
      prop="hphone"
      label="手机号"
      width="300">
    </el-table-column>
    <el-table-column
      prop="hIDcard"
      label="身份证"
      width="200">
    </el-table-column>
    <el-table-column
      prop="team"
      label="工程组"
      width="200">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="showByid(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
                                        <!-- 当前下标(固定写法)，当前行所有数据(固定写法) -->
        <el-button @click="delhouseHold(scope.$index,scope.row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="block">
    <!-- current-page前往的默认页数，:page-sizes每页可选条数，:page-size默认条数，页数是自己算出来的,total总共多少条-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentpage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length">
    </el-pagination>
  </div>

<el-dialog title="收货地址" :visible.sync="dialogTableVisible">
  <el-table :data="gridData">
    <el-table-column property="hname" label="户主" width="150"></el-table-column>
    <el-table-column property="hphone" label="联系方式" width="200"></el-table-column>
    <el-table-column property="hteam" label="小组"></el-table-column>
  </el-table>
</el-dialog>
    </div>
</template>
<script>
export default {
    methods: {
      handleClick(row) {
        console.log(row);
      },gethousedata(){
        this.$axios.get('http://1.116.39.28:8880/householdList').then(res=>{
          console.log(res.data)
          this.tableData=res.data
        }).catch(err=>{})
      },
      // pageSize发生变化会触发事件
      handleSizeChange(val) {
        console.log(val)
        this.pagesize=val
        console.log(`每页 ${val} 条`);
      },
      // 当前页面currenpage发生变化的时候触发
      handleCurrentChange(val) {
        this.currentpage=val
        console.log(`当前页: ${val}`);
      },goAddHouse(path){
        this.$router.push(path)
      },
      //  删除户信息
      delhouseHold(index,row){
        console.log(row)
        this.$axios.delete('http://1.116.39.28:8880/delHouse',{
          params:{hId:row.hid}
        }).then(res=>{
          console.log(res.data)
          if(res.data.result){
              this.$message.success('删除成功')
              // 数据库被删除的信息，页面上也删除
              this.tableData.splice(index,1)
               
          }else{
            this.$message.erro('删除失败')
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      showByid(row){
        console.log(row)
        // 获取当前要查看的户的id
         var hids=row.hid;
          //把hid传到后台获取详细信息
       this.$axios.get("http://localhost:8880/getHouseHoldsById",{
         params:{hid:hids}
       }).then(res=>{
         this.dialogTableVisible=true
          this.gridData.push(res.data)
       }).catch(err=>{
            console.log(err)
       })
      }
    },

    data() {
      return {
        tableData: [],
        pagesize:5,
        currentpage:1,
        headname:'户信息列表',
        dialogTableVisible:false,  //控制对话框显示或隐藏
        gridData:[]//显示对话框表格中的数据
      }
    },mounted:function(){
      this.gethousedata()
    }
}
</script>
<style scoped>

.el-table{
    line-height: 1rem;
    height: 90%;

}
.el-breadcrumb{
    line-height: 3rem;
    height: 10%;
}
.an{
  line-height: 0px;
  text-align: left;
}
</style>