# ptz-log-file

[![Build Status](https://travis-ci.org/polutz/ptz-log-file.svg)](https://travis-ci.org/polutz/ptz-log-file)
[![NPM](https://img.shields.io/npm/v/ptz-log-file.svg)](https://www.npmjs.com/package/ptz-log-file)
[![codecov.io](http://codecov.io/github/polutz/ptz-log-file/coverage.svg)](http://codecov.io/github/polutz/ptz-log-file)
[![Dependency Status](https://gemnasium.com/polutz/ptz-log-file.svg)](https://gemnasium.com/polutz/ptz-log-file)
[![bitHound Score](https://www.bithound.io/github/gotwarlost/istanbul/badges/score.svg)](https://www.bithound.io/github/polutz/ptz-log-file)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

## Traduções
[pt-br](https://github.com/polutz/ptz-log-file/blob/master/README.pt-br.md)
[en-us](https://github.com/polutz/ptz-log-file/blob/master/README.md)

ptz-log-file é um incrível módulo para escrever seus logs em arquivos.


## Como usar

### Instalação
```
    npm install --save ptz-log-file
```

### Como usar
```javascript
    import LogFile from ptz-log-file;
    const log = logFile({ dir: './logs' });

    log('Hi!');
```


## Contribuir com o projeto

### NPM Global packages
```
    npm install -g ts-node babel-cli
```

### Instalação
```
    npm install   
```

### Teste
```
    npm test
```
