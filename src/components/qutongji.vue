<template>
    <div class="box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">统计</el-breadcrumb-item>
  <el-breadcrumb-item>区域统计</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
       <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="活动区域">
    <el-select v-model="form.sheng" placeholder="请选择">
     <el-option label="河南省" value="河南省"></el-option>
    </el-select>
     <el-select v-model="form.shi" placeholder="请选择">
      <el-option label="鹤壁市" value="鹤壁市"></el-option>
    </el-select>
    <el-select v-model="form.qu" placeholder="请选择" @change="getjie">
      <el-option label="市辖区" value="386710"></el-option>
					<el-option label="鹤山区" value="386711"></el-option>
					<el-option label="山城区" value="386800"></el-option>
					<el-option label="淇滨区" value="386910"></el-option>
					<el-option label="浚县" value="387071"></el-option>
					<el-option label="淇县" value="387545"></el-option>
    </el-select> 
     <el-select v-model="form.jie" placeholder="请选择">
      <el-option :label="item.areaName" :value="item.areaId" v-for="(item,index) in jieData" :key="index"></el-option>
     
    </el-select> 
  </el-form-item>
<el-form-item label="日期">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择开始日期" v-model="form.startdata" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择结束日期" v-model="form.enddata" style="width: 100%;"></el-date-picker>
    </el-col>
   
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="tongji">统计</el-button>
    
  </el-form-item>
</el-form>
    </div>
    <div id="tutu" style="width: 100%; height: 400px;"></div>
    </div>
</template>
<script>
export default {
   data(){
        return{
            form:{
                sheng:'',
                shi:'',
                qu:'',
                jie:'',
                startdata:'',
                enddata:''
            },jieData:[],
            tudata:[],
            hua:''
        }
   },
   methods:{
      getjie(areaid){
         this.$axios.get('http://1.116.39.28:8880/getSubAreaAjax',{
           params:{areaid:areaid}
         }).then(res=>{
           this.jieData=res.data
           console.log(res.data)
         }).catch(err=>{
           console.log(err)
         })
      },tongji(){
            this.$axios.get('http://1.116.39.28:8880/areaReportAction',{
              params:{
                endDate:this.form.enddata,
                qu:this.form.qu,
                startDate:this.form.startdata,
                zhen:this.form.jie
              }
             
            }).then(res=>{
              this.form.qu=''
               for(var i=0; i< res.data.areaStacVoList.length;i++){
              this.tudata.push({name:res.data.areaStacVoList[i].areaName,value:res.data.areaStacVoList[i].equNum})
            }
            this.huatu()
              console.log(res)
            }).catch(err=>{
              console.log(err)
            })
      },huatu(){
            var cc=document.getElementById('tutu')
           this.hua=this.$echarts.init(cc)
           this.hua.setOption({
        title: {
					    text: '区域统计',
					    subtext: '哈哈哈',
					    left: 'center'
					  },
					  tooltip: {
					    trigger: 'item'
					  },
					  legend: {
					    orient: 'vertical',
					    left: 'left'
					  },
					  series: [
					    {
					      name: '区域统计',
					      type: 'pie',
					      radius: '50%',
					      data: this.tudata,
					      emphasis: {
					        itemStyle: {
					          shadowBlur: 10,
					          shadowOffsetX: 0,
					          shadowColor: 'rgba(0, 0, 0, 0.5)'
					        }
					      }
					    }
					  ]
				});
      }
   }
}
</script>
<style scoped>
.box{
    padding: 1rem;
    text-align: left;
}

</style>