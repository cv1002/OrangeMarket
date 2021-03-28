<template>
  <div @submit="handleSubmit">
    <!-- 输入任意文本 -->
    <VanField v-model="form.username.value" :error-message="checkUserName"
              label="用户名"
              placeholder="请输入用户名"
              @change="form.username.hide = false"
    />
    <!-- 输入手机号，调起手机号键盘 -->
    <VanField v-model="form.tel.value" :error-message="checkTel"
              label="手机号" placeholder="请输入手机号"
              type="tel"
              @change="form.tel.hide = false"
    />
    <!-- 短信验证码 -->
    <van-field
        v-model="form.verify.value"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
    >
      <template #button>
        <van-button size="small" type="primary" @click="submitVerify">{{ verifyButtonText }}</van-button>
      </template>
    </van-field>
    <!-- 输入密码 -->
    <VanField v-model="form.password.value" label="密码" placeholder="8~16位，且不能包含空格" type="password"/>
    <!-- 确认密码 -->
    <VanField v-model="form.assurePassword.value" :error-message="checkPassword"
              label="确认密码" placeholder="必须与输入密码一样"
              type="password"
              @change="form.password.hide = false"/>
    <VanGoodsAction>
      <VanGoodsActionButton text="重置" type="warning" @click="reset"/>
      <VanGoodsActionButton text="提交" type="danger" @click="handleSubmit"/>
    </VanGoodsAction>
  </div>
</template>

<script>
import '@/assets/css/grid.css';

/*
 * 为了防止表单初始为空的时候报错，在表单中使用该类。
 * value是表单填入的值，hide是是否显示错误。
 */
class FormItem {
  constructor() {
    this.value = "";
    this.hide = true;
  }

  reset() {
    this.value = "";
    this.hide = true;
  }
}

export default {
  name: "Register",
  data() {
    return {
      /* 验证码冷却时间 */
      coldTime: 0,
      /* 表单 */
      form: {
        /* 表单中的电话号码 */
        tel: new FormItem(),
        /* 表单中的验证码 */
        verify: new FormItem(),
        /* 表单中的用户名 */
        username: new FormItem(),
        /* 表单中的密码 */
        password: new FormItem(),
        /* 表单中的确认密码 */
        assurePassword: new FormItem(),
      },
    }
  },
  computed: {
    /* 检查UserName是否符合格式的函数 */
    checkUserName() {
      if (this.form.username.hide) {
        return "";
      } else {
        return this.form.username.value === '' ? '用户名不能为空' : ''
      }
    },
    /* 检查PassWord是否符合格式的函数 */
    checkPassword() {
      if (this.form.password.hide) {
        return "";
      } else if (this.form.password.value !== this.form.assurePassword.value) {
        return "请您确认两次输入密码都是一样的";
      } else if (this.form.password.value === "") {
        return "必须填写密码和确认密码"
      } else if (
          this.form.password.value.length < 8 ||
          this.form.password.value.length > 16 ||
          this.form.password.value.includes(' ')) {
        return "密码的长度必须在8~16位，同时不能包含空格";
      } else {
        return "";
      }
    },
    /* 检查电话号码是否符合格式的函数 */
    checkTel() {
      if (this.form.tel.hide) {
        return "";
      } else if (!(/^1[34578]\d{9}$/.test(this.form.tel.value))) {
        return "不是完整的11位手机号或者正确的手机号前七位";
      } else {
        return "";
      }
    },
    /* 验证码按钮的文字处理逻辑 */
    verifyButtonText() {
      if (this.coldTime === 0) {
        return "发送验证码";
      } else {
        return `请等${this.coldTime}秒再发送`;
      }
    }
  },
  methods: {
    /* 处理表单提交的函数 */
    async handleSubmit() {
      const { $ } = await import("@/util/ajax");
      await $.post("/register", {
        userName: this.form.username.value,
        userTelephone: this.form.tel.value,
        userPassword: this.form.password.value,
        userGender: "未知"
      });
    },
    /* 重置表单内容的函数，链接到template的一个button */
    reset() {
      this.form.tel.reset();
      this.form.verify.reset();
      this.form.username.reset();
      this.form.password.reset();
      this.form.assurePassword.reset();
    },
    /* 发送验证码的函数 */
    submitVerify() {
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
  }
}
</script>

<style scoped>
h3 {
  font-size: 1.75rem;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0;
  margin-inline-end: 0;
  display: inline;
  user-select: none;
}
</style>