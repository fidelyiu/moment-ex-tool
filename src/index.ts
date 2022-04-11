// 所有类型文件
// 获取方法的类型
import type * as metType from "./types";
export type { metType };

// to工具类
import toMoment from "./to/to-moment";
import toStr from "./to/to-str";
export { toMoment, toStr };

// is工具类
import isIntersectSame from "./is/is-intersect-same";
import isIntersect from "./is/is-intersect";
import isWeekend from "./is/is-weekend";
export { isIntersectSame, isIntersect, isWeekend };

// get工具类
import getAsc from "./get/get-asc";
import getDesc from "./get/get-desc";
import getSliceNumWithFormat from "./get/get-slice-num-with-format";
import getSliceNum from "./get/get-slice-num";
import getSliceTimeWithFormat from "./get/get-slice-time-with-format";
import getSliceTime from "./get/get-slice-time";
import getTime from "./get/get-time";
export { getAsc, getDesc, getSliceNumWithFormat, getSliceNum, getSliceTimeWithFormat, getSliceTime, getTime };
