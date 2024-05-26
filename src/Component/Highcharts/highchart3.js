import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsFullscreen from 'highcharts/modules/full-screen';
import highchartsExportData from 'highcharts/modules/export-data'; 


highchartsExportData(Highcharts);
HighchartsExporting(Highcharts);
HighchartsFullscreen(Highcharts);

const ColumnChartWithNegativeValues = () => {
    const chartOptions = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Column chart with negative values',
            style: {
                fontSize: '2.5vh'
            }
        },
        xAxis: {
            categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas'],
            labels: {
                style: {
                    fontSize: '1.8vh'
                }
            }
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            column: {
                borderRadius: '25%'
            }
        },
        series: [{
            name: 'John',
            data: [5, 3, 4, 7, 2]
        }, {
            name: 'Jane',
            data: [2, -2, -3, 2, 1]
        }, {
            name: 'Joe',
            data: [3, 4, 4, -2, 5]
        }]
    };

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
                containerProps={{ style: { height: '100%', width: '100%' } }}
            />
        </div>
    );
};

export default ColumnChartWithNegativeValues;
