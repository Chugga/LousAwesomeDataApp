const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const googleTrends = require('google-trends-api');
const moment = require('moment');
const debug = require('debug')('LouApp');

const app = express();

app.use(bodyParser);

/* GET home page. */
app.get('/', function(res, req) {
    res.render('index', { title: "Lou's Awesome Chart!", hone: "Chart" });
});

app.get('/chartData', function(res, req) {
    res.setHeader('Content-Type', 'application/json');

    googleTrends.interestOverTime({keyword: 'potato'})
        .then(function(results){
            const resultsParsed = JSON.parse(results);
            const timeData = resultsParsed.default.timelineData;

            const chartData = [];

            for(let i = 0; i < timeData.length; i++) {
                const datetime = moment(timeData[i].time*1000, 'x');
                chartData.push({
                    x: datetime,
                    y: timeData[i].value[0]
                });
            }

            res.json({result: 'success', data: chartData});
        })
        .catch(function(err){
            res.json({result: 'error', data: err});
        });
});

router.get('/locationData', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    googleTrends.interestByRegion({keyword: 'potato', startTime: new Date('2019-01-01'), endTime: new Date('2019-07-01'), geo: 'FR', resolution: 'DMA'})
        .then(function(results){
            debug(results);
            const resultsParsed = JSON.parse(results);
            /*const timeData = resultsParsed.default.timelineData;

            const chartData = [];

            for(let i = 0; i < timeData.length; i++) {
                const datetime = moment(timeData[i].time*1000, 'x');
                chartData.push({
                    x: datetime,
                    y: timeData[i].value[0]
                });
            }*/

            res.json({result: 'success', data: resultsParsed});
        })
        .catch(function(err){
            res.json({result: 'error', data: err});
        });
});

module.exports.handler = serverless(app);
