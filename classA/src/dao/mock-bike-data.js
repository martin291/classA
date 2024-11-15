const fs = require('fs');

const bikeFile = `src/data/bikes.json`;

class BikeDao {
    constructor() {
        // read mock data from JSON file
        const fileContents = fs.readFileSync(bikeFile, 'utf-8');
        this.bikes = JSON.parse(fileContents);
    }

    queryForAllBikes() {
        return this.bikes;
    }
}

module.exports = BikeDao;