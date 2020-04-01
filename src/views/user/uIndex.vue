<template>
  <div class="uindex flex">
    <div class="row flex">
      <div class="person-info bgblue flex">
        <div class="headimg">
          <el-avatar shape="square" :size="60" :src="avatar"></el-avatar>
        </div>
        <div class="info">
          <div v-show="isLogin">
            <el-button type="text" @click="login">请先登录</el-button>
          </div>
          <div v-show="!isLogin">
            <div class="userinfo">姓名：叶柱铭</div>
            <div class="userinfo">学号：20162180203</div>
            <div class="userinfo">时间：{{nowDate}}</div>
            <div class="userinfo">{{nowTime}}</div>
            <div class="options">
              <el-button type="text">修改密码</el-button>
              <el-button type="text">退出</el-button>
            </div>
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
        <el-carousel trigger="click" height="170px">
          <el-carousel-item v-for="item in carouselImg" :key="item">
            <el-image :src="item"></el-image>
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
        <div class="content flex"></div>
      </div>
      <div class="index-resource bgblue">
        <div class="subtitle">
          <i class="el-icon-office-building"></i>
          <span>资源下载</span>
        </div>
        <div class="content flex"></div>
      </div>
    </div>
  </div>
</template>

<script>
import avatar from '../../assets/avatar.png'
import carousel1 from '../../assets/carousel1.jpg'
import carousel2 from '../../assets/carousel2.jpg'

export default {
  data() {
    return {
      isLogin: true,
      avatar: avatar,
      interval: '',
      nowDate: '',
      nowTime: '',
      carouselImg: [carousel1, carousel2]
    }
  },
  methods: {
    login() {
      this.$router.push('/login')
    }
  },
  created() {
    this.interval = setInterval(() => {
      let date = new Date()
      let weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      this.nowDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
      this.nowTime = `${weekdays[date.getDay()]} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    })
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
  .info{
    margin-left: 10px;
    text-align: center;
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
  }
</style>
