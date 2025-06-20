# Fusion LISP

## 1 - Abstract

***From Zero to Hero: A LISP without Limits!***

Fusion LISP is a LISP dialect, which works as follows:

At the start of execution, the only operator available is the "use" operator, with all other atoms
returning their own value as a string. The use operator takes each argument returned to it as a
string, and interprets them as paths or aliases to plugins for the interpreter, which are then
integrated at runtime. Said plugins may add or remove available operators, which themselves may
have any effect.

The absolute minimalism of its core form and the ability to indefinitely extend its functionality
at runtime render Fusion LISP essentially an ultra-distilled successor to Racket insofar as
language experimentaion is concerned.

Furthermore, if used together with the
[Universal Preprocessor](https://github.com/Telos-Project/Universal-Preprocessor), its syntax
becomes just as extensible as semantics.