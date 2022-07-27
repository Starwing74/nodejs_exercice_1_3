const {parse} = require('csv-parse');
const fs = require('fs');
const results1 = [];
const results2 = [];
const results3 = [];

fs.createReadStream('kepler.csv')
    .pipe(parse({
        columns: true,
        comment: '#'
    }))
    .on('data', (res) => {
        if (res['kepoi_name'].match("K0075")) {
            results3.push(res);
        }
    })
    .on('error', (err) => {
        console.log('error reading data');
    })
    .on('end', () => {
        const kepidValue = results3.map((person) => {
            return person['kepoi_name'];
        });
        console.log(kepidValue);
        console.log('DONE');
    });;

fs.createReadStream('people.csv')
    .pipe(parse({
        columns: true,
        comment: '#'
    }))
    .on('data', (res) => {
        if (res['Name'][0] == "A") {
            results2.push(res);
        }
    })
    .on('error', (err) => {
        console.log('error reading data');
    })
    .on('end', () => {
        const peopleName = results2.map((person) => {
            return person['Name'];
        });
        console.log(peopleName);
        console.log(`There are ${peopleName.length} below 30`);
        console.log('DONE');
    });;

fs.createReadStream('people.csv')
    .pipe(parse({
        columns: true,
        comment: '#'
    }))
    .on('data', (res) => {
        if (res['Age'] < 30) {
            results1.push(res);
        }
    })
    .on('error', (err) => {
        console.log('error reading data');
    })
    .on('end', () => {
        const peopleName = results1.map((person) => {
            return person['Name'];
        });
        console.log(peopleName);
        console.log(`There are ${peopleName.length} below 30`);
        console.log('DONE');
    });;