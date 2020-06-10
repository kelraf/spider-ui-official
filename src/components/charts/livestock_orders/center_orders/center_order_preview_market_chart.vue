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
            data_available: true,
            options: {}
        }
    },
    mounted(){

        this.options = {
            title: {
                text: 'Livestocks Stock Level And Prices'
            },
            yAxis: {
                title: {
                    text: "No of Animals"
                }
            },
            xAxis: {
                title: {
                    text: "Sellers"
                },
                categories: ['Apples', 'Oranges', 'Pears', 'Bananas', 'Plums']
            },
            // labels: {
            //     items: [{
            //         html: 'Livestock Prices',
            //         style: {
            //             left: '50px',
            //             top: '18px'
            //             // color: (Highcharts.defaultOptions.title.style && Highcharts.defaultOptions.title.style.color) || 'black'
            //         }
            //     }]
            // },
            series: [
                {
                    type: 'column',
                    name: 'Jane',
                    data: [3, 2, 1, 3, 4]
                }, 
                {
                    type: 'column',
                    name: 'John',
                    data: [2, 3, 5, 7, 6]
                }, 
                {
                    type: 'column',
                    name: 'Joe',
                    data: [4, 3, 3, 9, 0]
                }, 
                {
                    type: 'spline',
                    name: 'Average',
                    data: [3, 2.67, 3, 6.33, 3.33],
                    marker: {
                        lineWidth: 2,
                        // lineColor: Highcharts.getOptions().colors[3],
                        fillColor: 'black'
                    }
                }, 
                {
                    type: 'pie',
                    name: 'Livestock Prices',
                    data: [{
                        name: 'Jane',
                        y: 13,
                        // color: Highcharts.getOptions().colors[0] // Jane's color
                    }, {
                        name: 'John',
                        y: 23
                        // color: Highcharts.getOptions().colors[1] // John's color
                    }, {
                        name: 'Joe',
                        y: 19
                        // color: Highcharts.getOptions().colors[2] // Joe's color
                    }],
                    center: [100, 80],
                    size: 100,
                    showInLegend: false,
                    dataLabels: {
                        enabled: false
                    }
                }]
        }

    }

}
</script>

<style>

</style>