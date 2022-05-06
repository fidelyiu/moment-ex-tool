export default function isWeekendTimestamp(t: number): boolean {
    if (typeof t === "boolean" || isNaN(+t)) return false;
    const day = new Date(t).getDay();
    return day === 6 || day === 0;
}
