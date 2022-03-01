<template>
	
	
		 <div id="chartColumn" style="width: 100%; height: 400px;">
		 </div>
	
</template>

<script>
	 export default {
	         data(){
                     return{
                           getechar:null
                     }
               },
               methods:{
                     charts(){
                           this.getechar=this.$echarts.init(document.getElementById('chartColumn'))
                           this.getechar.setOption({
                                 title: {
	                         text: '区进度完成图'
	                       },
	                       tooltip: {
	                         trigger: 'axis'
	                       },
	                       legend: {
	                         data: ['鹤山区', '山城区', '淇滨区', '浚县', '淇县']
	                       },
	                       grid: {
	                         left: '3%',
	                         right: '4%',
	                         bottom: '3%',
	                         containLabel: true
	                       },
	                       toolbox: {
	                         feature: {
	                           saveAsImage: {}
	                         }
	                       },
	                       xAxis: {
	                         type: 'category',
	                         boundaryGap: false,
	                         data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月','9月','10月','11月','12月']
	                       },
	                       yAxis: {
	                        
	                       },
	                       series: [
	                         {
	                           name: '鹤山区',
	                           type: 'line',
	                         
	                           data: [0.8, 0.25, 0.4, 0.6, 1.6, 0.2, 0.9,1.1,1.3,0.7,0,0]
	                         },
	                         {
	                           name: '山城区',
	                           type: 'line',
	                           
	                           data: [0.4, 0.9, 0.5, 0.9, 0.45, 0.35, 0.3,0.25,0.75,0.6,0,0]
	                         },
	                         {
	                           name: '淇滨区',
	                           type: 'line',
	                         
	                           data: [0.75, 0.15, 0.8, 0.25, 0.7, 0.35, 0.68,1.15,0.4,0.3,0,0]
	                         },
	                         {
	                           name: '浚县',
	                           type: 'line',
	                        
	                           data: [0.6, 0.31, 0.4, 0.7, 1.0, 1.15, 0.6,1.4,1.31,0.25,0,0]
	                         },
	                         {
	                           name: '淇县',
	                           type: 'line',
	                         
	                           data: [0.3, 0.6, 0.15, 0.8, 0.55, 0.45, 0.4,1.25,1.05,0.35,0,0]
	                         }
	                       ]
	                });
                           
                     }
               },mounted:function(){
                     this.charts()
               }
	}
</script>

<style scoped="scoped">
	.qujindu{
		height: 100%;
		width: 100%;
	}
		
	.el-row{
		width: 100%;
	}
</style>