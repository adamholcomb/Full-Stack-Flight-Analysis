// Javascript

// Bubble Chart
bubbleurl = 'http://127.0.0.1:5000/visualization3'

d3.json(bubbleurl).then(response => {
    console.log(response)
    document.getElementById('myBubbleDiv').innerHTML = '<canvas id="myBubble"></canvas>'

    var flight_count = response['flight_count']
    console.log(response[flight_count])
    flightCount = Object.values(flight_count)
    console.log(flightCount)

    var min_cost = response['min_cost']
    console.log(min_cost['Linear Air'])
    minCost = Object.values(min_cost)
    console.log(minCost)

    carriers = Object.keys(min_cost)
    console.log(carriers)

    // xy = [{x:minCost,y:flightCount}]
    // let combo = xy.map((item,index) => {`${index}:${item}`})
    // console.log(combo)

    const coords = flightCount.map((el, index)=> [el, minCost[index]]);
    console.log(coords);


    // let costs = response['flight_count'].map(count => {
    //     return count['Linear Air']
    // })

    const data = {
        datasets: [{
            label: 'Flights',
            labels: carriers,
            data: coords,
            backgroundColor: 'rgb(255, 99, 132)',
            pointHoverBackgroundColor: 'rgb(51, 204, 255)',
            pointRadius: 10,
            pointHoverRadius: 13,
        }]
    };

    // const footer = (carriers) => {
    //     // let label = carriers
    //     carriers.forEach(carrier => {
    //         return carrier;
    //     });
    //     // return carrier;
    // };

    const config = {
        type: 'scatter',
        data: data,
        options: {
            scales: {
                x: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Number of Flights',
                    font: {size:14}
                  }
                },
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Flight Cost',
                    font: {size:14}
                  }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Cheapest flight data',
                    color: 'rgb(255, 99, 132)',
                    font: {size:22}
                },
                subtitle: {
                    display: true,
                    text: 'Plots the cheapest flight vs count of cheapest flights for each airline',
                    color: 'rgb(51, 204, 255)',
                    font: {
                      size: 14,
                      family: 'tahoma',
                      weight: 'normal',
                      style: 'italic'
                    }
                },
                tooltip: {
                    callbacks: {   
                        label: function(ctx) {
                            let label = ctx.dataset.labels[ctx.dataIndex];
                            label += " (Flights: " + ctx.parsed.x + ", Cost: $" + ctx.parsed.y + ")";
                            return label;
                        }
                    }
                }
            }
        }
    };

    let myBubble = new Chart(
        document.getElementById('myBubble'),
        config
      );




})