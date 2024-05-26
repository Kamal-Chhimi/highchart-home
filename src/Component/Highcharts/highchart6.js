import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import Highcharts3D from 'highcharts/highcharts-3d';
import HighchartsReact from 'highcharts-react-official';

// Initialize the 3D module
Highcharts3D(Highcharts);

const PieChart3DResponsive = () => {
    const chartRef = useRef(null);

    const chartOptions = {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45
            },
        },
        title: {
            text: 'Beijing 2022 gold medals by country',
            align: 'center',
            style: {
                fontSize: '2.5vh'
            }
        },
        subtitle: {
            text: '3D donut in Highcharts',
            align: 'left',
            style: {
                fontSize: '0vh'
            }
        },
        plotOptions: {
            pie: {
                innerSize: 100,
                depth: 45,
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.y}',
                    style: {
                        fontSize: '1.7vh'
                    }
                }
            }
        },
        series: [{
            name: 'Medals',
            data: [
                ['Norway', 16],
                ['Germany', 12],
                ['USA', 8],
                ['Sweden', 8],
                ['Netherlands', 8],
                ['ROC', 6],
                ['Austria', 7],
                ['Canada', 4],
                ['Japan', 3]
            ]
        }]
    };

    useEffect(() => {
        const handleResize = () => {
            if (chartRef.current) {
                chartRef.current.chart.reflow();
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
                ref={chartRef}
                containerProps={{ style: { height: '100%', width: '100%' } }}
            />
        </div>
    );
};

export default PieChart3DResponsive;
