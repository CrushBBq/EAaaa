<template>
	<div class="addhouseholds">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/' }">户信息管理</el-breadcrumb-item>
		  <el-breadcrumb-item><a href="/">户基础信息</a></el-breadcrumb-item>
		</el-breadcrumb>
		
		<div class="add">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			 
			  <el-form-item label="区域" prop="region">
			    <el-select v-model="ruleForm.sheng" placeholder="请选择省">
			      <el-option label="河南省" value="henansheng"></el-option>
			     
			    </el-select>
				
				<el-select v-model="ruleForm.shi" placeholder="请选择市">
				  <el-option label="鹤壁市" value="hebishi"></el-option>
				
				</el-select>
				
				<el-select @change="getJie" v-model="ruleForm.qu" placeholder="请选择区">
				    <el-option label="市辖区" value="386710"></el-option>
				 	<el-option label="鹤山区" value="386711"></el-option>
				 	<el-option label="山城区" value="386800"></el-option>
				 	<el-option label="淇滨区" value="386910"></el-option>
				 	<el-option label="浚县" value="387071"></el-option>
				 	<el-option label="淇县" value="387545"></el-option>
				</el-select>
				
				<el-select v-model="ruleForm.jie" placeholder="请选择街道">
				  <el-option label="市一" value="shanghai"></el-option>
				  <el-option label="市二" value="beijing"></el-option>
				</el-select>
				
				<el-select v-model="ruleForm.ju" placeholder="请选择居委会">
				  <el-option label="市一" value="shanghai"></el-option>
				  <el-option label="市二" value="beijing"></el-option>
				</el-select>
			  </el-form-item>
			  
			  <el-form-item label="住址" prop="name">
			     <el-input v-model="ruleForm.name"></el-input>
			  </el-form-item>
			  
			  <el-form-item label="门牌号" prop="name">
			     <el-input v-model="ruleForm.name"></el-input>
			  </el-form-item>
			  
			  <el-form-item label="户主姓名" prop="name">
			     <el-input v-model="ruleForm.name"></el-input>
			  </el-form-item>
			  
			  <el-form-item label="身份证号" prop="name">
			     <el-input v-model="ruleForm.name"></el-input>
			  </el-form-item>
			  
			  
			  <el-form-item label="出生日期" required>
			    <el-col :span="11">
			      <el-form-item prop="date1">
			        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
			      </el-form-item>
			    </el-col>
			  </el-form-item>
			  
			  
			  <el-form-item label="联系电话" prop="name">
			     <el-input v-model="ruleForm.name"></el-input>
			  </el-form-item>
			  
			  <el-form-item label="建筑面积" prop="name">
			     <el-input v-model="ruleForm.name"></el-input>
			  </el-form-item>
			  
			  <el-form-item label="采暖面积" prop="name">
			     <el-input v-model="ruleForm.name"></el-input>
			  </el-form-item>
			  
			  <el-form-item label="是否贫困户" prop="resource">
			    <el-radio-group v-model="ruleForm.resource">
			      <el-radio label="是"></el-radio>
			      <el-radio label="否"></el-radio>
			    </el-radio-group>
			  </el-form-item>
			  
			  <el-form-item label="工程小组" prop="team">
				  <el-select v-model="ruleForm.team" placeholder="请选择小组">
				    <el-option v-for="(item,index) in teamData" :label="item.tname" :key="index" :value="item.tid"></el-option>
				  </el-select>
			  </el-form-item>
			  
			  <el-form-item label="备注" prop="desc">
			    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
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
	          name: '',
	          region: '',
	          date1: '',
	          date2: '',
	          delivery: false,
	          type: [],
	          resource: '',
	          desc: '',
			  team:'',
			  sheng:'',
			  shi:'',
			  qu:'',
			  jie:'',
			  ju:''
	        },
	        rules: {
	          name: [
	            { required: true, message: '请输入活动名称', trigger: 'blur' },
	            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
	          ],
	          team: [
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
	          resource: [
	            { required: true, message: '请选择活动资源', trigger: 'change' }
	          ],
	          desc: [
	            { required: true, message: '请填写活动形式', trigger: 'blur' }
	          ]
	        },
			teamData:[]  ,//存储的是小组的数据
			jieData:[]   //存储某个区的街道
	      };
	    },
	    methods: {
			//提交表单的
	      submitForm(formName) {
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	            alert('submit!');
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
	      },
		  //重置表单的
	      resetForm(formName) {
	        this.$refs[formName].resetFields();
	      },
		  
		  //获取工程小组
		  getTeams(){
			 this.$axios.get("http://1.116.39.28:8880/addHousehold").then(res=>{
				 this.teamData=res.data;
				 console.log(this.teamData);
			 }).catch(err=>{
				 console.log(err);
			 }); 
		  },
		  //获取街道
		  getJie(quId){
			  this.$axios.get("http://1.116.39.28:8880/getSubAreaAjax",{
				  params:{areaid:quId}
			  }).then(res=>{
			  				 this.jieData=res.data;
			  				 console.log(this.jieData);
			  }).catch(err=>{
			  				 console.log(err);
			  }); 
		  }
	    },
		mounted:function(){
			this. getTeams();
		}
	  }
</script>

<style scoped="scoped">
	.addhouseholds{
		height: 100%;
	}
	.el-breadcrumb{
		margin-bottom: 1.25rem;
	}
</style>
