import moment from "moment";
import isIntersect from "../../src/is/is-intersect";

test("isIntersect 时间是否相交", () => {
    const x1 = "2022-03-12 00:00:00:000";
    const x2 = "2022-05-13 00:00:00:000";
    const x3 = "2022-04-15 08:00:00:00";
    const x4 = "2022-04-18 08:00:00:000";

    const format = "YYYY-MM-DD HH:mm:ss:SSS";
    const result1 = isIntersect(moment(x1, format), moment(x2, format), moment(x3, format), moment(x4, format));
    // console.log("result1", result1);
    expect(result1).toBe(true);
});
