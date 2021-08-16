// Javascript

// 
const flighturl2 = 'http://127.0.0.1:5000/visualization1'

let myMap = L.map("map", {
    center: [39.52, -98.67],
    zoom: 4,
    });

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);

d3.selectAll('#selDataset').on("change", updatePlot)


function updatePlot(){

    d3.json(flighturl2).then(function(response) {
        myMap.remove(migrationLayer)
        let dropDown = d3.select("#selDataset").property("value")
        let origin_data_list = Object.values(response.origin_gps)
        let dest_data_list = Object.values(response.dest_gps) 
        //console.log(response)
        let origingps = [];
        let destgps = [];
        let originname = [];
        let destname = [];
        for (i = 0; i < origin_data_list.length; i++){
            if(response.origin_name[i]==dropDown){
            var origin_gps =  [parseFloat(response.origin_gps[i].split(", ")[0]), parseFloat(response.origin_gps[i].split(", ")[1])]
            var origin_name = response.origin_name[i]
    
            origingps.push(origin_gps)
            originname.push(origin_name)
    
            // console.log(origin_name)
            // var marker = L.marker(origin_gps, {
            //     draggable: true,
            //     title: origin_name
            // }).addTo(myMap);
            };
            }
    
        for (i = 0; i < dest_data_list.length; i++){
            if(response.origin_name[i]==dropDown){
            var dest_gps =  [parseFloat(response.dest_gps[i].split(", ")[0]), parseFloat(response.dest_gps[i].split(", ")[1])]
            var dest_name = response.dest_home[i]
    
            destgps.push(dest_gps)
            destname.push(dest_name)
    
            // console.log(origin_gps)
            // console.log(origin_name)
            // var marker = L.marker(dest_gps, {
            //     draggable: true,
            //     title: dest_name
            // }).addTo(myMap);
            };
    
            } 
    
        //console.log(originname.length)
        //console.log(destname.length)
    
        for (i=0; i < 186; i++){
    
            if(response.origin_name[i]==dropDown){
            var data = [{"from":origingps[i],"to": destgps[i],"labels":[originname[i], destname[i]],"color":"#ff3a31","value":15}];
                var migrationLayer = new L.migrationLayer({
                map: myMap,
                data: data,
                pulseRadius:30,
                pulseBorderWidth:3,
                arcWidth:1,
                arcLabel:true,
                arcLabelFont:'10px sans-serif',
                maxWidth:10
                }
            );
            migrationLayer.addTo(myMap);
            }
        }
    
        })
    }

function init(){

d3.json(flighturl2).then(function(response) {
    let dropDown = d3.select("#selDataset").property("value")
    let origin_data_list = Object.values(response.origin_gps)
    let dest_data_list = Object.values(response.dest_gps) 
    //console.log(response)
    let origingps = [];
    let destgps = [];
    let originname = [];
    let destname = [];
    for (i = 0; i < origin_data_list.length; i++){
        if(response.origin_name[i]=='Houston George Bush Intercntl.'){
        var origin_gps =  [parseFloat(response.origin_gps[i].split(", ")[0]), parseFloat(response.origin_gps[i].split(", ")[1])]
        var origin_name = response.origin_name[i]

        origingps.push(origin_gps)
        originname.push(origin_name)

        // console.log(origin_name)
        // var marker = L.marker(origin_gps, {
        //     draggable: true,
        //     title: origin_name
        // }).addTo(myMap);
        };
     }

    for (i = 0; i < dest_data_list.length; i++){
        if(response.origin_name[i]=='Houston George Bush Intercntl.'){
        var dest_gps =  [parseFloat(response.dest_gps[i].split(", ")[0]), parseFloat(response.dest_gps[i].split(", ")[1])]
        var dest_name = response.dest_home[i]

        destgps.push(dest_gps)
        destname.push(dest_name)

        // console.log(origin_gps)
        // console.log(origin_name)
        // var marker = L.marker(dest_gps, {
        //     draggable: true,
        //     title: dest_name
        // }).addTo(myMap);
        };

     } 

    //console.log(originname.length)
    //console.log(destname.length)

    for (i=0; i < 186; i++){

        if(response.origin_name[i]=='Houston George Bush Intercntl.'){
        var data = [{"from":origingps[i],"to": destgps[i],"labels":[originname[i], destname[i]],"color":"#ff3a31","value":15}];

        var migrationLayer = new L.migrationLayer({
            map: myMap,
            data: data,
            pulseRadius:30,
            pulseBorderWidth:3,
            arcWidth:1,
            arcLabel:true,
            arcLabelFont:'10px sans-serif',
            maxWidth:10
            }
        );
        migrationLayer.addTo(myMap);
        }
  }

 })
}
init();