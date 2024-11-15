const express = require('express');
const axios = require('axios');

const BikeDao = require('../dao/mock-bike-data');
const FoodDao = require('../dao/mock-food-data');
const ToyDao = require('../dao/mock-toy-data');
const TeamDao = require('../dao/mock-team-data');

class ClassARestController {
    constructor() {
        this.port = process.env.PORT || 3021;
        this.services = {
            bikes: 'http://localhost:3031/bikes',
            food: 'http://localhost:3032/food',
            toys: 'http://localhost:3033/toys'
        };

        this.bikeDao = new BikeDao();
        this.foodDao = new FoodDao();
        this.teamDao = new TeamDao();
        this.toyDao = new ToyDao();
 
        this.app = express();
        this.app.use(express.json());
 
        const router = express.Router();
        router.get('/classA/:service/all/:location', this.getAllItems.bind(this));
        router.get('/classA/:service/team', this.getTeamInfo.bind(this));
 
        this.app.use('/', router);
    }
 
    start() {
        this.app.listen(this.port, () => console.log(`Mid-Tier Service A running on port ${this.port}`));
    }
 
    async getAllItems(req, res) {

        const { service, location } = req.params; // Extracting both service and location from req.params
        let items;

        try {
            const backEndResp = await axios.get(`${this.services[service]}/all/${location}`);
            const response = backEndResp.data;
            res.json(response);

            // if (service == "bikes") {
            //     items = this.bikeDao.queryForAllBikes();
            // }
            // else if (service == "food") {
            //     items = this.foodDao.queryForAllFood();
            // }
            // else if (service == "toys") {
            //     items = this.toyDao.queryForAllToys();
            // }

            // res.json(items);

        } catch (err) {
            console.error(`Error on GET all locations for ${service}: ${err}`);
            res.status(500).json({ error: err.message });
        }
    }
 
    async getTeamInfo(req, res) {
        const { service } = req.params;
        try {
            const response = await axios.get(`${this.services[service]}/team`);
            res.json(response.data);

            // const items = this.teamDao.queryForTeam();
            // res.json(items);
            
        } catch (err) {
            console.error(`Error on GET team info for ${service}: ${err}`);
            res.status(500).json({ error: err.message });
        }
    }
}
 
module.exports = ClassARestController;
 
if (require.main === module) {
    const api = new ClassARestController();
    api.start();
}