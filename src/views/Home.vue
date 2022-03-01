<template>
  <div class="home">
   <el-container>
  <el-header>
    <el-row>
  <el-col :span="8" :offset="1" class="top1"><div class="grid-content bg-purple">
      <img src="../assets/image_pc_logo.png" alt=""> <span class="biao">鹤壁市农村清洁取暖智能管理平台</span>
    </div></el-col>
</el-row></el-header>
  <el-main>
    <el-row>
  <el-col :span="7" :offset="15" class="denglu">
    <div class="grid-content bg-purple denglu1">
    <el-form :model="a" ref="numberValidateForm" label-width="100px" class="demo-ruleForm dz">
      <div class="huan">欢迎登陆</div>
  <el-form-item
    label="手机号"
    prop="phone"
    :rules="[
      { required: true, message: '手机号不能为空'},
      { type: 'number', message: '手机号必须为数字值'},
      {pattern:/(^1\d{10}$)/,message:'要输入11位数字值'}
      
     
    ]"
  >
    <el-input type="age" v-model.number="a.phone" autocomplete="off"></el-input>
  </el-form-item>
    <el-form-item
    label="密码"
    prop="pwd"
    :rules="[
      { required: true, message: '密码不能为空'},
      { type: 'number', message: '密码必须为数字值'},
      
    ]"
  >
    <el-input type="password" v-model.number="a.pwd" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
    <el-button @click="resetForm('numberValidateForm')">重置</el-button>
  </el-form-item>
</el-form>

           
  
          
    </div></el-col>
</el-row>
  </el-main>
  
</el-container>
  </div>
  
</template>

<script>
export default {
    data() {
      return {
        numberValidateForm: {
          phone: '',
          pwd:''
        },
        a:{
          phone:'',
          pwd:''
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          console.log(valid)
          if (valid) {//验证通过
            this.$axios.get('http://1.116.39.28:8880/login',{
              params:{
                // 验证输入的用户名和手机号
                password:this.a.pwd,
                phone:this.a.phone
              }
            }).then(res=>{
              console.log(res.data)
              if(res.data.code==200){
                                // 如果登录成功，向seesiongstorage存储数据
            sessionStorage.setItem('LoginUser',JSON.stringify(res.data.user))
            sessionStorage.setItem('uid',res.data.user.uid)
            // 消息提示     提示信息           主题           几秒后自动关闭
            this.$message({message:res.data.loginInfo,type:'success',durataion:1000})
            var _this=this
            // 1秒钟后跳转
            setTimeout(function(){
              _this.$router.push('/about')
            },1000)
              }else{//登录失败
                    this.$message.err(res.data.loginInfo);
              }
            }).catch(err=>{
              console.log(err);
               this.$message.err(res.data.loginInfo);
            return false;
            })

          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }

</script>
<style scoped>

  .el-col {
    border-radius: 4px;
  }
 .grid-content {
   height: 60px;
 }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
.home{
  height: 100%;
}
.is-vertical{
  height: 100%;
}
.el-header, .el-footer {
  padding: 0px;
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
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
  .grid-content img{
    width: 10%;
  }
  .grid-content{
    text-align: left;
  }
 .bg-purple{
   display: flex;
   background: white;
 }
 .bg-purple span{
   font-size: 1.5rem;
   font-weight: bold;
 }
 .el-header{
   background: white;
 }
 .el-main{
   background: url(../assets/bg@2x.png);
   background-size: cover;
   background-position: 50% 50%;
 }
 
.denglu{
  margin-top: 5rem;
  
}
.denglu1{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.huan{
  line-height: 3rem;
  text-align: center;
}
.dz{
  padding: 2rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 150%;
}
 
</style>
