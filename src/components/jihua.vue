<template>
        <div class="box">
            <div class="top">
                <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">意见管理</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">意见反馈列表</a></el-breadcrumb-item>
    </el-breadcrumb>
            </div>
            <div class="main">
                 <el-button type="primary" @click="xinzeng">新增区计划</el-button>
                 <div class="main1">
                     <el-table
    :data="tableData"
    style="width: 100%"
    height="500">
    <el-table-column
      fixed
      prop="plid"
      label="计划编码"
      width="150">
    </el-table-column>
    <el-table-column
      prop="areaName"
      label="区"
      width="120">
    </el-table-column>
    <el-table-column
    
      label="市"
      width="120">
      鹤壁市
    </el-table-column>
    <el-table-column
      
      label="省"
      width="120">
      河南省
    </el-table-column>
    <el-table-column
      prop="planyear"
      label="计划年度"
      width="200">
    </el-table-column>
    <el-table-column
      prop="amtlu"
      label="生物质炉具计划量"
      width="220">
    </el-table-column>
    <el-table-column
      prop="amtre"
      label="热风机计划量"
      width="220">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="makeplane(scope.row)"
          type="text"
          size="small">
          月计划
        </el-button>
         <el-button
          @click="geng(scope.row)"
          type="text"
          size="small">
          编辑
        </el-button>
         <el-button
          @click="deleteRow(scope.$index,scope.row)"
          type="text"
          size="small">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
           </div>
    <el-dialog title="月计划" :visible.sync="dialogplaneVisible">
      
  <el-form :model="plandata">
    <table>
      <tr>
          <th>月计划</th>
          <th>生物质炉数量</th>
          <th>热风机数量</th>
      </tr>
          <tr>
            <td>2021年1月</td>
            <td><el-input v-model="plandata.amtlu1" autocomplete="off"></el-input></td>
            <td><el-input v-model="plandata.amtre1" autocomplete="off"></el-input></td>
          </tr>
          <tr>
            <td>2021年2月</td>
            <td><el-input v-model="plandata.amtlu2" autocomplete="off"></el-input></td>
            <td><el-input v-model="plandata.amtre2" autocomplete="off"></el-input></td>
          </tr>
          <tr>
            <td>2021年3月</td>
            <td><el-input v-model="plandata.amtlu3" autocomplete="off"></el-input></td>
            <td><el-input v-model="plandata.amtre3" autocomplete="off"></el-input></td>
          </tr>
          <tr>
            <td>2021年4月</td>
            <td><el-input v-model="plandata.amtlu4" autocomplete="off"></el-input></td>
            <td><el-input v-model="plandata.amtre4" autocomplete="off"></el-input></td>
          </tr>
          <tr>
            <td>2021年5月</td>
            <td><el-input v-model="plandata.amtlu5" autocomplete="off"></el-input></td>
            <td><el-input v-model="plandata.amtre5" autocomplete="off"></el-input></td>
          </tr>
          <tr>
            <td>2021年6月</td>
            <td><el-input v-model="plandata.amtlu6" autocomplete="off"></el-input></td>
            <td><el-input v-model="plandata.amtre6" autocomplete="off"></el-input></td>
          </tr>
          <tr>
            <td>2021年7月</td>
            <td><el-input v-model="plandata.amtlu7" autocomplete="off"></el-input></td>
            <td><el-input v-model="plandata.amtre7" autocomplete="off"></el-input></td>
          </tr>
          <tr>
            <td>2021年8月</td>
            <td><el-input v-model="plandata.amtlu8" autocomplete="off"></el-input></td>
            <td><el-input v-model="plandata.amtre8" autocomplete="off"></el-input></td>
          </tr>
          <tr>
            <td>2021年9月</td>
            <td><el-input v-model="plandata.amtlu9" autocomplete="off"></el-input></td>
            <td><el-input v-model="plandata.amtre9" autocomplete="off"></el-input></td>
          </tr>
          <tr>
            <td>2021年10月</td>
            <td><el-input v-model="plandata.amtlu10" autocomplete="off"></el-input></td>
            <td><el-input v-model="plandata.amtre10" autocomplete="off"></el-input></td>
          </tr>
          <tr>
            <td>2021年11月</td>
            <td><el-input v-model="plandata.amtlu11" autocomplete="off"></el-input></td>
            <td><el-input v-model="plandata.amtre11" autocomplete="off"></el-input></td>
          </tr>
          <tr>
            <td>2021年12月</td>
            <td><el-input v-model="plandata.amtlu12" autocomplete="off"></el-input></td>
            <td><el-input v-model="plandata.amtre12" autocomplete="off"></el-input></td>
          </tr>
    </table>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="chuanplane">确 定</el-button>
  </div>
</el-dialog>
                 
            </div>
            <!-- 新增区计划 -->
    <el-dialog title="新增区计划" :visible.sync="dialogFormVisible">
  <el-form :model="formzeng">
 
    <el-form-item  label="计划区域" :label-width="formLabelWidth">
      <el-select placeholder="请选择活动区域" v-model='formzeng.sheng'>
        <el-option label="河南" value="henan"></el-option>
      </el-select>
       <el-select v-model='formzeng.shi'  placeholder="请选择活动区域">
        <el-option label="鹤壁" value="hebi"></el-option>
      </el-select>
      <el-select v-model="formzeng.areaName" placeholder="请选择活动区域">
            <el-option label="市辖区" value="386710"></el-option>
				   <el-option label="鹤山区" value="386711"></el-option>
				   <el-option label="山城区" value="386800"></el-option>
				   <el-option label="淇滨区" value="386910"></el-option>
				   <el-option label="浚县" value="387071"></el-option>
				   <el-option label="淇县" value="387545"></el-option>
      </el-select>
      </el-form-item>
     
      <el-form-item label="计划年度" :label-width="formLabelWidth">
      <el-select v-model="formzeng.planyear" placeholder="请选择活动区域">
        <el-option label="2020" value="2020"></el-option>
         <el-option label="2021" value="2021"></el-option>
          <el-option label="2022" value="2022"></el-option>
        
      </el-select>
      </el-form-item>
      <el-form-item label="生物质炉具" :label-width="formLabelWidth">
      <el-input v-model="formzeng.amtlu" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="热风机计划" :label-width="formLabelWidth">
      <el-input v-model="formzeng.amtre" autocomplete="off"></el-input>
    </el-form-item>
    
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="zengjia">确 定</el-button>
  </div>
</el-dialog>
<el-dialog title="编辑区计划" :visible.sync="dialogUpdataVisible">
  <el-form :model="updata">
    <el-form-item label="计划区域" :label-width="formLabelWidth">
      <el-select v-model="updata.sheng" placeholder="请选择活动区域">
        <el-option label="河南" value="河南"></el-option>
      </el-select>
      <el-select v-model="updata.shi" placeholder="请选择活动区域">
      <el-option label="鹤壁" value="鹤壁"></el-option>
      </el-select>
        <el-select v-model="updata.areaName" placeholder="请选择活动区域">
        <el-option label="市辖区" :value="386710"></el-option>
						<el-option label="鹤山区" :value="386711"></el-option>
						<el-option label="山城区" :value="386800"></el-option>
						<el-option label="淇滨区" :value="386910"></el-option>
						<el-option label="浚县" :value="387071"></el-option>
						<el-option label="淇县" :value="387545"></el-option>
      </el-select>
       <el-form-item label="生物质炉具" :label-width="formLabelWidth">
      <el-input v-model="updata.amtlu" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="热风机计划" :label-width="formLabelWidth">
      <el-input v-model="updata.amtre" autocomplete="off"></el-input>
    </el-form-item>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogUpdataVisible = false">取 消</el-button>
    <el-button type="primary" @click="gengxin">保存</el-button>
  </div>
</el-dialog>
        </div>
</template>
<script>
export default {
        data(){
            return{
                tableData:[],
                formzeng:{
                    amtlu:'',
                    amtre:'',
                    areaName:'',
                    creatTime:'',
                    planyear:'',
                    plid:'',
                    sheng:'',
                    shi:''
                },dialogFormVisible:false,
                formLabelWidth: '120px',
                dialogUpdataVisible:false,
                dialogplaneVisible:false,
                updata:{
                  amtlu:'',
                  amtre:'',
                  areaName:'',
                  areaid:'',
                  createTime:'',
                  planyear:'',
                  plid:'',
                  sheng:'河南',
                  shi:'鹤壁',
                },plandata:{
                  amtlu1:'',amtlu2:'',amtlu3:'',amtlu4:'',amtlu5:'',amtlu6:'',amtlu7:'',amtlu8:'',amtlu9:'',amtlu10:'',amtlu11:'',amtlu12:'',
                  amtre1:'',amtre2:'',amtre3:'',amtre4:'',amtre5:'',amtre6:'',amtre7:'',amtre8:'',amtre9:'',amtre10:'',amtre11:'',amtre12:'',
                  plid:''
                }
            }
        }
        ,methods:{
            initformzeng(){
                this.formzeng.amtlu='',
                this.formzeng.amtre='',
                this.formzeng.areaName='',
                this.formzeng.creatTime='',
                this.formzeng.planyear='',
                this.formzeng.plid='',
                this.formzeng.sheng='',
                this.formzeng.shi=''
               

            },
            initupdata(){
              this.updata.amtlu='',
              this.updata.amtre='',
              this.updata.areaName='',
              this.updata.areaid='',
              this.updata.createTime='',
              this.updata.planyear='',
              this.updata.plid='',
              this.updata.sheng='',
              this.updata.shi=''
            },
            initplane(){
              this.plandata.amtlu1='',this.plandata.amtlu2='',this.plandata.amtlu3='',this.plandata.amtlu4='',this.plandata.amtlu5='',this.plandata.amtlu6='',
              this.plandata.amtlu7='',this.plandata.amtlu8='',this.plandata.amtlu9='',this.plandata.amtlu10='',this.plandata.amtlu11='',this.plandata.amtlu12='',
              this.plandata.amtre1='',this.plandata.amtre2='',this.plandata.amtre3='',this.plandata.amtre4='',this.plandata.amtre5='',this.plandata.amtre6='',
              this.plandata.amtre7='',this.plandata.amtre8='',this.plandata.amtre9='',this.plandata.amtre10='',this.plandata.amtre11='',this.plandata.amtre12='',
              this.plandata.plid=''
              
            }
            ,
            gettable(){
                this.$axios.get('http://1.116.39.28:8880/taskAllocation').then(res=>{
                    console.log(res.data)
                    this.tableData=res.data
                }).catch(err=>{
                    console.log(err)
                })
            },xinzeng(){
                this.dialogFormVisible=true
            },zengjia(){
                    this.$axios.post('http://1.116.39.28:8880/addPlan',JSON.stringify(this.formzeng),{'headers':{'Content-Type':'application/json'}}).then(res=>{                                                                                                                                    if(res.data.code==200){
                            this.$message({
                                  message:res.data.msg,
                                  type:'success',
                                  duration:1000
                            })
                              this.initformzeng()
                              this.dialogFormVisible=false
                    }else if(res.data.code==201){
                                this.$message.error(res.data.msg)
                    }           
                       
                    }).catch(err=>{
                        console.log(err)
                    })
            },deleteRow(index,row){
                  this.$axios.delete('http://1.116.39.28:8880/delPlan',{
                    params:{plid:row.plid}
                  }).then(res=>{
                      console.log(res.data)
                      if(res.data.code==200){
                        this.$message({
                          message:res.data.msg,
                          type:'success',
                          duration:1000
                        })
                        this.tableData.splice(index,1)
                      }else if(res.data.code==201){
                        this.$message.error(res.data.msg)
                      }
                  }).catch(err=>{
                    console.log(err)
                  })
            },geng(row){
                this.updata.amtlu=row.amtlu
                this.updata.amtre=row.amtre
                this.updata.areaid=row.areaid
                this.updata.areaName=row.areaName
                this.updata.createTime=row.amtlu
                this.updata.planyear=row.amtlu
                this.updata.plid=row.amtlu
                this.dialogUpdataVisible=true
                
            },gengxin(){
              this.$axios.post('http://1.116.39.28:8880/editTask',JSON.stringify(this.updata),{'headers':{'Content-Type':'application/json'}}).then(res=>{
                if(res.data.code==200){
                      console.log(res.data)
                      this.$message({
                        message:res.data.msg,
                        type:'success',
                        duration:1000
                      })
                      this.initupdata()
                      this.dialogUpdataVisible=false
                }else if(res.data.code==201){
                  this.$message.error(res.data.msg)
                }
               
              }).catch(err=>{
                console.log(err)
              })
            },makeplane(row){
                    this.dialogplaneVisible=true
                    this.plandata.plid=row.plid
            },chuanplane(){
             
                this.$axios.get('http://1.116.39.28:8880/editMonthPlan',{
                  params:{
                    amtlu1:this.plandata.amtlu1,
                    amtlu2:this.plandata.amtlu2,
                    amtlu3:this.plandata.amtlu3,
                    amtlu4:this.plandata.amtlu4,
                    amtlu5:this.plandata.amtlu5,
                    amtlu6:this.plandata.amtlu6,
                    amtlu7:this.plandata.amtlu7,
                    amtlu8:this.plandata.amtlu8,
                    amtlu9:this.plandata.amtlu9,
                    amtlu10:this.plandata.amtlu10,
                    amtlu11:this.plandata.amtlu11,
                    amtlu12:this.plandata.amtlu12,
                    amtre1:this.plandata.amtre1,
                    amtre2:this.plandata.amtre2,
                    amtre3:this.plandata.amtre3,
                    amtre4:this.plandata.amtre4,
                    amtre5:this.plandata.amtre5,
                    amtre6:this.plandata.amtre6,
                    amtre7:this.plandata.amtre7,
                    amtre8:this.plandata.amtre8,
                    amtre9:this.plandata.amtre9,
                    amtre10:this.plandata.amtre10,
                    amtre11:this.plandata.amtre11,
                    amtre12:this.plandata.amtre12,
                    plid:this.plandata.plid
                   
                  }
                }).then(res=>{
                  console.log(res)
                      if(res.data.code==200){
                        this.$message({
                          message:res.data.msg,
                          type:'success',
                          duration:1000
                        })
                        this.initplane()
                        this.dialogplaneVisible=false
                      }
                }).catch(err=>{
                  console.log(err)
                      this.$message.error(res.data.msg)
                })
            }

        },mounted:function(){
            this.gettable()
        }
}
</script>
<style scoped>
.main{
    text-align: left;
    padding: 1rem;
}
.el-form-item{
  text-align: left;
}
</style>