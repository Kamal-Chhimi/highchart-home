import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import Highcharts3D from 'highcharts/highcharts-3d'; // Import the 3D module
import HighchartsReact from 'highcharts-react-official';

// Initialize the 3D module
Highcharts3D(Highcharts);

const SmartphoneShipmentsChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chart = Highcharts.chart(chartRef.current, {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            title: {
                text: 'Global smartphone shipments market share, Q1 2022',
                align: 'center'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Share',
                data: [
                    ['Samsung', 23],
                    ['Apple', 18],
                    {
                        name: 'Xiaomi',
                        y: 12,
                        sliced: true,
                        selected: true
                    },
                    ['Oppo*', 9],
                    ['Vivo', 8],
                    ['Others', 30]
                ]
            }]
        });

        // Update the chart size whenever the container size changes
        const resizeHandler = () => {
            chart.reflow();
        };

        window.addEventListener('resize', resizeHandler);

        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    return (
        <div ref={chartRef} style={{height:"100%" , width:"100%"}} />
    );
};

export default SmartphoneShipmentsChart;
