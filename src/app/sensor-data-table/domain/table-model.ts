export class TableModel {
    constructor(public columns: Array<string>, public data: Array<{date: string, data: Array<{}>}>) {}
}
