<template>
  <el-container>
    <el-header style="background-color: #545c64">
      <div
        style="
          width: 160px;
          float: left;
          height: 100%;
          text-align: center;
          padding-right: 20px;
        "
      >
        <span style="color: #fff; line-height: 60px">计量业务系统</span>
      </div>
      <div style="width: calc(100% - 180px); float: left">
        <el-menu
          :default-active="'1'"
          mode="horizontal"
          :ellipsis="false"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-sub-menu index="1">
            <template #title>我的工作台</template>
            <el-menu-item index="1-1">
              <div style="width: 80px">消息</div>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item index="2">
            消息中心
            <el-badge value="new" class="item">
            </el-badge>
          </el-menu-item>
          <div class="flex-grow" />
          <el-sub-menu index="3">
            <template #title>{{ user.username }},您好</template>
            <el-menu-item index="3-1">
              <div style="width: 80px" @click="loginOut">退出登录</div>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
    </el-header>
    <el-container>
      <el-aside
        width="200px"
        id="aside"
        :style="{ height: asideHeight + 'px' }"
      >
        <el-scrollbar :style="{ height: asideHeight + 'px' }">
          <el-menu
            class="el-menu-vertical-demo"
            :unique-opened="true"
            default-active="101"
          >
            <el-sub-menu
              v-for="item in menu"
              :key="item.id"
              :index="'' + item.id"
            >
              <template #title>
                <i :class="item.icon"></i>
                <span>{{ item.permissionName }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="cItem in item.basePermissionList"
                  :index="'' + cItem.id"
                  :key="cItem.id"
                >
                  <div @click="jump(cItem)">
                    {{ cItem.permissionName }}
                  </div>
                </el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-main>
        <div
          style="
            position: absolute;
            border-left: 1px solid #e6e6e6;
            left: 199px;
            z-index: 999;
          "
          :style="{ height: asideHeight + 'px' }"
        ></div>
        <div
          style="
            height: 100%;
            width: 100%;
            min-width: 1140px;
            box-sizing: border-box;
            padding: 10px 0 5px;
          "
        >
          <iframe
            name="iframe"
            width="99.5%"
            height="100%"
          ></iframe>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup></script>
<script lang="ts">
import { defineComponent } from "vue";
import service from "../config/service";
import { api } from "@/config/api";
import { ElMessage } from "element-plus";
import router from "@/router";
import type { MenuModel } from "@/types";

export default defineComponent({
  data() {
    const menu: MenuModel[] = [];
    return {
      asideHeight: 0,
      activeIndex2: "2",
      menu,
      user: {},
      permission: [],
      resources: {}
    };
  },
  created() {
    this.asideHeight = document.documentElement.clientHeight - 60;
    this.getMenu();
    this.getUserMsg();
  },
  methods: {
    handleSelect() {
    },
    jump: function(data: any) {
      const b = data.href.lastIndexOf("?");
      if (b === -1) {
        window.open(data.href + "?permissionId=" + data.id, data.target);
      } else {
        window.open(data.href + "&permissionId=" + data.id, data.target);
      }
    },
    loginOut() {
      service
        .post(
          api.user.loginOut,
          {},
          {
            withCredentials: true
          }
        )
        .then(() => router.push("login"))
        .catch((err) => ElMessage.error(err));
    },
    getMenu() {
      service
        .post(api.permission.getMenu)
        .then((data) => {
          this.menu = data.seq;
        })
        .catch((err) => ElMessage.error(err));
    },
    getUserMsg() {
      //获取cookie中的用户信息，判断是否登录
      service
        .post(api.user.getUserMsg)
        .then((data) => {
          this.user = data.seq;
          this.getPermission();
        })
        .catch((err) => {
          ElMessage(err);
          this.$router.push("/");
        });
    },
    getPermission() {
      service
        .get(api.permission.getCurrentUser)
        .then((data) => {
          this.permission = data.roles;
          this.resources = data.resources;
        })
        .catch((err) => ElMessage.error(err));
    }
  }
});
</script>
<style>
.flex-grow {
  flex-grow: 1;
}
.el-sub-menu .el-menu-item {
  padding: 0 0 0 45px;
}

.el-scrollbar__wrap {
  overflow-x: hidden;
}

.el-menu-item.is-active .el-link{
  color: #409eff !important;
}

#aside {
  position: relative;
}

.el-main {
  padding: 0 0px 0 10px;
}

.el-link {
  justify-content: left;
}

.item {
  margin-top: -60px;
}

.el-badge__content {
  border: 1px solid transparent;
}

</style>
