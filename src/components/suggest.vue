<template>
    <div class="box">
            <div class="tou">
                <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">意见管理</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">意见反馈列表</a></el-breadcrumb-item>
    </el-breadcrumb>
            </div>
        <div class="main">
            <el-button type="primary" @click="jianyi">主要按钮</el-button>
            <el-table
    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
    style="width: 100%"
    height="400">
    <el-table-column
      fixed
      prop="id"
      label="编码"
      width="250">
    </el-table-column>
    <el-table-column
      prop="createDate"
      label="意见提交时间"
      width="250">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="联系方式"
      width="250">
    </el-table-column>
    <el-table-column
      prop="ideaContent"
      label="内容"
      width="250">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="账号"
      width="280">
    </el-table-column>
   
  </el-table>
   <div class="block">
    
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length">
    </el-pagination>
  </div>
        </div>
        <el-dialog title="添加意见" :visible.sync="dialogSUVisible">
  <el-form :model="form">
 <el-form-item label="意见内容">
    <el-input type="textarea" v-model="form.ideaContent" placeholder="请填写意见"></el-input>
  </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogSUVisible = false">取 消</el-button>
    <el-button type="primary" @click="fasong">确 定</el-button>
  </div>
</el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return{
            tableData:[],
            pagesize:5,
            currentPage:1,
            dialogSUVisible:false,
            formLabelWidth: '120px',
            form:{
               ideaContent:'',
               name:'哈哈哈',
               phone:'12345678910',
               createDate:'2020-1-12'
            }
        }
    },methods: {
      handleSizeChange(val) {
          this.pagesize=val
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
          this.currentPage=val
        console.log(`当前页: ${val}`);
      },
      gettable(){
          this.$axios.get('http://1.116.39.28:8880/getAllIdeaList').then(res=>{
              console.log(res.data)
              this.tableData=res.data
          }).catch(err=>{
              console.log(err)
          })
      },jianyi(){
          this.dialogSUVisible=true
      },fasong(){
          this.$axios.post('http://1.116.39.28:8880/saveIdea',JSON.stringify(this.form),{"headers":{'Content-Type':'application/json'}}).then(res=>{
              console.log(res.data)
          }).catch(err=>{
              console.log(err)
          })
      }
    },mounted:function(){
        this.gettable()
    }
}
</script>
<style scoped>
.box{
    height: 80%;
    padding: 1rem;
}
.main{
    text-align: left;
    margin-top: 1rem;
}
</style>