//原始记录接口前缀
const originRecordPath = "originalRecord/";
export const api = {
  process: {
    //业务流程
    acceptListGet: "sampledata/accept", //检测领样
    certListGet: "sampledata/cert", //证书制作
    signatureListGet: "sampledata/signature", //证书签名
    auditListGet: "sampledata/audit", //证书核验
    approveListGet: "sampledata/approve", //证书批准
    printListGet: "sampledata/print", //证书打印
    backListGet: "sampledata/back", //证书回库
    samplebackListGet: "sampledata/sampleback", //样品回库
    sendListGet: "sampledata/send", //证书发送
    samplesendListGet: "sampledata/samplesend", //样品发送
    circulation: "certstate/start/", //状态流转

    acceptBack: "detail/acceptback", //领样退回
    certBack: "detail/certback", //证书退回
    processBack: "detail/sampleback/", //流程退回（最多退回至证书制作）
    printback: "detail/printback", //打印退回
    backsample: "detail/backsample", //样品回库退回
    sendback: "detail/sendback", //证书发送退回
    samplesendback: "detail/samplesendback", //样品发送退回
    overCheak: "detail/overcheak", //中止检测

    sampleAccept: "commission/state/", //收样(暂时)
    certCreateListGet: "detail/certfind", //证书批量编辑列表获取
    certCreateUpdate: "detail/certUpdate", //证书批量编辑
    lock: "detail/lock/", //锁定解锁接口

    originalRecordSubmit: "detail/source/submit", //原始记录提交和修改接口
    originalRecordSave: "detail/source/save", //原始记录保存接口
    orginalRecordGet: "detail/source/saved/", //获取数据库原始记录接口
  },
  order: {
    //委托单
    get: "commission/one/",
    listGet: "commission/multi/",
    judgeIdCommission: "commission/one/exist/",
    deleteOrder: "commission/batch/delete",
    submit: "commission/one/p1/submit/",
    withdraw: "commission/one/p1/withdraw/",
    change: "commission",
    //更新备注
    savaOneRemarks: "commission/update/comments",
    sceneSubmit: "reservation",
    sceneDelete: "reservation/batch/delete",
    sceneListGet: "reservation/multi",
    //业务综合查询
    comprehensiveSelect: "commission/comprehensiveSelect",
    //导出excel
    exExcel: "commission/excel",
  },
  //任务单
  sample: {
    complexQuery: "sample",
    //返回选中委托单的样品
    listGet: "commission/subordinate/task",
    //批量返回选中委托单样品
    getTotalData: "commission/getTotalData",
    getAgreement: "commission/getAgreement",
    sceneGet: "reservation/subordinate/tasks/",
    receive: "procedure/batch/Receive",
    allListGet: "commission/findAllByCond",
    //更新受理人
    savaOneBusinessReceiver: "commission/update",
    allInfoListGet: "commission/getsampleall",
  },
  client: {
    //单位
    searchList: "unit/search",
    update: "unit/edit",
    add: "unit/add",
    deleteList: "unit/batchDelete",
  },
  sampleList: {
    //样品列表
    listGetAcceptance: "system/sample",
    listGet: "sample/search",
    add: "sample/add",
    update: "sample/edit",
    deleteList: "sample/batchDelete",
    sideListGet: "sample/sampleSide/list",
    sideAdd: "sample/sampleSide/add",
    sideUpdate: "sample/sampleSide/edit",
    sideDelete: "sample/sampleSide/delete/",
  },
  category: {
    //器具类别
    allListGet: "category/categoryList",
    listGet: "system/sample/category",
    add: "category/add",
    update: "category/edit",
    deleteList: "category/batchDelete",
    deviceListGet: "category/quote/deviceList/",
    basisListGet: "category/quote/standardList/",
    chargeListGet: "category/charge/list/",
    chargeAdd: "category/charge/add",
    chargeUpdate: "category/charge/edit",
    chargeDelete: "category/charge/batchDelete",
    quoteAdd: "category/quote/add",
    quoteDelete: "category/quote/batchDelete",
  },
  user: {
    //用户
    listGet: "user",
    insert: "user/one",
    permissionGet: "permission/user/",
    permissionUpdate: "permission/user/permissionCollection",
    uploadSign: "user/one/signature",

    cacheListGet: "user/getall",

    login: "login",
    loginOut: "userlogin/loginout",
    getUserMsg: "user/getuser",
    getDepartment: "department/findAll",
  },
  role: {
    //角色
    rolePermissionGet: "permission/compareWithDemo/role/",
    roleGet: "user/one/role/",
    roleListGet: "permission/groupRoles",
    listUpdate: "permission/groupRoles/",
    update: "permission/groupRole",
    add: "permission/groupRoles",
    statusUpdate: "permission/groupRoles",
  },
  permission: {
    //权限
    listGet: "permission/basePermission",
    add: "permission/basePermission",
    update: "permission/basePermission",
    updateName: "permission/updatebasePermission",
    getMenu: "permission/getbasePermission",
    getCurrentUser: "permission/userRoles",
  },
  basis: {
    //依据
    listGet: "standard/search",
    add: "standard/add",
    update: "standard/edit",
    deleteList: "standard/batchDelete",
  },
  device: {
    //装置
    listGet: "device/search",
    add: "device/add",
    update: "device/edit",
    statusUpdate: "device/operation",
    deleteList: "device/batchDelete",
    certificateListGet: "device/certificate/list/",
    certificateAdd: "device/certificate/add",
    certificateUpdate: "device/certificate/edit",
    certificateDelete: "device/certificate/batchDelete",
    equipmentListGet: "device/quoteEquipment/list/",
    equipmentAdd: "device/quoteEquipment/add",
    equipmentDelete: "device/quoteEquipment/delete",
    histroyListGet: "device/operationList/",
  },
  equipment: {
    //设备
    listGet: "equipment/search",
    add: "equipment/add",
    update: "equipment/edit",
    deleteList: "equipment/batchDelete",
    histroyListGet: "equipment/operationList/",
    certificateListGet: "equipment/certificate/list/",
    certificateAdd: "device/certificate/add",
    certificateUpdate: "device/certificate/edit",
    certificateDelete: "device/certificate/batchDelete",
  },
  //原始记录云平台前台接口
  originRecordYun: {
    //添加样品
    addSample: originRecordPath + "measure/samples/addSamples",
    //未制证原始记录数据
    getCertificateList: originRecordPath + "measure/getCertificate",
    //修改样品为已制证
    isUpdateCertificate: originRecordPath + "yunApp/measure/updateCertificate",
  }, //原始数据
  originRecordBasic: {
    //存储待上传原始记录样品本地缓存
    addOriRec: "originRecords/add",
  }, //原始记录模板
  recordTemp: {
    listGet: "recordTemp/find",
    add: "recordTemp/add",
    updateRecord: "recordTemp/edit",
    deleteRecordTemp: "recordTemp/delete",

    print: "/certTemp/#/page/print/record/",
    edit: "/certTemp/#/page/edit/record/",
    save: "/certTemp/#/recordTemp/save/",
  },
  certificate: {
    //证书
    listGet: "certificate/search",
    add: "certificate/add",
    update: "certificate/edit",
    deleteList: "certificate/batchDelete",

    print: "/certTemp/#/page/print/cert/",
    edit: "/certTemp/#/page/edit/cert/",
    save: "/certTemp/#/certTemp/save/",
  },
  warehouse: {
    //仓库
    listGet: "warehouse/search",
    add: "warehouse/add",
    update: "warehouse/edit",
    deleteList: "warehouse/batchDelete",
    shelfListGet: "warehouse/shelf/search",
    shelfAdd: "warehouse/shelf/add",
    shelfUpdate: "warehouse/shelf/edit",
    shelfDeleteList: "warehouse/shelf/batchDelete",
  },
  car: {
    //车辆
    listGet: "application/search",
    carApply: "application/add",
    carUpdate: "application/edit",
    carDelete: "application/batchDelete",
    carPut: "application/batchEdit",
  },
  priceConfirmation: {
    //证书价确
    listGet: "fund/reduction/find", // 证书价确,获取后台数据
    update: "fund/sure/update", // 证书价确,从后台获取校验费和总计 并保存
  },
  certificateFeeDeduction: {
    //证书费用减免
    listGet: "fund/reduction/find", // 证书费用减免,获取后台数据
    update: "fund/reduction/update", // 证书费用减免,从后台得到减免金额和总计
  },
  certificateCollection: {
    //证书收款
    unCollectedListGet: "fund/receive/unreceive", //证书收款,未收款数据
    collectedListGet: "fund/receive/find", //证书收款,已收款数据
    certificateInformation: "fund/receive", //证书收款,获取委托单内的证书信息
    collectionRecord: "fund/receive/update", //证书收款,得到收款记录
    powerOfAttorneyReceived: "fund/rerceive/detail/commission", //证书收款,获取委托单号下的已收款
    powerOfAttorneyreceivedInformation: "fund/rerceive/detail/sample", //证书收款,获取委托单下所有已收款信息
  },
  fundIncomeManagement: {
    //资金收入管理
    listGet: "fund/manage", //资金收入管理,向后端请求委托单数据
    addInvoice: "fund/manage/add", //资金收入管理,添加发票
    deleteAllInvoices: "fund/manage/delete", //资金收入管理,删除全部发票
    drawABill: "fund/invoice/add", //资金收入管理,开发票
    invoiceQuery: "fund/invoice/select", //资金收入管理,发票查询
    invoiceDeletion: "fund/invoice/delete", //资金收入管理,发票删除
    fundDetails: "fund/manage/detail", //资金收入管理,资金详情
  },
  log: {
    progressListGet: "sampledata/processquery", //获取样品流转操作记录
  },
};
