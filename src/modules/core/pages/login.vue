<template>
  <div class="login-container">
    <el-form :model="loginForm" :rules="loginRules" ref="loginForm" class="login-form" autoComplete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">Demo中台管理 - 登录</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user"/>
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                  autoComplete="on" placeholder="password"></el-input>
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye"/>
        </span>
      </el-form-item>

      <el-button class="loginBtn" type="primary" :loading="loading" @click.native.prevent="handleLogin">
        {{$t('login.signIn')}}
      </el-button>
      <div class="reg-info">
        <router-link :to="{'path':'/reg'}">还没有账号？立即注册</router-link>
      </div>
    </el-form>

    <el-dialog :title="$t('login.thirdLogin')" :visible.sync="showDialog" append-to-body>
      {{$t('login.thirdLogin')}}
      <br/>
      <login-social-signin/>
    </el-dialog>

  </div>
</template>

<script>
import loginSocialSignin from '../components/loginSocialSignin'

export default {
  components: { loginSocialSignin },
  name: 'login',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('用户名不能小于6位'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false
    }
  },
  methods: {
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin () {
      this.loading = true
      this.$store.dispatch('login', {
        mobile: this.loginForm.username,
        password: this.loginForm.password
      }).then(res => {
        this.loading = false
        this.$router.push({ path: '/' }).catch(e => {
          console.log(e)
        })
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>
<style lang="scss">
@import "../assets/scss/login";
.login-container {
  background: url(../assets/img/login-bg.jpg) 100% 100% no-repeat;
}
</style>
