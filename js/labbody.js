document.addEventListener('DOMContentLoaded', function () {
    initEyesOpenExperiment();
    initEyesCloseExperiment();
});

function initEyesOpenExperiment() {
    const startBtn = document.getElementById('btn-start-eyesopen');
    const pauseBtn = document.getElementById('btn-pause-eyesopen');
    const resetBtn = document.getElementById('btn-reset-eyesopen');
    const mainTimer = document.getElementById('main-timer-eyesopen');
    const elapsedTimer = document.getElementById('elapsed-timer-eyesopen');
    const remainingTimer = document.getElementById('remaining-timer-eyesopen');
    const progressBar = document.getElementById('progress-bar-eyesopen');
    const currentPhase = document.getElementById('current-phase-eyesopen');

    let totalTime = 130;
    let elapsedTime = 0;
    let timerInterval = null;
    let isRunning = false;

    // 更新时间显示
    function updateTimers() {
        const remainingTime = totalTime - elapsedTime;
        mainTimer.textContent = formatTime(totalTime);
        elapsedTimer.textContent = formatTime(elapsedTime);
        remainingTimer.textContent = formatTime(remainingTime);

        const progressPercent = (elapsedTime / totalTime) * 100;
        progressBar.style.width = progressPercent + '%';

        // 更新阶段指示
        if (elapsedTime >= 0 && elapsedTime < 5) {
            currentPhase.textContent = "准备阶段";
        } else if (elapsedTime >= 5 && elapsedTime < 125) {
            currentPhase.textContent = "静息态睁眼数据采集";
        } else if (elapsedTime >= 125 && elapsedTime < 130) {
            currentPhase.textContent = "休息环节";
        } else if (elapsedTime >= 130) {
            currentPhase.textContent = "实验完成";
        }
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    function startTimer() {
        if (!isRunning && elapsedTime < totalTime) {
            isRunning = true;
            timerInterval = setInterval(function () {
                elapsedTime++;
                updateTimers();
                if (elapsedTime >= totalTime) {
                    clearInterval(timerInterval);
                    isRunning = false;
                    currentPhase.textContent = "实验完成";
                }
            }, 1000);
        }
    }

    function pauseTimer() {
        if (isRunning) {
            clearInterval(timerInterval);
            isRunning = false;
        }
    }

    function resetTimer() {
        clearInterval(timerInterval);
        isRunning = false;
        elapsedTime = 0;
        updateTimers();
        currentPhase.textContent = "准备就绪";
    }

    // 添加事件监听器
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);

    // 初始化显示
    updateTimers();
}

function initEyesCloseExperiment() {
    const startBtn = document.getElementById('btn-start-eyesclose');
    const pauseBtn = document.getElementById('btn-pause-eyesclose');
    const resetBtn = document.getElementById('btn-reset-eyesclose');
    const startBeepBtn = document.getElementById('btn-start-beep-eyesclose');
    const endBeepBtn = document.getElementById('btn-end-beep-eyesclose');
    // const testBeepBtn = document.getElementById('btn-test-beep-eyesclose');
    const mainTimer = document.getElementById('main-timer-eyesclose');
    const elapsedTimer = document.getElementById('elapsed-timer-eyesclose');
    const remainingTimer = document.getElementById('remaining-timer-eyesclose');
    const progressBar = document.getElementById('progress-bar-eyesclose');
    const currentPhase = document.getElementById('current-phase-eyesclose');

    let totalTime = 130;
    let elapsedTime = 0;
    let timerInterval = null;
    let isRunning = false;
    let audioContext = null;

    // 创建音频上下文
    function initAudio() {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.error('Web Audio API is not supported in this browser', e);
            alert('您的浏览器不支持音频API，提示音功能将无法使用');
        }
    }

    // 播放提示音
    function playBeep(frequency, duration) {
        if (!audioContext) return;
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    }

    function playStartBeep() {
        playBeep(800, 0.5);
    }

    function playEndBeep() {
        playBeep(400, 0.8);
    }

    // 更新时间显示
    function updateTimers() {
        const remainingTime = totalTime - elapsedTime;
        mainTimer.textContent = formatTime(totalTime);
        elapsedTimer.textContent = formatTime(elapsedTime);
        remainingTimer.textContent = formatTime(remainingTime);

        const progressPercent = (elapsedTime / totalTime) * 100;
        progressBar.style.width = progressPercent + '%';

        // 更新阶段指示
        if (elapsedTime >= 0 && elapsedTime < 5) {
            currentPhase.textContent = "准备阶段";
            if (elapsedTime === 0) {
                playStartBeep();
            }
        } else if (elapsedTime >= 5 && elapsedTime < 125) {
            currentPhase.textContent = "静息态闭眼数据采集";
        } else if (elapsedTime >= 125 && elapsedTime < 130) {
            currentPhase.textContent = "休息环节";
            if (elapsedTime === 125) {
                playEndBeep();
            }
        } else if (elapsedTime >= 130) {
            currentPhase.textContent = "实验完成";
        }
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    function startTimer() {
        if (!isRunning && elapsedTime < totalTime) {
            isRunning = true;
            timerInterval = setInterval(function () {
                elapsedTime++;
                updateTimers();
                if (elapsedTime >= totalTime) {
                    clearInterval(timerInterval);
                    isRunning = false;
                    currentPhase.textContent = "实验完成";
                }
            }, 1000);
        }
    }

    function pauseTimer() {
        if (isRunning) {
            clearInterval(timerInterval);
            isRunning = false;
        }
    }

    function resetTimer() {
        clearInterval(timerInterval);
        isRunning = false;
        elapsedTime = 0;
        updateTimers();
        currentPhase.textContent = "准备就绪";
    }

    // 添加事件监听器
    startBtn.addEventListener('click', startTimer);
    startBtn.addEventListener('click', playStartBeep);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);

    startBeepBtn.addEventListener('click', playStartBeep);
    endBeepBtn.addEventListener('click', playEndBeep);

    // 初始化音频和显示
    initAudio();
    updateTimers();
}


document.addEventListener('DOMContentLoaded', function () {
    const startBtn = document.getElementById('btn-start-attention');
    const pauseBtn = document.getElementById('btn-pause-attention');
    const resetBtn = document.getElementById('btn-reset-attention');
    const mainTimer = document.getElementById('main-timer-attention');
    const elapsedTimer = document.getElementById('elapsed-timer-attention');
    const remainingTimer = document.getElementById('remaining-timer-attention');
    const progressBar = document.getElementById('progress-bar-attention');
    const currentPhase = document.getElementById('current-phase-attention');
    const currentNumber = document.getElementById('current-number');

    let totalTime = 60; // 总时间60秒
    let elapsedTime = 0;
    let timerInterval = null;
    let numberInterval = null;
    let isRunning = false;
    let currentValue = 0;

    // 生成随机初始数字（100-200之间）
    function generateRandomNumber() {
        return Math.floor(Math.random() * 101) + 100; // 100-200之间的随机数
    }

    // 更新时间显示
    function updateTimers() {
        const remainingTime = totalTime - elapsedTime;

        // 更新主计时器（总时间）
        mainTimer.textContent = formatTime(totalTime);

        // 更新已进行时间
        elapsedTimer.textContent = formatTime(elapsedTime);

        // 更新剩余时间
        remainingTimer.textContent = formatTime(remainingTime);

        // 更新进度条
        const progressPercent = (elapsedTime / totalTime) * 100;
        progressBar.style.width = progressPercent + '%';

        // 更新阶段指示
        if (elapsedTime >= 0 && elapsedTime < 3) {
            currentPhase.textContent = "准备阶段";
        } else if (elapsedTime >= 3 && elapsedTime < totalTime) {
            currentPhase.textContent = "连续减法任务";
        } else if (elapsedTime >= totalTime) {
            currentPhase.textContent = "实验完成";
        }
    }

    // 格式化时间显示（秒 -> mm:ss）
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    // 更新数字显示
    function updateNumber() {
        currentValue -= 3;
        currentNumber.textContent = currentValue;

        // 添加动画效果
        currentNumber.style.transform = "scale(1.1)";
        setTimeout(() => {
            currentNumber.style.transform = "scale(1)";
        }, 200);
    }

    // 开始计时器
    function startTimer() {
        if (!isRunning && elapsedTime < totalTime) {
            isRunning = true;

            // 如果是第一次开始，生成随机初始数字
            if (elapsedTime === 0) {
                currentValue = generateRandomNumber();
                currentNumber.textContent = currentValue;
            }

            // 主计时器
            timerInterval = setInterval(function () {
                elapsedTime++;
                updateTimers();

                if (elapsedTime >= totalTime) {
                    clearInterval(timerInterval);
                    clearInterval(numberInterval);
                    isRunning = false;
                    currentPhase.textContent = "实验完成";
                }
            }, 1000);

            // 数字更新计时器（每2秒更新一次）
            numberInterval = setInterval(updateNumber, 2000);
        }
    }

    // 暂停计时器
    function pauseTimer() {
        if (isRunning) {
            clearInterval(timerInterval);
            clearInterval(numberInterval);
            isRunning = false;
        }
    }

    // 重置计时器
    function resetTimer() {
        clearInterval(timerInterval);
        clearInterval(numberInterval);
        isRunning = false;
        elapsedTime = 0;
        currentValue = 0;
        currentNumber.textContent = "0";
        updateTimers();
        currentPhase.textContent = "准备就绪";
    }

    // 添加事件监听器
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);

    // 初始化显示
    updateTimers();
});



document.addEventListener('DOMContentLoaded', function () {
    const startBtn = document.getElementById('attention-btn-start');
    const pauseBtn = document.getElementById('attention-btn-pause');
    const resetBtn = document.getElementById('attention-btn-reset');
    const mainTimer = document.getElementById('attention-main-timer');
    const elapsedTimer = document.getElementById('attention-elapsed-timer');
    const remainingTimer = document.getElementById('attention-remaining-timer');
    const progressBar = document.getElementById('attention-progress-bar');
    const currentPhase = document.getElementById('attention-current-phase');
    const currentNumber = document.getElementById('attention-current-number');

    let totalTime = 60; // 总时间60秒
    let elapsedTime = 0;
    let timerInterval = null;
    let numberInterval = null;
    let isRunning = false;
    let currentValue = 0;

    // 生成随机初始数字（100-200之间）
    function generateRandomNumber() {
        return Math.floor(Math.random() * 101) + 100; // 100-200之间的随机数
    }

    // 更新时间显示
    function updateTimers() {
        const remainingTime = totalTime - elapsedTime;

        // 更新主计时器（总时间）
        mainTimer.textContent = formatTime(totalTime);

        // 更新已进行时间
        elapsedTimer.textContent = formatTime(elapsedTime);

        // 更新剩余时间
        remainingTimer.textContent = formatTime(remainingTime);

        // 更新进度条
        const progressPercent = (elapsedTime / totalTime) * 100;
        progressBar.style.width = progressPercent + '%';

        // 更新阶段指示
        if (elapsedTime >= 0 && elapsedTime < 3) {
            currentPhase.textContent = "准备阶段";
        } else if (elapsedTime >= 3 && elapsedTime < totalTime) {
            currentPhase.textContent = "连续减法任务";
        } else if (elapsedTime >= totalTime) {
            currentPhase.textContent = "实验完成";
        }
    }

    // 格式化时间显示（秒 -> mm:ss）
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    // 更新数字显示
    function updateNumber() {
        currentValue -= 3;
        currentNumber.textContent = currentValue;

        // 添加动画效果
        currentNumber.style.transform = "scale(1.1)";
        setTimeout(() => {
            currentNumber.style.transform = "scale(1)";
        }, 200);
    }

    // 开始计时器
    function startTimer() {
        if (!isRunning && elapsedTime < totalTime) {
            isRunning = true;

            // 如果是第一次开始，生成随机初始数字
            if (elapsedTime === 0) {
                currentValue = generateRandomNumber();
                currentNumber.textContent = currentValue;
            }

            // 主计时器
            timerInterval = setInterval(function () {
                elapsedTime++;
                updateTimers();

                if (elapsedTime >= totalTime) {
                    clearInterval(timerInterval);
                    clearInterval(numberInterval);
                    isRunning = false;
                    currentPhase.textContent = "实验完成";
                }
            }, 1000);

            // 数字更新计时器（每2秒更新一次）
            numberInterval = setInterval(updateNumber, 2000);
        }
    }

    // 暂停计时器
    function pauseTimer() {
        if (isRunning) {
            clearInterval(timerInterval);
            clearInterval(numberInterval);
            isRunning = false;
        }
    }

    // 重置计时器
    function resetTimer() {
        clearInterval(timerInterval);
        clearInterval(numberInterval);
        isRunning = false;
        elapsedTime = 0;
        currentValue = 0;
        currentNumber.textContent = "0";
        updateTimers();
        currentPhase.textContent = "准备就绪";
    }

    // 添加事件监听器
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);

    // 初始化显示
    updateTimers();
});

document.addEventListener('DOMContentLoaded', function () {
    const startBtn = document.getElementById('emotion-btn-start');
    const pauseBtn = document.getElementById('emotion-btn-pause');
    const resetBtn = document.getElementById('emotion-btn-reset');
    const mainTimer = document.getElementById('emotion-main-timer');
    const elapsedTimer = document.getElementById('emotion-elapsed-timer');
    const remainingTimer = document.getElementById('emotion-remaining-timer');
    const progressBar = document.getElementById('emotion-progress-bar');
    const feedbackProgress = document.getElementById('emotion-feedback-progress');
    const currentPhase = document.getElementById('emotion-current-phase');

    let totalTime = 70; // 总时间70秒
    let elapsedTime = 0;
    let timerInterval = null;
    let isRunning = false;
    let feedbackInterval = null;

    // 情绪类型 (1:高兴, 0:平静)
    let currentEmotionType = 1;

    // 更新时间显示
    function updateTimers() {
        // 确保elapsedTime不超过总时间
        if (elapsedTime > totalTime) {
            elapsedTime = totalTime;
        }

        const remainingTime = totalTime - elapsedTime;

        // 更新主计时器（总时间）
        mainTimer.textContent = formatTime(totalTime);

        // 更新已进行时间
        elapsedTimer.textContent = formatTime(elapsedTime);

        // 更新剩余时间（确保不为负）
        remainingTimer.textContent = formatTime(Math.max(0, remainingTime));

        // 更新进度条（确保不超过100%）
        const progressPercent = (elapsedTime / totalTime) * 100;
        progressBar.style.width = Math.min(progressPercent, 100) + '%';

        // 更新阶段指示
        if (elapsedTime >= 0 && elapsedTime < 5) {
            currentPhase.textContent = "准备阶段";
        } else if (elapsedTime >= 5 && elapsedTime < totalTime) {
            currentPhase.textContent = "准备就绪";
        }
        else if (elapsedTime >= 65 && elapsedTime < totalTime) {
            currentPhase.textContent = "休息阶段";
        } else if (elapsedTime >= totalTime) {
            currentPhase.textContent = "实验完成";
        }
    }

    // 格式化时间显示（秒 -> mm:ss）
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    // 更新神经反馈
    function updateFeedback() {
        // 模拟神经反馈数据（实际应用中应从BCI设备获取）
        const simulatedFeedback = Math.random() * 100;
        feedbackProgress.style.width = simulatedFeedback + '%';

        // 根据当前情绪类型给出提示
        if (currentEmotionType === 1) {
            // 高兴情绪 - 反馈应该偏向右侧
            if (simulatedFeedback > 70) {
                feedbackProgress.style.background = "linear-gradient(90deg, #0d9a10ff, #7cd17fff)";
            } else {
                feedbackProgress.style.background = "linear-gradient(90deg, #0d9a10ff, #7cd17fff)";
            }
        } else {
            // 平静情绪 - 反馈应该偏向左侧
            if (simulatedFeedback < 30) {
                feedbackProgress.style.background = "linear-gradient(90deg, #7cd17fff, #0d9a10ff)";
            } else {
                feedbackProgress.style.background = "linear-gradient(90deg, #7cd17fff, #0d9a10ff)";
            }
        }
    }

    // 开始计时器
    function startTimer() {
        if (!isRunning && elapsedTime < totalTime) {
            isRunning = true;

            // 主计时器
            timerInterval = setInterval(function () {
                elapsedTime++;
                updateTimers();

                if (elapsedTime >= totalTime) {
                    clearInterval(timerInterval);
                    clearInterval(feedbackInterval);
                    isRunning = false;
                    currentPhase.textContent = "实验完成";
                }
            }, 1000);

            // 神经反馈更新计时器（每2秒更新一次）
            feedbackInterval = setInterval(updateFeedback, 2000);
        }
    }

    // 暂停计时器
    function pauseTimer() {
        if (isRunning) {
            clearInterval(timerInterval);
            clearInterval(feedbackInterval);
            isRunning = false;
        }
    }

    // 重置计时器
    function resetTimer() {
        clearInterval(timerInterval);
        clearInterval(feedbackInterval);
        isRunning = false;
        elapsedTime = 0;
        currentEmotionType = 1;
        feedbackProgress.style.width = '50%';
        feedbackProgress.style.background = "linear-gradient(90deg, #5aca69, #d3ffcb);";
        updateTimers();
        currentPhase.textContent = "准备就绪";
    }

    // 添加事件监听器
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);

    // 初始化显示
    updateTimers();
});


document.addEventListener('DOMContentLoaded', function () {
    const startBtn = document.getElementById('imagination-btn-start');
    const pauseBtn = document.getElementById('imagination-btn-pause');
    const resetBtn = document.getElementById('imagination-btn-reset');
    const mainTimer = document.getElementById('imagination-main-timer');
    const elapsedTimer = document.getElementById('imagination-elapsed-timer');
    const remainingTimer = document.getElementById('imagination-remaining-timer');
    const progressBar = document.getElementById('imagination-progress-bar');
    const feedbackProgress = document.getElementById('imagination-feedback-progress');
    const currentPhase = document.getElementById('imagination-current-phase');
    const sceneText = document.getElementById('imagination-scene-text');

    let totalTime = 60; // 总时间60秒
    let elapsedTime = 0;
    let timerInterval = null;
    let isRunning = false;
    let feedbackInterval = null;

    // 情绪类型 (1:高兴, 0:平静)
    let currentEmotionType = 1;
    const emotionTexts = {
        1: "高兴",
        0: "平静"
    };

    const sceneExamples = {
        1: [
            "想象您正在享受最喜爱的活动"
        ],
        0: [
            "想象您在一片宁静的海滩上",
        ]
    };

    // 更新时间显示
    function updateTimers() {
        // 确保elapsedTime不超过总时间
        if (elapsedTime > totalTime) {
            elapsedTime = totalTime;
        }

        const remainingTime = totalTime - elapsedTime;

        // 更新主计时器（总时间）
        mainTimer.textContent = formatTime(totalTime);

        // 更新已进行时间
        elapsedTimer.textContent = formatTime(elapsedTime);

        // 更新剩余时间（确保不为负）
        remainingTimer.textContent = formatTime(Math.max(0, remainingTime));

        // 更新进度条（确保不超过100%）
        const progressPercent = (elapsedTime / totalTime) * 100;
        progressBar.style.width = Math.min(progressPercent, 100) + '%';

        // 更新阶段指示
        if (elapsedTime >= 0 && elapsedTime < 5) {
            currentPhase.textContent = "准备就绪";
        } else if (elapsedTime >= totalTime) {
            currentPhase.textContent = "实验完成";
        }
    }

    // 更新场景文本
    function updateSceneText() {
        const scenes = sceneExamples[currentEmotionType];
        const randomScene = scenes[Math.floor(Math.random() * scenes.length)];
        sceneText.innerHTML = `<i class="fas fa-lightbulb" style="font-size: 2rem; margin-bottom: 15px;"></i><br>${randomScene}`;
    }

    // 格式化时间显示（秒 -> mm:ss）
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    // 更新神经反馈
    function updateFeedback() {
        // 模拟神经反馈数据（实际应用中应从BCI设备获取）
        const simulatedFeedback = Math.random() * 100;
        feedbackProgress.style.width = simulatedFeedback + '%';

        // 根据当前情绪类型给出提示
        if (currentEmotionType === 1) {
            // 高兴情绪 - 反馈应该偏向右侧
            if (simulatedFeedback > 70) {
                feedbackProgress.style.background = "linear-gradient(90deg, #66bb6a, #2e7d32)";
            } else {
                feedbackProgress.style.background = "linear-gradient(90deg, #66bb6a, #43a047)";
            }
        } else {
            // 平静情绪 - 反馈应该偏向左侧
            if (simulatedFeedback < 30) {
                feedbackProgress.style.background = "linear-gradient(90deg, #66bb6a, #2e7d32)";
            } else {
                feedbackProgress.style.background = "linear-gradient(90deg, #66bb6a, #43a047)";
            }
        }
    }

    // 开始计时器
    function startTimer() {
        if (!isRunning && elapsedTime < totalTime) {
            isRunning = true;

            // 主计时器
            timerInterval = setInterval(function () {
                elapsedTime++;
                updateTimers();

                if (elapsedTime >= totalTime) {
                    clearInterval(timerInterval);
                    clearInterval(feedbackInterval);
                    isRunning = false;
                    currentPhase.textContent = "实验完成";
                }
            }, 1000);

            // 神经反馈更新计时器（每2秒更新一次）
            feedbackInterval = setInterval(updateFeedback, 2000);
        }
    }

    // 暂停计时器
    function pauseTimer() {
        if (isRunning) {
            clearInterval(timerInterval);
            clearInterval(feedbackInterval);
            isRunning = false;
        }
    }

    // 重置计时器
    function resetTimer() {
        clearInterval(timerInterval);
        clearInterval(feedbackInterval);
        isRunning = false;
        elapsedTime = 0;
        currentEmotionType = 1;
        feedbackProgress.style.width = '50%';
        feedbackProgress.style.background = "linear-gradient(90deg, #66bb6a, #43a047)";
        updateTimers();
        // updateSceneText();
        currentPhase.textContent = "准备就绪";
    }

    // 添加事件监听器
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);

    // 初始化显示
    updateTimers();
    // updateSceneText();
});