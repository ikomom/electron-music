// 导入路径下的所有svg
const req = require.context('@/assets/svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

if (process.env.NODE_ENV === 'development') {
  const svgIcons = requireAll(req).map(i => {
    return i.default.id
  })
  console.log('%c[@/assets/svg] [svg 本地导入]', 'color: #d94537;font-size: 13px;font-weight: bold;text-decoration: underline;', svgIcons)
}


