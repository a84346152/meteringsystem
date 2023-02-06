<template>
  <div id="tabSwitch" v-show="isShow">
    <i
      class="el-icon-close"
      style="position: absolute; font-size: 20px; right: 0px; z-index: 999"
      @click="close"
    ></i>
    <div style="position: absolute">
      <div style="height: 50px">
        <el-checkbox
          v-model="tabAllShow"
          @change="changeTabAllShow"
          label="全部"
          border
          size="small"
          style="margin-left: 10px; margin-top: 10px; width: 120px"
        ></el-checkbox>
      </div>
      <div style="height: 150px; overflow-y: auto">
        <el-checkbox
          v-for="item in tabSwitch"
          v-model="item.value"
          :label="item.label"
          :key="item.label"
          border
          size="mini"
        ></el-checkbox>
      </div>
      <el-button
        @click="changeTab"
        style="
          margin-left: 10px;
          width: 120px;
          margin-top: 2px;
          padding: 7px 0px;
        "
        size="small"
        type="primary"
        >确定</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    tabShow: Object,
    tabShowName: String,
    isShow: Boolean,
  },
  data() {
    return {
      tabSwitch: this.objToArray(this.tabShow),
      tabAllShow: true,
    };
  },
  methods: {
    changeTab() {
      this.$confirm("页面将重新加载?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const tabShow = JSON.stringify(this.arrayToObj(this.tabSwitch));
          localStorage.setItem(this.tabShowName, tabShow);
          window.location.reload();
        })
        .catch(function () {});
    },
    changeTabAllShow: function (val) {
      for (var i = 0; i < this.tabSwitch.length; i++) {
        this.tabSwitch[i].value = val;
      }
    },
    close: function () {
      this.$emit("update:isShow", false);
    },
    objToArray: function (obj) {
      var list = [];
      for (var b in obj) {
        var one = {
          value: obj[b],
          label: b,
        };
        list.push(one);
      }
      return list;
    },
    arrayToObj: function (list) {
      var obj = {};
      for (var i = 0; i < list.length; i++) {
        obj[list[i].label] = list[i].value;
      }
      return obj;
    },
  },
  created() {
    for (var i in this.tabShow) {
      if (!this.tabShow[i]) {
        this.tabAllShow = false;
        break;
      }
    }
  },
});
</script>

<style scoped>
#tabSwitch {
  position: absolute;
  background-color: white;
  border: 1px solid #C2C2C2;
  width: 150px;
  height: 240px;
  z-index: 999;
  right: 1%;
  top: 40%;
  margin-top: -100px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
</style>
