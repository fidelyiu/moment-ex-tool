import moment from "moment";
import { getSliceTimeStamp, getTime, toMoment, toStr } from "../../src";

const sliceResultToStr = (arr: Array<[number, number]>) => arr.map((i) => i.map((j) => toStr(moment(j))));
describe("getSliceTimeStamp 获取时间段中格式化切片", () => {
    it("测试1", () => {
        const staticTime = getTime(toMoment("2022-04-12 01:01:21:130"));
        const endTime = getTime(toMoment("2022-04-13 01:01:21:131"));
        const result1 = getSliceTimeStamp(staticTime, endTime, {
            startUnit: "d",
        });
        expect(sliceResultToStr(result1)).toEqual([
            ["2022-04-12 00:00:00:000", "2022-04-13 00:00:00:000"],
            ["2022-04-13 00:00:00:000", "2022-04-14 00:00:00:000"],
        ]);
    });
    it("测试2", () => {
        const staticTime = getTime(toMoment("2022-04-12 01:01:21:130"));
        const endTime = getTime(toMoment("2022-04-13 01:01:21:131"));
        const result1 = getSliceTimeStamp(staticTime, endTime, {
            startUnit: "d",
        });
        expect(result1).toEqual([
            [1649692800000, 1649779200000],
            [1649779200000, 1649865600000],
        ]);
    });
    it("测试3", () => {
        const staticTime = getTime(toMoment("2022-04-12 00:00:00:000"));
        const endTime = getTime(toMoment("2022-04-13 00:00:00:000"));
        const result1 = getSliceTimeStamp(staticTime, endTime, {
            startUnit: "d",
        });
        expect(sliceResultToStr(result1)).toEqual([["2022-04-12 00:00:00:000", "2022-04-13 00:00:00:000"]]);
    });
});
