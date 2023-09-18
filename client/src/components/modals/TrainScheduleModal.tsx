import { ModalWrapper } from "./ModalWrapper.tsx";
import { useState } from "react";
// @ts-ignore
import DatePicker from "react-datepicker";
import moment from "moment";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { compareDates } from "../../utils/date.util.ts";
import { toast } from "react-toastify";
import { FrequencyDaysOptions, OrderBy, Schedule, ScheduleRequest, SortBy } from "../../types/schedule.types.ts";
import Select from "react-select/base";
import { createTrainSchedule, sortBy, updateTrainSchedule } from "../../store/features/train/scheduleSlice.ts";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { MultiValue } from "react-select";

const options: readonly FrequencyDaysOptions[] = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' }
]

interface TrainFormValue {
    trainNumber: string,
    startStation: string,
    endStation: string,
}

interface TrainScheduleModal extends ModalWrapper {
    data?: Schedule
}

export const TrainScheduleModal = (
    { onClose, title, data }: TrainScheduleModal
) => {
    const dispatch = useDispatch();
    const [queryParams] = useSearchParams();

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const [selectedDays, setSelectedDays] = useState<MultiValue<FrequencyDaysOptions>>(
        !!data?.frequency?.length
            ? options.filter(option => data?.frequency?.some(item => item === option.label))
            : []
    );
    const [selectedInput, setSelectedInput] = useState<string>('');
    const [startDate, setStartDate] = useState<string | Date>(data?.startDepartureTime ? moment(data?.startDepartureTime).toDate() : '');
    const [endDate, setEndDate] = useState<string | Date>(data?.endArrivalTime ? moment(data?.endArrivalTime).toDate() : '');

    const onMenuOpen = (): void => setIsMenuOpen(true);
    const onMenuClose = (): void => setIsMenuOpen(false);

    const onChange = (frequency: MultiValue<FrequencyDaysOptions>): void => {
        setSelectedDays(frequency)
    }

    const initialValues: TrainFormValue = {
        trainNumber: data?.trainNumber ?? '',
        startStation: data?.startStation ?? '',
        endStation: data?.endStation ?? "",
    };

    const validationSchema = Yup.object().shape({
        trainNumber: Yup.string().required("This field is required!"),
        startStation: Yup.string().required("This field is required!"),
        endStation: Yup.string().required("This field is required!"),
    });

    const handleCreate = (formValue: TrainFormValue): void => {
        if (!selectedDays.length) {
            toast.error('Provide frequency days!');
            return
        }

        if (!startDate) {
            toast.error('Provide depart time!');
            return
        }

        if (!endDate) {
            toast.error('Provide arrive time!');
            return
        }

        if (!compareDates(startDate, endDate)) {
            toast.error('Arrive time can`t be before depart time!');
            return
        }

        const frequency: string[] = selectedDays.map(day => day.label);

        const scheduleData: ScheduleRequest = {
            ...formValue,
            endArrivalTime: endDate,
            startDepartureTime: startDate,
            frequency,
            trainRoute: `${formValue.startStation} - ${formValue.endStation}`,
            startArrivalTime: moment(startDate).subtract(moment.duration("00:15:00")).toDate(),
            endDepartureTime: moment(endDate).add(moment.duration("00:5:00")).toDate(),
            isActive: data?.isActive ?? true
        };

        const isCreateFunc = !data
            ? createTrainSchedule({ ...scheduleData })
            : updateTrainSchedule({ id: data.id!, data: scheduleData })

        // @ts-ignore
        dispatch(isCreateFunc)
            .unwrap()
            .then(() => {
                toast.success('Successfully!');
                dispatch(sortBy({
                    sortBy: queryParams.get('sortBy') as SortBy,
                    orderBy: queryParams.get('orderBy') as OrderBy
                }))
                onClose();
            }).
            catch(() => {
                toast.error('Train № can`t be duplicated!')
            })
    }

    return (
        <ModalWrapper title={title || 'Create route'} onClose={onClose}>
            <div className="grid">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleCreate}
                >
                    <Form>
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            {!data && (
                                <div className='col-[1_/_-1]'>
                                    <label htmlFor="train_number" className="block mb-2 text-sm font-medium text-gray-900">Train №</label>
                                    <Field type="text" name="trainNumber" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"/>
                                    <ErrorMessage
                                        name="trainNumber"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>
                            )}

                            <div>
                                <label htmlFor="start_station" className="block mb-2 text-sm font-medium text-gray-900">Start station</label>
                                <Field type="text" name="startStation" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"/>
                                <ErrorMessage
                                    name="startStation"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </div>

                            <div>
                                <label htmlFor="end-station" className="block mb-2 text-sm font-medium text-gray-900">End station</label>
                                <Field type="text" name="endStation" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"/>
                                <ErrorMessage
                                    name="endStation"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </div>

                            <div>
                                <label htmlFor="depart-at" className="block mb-2 text-sm font-medium text-gray-900">Depart at</label>
                                <DatePicker
                                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
                                    selected={startDate}
                                    onChange={(date: any) => setStartDate(date)}
                                    showTimeSelect
                                    timeIntervals={5}
                                    minDate={moment().toDate()}
                                    dateFormat="MMM do, yy h:mm aa"
                                    name="depart_at"
                                />
                            </div>

                            <div>
                                <label htmlFor="arrive-at" className="block mb-2 text-sm font-medium text-gray-900">Arrive at</label>
                                <DatePicker
                                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
                                    selected={endDate}
                                    onChange={(date: any) => setEndDate(date)}
                                    showTimeSelect
                                    timeIntervals={5}
                                    minDate={moment().toDate()}
                                    dateFormat="MMM do, yy h:mm aa"
                                    name="arrive_at"
                                />
                            </div>

                            <div className='col-[1_/_-1]'>
                                <label htmlFor="train_number" className="block mb-2 text-sm font-medium text-gray-900">Frequency</label>
                                <Select
                                    options={options}
                                    isMulti={true}
                                    onChange={onChange}
                                    menuIsOpen={isMenuOpen}
                                    onMenuClose={onMenuClose}
                                    onMenuOpen={onMenuOpen}
                                    value={selectedDays}
                                    inputValue={selectedInput}
                                    onInputChange={e => setSelectedInput(e)}
                                />
                            </div>
                        </div>

                        <div className="pt-3 flex items-center space-x-2 border-t border-gray-200 rounded-b">
                            <button data-modal-hide="staticModal" type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save</button>
                            <button
                                onClick={onClose}
                                data-modal-hide="staticModal"
                                type="button"
                                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">Cancel</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </ModalWrapper>
    )
}