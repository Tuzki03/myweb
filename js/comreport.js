function initCharts() {
    // 社区版图表
    const dimensionChart = echarts.init(document.getElementById('dimensionChart'));
    dimensionChart.setOption({
        dataset: {
            source: [
                ['score', '分数', '维度'],
                [75, 75, '情绪维度'],
                [65, 65, '注意力维度'],
                [78, 78, '睡眠维度'],
            ]
        },
        grid: { containLabel: true, top: 20, bottom: 20 },
        xAxis: { name: '分数', max: 100 },
        yAxis: { type: 'category' },
        visualMap: {
            orient: 'horizontal',
            left: 'center',
            bottom: 0,
            min: 10,
            max: 100,
            text: ['100', '0'],
            dimension: 0,
            inRange: {
                color: ['#ec3a3a', '#ecb43a', '#3aeca5']
            }
        },
        series: [
            {
                type: 'bar',
                barWidth: 35,
                encode: {
                    x: '分数',
                    y: '维度'
                },
                label: {
                    show: true,
                    position: 'right',
                    formatter: '{@分数}分'
                }
            }
        ]
    });

    const emotionChart = echarts.init(document.getElementById('emotionChart'));
    emotionChart.setOption({
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}%'
        },
        legend: {
            orient: 'vertical',
            right: 10,
            top: 'center',
            data: ['高兴', '平静', '低落', '焦虑']
        },
        series: [
            {
                name: '情绪分布',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '18',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 35, name: '高兴' },
                    { value: 40, name: '平静' },
                    { value: 15, name: '低落' },
                    { value: 10, name: '焦虑' }
                ]
            }
        ]
    });

    const attentionChart = echarts.init(document.getElementById('attentionChart'));
    attentionChart.setOption({
        tooltip: {
            trigger: 'axis'
        },
        radar: {
            indicator: [
                { name: '持续专注', max: 100 },
                { name: '任务正确率', max: 100 },
                { name: '反应速度', max: 100 },
                { name: '抗干扰能力', max: 100 },
                { name: '认知灵活性', max: 100 }
            ]
        },
        series: [{
            type: 'radar',
            data: [
                {
                    value: [65, 88, 72, 60, 75],
                    name: '当前表现',
                    areaStyle: {
                        color: 'rgba(75, 108, 183, 0.6)'
                    }
                },
                {
                    value: [85, 92, 88, 82, 86],
                    name: '健康常模',
                    lineStyle: {
                        color: 'rgba(121, 201, 169, 0.8)'
                    }
                }
            ]
        }]
    });

    const sleepChart = echarts.init(document.getElementById('sleepChart'));
    sleepChart.setOption({
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
        xAxis: {
            type: 'value',
            max: 100,
            name: '时间百分比 (%)'
        },
        yAxis: {
            type: 'category',
            data: ['深睡眠', '浅睡眠', 'REM睡眠', '清醒期']
        },
        series: [
            {
                name: '您的睡眠',
                type: 'bar',
                barWidth: 20,
                data: [18, 45, 25, 12],
                itemStyle: {
                    color: function (params) {
                        const colorList = ['#3aeca5', '#3498db', '#9b59b6', '#e74c3c'];
                        return colorList[params.dataIndex];
                    }
                },
                label: {
                    show: true,
                    position: 'right',
                    formatter: '{c}%'
                }
            }
        ]
    });
    window.addEventListener('resize', function () {
        dimensionChart.resize();
        emotionChart.resize();
        attentionChart.resize();
        sleepChart.resize();
        eegChart.resize();
        responseChart.resize();
    });
}

// 页面加载完成后初始化图表
document.addEventListener('DOMContentLoaded', initCharts);