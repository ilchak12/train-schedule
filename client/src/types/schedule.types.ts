export interface Schedule {
    id?: string,
    trainNumber: string,
    trainRoute?: string,
    frequency: string[],
    startStation: string,
    startArrivalTime?: string | Date | undefined,
    startDepartureTime: string | Date,
    endStation: string,
    endArrivalTime: string | Date,
    endDepartureTime?: string | Date | undefined,
    isActive?: boolean
}

export type SortBy = 'trainNumber' | 'trainRoute' | 'startStation' | 'startDepart' | 'endStation' | 'endArrive';
export type OrderBy = 'asc' | 'desc';

export type ScheduleRequest = Omit<Schedule, 'id'>;

export interface FrequencyDaysOptions {
    readonly label: string,
    readonly value: string
}