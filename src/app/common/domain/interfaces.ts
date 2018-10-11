type TemperatureChartDataResponse =
    Array<{
        date: string,
        dayIndex: number,
        values: Array<{ minInDay: number, value: number }>
    }>;


