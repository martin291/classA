const fs = require('fs');

const teamFile = `data/team.json`;

class TeamDao {
    constructor() {
        // read mock data from JSON file
        const fileContents = fs.readFileSync(teamFile, 'utf-8');
        this.team = JSON.parse(fileContents);
    }

    queryForTeam() {
        return this.team;
    }
}

module.exports = TeamDao;