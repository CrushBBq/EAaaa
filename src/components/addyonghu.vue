<template>
  <div class="box">
     <div class="top">
      <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">户信息管理</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">设备采购信息</a></el-breadcrumb-item>
    </el-breadcrumb>
     </div>
     <div class="main1">
        <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="设备">
    <el-select v-model="form.etype" placeholder="请选择产品" @change="getfactory">
      <el-option v-for="(item,index) in equsData" :key="index" :lable='item' :value='item' ></el-option>
  
    </el-select>
    <el-select v-model="form.efactory" placeholder="请选择厂家" @change="getmodel">
      <el-option v-for="(item,index) in factorysData" :key="index" :label='item' :value='item'></el-option>
     
    </el-select>
    <el-select v-model="form.emodel" placeholder="请选择型号" @change="geteid">
      <el-option v-for="(item,index) in modelsData" :key="index" :lable='item' :value='item'></el-option>
     
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="oneqSubmit">添加设备</el-button>
  </el-form-item>
</el-form>
     </div>
     <div class="chan">
        <el-table
    :data="tableData"
    border
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
       <input v-model="form.amt" type="text" value="1" name="amt">
    </el-table-column>
    <el-table-column
      label="操作">
      <el-button>删除</el-button>
    </el-table-column>
  </el-table>
  <el-form ref="form" :model="form" label-width="80px">
  
  <el-form-item label="付款方式">
    <el-radio-group v-model="form.payMethod">
      <el-radio label="现金"></el-radio>
      <el-radio label="转账"></el-radio>
       <el-radio label="支付宝"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="付款时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.pt1" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-time-picker placeholder="选择时间" v-model="form.pt2" style="width: 100%;"></el-time-picker>
    </el-col>
  </el-form-item>
  <el-form-item label="收据编号">
    <el-input v-model="form.receipt"></el-input>
  </el-form-item>
   <el-form-item label="安装协议编号">
    <el-input v-model="form.agreement"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
     </div>
  </div>
</template>
<script>
export default {
    data(){
      return{
        form:{
            etype:'',
            efactory:'',
            emodel:'',
            amt:'',
            payMethod:'',
            pt1:'',
            pt2:'',
            receipt:'',
            agreement:''
            
        },
        factoryData:[],
        modelData:[],
        equData:[],
        equsData:[],
        tableData:[],
        factorysData:[],
        modelsData:[],
        eid:''
       
      }
    },methods:{
      getfactory(etype){
        var tid=this.$route.params.tid
       
        console.log(this.form.etype)
            this.$axios.get('http://1.116.39.28:8880/getTeamEquipments',{
              params:{tid:tid,etype:etype}
            }).then(res=>{
              
              this.factoryData=res.data.result
              console.log(this.factoryData)
              for(var i=0;i<this.factoryData.length;i++){
                if(this.factorysData.indexOf(this.factoryData[i].efactory)==-1){
                  this.factorysData.push(this.factoryData[i].efactory)
                }
              }
              console.log(this.factorysData)
            }).catch(err=>{
              console.log(err)
            })
      },getmodel(efactory){
        var tid=this.$route.params.tid
          this.$axios.get('http://1.116.39.28:8880/getTeamEquipments',{
            params:{tid:tid,etype:this.form.etype,efactory:efactory}
          }).then(res=>{
              this.modelData=res.data.result
              console.log(this.modelData)
              for(var i=0; i<this.modelData.length;i++){
                if(this.modelsData.indexOf(this.modelData[i].emodel)==-1){
                  this.modelsData.push(this.modelData[i].emodel)
                  console.log(this.modelsData)
                }
              }
                  
          }).catch(err=>{
            console.log(err)
          })
      },geteid(emodel){
           for(var i=0;i<this.modelData.length;i++){
             if(this.modelData[i].emodel==emodel){
               this.eid=this.modelData[i].eid
               console.log(this.modelData[i].eid)
             }
            
           }
      },oneqSubmit(){
         this.$axios.get('http://1.116.39.28:8880/getEquInfoAjax',{params:{eid:this.eid}}).then(res=>{
          console.log(res.data)
            this.tableData.push(res.data)
          
           
         }).catch(err=>{
           console.log(err)
         })

      },onSubmit(){
          var tid=this.$route.params.tid
          var hid=this.$route.params.hid
          console.log("小组id:"+tid);
			  console.log("户id:"+hid);
			  console.log("设备id:"+this.eid)
			   console.log("设备数量:"+this.form.amt)
			   console.log("付款方式:"+this.form.payMethod)
			   console.log("付款日期:"+this.form.pt1+":"+this.form.pt2)
			   console.log("收据编码:"+this.form.receipt)+
			   console.log("安装协议编号:"+this.form.agreement)
         var equinfo={"hid":hid,"eq":[{"eid":this.eid,"amt":this.form.amt}],"payMethod":this.form.payMethod,"pt1":this.form.pt1,"pt2":this.form.pt2,"receipt":this.form.receipt,"agreement":this.form.agreement,"tid":tid};
         this.$axios.post('http://1.116.39.28:8880/addHouseInfoOrderWorker',equinfo,{'headers':{'Content-Type':'application/json'}}).then(res=>{
           console.log(res.data.message)
         }).catch(err=>{
           console.log(err)
         })
      }
    },mounted:function(){
      console.log(this.$route.params.tid)
          var tsd=this.$route.params.tid
          this.$axios.get('http://1.116.39.28:8880/getTeamEquipments',{
            params:{tid:tsd}
          }).then(res=>{
            console.log(res.data)
            this.equData=res.data.result
          
            for(var i=0;i<this.equData.length;i++){
              if(this.equsData.indexOf(this.equData[i].etype)==-1){
                this.equsData.push(this.equData[i].etype)
              }
            }
            console.log(this.equsData)
          }).catch(err=>{
            console.log(err)
          })
    }
}
</script>
<style scoped>
.top{
  text-align: left;
  padding: 0.5rem;
 border-bottom: solid 1px #ccc;
}
.box{
  padding: 2rem;
  background: white;
  height: 80%;
  
}
</style>