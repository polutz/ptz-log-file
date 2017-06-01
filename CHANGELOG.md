## master


## 1.0.5 (June 1, 2017)

* Fix sub folder creation.
* Update ptz-log.

## 1.0.4 (May 13, 2017)

* Add custom log feature    
    -Now you can pass a custom log format function
```javascript
        const log = LogFile({
            log: (...args) => {
                console.log('---custom--->>', ...args);
                done();
            }
        });
        log('works');
```

* Add docs by typedocs  

## 1.0.3 (April 28, 2017)

* Transpiling Typescript to esnext.

## 1.0.2 (April 19, 2017)

* Fix TypeError: Cannot convert object to primitive value.

## 1.0.1 (April 14, 2017)

* Fix error Cannot convert object to primitive value.

## 1.0.0 (April 14, 2017)

* Initial public release.
