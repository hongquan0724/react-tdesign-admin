import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({command, mode})=>{
  console.log(mode);
  const baseUrl = mode === 'development' ? '/' : '/react-tdesign-admin/'
  return {
    base: baseUrl,
    plugins: [
        react(),
    ],
    server:{
      host:'0.0.0.0',
      port:3000
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      brotliSize: false, // 设置为false将禁用构建的brotli压缩大小报告。可以稍微提高构建速度
      minify: true, // 开启压缩
      esbuild: {
        drop: ['console', 'debugger']
      },
      rollupOptions: {
        experimentalMinChunkSize: 10*1024, // 单位b
        treeshake: true, // 开启 Tree Shaking，消除未使用的代码，减小最终的包大小
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor'; // 将 node_modules 中的依赖拆分成 vendor 文件
            }
          },
          commonjsOptions: {
            requireReturnsDefault: 'namespace', // 要求ES模块返回其名称空
          }
        }
      }
    },
    resolve:{
      alias:{
        '@':path.resolve(__dirname,'src')
      }
    }
  }
})
