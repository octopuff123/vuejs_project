<template>
  <div class="login-container">
    <div class="login-form">
      <div class="login-header">
        <label style="letter-spacing: 0.1em">德基机械</label>
        <div class="line"></div>
        <label>D&G MACHINERY</label>
      </div>
      <el-form ref="myForm" :model="loginForm" :rules="loginForm_rules" label-width="100px">
        <el-form-item label="公司ID:" prop="loginCpid">
          <el-input v-model="loginForm.loginCpid"></el-input>
        </el-form-item>
        <el-form-item label="用户名 :" prop="loginUsername">
          <el-input v-model="loginForm.loginUsername"></el-input>
        </el-form-item>
        <el-form-item label="密码 :" prop="loginPassword">
          <el-input type="password" v-model="loginForm.loginPassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitLoginForm">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loginForm: {
        loginCpid:'',
        loginUsername:'',
        loginPassword:'',
      },
      //form validation
      loginForm_rules: {
        loginCpid: [
          { required: true, message: '请输入公司ID' }
        ],
        loginUsername: [
          { required: true, message: '请输入用户名' }
        ],
        loginPassword: [
          { required: true, message: '请输入密码' }
        ],
      }
    };
  },

  methods: {
    async submitLoginForm() {
      try {
        console.log(this.loginForm.loginCpid);
        console.log(this.loginForm.loginUsername);
        console.log(this.loginForm.loginPassword);

        const response = await axios.get(
          'http://222.222.119.72:15518/login', {
            params: {
              cpid: this.loginForm.loginCpid,
              username: this.loginForm.loginUsername,
              password: this.loginForm.loginPassword,
            },
          }
        );
        if (response.status === 200) {
          const token = response.data;
          this.$store.dispatch('setCredentials', { cpid: this.cpid, username: this.username, password: this.password, token: token });
          this.$router.push('/mainPage');
        } else {
          console.error('Failed to retrieve token');
        }
      } catch (error) {
        console.error('An error occurred:', error);
        this.$alert('用户信息或密码不正确！','登入失败',{
            confirmButtonText:'继续',
            type: 'warning', //icon
            showClose: false,
        })
      }
    },
  },
};
</script>

<style scoped>
    @import '../css/login.css';
</style>
