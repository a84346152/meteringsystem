<template>
  <el-row>
    <el-col class="backgroundImg">
      <el-col :span="6" :offset="13">
        <img
          src="../assets/img/ad.png"
          style="position: absolute; left: 0; top: 0; z-index: 2"
        />
        <div class="wave">
          <img src="../assets/img/wave1.png" class="wave1" />
          <img src="../assets/img/wave2.png" class="wave2" />
        </div>
        <img src="../assets/img/img11.png" class="img11" />
        <div
          style="
            width: 400px;
            height: 400px;
            background-color: #ffffff;
            margin-top: 17vh;
            z-index: 9999;
            border-radius: 10px;
            position: relative;
          "
        >
          <el-col :span="24" style="height: 100px"></el-col>
          <el-col :span="22">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="账号">
                <el-input
                  @keyup.enter="onSubmit"
                  v-model="form.username"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input
                  type="password"
                  @keyup.enter="onSubmit"
                  v-model="form.password"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">登录</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </div>
      </el-col>
    </el-col>
  </el-row>
</template>
<script>
import { defineComponent } from "vue";
import service from "../config/service";
import { api } from "@/config/api";
import router from "@/router";

export default defineComponent({
  data() {
    return {
      form: {},
      rules: [],
    };
  },
  methods: {
    onSubmit() {
      service
        .post(api.user.login, null, {
          params: this.form,
          withCredentials: true,
        })
        .then(() => {
          router.push("/home");
        })
        .catch((err) => {
          console.log(err);
          this.$message.error("登录失败：" + err);
        });
    },
  },
});
</script>

<style scoped>
.backgroundImg {
  height: 100vh;
  margin: 0;
  background-image: url(../assets/img/bg.jpg);
}

.wave {
  overflow: hidden;
  width: 100vw;
  position: absolute;
  bottom: 5vh;
  height: 300px;
  left: 0;
}

.wave1 {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 104vw;
  animation-name: wave1;
  animation-duration: 5s;
  animation-iteration-count: infinite;
}

.wave2 {
  position: absolute;
  left: -8vw;
  bottom: 0;
  width: 108vw;
  animation-name: wave2;
  animation-duration: 5s;
  animation-iteration-count: infinite;
}

.img11 {
  position: absolute;
  left: 340px;
  top: 300px;
  animation-name: img11;
  animation-duration: 5s;
  animation-iteration-count: infinite;
}

@keyframes wave1 {
  0% {
    left: 0vw;
  }

  50% {
    left: -4vw;
  }

  100% {
    left: 0vw;
  }
}

@keyframes wave2 {
  0% {
    left: -8vw;
  }

  50% {
    left: 0vw;
  }

  100% {
    left: -8vw;
  }
}

@keyframes img11 {
  0% {
    transform: translateY(-5px);
  }

  50% {
    transform: translateY(20px);
  }

  100% {
    transform: translateY(-5px);
  }
}
</style>
