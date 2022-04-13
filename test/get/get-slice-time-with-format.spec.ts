import getSliceTimeWithFormat from "../../src/get/get-slice-time-with-format";
import toStr from "../../src/to/to-str";
import toMoment from "../../src/to/to-moment";

describe("getSliceTimeWithFormat 获取时间段中格式化切片", () => {
    it("测试1", () => {
        const staticTime = "2022-04-12 01:01:21:130";
        const result1 = getSliceTimeWithFormat(toMoment(staticTime), toMoment(staticTime)).map((i) => i.map((j) => toStr(j)));
        // console.log("result1", result1);
        expect(result1).toEqual([["2022-04-12 00:00:00:000", "2022-04-13 00:00:00:000"]]);
    });

    it("测试2", () => {
        const staticTime = "2022-04-12 01:01:21:130";
        const d1 = toMoment(staticTime);
        const result2 = getSliceTimeWithFormat(d1, d1.clone().add(1, "h")).map((i) => i.map((j) => toStr(j)));
        // console.log("result2", result2);
        expect(result2).toEqual([["2022-04-12 00:00:00:000", "2022-04-13 00:00:00:000"]]);
    });
    it("测试3", () => {
        const staticTime = "2022-04-12 01:01:21:130";
        const d2 = toMoment(staticTime).startOf("d");
        const result3 = getSliceTimeWithFormat(d2, d2).map((i) => i.map((j) => toStr(j)));
        // console.log("result3", result3);
        expect(result3).toEqual([["2022-04-12 00:00:00:000", "2022-04-13 00:00:00:000"]]);
    });
    it("测试4", () => {
        const staticTime = "2022-04-12 01:01:21:130";
        const d3 = toMoment(staticTime);
        const result4 = getSliceTimeWithFormat(d3, d3.clone().add(1, "minutes")).map((i) => i.map((j) => toStr(j)));
        // console.log("result4", result4);
        expect(result4).toEqual([["2022-04-12 00:00:00:000", "2022-04-13 00:00:00:000"]]);
    });
    it("测试5", () => {
        const staticTime = "2022-04-12 01:01:21:130";
        const d4 = toMoment(staticTime).startOf("d");
        const result5 = getSliceTimeWithFormat(d4, d4, { includEnd: false }).map((i) => i.map((j) => toStr(j)));
        // console.log("result5", result5);
        expect(result5).toEqual([]);
    });
    it("测试6", () => {
        const staticTime = toMoment("2022-04-13 14:44:30:403");
        const endTime = toMoment("2022-04-23 00:00:00:000");
        const result = getSliceTimeWithFormat(staticTime, endTime, {
            includEnd: false,
            addUnit: "day",
            startUnit: "day",
        }).map((i) => i.map((j) => toStr(j)));
        expect(result.length).toBe(10);
    });
    it("测试7", () => {
        const staticTime = toMoment("2022-04-13 00:00:00:000");
        const endTime = toMoment("2022-04-13 14:54:25:359");
        const result = getSliceTimeWithFormat(staticTime, endTime, {
            includEnd: false,
            addUnit: "day",
            startUnit: "day",
        }).map((i) => i.map((j) => toStr(j)));
        expect(result.length).toBe(0);
    });
});
