import moment from "moment";

/**
 * 返回一个`moment`对象
 *
 * 如果本身就是`moment`，那么直接返回，不会克隆。
 * 如果不是`moment`，就使用`moment`构造
 */
export default function toMoment(inp?: moment.MomentInput, strict?: boolean | undefined): moment.Moment {
    if (moment.isMoment(inp)) {
        return inp;
    }
    return moment(inp, strict);
}
