<template>
   <div class="addhouseholds">
       <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">户信息管理</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">户基础信息</a></el-breadcrumb-item>
</el-breadcrumb>
    <div class="biao">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="区域" >
    <el-select v-model="ruleForm.sheng" placeholder="请选择省">
      <el-option label="浙江" value="shanghai"></el-option>
    </el-select>
    <el-select v-model="ruleForm.shi" placeholder="请选择市">
      <el-option label="温州" value="shanghai"></el-option>
    </el-select>
    <el-select @change='getjie' v-model="ruleForm.qu" placeholder="请选择区">
          <el-option label="市辖区" value="386710"></el-option>
				   <el-option label="鹤山区" value="386711"></el-option>
				   <el-option label="山城区" value="386800"></el-option>
				   <el-option label="淇滨区" value="386910"></el-option>
				   <el-option label="浚县" value="387071"></el-option>
				   <el-option label="淇县" value="387545"></el-option>
    </el-select>
    <el-select v-model="ruleForm.jie" placeholder="请选择街道" @change="getju">
     <el-option v-for="(item,index) in jieData"  :label="item.areaName" :value="item.areaId" :key="index"></el-option>
    </el-select>
    <el-select v-model="ruleForm.hareaid" placeholder="请选择居委会">
      <el-option  v-for="(item,index) in juData" :label='item.areaName' :key="index" :value="item.areaId"></el-option>
     
    </el-select>
  </el-form-item>
   <el-form-item label="住址" prop="haddress" >
    <el-input v-model="ruleForm.haddress" placeholder="不超过40个字符"></el-input>
  </el-form-item>
   <el-form-item label="门牌号" prop="hdoornum">
    <el-input v-model="ruleForm.hdoornum"></el-input>
  </el-form-item>
   <el-form-item label="户主姓名" prop="hname" required="true" >
    <el-input v-model="ruleForm.hname" placeholder="不超过20个字符"></el-input>
  </el-form-item>
   <el-form-item label="身份证号" prop="hIDcard" required="true">
    <el-input v-model="ruleForm.hIDcard"></el-input>
  </el-form-item>
  <el-form-item label="出生日期" required>
    <el-col :span="11">
      <el-form-item prop="hbirthday">
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.hbirthday" style="width: 100%;" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      </el-col>
      </el-form-item>
    
                                  <!-- prop数值对应rules -->
     <el-form-item label="电话号" prop="hphone" required="true">
    <el-input v-model="ruleForm.hphone"></el-input>
  </el-form-item>
     <el-form-item label="建筑面积" prop="hbuildsqa">
    <el-input v-model="ruleForm.hbuildsqa"></el-input>
  </el-form-item>
     <el-form-item label="采暖面积" prop="heatsqa">
    <el-input v-model="ruleForm.yy"></el-input>
  </el-form-item>
  <el-form-item label="是否贫困" prop="hpoor" class="p">
    <el-radio-group v-model="ruleForm.hpoor">
      <el-radio label="1">是</el-radio>
      <el-radio label="0">否</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="工程小组" prop="hteam" class="g">
    <el-select v-model="ruleForm.hteam" placeholder="请选择活动区域">
      <el-option v-for="(item,index) in teamData" :key="index" :label="item.tname" :value="item.tid"></el-option>
    </el-select>
      </el-form-item>
  <el-form-item label="备注" prop="hnotes">
    <el-input type="textarea" v-model="ruleForm.hnotes"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">保存进入下一步</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
 
</el-form>
    </div>
   </div>
</template>
<script>
export default {
   data() {
      return {
        ruleForm: {
          // 后台接口要该命名的对象
          sheng: '',
          shi:'',
          qu:'',
          jie:'',
          hdoornum:'',
          haddress:'',
          hname:'',
          hIDcard:'',
          hphone:'',
          resource: '',
          hteam:'',
          desc: '',
          hteam:'',
          hareaid:'',
          hbirthday:'',
          hpoor:'',
          hotnotes:'',
          hbuildsqa:'',
          heatsqa:''
        },
        rules: {
          hname: [
            { required: true, message: '请输入你的姓名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
            {  pattern: /[\u4e00-\u9fa5]/,message: "只能输入中文"}
          ],
          haddress:[
             { required: true, message: '请输入你的家庭住址', trigger: 'blur'},
          ],
          hdoornum:[
             { required: true, message: '请输入门牌号', trigger: 'blur' },
          ]
          ,
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          hIDcard:[
            {required: true, message: '请输入你身份证号', trigger: 'blur'}
          
          ],num:[
            {type:'number',required: true,message:'请输入电话号',trigger:'blur'},
          ]
         
          
        },
        teamData:[],//存储小组数据
        jieData:[],//存储某个区的街道
        juData:[]//存储某个街道的居委会
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {//验证通过
          ("http://1.116.39.28:8880/addHouseInfoBase",JSON.stringify(this.ruleForm),{"headers":{'Content-Type':'application/json'}}).then(res=>{
                console.log(res.data)
                this.$router.push("/about/addyonghu/"+res.data.tid+"/"+res.data.hid);
          }).catch(err=>{
                console.log(err)
          })
            alert('submit!');
          } else {//验证失败
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 获取工程小组
      getTeams(){
        this.$axios.get('http://1.116.39.28:8880/addHousehold').then(res=>{
          this.teamData=res.data
          console.log(this.teamData)
        })
        .cathch(err=>{
          console.log(err)
        })
      },
      // 获取街道
      getjie(quId){
          this.$axios.get('http://1.116.39.28:8880/getSubAreaAjax',{
                   params:{areaid:quId}
          }).then(res=>{
          this.jieData=res.data
          console.log(this.jieData)
          // 目标的value
          console.log(quId)
        })
        .catch(err=>{
          console.log(err)
        })
      },
      getju(juid){
        this.$axios.get('http://1.116.39.28:8880/getSubAreaAjax',{
                   params:{areaid:juid}
          }).then(res=>{
          this.juData=res.data
          console.log(this.juData)
        })
        .catch(err=>{
          console.log(err)
        })
      }
    },mounted:function(){
      this.getTeams()
    }
  }

</script>
<style scoped>
.addhouseholds{
    width: 100%;
}
.el-breadcrumb{
    margin-bottom: 1.25rem;
}
.p,.g{
  text-align: left;
}
</style>