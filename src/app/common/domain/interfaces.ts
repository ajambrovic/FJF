type TemperatureChartDataResponse =
    Array<{
        date: string,
        dayIndex: number,
        values: Array<{ minInDay: number, value: number }>
    }>;


type DoorChartDataResponse =
    Array<{
        date: string,
        dayIndex: number,
        intervalDurationMin: number,
        intervals: Array<{
            index: number,
            value: boolean,
            weight: number
        }>
    }>;


