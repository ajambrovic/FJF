export abstract class ALineChartConfig {
    lineChartType: string;
    defaultNumberOfDays: number;
    lineChartOptions: any;
    lineChartColors: Array<string>;
    lineChartLabels: Array<string>;
    selectDropdownValues: Array<{ value: number, name: string }>;
}
