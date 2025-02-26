const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
// child_process: Node.js 内置模块，用于执行系统命令。execSync 是其中的一个函数，用于同步执行 shell 命令并返回结果。
// fs: Node.js 内置模块，用于文件系统操作。fs.writeFileSync 用于同步写入文件。
// path: Node.js 内置模块，用于处理文件路径。path.join 用于拼接路径。

// ChangelogPlugin: 这是一个自定义的 Webpack 插件类。Webpack 插件通常是一个类，包含一个 apply 方法。
// apply(compiler): 这是 Webpack 插件的入口方法。compiler 是 Webpack 的核心对象，提供了各种钩子（hooks）来扩展 Webpack 的功能。
class ChangelogPlugin {
    apply(compiler) {
        compiler.hooks.afterEmit.tap('ChangelogPlugin', (compilation) => {
            // compiler.hooks.afterEmit: 这是 Webpack 的一个钩子，表示在资源被输出到输出目录之后执行。
            // .tap('ChangelogPlugin', (compilation) => { ... }): 
            // 使用 tap 方法注册一个回调函数，当 afterEmit 钩子触发时执行。
            // ChangelogPlugin 是插件的名称，compilation 是 Webpack 的编译对象，包含了当前编译的所有信息。
            // 获取 git log 信息
            const changelog = execSync('git log --oneline -n 5').toString(); // 获取最近5条提交信息

            // 生成 README 文件内容
            const readmeContent = `# Changelog\n\n${changelog}`;

            // 确定输出路径
            const outputPath = compilation.options.output.path || path.resolve('dist');
            const readmePath = path.join(outputPath, 'README.md');

            // 写入 README 文件
            fs.writeFileSync(readmePath, readmeContent);

        });
    }
}

module.exports = ChangelogPlugin;