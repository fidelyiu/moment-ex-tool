import getAsc from "./get-asc";

/**
 * 获取数组中，最小的moment
 */
export default function getMin(list: Array<moment.Moment>): undefined | moment.Moment {
    const sort = getAsc(list);
    if (Array.isArray(sort) && sort.length) {
        return sort[sort.length - 1];
    }
    return undefined;
}
