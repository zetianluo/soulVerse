
import React from 'react';
import ReactEcharts from 'echarts-for-react';

function BarChart({ data }) {
    const option = {
        title: {
            text: 'Emotion Scores',
            subtext: 'Based on your text',
            left: 'center',
            textStyle: {
                color: '#333',
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontFamily: 'Arial',
                fontSize: 18,
            },
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        xAxis: {
            type: 'category',
            data: data.map(item => item.name),
        },
        series: [
            {
                name: 'Score',
                type: 'bar',
                data: data.map(item => item.score),
                itemStyle: {
                    normal: {
                        color: function(params) {
                            const colorList = ['#c23531','#2f4554','#61a0a8','#d48265','#91c7ae'];
                            return colorList[params.dataIndex]
                        },
                        barBorderRadius: [10, 10, 10, 10], // Adjust this to control the corner roundness
                        shadowBlur: 20,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    }
                }
            }
        ]
    };

    return (
        <ReactEcharts option={option} style={{ height: '400px', width: '100%' }}/>
    );
}

export default BarChart;
