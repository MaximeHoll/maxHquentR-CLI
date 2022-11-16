#!/usr/bin/env node

import { getCode, getName } from 'country-list';
import axios from "axios";
import ora from "ora";
import chalk from "chalk";


let countryName = process.argv[2];
let countryCode = getCode(countryName);
let countryYear;

if (process.argv[3]) {
    countryYear = process.argv[3];

} else {
    countryYear = new Date().getFullYear();
}



if (countryCode) {
    
    async function getHolidays(countryCode) {
        
        let holidays = await axios.get(`https://date.nager.at/api/v3/publicholidays/${countryYear}/${countryCode}`);
        
        for (let i= 0; i < holidays.data.length; i++ ) {
            let localname = holidays.data[i].localName;
            console.log(chalk.blue(`Local name: `) + chalk.red(localname));

            let name = holidays.data[i].name;
            console.log(chalk.blue(`English name: `) + chalk.red(name));
            
            let date = holidays.data[i].date;
            console.log(chalk.blue(`Date: `) + chalk.red(date));

            console.log("-----------------------------");
        }

    }
    
    getHolidays(countryCode);
}
else {
    console.log("Error! Country does not exist.");
}



///Loading time


// const spinner = ora("Loading...").start();

// setTimeout(() => {
//     spinner.color = "magenta";
//     spinner.text = "Loading...";
// })