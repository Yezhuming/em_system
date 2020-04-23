<template>
  <div class="uindex flex">
    <div class="row flex">
      <div class="person-info bgblue flex">
        <div v-if="!isLogin" style="width:230px;position:relative;">
          <div class="userinfo">时间：{{nowDate}}</div>
          <div class="userinfo"><span style="visibility:hidden;">时间：</span>{{nowTime}}</div>
          <el-button type="text" @click="login" class="login-btn">请先登录</el-button>
        </div>
        <div v-else style="width:230px;">
          <div class="userinfo">姓名：{{ user.name}}</div>
          <div class="userinfo">学号：{{ user.account}}</div>
          <div class="userinfo">时间：{{nowDate}}</div>
          <div class="userinfo"><span style="visibility:hidden;">时间：</span>{{nowTime}}</div>
          <div class="options">
            <el-button type="text" @click="showUpdatePwdDialog">修改密码</el-button>
            <el-button type="text" @click="exit">退出</el-button>
          </div>
        </div>
      </div>
      <div class="lab-introduction bgblue">
        <div class="subtitle">
          <i class="el-icon-office-building"></i>
          <span>实验室概况</span>
        </div>
        <p>华南师范大学计算机科学技术实验中心是2001年11月经广东省教育厅批准、由广东省教育厅和华南师范大学共同投资建设的省级开放型重点实验室。</p>
        <p>实验中心建筑面积1064平方米，现有单价800元以上的设备771件 ，总值548.6万元，承担40门实验课程，现有专职人员有14人，其中高级职称6人。</p>
      </div>
      <div class="carousel bgblue">
        <el-carousel trigger="click" height="177px">
          <el-carousel-item v-for="item in carouselImg" :key="item">
            <el-image :src="item" fit="fill" style="height:177px"></el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="row flex">
      <div class="friend-link bgblue">
        <div class="subtitle">
          <i class="el-icon-office-building"></i>
          <span>友情链接</span>
        </div>
        <div class="content flex">
          <el-link href="https://sso.scnu.edu.cn" target="_blank" :underline="false">华师综合服务平台</el-link>
          <el-link href="https://jwc.scnu.edu.cn" target="_blank" :underline="false">华师教务管理系统</el-link>
          <el-link href="https://www.scnu.edu.cn" target="_blank" :underline="false">华南师范大学</el-link>
          <el-link href="https://moodle.scnu.edu.cn" target="_blank" :underline="false">砺儒云课堂</el-link>
          <el-link href="http://www.scholat.com/" target="_blank" :underline="false">学者网</el-link>
        </div>
      </div>
      <div class="index-notice bgblue">
        <div class="subtitle">
          <i class="el-icon-office-building"></i>
          <span>通知公告</span>
        </div>
        <div class="content flex">
          <el-table
            :data="noticeData"
            :show-header="false"
            tooltip-effect="light"
            style="width: 100%">
            <el-table-column label="order" width="18">•</el-table-column>
            <el-table-column label="标题" width="250" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-link @click="toDetail(scope.row)" :underline="false">{{scope.row.title}}</el-link>
              </template>
            </el-table-column>
            <el-table-column prop="publishDate" label="日期" align="right"></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="index-resource bgblue">
        <div class="subtitle">
          <i class="el-icon-office-building"></i>
          <span>资源下载</span>
        </div>
        <div class="content flex">
          <el-table
            :data="resourceData"
            :show-header="false"
            tooltip-effect="light"
            style="width: 100%">
            <el-table-column label="order" width="18">•</el-table-column>
            <el-table-column label="文件名" width="250" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-link @click="openLink(scope.row)" :underline="false">{{scope.row.fileName}}</el-link>
              </template>
            </el-table-column>
            <el-table-column prop="uploadDate" label="上传日期" align="right"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <el-dialog title="修改密码" :visible.sync="pwdFormVisible" width="22%">
      <el-form :model="pwdForm" ref="pwdForm" :rules="rules" label-width="100px" label-position="left">
        <el-form-item label="原密码" prop="oldPassword" label-width="70px">
          <el-input type="password" v-model="pwdForm.oldPassword" show-password ref="oldPwdInput"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword" label-width="70px">
          <el-input type="password" v-model="pwdForm.newPassword" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword" label-width="70px">
          <el-input type="password" v-model="pwdForm.checkPassword" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="pwdFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatePassword">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import carousel1 from '../../assets/carousel1.jpg'
import carousel2 from '../../assets/carousel2.jpg'

export default {
  data() {
    // 表单验证规则
    let pwdCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.pwdForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      interval: '',
      nowDate: '',
      nowTime: '',
      carouselImg: [carousel1, carousel2],
      user: {},
      pwdFormVisible: false,
      pwdForm: {
        oldPassword: '',
        newPassword: '',
        checkPassword: ''
      },
      rules: {
        checkPassword: [
          {validator: pwdCheck, trigger: 'blur'}
        ]
      },
      noticeData: [],
      resourceData: []
    }
  },
  computed: {
    isLogin() {
      if (this.user == null) {
        return false
      } else {
        if (this.user.role == 1) {
          return true
        } else {
          return false
        }
      }
    }
  },
  methods: {
    login() {
      this.$router.push('/login')
    },
    // 计算时间
    calculatTime() {
      let date = new Date()
      let weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      this.nowDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
      this.nowTime = `${weekdays[date.getDay()]} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    },
    // 弹出修改密码对话框
    showUpdatePwdDialog() {
      this.$refs.pwdForm.resetFields()
      this.pwdFormVisible = true
    },
    // 修改密码
    updatePassword() {
      this.$refs.pwdForm.validate((valid) => {
        if (valid) {
          this.$axios.get('/student/getOne', {
            params: {
              sID: this.user.sID
            }
          })
            .then(res => {
              console.log(res)
              if (res.data.status == 200) {
                let oldPassword = res.data.result[0].password
                if (this.pwdForm.oldPassword != oldPassword) {
                  this.$message.error('原密码错误！')
                  this.$refs.oldPwdInput.select()
                } else {
                  this.$axios.post('/student/updatePassword', {
                    sID: this.user.sID,
                    newPassword: this.pwdForm.newPassword
                  })
                    .then(res => {
                      console.log(res)
                      if (res.data.status == 200) {
                        this.pwdFormVisible = false
                        this.$message.success('修改成功！')
                        this.$refs.pwdForm.resetFields()
                      }
                    })
                    .catch(err => {
                      console.log(err)
                    })
                }
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$message.error('修改失败！')
          return false
        }
      })
    },
    // 获取通知公告列表
    getNoticeList() {
      this.$axios.get('/article/getLimited')
        .then(res => {
          if (res.data.status == 200) {
            this.noticeData = res.data.result
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 跳转通知公告详情
    toDetail(row) {
      this.$router.push({
        name: 'uNoticeDetails',
        query: {
          aID: row.aID
        }
      })
    },
    // 获取资源下载列表
    getResourceList() {
      this.$axios.get('/resource/getLimited')
        .then(res => {
          if (res.data.status == 200) {
            this.resourceData = res.data.result
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 下载资源
    openLink(row) {
      window.open(`http://localhost:8081/resource/${row.fileName}`)
    },
    // 退出
    exit() {
      sessionStorage.removeItem('user')
      this.user = null
    }
  },
  created() {
    this.interval = setInterval(this.calculatTime)
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.getNoticeList()
    this.getResourceList()
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }
}
</script>

<style lang="scss">
  .uindex{
    flex-direction: column;
  }
  .row{
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .person-info{
    width: 230px;
    padding: 10px;
  }
  .login-btn{
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 16px;
  }
  .userinfo{
    text-align: left;
    margin-bottom: 10px;
  }
  .options{
    &::after{
      content: '';
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
    }
    .el-button{
      padding: 0;
    }
    .el-button--text{
      float: left;
      font-size: 16px;
    }
    .el-button--text:last-child{
      color: red;
      float: right;
    }
  }
  .lab-introduction{
    width: 500px;
    padding: 10px;
    p{
      text-indent: 2em;
      margin: 0;
    }
  }
  .subtitle{
    margin-top: 5px;
    padding-bottom: 5px;
    border-bottom: 2px dotted black;
  }
  .carousel{
    width: 300px;
  }
  .friend-link{
    width: 230px;
    padding: 10px;
  }
  .index-notice{
    width: 380px;
    height: 214px;
    padding: 10px;
  }
  .index-resource{
    width: 380px;
    height: 214px;
    padding: 10px;
  }
  .content{
    flex-direction: column;
    .el-link{
      font-size: 16px;
      margin: 6px 0;
    }
    .el-table{
      background-color: aliceblue;
      tr{
        background-color: aliceblue;
      }
      tr:hover>td {
        background-color: aliceblue!important
      }
      td{
        padding: 6px 0;
      }
      .el-link{
        margin: 0;
      }
    }
  }
  .index-notice,.index-resource{
    .el-link--inner{
      width: 250px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
</style>
