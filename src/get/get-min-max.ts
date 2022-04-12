import getAsc from "./get-asc";

/**
 * 获取数组中的最大值和最小值
 */
export default function getMinMax(list: Array<moment.Moment>): [undefined | moment.Moment, undefined | moment.Moment] {
    const sort = getAsc(list);
    if (Array.isArray(sort) && sort.length) {
        return [sort[0], sort[sort.length - 1]];
    }
    return [undefined, undefined];
}
