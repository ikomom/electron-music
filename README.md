# electron-vue-project

## Project setup

```shell
yarn install
```

## Compiles and hot-reloads for development

dev
```shell
electron:serve 
```

or debug mian process in your IDE, for me is webstorm

```shell
electron:debug # debug包
electron:main:debug # 打开主界面

```

### Build package

```shell
electron:build
```

### Add Svg

add all svg assets to `src/renderer/assets/svg`, then `svg-sprite-loader` will auto import it to project

```vue
src/renderer/assets/svg
+ music.svg

<icon-svg icon-class="music" />

```