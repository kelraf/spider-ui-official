<template>

    <div class="container-fluid">
        <div class="row">
            <div class="col-12 p-0 w-100 chart-col">
                <highcharts :options="options"></highcharts>
            </div>
        </div>
    </div>
  
</template>

<script>
export default {
    data() {
        return {
            livestock: {},
            options: {}
        }
    },
    mounted() {
        this.process_chart_data()
    },
    props: {
        livestockData: Object
    },
    watch: {
        livestockData: {
            immediate: true,
            handler() {

                if(Object.keys(this.livestockData).length <= 0) {
                    this.livestock = {}
                } else {
                    this.livestock = this.livestockData
                    this.process_chart_data()
                }

            }
        }
    },
    methods: {
         process_chart_data: function() {

            this.options = {
                title: {
                    text: 'LiveStock Update Progress'
                },
                xAxis: {
                    tickInterval: 1,
                    type: 'logarithmic',
                    accessibility: {
                        rangeDescription: 'Range: 1 to 10'
                    }
                },
                yAxis: {
                    type: 'logarithmic',
                    minorTickInterval: 0.1,
                    accessibility: {
                        rangeDescription: 'Range: 0.1 to 1000'
                    }
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br />',
                    pointFormat: 'x = {point.x}, y = {point.y}'
                },
                series: [{
                    name: "The Name",
                    data: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 257],
                    pointStart: 1
                }]
            }

            // this.options = {
               
            //     title: {
            //         text: "Fruit Consumption"
            //     },
            //     xAxis: {
            //         type: "bar",
            //         categories: ["Apple", "Banana", "Orange"]
            //     },
            //     yAxis: {
            //         type: "bar",
            //         title: {
            //             text: "Fruit Eaten"
            //         }
            //     },
            //     series: [
            //         {
            //             name: "jane",
            //             data: [2, 4, 5]
            //         },
            //         {
            //             name: "Raphael",
            //             data: [1, 3, 4]
            //         }
            //     ]
            // }

        }
    }
   

}
</script>

<style>

    .chart-col {
        /* background: red; */
        /* height: 300px; */
    }

</style>