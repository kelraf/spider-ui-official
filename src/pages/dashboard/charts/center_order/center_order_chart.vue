<script>

  import { Doughnut } from 'vue-chartjs'

  export default {
    extends: Doughnut,
    data () {
      return {
        datacollection: {
          labels: ["OFFLINE", "ONLINE", "COMPLETED"],
          datasets: [
            {
              label: 'CENTER ORDERS SUMMARY',
              backgroundColor: ["#eb2067", "#ffbe7d", "#23b349"],
              borderWidth: 0,
              hoverBorderWidth: 2,
              weight:1,
              hoverBorderColor: "#fec107",
              data: [...this.chartData],
            }
          ]
        },
        options: {
          legend: {
            display: true,
          }
        }
      }
    },
    mounted () {
      this.renderChart(this.datacollection, this.options, {responsive: true, maintainAspectRatio: false})
    },
    props: {
      chartData: Array
    },
    watch: {
      // chartData: {
      //   immediate: true,
      //   handler() {

      //     if(this.chartData.length) {

      //       this.datacollection.datasets[0].data = this.chartData

      //       console.log("JJJJJJ", this.chartData)

      //     }

      //   }
      // }
    }
  }

</script>