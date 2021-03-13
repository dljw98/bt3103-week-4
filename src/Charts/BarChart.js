import { Bar } from 'vue-chartjs'
import database from '../firebase.js'

export default {
  extends: Bar,
  data () {
    return {

      datacollection: {
        labels: ['Prawn omelette', 'Dry Beef Hor Fun','Sambal KangKung', 'Pork Fried Rice', 'Mapo Tofu',  'Cereal Prawn'],
        //labels: [],
        datasets: [
          {
            label: "Quantity Ordered",
            data: [0, 0, 0, 0, 0, 0],
            backgroundColor: ['#ff0000', '#0033cc', '#ffff1a', '#339933', '#8f00b3', '#000000'],
            borderWidth: 1.0,
            borderColor: "#000"
          }
        ]
      },

        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Total Number of each dish'
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [{
              ticks: {
                min: 0,
                max: 50,
                stepSize: 1,
                reverse: false,
                beginAtZero: true
              }
            }]
          }
        }
    }
  },

  methods: {
    fetchItems: function () {
      database.collection('orders').get().then(querySnapShot => {
        querySnapShot.forEach(doc => { 
          var count = 0;
          for (var dish in doc.data()) {
            this.datacollection.datasets[0].data[count] += parseInt(doc.data()[dish].quantity);
            count++;
          }
        })
        this.renderChart(this.datacollection, this.options)
      })
    }
  },

  created () {
    this.fetchItems()
  },

  mounted () {
    this.renderChart(this.datacollection, this.options)
  }
}