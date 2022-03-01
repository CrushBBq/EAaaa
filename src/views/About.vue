<template>
    <div class="box">
        <el-container>
  <el-aside width="200px">
    <el-row> <el-col :span='24' class="zi">鹤壁工程智慧管理系统</el-col></el-row>
    <el-row class="tac">
      <el-col :span="24">
    <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b" :collapse="isCollapse">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>户信息管理</span>
        </template>
        <el-menu-item-group>
                                                  <!-- /一级/二级 -->
          <el-menu-item index="1-1" @click="go('/about/households')">户信息列表</el-menu-item>
        <el-menu-item index="1-2" @click="go('/about/addyonghu')">新增用户</el-menu-item>
         <el-menu-item index="1-3" @click="go('/about/aa')">aaa</el-menu-item>
        </el-menu-item-group>
        
      </el-submenu>
       <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>设备管理</span>
        </template>
        <el-menu-item-group>                     <!-- /一级/二级 -->
          <el-menu-item index="2-1" @click="go('/about/shebei')">设备列表管理</el-menu-item>
        </el-menu-item-group>
        
      </el-submenu>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title" @click="go('/about/gong')">工程小组管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title" @click="go('/about/suggest')" >意见反馈管理</span>
      </el-menu-item>
       <el-menu-item index="5" @click="go('/about/zhanghao')">
        <i class="el-icon-setting"></i>
        <span slot="title">账号管理</span>
      </el-menu-item>
      <el-menu-item index="6" @click="go('/about/jihua')">
        <i class="el-icon-setting"></i>
        <span slot="title">计划任务管理</span>
      </el-menu-item>
      <el-menu-item index="7" @click="go('/about/tubiao')">
        <i class="el-icon-setting"></i>
        <span slot="title">区进度完成图标</span>
      </el-menu-item>
      <el-submenu index="8">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>统计</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="8-1" @click="go('/about/qutongji')">区域统计</el-menu-item>
          <el-menu-item index="8-2">厂家统计</el-menu-item>
          <el-menu-item index="8-3">工程统计</el-menu-item>
        </el-menu-item-group>
       
        
      </el-submenu>
    </el-menu>
  </el-col>
</el-row>
  </el-aside>
  <el-container>
    <el-header>
      <div class="my" align="right">
  
				<el-dropdown @command="handleCommand">
				  <span class="el-dropdown-link">
				    <i class="el-icon-arrow-down el-icon--right">管理</i>
				  </span>
				  <el-dropdown-menu slot="dropdown">
				    <el-dropdown-item command="upPwd">
						<el-button type="text" @click="dialogFormVisible = true">修改密码</el-button>
					</el-dropdown-item>
				    <el-dropdown-item command="logout">
						<el-button type="text" @click="logout">退出登录</el-button>
					</el-dropdown-item>
				  </el-dropdown-menu>
				</el-dropdown>
			</div>
</el-header>
    <el-main>
      <!-- 二级菜单显示的位置 -->
      <router-view></router-view>
    </el-main>
    <el-footer>
      <!-- 模态框，大部分放在div内 -->
      <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
		  <el-form :model="pwdform">
		    <el-form-item label="原密码" :label-width="formLabelWidth">
		      <el-input v-model="pwdform.oldPwd" autocomplete="off" placeholder="请输入原密码"></el-input>
		    </el-form-item>
		   <el-form-item label="新密码" :label-width="formLabelWidth">
		     <el-input v-model="pwdform.newPwd" autocomplete="off" placeholder="支持6~20个字符,区分大小写"></el-input>
		   </el-form-item>
		   <el-form-item label="确认密码" :label-width="formLabelWidth">
		     <el-input v-model="pwdform.resPwd" autocomplete="off" placeholder="请再次输入密码"></el-input>
		   </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">关闭</el-button>
		    <el-button type="primary" @click="modifyPwd">保存</el-button>
		  </div>
		</el-dialog>
    </el-footer>
  </el-container>
</el-container>
    </div>
</template>
<script>
import heads from '../components/head.vue'
export default {
 methods:{
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }, handleCommand(command) {
	        /*  this.$message('click on item ' + command); */
	   },
        go(path){
          this.$router.push(path)
        },
        logout(){
          sessionStorage.removeItem('loginUser')
          sessionStorage.removeItem('uid')
          this.$router.push('/')
        },
        modifyPwd(){
            console.log(sessionStorage.getItem('uid'))
                        //id号 ，             要修改的密码
              var info={'uid':uid,'password':this.pwdForm.newPwd}
            //准备给后台的数据
            this.$axios.post('http://localhost:8880/updPwdAction',JSON.stringify(info),{'headers':{'Content-type':'aplication/json'}}
            ).then(res=>{
              console.log(res.data)
              if(res.data.result){
                // 给出提示信息
                this.$message({
                  message:'修改密码成功',
                  type:'success',
                  duration:500
                });
                // 关闭对话框
                this.dialogFormVisible=false;
                //跳转到登录
                this.$router.push('/')
              }else{
                this.$message.error('修改失败')
              }
            }).catch(err=>{
              console.log(err)
            })
        }
      },mounted:function(){
        this.$router.push('/about/households')
      },components:{
        heads
      },data(){
        return{
           dialogFormVisible: false,
           pwdform:{
				      oldPwd:'',
				      newPwd:'',
				      resPwd:''
			},formLabelWidth: '120px',  

        }
      }
    }

</script>
<style scoped>
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #545c64;
    color: #333;
    text-align: center;
     line-height: 5rem;
    
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    padding: 0px;
    
    
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
 .box{
   height: 100%;
 }
 .el-container{
   height: 100%;
 }
 .zi{
   color: white;
   font-weight: bold;
 }

</style>