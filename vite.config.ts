import {name as moduleName, production as isModuleInProductionMode} from './package.json'
import {resolve} from 'path'
import {normalizePath, defineConfig} from 'vite'
import * as fs from 'node:fs/promises'
import glob from 'fast-glob'

const input = await glob('src/**/!(*.d).(js|ts)')

const pkg = JSON.parse(
  await fs.readFile(new URL('package.json', import.meta.url).pathname, 'utf8')
)

export default defineConfig({
  envDir: './',
  build: {
    watch: isModuleInProductionMode ? null : {},
    sourcemap: true,
    lib: {
      entry: normalizePath(resolve(__dirname, 'src/index.ts')),
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: isModuleInProductionMode ? {} : {
      input,
      external: Object.keys(pkg.dependencies),
      output: {
        inlineDynamicImports: false,
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
  },
  plugins: [],
})

