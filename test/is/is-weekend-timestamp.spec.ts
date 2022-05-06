import toMoment from "../../src/to/to-moment";
import { getTime, isWeekendTimestamp } from "../../src";

const getTimeStamp = (str: string) => getTime(toMoment(str));

describe.each([
    // 一天的开始
    { t: "2022-05-02 00:00:00:000", result: false },
    { t: "2022-05-03 00:00:00:000", result: false },
    { t: "2022-05-04 00:00:00:000", result: false },
    { t: "2022-05-05 00:00:00:000", result: false },
    { t: "2022-05-06 00:00:00:000", result: false },
    { t: "2022-05-07 00:00:00:000", result: true },
    { t: "2022-05-08 00:00:00:000", result: true },
    { t: "2022-05-09 00:00:00:000", result: false },
    { t: "2022-05-10 00:00:00:000", result: false },
    // 一天中的其他时间
    { t: "2022-05-02 12:00:00:000", result: false },
    { t: "2022-05-03 00:12:00:000", result: false },
    { t: "2022-05-04 12:00:00:000", result: false },
    { t: "2022-05-05 00:12:00:000", result: false },
    { t: "2022-05-06 12:00:00:000", result: false },
    { t: "2022-05-07 00:12:00:000", result: true },
    { t: "2022-05-08 12:00:00:000", result: true },
    { t: "2022-05-09 00:12:00:000", result: false },
    { t: "2022-05-10 12:00:00:000", result: false },
])("isWeekendTimestamp: 时间戳是否是周末测试", ({ t, result }) => {
    it(`[${t}]: 时间戳是否是周末测试`, () => {
        const w = isWeekendTimestamp(getTimeStamp(t));
        expect(w).toBe(result);
    });
});

describe.each([
    { t: "2022-05-07 00:12:00:000", result: false },
    { t: "2022-05-08 12:00:00:000", result: false },
    { t: NaN, result: false },
    { t: false, result: false },
    { t: true, result: false },
])("isWeekendTimestamp: 时间戳是否是周末无效值测试", ({ t, result }) => {
    it(`[${t}]: 时间戳是否是周末无效值测试`, () => {
        const w = isWeekendTimestamp(t as unknown as number);
        expect(w).toBe(result);
    });
});
