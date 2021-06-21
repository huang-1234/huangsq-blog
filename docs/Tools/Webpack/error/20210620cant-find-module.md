# 学习webpack遇到的坑

因为各个版本的不同的原因导致老师报错

```bash
$ yarn dev
yarn run v1.22.10
$ cross-env NODE_ENV=development webpack-dev-server --config build/webpack.config.js
internal/modules/cjs/loader.js:883
  throw err;
  ^

Error: Cannot find module 'webpack-cli/bin/config-yargs'
Require stack:
- G:\Study\Code\Web\vue\VueProject\vue3ts\node_modules\webpack-dev-server\bin\webpack-dev-server.js
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:880:15)
    at Function.Module._load (internal/modules/cjs/loader.js:725:27)
    at Module.require (internal/modules/cjs/loader.js:952:19)
    at require (internal/modules/cjs/helpers.js:88:18)
    at Object.<anonymous> (G:\Study\Code\Web\vue\VueProject\vue3ts\node_modules\webpack-dev-server\bin\webpack-dev-server.js:65:1)
    at Module._compile (internal/modules/cjs/loader.js:1063:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1092:10)
    at Module.load (internal/modules/cjs/loader.js:928:32)
    at Function.Module._load (internal/modules/cjs/loader.js:769:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:72:12) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [
    'G:\\Study\\Code\\Web\\vue\\VueProject\\vue3ts\\node_modules\\webpack-dev-server\\bin\\webpack-dev-server.js'
  ]
}
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

### 因为将index.html写成了idnex.html导致的编译错误

这个也没得提示

```bash
$ yarn dev
yarn run v1.22.10
$ cross-env NODE_ENV=development webpack-dev-server --config build/webpack.config.js
i ｢wds｣: Project is running at http://localhost:8088/
i ｢wds｣: webpack output is served from /
i ｢wds｣: Content not from webpack is served from G:\Study\Code\Web\vue\VueProject\vue3ts
i ｢wdm｣: wait until bundle finished: /
× ｢wdm｣: 
ERROR in   Error: Child compilation failed:
  Entry module not found: Error: Can't resolve 'G:\Study\Code\Web\vue\VueProject\vue3ts\public\index.html' in 'G:\Study\Code\Web\vue\VueProject\vue3ts':
  Error: Can't resolve 'G:\Study\Code\Web\vue\VueProject\vue3ts\public\index.html' in 'G:\Study\Code\Web\vue\VueProject\vue3ts'
  EntryModuleNotFoundError: Entry module not found: Error: Can't resolve 'G:\Study\Code\Web\vue\VueProject\vue3ts\public\index.html' in 'G:\Study\Code\Web\vue\VueProj  ect\vue3ts'

  - Compilation.js:1075
    [vue3ts]/[webpack]/lib/Compilation.js:1075:31

  - NormalModuleFactory.js:401
    [vue3ts]/[webpack]/lib/NormalModuleFactory.js:401:22

  - NormalModuleFactory.js:130
    [vue3ts]/[webpack]/lib/NormalModuleFactory.js:130:21

  - NormalModuleFactory.js:224
    [vue3ts]/[webpack]/lib/NormalModuleFactory.js:224:22

  - async.js:2830
    [vue3ts]/[neo-async]/async.js:2830:7

  - async.js:6877
    [vue3ts]/[neo-async]/async.js:6877:13

  - NormalModuleFactory.js:214
    [vue3ts]/[webpack]/lib/NormalModuleFactory.js:214:25

  - Resolver.js:213
    [vue3ts]/[enhanced-resolve]/lib/Resolver.js:213:14

  - Resolver.js:285
    [vue3ts]/[enhanced-resolve]/lib/Resolver.js:285:5

  - child-compiler.js:131
    [vue3ts]/[html-webpack-plugin]/lib/child-compiler.js:131:18

  - Compiler.js:343
    [vue3ts]/[webpack]/lib/Compiler.js:343:11

  - Compiler.js:681
    [vue3ts]/[webpack]/lib/Compiler.js:681:15

  - Hook.js:154 AsyncSeriesHook.lazyCompileHook
    [vue3ts]/[tapable]/lib/Hook.js:154:20

  - Compiler.js:678
    [vue3ts]/[webpack]/lib/Compiler.js:678:31


  - Hook.js:154 AsyncSeriesHook.lazyCompileHook
    [vue3ts]/[tapable]/lib/Hook.js:154:20

  - Compilation.js:1423
    [vue3ts]/[webpack]/lib/Compilation.js:1423:35

i ｢wdm｣: Failed to compile.
```

### 又因为单词production多写了个t的原因报错

```bash
 yarn build
yarn run v1.22.10
$ cross-env NODE_ENV=production webpack --config build/webpack.config.js
Invalid configuration object. Webpack has been initialised using a configuration object that does not match the API schema.
 - configuration.mode should be one of these:
   "development" | "production" | "none"
   -> Enable production optimizations or development hints.
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

