import getSliceTimeWithFormat from "../../src/get/get-slice-time-with-format";
import isWeekend from "../../src/is/is-weekend";
import toStr from "../../src/to/to-str";
import toMoment from "../../src/to/to-moment";

const sliceResultToStr = (arr: Array<[moment.Moment, moment.Moment]>) => arr.map((i) => i.map((j) => toStr(j)));

describe("getSliceTimeWithFormat 获取时间段中格式化切片", () => {
    it("测试1", () => {
        const staticTime = toMoment("2022-04-12 01:01:21:130");
        const result1 = getSliceTimeWithFormat(staticTime, staticTime.clone());
        // console.log("result1", result1);
        expect(sliceResultToStr(result1)).toEqual([["2022-04-12 00:00:00:000", "2022-04-13 00:00:00:000"]]);
    });

    it("测试2", () => {
        const staticTime = toMoment("2022-04-12 01:01:21:130");
        const endTime = staticTime.clone().add(1, "h");
        const result2 = getSliceTimeWithFormat(staticTime, endTime);
        // console.log("result2", result2);
        expect(sliceResultToStr(result2)).toEqual([["2022-04-12 00:00:00:000", "2022-04-13 00:00:00:000"]]);
    });

    it("测试3", () => {
        const staticTime = toMoment("2022-04-12 01:01:21:130").startOf("d");
        const result3 = getSliceTimeWithFormat(staticTime, staticTime);
        // console.log("result3", result3);
        expect(sliceResultToStr(result3)).toEqual([["2022-04-12 00:00:00:000", "2022-04-13 00:00:00:000"]]);
    });

    it("测试4", () => {
        const staticTime = toMoment("2022-04-12 01:01:21:130");
        const endTime = staticTime.clone().add(1, "minutes");
        const result4 = getSliceTimeWithFormat(staticTime, endTime);
        // console.log("result4", result4);
        expect(sliceResultToStr(result4)).toEqual([["2022-04-12 00:00:00:000", "2022-04-13 00:00:00:000"]]);
    });

    it("测试5", () => {
        const staticTime = toMoment("2022-04-12 01:01:21:130").startOf("d");
        const result5 = getSliceTimeWithFormat(staticTime, staticTime, { includEnd: false });
        // console.log("result5", result5);
        expect(sliceResultToStr(result5)).toEqual([]);
    });

    it("测试6", () => {
        const staticTime = toMoment("2022-04-13 14:44:30:403");
        const endTime = toMoment("2022-04-23 00:00:00:000");
        const result = getSliceTimeWithFormat(staticTime, endTime, {
            includEnd: false,
            addUnit: "day",
            startUnit: "day",
        });
        expect(result.length).toBe(9);
        expect(sliceResultToStr(result)).toEqual([
            ["2022-04-13 00:00:00:000", "2022-04-14 00:00:00:000"],
            ["2022-04-14 00:00:00:000", "2022-04-15 00:00:00:000"],
            ["2022-04-15 00:00:00:000", "2022-04-16 00:00:00:000"],
            ["2022-04-16 00:00:00:000", "2022-04-17 00:00:00:000"],
            ["2022-04-17 00:00:00:000", "2022-04-18 00:00:00:000"],
            ["2022-04-18 00:00:00:000", "2022-04-19 00:00:00:000"],
            ["2022-04-19 00:00:00:000", "2022-04-20 00:00:00:000"],
            ["2022-04-20 00:00:00:000", "2022-04-21 00:00:00:000"],
            ["2022-04-21 00:00:00:000", "2022-04-22 00:00:00:000"],
        ]);
    });

    it("测试7", () => {
        const staticTime = toMoment("2022-04-13 00:00:00:000");
        const endTime = toMoment("2022-04-13 14:54:25:359");
        const result = getSliceTimeWithFormat(staticTime, endTime, {
            includEnd: false,
            addUnit: "day",
            startUnit: "day",
        });
        expect(result.length).toBe(0);
    });

    it("测试8", () => {
        const staticTime = toMoment("2022-04-13 15:36:55:465");
        const endTime = toMoment("2022-04-12 00:00:00:000");
        const result = getSliceTimeWithFormat(staticTime, endTime, {
            includEnd: false,
        });
        expect(result.length).toBe(1);
    });

    it("测试9", () => {
        const staticTime = toMoment("2022-04-10 15:36:55:465");
        const endTime = toMoment("2022-04-12 00:00:00:000");
        const result = getSliceTimeWithFormat(staticTime, endTime, {
            includEnd: true,
        });
        expect(sliceResultToStr(result)).toEqual([
            ["2022-04-10 00:00:00:000", "2022-04-11 00:00:00:000"],
            ["2022-04-11 00:00:00:000", "2022-04-12 00:00:00:000"],
        ]);
    });

    it("测试10", () => {
        const staticTime = toMoment("2022-04-10 15:36:55:465");
        const endTime = toMoment("2022-04-12 00:00:00:000");
        const result = getSliceTimeWithFormat(staticTime, endTime, {
            includEnd: true,
            isSameEnd: true,
        });
        expect(sliceResultToStr(result)).toEqual([
            ["2022-04-10 00:00:00:000", "2022-04-11 00:00:00:000"],
            ["2022-04-11 00:00:00:000", "2022-04-12 00:00:00:000"],
            ["2022-04-12 00:00:00:000", "2022-04-13 00:00:00:000"],
        ]);
    });

    it("测试11", () => {
        const staticTime = toMoment("2022-03-23 00:00:00:000");
        const endTime = toMoment("2022-04-13 17:31:21:715");
        const result = getSliceTimeWithFormat(staticTime, endTime, {
            includEnd: false,
            silceNum: 7,
        });
        expect(sliceResultToStr(result)).toEqual([
            ["2022-03-23 00:00:00:000", "2022-03-30 00:00:00:000"],
            ["2022-03-30 00:00:00:000", "2022-04-06 00:00:00:000"],
            ["2022-04-06 00:00:00:000", "2022-04-13 00:00:00:000"],
        ]);
    });

    it("测试12", () => {
        const staticTime = toMoment("2022-04-12 00:00:00:000");
        const endTime = toMoment("2022-04-13 00:00:00:000");
        const result = getSliceTimeWithFormat(staticTime, endTime);
        expect(sliceResultToStr(result)).toEqual([["2022-04-12 00:00:00:000", "2022-04-13 00:00:00:000"]]);
    });

    it("测试13", () => {
        const staticTime = toMoment("2022-04-12 00:00:00:000");
        const endTime = toMoment("2022-04-12 00:00:00:000");
        const result = getSliceTimeWithFormat(staticTime, endTime, {
            silceNum: 7,
        });
        expect(sliceResultToStr(result)).toEqual([["2022-04-12 00:00:00:000", "2022-04-19 00:00:00:000"]]);
    });

    it("测试14", () => {
        const staticTime = toMoment("2022-04-12 00:00:00:000");
        const endTime = toMoment("2022-04-19 00:00:00:000");
        const result = getSliceTimeWithFormat(staticTime, endTime, {
            exclude: (startDate, endDate) => {
                // 不存在排除
                if (!startDate || !endDate) return true;
                return isWeekend(startDate);
            },
        });
        expect(sliceResultToStr(result)).toEqual([
            ["2022-04-12 00:00:00:000", "2022-04-13 00:00:00:000"],
            ["2022-04-13 00:00:00:000", "2022-04-14 00:00:00:000"],
            ["2022-04-14 00:00:00:000", "2022-04-15 00:00:00:000"],
            ["2022-04-15 00:00:00:000", "2022-04-16 00:00:00:000"],
            // ["2022-04-16 00:00:00:000", "2022-04-17 00:00:00:000"],
            // ["2022-04-17 00:00:00:000", "2022-04-18 00:00:00:000"],
            ["2022-04-18 00:00:00:000", "2022-04-19 00:00:00:000"],
        ]);
    });

    it("测试15", () => {
        const staticTime = toMoment("2022-04-12 02:00:00:000");
        const endTime = toMoment("2022-04-15 02:00:00:000");
        const result = getSliceTimeWithFormat(staticTime, endTime);
        expect(sliceResultToStr(result)).toEqual([
            ["2022-04-12 00:00:00:000", "2022-04-13 00:00:00:000"],
            ["2022-04-13 00:00:00:000", "2022-04-14 00:00:00:000"],
            ["2022-04-14 00:00:00:000", "2022-04-15 00:00:00:000"],
            ["2022-04-15 00:00:00:000", "2022-04-16 00:00:00:000"],
        ]);
    });

    it("测试16", () => {
        const staticTime = toMoment("2022-04-12 02:00:00:000");
        const endTime = toMoment("2022-04-15 00:00:00:000");
        const result = getSliceTimeWithFormat(staticTime, endTime);
        expect(sliceResultToStr(result)).toEqual([
            ["2022-04-12 00:00:00:000", "2022-04-13 00:00:00:000"],
            ["2022-04-13 00:00:00:000", "2022-04-14 00:00:00:000"],
            ["2022-04-14 00:00:00:000", "2022-04-15 00:00:00:000"],
        ]);
    });

    it("测试17", () => {
        const staticTime = toMoment("2022-04-12 02:00:00:000");
        const endTime = toMoment("2022-04-15 00:00:00:000");
        const result = getSliceTimeWithFormat(staticTime, endTime, { includEnd: true, isSameEnd: true });
        expect(sliceResultToStr(result)).toEqual([
            ["2022-04-12 00:00:00:000", "2022-04-13 00:00:00:000"],
            ["2022-04-13 00:00:00:000", "2022-04-14 00:00:00:000"],
            ["2022-04-14 00:00:00:000", "2022-04-15 00:00:00:000"],
            ["2022-04-15 00:00:00:000", "2022-04-16 00:00:00:000"],
        ]);
    });

    it("测试18", () => {
        const staticTime = toMoment("2022-04-12 02:00:00:000");
        const endTime = toMoment("2022-04-15 02:00:00:000");
        const result = getSliceTimeWithFormat(staticTime, endTime, { includEnd: true, isSameEnd: true });
        expect(sliceResultToStr(result)).toEqual([
            ["2022-04-12 00:00:00:000", "2022-04-13 00:00:00:000"],
            ["2022-04-13 00:00:00:000", "2022-04-14 00:00:00:000"],
            ["2022-04-14 00:00:00:000", "2022-04-15 00:00:00:000"],
            ["2022-04-15 00:00:00:000", "2022-04-16 00:00:00:000"],
        ]);
    });
});
