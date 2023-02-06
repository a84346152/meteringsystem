import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  // const count = ref(0);
  // const doubleCount = computed(() => count.value * 2);
  // function increment() {
  //   count.value++;
  // }
  const store = reactive({
    loadOption: {
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)",
    },
    outsourceUtil: [
      //外包单位
      "萧山区质量计量监测中心",
      "宝应县计量测试检定所",
      "杭州市质量技术监督检测院",
      "国家标准物质研究中心",
      "国家钢铁材料测试中心",
      "杭州市计量检定修理站",
      "中国计量科学研究院",
      "浙江省计量科学研究院",
      "浙江省技术监督检测研究院",
      "上海市计量测试技术研究院",
      "中国测试技术研究院",
      "上海计量检定院",
      "浙江省气象仪器检定所",
      "陕西测绘仪器计量监督检定中心",
      "上海计量测试技术院",
      "天津市计量技术研究所",
      "天津市计量监督检测科学研究院",
      "西北国家计量测试中心",
      "省衡管所",
      "南京市计量监督检测院",
      "深圳市计量质量检测研究院",
      "绍兴市质量技术监督检测院",
      "江苏省计量科学研究院",
      "四川中测标物科技有限公司",
      "浙江省方正校准有限公司",
    ],
    areaCode: [
      {
        value: "330301",
        label: "市辖区",
      },
      {
        value: "330302",
        label: "鹿城区",
      },
      {
        value: "330303",
        label: "龙湾区",
      },
      {
        value: "330304",
        label: "瓯海区",
      },
      {
        value: "330322",
        label: "洞头县",
      },
      {
        value: "330324",
        label: "永嘉县",
      },
      {
        value: "330326",
        label: "平阳县",
      },
      {
        value: "330327",
        label: "苍南县",
      },
      {
        value: "330328",
        label: "文成县",
      },
      {
        value: "330329",
        label: "泰顺县",
      },
      {
        value: "330381",
        label: "瑞安市",
      },
      {
        value: "330382",
        label: "乐清市",
      },
    ],
    qjCategory: [
      {
        value: "贸易结算",
      },
      {
        value: "医疗卫生",
      },
      {
        value: "安全防护",
      },
      {
        value: "环境监测",
      },
      {
        value: "社会公用计量标准器具",
      },
      {
        value: "最高计量标准器具",
      },
      {
        value: "行政执法",
      },
      {
        value: "司法鉴定",
      },
    ],
    dateFunction: {
      shortcuts: [
        {
          text: "今天",
          onClick: (picker: any) => {
            const end = new Date(new Date().setHours(23, 59, 59, 999));
            const start = new Date(new Date().setHours(0, 0, 0, 0));
            picker.$emit("pick", [start, end]);
          },
        },
        {
          text: "最近一周",
          onClick: (picker) => {
            const end = new Date();
            let start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            start = new Date(start.setHours(0, 0, 0, 0));
            picker.$emit("pick", [start, end]);
          },
        },
        {
          text: "最近一个月",
          onClick: (picker) => {
            const end = new Date();
            let start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            start = new Date(start.setHours(0, 0, 0, 0));
            picker.$emit("pick", [start, end]);
          },
        },
        {
          text: "最近一年",
          onClick: (picker) => {
            const end = new Date();
            let start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
            start = new Date(start.setHours(0, 0, 0, 0));
            picker.$emit("pick", [start, end]);
          },
        },
        {
          text: "全部",
          onClick: (picker) => {
            picker.$emit("pick", ["", ""]);
          },
        },
      ],
    },
    acceptance: {
      //TabShow
      clientMsg: {
        单位编号: true,
        单位名称: true,
        单位地址: true,
        联系电话: true,
        联系人: true,
        手机: true,
        协议: true,
        折扣: true,
        所属区域: true,
        记账: true,
        状态: true,
        信用代码: true,
      },
      comprehensiveSelectOrder: {
        委托编号: true,
        委托单位: true,
        委托日期: true,
        联系人: true,
        联系电话: true,
        委托类别: true,
        委托来源: true,
        样品数量: true,
        中止: true,
        减免数量: true,
        记录人: true,
        状态: true,
        样品回库: true,
        证书回库: true,
        是否发证: true,
        费用: true,
        减免: true,
        是否收费: true,
        备注: true,
      },
      comprehensiveSelectSample: {
        样品编号: true,
        证书编号: true,
        样品名称: true,
        器具类别: true,
        型号规格: true,
        出厂编号: true,
        制造单位: true,
        准确度: true,
        应收费用: true,
        减免: true,
        是否收费: true,
        样品状态: true,
        证书状态: true,
        强检: true,
        操作: true,
      },
      entrustArray: {
        委托编号: true,
        委托单位: true,
        委托日期: true,
        联系人: true,
        联系电话: true,
        委托类别: true,
        业务员: true,
        委托来源: true,
        区域: true,
        状态: true,
      },
      sampleReturn: {
        证书预览: true,
        委托单编号: true,
        退回: true,
        样品编号: true,
        器具类别: true,
        样品名称: true,
        委托单位: true,
        委托日期: true,
        型号规格: true,
        准确度: true,
        出厂编号: true,
        制造单位: true,
        样品状态: true,
        样品流程: true,
        委托单状态: true,
        检定日期: true,
        有效期: true,
        委托类别: true,
        证书类别: true,
        是否强检: true,
        强检类别: true,
        检验地点: true,
        主检科室: true,
        证书单位: true,
        证书单位地址: true,
        区域: true,
        行业: true,
        业务受理人: true,
        收样人: true,
        检定结论: true,
        等级内容: true,
        收费标准: true,
        折扣系数: true,
        折后金额: true,
        减免金额: true,
        已收费用: true,
        收样时间: true,
        领样人: true,
        制证人: true,
        签字人: true,
        核验人: true,
        批准人: true,
        打印人: true,
        盖章人: true,
        价确人: true,
        样回人: true,
        证回人: true,
        通知人: true,
        发送人: true,
        联系人: true,
        联系电话: true,
        联系手机: true,
        委托单位地址: true,
        指定主检人: true,
        要求完成时间: true,
        委托单备注: true,
        协议单位: true,
        外包单位: true,
        外包项目: true,
        计量类型: true,
        证书文件路径: true,
        器具类别编号: true,
        是否制证: true,
        是否签字: true,
        是否批准: true,
        是否打印: true,
        是否证回: true,
        是否发送: true,
      },
      sceneEntrustArray: {
        计划编号: true,
        委托单位: true,
        联系日期: true,
        联系人: true,
        联系手机: true,
        联系电话: true,
        出车方式: true,
        驾驶员: true,
        车牌号码: true,
        备注: true,
        状态: true,
        记录时间: true,
      },
      acceptOrder: {
        状态: true,
        样品编号: true,
        计量类型: true,
        证书编号: true,
        样品名称: true,
        生产厂家: true,
        出厂编号: true,
        型号规格: true,
        测量范围: true,
        准确度: true,
        收费标准: true,
        主检人: true,
        主检科室: true,
        器具类别: true,
        设备数: true,
        证书单位: true,
        证书单位地址: true,
        检定依据: true,
        检测地点: true,
        强检: true,
        强检类别: true,
        样品备注: true,
        出租车牌: true,
        加油机号: true,
        是否修理: true,
      },
      sceneAcceptOrder: {
        样品编号: true,
        计量类型: true,
        证书编号: true,
        样品名称: true,
        生产厂家: true,
        出厂编号: true,
        型号规格: true,
        测量范围: true,
        准确度: true,
        收费标准: true,
        主检人: true,
        主检科室: true,
        器具类别: true,
        设备数: true,
        证书单位: true,
        证书单位地址: true,
        折扣率数: true,
        检定依据: true,
        检测地点: true,
        强检: true,
        强检类别: true,
        样品备注: true,
      },
    },
    progress: {
      //TabShow
      sampleTesting: {
        样品编号: true,
        样品名称: true,
        委托单位名称: true,
        委托类别: true,
        主检科室: true,
        主检人: true,
        收样日期: true,
        收样至今: true,
        货架号: true,
        状态: true,
      },
      certificateMaking: {
        样品编号: true,
        样品名称: true,
        型号规格: true,
        出厂编号: true,
        送检单位: true,
        委托类别: true,
        领样人: true,
        要求完成日期: true,
        领样至今: true,
        是否锁定: true,
        状态: true,
      },
      certificateSign: {
        证书编号: true,
        证书类别: true,
        委托类别: true,
        委托单位: true,
        器具名称: true,
        型号规格: true,
        器号: true,
        检定周期: true,
        制证时间: true,
        校验费: true,
        维修费: true,
        出检费: true,
        其他费用: true,
        小计: true,
        状态: true,
      },
      certificateVerification: {
        证书编号: true,
        证书类别: true,
        委托类别: true,
        委托单位: true,
        器具名称: true,
        型号规格: true,
        器号: true,
        检定周期: true,
        委托时间: true,
        校验费: true,
        维修费: true,
        出检费: true,
        其他费用: true,
        小计: true,
        状态: true,
      },
      certificateApproval: {
        证书编号: true,
        证书类别: true,
        委托类别: true,
        委托单位: true,
        器具名称: true,
        型号规格: true,
        器号: true,
        检定周期: true,
        委托时间: true,
        校验费: true,
        维修费: true,
        出检费: true,
        其他费用: true,
        小计: true,
        状态: true,
      },
      certificatePrint: {
        证书编号: true,
        证书类别: true,
        委托类别: true,
        器具名称: true,
        型号规格: true,
        出厂编号: true,
        送检单位: true,
        批准日期: true,
        批准人: true,
        收样至今: true,
        强检: true,
        状态: true,
      },
      certificateReturnWarehouse: {
        委托单编号: true,
        证书编号: true,
        证书类别: true,
        样品名称: true,
        委托单位名称: true,
        主检科室: true,
        主检人: true,
        委托单类别: true,
        制证日期: true,
        收样至今: true,
        收样人: true,
        状态: true,
      },
      sampleReturnWarehouse: {
        委托单编号: true,
        样品编号: true,
        样品名称: true,
        委托单位名称: true,
        委托单类别: true,
        检测类别: true,
        收样日期: true,
        状态: true,
      },
      certifcateSend: {
        证书编号: true,
        样品名称: true,
        委托单编号: true,
        委托单位名称: true,
        主检科室: true,
        主检人: true,
        协议: true,
        强检: true,
        证书类别: true,
        折后金额: true,
        已付费用: true,
        收款情况: true,
        打印时间: true,
        状态: true,
      },
      sampleSend: {
        样品编号: true,
        样品名称: true,
        委托单编号: true,
        委托单位名称: true,
        送检单位: true,
        检验类别: true,
        负责人: true,
        货架号: true,
        是否发送: true,
        收样时间: true,
        收样天数: true,
      },
    },
    fundManagement: {
      //TabShow
      certificatePriceConfirm: {
        //证书价确
        样品编号: true,
        委托编号: true,
        证书类别: true,
        送检单位: true,
        器具名称: true,
        型号规格: true,
        器号: true,
        校验费: true,
        维修费: true,
        出检费: true,
        其他费用: true,
        小计: true,
        委托日期: true,
        收款状态: true,
      },
      feeRemission: {
        //证书减免
        样品编号: true,
        委托编号: true,
        证书类别: true,
        委托类别: true,
        器具名称: true,
        型号规格: true,
        器号: true,
        校验费: true,
        维修费: true,
        出检费: true,
        其他费用: true,
        减免: true,
        小计: true,
        委托日期: true,
        强检: true,
      },
      certificateUncollected: {
        //证书收款-未收款
        委托单编号: true,
        委托单位: true,
        委托日期: true,
        应收费用: true,
        减免: true,
        已收费用: true,
        未收费用: true,
        是否收费: true,
        是否价确: true,
      },
      certificateReceived: {
        //证书收款-已收款
        收款编号: true,
        付款单位: true,
        发票号码: true,
        收款时间: true,
        收款金额: true,
        收款形式: true,
        备注: true,
        记录人: true,
      },
      fundIncomeManagement: {
        //资金收入管理
        收款编号: true,
        收款时间: true,
        收款形式: true,
        收款总金额: true,
        已开发票金额: true,
        付款单位: true,
        备注: true,
        收款类别: true,
      },
      detailedListOfFundIncome: {
        //资金收入明细列表
        样品编号: true,
        委托编号: true,
        证书类别: true,
        委托单位: true,
        器具名称: true,
        型号规格: true,
        器号: true,
        校验费: true,
        维修费: true,
        出检费: true,
        其他费用: true,
        减免: true,
        小计: true,
        委托日期: true,
        强检类别: true,
        是否收款: true,
      },
      certificateQuery: {
        //证书应收账查询
        样品编号: true,
        委托编号: true,
        证书类别: true,
        器具名称: true,
        委托单位: true,
        委托日期: true,
        减免: true,
        已付款: true,
        应收款: true,
        未付款: true,
      },
    },
  });

  /**
   * 时间格式化
   */
  const dateFormat = function (time: string) {
    let subDate;
    if (time != "" && time != null) {
      subDate = time.substring(0, 10);
    }
    return subDate;
  };
  /**
   * 区域编码转换
   */
  const areaCodeFormat = function (code: any) {
    const areaCode = store.areaCode;
    for (let i = 0; i < areaCode.length; i++) {
      if (code == areaCode[i].value) {
        return areaCode[i].label;
      }
    }
  };
  /**
   * 获取委托单类别
   * @param {Object} type
   */
  const orderCategoryFormat = function(type) {
    let t = "";
    if (type == "FrontReception") {
      t = "前台委托";
    } else if (type == "Subcontract") {
      t = "分包委托";
    } else if (type == "SiteVerification") {
      t = "现场检定";
    }
    return t;
  }
  /**
   * @param {Object} obj
   * 委托单状态转换
   */
  const orderStatusFormat = function(status) {
    if (status == 'Uploaded') {
      return "<span class='error-color'>未提交</span>";
    } else if (status == 'Submitted') {
      return "<span class='success-color'>已提交</span>";
    } else if (status == 'Rejected') {
      return "<span >作废</span>";
    } else {
      return "";
    }
  }
  const commissionSourceFormat = function(type) {
    var t = "";
    switch (type) {
      case 'Online':
        t = '收发室受理';
        break;
      case 'Onsite':
        t = '现场受理';
        break;
      case 'Tanker':
        t = '加油机客户端';
        break;
      case 'Electronic':
        t = '电子客户端';
        break;
      case 'Medicalization':
        t = '医化客户端';
        break;
      case 'ECQS':
        t = 'ECQS';
        break;
      case 'Zhelijian':
        t = '浙里检';
        break;
      default:
        break;
    }
    return t;
  }
  return { store, dateFormat, areaCodeFormat,orderCategoryFormat ,orderStatusFormat,commissionSourceFormat};
  // return { count, doubleCount, increment };
});
