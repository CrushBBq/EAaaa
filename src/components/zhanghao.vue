<template>
        <div class="box">
        <el-row >
  <el-col :span="24" class="an"><el-button @click="addusuer">新增账号</el-button></el-col>
        </el-row>
  <el-row>

  <el-col :span="6" :offset="13">
          <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="搜索">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  </el-form>
  </el-col>
</el-row>
        <el-table
    :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
    <el-table-column
      prop="uid"
      label="编码"
      sortable
      width="100">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="手机号"
      sortable
      width="200">
    </el-table-column>
    <el-table-column
      prop="uname"
      label="姓名"
      sortable
      width="200">
    </el-table-column>

        <el-table-column
      prop="mail"
      label="邮箱"
      sortable
      width="200">
    </el-table-column>
        <el-table-column
      prop="gender"
      label="性别"
      sortable
      width="100"
      :formatter='formatterGender'>
    </el-table-column>
            <el-table-column
      prop="status"
      label="状态"
      sortable
      width="200"
      :formatter='formatterGender1'>
    </el-table-column>
            <el-table-column
      prop="name"
      label="操作"
      sortable
      width="200">
      <template slot-scope="scope">
        <el-button @click="openUpdUserDialog(scope.row)" type="text" size="small">编辑信息</el-button>
        <el-button type="text" size="small"  @click="addRoles(scope.row)">用户信息</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-row >
  <el-col :span="1">
<div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length">
    </el-pagination>
  </div>
          </el-col>


        </el-row>

<!--新增账号 -->
<el-dialog title="新增用户" :visible.sync="dialogAddUserVisible">
  <el-form :model="formUser" >
    <el-form-item label="手机号" :label-width="formLabelWidth">
      <el-input v-model="formUser.phone" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="姓名" :label-width="formLabelWidth">
      <el-input v-model="formUser.uname" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" :label-width="formLabelWidth">
      <el-input v-model="formUser.mail" autocomplete="off"></el-input>
    </el-form-item>
  <el-form-item label="性别">
    <el-radio-group v-model="formUser.gender">
      <el-radio label="1">男</el-radio>
      <el-radio label="0">女</el-radio>
    </el-radio-group>
  </el-form-item>
    <el-form-item label="状态">
    <el-radio-group v-model="formUser.status">
      <el-radio label="1">正常</el-radio>
      <el-radio label="0">锁定</el-radio>
    </el-radio-group>
  </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogAddUserVisible = false">取 消</el-button>
    <el-button type="primary" @click="addusers">确 定</el-button>
  </div>
</el-dialog>
<!-- 修改账号 -->
<el-dialog title="编辑信息" :visible.sync="dialogUpdUserVisible">
  <el-form :model="formUser" >
    <el-form-item label="手机号" :label-width="formLabelWidth">
      <el-input v-model="formUser.phone" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="姓名" :label-width="formLabelWidth">
      <el-input v-model="formUser.uname" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" :label-width="formLabelWidth">
      <el-input v-model="formUser.mail" autocomplete="off"></el-input>
    </el-form-item>
  <el-form-item label="性别">
    <el-radio-group v-model="formUser.gender">
      <!-- 没有:label不会变 -->
      <el-radio :label="1">男</el-radio>
      <el-radio :label="0">女</el-radio>
    </el-radio-group>
  </el-form-item>
    <el-form-item label="状态">
    <el-radio-group v-model="formUser.status">
      <el-radio :label="1">正常</el-radio>
      <el-radio :label="0">锁定</el-radio>
    </el-radio-group>
  </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogUpdUserVisible = false">取 消</el-button>
    <el-button type="primary" @click="updUser">修 改</el-button>
  </div>
</el-dialog>
<!-- 用户角色 -->
<el-dialog title="分配角色" :visible.sync="dialogRoleVisible">
  <el-form :model="role">
  <el-form-item label="用户角色:" prop="resource">
    <el-radio-group v-model="role.rid">
      <el-radio label="0">工程组长</el-radio>
      <el-radio label="1">信息员</el-radio>
      <el-radio label="2">库管员</el-radio>
      <el-radio label="3">安装工</el-radio>
      <el-radio label="4">政府人员</el-radio>
      <el-radio label="5">运维人员</el-radio>
    </el-radio-group>
  </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogRoleVisible = false">取 消</el-button>
    <el-button type="primary" @click="fasong">确 定</el-button>
  </div>
</el-dialog>
        </div>
       
        
   
</template>
<script>
export default {
        methods: {
          // 页面条数发生变化
      handleSizeChange(val) {
        this.pageSize=val
        console.log(`每页 ${val} 条`);
      },
      // 当前页吗发生变化
      handleCurrentChange(val) {
        this.currentPage=val
        console.log(`当前页: ${val}`);
      },
      // :formatter 把传输过来的数值转化为对应的文字
      // 格式化性别   cellValue当前单元格的内容    
      formatterGender(row,column,cellValue){
            console.log(cellValue)
            if(cellValue==0){
              return '男'
            }else if(cellValue==1){
              return '女'
            }
      },
      formatterGender1(row,column,cellValue1){
        if(cellValue1==0){
          return '注销'
        }else if(cellValue1==1){
          return '正常'
        }
      }
      ,
      getUserList(){
        this.$axios.get('http://1.116.39.28:8880/accountList').then(res=>{
          console.log(res)
          this.tableData=res.data
        }).catch(err=>{
          console.log(err)
        })
      },
      addusuer(){
          this.dialogAddUserVisible=true
          console.log(this.dialogAddUserVisible)
      },
      // 添加账号
      addusers(){
          this.$axios.post('http://1.116.39.28:8880/addUser',JSON.stringify(this.formUser),{"headers":{'Content-Type':'application/json'}}).then(res=>{
            if(res.data.code==200){
              this.$message({
               message:res.data.msg,
               type:'success',
               duration:500
              })
              this.dialogAddUserVisible=false
            }else{
              this.$message.error(res.data.msg)
            }
            console.log(res)
          }).catch(err=>{
            console.log(err)
          })
      },openUpdUserDialog(row){
         var uvd=row.uid
          this.$axios.get('http://1.116.39.28:8880/getUserAjax',{params:{uid:uvd}}).then(res=>{
            console.log(res.data)
            this.formUser=res.data
            this.dialogUpdUserVisible=true
          }).catch(err=>{
           console.log(err)
          })
      },updUser(){
        this.$axios.post('http://1.116.39.28:8880/updUser',JSON.stringify(this.formUser),{"headers":{'Content-Type':'application/json'}}).then(res=>{
          console.log(res)
          this.formUser=''
          this.dialogUpdUserVisible=false
        }).catch(err=>{
          console.log(err)
        })
      },addRoles(row){
        this.dialogRoleVisible=true
        this.formUser.uid=row.uid
      },fasong(){
        this.$axios.get('http://1.116.39.28:8880/setRole',{
          params:{
            uid:this.formUser.uid,
            rid:this.role.rid
          }
        }).then(res=>{
          console.log(res.data)
          if(res.data.code==200){
            this.$message({
               message:res.data.msg,
                type:'success',
                duration:500
            })
            this.dialogRoleVisible=false
          }else{
            this.$message.err(res.data.msg)
          }

        }).catch(err=>{
          console.log(err)
        })
      }
      

    },
    mounted:function(){
      this.getUserList()
    }
    ,
    data() {
      return {
        currentPage: 1,
        tableData:[],
        pageSize:5,
        // 表单这样写
         form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        dialogRoleVisible:false,
        dialogAddUserVisible:false,
        dialogFormVisible:false,//控制编辑信息的隐藏
        formLabelWidth: '120px',
         dialogUpdUserVisible:false,//控制修改信息隐藏
        formUser:{
          phone:'',
          uname:'',
          mail:'',
          gender:'1',
          status:'1',
          uid:''
        },
        role:{
          rid:''
        },
      };
    }
  }
</script>

<style scoped>

.box{
    height: 100%;
    text-align: left;
}

.block div,.block .el-pagination, .block .el-form{
                display: inline-block;
                text-align: center;
                height: 100%;
                height: 100%;
}
.an{
       padding-bottom: 1rem;
       border-bottom: cadetblue solid 1px;
}
</style>