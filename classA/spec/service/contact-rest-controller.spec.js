const ClassARestController = require('../../src/service/class-a-controller');
const axios = require('axios');

console.error = arg => {}

describe('RESTful controller unit tests for ClassA CRUD operations:', () => {
    let controller;
    let mockHttpResponse;

    beforeEach(() => {
        controller = new ClassARestController();

        mockHttpResponse = jasmine.createSpyObj('mockHttpResponse', ['status', 'json']);
        mockHttpResponse.status.and.returnValue(mockHttpResponse);

        spyOn(axios, 'get');
    });

    describe('retrieve all bike items', () => {
        it('succeeds', async () => {
            const testItems = [
                { name: "Mamba Sport 12\" Balance Bike", brand: "Mamba Bikes", color: "black", price: 75.88 },
                { name: "DJ Fat Bike 500W", brand: "DJ Bikes", color: "grey", price: 1599.86 }
            ];
            axios.get.and.returnValue(Promise.resolve({ data: testItems }));
            const req = { params: { service: 'bikes', location: 'NY' } };

            await controller.getAllItems(req, mockHttpResponse);

            expect(mockHttpResponse.json).toHaveBeenCalledOnceWith(testItems);
        });

        it('fails due to a backend service error', async () => {
            axios.get.and.returnValue(Promise.reject(new Error('error')));
            const req = { params: { service: 'bikes', location: 'NY' } };

            await controller.getAllItems(req, mockHttpResponse);

            expect(mockHttpResponse.status).toHaveBeenCalledOnceWith(500);
        });
    });

    describe('retrieve all food items', () => {
        it('succeeds', async () => {
            const testItems = [
                { name: "The Original Sandwich", brand: "Oreo", weight: "303g", calories: 405, price: 2.85 },
                { name: "Peanut Butter", brand: "KRAFT", weight: "2000g", calories: 726, price: 9.39 }
            ];
            axios.get.and.returnValue(Promise.resolve({ data: testItems }));
            const req = { params: { service: 'food', location: 'NY' } };
    
            await controller.getAllItems(req, mockHttpResponse);
    
            expect(mockHttpResponse.json).toHaveBeenCalledOnceWith(testItems);
        });
    
        it('fails due to a backend service error', async () => {
            axios.get.and.returnValue(Promise.reject(new Error('error')));
            const req = { params: { service: 'food', location: 'NY' } };
    
            await controller.getAllItems(req, mockHttpResponse);
    
            expect(mockHttpResponse.status).toHaveBeenCalledOnceWith(500);
        });
    });
    
    describe('retrieve all toy items', () => {
        it('succeeds', async () => {
            const testItems = [
                { name: "Medical Kit", brand: "Fisher-Price", "age-group": "3 to 9", price: 20.41 },
                { name: "Ferry Boat", brand: "Green Toys", "age-group": "3 to 6", price: 13.26 }
            ];
            axios.get.and.returnValue(Promise.resolve({ data: testItems }));
            const req = { params: { service: 'toys', location: 'NY' } };
    
            await controller.getAllItems(req, mockHttpResponse);
    
            expect(mockHttpResponse.json).toHaveBeenCalledOnceWith(testItems);
        });
    
        it('fails due to a backend service error', async () => {
            axios.get.and.returnValue(Promise.reject(new Error('error')));
            const req = { params: { service: 'toys', location: 'NY' } };
    
            await controller.getAllItems(req, mockHttpResponse);
    
            expect(mockHttpResponse.status).toHaveBeenCalledOnceWith(500);
        });
    });

    describe('retrieve team info', () => {
        it('succeeds', async () => {
            const testTeamInfo = { team: "TeamA", membersNames: ["Martin Derwin", "Patricija Shalkausaite"] };
            axios.get.and.returnValue(Promise.resolve({ data: testTeamInfo }));
            const req = { params: { service: 'bikes' } };

            await controller.getTeamInfo(req, mockHttpResponse);

            expect(mockHttpResponse.json).toHaveBeenCalledOnceWith(testTeamInfo);
        });

        it('fails due to a backend service error', async () => {
            axios.get.and.returnValue(Promise.reject(new Error('error')));
            const req = { params: { service: 'bikes' } };

            await controller.getTeamInfo(req, mockHttpResponse);

            expect(mockHttpResponse.status).toHaveBeenCalledOnceWith(500);
        });
    });
});