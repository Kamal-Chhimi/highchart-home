import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsFullscreen from 'highcharts/modules/full-screen';
import highchartsExportData from 'highcharts/modules/export-data';

highchartsExportData(Highcharts);
HighchartsExporting(Highcharts);
HighchartsFullscreen(Highcharts);

const columnChartOptions = {
  chart: {
    type: 'column',
     // Ensure the chart takes the full height of the container
  },
  title: {
    text: 'Corn vs wheat estimated production',
    align: 'center',
    style: {
      fontSize: '2.5vh',
    },
  },
  subtitle: {
    text: 'Source: <a target="_blank" href="https://www.indexmundi.com/agriculture/?commodity=corn">indexmundi</a>',
    align: 'left',
    style: {
      fontSize: '0vh',
    },
  },
  xAxis: {
    categories: ['USA', 'China', 'Brazil', 'EU', 'India', 'Russia'],
    crosshair: true,
    labels: {
      style: {
        fontSize: '1.9vh',
      },
    },
    accessibility: {
      description: 'Countries',
    },
  },
  yAxis: {
    min: 0,
    title: {
      text: '1000 metric tons (MT)',
      style: {
        fontSize: '1.9vh',
      },
    },
    labels: {
      style: {
        fontSize: '1.9vh',
      },
    },
  },
  tooltip: {
    valueSuffix: ' (1000 MT)',
    style: {
      fontSize: '1.5vh',
    },
  },
  plotOptions: {
    column: {
      pointPadding: 0.2,
      borderWidth: 0,
    },
  },
  series: [
    {
      name: 'Corn',
      data: [406292, 260000, 107000, 68300, 27500, 14500],
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '1.5vh',
        },
      },
    },
    {
      name: 'Wheat',
      data: [51086, 136000, 5500, 141000, 107180, 77000],
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '1.5vh',
        },
      },
    },
  ],
  exporting: {
    enabled: true, // Disable exporting to simplify the chart
  },
  navigation: {
    buttonOptions: {
      enabled: true, // Disable fullscreen button to simplify the chart
    },
  },
};

const MyColumnChart = () => (
  <div style={{ width: '100%', height: '100%' }}>
    <HighchartsReact
      highcharts={Highcharts}
      options={columnChartOptions}
      containerProps={{ style: { width: '100%', height: '100%' } }}
    />
  </div>
);

export default MyColumnChart;
