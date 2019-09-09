<template>
  <div class="login-container">
    <div class="login-form">
      <div v-show="regShow">
        <el-form :model="regForm" :rules="loginRules" ref="regForm" label-position="left">
          <div class="title-container">
            <h3 class="title">Demo中台管理 - 注册</h3>
          </div>
          <el-form-item prop="mobile">
            <el-input name="mobile" type="text" clearable v-model="regForm.mobile" placeholder="11位手机号"/>
          </el-form-item>
          <el-form-item prop="verificationCode" class="info-posin">
            <el-input name="verificationCode" type="text" clearable v-model="regForm.verificationCode"
                      placeholder="输入验证码"/>
            <el-button v-show="sendAuthCode" type="text" class="code-btn" @click.native.prevent="handlecode">获取验证码</el-button>
            <el-button v-show="!sendAuthCode" type="text" class="code-btn" disabled style="color:#999">{{auth_time}}秒之重新发送验证码</el-button>
          </el-form-item>
          <el-form-item prop="password">
            <el-input name="password" :type="passwordType" clearable @keyup.enter.native="handleLogin"
                      v-model="regForm.password" placeholder="6-16位密码"/>
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input name="confirmPassword" :type="passwordType" clearable @keyup.enter.native="handleLogin"
                      v-model="regForm.confirmPassword" placeholder="确认密码"/>
          </el-form-item>
          <el-button class="loginBtn" type="primary" :loading="loading"
                     @click.native.prevent="handleNext">下一步
          </el-button>
        </el-form>
      </div>
      <div v-show="nextShow">
        <el-form :model="regForm" :rules="regFormInfo" ref="regFormInfo" label-position="left">

          <div class="title-container">
            <h3 class="title">海澜营销中台登录</h3>
          </div>
          <el-form-item prop="company">
            <el-input name="company" type="text" clearable v-model="regForm.company" placeholder="请输入您的公司名称"/>
          </el-form-item>
          <el-form-item prop="username">
            <el-input name="username" type="text" clearable v-model="regForm.username" placeholder="请输入您的姓名"/>
          </el-form-item>
          <el-form-item prop="email">
            <el-input name="email" type="text" clearable v-model="regForm.email" placeholder="请输入您的工作邮箱"/>
          </el-form-item>
          <el-button class="loginBtn" type="primary" :loading="loading" @click.native.prevent="handleLogin">注册
          </el-button>

        </el-form>
      </div>
      <div class="reg-info">
        <router-link :to="{'path':'/login'}">使用已有帐户登录</router-link>
      </div>
    </div>

  </div>
</template>

<script>
import { checkPhone, checkPassword, checkEmail } from '../../filters'
import { registerStep1, registerStep2, regCode } from '@/base/api/frame'

export default {
  components: {},
  name: 'reg',
  data () {
    let verificationCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('验证码不能为空'))
      } else if (value.length > 6) {
        return callback(new Error('请输入六位验证码'))
      } else {
        callback()
      }
    }
    const companyName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('公司名不能为空'))
      } else {
        callback()
      }
    }
    const userName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('名称不能为空'))
      } else {
        callback()
      }
    }
    const confirmPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('密码不能为空'))
      } else if (value !== this.regForm.password) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }

    return {
      regForm: {
        mobile: '',
        verificationCode: '',
        password: '',
        confirmPassword: '',
        company: '',
        username: '',
        email: ''
      },
      loginRules: {
        mobile: [{ required: true, trigger: 'blur', validator: checkPhone }],
        verificationCode: [
          { required: true, trigger: 'blur', validator: verificationCode }
        ],
        password: [
          { required: true, trigger: 'blur', validator: checkPassword }
        ],
        confirmPassword: [
          { required: true, trigger: 'blur', validator: confirmPassword }
        ]
      },
      regFormInfo: {
        email: [{ required: true, trigger: 'blur', validator: checkEmail }],
        company: [{ required: true, trigger: 'blur', validator: companyName }],
        username: [{ required: true, trigger: 'blur', validator: userName }]
      },

      passwordType: 'password',
      loading: false,
      showDialog: false,
      regShow: true,
      nextShow: false,
      sendAuthCode: true,
      auth_time: 0
    }
  },
  methods: {
    getAuthCode: function () {
      this.sendAuthCode = false
      this.auth_time = 30
      var timetimer = setInterval(() => {
        this.auth_time--
        if (this.auth_time <= 0) {
          this.sendAuthCode = true
          clearInterval(timetimer)
        }
      }, 1000)
    },
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    // 验证码
    handlecode () {
      if (this.regForm.mobile !== '') {
        regCode({ mobile: this.regForm.mobile }).then(res => {
          this.getAuthCode()
        })
      } else {
        this.$message.error('请输入手机号')
      }
    },
    // 下一步
    handleNext () {
      this.$refs.regForm.validate(valid => {
        if (valid) {
          var data = {
            mobile: this.regForm.mobile,
            verificationCode: this.regForm.verificationCode
          }
          registerStep1(data)
            .then((data, err) => {
              if (err) {
                this.$message.error(err)
                return false
              } else {
                this.$message.success('恭喜您，' + data.data.msg + '!')
                this.regShow = false
                this.nextShow = true
              }
            })
            .catch(() => {
            })
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    },
    // 注册
    handleLogin (callback) {
      this.$refs.regFormInfo.validate(valid => {
        if (valid) {
          registerStep2(this.regForm).then((data, err) => {
            if (err) {
              this.$message.error(err)
              return false
            } else {
              this.$message.success('恭喜您，注册成功！')
              this.$router.push({ path: '/login' })
            }
          })
        } else {
          return false
        }
      })
    }
  },
  created () {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed () {
    // window.removeEventListener('hashchange', this.afterQRScan)
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/scss/login";
  .login-container {
    background: url(../assets/img/login-bg.jpg) 100% 100% no-repeat;
  }

  .info-posin {
    .code-btn {
      /*background: #fff;*/
      color: #43a7fe;
      border: 0 none;
      position: absolute;
      right: 10px;
      top: 2px;
    }
  }
</style>
