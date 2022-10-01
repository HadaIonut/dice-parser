import {name as moduleName, production as isModuleInProductionMode} from './package.json'
import {resolve} from 'path'
import {normalizePath, defineConfig} from 'vite'

export default defineConfig({
  build: {
    watch: isModuleInProductionMode ? null : {},
    sourcemap: true,
    lib: {
      entry: normalizePath(resolve(__dirname, 'src/index.ts')),
      fileName: 'index',
      formats: ['es'],
    },
  },
})

