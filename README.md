# Fusion LISP

## 1 - Abstract

***From Zero to Hero: A LISP without Limits!***

Fusion LISP is a LISP dialect, which works as follows:

At the start of execution, the only operator available is the "use" operator, with all other atoms
returning their own value as a string. The use operator takes each argument returned to it as a
string, and interprets them as paths or aliases to plugins for the interpreter, which are then
integrated at runtime. Said plugins contain LISP dialects, which are applied to Fusion LISP by
altering the currently available operators and their behavior. As such, free mixing of pre-existing
LISP dialects is permitted within Fusion LISP.

The absolute minimalism of its core form and the ability to indefinitely extend its functionality
at runtime render Fusion LISP essentially an ultra-distilled successor to Racket insofar as
language experimentation is concerned.

Furthermore, if used together with the
[Universal Preprocessor](https://github.com/Telos-Project/Universal-Preprocessor), its syntax
becomes just as extensible as its semantics.

## 2 - Contents

### 2.1 - Conventions

#### 2.1.1 - Parsing

Fusion LISP code, regardless of the form it's submitted in, maps to JSON style nested string lists,
with a single list acting as the root of the code. For the strings in said lists, strings which
begin and end with double quotes are considered literals, and those which do not are considered
atoms.

By default, the Fusion LISP parser will run any code passed to it through the
[Universal Preprocessor](https://github.com/Telos-Project/Universal-Preprocessor) before processing
it. Therefore, the Universal Preprocessor acts as both the macro system and the commenting system
for Fusion LISP.

Fusion LISP, by default, can accept code in LISP form, in JSON form as described above, and in
[ONE](https://github.com/Telos-Project/ONE) or
[ONE+](https://github.com/Telos-Project/ONE?tab=readme-ov-file#one-1) form.

LISP style code is considered the default practice.

If the code is written in ONE or ONE+ format, it shall be converted to a
[ONE list](https://github.com/Telos-Project/ONE?tab=readme-ov-file#2712---one-list).

#### 2.1.2 - Processing

Fusion LISP may be implemented in any way which enables operators to be executed in a recursive
LISP style flow, which allows for jumping and dynamic code restructuring at runtime, and which
allows the use operator to operate as described, on both literal and dynamic arguments.

That said, the implementation provided herein takes the following general approach:

First, it creates a context object which contains, among other things, a malleable list of
transpilation functions mapped to specific operators, a retranspilation flag, set to false by
default, a string arguments list containing arguments passed to the process, and a return value
field which represent the return value of the process. Said list contains a function for the use
operator by default.

Then, it recursively transpiles the code into the host language of the interpreter using the
operator function list, with the context object being passed to said functions. The transpiled code
may contain Universal Preprocessor directives, which will be processed before the execution of the
code.

Next, it executes the transpiled code, to which it passes the context object, and which may modify
the contents of the context object.

After the transpiled code has exited, the restranspilation flag will be checked, and if true, the
aforementioned process will repeat and the flag will reset to false. If the flag remains false
after the transpiled code has executed, the process will exit and the return value contained in the
context object will be returned.

### 2.2 - Usage

#### 2.2.1 - Running

##### 2.2.1.1 - CLI

Fusion LISP is available as both a library and an executable under the package name "fusion-lisp".

If node and npm are installed, this package can be used to run a Fusion LISP file in the terminal.

For example, if you had a Fusion LISP file called "demo.lisp", you could run it with the following
command:

    npx fusion-lisp demo.lisp

Arguments for the process may be appended to the command following the file name, like so:

    npx fusion-lisp demo.lisp arg1 arg2 arg3

#### 2.2.2 - Standard Fusion LISP

Standard Fusion LISP (SF-LISP) is a LISP dialect made to serve as the "default" dialect, and
default plugin, for Fusion LISP, granting it a minimum viable operator set to enable general
purpose imperative programming.

It is exported from the fusion-lisp npm package, and from the following CDN link:

    https://cdn.jsdelivr.net/gh/Telos-Project/Fusion-LISP/Code/standard.js

Therefore, in both the browser and the terminal, it may be integrated using the following
expression:

    (use "https://cdn.jsdelivr.net/gh/Telos-Project/Fusion-LISP/Code/standard.js")

And in the terminal specifically, the following expression may also suffice:

    (use "fusion-lisp")

###### 2.2.2.1 - Operators

###### 2.2.2.1.1 - add

The "add" operator returns the sum of its arguments, if they are all numbers, or the concatenation
of its arguments if any of them are strings.

###### 2.2.2.1.2 - and

The "and" operator returns true if all of its arguments are true, and false otherwise.

###### 2.2.2.1.3 - arguments

The "arguments" operator returns a list of the arguments passed to the current scope.

###### 2.2.2.1.4 - at

The "at" operator takes a list as its first argument, with each subsequent argument being a list
index, the first index resolving to the element in said list indexed by said index, and each
subsequent index resolving to the element in the structure resolved to by its predecessor indexed
by said index, with the operator returning what the final index resolves to.

###### 2.2.2.1.5 - break

The "break" operator breaks out of the current scope. It may take a boolean argument, which will
prevent its effect if false.

###### 2.2.2.1.6 - define

The "define" operator takes various expressions as arguments, and returns an anonymous function
with said expressions as its code.

###### 2.2.2.1.7 - divide

The "divide" operator divides its arguments in order and returns the result.

###### 2.2.2.1.8 - do

The "do" operator takes a function as its first argument, executes it with each subsequent argument
as arguments for said function, and returns the result.

###### 2.2.2.1.9 - equals

The "equals" operator returns true if all of its arguments are equal.

###### 2.2.2.1.10 - evaluate

The "evaluate" operator takes a string of code in the host language of the Fusion LISP interpreter,
executes it, and returns the result.

###### 2.2.2.1.11 - greater

The "greater" operator returns true if each of its arguments is greater than the next.

###### 2.2.2.1.12 - less

The "less" operator returns true if each of its arguments is less than the next.

###### 2.2.2.1.13 - list

The list operator returns a list of all of its arguments.

###### 2.2.2.1.14 - loop

The "loop" operator resets and continues the current scope. It may take a boolean argument, which
will prevent its effect if false.

###### 2.2.2.1.15 - multiply

The "multiply" operator returns the product of its arguments.

###### 2.2.2.1.16 - modulus

The "modulus" operator applies the modulus operation to its arguments in order and returns the
result.

###### 2.2.2.1.17 - not

The "not" operator returns true if the boolean negation of all of its arguments are true, and
returns false otherwise.

###### 2.2.2.1.18 - on

The "on" operator takes a promise as its first argument, and a function as its second argument, and
calls said function with the resolved value of said promise when said promise resolves.

###### 2.2.2.1.19 - or

The "or" operator returns true if at least one of its arguments is true, and false otherwise.

###### 2.2.2.1.20 - print

The "print" operator logs all of its arguments in order to the console.

###### 2.2.2.1.21 - random

The "random" operator returns a random number between zero and one.

###### 2.2.2.1.22 - return

The "return" operator ends its scope. It returns to its parents scope its first argument if it has
only one, and a list of its arguments if it has multiple.

###### 2.2.2.1.23 - scope

The "scope" operator establishes a scope in which its arguments may execute as expressions.

###### 2.2.2.1.24 - set

The "set" operator sets a variable in its current scope, with its first argument specifying the
alias thereof, and the second argument specifying the value.

###### 2.2.2.1.25 - size

The "size" operator takes a list or string argument and returns its length.

###### 2.2.2.1.26 - subtract

The "subtract" operator subtracts its arguments in order and returns the result.

###### 2.2.2.1.27 - xor

The "xor" operator returns true if one, and only one, of its arguments is true, and false
otherwise.

##### 2.2.2.2 - Dynamic LISP

Dynamic LISP is a LISP convention, included in SF-LISP, which allows values in lists to have keys.

A value with a key in a dynamic LISP list shall itself be nested as the third value in a sublist
added in its place to the list to which it belongs, where the first value or operator of said
sublist is a colon and the second value is the key.

By default, value keys should be strings.

For example:

    (list value1 (: "key" value2))

In the context of dynamic LISP, keyed values can be called dynamic values, and lists featuring
dynamic values can be called dynamic lists. These concepts may be applied beyond dynamic LISP.

Dynamic list values, be they dynamic or not, may be indexed by index or key.

###### 2.1.1.1.1 - Dynamic Paths

A dynamic path is a list of strings and numeric atoms which dictate a path from a root dynamic list
to a value nested therein.

Each element in the path selects a descendant of the value identified by the previous element, save
for the first element, which identifies a descendant of the root list. A string element selects by
key and a numeric element selects by index.

Dynamic paths may either be applied in child mode or descendant mode. In the former, elements may
only select from the immediate children of the values they are applied to. In the latter, they may
select the nearest matching descendant as located using a breadth first traversal.

###### 2.1.1.1.2 - Dynamic Metadata

Dynamic metadata is a dynamic list convention regarding meta dynamic lists. A meta dynamic list is
a dynamic list used for assigning properties to another dynamic list, referred to as the content
list, without embedding said properties into the content list itself.

A meta dynamic list has two values, one with the key "content", containing the content list, and
one with the key "metadata", containing a list of property lists. Property lists are dynamic lists
which have two values, one with the key "selector", containing a dynamic path to a value within the
aforementioned content, and one with the key "properties", containing a miscellaneous value to
associate with the selected value.

For example:

	(list
		(: "content" (list value1 (: "key" value2)))
		(: "metadata" (list
			(list
				(: "selector" ("key"))
				(: "properties" (list prop1 prop2))
			)
		))
	)

###### 2.1.1.1.4 - DLN

DLN (Dynamic List Notation) is a data interchange format where a file may contain a single lisp
expression which resolves either to a list or to a string, number, boolean, or null primitive.

DLN uses the list, dynamic list, and string, number, boolean, and null primitives present in
SF-LISP to encode such expressions.

DLN may use any syntax that Fusion LISP uses, but by default, in strict form, it uses LISP syntax
without the universal presprocessor. DLN may use the file extension "dln", and if in strict form,
it may also use "dlns".

###### 2.1.1.1.5 - JSON Conversion

When converting a dynamic list to JSON, a dynamic list with no dynamic values shall become a JSON
list, and a dynamic list with dynamic values shall become a JSON object, with the order of the
elements of said list preserved in the resulting object, and with non-dynamic values in said list
receiving the stringified form of their index as their key.

Ordinary lists within dynamic lists shall become JSON lists, non-stringified JSON compatible
primitive atoms or LISP style equivalents (nil = null, etc), shall become JSON primitives, and all
other atoms shall become JSON strings.

JSON content may also be converted to dynamic lists.

#### 2.2.3 - Examples

##### 2.2.3.1 - Euler Problem #1

    (use "fusion-lisp")

    (set sum 0)
    (set i 3)

    (scope

    	(scope
	
    		(break (not (or
    			(equals 0 (modulus i 3))
    			(equals 0 (modulus i 5))))
    		)
	
    		(set sum (add sum i))
    	)

    	(set i (add i 1))
    	(loop (less i 1000))
    )

    (print sum)

### 2.3 - Plugins

For the JavaScript implementation of Fusion LISP provided herein, plugins may be implemented as
JavaScript lists, where every element is an operator object.

An operator object shall have a "process" function, which shall take two arguments, the first being
the context object described in
[section 2.1.2](https://github.com/Telos-Project/Fusion-LISP?tab=readme-ov-file#212---processing),
and the second being a list of the strings returned from processing, in order, the children of the
operator. The function shall transpile the operator into code in the host language of the
interpreter, that being JavaScript in this case, and shall return said code as a string. An
operator object may also have a "tags" list of string tags for identification and classification.

The context object shall be formatted as follows:

    {
    	args: [], // The string arguments passed to the process.
    	index: [], // A numerical path from the root of the file to the current operator.
    	local: { // Details of the operator currently being processed. (For compilation use only.)
    		operator: "..." // The string content of the operator.
    		list: [] // The list and sublists for which the operator is the root.
    	},
    	list: [], // The source code of the file.
    	operators: { }, // The map of operator functions.
    	recompile: false, // The retranspilation flag. (For execution use only.)
    	state: { }, // Miscellaneous data retained between processing steps.
    	value: null // The return value of the process. (For execution use only.)
    }

A plugin may be distributed as a CommonJS module exporting an operator object list, or as an
[APInt](https://github.com/Telos-Project/APInt) JSON file with multiple utilities linking to such
CommonJS modules, identified with a "type" property containing the string "fusion-lisp".