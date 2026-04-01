// 获取元素
const stopTest = document.getElementById('stopTest');
const startRetest = document.getElementById('startRetest');
const impedanceCanvas = document.getElementById('impedanceCanvas');
const ctx = impedanceCanvas.getContext('2d');

// 模拟 32 通道的阻抗数据
let currentImpedanceData = new Array(32).fill(0).map(() => Math.random() * 800 + 1);
let targetImpedanceData = [...currentImpedanceData];
let intervalId;
let animationDuration = 1000; // 动画持续时间，单位：毫秒
let startTime;

// 定义颜色映射函数
function getColor(impedance) {
    if (impedance < 200) {
        return 'green';
    } else if (impedance < 400) {
        const t = (impedance - 200) / 200;
        const r = Math.floor(255 * t);
        const g = Math.floor(255 * (1 - t));
        return `rgb(${r}, ${g}, 0)`;
    } else if (impedance < 600) {
        const t = (impedance - 400) / 200;
        const r = Math.floor(255 * (1 - t));
        const g = Math.floor(255 * t);
        return `rgb(${r}, ${g}, 0)`;
    } else {
        return 'red';
    }
}

// 计算每个通道的位置
const centerX = impedanceCanvas.width / 2;
const centerY = impedanceCanvas.height / 2;
const outerRadius = Math.min(centerX, centerY) - 20;
const innerRadius = outerRadius * 0.4;
const sectorAngle = (2 * Math.PI) / 8;
const numPerRing = 8;

function drawChannel(x, y, impedance) {
    const color = getColor(impedance);
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.font = '12px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(impedance.toFixed(0), x, y);
}

function drawImpedance() {
    ctx.clearRect(0, 0, impedanceCanvas.width, impedanceCanvas.height);
    let index = 0;
    // 绘制外环
    for (let i = 0; i < numPerRing; i++) {
        const angle = i * sectorAngle;
        const x = centerX + outerRadius * Math.cos(angle);
        const y = centerY + outerRadius * Math.sin(angle);
        drawChannel(x, y, currentImpedanceData[index++]);
    }
    // 绘制中环
    for (let i = 0; i < numPerRing * 2; i++) {
        const angle = i * (sectorAngle / 2);
        const x = centerX + (outerRadius * 0.7) * Math.cos(angle);
        const y = centerY + (outerRadius * 0.7) * Math.sin(angle);
        drawChannel(x, y, currentImpedanceData[index++]);
    }
    // 绘制内环
    for (let i = 0; i < numPerRing; i++) {
        const angle = i * sectorAngle;
        const x = centerX + innerRadius * Math.cos(angle);
        const y = centerY + innerRadius * Math.sin(angle);
        drawChannel(x, y, currentImpedanceData[index++]);
    }
}

// 动画更新函数
function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / animationDuration, 1);

    for (let i = 0; i < currentImpedanceData.length; i++) {
        currentImpedanceData[i] = currentImpedanceData[i] + (targetImpedanceData[i] - currentImpedanceData[i]) * progress;
    }

    drawImpedance();

    if (progress < 1) {
        requestAnimationFrame(animate);
    } else {
        startTime = null;
    }
}

// 模拟数据更新并重新绘制
function updateImpedanceData() {
    targetImpedanceData = new Array(32).fill(0).map(() => Math.random() * 800 + 1);
    startTime = null;
    requestAnimationFrame(animate);
}

// 按钮点击事件处理函数
stopTest.addEventListener('click', () => {
    clearInterval(intervalId);
    ctx.clearRect(0, 0, impedanceCanvas.width, impedanceCanvas.height); // 清除画布
    impedanceCanvas.style.display = 'none'; // 隐藏canvas
    console.log('停止阻抗测试');
});

startRetest.addEventListener('click', () => {
    impedanceCanvas.style.display = 'block'; // 显示canvas
    targetImpedanceData = new Array(32).fill(0).map(() => Math.random() * 800 + 1);
    startTime = null;
    requestAnimationFrame(animate);
    console.log('开始重测');
});

// 初始化绘制
drawImpedance();