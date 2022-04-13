export type SliceNumOpt = {
    /**
     * 是否包含结尾时间
     *
     * ex: 2022-10-10~2022-10-13
     * 一般不包含结尾，则只有3天，包含则有4天
     */
    includEnd: boolean;
    /**
     * 切片长度是多少
     */
    silceNum: moment.DurationInputArg1;
    /**
     * 以什么单位算添加时间
     */
    addUnit: moment.DurationInputArg2;
    /**
     * 排除的时间段
     * 返回true，则不要指定时间段
     */
    exclude: (startTime?: moment.Moment, endTime?: moment.Moment) => boolean;
    /**
     * 以什么单位算开始时间
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
