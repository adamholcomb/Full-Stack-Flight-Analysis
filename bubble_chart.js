// Javascript

// Bubble Chart
bubbleurl = 'http://127.0.0.1:5000/visualization3'

d3.json(bubbleurl).then(function(response) {
    console.log(response)

    const config = {
        type: 'bubble',
        data: response,
        options: {}
    };

    const data = {
        datasets: [{
        label: 'First Dataset',
        data: [{
            x: 20,
            y: 30,
            r: 15
        }, {
            x: 40,
            y: 10,
            r: 10
        }],
        backgroundColor: 'rgb(255, 99, 132)'
        }]
    };
})