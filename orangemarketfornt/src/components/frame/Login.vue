<template>
  <AForm class="login">
    <h3>登录商城</h3>
    <p class="boldYaHei">请使用手机号以及登录凭证登录</p>
    <AFormItem class="a-form-item">
      <AInput v-model="phone" class="input-phone" placeholder="手机号" @change="checkPhone">
        <AIcon slot="prefix" style="color:rgba(0,0,0,.25)" type="user"/>
      </AInput>
    </AFormItem>
    <h4 v-if="phoneErrorCode !== null" style="color: red">{{ phoneErrorCode }}</h4>
    <AFormItem class="a-form-item">
      <AInputPassword v-model="password" class="input-password" placeholder="密码或验证码">
        <AIcon slot="prefix" style="color:rgba(0,0,0,.25)" type="lock"/>
      </AInputPassword>
    </AFormItem>
    <AFormItem class="a-form-item">
      <ACheckbox v-model="autoCommit">
        10天内自动登录
      </ACheckbox>
      <AButton style="font-feature-settings: 'tnum';" type="link" @click="getVerifyCode">{{ verify }}</AButton>
    </AFormItem>
    <AButton class="submit" type="primary" @click="handleSubmit">
      登录
    </AButton>
    <AButton class="submit" type="default" @click="$router.push('/register')">
      注册
    </AButton>
  </AForm>
</template>

<script>
export default {
  name: "Login",
  /* 进入界面时，首先，查看是否有选择过“10日自动登录”，若有，则发生自动登录事件，否则无事发生 */
  created() {
    if (this.$cookies.isKey("username") && this.$cookies.isKey("password")) {
      this.$store.state.user = {
        tel: this.$cookies.get("username"),
        password: this.$cookies.get("password")
      }
      this.doLogin(this.$store.state.user.tel, this.$store.state.user.password);
    }
  },
  /* 析构函数，析构时，消除我们指定的定时执行函数 */
  beforeDestroy() {
    if (this.intervalCode !== 0) {
      clearInterval(this.intervalCode);
    }
  },
  data() {
    return {
      /* 手机号 */
      phone: null,
      /* 密码 */
      password: null,
      /* 手机输入出错后显示此码 */
      phoneErrorCode: null,
      /* 用于销毁自动运行函数的intervalCode */
      intervalCode: null,
      /* 拉取验证码的冷却时间 */
      coldTime: 0,
      /* 设置是否自动登录 */
      autoCommit: false
    }
  },
  computed: {
    /* 验证码按钮的文字处理逻辑 */
    verify() {
      if (this.coldTime === 0) {
        return "发送验证码";
      } else {
        return `请等${this.coldTime}秒再发送`;
      }
    }
  },
  methods: {
    /* 手机号不符合格式时，释放一个error */
    checkPhone() {
      if (!(/^1[34578]\d{9}$/.test(this.phone))) {
        this.phoneErrorCode = "手机号的格式不正确";
      } else {
        this.phoneErrorCode = "";
      }
    },
    /* 获取验证码的函数，同时将设定一个定时执行函数 */
    getVerifyCode() {
      if (this.coldTime === 0) {
        this.coldTime = 60;
        this.intervalCode = setInterval(() => {
          if (this.coldTime - 1 > 0) {
            this.coldTime -= 1;
          } else {
            this.coldTime = 0;
            clearInterval(this.intervalCode);
            this.intervalCode = 0;
          }
        }, 1000);
      } else {
        this.antMessage.error("现在还不能重新发送验证码哦");
      }
    },
    /* 上传表单的处理函数 */
    handleSubmit() {
      this.doLogin(this.phone, this.password);
    },
    async doLogin(username, password) {
      const { $ } = await import("@/util/ajax");
      const params = new FormData();
      params.append("username", username);
      params.append("password", password);
      const result = await $.post('/login', params);
      if (result.data.success !== true) {
        this.antMessage.error("输入的账号与密码有误，请重新输入");
      } else {
        if (this.autoCommit) {
          this.$cookies.set("username", this.phone, '10d');
          this.$cookies.set("password", this.password, '10d');
        }
        this.$store.state.user.uid = result.data.information.uid;
        this.$store.state.user.selfie = result.data.information.userSelfie;
        this.$store.state.loginstate = true;
        this.antMessage.success(result.data.message);
        await this.$router.push("/");
      }
    }
  }
}
</script>

<style scoped>
h3 {
  font-size: 1.75rem;
  font-weight: 500;
  line-height: 1.2;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0;
  margin-inline-end: 0;
  display: inline;
  user-select: none;
}

p {
  font-size: 0.9rem;
  user-select: none;
  margin-bottom: 0;
  display: block;
  font-family: 'Microsoft YaHei', serif;
  font-weight: bold;
}

h4 {
  font-size: 0.9rem;
  user-select: none;
  margin-bottom: 0;
  display: block;
}

.a-form-item {
  margin: 0;
}

.login {
  max-width: 300px;
  margin: 2rem auto auto;
  position: relative;
  text-align: center;
  top: 0;
}

.input-phone {
  margin: 4px;
}

.input-password {
  margin: 4px;
}

.submit {
  margin-left: 2%;
  width: 40%;
  margin-right: 2%;
}
</style>