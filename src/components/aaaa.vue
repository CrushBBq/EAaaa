<template>
	<div class="equipments">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/' }">户信息管理</el-breadcrumb-item>
		  <el-breadcrumb-item><a href="/">设备采购信息</a></el-breadcrumb-item>
		</el-breadcrumb>
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="设备">
				<!-- 产品类型 -->
			    <el-select @change="getFactory"  v-model="form.etype" placeholder="请选择产品类型">
			      <el-option v-for="(item,index) in etypsData" :label="item" :value="item" :key="index"></el-option>
			    </el-select>
				<!-- 厂家 -->
				<el-select @change="getModel" v-model="form.efactory" placeholder="请选择厂家">
				  <el-option v-for="(item,index) in factoryData" :label="item.efactory" :value="item.efactory" :key="index"></el-option>
				</el-select>
				<!-- 型号 -->
				<el-select @change="getEid" v-model="form.emodel" placeholder="请选择型号">
				  <el-option v-for="(item,index) in modelData" :label="item.emodel" :value="item.emodel" :key="index"></el-option>
				</el-select>
			  </el-form-item>
			   <el-form-item>
			      <el-button type="primary" @click="onEquSubmit">添加设备</el-button>
			   </el-form-item>
		<!-- 表格 -->
		<el-table
		    :data="tabelData"
		    stripe
		    style="width: 100%">
		    <el-table-column
		      prop="etype"
		      label="产品类型"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="efactory"
		      label="厂家"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="emodel"
		      label="型号">
		    </el-table-column>
			<el-table-column
			  prop="eprice"
			  label="单价">
			</el-table-column>
			<el-table-column
			  prop="amt"
			  label="数量">
			  <input v-model="form.amt" type="text" value="1" name="amt" />
			</el-table-column>
			<el-table-column
			  label="操作">
			  <el-button>删除</el-button>
			</el-table-column>
		</el-table>
		
			  <el-form-item label="付款方式">
			      <el-radio-group v-model="form.payMethod">
			        <el-radio label="现金"></el-radio>
			        <el-radio label="转账"></el-radio>
					<el-radio label="支付宝"></el-radio>
			      </el-radio-group>
			    </el-form-item>
				<el-form-item label="付款时间">
				    <el-col :span="11">
				      <el-date-picker type="date" placeholder="选择日期" v-model="form.pt1" style="width: 100%;"  format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
				    </el-col>
				    <el-col class="line" :span="2">-</el-col>
				    <el-col :span="11">
				      <el-time-picker placeholder="选择时间" v-model="form.pt2" style="width: 100%;" format="HH-mm-ss" value-format="HH-mm-ss"></el-time-picker>
				    </el-col>
				  </el-form-item>
				<el-form-item label="收据编号">
				    <el-input v-model="form.receipt"></el-input>
				  </el-form-item>
				 <el-form-item label="安装协议编号">
				     <el-input v-model="form.agreement"></el-input>
				   </el-form-item>
				   <el-form-item>
				       <el-button type="primary" @click="onSubmit">保存进入下一步</el-button>
				     </el-form-item>
		  </el-form>
	</div>
</template>

<script>
	export default {
	    data() {
	      return {
	        form: {
	          name: '',
	          etype: '',
	          efactory: '',
	          emodel: '',
	          resource: '',
	          desc: '',
			  payMethod:'支付宝',
			  amt:'1',
			  pt1:'',
			  pt2:'',
			  receipt:''
	        },
			tabelData:[],
			equData:[],
			etypsData:[],//类型
			factoryData:[],
			modelData:[],
			eid:'',
			value1:'',
			agreement:''
	      }
	    },
	    methods: {
			//添加设备
			onEquSubmit(){
				this.$axios.get("http://localhost:8880/getEquInfoAjax",{params:{eid:this.eid}}).then(res=>{
					console.log(res.data);
					console.log(this);
					this.tabelData.push(res.data);
					console.log(this.tabelData);
				}).catch(err=>{
					console.log(err);
				});
			},
	      //获取厂家
		  getFactory(etype){
			  var tid=this.$route.params.tid
			  console.log("类型:"+this.form.etype);
			  this.$axios.get("http://localhost:8880/getTeamEquipments",{params:{tid:tid,etype:etype}}).then(res=>{
			  	console.log(res.data.result);
				this.factoryData=res.data.result;
			  }).catch(err=>{
			  	console.log(err);
			  });
		  },
		  //获取型号
		  getModel(efactory){
			var tid=this.$route.params.tid
			console.log("类型:"+this.form.etype);
			this.$axios.get("http://localhost:8880/getTeamEquipments",{params:{tid:tid,etype:this.form.etype,efactory:efactory}}).then(res=>{
				console.log(res.data.result);
							this.modelData=res.data.result;
							
			}).catch(err=>{
				console.log(err);
			});  
		  },
		  //获取eid
		  getEid(emodel){
			  for(var i=0;i<this.modelData.length;i++){
				  if(this.modelData[i].emodel==emodel){
					  this.eid=this.modelData[i].eid;
				  }
			  }
			  console.log(this.eid);
		  },
		  //提交设备信息
		  //{"hid":"113","eq":[{"eid":"101","amt":"1"}],"payMethod":"现金","pt1":"12/08/2021","pt2":"1:00:00 AM","receipt":"23234234234","agreement":"234234","tid":101}
	      onSubmit() {
			  //小组id
			  var tid=this.$route.params.tid
			  //户id
			  var hid=this.$route.params.hid;
			 //设备id是this.form.eid
			 //设备数量 this.form.amt
			 //付款方式this.form.payMethod
			 //付款日期 this.form.pt1
			 //付款时间this.form.pt2
			 //收据编号this.form.receipt
			 //安装协议编号this.form.agrement
			 console.log("小组id:"+tid);
			  console.log("户id:"+hid);
			  console.log("设备id:"+this.eid)
			   console.log("设备数量:"+this.form.amt)
			   console.log("付款方式:"+this.form.payMethod)
			   console.log("付款日期:"+this.form.pt1+":"+this.form.pt2)
			   console.log("收据编码:"+this.form.receipt)
			   console.log("安装协议编号:"+this.form.agrement)
	        console.log('submit!');
			var equinfo={"hid":hid,"eq":[{"eid":this.eid,"amt":this.form.amt}],"payMethod":this.form.payMethod,"pt1":this.form.pt1,"pt2":this.form.pt2,"receipt":this.form.receipt,"agreement":this.form.agreement,"tid":tid};
	      	this.$axios.post("http://localhost:8880/addHouseInfoOrderWorker",equinfo,{"headers":{"Content-Type":"application/json"}}).then(res=>{
				console.log(res.data.message);
				if("succ"==res.data.message){
					this.$message.success("添加设备信息成功!")
					this.$router.push("/home/ziLiao");
				}else{
					this.$message.error("添加设备信息失败!")
				}
			}).catch(err=>{
				console.log(err);
			});
					/* this.$router.push("/home/ziLiao"); */
	      },
		},
		mounted:function(){
			//获取传过来的小组id
			console.log(this.$route.params.tid);
			var tid=this.$route.params.tid;
			this.$axios.get("http://localhost:8880/getTeamEquipments",{params:{tid:tid}}).then(res=>{
				this.equData=res.data.result;
				
				this.etypsData.push(this.equData[0].etype);
				for(var i=0;i<this.equData.length;i++){
					if(this.etypsData.indexOf(this.equData[i].etype)==-1){
						this.etypsData.push(this.equData[i].etype);
					}
				}
				console.log(this.etypsData);
			}).catch(err=>{
				console.log(err);
			});
		}
	  }
</script>

<style scoped="scoped">
	.equipments{
		height: 100%;
	}
	.el-breadcrumb{
		margin-bottom: 1.25rem;
	}
</style>
