import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderBy, Schedule, SortBy } from "../../../types/schedule.types.ts";
import { sortByDateProperty, sortByStringProperty } from "../../../utils/sort.util.ts";
import TrainService from "../../../services/train.service.ts";
import { setMessage } from "../message/messageSlice.ts";

interface ScheduleState {
    schedule: Schedule[],
    sortedSchedule: Schedule[],
    lastSortOptions: {
        sortBy: SortBy,
        orderBy: OrderBy
    }
}

const initialState: ScheduleState = {
    schedule: [],
    sortedSchedule: [],
    lastSortOptions: { sortBy: "trainNumber", orderBy: "asc" }
};

export const getAll = createAsyncThunk(
    'trains/all',
    async () => {
        return await TrainService.getAll();
    }
)

export const createTrainSchedule = createAsyncThunk(
    'trains/create',
    async (data: Schedule, thunkAPI) => {
        try {
            return await TrainService.create(data);
        } catch (error: any) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const updateTrainSchedule = createAsyncThunk(
    'trains/update',
    async ({ id, data }: {  id: string, data: Schedule} , thunkAPI) => {
        try {
            return await TrainService.updateById(id, data);
        } catch (error: any) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const changeTrainStatus = createAsyncThunk(
    'trains/status',
    async ({ id, status }: { id: string, status: boolean }, thunkAPI) => {
        try {
            return await TrainService.changeStatus(id, status);
        } catch (error: any) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const deleteTrainSchedule = createAsyncThunk(
    'trains/delete',
    async (id: string, thunkAPI) => {
        try {
            await TrainService.deleteById(id);
            return id;
        } catch (error: any) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const scheduleSlice = createSlice({
    initialState,
    name: 'scheduleSlice',
    reducers: {
        sortBy: (state, action: PayloadAction<{ sortBy: SortBy, orderBy: OrderBy }>) => {
            const { sortBy, orderBy } = action.payload;

            state.lastSortOptions = { sortBy, orderBy };
            state.sortedSchedule = sortByHelper(state.schedule, { sortBy, orderBy });
        },
        search: (state, action: PayloadAction<{ fromCity: string, toCity: string }>) => {
            const { fromCity, toCity } = action.payload;

            const searchedItems = state.schedule.filter((route) => {
                if (route.startStation.toLowerCase().includes(fromCity.toLowerCase())
                    && route.endStation.toLowerCase().includes(toCity.toLowerCase())) {
                    return route;
                }
            });

            state.sortedSchedule = sortByHelper(searchedItems, state.lastSortOptions);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAll.fulfilled, (state, action: PayloadAction<Schedule[]>): void => {
                state.schedule = action.payload;
                state.sortedSchedule = action.payload;
            })
            .addCase(getAll.rejected, (state) => {
                state.schedule = [];
            })
            .addCase(createTrainSchedule.fulfilled, (state, action: PayloadAction<Schedule>): void => {
                state.schedule.push(action.payload);
            })
            .addCase(updateTrainSchedule.fulfilled, (state, action: PayloadAction<Schedule>) => {
                const data = action.payload;

                const updatedItemIndex: number = state.schedule.findIndex(item => item.id === data.id);
                state.schedule[updatedItemIndex] = data;
            })
            .addCase(deleteTrainSchedule.fulfilled, (state, action: PayloadAction<string>) => {
                state.schedule = state.schedule.filter(el => el.id !== action.payload);
                state.sortedSchedule = sortByHelper(state.schedule, state.lastSortOptions);
            })
            .addCase(changeTrainStatus.fulfilled, (state, action: PayloadAction<Schedule>) => {
                const data = action.payload;

                const updatedItemIndex: number = state.schedule.findIndex(item => item.id === data.id);
                state.schedule[updatedItemIndex] = data;
                state.sortedSchedule = sortByHelper(state.schedule, state.lastSortOptions);
            })
    }
});

const { reducer, actions } = scheduleSlice;

export const { sortBy, search  } = actions;
export default reducer;


function sortByHelper(schedule: Schedule[], sortingOptions: { sortBy: SortBy, orderBy: OrderBy }): Schedule[] {
    const { sortBy, orderBy } = sortingOptions;
    const isAsc: boolean = orderBy === 'asc';

    switch (sortBy) {
        case "startDepart":
            return sortByDateProperty(schedule, isAsc, 'startDepartureTime');
        case "endArrive":
            return sortByDateProperty(schedule, isAsc, 'endArrivalTime');
        default:
            return sortByStringProperty(schedule, isAsc, sortBy);
    }
}