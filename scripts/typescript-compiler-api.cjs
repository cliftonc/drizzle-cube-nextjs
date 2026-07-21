const Module = require('node:module');

const compilerApiPath = require.resolve('typescript-compiler-api');
const originalResolveFilename = Module._resolveFilename;

Module._resolveFilename = function resolveTypescriptCompilerApi(request, parent, isMain, options) {
  const normalizedRequest = request.replaceAll('\\\\', '/');
  if (normalizedRequest.endsWith('/node_modules/typescript/lib/typescript.js')) {
    return compilerApiPath;
  }

  if (request === 'typescript') {
    const parentFile = parent?.filename ?? '';
    if (parentFile.includes(`${require('node:path').sep}node_modules${require('node:path').sep}`)) {
      return compilerApiPath;
    }
  }

  return originalResolveFilename.call(this, request, parent, isMain, options);
};
