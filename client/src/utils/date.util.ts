import moment from "moment";

export const formattedDate = (date: string | Date, format: string): string => {
    if (!date) return 'Provide valid date!';

    return moment(date).format(format) as string;
}

export const compareDates = (startDate: string | Date, endDate: string | Date): boolean | string => {
    if (!startDate || !endDate) return 'Provide a valid date!'

    return moment(startDate).isBefore(moment(endDate));
}