import { rmSync } from 'node:fs';
import path from 'node:path';
import { AliasOptions, defineConfig, ResolveOptions } from 'vite';
import electron from 'vite-plugin-electron/simple';

import react from '@vitejs/plugin-react-swc';

import pkg from './package.json';

const resolve: ResolveOptions & {
    alias?: AliasOptions;
} = {
    alias: {
        '@': path.join(__dirname, 'src')
    }
};

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
    rmSync('dist-electron', { recursive: true, force: true });

    const isServe = command === 'serve';
    const isBuild = command === 'build';
    const sourcemap = isServe || !!process.env.VSCODE_DEBUG;

    return {
        resolve: resolve,
        plugins: [
            react(),
            electron({
                main: {
                    // Shortcut of `build.lib.entry`
                    entry: 'src/main/index.ts',
                    onstart(args) {
                        if (process.env.VSCODE_DEBUG) {
                            console.log(
                                /* For `.vscode/.debug.script.mjs` */ '[startup] Electron App'
                            );
                        } else {
                            args.startup();
                        }
                    },
                    vite: {
                        resolve: resolve,
                        build: {
                            sourcemap,
                            minify: isBuild,
                            outDir: 'dist-electron/main',
                            rollupOptions: {
                                external: Object.keys('dependencies' in pkg ? pkg.dependencies : {})
                            }
                        }
                    }
                },
                preload: {
                    // Shortcut of `build.rollupOptions.input`.
                    // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
                    input: 'src/preload/index.ts',
                    vite: {
                        resolve: resolve,
                        build: {
                            sourcemap: sourcemap ? 'inline' : undefined, // #332
                            minify: isBuild,
                            outDir: 'dist-electron/preload',
                            rollupOptions: {
                                external: Object.keys('dependencies' in pkg ? pkg.dependencies : {})
                            }
                        }
                    }
                },
                // Polyfill the Electron and Node.js API for Renderer process.
                // If you want to use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
                // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
                renderer: {}
            })
        ],
        server:
            process.env.VSCODE_DEBUG &&
            (() => {
                const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL);
                return {
                    host: url.hostname,
                    port: +url.port
                };
            })(),
        clearScreen: false
    };
});
