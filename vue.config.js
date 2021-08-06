const path = require("path");
const isProd = process.env.NODE_ENV === "production";

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  assetsDir: 'public',
  // productionSourceMap: true,
  devServer: {
    open: !process.argv.includes("electron:serve"),
    host: "localhost",
    port: 8080,
    https: false,
    hotOnly: false,
  },
  configureWebpack: {
    devtool: 'source-map',
    entry: "./src/renderer/main.js",
    resolve: {
      extensions: [".js", ".vue", ".json", ".ts", ".less"],
      alias: {
        "@": resolve("src/renderer"),
      },
    },
    // 公共资源合并
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: "all",
            test: /node_modules/,
            name: "vendor",
            minChunks: 1,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 100,
          },
          common: {
            chunks: "all",
            test: /[\\/]src[\\/]js[\\/]/,
            name: "common",
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 60,
          },
          styles: {
            name: "styles",
            test: /\.(sa|sc|le|c)ss$/,
            chunks: "all",
            enforce: true,
          },
          runtimeChunk: {
            name: "manifest",
          },
        },
      },
    },
  },

  // 打包输出路径
  outputDir: "dist/web",
  // css配置 https://cli.vuejs.org/zh/config/#css-modules
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: isProd,
    // 开启 CSS source maps?
    sourceMap: !isProd,
    // css预设器配置项
    loaderOptions: {
      // less: {
      //   modifyVars: {
      //     "primary-color": "#c62f2f",
      //     "link-color": "#c62f2f",
      //     "border-radius-base": "4px",
      //   },
      //   javascriptEnabled: true,
      // },
      scss: {
        additionalData: `@import "~@/assets/theme/common.scss";`
      }
    },
    requireModuleExtension: true,

  },
  chainWebpack(config) {
    // 本地svg图标处理
    // https://juejin.cn/post/6844903517564436493#heading-0
    config.module
      .rule('svg')
      .exclude.add(resolve('src/renderer/assets/svg'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/renderer/assets/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  pluginOptions: {
    // vue-cli-plugin-electron-builder配置
    // https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/configuration.html#configuring-electron-builder
    electronBuilder: {
      nodeIntegration: true, // 渲染进程可以使用node api
      outputDir: "dist/electron",
      mainProcessFile: 'src/main/background.js',// 主进程入口
      mainProcessWatch: ["src/main"],
      // 打包选项
      builderOptions: {
        win: {
          icon: "build_assets/electron-icon/icon.ico",
          // 图标路径 windows系统中icon需要256*256的ico格式图片，更换应用图标亦在此处
          target: [
            {
              // 打包成一个独立的 exe 安装程序
              target: "nsis",
              // 这个意思是打出来32 bit + 64 bit的包，但是要注意：这样打包出来的安装包体积比较大，所以建议直接打32的安装包。
              arch: [
                "x64",
                // 'ia32'
              ],
            },
          ],
        },
        dmg: {
          contents: [
            {
              x: 410,
              y: 150,
              type: "link",
              path: "/Applications",
            },
            {
              x: 130,
              y: 150,
              type: "file",
            },
          ],
        },
        linux: {
          icon: "build_assets/electron-icon/icon.png",
          target: "AppImage",
        },
        mac: {
          icon: "build_assets/electron-icon/icon.icns",
        },
        files: ["**/*"],
        asar: true,
        nsis: {
          // 是否一键安装，建议为 false，可以让用户点击下一步、下一步、下一步的形式安装程序，如果为true，当用户双击构建好的程序，自动安装程序并打开，即：一键安装（one-click installer）
          oneClick: false,
          // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          allowElevation: true,
          // 允许修改安装目录，建议为 true，是否允许用户改变安装目录，默认是不允许
          allowToChangeInstallationDirectory: true,
          // 安装图标
          installerIcon: "build_assets/electron-icon/icon.ico",
          // 卸载图标
          uninstallerIcon: "build_assets/electron-icon/icon.ico",
          // 安装时头部图标
          installerHeaderIcon: "build_assets/electron-icon/icon.ico",
          // 创建桌面图标
          createDesktopShortcut: true,
          // 创建开始菜单图标
          createStartMenuShortcut: true,
        },
      },
      chainWebpackMainProcess: (config) => {
        config.plugin("define").tap((args) => {
          args[0]["IS_ELECTRON"] = true;
          return args;
        });
      },
      chainWebpackRendererProcess: (config) => {
        config.plugin("define").tap((args) => {
          args[0]["IS_ELECTRON"] = true;
          return args;
        });
      },
    }
  }
}
