<template>
    <div class="box">
        <div class="top">
<el-row>
  <el-col :span="8">
      <span class="top1">系统管理/设备管理</span>
     
  </el-col>
  <el-col :span="3" :offset="13">
      <div class="top2"> <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">设备管理</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">设备列表</a></el-breadcrumb-item>

</el-breadcrumb></div>
  </el-col>
</el-row>
        </div>
        <div class="main">
          <div class="bu"> <el-button type="primary" @click="openadd">新增设备</el-button></div>
            <div class="main1">
                <el-table
    :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
    style="width: 100%"
    max-height="250">
    <el-table-column
      fixed
      prop="etype"
      label="类型"
      width="250">
    </el-table-column>
    <el-table-column
      prop="eid"
      label="设备型号"
      width="200">
    </el-table-column>
    <el-table-column
      prop="efactory"
      label="厂商"
      width="200">
    </el-table-column>
    <el-table-column
      prop="eprice"
      label="单价(元)"
      width="200">
    </el-table-column>
    <el-table-column
      prop="estock"
      label="总库存(台)"
      width="200">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="upda(scope.row)"
          type="text"
          size="small">
          库存管理
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
    </div>
    <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length">
    </el-pagination>
  </div>
  <el-dialog title="收货地址" :visible.sync="dialogAdShemVisible">
  <el-form :model="formEqu">
    <el-form-item label="设备型号" :label-width="formLabelWidth">
      <el-input v-model="formEqu.emodel" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="类型">
    <el-select v-model="formEqu.etype" placeholder="请选择活动区域">
      <el-option label="热风机" value="热风机"></el-option>
      <el-option label="生物质炉具" value="生物质炉具"></el-option>
    </el-select>
    </el-form-item>
    <el-form-item label="厂商">
    <el-select v-model="formEqu.efactory" placeholder="请选择活动区域">
      <el-option label="格力" value="格力"></el-option>
      <el-option label="长虹  " value="长虹"></el-option>
       <el-option label="美的" value="美的"></el-option>
      <el-option label="北方中能" value="北方中能"></el-option>
    </el-select>
    </el-form-item>
    <el-form-item label="单价" :label-width="formLabelWidth">
      <el-input v-model="formEqu.eprice" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="总库存" :label-width="formLabelWidth">
      <el-input v-model="formEqu.estock" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogAdShemVisible = false">取 消</el-button>
    <el-button type="primary" @click="adshe">确 定</el-button>
  </div>
</el-dialog>
<!--  库存管理 -->
<el-dialog title="库存管理" :visible.sync="dialogUpdmVisible">
  <el-form :model="stock">
    <el-form-item label="操作">
    <el-radio-group v-model="stock.act">
      <el-radio label="1">出库</el-radio>
      <el-radio label="0">入库</el-radio>
    </el-radio-group>
    <el-form-item label="数量">
   <el-input-number v-model="stock.amt"  :min="1" :max="9999" label="描述文字"></el-input-number>
  </el-form-item>
  </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogUpdmVisible = false">取 消</el-button>
    <el-button type="primary" @click="posttr">确 定</el-button>
  </div>
</el-dialog>
    </div>
    
</template>
<script>
export default {
    data(){
      return{
        tableData:[],
        pageSize:5,
        currentPage:1,
        dialogAdShemVisible:false,
        dialogUpdmVisible:false,
        formLabelWidth: '120px',
        formEqu:{
          emodel:'',
          etype:'',
          efactory:'',
          eprice:'',
          estock:''
        },
        stock:{
          act:'',
          amt:'',
          eid:''
        }
      }
    },
    methods:{
      // 把formEqu属性清空
      getclear(){
          this.formEqu.emodel='',
          this.formEqu.etype='',
          this.formEqu.efactory='',
          this.formEqu.eprice='',
          this.formEqu.estock=''
      },
      getclear1(){
          this.stock.act='',
          this.stock.amt='',
          this.stock.eid=''
      }
      ,
      getnei(){
        this.$axios.get('http://1.116.39.28:8880/equipmentList').then(res=>{
          console.log(res.data)
          this.tableData=res.data
        }).catch(err=>{
          console.log(err)
        })
      },handleSizeChange(val) {
       this.pageSize=val
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage=val
        console.log(`当前页: ${val}`);
      },
      openadd(){
          this.dialogAdShemVisible=true
      },
      adshe(){
        this.$axios.post('http://1.116.39.28:8880/addEqu',JSON.stringify(this.formEqu),{'headers':{"Content-Type":'application/json'}}).then(res=>{
          console.log(res.data)
              
            if(res.data.code==200){
              this.$message({
                message:res.data.msg,
                type:'success',
                duration:500
              })
              this.getclear()
              this.dialogAdShemVisible=false
            }else{
              this.$message.err(res.data.msg)
            }
        }).catch(err=>{
              console.log(err)
          }
        )
      },
      upda(row){
        this.stock.eid=row.eid
        
        this.dialogUpdmVisible=true
         
      },
      posttr(){
        this.$axios.get('http://1.116.39.28:8880/updStock',{
          params:{
            eid:this.stock.eid,
            act:this.stock.act,
            amt:this.stock.amt
          }
        }).then(res=>{
            if(res.data.code==200){
              this.$message({
                message:res.data.msg,
                type:'success',
                duration:500
              })
              this.getclear1()
              this.dialogUpdmVisible=false
            }else{
              this.$message.err(res.data.msg)
            }
        }).catch(err=>{
              console.log(err)
        })
      }
    },mounted:function(){
      this.getnei()
    }
}
</script>
<style scoped>

.el-col{
    text-align: left;
}
.top1{
    font-size: 1.5rem;
    font-weight: bold;
}

.top{
    height:4rem;
    background: white;
}
.el-main{
    padding: 0px !important;
}
.top2{
    margin-top: 1rem;
    text-align: right;
}
.main{
    padding: 1rem;
    background: #ccc;
}
.main1{
    background: white;
}
.bu{
 text-align: left;
}

</style>