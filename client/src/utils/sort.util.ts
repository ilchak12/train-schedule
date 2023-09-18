import moment from "moment/moment";

export const sortByStringProperty = (arr: any, isAsc: boolean, property: string) => {
    return [...arr].sort((a, b) => {
        return isAsc
                ? (a[property] > b[property]) ? 1 : ((b[property] > a[property]) ? -1 : 0)
                : (b[property] > a[property]) ? 1 : ((a[property] > b[property]) ? -1 : 0)
    })
}

export const sortByDateProperty = (arr: any, isAsc: boolean, property: string) => {
    return [...arr].sort((a, b) => {
        return isAsc
            ? moment(new Date(a[property]).toISOString()).diff(new Date(b[property]).toISOString())
            : moment(new Date(b[property]).toISOString()).diff(new Date(a[property]).toISOString());
    })
}