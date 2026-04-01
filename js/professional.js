// 简单的交互功能示例
document.addEventListener('DOMContentLoaded', function () {
    // 自动获取按钮功能
    const autoButtons = document.querySelectorAll('#autoTempButton, #autoHumidityButton, #autoNoiseButton, #autoLightButton');

    // 创建按钮到输入框的映射
    const buttonToInputMap = {
        'autoTempButton': 'temperature',
        'autoHumidityButton': 'humidity',
        'autoNoiseButton': 'noise-level',
        'autoLightButton': 'light-intensity'
    };

    // 创建输入框到模拟值的映射
    const inputToValueMap = {
        'temperature': () => (20 + Math.random() * 10).toFixed(1),
        'humidity': () => (40 + Math.random() * 30).toFixed(1),
        'noise-level': () => (30 + Math.random() * 20).toFixed(1),
        'light-intensity': () => (100 + Math.random() * 200).toFixed(0)
    };

    autoButtons.forEach(button => {
        button.addEventListener('click', function () {
            const buttonId = this.id;
            const inputId = buttonToInputMap[buttonId];

            if (inputId && inputToValueMap[inputId]) {
                const inputField = document.getElementById(inputId);
                inputField.value = inputToValueMap[inputId]();
            }
        });
    });

    // 校准按钮功能
    const calibrationButton = document.getElementById('calibration-button');
    if (calibrationButton) {
        calibrationButton.addEventListener('click', function () {
            const statusElement = document.getElementById('calibration-status');
            const progressBar = document.getElementById('calibration-progress');

            statusElement.textContent = '校准中...';
            let progress = 0;

            const interval = setInterval(() => {
                progress += 5;
                progressBar.style.width = `${progress}%`;

                if (progress >= 100) {
                    clearInterval(interval);
                    statusElement.textContent = '校准完成';
                    calibrationButton.textContent = '重新校准';
                }
            }, 200);
        });
    }

    // 保存设置按钮
    const saveButtons = document.querySelectorAll('#save-screening-params, #save-button');
    saveButtons.forEach(button => {
        button.addEventListener('click', function () {
            alert('设置已保存成功！');
        });
    });
});
document.addEventListener('DOMContentLoaded', function () {
    // 保存按钮事件
    document.querySelector('.btn-save').addEventListener('click', function () {
        // 收集所有参数值
        const params = {
            restOpenDuration: document.getElementById('rest-open-duration').value,
            restCloseDuration: document.getElementById('rest-close-duration').value,
            attentionDuration: document.getElementById('attention-duration').value,
            attentionStep: document.getElementById('attention-step').value,
            attentionRepeat: document.getElementById('attention-repeat').value,
            emotionVideoType: document.getElementById('emotion-video-type').value,
            emotionVideoDuration: document.getElementById('emotion-video-duration').value,
            emotionVideoRepeat: document.getElementById('emotion-video-repeat').value,
            emotionVideoFeedback: document.getElementById('emotion-video-feedback').value,
            emotionImagineType: document.getElementById('emotion-imagine-type').value,
            emotionImagineDuration: document.getElementById('emotion-imagine-duration').value,
            emotionImagineRepeat: document.getElementById('emotion-imagine-repeat').value
        };

        // 在实际应用中，这里会发送数据到服务器
        console.log('保存参数:', params);

        // 显示成功消息
        alert('参数设置已成功保存！');
    });

    // 重置按钮事件
    document.querySelector('.btn-reset').addEventListener('click', function () {
        if (confirm('确定要恢复默认设置吗？当前所有更改将会丢失。')) {
            // 重置所有值为默认值
            document.getElementById('rest-open-duration').value = 2;
            document.getElementById('rest-close-duration').value = 2;
            document.getElementById('attention-duration').value = 1;
            document.getElementById('attention-step').value = 3;
            document.getElementById('attention-repeat').value = 3;
            document.getElementById('emotion-video-type').value = 'happy';
            document.getElementById('emotion-video-duration').value = 1;
            document.getElementById('emotion-video-repeat').value = 4;
            document.getElementById('emotion-video-feedback').value = 'with-feedback';
            document.getElementById('emotion-imagine-type').value = 'happy';
            document.getElementById('emotion-imagine-duration').value = 1;
            document.getElementById('emotion-imagine-repeat').value = 2;

            alert('已恢复默认设置！');
        }
    });
});