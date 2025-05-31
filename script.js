document.addEventListener('DOMContentLoaded', function() {
    let htmlEditor, multiHtmlEditor, cssEditor, jsEditor;
    let currentMode = 'html';

    // 初始化HTML模式编辑器
    function initHtmlEditor() {
        htmlEditor = CodeMirror.fromTextArea(document.getElementById('html-editor'), {
            mode: 'htmlmixed',
            theme: 'monokai',
            lineNumbers: true,
            autoCloseTags: true,
            autoCloseBrackets: true,
            matchBrackets: true,
            indentUnit: 4,
            tabSize: 4,
            indentWithTabs: false,
            lineWrapping: true
        });

        // 设置默认HTML内容 - Bento Grid风格
        htmlEditor.setValue('<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>Bento Grid 预览</title>\n    <style>\n        * {\n            margin: 0;\n            padding: 0;\n            box-sizing: border-box;\n        }\n        \n        body {\n            font-family: "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif;\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            min-height: 100vh;\n            padding: 20px;\n        }\n        \n        .bento-container {\n            display: grid;\n            grid-template-columns: repeat(4, 1fr);\n            grid-template-rows: repeat(3, 1fr);\n            gap: 16px;\n            max-width: 1200px;\n            margin: 0 auto;\n            height: 80vh;\n        }\n        \n        .bento-item {\n            background: rgba(255, 255, 255, 0.1);\n            backdrop-filter: blur(10px);\n            border-radius: 20px;\n            padding: 24px;\n            border: 1px solid rgba(255, 255, 255, 0.2);\n            transition: all 0.3s ease;\n            display: flex;\n            flex-direction: column;\n            justify-content: center;\n            align-items: center;\n            text-align: center;\n            color: white;\n        }\n        \n        .bento-item:hover {\n            transform: translateY(-5px);\n            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);\n        }\n        \n        .item-1 { grid-column: 1 / 3; grid-row: 1; }\n        .item-2 { grid-column: 3 / 5; grid-row: 1; }\n        .item-3 { grid-column: 1; grid-row: 2; }\n        .item-4 { grid-column: 2 / 4; grid-row: 2; }\n        .item-5 { grid-column: 4; grid-row: 2; }\n        .item-6 { grid-column: 1 / 3; grid-row: 3; }\n        .item-7 { grid-column: 3 / 5; grid-row: 3; }\n        \n        .bento-title {\n            font-size: 1.5rem;\n            font-weight: 700;\n            margin-bottom: 12px;\n            background: linear-gradient(45deg, #ffd700, #ffb347);\n            -webkit-background-clip: text;\n            -webkit-text-fill-color: transparent;\n            background-clip: text;\n        }\n        \n        .bento-text {\n            font-size: 0.9rem;\n            opacity: 0.9;\n            line-height: 1.5;\n        }\n        \n        .bento-icon {\n            font-size: 2rem;\n            margin-bottom: 16px;\n        }\n        \n        @media (max-width: 768px) {\n            .bento-container {\n                grid-template-columns: 1fr 1fr;\n                grid-template-rows: repeat(4, 150px);\n                height: auto;\n            }\n            .item-1, .item-2, .item-4, .item-6, .item-7 {\n                grid-column: 1 / 3;\n            }\n            .item-3, .item-5 { grid-column: auto; }\n        }\n    </style>\n</head>\n<body>\n    <div class="bento-container">\n        <div class="bento-item item-1">\n            <div class="bento-icon">🎨</div>\n            <h2 class="bento-title">现代设计</h2>\n            <p class="bento-text">采用最新的Bento Grid布局，让界面更加现代和优雅</p>\n        </div>\n        \n        <div class="bento-item item-2">\n            <div class="bento-icon">⚡</div>\n            <h2 class="bento-title">实时预览</h2>\n            <p class="bento-text">所见即所得的编辑体验</p>\n        </div>\n        \n        <div class="bento-item item-3">\n            <div class="bento-icon">📱</div>\n            <h2 class="bento-title">响应式</h2>\n            <p class="bento-text">完美适配各种设备</p>\n        </div>\n        \n        <div class="bento-item item-4">\n            <div class="bento-icon">🚀</div>\n            <h2 class="bento-title">HTML预览工具</h2>\n            <p class="bento-text">在左侧编辑区修改HTML代码，右侧将实时显示Bento Grid风格的效果</p>\n        </div>\n        \n        <div class="bento-item item-5">\n            <div class="bento-icon">💎</div>\n            <h2 class="bento-title">精美</h2>\n            <p class="bento-text">毛玻璃效果</p>\n        </div>\n        \n        <div class="bento-item item-6">\n            <div class="bento-icon">🔧</div>\n            <h2 class="bento-title">开发工具</h2>\n            <p class="bento-text">强大的HTML/CSS/JavaScript编辑功能</p>\n        </div>\n        \n        <div class="bento-item item-7">\n            <div class="bento-icon">🌟</div>\n            <h2 class="bento-title">体验升级</h2>\n            <p class="bento-text">全新的Bento Grid风格界面</p>\n        </div>\n    </div>\n    \n    <script>\n        console.log("Bento Grid HTML预览工具已加载");\n        \n        // 添加鼠标跟随效果\n        document.addEventListener("mousemove", (e) => {\n            const cursor = document.querySelector(".cursor");\n            if (!cursor) {\n                const newCursor = document.createElement("div");\n                newCursor.className = "cursor";\n                newCursor.style.cssText = `\n                    position: fixed;\n                    width: 20px;\n                    height: 20px;\n                    background: rgba(255, 255, 255, 0.3);\n                    border-radius: 50%;\n                    pointer-events: none;\n                    z-index: 9999;\n                    transition: transform 0.1s ease;\n                `;\n                document.body.appendChild(newCursor);\n            }\n            const cursorElement = document.querySelector(".cursor");\n            cursorElement.style.left = e.clientX - 10 + "px";\n            cursorElement.style.top = e.clientY - 10 + "px";\n        });\n    </script>\n</body>\n</html>');

        // 监听编辑器变化
        htmlEditor.on('change', updatePreview);
    }

    // 初始化多模式编辑器
    function initMultiEditors() {
        multiHtmlEditor = CodeMirror.fromTextArea(document.getElementById('multi-html-editor'), {
            mode: 'htmlmixed',
            theme: 'monokai',
            lineNumbers: true,
            autoCloseTags: true,
            autoCloseBrackets: true,
            matchBrackets: true,
            indentUnit: 4,
            tabSize: 4,
            indentWithTabs: false,
            lineWrapping: true
        });

        cssEditor = CodeMirror.fromTextArea(document.getElementById('css-editor'), {
            mode: 'css',
            theme: 'monokai',
            lineNumbers: true,
            autoCloseBrackets: true,
            matchBrackets: true,
            indentUnit: 4,
            tabSize: 4,
            indentWithTabs: false,
            lineWrapping: true
        });

        jsEditor = CodeMirror.fromTextArea(document.getElementById('js-editor'), {
            mode: 'javascript',
            theme: 'monokai',
            lineNumbers: true,
            autoCloseBrackets: true,
            matchBrackets: true,
            indentUnit: 4,
            tabSize: 4,
            indentWithTabs: false,
            lineWrapping: true
        });

        // 设置默认内容 - Bento Grid风格
        multiHtmlEditor.setValue('<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>Bento Grid 多模式预览</title>\n</head>\n<body>\n    <div class="bento-dashboard">\n        <div class="bento-card main-card">\n            <div class="card-icon">🎯</div>\n            <h1>Bento Grid 仪表板</h1>\n            <p>HTML+CSS+JS三分离模式演示</p>\n        </div>\n        \n        <div class="bento-card stats-card">\n            <div class="card-icon">📊</div>\n            <h3>统计面板</h3>\n            <div class="stats">\n                <div class="stat-item">\n                    <span class="stat-number" id="counter">0</span>\n                    <span class="stat-label">点击次数</span>\n                </div>\n            </div>\n        </div>\n        \n        <div class="bento-card action-card">\n            <div class="card-icon">🚀</div>\n            <h3>交互区域</h3>\n            <button id="demo-btn" class="bento-button">点击增加计数</button>\n            <button id="reset-btn" class="bento-button secondary">重置</button>\n        </div>\n        \n        <div class="bento-card info-card">\n            <div class="card-icon">💡</div>\n            <h3>信息展示</h3>\n            <div id="output">等待交互...</div>\n        </div>\n        \n        <div class="bento-card time-card">\n            <div class="card-icon">⏰</div>\n            <h3>实时时间</h3>\n            <div id="clock">--:--:--</div>\n        </div>\n        \n        <div class="bento-card feature-card">\n            <div class="card-icon">✨</div>\n            <h3>特性展示</h3>\n            <ul>\n                <li>响应式布局</li>\n                <li>毛玻璃效果</li>\n                <li>动画交互</li>\n            </ul>\n        </div>\n    </div>\n</body>\n</html>');

        cssEditor.setValue('* {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n}\n\nbody {\n    font-family: "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif;\n    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n    min-height: 100vh;\n    padding: 20px;\n    color: white;\n}\n\n.bento-dashboard {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n    grid-template-rows: auto;\n    gap: 20px;\n    max-width: 1400px;\n    margin: 0 auto;\n}\n\n.bento-card {\n    background: rgba(255, 255, 255, 0.1);\n    backdrop-filter: blur(10px);\n    border-radius: 20px;\n    padding: 30px;\n    border: 1px solid rgba(255, 255, 255, 0.2);\n    transition: all 0.3s ease;\n    position: relative;\n    overflow: hidden;\n}\n\n.bento-card:hover {\n    transform: translateY(-8px);\n    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);\n    background: rgba(255, 255, 255, 0.15);\n}\n\n.main-card {\n    grid-column: 1 / -1;\n    text-align: center;\n    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));\n}\n\n.card-icon {\n    font-size: 3rem;\n    margin-bottom: 15px;\n    display: block;\n}\n\n.main-card h1 {\n    font-size: 2.5rem;\n    margin-bottom: 10px;\n    background: linear-gradient(45deg, #ffd700, #ffb347);\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    background-clip: text;\n}\n\n.bento-card h3 {\n    font-size: 1.3rem;\n    margin-bottom: 15px;\n    color: #ffd700;\n}\n\n.stats {\n    display: flex;\n    justify-content: center;\n    gap: 20px;\n}\n\n.stat-item {\n    text-align: center;\n}\n\n.stat-number {\n    display: block;\n    font-size: 2rem;\n    font-weight: bold;\n    color: #4ecdc4;\n}\n\n.stat-label {\n    font-size: 0.9rem;\n    opacity: 0.8;\n}\n\n.bento-button {\n    background: linear-gradient(135deg, #4ecdc4, #44a08d);\n    color: white;\n    border: none;\n    padding: 12px 24px;\n    border-radius: 12px;\n    cursor: pointer;\n    font-size: 16px;\n    font-weight: 600;\n    margin: 8px;\n    transition: all 0.3s ease;\n    box-shadow: 0 4px 15px rgba(78, 205, 196, 0.3);\n}\n\n.bento-button:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 8px 25px rgba(78, 205, 196, 0.4);\n}\n\n.bento-button.secondary {\n    background: linear-gradient(135deg, #ff6b6b, #ee5a52);\n    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);\n}\n\n.bento-button.secondary:hover {\n    box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);\n}\n\n#output {\n    background: rgba(255, 255, 255, 0.1);\n    padding: 15px;\n    border-radius: 12px;\n    min-height: 60px;\n    border-left: 4px solid #4ecdc4;\n    font-family: "Monaco", "Consolas", monospace;\n}\n\n#clock {\n    font-size: 2rem;\n    font-weight: bold;\n    text-align: center;\n    color: #4ecdc4;\n    text-shadow: 0 0 20px rgba(78, 205, 196, 0.5);\n}\n\n.feature-card ul {\n    list-style: none;\n    padding: 0;\n}\n\n.feature-card li {\n    padding: 8px 0;\n    position: relative;\n    padding-left: 25px;\n}\n\n.feature-card li:before {\n    content: "✓";\n    position: absolute;\n    left: 0;\n    color: #4ecdc4;\n    font-weight: bold;\n}\n\n@media (max-width: 768px) {\n    .bento-dashboard {\n        grid-template-columns: 1fr;\n    }\n    \n    .main-card {\n        grid-column: 1;\n    }\n    \n    .main-card h1 {\n        font-size: 2rem;\n    }\n}');

        jsEditor.setValue('document.addEventListener("DOMContentLoaded", function() {\n    let counter = 0;\n    \n    const counterElement = document.getElementById("counter");\n    const outputElement = document.getElementById("output");\n    const demoBtn = document.getElementById("demo-btn");\n    const resetBtn = document.getElementById("reset-btn");\n    const clockElement = document.getElementById("clock");\n    \n    // 计数器功能\n    demoBtn.addEventListener("click", function() {\n        counter++;\n        counterElement.textContent = counter;\n        \n        const messages = [\n            `🎉 太棒了！计数: ${counter}`,\n            `⚡ 你点击了第 ${counter} 次！`,\n            `🚀 Bento Grid 运行中... (${counter})`,\n            `💎 精美的交互体验 #${counter}`,\n            `🌟 继续探索吧！计数: ${counter}`\n        ];\n        \n        const randomMessage = messages[Math.floor(Math.random() * messages.length)];\n        outputElement.innerHTML = `\n            <div style="opacity: 0; animation: fadeInUp 0.5s ease forwards;">\n                <strong>${randomMessage}</strong><br>\n                <small style="opacity: 0.7;">时间: ${new Date().toLocaleTimeString()}</small>\n            </div>\n        `;\n        \n        // 按钮点击动画\n        demoBtn.style.transform = "scale(0.95)";\n        setTimeout(() => {\n            demoBtn.style.transform = "scale(1)";\n        }, 150);\n    });\n    \n    // 重置功能\n    resetBtn.addEventListener("click", function() {\n        counter = 0;\n        counterElement.textContent = counter;\n        outputElement.innerHTML = "🔄 计数器已重置，开始新的计数之旅！";\n        \n        // 重置按钮动画\n        resetBtn.style.transform = "scale(0.95)";\n        setTimeout(() => {\n            resetBtn.style.transform = "scale(1)";\n        }, 150);\n    });\n    \n    // 实时时钟\n    function updateClock() {\n        const now = new Date();\n        const timeString = now.toLocaleTimeString("zh-CN", {\n            hour12: false,\n            hour: "2-digit",\n            minute: "2-digit",\n            second: "2-digit"\n        });\n        clockElement.textContent = timeString;\n    }\n    \n    // 每秒更新时钟\n    updateClock();\n    setInterval(updateClock, 1000);\n    \n    // 添加CSS动画\n    const style = document.createElement("style");\n    style.textContent = `\n        @keyframes fadeInUp {\n            from {\n                opacity: 0;\n                transform: translateY(20px);\n            }\n            to {\n                opacity: 1;\n                transform: translateY(0);\n            }\n        }\n        \n        @keyframes pulse {\n            0%, 100% { transform: scale(1); }\n            50% { transform: scale(1.05); }\n        }\n        \n        .bento-card:hover .card-icon {\n            animation: pulse 2s infinite;\n        }\n    `;\n    document.head.appendChild(style);\n    \n    // 欢迎消息\n    setTimeout(() => {\n        outputElement.innerHTML = "👋 欢迎使用 Bento Grid 仪表板！点击按钮开始体验。";\n    }, 1000);\n});');

        // 监听编辑器变化
        multiHtmlEditor.on('change', updateMultiPreview);
        cssEditor.on('change', updateMultiPreview);
        jsEditor.on('change', updateMultiPreview);
    }

    // 实时预览功能（HTML模式）
    function updatePreview() {
        if (currentMode === 'html') {
            const html = htmlEditor.getValue();
            const previewFrame = document.getElementById('preview-frame');
            const previewDocument = previewFrame.contentDocument || previewFrame.contentWindow.document;
            previewDocument.open();
            previewDocument.write(html);
            previewDocument.close();
        }
    }

    // 实时预览功能（多模式）
    function updateMultiPreview() {
        if (currentMode === 'multi') {
            const html = multiHtmlEditor.getValue();
            const css = cssEditor.getValue();
            const js = jsEditor.getValue();

            // 组合HTML、CSS和JavaScript
            const combinedHtml = html.replace('</head>', `<style>${css}</style>\n</head>`).replace('</body>', `<script>${js}</script>\n</body>`);

            const previewFrame = document.getElementById('preview-frame');
            const previewDocument = previewFrame.contentDocument || previewFrame.contentWindow.document;
            previewDocument.open();
            previewDocument.write(combinedHtml);
            previewDocument.close();
        }
    }

    // 模式切换功能
    function switchMode(mode) {
        currentMode = mode;
        
        // 更新按钮状态
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(mode + '-mode').classList.add('active');

        // 切换容器显示
        const htmlContainer = document.getElementById('html-mode-container');
        const multiContainer = document.getElementById('multi-mode-container');

        if (mode === 'html') {
            htmlContainer.style.display = 'flex';
            multiContainer.style.display = 'none';
            setTimeout(() => {
                htmlEditor.refresh();
                updatePreview();
            }, 100);
        } else if (mode === 'multi') {
            htmlContainer.style.display = 'none';
            multiContainer.style.display = 'flex';
            setTimeout(() => {
                multiHtmlEditor.refresh();
                cssEditor.refresh();
                jsEditor.refresh();
                updateMultiPreview();
            }, 100);
        }
    }

    // 在新窗口打开预览功能
    function openInNewWindow() {
        let html;
        
        if (currentMode === 'html') {
            html = htmlEditor.getValue();
        } else if (currentMode === 'multi') {
            const htmlContent = multiHtmlEditor.getValue();
            const css = cssEditor.getValue();
            const js = jsEditor.getValue();
            html = htmlContent.replace('</head>', `<style>${css}</style>\n</head>`).replace('</body>', `<script>${js}</script>\n</body>`);
        }
        
        // 创建一个blob对象，用于在新窗口中打开
        const blob = new Blob([html], { type: 'text/html;charset=UTF-8' });
        const url = URL.createObjectURL(blob);
        
        // 在新窗口中打开
        window.open(url, '_blank');
        
        // 清理创建的URL对象（延迟执行以确保新窗口已经加载完成）
        setTimeout(function() {
            URL.revokeObjectURL(url);
        }, 1000);
    }

    // 初始化编辑器
    initHtmlEditor();
    initMultiEditors();

    // 绑定模式切换事件
    document.getElementById('html-mode').addEventListener('click', () => switchMode('html'));
    document.getElementById('multi-mode').addEventListener('click', () => switchMode('multi'));

    // 绑定新窗口打开事件
    document.getElementById('open-in-new-window').addEventListener('click', openInNewWindow);

    // 初始化预览
    updatePreview();

    // 窗口大小变化时刷新编辑器
    window.addEventListener('resize', function() {
        setTimeout(() => {
            if (currentMode === 'html') {
                htmlEditor.refresh();
            } else if (currentMode === 'multi') {
                multiHtmlEditor.refresh();
                cssEditor.refresh();
                jsEditor.refresh();
            }
        }, 100);
    });
});
