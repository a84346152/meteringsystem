<template>
  <tabShowList
    :tab-show="tabShow"
    :tab-show-name="tabShowName"
    v-model:is-show="mainSwitch"
  ></tabShowList>
  <el-row>
    <el-col :span="24">
      <el-col :span="22" style="margin-bottom: 15px">
        <el-button size="small" type="primary" @click="orderManage('add')"
          >增加</el-button
        >
        <el-button size="small" type="danger" @click="orderManage('delete')"
          >删除</el-button
        >
        <el-button size="small" type="success" @click="orderManage('submit')"
          >提交</el-button
        >
        <el-button size="small" type="warning" @click="orderManage('withdraw')"
          >撤销提交</el-button
        >
        <el-button size="small" type="primary" @click="orderManage('accept')"
          >收样</el-button
        >
        <el-button size="small" type="primary" @click="clickDown"
          >导出EXCEL</el-button
        >
        <!--<el-button size="small" type="primary">ECQS导入</el-button>
          <el-button size="small" type="primary">浙里检导入</el-button> -->
      </el-col>
      <el-col :span="2">
        <el-button
          size="small"
          style="position: absolute; right: 0px"
          @click="mainSwitch = true"
          >列表设置
        </el-button>
      </el-col>
      <el-col :span="24">
        <el-input
          placeholder="请输入委托单位"
          v-model="searchList.clientName.value"
          clearable
          size="mini"
          style="width: 160px"
        >
        </el-input>
        <el-input
          placeholder="请输入委托编号"
          v-model="searchList.seqCommission.value"
          clearable
          size="mini"
          style="width: 160px"
        >
        </el-input>
        <el-select
          v-model="searchList.areaCode.value"
          placeholder="请选择区域"
          size="mini"
          style="width: 120px"
        >
          <el-option value="">全部</el-option>
          <el-option
            v-for="item in areaCode"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          >
          </el-option>
        </el-select>
        <el-select
          v-model="searchList.commissionSource.value"
          placeholder="请选择委托来源"
          size="mini"
          style="width: 160px"
        >
          <el-option value="">全部</el-option>
          <el-option value="Online" label="收发室受理"></el-option>
          <el-option value="3" label="加油机客户端"></el-option>
          <el-option value="4" label="电子客户端"></el-option>
          <el-option value="6" label="医化客户端"></el-option>
          <el-option value="11" label="国家ECQS"></el-option>
          <el-option value="12" label="浙里检"></el-option>
        </el-select>
        <span style="position: relative; top: 1px" class="ie-el">
          <el-date-picker
            v-model="day"
            type="daterange"
            unlink-panels
            range-separator="至"
            start-placeholder="委托开始日期"
            end-placeholder="委托结束日期"
            :picker-options="pickerOptions"
            size="mini"
            :editable="isReadOnly"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </span>
        <el-button
          type="primary"
          size="mini"
          style="padding: 6px 15px !important"
          @click="resetPage"
          >搜索</el-button
        >
      </el-col>
    </el-col>
    <!--标签页切换-->
    <el-col :span="24">
      <el-tabs v-model="type" @tab-click="resetPage">
        <el-tab-pane label="我受理的委托单" name="1"></el-tab-pane>
        <el-tab-pane label="院所有委托单" name="2"></el-tab-pane>
        <!--<el-tab-pane label="加油机受理" name="3"></el-tab-pane>
          <el-tab-pane label="电子秤受理" name="4"></el-tab-pane>
          <el-tab-pane label="强检受理" name="5"></el-tab-pane> -->
      </el-tabs>
    </el-col>
    <!--列表-->
    <el-col :span="24">
      <el-table
        :data="orderList"
        style="width: 100%"
        :height="tabHeight"
        highlight-current-row
        border
        size="mini"
        v-loading="loading"
        stripe
        :cell-style="{ padding: '3px 0px' }"
        @sort-change="sortChange"
        @selection-change="selectOrder"
      >
        <el-table-column type="selection" width="40"></el-table-column>
        <template v-if="tabShow['委托编号']">
          <el-table-column
            prop="seqCommission"
            label="委托编号"
            width="120"
            :sortable="'custom'"
            show-overflow-tooltip
          ></el-table-column>
        </template>

        <template v-if="tabShow['委托单位']">
          <el-table-column
            prop="clientName"
            label="委托单位"
            width="180"
            show-overflow-tooltip
          >
          </el-table-column>
        </template>

        <template v-if="tabShow['委托日期']">
          <el-table-column
            prop="gmtCommission"
            label="委托日期"
            width="120"
            :sortable="'custom'"
            show-overflow-tooltip
          >
            <template v-slot="scope">
              <span>{{dateFormat(scope.row.gmtCommission) }}</span>
            </template>
          </el-table-column>
        </template>

        <template v-if="tabShow['联系人']">
          <el-table-column
            prop="contact"
            label="联系人"
            width="80"
            show-overflow-tooltip
          >
          </el-table-column>
        </template>

        <template v-if="tabShow['联系电话']">
          <el-table-column
            prop="mobile"
            label="联系电话"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
        </template>

        <template v-if="tabShow['委托类别']">
          <el-table-column
            prop="commissionCategory"
            label="委托类别"
            width="90"
            show-overflow-tooltip
          >
            <template v-slot="scope">
              <span>{{
                orderCategoryFormat(scope.row.commissionCategory)
              }}</span>
            </template>
          </el-table-column>
        </template>

        <template v-if="tabShow['委托来源']">
          <el-table-column
            prop="commissionSource"
            label="委托来源"
            width="80"
            show-overflow-tooltip
          >
            <template v-slot="scope">
              <span>{{
                commissionSourceFormat(scope.row.commissionSource)
              }}</span>
            </template>
          </el-table-column>
        </template>

        <template v-if="tabShow['区域']">
          <el-table-column
            prop="areaCode"
            label="区域"
            width="60"
            show-overflow-tooltip
          >
            <template v-slot="scope">
              <span>{{ areaCodeFormat(scope.row.areaCode) }}</span>
            </template>
          </el-table-column>
        </template>

        <template v-if="tabShow['状态']">
          <el-table-column
            prop="commissionState"
            label="状态"
            width="80"
            :sortable="'custom'"
            show-overflow-tooltip
          >
            <template v-slot="scope">
              <span
                v-html="
                  orderStatusFormat(
                    scope.row.commissionState,
                    getSampleNum(scope.row.idCommission)
                  )
                "
              ></span>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="操作" show-overflow-tooltip>
          <template v-slot="scope">
            <el-button
              @click="orderManage('edit', scope.row)"
              size="mini"
              type="text"
              >编辑</el-button
            >
            <el-button
              @click="orderManage('business', scope.row)"
              size="mini"
              type="text"
              >修改受理人
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <!--页码-->
    <el-col :span="24">
      <div style="height: 20px; text-align: center">
        <el-pagination
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          v-model:current-page="pageNum"
        >
        </el-pagination>
      </div>
    </el-col>
  </el-row>
  <el-dialog
    title="修改受理人"
    v-model:visible="updateLog"
    width="400px"
    :modal="false"
    :close-on-click-modal="false"
  >
    <el-row>
      <el-col :span="8" style="height: 28px; line-height: 26px"
        >确认修改？</el-col
      >
      <el-col :span="16">
        <el-select v-model="pplAccept" size="mini" placeholder="修改为">
          <el-option label="请选择" value=""></el-option>
          <el-option label="倪旭芳" value="倪旭芳"></el-option>
          <el-option label="邱建丽" value="邱建丽"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="updateLog = false" size="mini">取 消</el-button>
        <el-button type="primary" size="mini">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import tabShowList from "@/components/tabShowList.vue";
import { useCounterStore } from "@/stores/counter";
const {dateFormat,areaCodeFormat,orderCategoryFormat,orderStatusFormat,commissionSourceFormat} =useCounterStore();
</script>
<script lang="ts">
import { defineComponent } from "vue";
import service from "@/config/service";
import axios from "axios";
import { api } from "@/config/api";
import { util } from "@/utils";
import { ElMessage } from "element-plus";
import { useCounterStore } from "@/stores/counter";
export default defineComponent({
  data() {
    const { store } = useCounterStore();
    return {
      //列表设置
      tabShowName: "entrustArrayTabShow",
      //标签页切换
      type: "2",
      //默认搜索参数
      searchList: {
        clientName: {
          value: "",
          fuzzy: true,
        },
        seqCommission: {
          value: "",
          fuzzy: true,
        },
        areaCode: {
          value: "",
          fuzzy: false,
        },
        commissionSource: {
          value: "",
          fuzzy: false,
        },
        commissionCategory: {
          value: 0, //前台受理
          fuzzy: false,
        },
      },
      //时间搜索参数
      day: "",
      orderList: [],
      selectOrders: [],
      pageNum: 1,
      pageSize: 20,
      total: 0,
      buttonShow: undefined,
      personalSearch: [],
      loading: false,
      isReadOnly: false,
      tabHeight: document.documentElement.clientHeight - 173,
      mainSwitch: false,
      tabShow: store.acceptance.entrustArray,
      sort: [
        {
          order: "Desc",
          target: "commissionState",
        },
        {
          order: "Desc",
          target: "seqCommission",
        },
      ],
      areaCode: store.areaCode,
      pickerOptions: store.dateFunction,
      updateLog: false,
      pplAccept: "",
    };
  },
  mounted() {
    const historyTabShow = localStorage.getItem(this.tabShowName);
    if (historyTabShow != null && historyTabShow != "") {
      this.tabShow = JSON.parse(historyTabShow);
    }
    this.searchList.commissionCategory.value =
      util.getParameter("commissionCategory");
    this.getOrderList();
  },
  methods: {
    sortChange: function (val) {
      this.sort = util.handleSort(val, this.sort);
      console.log(this.sort);
      this.getOrderList();
    },
    resetPage() {
      this.pageNum = 1;
      this.getOrderList();
    },
    //向后端请求委托单数据
    getOrderList() {
      let startDay;
      let endDay;
      if (this.day != null) {
        startDay = this.day[0];
        endDay = this.day[1];
      }
      const pageParam = util.getPageParam(this.pageSize, this.pageNum);
      const sortParam = util.getSortParam(this.sort);
      const searchParam = util.getMultiParam(this.searchList);
      const timeParam = util.getTimeParam(
        "gmtCommission",
        startDay,
        endDay,
        true
      );
      //判断用户在该节点查询是否存在资源，并进行加载
      let isSpecial = false;
      if (this.personalSearch.length > 0) {
        isSpecial = true;
        this.personalSearch.forEach(function (val) {
          searchParam.multiParams.push(val);
        });
      }
      //判断查询对应的节点类型
      let type = 0;
      if (this.buttonShow == "1010201") {
        type = 1;
      }
      this.loading = true;
      service
        .post(api.order.listGet + this.type + "?specialSearch=" + isSpecial, {
          searchParam: searchParam,
          pageParam: pageParam,
          sortParam: sortParam,
          timeParam: timeParam,
        })
        .then(({ content, count }) => {
          this.orderList = content;
          this.total = count;
        })
        .catch((error) => {
          this.$message.error(error);
        })
        .finally(() => (this.loading = false));
    },
    selectOrder(selection) {
      this.selectOrders = selection;
    },
    /**
     * 委托单管理
     * @param operation 操作指令
     * @param data 数据
     */
    orderManage(operation, data = {}) {
      let commissionCategory = "";
      switch (operation) {
        //增加委托单、编辑委托单、编辑委托受理人
        case "business":
          this.updateLog = true;
          break;
        case "add":
        case "edit":
          if (data.commissionCategory) {
            commissionCategory =
              data.commissionCategory + "&idCommission=" + data.idCommission;
          }
          window.open(
            "acceptOrder.html?commissionCategory=" +
              commissionCategory +
              "&openType=" +
              operation,
            "_blank"
          );
          break;
        //删除委托单
        case "delete":
          if (this.selectOrders.length < 1) {
            ElMessage("请先选中委托单");
          } else {
            this.$confirm("确认删除?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "error",
            })
              .then(() => {
                const list = this.selectOrders.map((order) => {
                  return order.idCommission;
                });
                service
                  .post(api.order.deleteOrder, { list })
                  .then(() => {
                    this.pageNum += util.deleteByPage(
                      this.pageSize,
                      this.pageNum,
                      this.total,
                      list.length
                    );
                    ElMessage.success("删除成功");
                    this.getOrderList();
                  })
                  .catch((error) => ElMessage("删除失败:" + error));
              })
              .catch(() => ElMessage("删除操作中止"));
          }
          break;
        //提交委托单、撤回委托单
        case "submit":
        case "withdraw":
          const op = operation === "submit" ? "提交" : "撤销提交";
          if (this.selectOrders.length < 1) {
            ElMessage("请先选中委托单");
            return;
          }
          if (this.selectOrders.length > 1) {
            ElMessage("一次只能" + op + "一个委托单");
            return;
          }
          service
            .patch(api.order[operation] + this.selectOrders[0].idCommission)
            .then(() => {
              ElMessage.success(op + "成功");
              this.getOrderList();
            })
            .catch((error) => ElMessage.warning(op + "失败：" + error));
          break;
        //收样
        case "accept":
          if (this.selectOrders.length < 1) {
            ElMessage("请先选中委托单");
          }
          if (this.selectOrders.length > 1) {
            ElMessage("一次只能收样一个委托单");
          }
          if (this.selectOrders[0].commissionState === "Uploaded") {
            ElMessage("当前委托单还未提交，请先提交后操作");
            return;
          }
          service
            .post(api.process.sampleAccept + this.selectOrders[0].idCommission)
            .then(() => ElMessage.success("收样成功"))
            .catch((err) => ElMessage.warning(err));
          break;
      }
    },
    /**
     * 分页功能
     */
    handleSizeChange: function (val) {
      this.pageSize = val;
      this.getOrderList();
    },
    handleCurrentChange: function (val) {
      this.pageNum = val;
      this.getOrderList();
    },
    // 导出excel
    downLoadExcel(data, fileName) {
      //定义表头
      let str = `委托编号,委托单位,委托日期,联系人,联系电话,委托类别,委托来源,区域,状态,\n`;
      //增加\t为了不让表格显示科学计数法或者其他格式
      for (let i = 0; i < data.length; i++) {
        for (let item in data[i]) {
          //`${ }` （模版字符串）支持换行符
          str += `${data[i][item] + "\t"},`;
        }
        str += "\n";
      }
      //encodeURIComponent解决中文乱码
      let uri = "data:text/csv;charset=utf-8,\ufeff" + encodeURIComponent(str);
      //通过创建a标签实现
      let link = document.createElement("a");
      link.href = uri;
      //对下载的文件命名
      link.download = `${fileName || "表格数据"}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    clickDown() {
      let tableData = JSON.parse(JSON.stringify(this.orderList));
      const arr = [];
      for (let i = 0; i < tableData.length; i++) {
        let state = "";
        switch (tableData[i].commissionState) {
          case "Uploaded":
            state = "未提交";
            break;
          case "Submitted":
            state = "已提交";
            break;
          case "Rejected":
            state = "作废";
            break;
        }
        const a = {
          seqCommission: tableData[i].seqCommission,
          clientName: tableData[i].clientName,
          gmtCommission: this.dateFormat(tableData[i].gmtCommission),
          contact: tableData[i].contact,
          telephone: tableData[i].telephone,
          commissionCategory: this.orderCategoryFormat(
            tableData[i].commissionCategory
          ),
          commissionSource: this.commissionSourceFormat(
            tableData[i].commissionSource
          ),
          areaCode: this.areaCodeFormat(tableData[i].areaCode),
          commissionState: state,
        };
        arr.push(a);
      }
      var date = new Date();
      this.downLoadExcel(
        arr,
        "业务查询详细" +
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate() +
          " " +
          date.getHours() +
          "-" +
          date.getMinutes() +
          "-" +
          date.getSeconds()
      );
    },
    getSampleNum(idCommission) {
      const searchParam = {
        multiParams: [
          {
            searchTarget: "idCommission",
            searchContent: idCommission,
            fuzzySearch: false,
          },
        ],
      };
      axios
        .post(api.sample.listGet, { searchParam: searchParam })
        .then((res) => {
          if (res.data.code === "10000") return res.data.totalCount;
        })
        .catch((e) => ElMessage.error(e));
    },
  },
});
</script>

<style scoped>
.el-button--mini,
.el-button--mini.is-round {
  padding: 0px 10px;
}
</style>
