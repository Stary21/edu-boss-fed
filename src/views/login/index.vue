<template>
  <div class="login">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
      label-position="top"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="isLoading" @click="onSubmit"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { login } from '@/servies/login'
export default {
  name: 'LoginIndex',
  data () {
    return {
      form: {
        phone: '18201288771',
        password: '111111'
      },
      isLoading: false,
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1[\d]{10}$/,
            message: '请输入正确手机号',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '请输入正确密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async onSubmit () {
      try {
        this.$refs.form.validate()
        this.isLoading = true
        const { data } = await login(this.form)
        this.isLoading = false
        if (data.state === 1) {
          this.$message.success('登录成功')
          this.$store.commit('setUser', data.content)
          this.$router.push('/')
        } else {
          this.$message.error('登录失败')
        }
      } catch (err) {
        console.log('没有通过检测')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-form {
  width: 300px;
  padding: 20px;
  background-color: #fff;
}
.el-button {
  width: 100%;
}
</style>
