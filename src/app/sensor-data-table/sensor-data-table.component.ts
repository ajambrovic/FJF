import { Component, Input } from '@angular/core';
import { TableModel } from './domain/table-model';

@Component({
  selector: 'app-sensor-data-table',
  templateUrl: './sensor-data-table.component.html',
  styleUrls: ['./sensor-data-table.component.scss']
})
export class SensorDataTableComponent {

  public isDataAvailable: boolean;
  @Input()
  public tableModel: TableModel;

  constructor(
  ) { }

  public exportToCSV() {

    let fileContent = '';
    fileContent = this.concatenateData(fileContent);
    const mimeType = 'text/csv';
    const filename = 'download.csv';

    const encodedContent = btoa(fileContent);

    const pom = document.createElement('a');
    document.body.appendChild(pom);
    pom.href = 'data:' + mimeType + ';base64,' + encodedContent;
    pom.download = filename;

    if (document.createEvent) {
      const event = document.createEvent('MouseEvents');
      event.initEvent('click', true, true);
      pom.dispatchEvent(event);
    } else {
      pom.click();
    }
    pom.remove();
  } catch(e) {
    console.error('Preuzimanje nije uspjelo.');
  }

  concatenateData(fileContent) {

    this.tableModel.columns.forEach(column => {
      fileContent += column;
      fileContent += ';';
    });
    fileContent += '\n';
    this.tableModel.data.forEach(day => {
      fileContent += day.date;
      fileContent += ';';
      day.data.forEach(value => {
        fileContent += value;
        fileContent += ';';
      });
      fileContent += '\n';
    });
    return fileContent;

  }
}
