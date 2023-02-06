/**
 * 获取传入参数中参数名符合的值
 */
const getParameter = (dataName: string): any => {
  const hrefParameter = window.location.search.substring(1);
  const srr = hrefParameter.split("&");
  let srr1 = [];
  for (let i = 0; i < srr.length; i++) {
    srr1 = srr[i].split("=");
    if (srr1[0] == dataName) {
      return srr1[1];
    }
  }
  return "";
};
/**
 * 排序处理
 */
const handleSort = (one: Object, list: Object[]) => {
  const oneSort = {
    order: one.order == "descending" ? "Desc" : "Asc",
    target: one.prop,
  };

  for (let i = list.length; i > 0; i--) {
    list[i] = list[i - 1];
    if (list[i].target == oneSort.target) {
      list.splice(i, 1);
    }
  }

  if (list.length > 3) {
    list.splice(3);
  }
  list[0] = oneSort;

  return list;
};
/**
 * 生成分页查询对象
 */
const getPageParam = (pageSize: Object, pageNum: Object) => {
  const pageParam = {
    pageSize: pageSize,
    pageIndex: pageNum,
  };
  return pageParam;
};
/**
 * 生成排序查询对象
 */
function getSortParam(list) {
  if (list == "" || list == null) {
    return null;
  }
  const sortTarget = {};
  for (let i = 0; i < list.length; i++) {
    sortTarget[list[i].target] = list[i].order;
  }
  const sortParam = {
    sortParamTarget: sortTarget,
  };
  return sortParam;
}
/**
 * 生成多条件查询对象
 */
function getMultiParam(obj) {
  const multiParams = [];
  for (const d in obj) {
    if (
      obj[d].value === "" ||
      obj[d].value == null ||
      obj[d].value == undefined
    ) {
      continue;
    }

    const singleParam = {
      searchTarget: d,
      searchContent: obj[d].value,
      fuzzySearch: obj[d].fuzzy,
      or: obj[d].or,
    };
    multiParams.push(singleParam);
  }
  return {
    multiParams: multiParams,
  };
}
/**
 * 生成时间查询对象
 */
function getTimeParam(target, timeSpanS, timeSpanE, bool) {
  if (timeSpanS)
    return {
      timeTarget: target,
      timeSpanS: timeSpanS,
      timeSpanE: timeSpanE,
      ignoreTimeField: bool,
    };
}
/**
 * 删除数据判断是否需要减少页面
 */
function deleteByPage(pageSize, pageNum, total, deleteSize) {
  if (pageNum == 1) {
    return 0;
  }
  //在最后一页删除所有数据时减1
  if (((pageNum - 1) * pageSize + deleteSize) == total) {
    return -1;
  } else {
    return 0;
  }
}

export const util = {
  getParameter,
  getPageParam,
  getSortParam,
  getMultiParam,
  getTimeParam,
  handleSort,
  deleteByPage,
};
