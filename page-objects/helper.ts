import { Page } from "@playwright/test";
import * as csv from '@fast-csv/parse';
import { writeToPath } from "fast-csv";


export class Helper {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
        
    }


    async getLinkOnCSV(rowNum: number, header: string) {
        // sample:  await this.page.goto(await this.h.getLinkOnCSV([row],[headerValue]));
        let myObject: any = new Promise((resolve) => {
          let dataArray: JSON[] = [];
          csv.parseFile("./test-data/linkFile.csv", { headers: true })
          .on("data", (data) => {
              dataArray.push(data);
          })
          .on("end", () => {
              resolve(dataArray);
          });
      });
        let output = await myObject;
        let dataVal = output[rowNum][header];
        return dataVal;
      }
}