import { SpecialDateObj } from "../types";

export default function isWorkTimestamp(t: number, specialDates?: SpecialDateObj): boolean {
    if (typeof t === "boolean" || isNaN(+t)) return false;
    const date = new Date(t);
    const dayStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    if (specialDates && Object.prototype.hasOwnProperty.call(specialDates, dayStr)) {
        return !!specialDates[dayStr];
    }
    const day = date.getDay();
    return day !== 6 && day !== 0;
}
