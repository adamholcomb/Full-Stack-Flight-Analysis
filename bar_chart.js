// Javascript
// import Plotly
// Bar Chart
bar_url = 'http://127.0.0.1:5000/visualization2'

d3.json(bar_url).then(function (response) {
    console.log(response)
     
    destination = Object.values(response['dest_home'])
    console.log(destination)

    price = Object.values(response['min_price_usd'])
    console.log(price)

    // carriers = Object.keys(min_cost)
    // console.log(carriers)
    
    // const coords = flightCount.map((el, index)=> [el, minCost[index]]);
    // console.log(coords);


    const labels = destination;
    const data = {
        labels: labels,
        datasets: [{
            label: 'Cheapest and Expensive Flights',
            data: price,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Flights Destination',
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
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Bar Chart Display'
                }
            }
        },
    };

    var myChart = new Chart(
        document.getElementById('myChart'),
        config
      );

})