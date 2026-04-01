function initCharts() {
    // 1. EEG频段功率分析图表
    const eegChart = echarts.init(document.getElementById('eegChart'));
    eegChart.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['δ波', 'θ波', 'α波', 'β波', 'γ波']
        },
        yAxis: {
            type: 'value',
            name: '功率 (μV²)'
        },
        series: [{
            type: 'bar',
            data: [
                { value: 42.3, itemStyle: { color: '#3aac5a' } },
                { value: 38.7, itemStyle: { color: '#5ac48e' } },
                { value: 65.2, itemStyle: { color: '#7ad4b3' } },
                { value: 25.8, itemStyle: { color: '#9ae4d7' } },
                { value: 4.5, itemStyle: { color: '#baf4f0' } }
            ],
            label: {
                show: true,
                position: 'top',
                formatter: '{c}'
            }
        }]
    });

    // 2. 睡眠结构分析图表
    const sleepChart = echarts.init(document.getElementById('sleepChart'));
    sleepChart.setOption({
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}%'
        },
        series: [{
            name: '睡眠结构',
            type: 'pie',
            radius: '70%',
            center: ['50%', '50%'],
            data: [
                { value: 8.2, name: 'NREM I期', itemStyle: { color: '#3aac5a' } },
                { value: 45.3, name: 'NREM II期', itemStyle: { color: '#5ac48e' } },
                { value: 18.5, name: 'NREM III/IV期', itemStyle: { color: '#7ad4b3' } },
                { value: 24.8, name: 'REM睡眠', itemStyle: { color: '#9ae4d7' } },
                { value: 3.2, name: '清醒时间', itemStyle: { color: '#baf4f0' } }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            label: {
                formatter: '{b}: {c}%'
            }
        }]
    });

    // 3. 情绪识别分析图表
    const emotionChart = echarts.init(document.getElementById('emotionChart'));
    emotionChart.setOption({
        tooltip: {
            trigger: 'axis'
        },
        radar: {
            indicator: [
                { name: '高兴', max: 100 },
                { name: '平静', max: 100 },
                { name: '低落', max: 100 },
                { name: '焦虑', max: 100 },
                { name: '愤怒', max: 100 }
            ],
            radius: '65%'
        },
        series: [{
            type: 'radar',
            data: [{
                value: [85, 90, 40, 30, 15],
                name: '情绪识别',
                areaStyle: {
                    color: 'rgba(58, 172, 90, 0.6)'
                }
            }]
        }]
    });

    // 4. 注意力水平评估图表
    const attentionChart = echarts.init(document.getElementById('attentionChart'));
    attentionChart.setOption({
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
            type: 'value',
            name: '注意力指数'
        },
        series: [{
            data: [65, 70, 68, 72, 75, 70, 68],
            type: 'line',
            smooth: true,
            lineStyle: {
                width: 3,
                color: '#3aac5a'
            },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: 'rgba(58, 172, 90, 0.5)'
                    }, {
                        offset: 1,
                        color: 'rgba(58, 172, 90, 0.1)'
                    }]
                }
            }
        }]
    });

    // 5. 脑网络连接分析图表
    const networkChart = echarts.init(document.getElementById('networkChart'));
    networkChart.setOption({
        tooltip: {
            trigger: 'item'
        },
        series: [{
            type: 'graph',
            layout: 'force',
            force: {
                repulsion: 100,
                edgeLength: 50
            },
            data: [
                { name: 'DMN', value: 80, symbolSize: 30, itemStyle: { color: '#3aac5a' } },
                { name: 'SN', value: 70, symbolSize: 25, itemStyle: { color: '#5ac48e' } },
                { name: 'CEN', value: 60, symbolSize: 20, itemStyle: { color: '#7ad4b3' } },
                { name: 'DAN', value: 65, symbolSize: 22, itemStyle: { color: '#9ae4d7' } }
            ],
            links: [
                { source: 'DMN', target: 'SN', value: 0.68 },
                { source: 'SN', target: 'CEN', value: 0.72 },
                { source: 'CEN', target: 'DAN', value: 0.61 },
                { source: 'DAN', target: 'DMN', value: 0.65 }
            ],
            label: {
                show: true,
                position: 'inside'
            },
            lineStyle: {
                width: 2,
                color: 'source',
                curveness: 0.3
            }
        }]
    });

    // 6. 心理健康趋势分析图表
    const trendChart = echarts.init(document.getElementById('trendChart'));
    trendChart.setOption({
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['情绪指数', '注意力指数', '睡眠质量']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['第1周', '第2周', '第3周', '第4周']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '情绪指数',
                type: 'line',
                data: [65, 70, 75, 72],
                smooth: true,
                lineStyle: { width: 3, color: '#3aac5a' }
            },
            {
                name: '注意力指数',
                type: 'line',
                data: [60, 65, 70, 68],
                smooth: true,
                lineStyle: { width: 3, color: '#5ac48e' }
            },
            {
                name: '睡眠质量',
                type: 'line',
                data: [70, 75, 78, 75],
                smooth: true,
                lineStyle: { width: 3, color: '#7ad4b3' }
            }
        ]
    });

    // 7. 反应时间分析图表
    const reactionChart = echarts.init(document.getElementById('reactionChart'));
    reactionChart.setOption({
        tooltip: {
            trigger: 'axis'
        },
        radar: {
            indicator: [
                { name: '情绪识别', max: 1000 },
                { name: '注意力任务', max: 1000 },
                { name: '认知任务', max: 1000 }
            ]
        },
        series: [{
            type: 'radar',
            data: [{
                value: [720, 850, 920],
                name: '反应时间(ms)',
                areaStyle: {
                    color: 'rgba(58, 172, 90, 0.6)'
                }
            }]
        }]
    });

    // 8. 睡眠质量指标图表
    const sleepQualityChart = echarts.init(document.getElementById('sleepQualityChart'));
    sleepQualityChart.setOption({
        tooltip: {
            trigger: 'axis'
        },
        polar: {
            radius: ['30%', '80%']
        },
        angleAxis: {
            max: 100,
            startAngle: 75
        },
        radiusAxis: {
            type: 'category',
            data: ['入睡时间', '睡眠效率', '醒来次数', '深睡比例']
        },
        series: [{
            type: 'bar',
            data: [75, 85, 70, 65],
            coordinateSystem: 'polar',
            name: '睡眠质量',
            barWidth: '60%',
            itemStyle: {
                color: '#3aac5a'
            }
        }]
    });

    // 9. 生理指标监测图表
    const physicalChart = echarts.init(document.getElementById('physicalChart'));
    physicalChart.setOption({
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: ['心率变异性', '呼吸频率', '皮电反应']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [
                { value: 68, itemStyle: { color: '#3aac5a' } },
                { value: 14, itemStyle: { color: '#5ac48e' } },
                { value: 4.2, itemStyle: { color: '#7ad4b3' } }
            ],
            type: 'bar',
            barWidth: '40%',
            label: {
                show: true,
                position: 'top',
                formatter: '{c}'
            }
        }]
    });

    // 窗口调整时重置图表大小
    window.addEventListener('resize', function () {
        eegChart.resize();
        sleepChart.resize();
        emotionChart.resize();
        attentionChart.resize();
        networkChart.resize();
        trendChart.resize();
        reactionChart.resize();
        sleepQualityChart.resize();
        physicalChart.resize();
    });
}

// 页面加载完成后初始化图表
document.addEventListener('DOMContentLoaded', initCharts);