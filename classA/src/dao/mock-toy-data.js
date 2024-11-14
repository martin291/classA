const fs = require('fs');

const toyFile = `data/toys.json`;

class ToyDao {
    constructor() {
        // read mock data from JSON file
        const fileContents = fs.readFileSync(toyFile, 'utf-8');
        this.toys = JSON.parse(fileContents);
    }

    queryForAllToys() {
        return this.toys;
    }
}

module.exports = ToyDao;