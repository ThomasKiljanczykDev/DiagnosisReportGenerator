// @ts-check
import * as fs from 'node:fs/promises';
import { codegen } from 'swagger-axios-codegen';

await fs.rm('./src/services', { recursive: true, force: true });
await codegen({
    methodNameMode: 'operationId',
    remoteUrl: 'http://localhost:5185/swagger/v1/swagger.json',
    outputDir: './src/services'
});
