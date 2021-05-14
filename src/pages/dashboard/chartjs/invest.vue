<script>
  import { Doughnut } from 'vue-chartjs'
var primary = localStorage.getItem('primary_color') || '#4466f2';
var secondary = localStorage.getItem('secondary_color') || '#1ea6ec';
  export default {
    extends: Doughnut,
    data () {
      return {
        datacollection: {
          labels: ["OFFLINE", "ONLINE", "COMPLETED"],
          datasets: [
            {
              label: 'CENTER ORDERS SUMMARY',
              backgroundColor: ["#fb9678", "#fec107", "#00c292"],
              borderWidth: 0,
              hoverBorderWidth: 2,
              weight:1,
              hoverBorderColor:primary,
              data: [40,8,10],
            }
          ]
        },
        options: {
          legend: {
            display: false,
          }
        }
      }
    },
    mounted () {
      this.renderChart(this.datacollection, this.options, {responsive: true, maintainAspectRatio: false})
    }
  }
</script>