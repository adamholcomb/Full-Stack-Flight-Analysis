// Javascript
// Bar Chart
bar_url = 'http://127.0.0.1:5000/visualization2'

d3.selectAll('#selDataset').on("change", updatePlot)

function updatePlot(){
d3.json(bar_url).then(function (response) {
    console.log(response)
    document.getElementById('myChartDiv').innerHTML = '<canvas id="myChart"></canvas>' 

    // if (myChart){
    //     myChart.destroy()
    // }



    let origin = d3.select("#selDataset").property("value")
    console.log(origin)
    // let origin = "Houston George Bush Intercntl."
    let destination = []
    let price = []
    for (i=0;i<Object.keys(response['origin_name']).length;i++){
        if (response['origin_name'][String(i)] == origin){

            destination.push(response['origin_name'][String(i)])
            price.push(response['min_price_usd'][String(i)])

        }
    }

    // destination = Object.values(response['dest_home'])
    console.log("Destinations: ", destination)

    // price = Object.values(response['min_price_usd'])
    console.log("Prices: ", price)

    let labels = destination;
    let data = {
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

    let config = {
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

    let myChart = new Chart(
        document.getElementById('myChart'),
        config
      );

})
}