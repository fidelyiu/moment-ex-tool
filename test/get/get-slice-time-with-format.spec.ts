import moment from "moment";
import getSliceTimeWithFormat from "../../src/get/get-slice-time-with-format";
import toStr from "../../src/to/to-str";

test("getSliceTimeWithFormat 获取时间段中格式化切片", () => {
    const staticTime = "2022-04-12 01:01:21:130";
    const format = "YYYY-MM-DD HH:mm:ss:SSS";
    const result1 = getSliceTimeWithFormat(moment(staticTime, format), moment(staticTime, format)).map((i) => i.map((j) => toStr(j)));
    // console.log("result1", result1);
    expect(result1).toEqual([["2022-04-12 00:00:00:000", "2022-04-13 00:00:00:000"]]);

    const d1 = moment(staticTime, format);
    const result2 = getSliceTimeWithFormat(d1, d1.clone().add(1, "h")).map((i) => i.map((j) => toStr(j)));
    // console.log("result2", result2);
    expect(result2).toEqual([["2022-04-12 00:00:00:000", "2022-04-13 00:00:00:000"]]);

    const d2 = moment(staticTime, format).startOf("d");
    const result3 = getSliceTimeWithFormat(d2, d2).map((i) => i.map((j) => toStr(j)));
    // console.log("result3", result3);
    expect(result3).toEqual([["2022-04-12 00:00:00:000", "2022-04-13 00:00:00:000"]]);

    const d3 = moment(staticTime, format);
    const result4 = getSliceTimeWithFormat(d3, d3.clone().add(1, "minutes")).map((i) => i.map((j) => toStr(j)));
    // console.log("result4", result4);
    expect(result4).toEqual([["2022-04-12 00:00:00:000", "2022-04-13 00:00:00:000"]]);

    const d4 = moment(staticTime, format).startOf("d");
    const result5 = getSliceTimeWithFormat(d4, d4, { includEnd: false }).map((i) => i.map((j) => toStr(j)));
    // console.log("result5", result5);
    expect(result5).toEqual([]);
});
