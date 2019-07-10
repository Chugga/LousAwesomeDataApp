const ctx = document.getElementById('myChart');
let chart;

fetch('/chartData')
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonData) {
        //console.log(jsonData);
        //console.log(jsonData.data);

        chart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets:[{
                    "label":"Potato!",
                    "data":jsonData.data,
                    "fill":true,
                    "borderColor": "rgb(75, 192, 192)",
                    "lineTension":0.1
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'month'
                        }
                    }]
                }
            }
        });
    });

fetch('/locationData')
    .then(function(response) {
        return response.json();
    }).then(function(jsonData) {
        console.log(jsonData);
    });

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});