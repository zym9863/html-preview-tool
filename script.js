document.addEventListener('DOMContentLoaded', function() {
    // 初始化编辑器
    const htmlEditor = CodeMirror.fromTextArea(document.getElementById('html-editor'), {
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

    // 编辑器已默认显示，无需标签切换功能

    // 实时预览功能
    function updatePreview() {
        const html = htmlEditor.getValue();
        
        const previewFrame = document.getElementById('preview-frame');
        
        const previewDocument = previewFrame.contentDocument || previewFrame.contentWindow.document;
        previewDocument.open();
        previewDocument.write(html);
        previewDocument.close();
    }

    // 在新窗口打开预览功能
    document.getElementById('open-in-new-window').addEventListener('click', function() {
        const html = htmlEditor.getValue();
        
        // 创建一个blob对象，用于在新窗口中打开
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        // 在新窗口中打开
        window.open(url, '_blank');
        
        // 清理创建的URL对象（延迟执行以确保新窗口已经加载完成）
        setTimeout(function() {
            URL.revokeObjectURL(url);
        }, 1000);
    });

    // 监听编辑器变化
    htmlEditor.on('change', updatePreview);

    // 初始化预览
    updatePreview();

    // 窗口大小变化时刷新编辑器
    window.addEventListener('resize', function() {
        htmlEditor.refresh();
    });
});