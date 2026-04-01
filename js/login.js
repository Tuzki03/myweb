document.addEventListener('DOMContentLoaded', function () {
    var btn = document.querySelectorAll('.control a')
    var formContainer = document.querySelector('.div-form')
    var form = document.querySelectorAll('.div-form form')

    // 切换注册
    btn[0].addEventListener('click', function (e) {
        e.preventDefault();
        form[0].classList.add('disappear')
        form[1].classList.remove('disappear')
        formContainer.style.transform = 'rotateY(180deg)'
    })

    // 切换登录
    btn[1].addEventListener('click', function (e) {
        e.preventDefault();
        form[1].classList.add('disappear')
        form[0].classList.remove('disappear')
        formContainer.style.transform = 'none'
    })

    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const communityRadio = document.getElementById('community');
    const professionalRadio = document.getElementById('professional');

    loginBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (communityRadio.checked) {
            window.location.href = 'community.html';
        } else if (professionalRadio.checked) {
            window.location.href = 'professional.html';
        } else {
            alert('请先选择版本');
        }
    });

    registerBtn.addEventListener('click', function (e) {
        e.preventDefault();
        // 这里可以添加注册逻辑
        alert('注册成功，前往登录页面登录');
    });
});