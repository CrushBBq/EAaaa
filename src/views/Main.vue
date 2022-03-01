<template>
	<div class="main">
		
		<div class="hot"><p>正在热映</p></div>
		<div class="hotMovie">
			<ul>
				<li v-for="(item,index) in $store.state.movies.moreComingList.coming" :key="index">
					<img :src="item.img"/>
				</li>
			</ul>
		</div>
	</div>
	
</template>

<script>
	
	export default{
		data:function(){
			return{
				
			}
		},
		components:{
			MyHeader
		}
	}
</script>

<style scoped="scoped">
	.main{
		height: 100%;
		width: 100%;
	}
	.hot{
		width: 100%;
		height: 8%;
		background-color: red;
		color: white;
		text-align: center;
		position: fixed;
		top: 9%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.25rem;
		font-weight: bolder;
	}
	.hotMovie{
		height: 30%;
		position: fixed;
		top: 17%;
		width: 100%;
		overflow: hidden;
	}
	.hotMovie ul{
		
		width: 100%;
		height: 100%;
		overflow-x: auto;
		overflow-y: hidden;
		white-space:nowrap;
		padding-left: 0rem;
		margin: 0rem;
	}
	.hotMovie ul li{
		width: 30%;
		border: 1px solid gray;
		display: inline-block;
		height: 90%;
	}
	.hotMovie ul li img{
		height: 60%;
		width: 100%;
	}
	
	::-webkit-scrollbar {
	  display: none;
	}
</style>
