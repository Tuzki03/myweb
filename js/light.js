// DOM元素
const brightnessSlider = document.getElementById('brightness-slider');
const brightnessValue = document.getElementById('brightness-value');
const temperatureSlider = document.getElementById('temperature-slider');
const temperatureValue = document.getElementById('temperature-value');
const powerBtn = document.getElementById('power-btn');
const body = document.body;

// 当前状态
let isOn = true;
let currentBrightness = 80;
let currentTemperature = 4500;

// 初始化
function init() {
    updatePageLighting();

    // 亮度滑块事件
    brightnessSlider.addEventListener('input', function () {
        currentBrightness = this.value;
        brightnessValue.textContent = `${this.value}%`;
        updatePageLighting();
    });

    // 色温滑块事件
    temperatureSlider.addEventListener('input', function () {
        currentTemperature = this.value;
        temperatureValue.textContent = `${this.value}K`;
        updatePageLighting();
    });

    // 电源按钮事件
    powerBtn.addEventListener('click', togglePower);
}

// 更新页面灯光效果
function updatePageLighting() {
    if (!isOn) {
        body.style.backgroundColor = '#000';
        return;
    }

    // 将色温转换为RGB颜色
    const rgb = temperatureToRgb(currentTemperature);

    // 应用亮度
    const brightnessFactor = currentBrightness / 100;
    const r = Math.round(rgb.r * brightnessFactor);
    const g = Math.round(rgb.g * brightnessFactor);
    const b = Math.round(rgb.b * brightnessFactor);

    body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

// 色温转换为RGB（简化实现）
function temperatureToRgb(temp) {
    temp = temp / 100;

    let r, g, b;

    if (temp <= 66) {
        r = 255;
        g = temp;
        g = 99.4708025861 * Math.log(g) - 161.1195681661;
        if (temp <= 19) {
            b = 0;
        } else {
            b = temp - 10;
            b = 138.5177312231 * Math.log(b) - 305.0447927307;
        }
    } else {
        r = temp - 60;
        r = 329.698727446 * Math.pow(r, -0.1332047592);
        g = temp - 60;
        g = 288.1221695283 * Math.pow(g, -0.0755148492);
        b = 255;
    }

    // 限制RGB值在0-255之间
    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));

    return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
}

// 切换电源
function togglePower() {
    isOn = !isOn;

    if (isOn) {
        powerBtn.textContent = '关闭灯光';
        powerBtn.classList.remove('off');
        updatePageLighting();
    } else {
        powerBtn.textContent = '开启灯光';
        powerBtn.classList.add('off');
        body.style.backgroundColor = '#000';
    }
}

// 初始化应用
init();