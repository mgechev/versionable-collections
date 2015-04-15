# Introduction

This repository contains a set of data structures optimized for AngularJS 1.x one-way data binding.

The implementation is based on the research made here:

1. [Boost the Performance of an AngularJS Application Using Immutable Data](http://blog.mgechev.com/2015/03/02/immutability-in-angularjs-immutablejs/)
2. [Boost the Performance of an AngularJS Application Using Immutable Data - Part 2](http://blog.mgechev.com/2015/04/11/immutability-in-angularjs-immutablejs-part-2/)

# Roadmap

- [x] Implement a List data structure.
- [ ] Implement a Map data structure.
- [ ] Integrate with AngularJS (define as services, through `factory`).
- [ ] Create gulp build script (minification and concatenation) and externalize the utility methods.
- [ ] Register as bower and npm modules.
- [ ] Make further benchmarks in order to verify whether the `VersionableList` will has better performance if it is evaluated by AngularJS as array like (no need to call `hasOwnProperty` on `_version`).

# License

MIT
