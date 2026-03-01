import * as esbuild from 'esbuild';
import { fileURLToPath } from 'url';

async function buildAndRun() {
    await esbuild.build({
        entryPoints: ['render-test.tsx'],
        bundle: true,
        outfile: 'render-test-bundle.js',
        platform: 'node',
        format: 'esm', // Ensure esm output
        external: ['react', 'react-dom']
    });
    console.log("Build complete, running...");
    await import('./render-test-bundle.js');
}

buildAndRun().catch(console.error);
