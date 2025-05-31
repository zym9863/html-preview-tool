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

        // 设置默认HTML内容
        htmlEditor.setValue('<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>预览页面</title>\n    <style>\n        body {\n            font-family: Arial, sans-serif;\n            margin: 20px;\n            line-height: 1.6;\n        }\n        h1 {\n            color: #2c3e50;\n        }\n    </style>\n</head>\n<body>\n    <h1>欢迎使用HTML预览工具</h1>\n    <p>在左侧编辑区修改HTML代码（可包含CSS和JS），右侧将实时显示效果</p>\n    <script>\n        console.log("HTML预览工具已加载");\n    </script>\n</body>\n</html>');

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

        // 设置默认内容
        multiHtmlEditor.setValue('<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>多模式预览</title>\n</head>\n<body>\n    <h1>HTML+CSS+JS模式</h1>\n    <p>在三个编辑区分别编辑HTML、CSS和JavaScript代码</p>\n    <button id="demo-btn">点击我！</button>\n    <div id="output"></div>\n</body>\n</html>');

        cssEditor.setValue('body {\n    font-family: Arial, sans-serif;\n    margin: 20px;\n    line-height: 1.6;\n    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n    color: white;\n}\n\nh1 {\n    color: #ffd700;\n    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);\n}\n\n#demo-btn {\n    background: #ff6b6b;\n    color: white;\n    border: none;\n    padding: 10px 20px;\n    border-radius: 5px;\n    cursor: pointer;\n    font-size: 16px;\n    margin: 10px 0;\n}\n\n#demo-btn:hover {\n    background: #ff5252;\n    transform: scale(1.05);\n    transition: all 0.3s ease;\n}\n\n#output {\n    background: rgba(255,255,255,0.1);\n    padding: 15px;\n    border-radius: 8px;\n    margin-top: 15px;\n    min-height: 50px;\n}');

        jsEditor.setValue('document.addEventListener("DOMContentLoaded", function() {\n    const btn = document.getElementById("demo-btn");\n    const output = document.getElementById("output");\n    \n    btn.addEventListener("click", function() {\n        const messages = [\n            "太棒了！🎉",\n            "你点击了按钮！✨",\n            "JavaScript正在工作！⚡",\n            "多模式预览成功！🚀",\n            "继续探索吧！🌟"\n        ];\n        \n        const randomMessage = messages[Math.floor(Math.random() * messages.length)];\n        output.innerHTML = `<p><strong>输出：</strong>${randomMessage}</p><p><small>点击时间：${new Date().toLocaleTimeString()}</small></p>`;\n        \n        // 添加动画效果\n        output.style.animation = "none";\n        setTimeout(() => {\n            output.style.animation = "fadeIn 0.5s ease-in";\n        }, 10);\n    });\n});\n\n// 添加CSS动画\nconst style = document.createElement("style");\nstyle.textContent = `\n    @keyframes fadeIn {\n        from { opacity: 0; transform: translateY(10px); }\n        to { opacity: 1; transform: translateY(0); }\n    }\n`;\ndocument.head.appendChild(style);');

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
