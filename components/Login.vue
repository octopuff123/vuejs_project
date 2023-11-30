<template>
  <div class="login-container">
    <form @submit.prevent="login" class="login-form">
      <div class="login-header">
        <label style="letter-spacing: 0.1em">德基机械</label>
        <div class="line"></div>
        <label>D&G MACHINERY</label>
      </div>
      <div class="form-group">
        <label for="cpid" class="form-label">公司ID:</label>
        <input type="text" id="cpid" v-model="cpid" :class="{ 'form-control': true, 'is-invalid': deniedAccess }" required>
      </div>
      <div class="form-group">
        <label for="username" class="form-label">用户名:</label>
        <input type="text" id="username" v-model="username" :class="{ 'form-control': true, 'is-invalid': deniedAccess }" required>
      </div>
      <div class="form-group password-input">
        <label for="password" class="form-label">密码:</label>
        <input type="password" id="password" v-model="password" :class="{ 'form-control': true, 'is-invalid': deniedAccess }" required ref="passwordInput">
      </div>
      <button type="submit" class="btn" style="margin:5px; margin-top: 10px;">登录</button>
    </form>

    <div v-if="grantAccess">
      <h2>Login Successful!</h2>
      <p>Company ID: {{ cpid }}</p>
      <p>Username: {{ username }}</p>
      <p>Password: {{ password }}</p>
    </div>

    <div v-show="deniedAccess">
      <p class="invalid-feedback">Login failed. Please check your credentials.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      cpid: 'dg',
      username: 'lixin',
      password: 'Lx12345678',
      grantAccess: false,
      deniedAccess: false,
    };
  },

  methods: {
    async login() {
      try {
        this.grantAccess = false;
        this.deniedAccess = false;

        const response = await axios.get(
          'http://222.222.119.72:15518/login',
          {
            params: {
              cpid: this.cpid,
              username: this.username,
              password: this.password,
            },
          }
        );

        if (response.status === 200) {
          const token = response.data;
          this.$store.dispatch('setCredentials', { cpid: this.cpid, username: this.username, password: this.password, token: token });
          this.grantAccess = true;
          this.$router.push('/mainPage');
        } else {
          console.error('Failed to retrieve token');
        }
      } catch (error) {
        this.deniedAccess = true;
        console.error('An error occurred:', error);
      }
    },
  },
};
</script>

<style scoped>
    @import '../css/login.css';
</style>
