import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [
                { 
                    label: "west",
                    data: [],
                    fill: false,
                    borderColor:"#ff8080"
                }
                ,
                {
                    label: "national",
                    data: [],
                    fill: false,
                    borderColor:"#99b3ff"
                }
                ,
                {
                    label: "east",
                    data: [],
                    fill: false,
                    borderColor:"#e6e600"
                }
                ,
                {
                    label: "central",
                    data: [],
                    fill: false,
                    borderColor:"#99e699"
                }
                ,
                {
                    label: "south",
                    data: [],
                    fill: false,
                    borderColor:"#a366ff"
                }
                ,
                {
                    label: "north",
                    data: [],
                    fill: false,
                    borderColor:"#00001a"
                }
            ]
        },
        options: {
            legend: { display: true },
            title: {
              display: true,
              text: 'PSI Twenty Four Hourly (By Region)'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
            response.data["items"].forEach(data => {
                console.log(data);
                this.datacollection.labels.push(data["timestamp"])
                this.datacollection.datasets[0].data.push(data["readings"]["psi_twenty_four_hourly"]["west"]);
                this.datacollection.datasets[1].data.push(data["readings"]["psi_twenty_four_hourly"]["national"]);
                this.datacollection.datasets[2].data.push(data["readings"]["psi_twenty_four_hourly"]["east"]);
                this.datacollection.datasets[3].data.push(data["readings"]["psi_twenty_four_hourly"]["central"]);
                this.datacollection.datasets[4].data.push(data["readings"]["psi_twenty_four_hourly"]["south"]);
                this.datacollection.datasets[5].data.push(data["readings"]["psi_twenty_four_hourly"]["north"]);
            })
            this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}