export type SliceStampOpt = {
    includEnd: boolean;
    isSameEnd: boolean;
    startUnit: moment.unitOfTime.StartOf;
    addNum: number;
    exclude: (startTime?: number, endTime?: number) => boolean;
};

export type SliceOpt = {
    /**
     * 是否包含结尾时间
     *
     * ex: 2022-10-10~2022-10-13
     * 一般不包含结尾，则只有3天，包含则有4天
     *
     * 默认: true
     */
    includEnd: boolean;
    /**
     * 当包含结尾时，迭加等于结尾时，后续是否继续叠加。
     *
     * 默认: false
     *
     * ex: 2022-10-10 00:00:000~2022-10-12 00:00:000
     * true:
     * [
     *  ['2022-10-10 00:00:000', '2022-10-11 00:00:000'],
     *  ['2022-10-11 00:00:000', '2022-10-12 00:00:000'],
     *  ['2022-10-12 00:00:000', '2022-10-13 00:00:000'],
     *  ['2022-10-13 00:00:000', '2022-10-14 00:00:000'],
     * ]
     *
     * false:
     * [
     *  ['2022-10-10 00:00:000', '2022-10-11 00:00:000'],
     *  ['2022-10-11 00:00:000', '2022-10-12 00:00:000'],
     *  ['2022-10-12 00:00:000', '2022-10-13 00:00:000'],
     * ]
     */
    isSameEnd: boolean;
    /**
     * 切片长度是多少
     *
     * 默认: 1
     */
    silceNum: moment.DurationInputArg1;
    /**
     * 以什么单位算添加时间
     *
     * 默认: 'd'
     */
    addUnit: moment.DurationInputArg2;
    /**
     * 排除的时间段
     * 返回true，则不要指定时间段
     *
     * 默认: () => false
     */
    exclude: (startTime?: moment.Moment, endTime?: moment.Moment) => boolean;
    /**
     * 以什么单位算开始时间
     *
     * 默认: undefined
     */
    startUnit: moment.unitOfTime.StartOf;
};

/**
 * 包含符号
 * - '[]'：包含最小值最大值。
 * - '[)'：包含最小值，不包含最大值。
 * - '(]'：不包含最小值，包含最大值。
 * - '()'：不包含最小值最大值。
 */
export type InType = "[]" | "[)" | "(]" | "()";

/**
 * 特殊日期对象，
 * `{ '2020-5-6': false }`
 */
export type SpecialDateObj = {
    [key in string]: boolean;
};
