import getAsc from "./get-asc";

/**
 * 获取数组中，最大的moment
 */
export default function getMax(list: Array<moment.Moment>): undefined | moment.Moment {
    const sort = getAsc(list);
    if (Array.isArray(sort) && sort.length) {
        return sort[0];
    }
    return undefined;
}
