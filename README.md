# Introduction

![Optimize the memory usage](http://blog.mgechev.com/images/one-does-not-simply-optimize-the-dirty-checking-algorithm.png)

This repository contains a set of data structures optimized for AngularJS 1.x one-way data binding.

The implementation is based on the research made here:

1. [Boost the Performance of an AngularJS Application Using Immutable Data](http://blog.mgechev.com/2015/03/02/immutability-in-angularjs-immutablejs/)
2. [Boost the Performance of an AngularJS Application Using Immutable Data - Part 2](http://blog.mgechev.com/2015/04/11/immutability-in-angularjs-immutablejs-part-2/)
3. [Even Faster AngularJS Data Structures](http://blog.mgechev.com/2015/04/20/fast-angular-data-structures-versionable/)

# Roadmap

- [x] Implement List data structure.
- [x] Create gulp build script (minification and concatenation) and externalize the utility methods.
- [x] Implement Map data structure.
- [x] Integrate with AngularJS (define as services, through `factory`).
- [ ] Register as bower and npm module.
- [ ] Make further benchmarks in order to verify whether the `VersionableList` will has better performance if it is evaluated by AngularJS as array like (no need to call `hasOwnProperty` on `_version`).

# License

MIT
