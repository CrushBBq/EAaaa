<template>
    <div class="box">
            <div class="top">
                <el-button type="primary" @click="xinzeng">新增小组</el-button>
            </div>
            <div class="main">
                <el-table
    :data="tableData"
    style="width: 100%"
    max-height="250">
    <el-table-column
      fixed
      prop="tname"
      label="小组名称"
      width="200">
    </el-table-column>
    <el-table-column
      prop="leaderName"
      label="组长"
      width="200">
    </el-table-column>
    <el-table-column
      prop="members"
      label="组员"
      width="200">
       <template slot-scope="scope">
           <span v-for='(item,index) in scope.row.members' :key="index">{{item.uname}}</span>
       </template>
    </el-table-column>
    <el-table-column
      prop="createdTime"
      label="创建日期"
      width="200">
    </el-table-column>
    <el-table-column
      prop="tcreater"
      label="创建人"
      width="300">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click="bian(scope.row)"
          type="text"
          size="small">
          编辑信息
        </el-button>
      </template>
    </el-table-column>
  </el-table>
            </div>
<el-dialog title="新增工作小组" :visible.sync="dialogGongmVisible">
  <el-form :model="form">
    <el-form-item label="小组名" :label-width="formLabelWidth">
      <el-input v-model="form.tname" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="请选择组长" :label-width="formLabelWidth">
      <el-select v-model="form.tleader" placeholder="请选择组长">
        <el-option :label="item.uname" :value="item.uid" v-for="(item,index) in leaders" :key="index"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="信息员">
    <el-checkbox-group v-model="form.mid">
      <el-checkbox :value="item.uid" :label='item.uid'  v-if="item.role==3" v-for="(item,index) in members" :key="index"  name="type">{{item.uname}}</el-checkbox>
					 </el-checkbox-group>
  </el-form-item>
       <el-form-item label="库管员">
    <el-checkbox-group v-model="form.kid">
      <el-checkbox  v-if="item.role==4" v-for="(item,index) in members" :key="index" :value="item.uid" :label='item.uid' name="type">{{item.uname}}</el-checkbox>
      
    </el-checkbox-group>
  </el-form-item>
       <el-form-item label="安装工">
    <el-checkbox-group v-model="form.aid">
       <el-checkbox  v-if="item.role==5" v-for="(item,index) in members" :key="index" :value="item.uid" :label='item.uid' name="type">{{item.uname}}</el-checkbox>
     
    </el-checkbox-group>
  </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogGongmVisible = false">关闭</el-button>
    <el-button type="primary" @click="bao">保存</el-button>

  </div>
</el-dialog>
<el-dialog title="新增工作小组" :visible.sync="dialogXinmVisible">
  <el-form :model="form">
    <el-form-item label="小组名" :label-width="formLabelWidth">
      <el-input v-model="form.tname" autocomplete="off"></el-input>
    </el-form-item>
<el-form-item label="请选择组长" :label-width="formLabelWidth">
      <el-select v-model="form.tleader" placeholder="请选择组长">
        <el-option :label="item.uname" :value="item.uid" v-for="(item,index) in leaders" :key="index"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="信息员">
    <el-checkbox-group v-model="form.uid">
      <el-checkbox  v-if="item.role==3" v-for="(item,index) in form.tmid" :label="item.uid" :key="index">{{item.uname}}</el-checkbox>
      <el-checkbox :value="item.uid" :label='item.uid'  v-if="item.role==3" v-for="(item,index) in members" :key="index"  name="type">{{item.uname}}</el-checkbox>
    </el-checkbox-group>
  </el-form-item>
       <el-form-item label="库管员">
    <el-checkbox-group v-model="form.kid">
       <el-checkbox  v-if="item.role==4" v-for="(item,index) in form.tmid" :label="item.uid" :key="index">{{item.uname}}</el-checkbox>
      <el-checkbox  v-if="item.role==4" v-for="(item,index) in members" :key="index" :value="item.uid" :label='item.uid' name="type">{{item.uname}}</el-checkbox>
    </el-checkbox-group>
  </el-form-item>
       <el-form-item label="安装工">
    <el-checkbox-group v-model="form.aid">
       <el-checkbox  v-if="item.role==5" v-for="(item,index) in form.tmid" :label="item.uid" :key="index">{{item.uname}}</el-checkbox>
    <el-checkbox  v-if="item.role==5" v-for="(item,index) in members" :key="index" :value="item.uid" :label='item.uid' name="type">{{item.uname}}</el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogXinmVisible = false">关闭</el-button>
    <el-button type="primary" @click="xiugai">修改</el-button>

  </div>
</el-dialog>

    </div>
</template>
<script>
export default {
    methods:{
            xinzeng(){
                this.dialogGongmVisible=true
            },
            getdata(){
                this.$axios.get('http://1.116.39.28:8880/teamList').then(res=>{
                    console.log(res.data)
                    this.tableData=res.data.teamVoList
                    this.leaders=res.data.leaders
                    this.members=res.data.members
                    console.log(this.leaders)
                    console.log(this.members)
                   
                }).catch(err=>{
                    console.log(err)
                })
            },
           bian(row){
             		//给小组名称赋值
				this.form.tname=row.tname;
				//给小组名称赋值
				this.form.tleader=row.leaderName;
				//获取该小组的id
				this.form.tid=row.tid;
				//获取该小组的信息员
				this.form.tmid=row.members;
				console.log(row.members);
               this.dialogXinmVisible=true
           },
          //  保存
          bao(){
          var uname=JSON.parse(sessionStorage.getItem("LoginUser")).uname;
              this.$axios.get("http://1.116.39.28:8880/addTeam?uname="+uname+"&tname="+this.form.uname+"&tleader="+this.form.tleader+"&mid="+this.form.mid+"&kid="+this.form.kid+"&aid="+this.form.aid).then(res=>{
                console.log(res)
                if(res.data.code==200){
                  this.$message({
                    message:res.data.message,
                    type:'success',
                    duration:1000
                  })
                }
                this.dialogGongmVisible=false
              }).catch(err=>{
                console.log(err)
              })
          },
          xiugai(){
            			//获取当前登录的用户名
				var uname=JSON.parse(sessionStorage.getItem("LoginUser")).uname;
				this.$axios.get("http://1.116.39.28:8880/updTeam?uname="+uname+"&tname="+this.form.tname+"&tleader="+this.form.tleader+"&mid="+this.form.mid+"&kid="+this.form.kid+"&aid="+this.form.aid+"&tid="+this.form.tid).then(res=>{
					if(res.data.code==200){
						this.$message({
							message:res.data.msg,
							type:"success",
							duration:500
						});
						this.dialogXinmVisible=false;
					}else if(res.data.code==201){
						this.$message.error(res.data.msg);
					}
				}).catch(err=>{
					console.log(err);
				});
          }

    },data(){
        return{
          
                dialogGongmVisible:false,
                formLabelWidth: '120px',
                dialogXinmVisible:false,
                form: {
        
          uname: '',
         tleader:'',
         kid:[],
         aid:[],
         mid:[],
         tid:"",
         tmid:[],
         tname:''
         
        },
       
        tableData:[],
        leaders:[],
        members:[],

        }
    },mounted(){
        this.getdata()
    }
    
}
</script>
<style scoped>
.top{
    text-align: left;
    border-bottom: 1px solid white;
    padding: 1rem;
}
.box{
    padding: 2rem;
}
.main{
    margin-top: 1rem;
}
</style>