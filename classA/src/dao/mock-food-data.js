const fs = require('fs');

const foodFile = `src/data/food.json`;

class FoodDao {
    constructor() {
        // read mock data from JSON file
        const fileContents = fs.readFileSync(foodFile, 'utf-8');
        this.foods = JSON.parse(fileContents);
    }

    queryForAllFood() {
        return this.foods;
    }
}

module.exports = FoodDao;