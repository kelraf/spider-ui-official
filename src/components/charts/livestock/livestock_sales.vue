<template>

    <div class="container-fluid">
        <div v-if="data_available" class="row">
            <div class="col-12 p-0 w-100 chart-col">
                <highcharts :options="options"></highcharts>
            </div>
        </div>

        <div v-if="!data_available" class="row pt-5 pb-5">
            <div class="col-md-12 text-center pt-5 pb-5">
                <h2> No Data To Show At The Moment </h2>
            </div>
        </div>

    </div>
  
</template>

<script>
export default {
    data() {
        return {
            livestock: {},
            options: {},
            data_available: false
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

            },
            deep: true
        }
    },
    methods: {
         process_chart_data: function() {

            let tlivestocks = this.livestock.tlivestocks

            if(tlivestocks.length <= 1) {

                this.data_available = false

            } else {

                this.data_available = true

                let numbers = []
                let dates = []

                for (const item of tlivestocks) {
                    
                    numbers.push(item.quantity)
                    
                    let exploded_date_time = item.inserted_at.split("T")
                    let time = exploded_date_time[1].split(".")[0]
                    let date = exploded_date_time[0]

                    dates.push(`${date} ${time}`)

                }

                // console.log("Numbers", numbers)
                // console.log("Dates", dates)

                this.options = {
                    title: {
                        text: 'LiveStock Sales History'
                    },
                    xAxis: {
                        title: {
                            text: "Date Sold"
                        },
                        // tickInterval: 1,
                        // type: 'logarithmic',
                        categories: dates
                    },
                    yAxis: {
                        title: {
                            text: "Number of Animals Sold"
                        },
                        type: 'logarithmic',
                        minorTickInterval: 0.1
                    },
                    tooltip: {
                        headerFormat: '<b> {series.name} </b> <br />',
                        pointFormat: 'Date = {point.x} <br /> Number = {point.y}'
                    },
                    series: [{
                        name: "LiveStock Sales History",
                        data: numbers,
                        pointStart: 1
                    }]
                }

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