// The code template begins here
"use strict";

(function () {

  var __amdDefs__ = {};

  // The class definition is here...
  // let the private classes out

  var ASTEval_prototype = function ASTEval_prototype() {
    // Then create the traits and subclasses for this class here...

    // trait comes here...

    (function (_myTrait_) {

      // Initialize static variables here...

      /**
       * Binds event name to event function
       * @param string en  - Event name
       * @param float ef
       */
      _myTrait_.on = function (en, ef) {
        if (!this._ev) this._ev = {};
        if (!this._ev[en]) this._ev[en] = [];

        this._ev[en].push(ef);
        return this;
      };

      /**
       * @param float name
       * @param float fn
       */
      _myTrait_.removeListener = function (name, fn) {
        if (!this._ev) return;
        if (!this._ev[name]) return;

        var list = this._ev[name];

        for (var i = 0; i < list.length; i++) {
          if (list[i] == fn) {
            list.splice(i, 1);
            return;
          }
        }
      };

      /**
       * triggers event with data and optional function
       * @param string en
       * @param float data
       * @param float fn
       */
      _myTrait_.trigger = function (en, data, fn) {

        if (!this._ev) return;
        if (!this._ev[en]) return;
        var me = this;
        this._ev[en].forEach(function (cb) {
          cb(data, fn);
        });
        return this;
      };
    })(this);

    (function (_myTrait_) {
      var _cnt;
      var _eventLoop;
      var _isUndef;
      var _undefined;
      var _isDeclared;
      var _wrapValue;
      var _toValue;

      // Initialize static variables here...

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.ArrayExpression = function (node, ctx) {

        var me = this;

        // Check values...
        if (node.elements && node.elements.length >= 0) {
          // Walk the array elements
          this.out("[");
          var cnt = 0;
          node.elements.forEach(function (e) {
            if (cnt++ > 0) me.out(",");
            me.trigger("ArrayElement", e);
            me.walk(e, ctx);
          });
          this.out("]");

          node.eval_res = [];
          node.elements.forEach(function (e) {
            var v = e.eval_res || me.evalVariable(e, ctx);
            node.eval_res.push(v);
          });
        }
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.ArrayPattern = function (node, ctx) {
        var me = this;

        // Check values...
        if (node.elements && node.elements.length > 0) {
          // Walk the array elements
          this.out("[");
          var cnt = 0;
          node.elements.forEach(function (e) {
            if (cnt++ > 0) me.out(",");
            me.trigger("ArrayElement", e);
            me.walk(e, ctx);
          });
          this.out("]");
        }
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.ArrowExpression = function (node, ctx) {};

      /**
       * @param Object node
       * @param float ctx
       */
      _myTrait_.ArrowFunctionExpression = function (node, ctx) {

        this.out("function");

        if (node.generator) {
          this.trigger("FunctionGenerator", node);
          this.out("* ");
        }

        if (node.id && node.id.name) {
          console.log("ERROR: ArrowFunctionExpression should not have name");
          this.trigger("FunctionName", node);
          this.out(" " + node.id.name + " ");
        } else {
          this.trigger("FunctionAnonymous", node);
        }

        var me = this;
        this.out("(");
        var cnt = 0;

        node.params.forEach(function (p) {
          if (cnt++ > 0) me.out(",");
          me.trigger("FunctionParam", p);
          me.walk(p, ctx);
          if (node.defaults && node.defaults[cnt - 1]) {
            var defP = node.defaults[cnt - 1];
            me.out("=");
            me.trigger("FunctionDefaultParam", defP);
            me.walk(defP, ctx);
          }
        });

        this.out(")");
        me.trigger("FunctionBody", node.body);
        this.walk(node.body, ctx);
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.AssignmentExpression = function (node, ctx) {

        this.trigger("AssigmentLeft", node.left);
        this.walk(node.left, ctx);
        this.out(" " + node.operator + " ");
        this.trigger("AssigmentRight", node.right);
        this.walk(node.right, ctx);

        var value = node.right.eval_res;
        if (!_isDeclared(value)) value = this.evalVariable(node.right, ctx);

        if (node.operator == "=") {
          // does have name???

          if (node.left.type == "MemberExpression") {

            var obj, prop;
            if (typeof node.left.object.eval_res != "undefined") {
              obj = node.left.object.eval_res;
            } else {
              obj = this.evalVariable(node.left.object, ctx);
            }
            if (node.left.computed) {
              if (typeof node.left.property.eval_res != "undefined") {
                prop = this.evalVariable(node.left.property.eval_res, ctx);
              } else {
                prop = this.evalVariable(node.left.property.name, ctx);
              }
            } else {
              prop = node.left.property.name;
            }
            if (obj && prop) {
              obj[prop] = value;
            }
            return;
          }

          this.assignTo(node.left.name, ctx, value);
        }

        /*
        Assignment	x = y	x = y
        Addition assignment	x += y	x = x + y
        Subtraction assignment	x -= y	x = x - y
        Multiplication assignment	x *= y	x = x * y
        Division assignment	x /= y	x = x / y
        Remainder assignment	x %= y	x = x % y
        Exponentiation assignment	x **= y	x = x ** y
        Left shift assignment	x <<= y	x = x << y
        Right shift assignment	x >>= y	x = x >> y
        Unsigned right shift assignment	x >>>= y	x = x >>> y
        Bitwise AND assignment	x &= y	x = x & y
        Bitwise XOR assignment	x ^= y	x = x ^ y
        Bitwise OR assignment	x |= y	x = x | y
        */
      };

      /**
       * @param String varName
       * @param Object ctx
       * @param Object value
       */
      _myTrait_.assignTo = function (varName, ctx, value) {
        var name;
        if (typeof varName == "object") {
          var node = varName;
          if (node.type == "Identifier") {
            name = node.name;
          }
          if (node.type == "Literal") {
            name = node.value;
          }
        } else {
          name = varName;
        }

        if (this.findAndSetLet(name, ctx, value)) {
          return;
        }

        // does the context have this variable?
        if (_isDeclared(ctx.variables[name])) {
          ctx.variables[name] = _wrapValue(value);
        } else {
          if (ctx.parentCtx) {
            this.assignTo(name, ctx.parentCtx, value);
          }
        }
      };

      /**
       * @param Object node
       * @param float ctx
       */
      _myTrait_.BinaryExpression = function (node, ctx) {

        // var logicals = ["==", "<=", ">=", "==", "===", "!=", ]

        var bLeftNeedsPar = true,
            bRightNeedsPar = true;
        if (node.left.type == "Identifier" || node.left.type == "Literal") {
          bLeftNeedsPar = false;
        }
        if (node.right.type == "Identifier" || node.right.type == "Literal") {
          bRightNeedsPar = false;
        }

        if (bLeftNeedsPar) this.out("(");
        this.walk(node.left, ctx);
        if (bLeftNeedsPar) this.out(")");

        this.out(" " + node.operator + " ");

        if (bRightNeedsPar) this.out("(");
        this.walk(node.right, ctx);
        if (bRightNeedsPar) this.out(")");

        // evaluate the binary expression
        var a = node.left.eval_res,
            b = node.right.eval_res;

        if (!_isDeclared(a)) a = this.evalVariable(node.left, ctx);
        if (!_isDeclared(b)) b = this.evalVariable(node.right, ctx);

        if (!_isUndef(a) && !_isUndef(b)) {

          // ?? should result be object with value ?

          if (node.operator == "+") node.eval_res = a + b;
          if (node.operator == "-") node.eval_res = a - b;
          if (node.operator == "*") node.eval_res = a * b;
          if (node.operator == "/") node.eval_res = a / b;
          if (node.operator == "<") node.eval_res = a < b;
          if (node.operator == "<=") node.eval_res = a <= b;
          if (node.operator == ">") node.eval_res = a > b;
          if (node.operator == ">=") node.eval_res = a >= b;
          if (node.operator == "&") node.eval_res = a & b;
          if (node.operator == "==") node.eval_res = a == b;
          if (node.operator == "!=") node.eval_res = a != b;
          if (node.operator == "===") node.eval_res = a === b;
          if (node.operator == "!==") node.eval_res = a !== b;
        } else {
          console.error("Undefined variable in BinaryExpression");
        }
        /*
        Equal (==)	Returns true if the operands are equal.	3 == var1
        "3" == var1
        3 == '3'
        Not equal (!=)	Returns true if the operands are not equal.	var1 != 4
        var2 != "3"
        Strict equal (===)	Returns true if the operands are equal and of the same type. See also Object.is and sameness in JS.	3 === var1
        Strict not equal (!==)	Returns true if the operands are of the same type but not equal, or are of different type.	var1 !== "3"
        3 !== '3'
        Greater than (>)	Returns true if the left operand is greater than the right operand.	var2 > var1
        "12" > 2
        Greater than or equal (>=)	Returns true if the left operand is greater than or equal to the right operand.	var2 >= var1
        var1 >= 3
        Less than (<)	Returns true if the left operand is less than the right operand.	var1 < var2
        "2" < 12
        Less than or equal (<=)	Returns true if the left operand is less than or equal to the right operand.	var1 <= var2
        var2 <= 5
        */
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.BlockStatement = function (node, ctx) {

        // keeps at the same context right now I guess....

        var blockCtx = {
          block: true,
          functions: {},
          vars: {},
          letVars: {},
          constVars: {},
          parentCtx: ctx
        };

        var pCtx = ctx;
        while (pCtx && pCtx.block) {
          pCtx = pCtx.parentCtx;
        }

        Object.defineProperty(blockCtx, "variables", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: pCtx.variables
        });

        this.out(" {", true);
        this.indent(1);
        this.walk(node.body, blockCtx, true);
        this.indent(-1);
        this.out("}");
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.BreakStatement = function (node, ctx) {
        this.nlIfNot();
        this.out("break ");
        if (node.label) this.walk(node.label, ctx);
        this.out("", true);
      };

      /**
       * @param float t
       */
      _myTrait_.breakWalk = function (t) {

        this._breakWalk = true;
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.CallExpression = function (node, ctx) {
        if (node.callee) {
          if (node.callee.type == "FunctionExpression") this.out("(");
          this.walk(node.callee, ctx);
          if (node.callee.type == "FunctionExpression") this.out(")");
          this.out("(");
          if (node.arguments) {
            var me = this,
                cnt = 0;
            node.arguments.forEach(function (n) {
              if (cnt++ > 0) me.out(", ");
              me.walk(n, ctx);
            });
          }
          this.out(")");

          // Parts have been evaluated, then perform the function call..

          var me = this;
          if (!_isUndef(node.callee.eval_res)) {
            var args = [];
            var fnToCall = node.callee.eval_res;
            if (node.arguments) {
              node.arguments.forEach(function (n) {
                if (typeof n.eval_res != "undefined") {
                  args.push(_toValue(n.eval_res));
                } else {
                  args.push(_toValue(me.evalVariable(n, ctx)));
                }
              });
            }
            // Todo : define calls to 'this'

            var this_pointer = ctx["this"]; // <- or global this perhaps
            if (node.callee.type == "MemberExpression") {
              this_pointer = node.callee.object.eval_res;
            }
            if (node.callee.type == "ThisExpression") {
              if (ctx.parentCtx) this_pointer = ctx.parentCtx["this"];
            }

            if (typeof fnToCall == "function") {
              node.eval_res = fnToCall.apply(this_pointer, args);
            }
          }
        }
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.CatchClause = function (node, ctx) {
        this.out(" catch ");

        if (node.param) {
          this.out("(");
          this.walk(node.param, ctx);
          this.out(")");
        }
        if (node.body) {
          this.walk(node.body, ctx);
        }
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.ClassBody = function (node, ctx) {
        this.out("{", true);

        // walk the class body
        this.indent(1);
        this.walk(node.body, ctx);
        this.indent(-1);

        this.out("}", true);
      };

      /**
       * @param Object node
       * @param float ctx
       */
      _myTrait_.ClassDeclaration = function (node, ctx) {

        this.out("class ");

        if (node.id) {
          this.walk(node.id, ctx);
          this.out(" ");
        }

        if (node.superClass) {
          this.trigger("Extends", node.superClass);
          this.out(" extends ");
          this.walk(node.superClass, ctx);
        }

        if (node.body) {
          this.walk(node.body, ctx);
        }
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.ConditionalExpression = function (node, ctx) {

        this.walk(node.test, ctx);
        this.out(" ? ");
        this.walk(node.consequent, ctx);
        this.out(" : ");
        this.walk(node.alternate, ctx);

        /*
        interface ConditionalExpression <: Expression {
        type: "ConditionalExpression";
        test: Expression;
        alternate: Expression;
        consequent: Expression;
        }
        */
      };

      /**
       * @param float t
       */
      _myTrait_.continueAfterBreak = function (t) {
        /*            this._breakState = {
                node : node,
                ctx : ctx,
                process : this,
                path : this._path
            }
        */
        var state = this._breakState;
        if (state && this._break) {

          this._break = false;
          this._path = [];
          this.walk(state.node, state.ctx);
        }
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.ContinueStatement = function (node, ctx) {
        this.nlIfNot();
        this.out("continue ");
        if (node.label) this.walk(node.label, ctx);
        this.out("", true);
      };

      /**
       * @param Object ctx  - Parent Context
       * @param float isBlock
       */
      _myTrait_.createContext = function (ctx, isBlock) {
        var newCtx = {
          functions: {},
          vars: {},
          variables: {},
          parentCtx: ctx,
          block: isBlock
        };
        return newCtx;
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.DebuggerStatement = function (node, ctx) {
        this.nlIfNot();
        this.out("debugger;");
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.DoWhileStatement = function (node, ctx) {
        this.nlIfNot();
        this.out("do ", true);

        if (node.body) {
          var bNeedsPar = false;
          if (node.body.type != "BlockStatement" && node.body.type.indexOf("Statement") >= 0) {
            bNeedsPar = true;
          }
          if (bNeedsPar) {
            this.out("{");
            this.indent(1);
          }
          this.walk(node.body, ctx);
          if (bNeedsPar) {
            this.indent(-1);
            this.out("}");
          }
        }

        this.out(" ");
        if (node.test) {
          this.out("while(");
          this.trigger("DoWhileTest", node.test);
          this.walk(node.test, ctx);
          this.out(")");
        }

        this.out("", true);
      };

      /**
       * @param float t
       */
      _myTrait_.EmptyStatement = function (t) {};

      /**
       * @param float t
       */
      _myTrait_.endBlock = function (t) {
        this.out("}", true);
        this.indent(-1);
      };

      /**
       * @param float t
       */
      _myTrait_.endCollecting = function (t) {
        this._collecting = false;
      };

      /**
       * @param String varName
       * @param float ctx
       */
      _myTrait_.evalVariable = function (varName, ctx) {
        var name;
        if (typeof varName == "object") {
          if (varName.eval_res) return varName.eval_res;
          var node = varName;
          if (node.type == "Identifier") {
            name = node.name;
          }
          if (node.type == "Literal") {
            name = node.value;
          }
        } else {
          name = varName;
        }

        // TODO: ERROR if letvar is undefined does not work!!!!
        var letVar = this.findLetVar(name, ctx);
        if (_isDeclared(letVar)) {
          if (_isUndef(letVar)) return undefined;
          return letVar;
        }
        var constVar = this.findConstVar(name, ctx);
        if (_isDeclared(constVar)) {
          if (_isUndef(constVar)) return undefined;
          return constVar;
        }

        if (_isDeclared(ctx.variables[name])) {
          if (_isUndef(ctx.variables[name])) return undefined;
          return ctx.variables[name];
        } else {
          if (ctx.parentCtx) {
            return this.evalVariable(name, ctx.parentCtx);
          } else {
            // unfortunate constant :/
            return window[name];
          }
        }
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.ExpressionStatement = function (node, ctx) {
        this.nlIfNot();
        this.walk(node.expression, ctx);
        this.out(";", true);

        node.eval_res = node.expression.eval_res;
      };

      /**
       * @param String name
       * @param Object ctx
       * @param Object value
       */
      _myTrait_.findAndSetLet = function (name, ctx, value) {
        // does the context have this variable?
        if (ctx.letVars && _isDeclared(ctx.letVars[name])) {
          ctx.letVars[name] = _wrapValue(value);
          return true;
        } else {
          if (ctx.parentCtx) {
            return this.findAndSetLet(name, ctx.parentCtx, value);
          }
        }
      };

      /**
       * @param String name
       * @param float ctx
       */
      _myTrait_.findConstVar = function (name, ctx) {
        if (ctx.constVars && _isDeclared(ctx.constVars[name])) {
          return ctx.constVars[name];
        } else {
          if (ctx.parentCtx) {
            return this.findConstVar(name, ctx.parentCtx);
          }
        }
      };

      /**
       * @param String name
       * @param float ctx
       */
      _myTrait_.findLetVar = function (name, ctx) {

        if (ctx.letVars && _isDeclared(ctx.letVars[name])) {
          return ctx.letVars[name];
        } else {
          if (ctx.parentCtx) {
            return this.findLetVar(name, ctx.parentCtx);
          }
        }
      };

      /**
       * @param Object ctx  - Context to use
       */
      _myTrait_.findThis = function (ctx) {

        if (ctx["this"]) return ctx["this"];
        if (ctx.parentCtx) return this.findThis(ctx.parentCtx);

        return window;
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.ForInStatement = function (node, ctx) {

        var myCtx = this.createContext(ctx, true);

        if (node.left) {
          this.walk(node.left, myCtx);
        } else {
          return;
        }
        if (node.right) {
          this.walk(node.right, myCtx);
        } else {
          return;
        }

        var obj = node.right.eval_res;
        var propName;
        var decl, kind; //  = "var";
        if (node.left.type == "VariableDeclaration") {
          decl = node.left.declarations[0];
          kind = decl.kind;
          propName = decl.name || decl.id.name;
        } else {
          if (node.left.type == "Identifier") {
            propName = node.name;
          } else {
            propName = node.left.eval_res;
          }
        }

        if (!propName || !obj) return;

        for (var xx in obj) {
          // must set the variable ...
          if (decl) {
            // ??? declaration ???
            this.assignTo(propName, myCtx, xx);
          } else {
            this.assignTo(propName, myCtx, xx);
          }
          // Then... ready to go???
          this.walk(node.body, myCtx);
        }
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.ForOfStatement = function (node, ctx) {
        this.nlIfNot();
        this.out("for(");

        if (node.left) {
          this.trigger("ForOfLeft", node.left);
          this.walk(node.left, ctx);
        }
        this.out(" of ");
        if (node.right) {
          this.trigger("ForOfRight", node.right);
          this.walk(node.right, ctx);
        }
        this.out(")");

        if (node.body) {
          this.trigger("ForOfBody", node.body);
          var bNeedsPar = false;
          if (node.body.type != "BlockStatement" && node.body.type.indexOf("Statement") >= 0) {
            bNeedsPar = true;
          }
          if (bNeedsPar) {
            this.out("{");
            this.indent(1);
          }
          this.walk(node.body, ctx);
          if (bNeedsPar) {
            this.indent(-1);
            this.out("}");
          }
        }

        this.out("", true);
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.ForStatement = function (node, ctx) {

        var myCtx = this.createContext(ctx, true);

        if (node.init) {
          this.walk(node.init, myCtx);
        }

        var max_cnt = 1000 * 1000; // <-- maximum loop count, temporary setting...

        while (max_cnt > 0) {
          if (node.test) {
            this.walk(node.test, myCtx);
            if (!node.test.eval_res) {
              break;
            }
          } else {
            // do not allow eternal loop at this point...
            break;
          }
          if (node.body) {
            this.walk(node.body, myCtx);
          }
          if (node.update) {
            this.walk(node.update, myCtx);
          }
          max_cnt--;
        }
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.FunctionDeclaration = function (node, ctx) {

        var me = this;
        node.eval_res = function () {

          if (me.isKilled()) return;

          // NOTE: if(node.generator) this.out("*");
          //
          var args = [],
              arg_len = arguments.length,
              origArgs = arguments;
          // function ctx is the parent ctx.

          // defining the "this" is left open, perhaps only overriden when needed...
          var fnCtx = {
            functions: {},
            vars: {},
            variables: {},
            parentCtx: ctx
          };
          var evl = new ASTEval();

          for (var i = 0; i < arg_len; i++) {
            args[i] = arguments[i];
          }
          // Going the node body with set values or variables...
          var i = 0;
          node.params.forEach(function (p) {

            if (typeof origArgs[i] != "undefined") {
              fnCtx.variables[p.name] = origArgs[i];
            } else {
              if (node.defaults && node.defaults[i]) {
                me.walk(node.defaults[i], ctx);
                fnCtx.variables[p.name] = node.defaults[i].eval_res;
              }
            }
            i++;
          });

          evl.startWalk(node.body, fnCtx);

          // returned value is simply
          return fnCtx.return_value;
        };

        // the fn can then be called
        if (node.id && node.id.name) {
          ctx.variables[node.id.name] = node.eval_res;
        }
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.FunctionExpression = function (node, ctx) {

        var me = this;
        node.eval_res = function () {
          if (me.isKilled()) return;
          // NOTE: if(node.generator) this.out("*");
          //
          var args = [],
              arg_len = arguments.length,
              origArgs = arguments;
          // function ctx is the parent ctx.

          // defining the "this" is left open, perhaps only overriden when needed...
          var fnCtx = {
            functions: {},
            vars: {},
            variables: {},
            parentCtx: ctx
          };
          var evl = new ASTEval();

          for (var i = 0; i < arg_len; i++) {
            args[i] = arguments[i];
          }
          // Going the node body with set values or variables...
          var i = 0;
          node.params.forEach(function (p) {

            if (typeof origArgs[i] != "undefined") {
              fnCtx.variables[p.name] = origArgs[i];
            } else {
              if (node.defaults && node.defaults[i]) {
                me.walk(node.defaults[i], ctx);
                fnCtx.variables[p.name] = node.defaults[i].eval_res;
              }
            }
            i++;
          });

          evl.startWalk(node.body, fnCtx);

          // returned value is simply
          return fnCtx.return_value;
        };

        // the fn can then be called
        if (node.id && node.id.name) {
          ctx.variables[node.id.name] = node.eval_res;
        }
      };

      /**
       * @param float t
       */
      _myTrait_.getCode = function (t) {
        return this._codeStr;
      };

      /**
       * @param float t
       */
      _myTrait_.getParentProcess = function (t) {
        return this._parentProcess;
      };

      /**
       * @param float t
       */
      _myTrait_.getStructures = function (t) {
        return this._structures;
      };

      /**
       * @param Object e  - Exception object
       */
      _myTrait_.handleException = function (e) {

        // Do something to try to find the exception handler for this...

        // this._exceptionHandler

        // should reverse the exception to some line...
        for (var i = this._path.length - 1; i >= 0; i--) {

          var n = this._path[i];
          if (n.type == "TryStatement") {
            var node = n;
            var newCtx = n._exceptionHandlerCtx;

            // The Exception which was thrown
            newCtx.variables[node.handler.param.name] = e;

            // TODO: handle CatchClause etc.
            /*
            this.out(" catch ");
            if(node.param) {
            this.out("(");
            this.walk(node.param, ctx);
            this.out(")");
            }
            if(node.body) {
            this.walk(node.body, ctx);
            }        
            */
            if (node.handler) {
              try {
                this.walk(node.handler.body, newCtx);
              } catch (e) {}
            }
            if (node.finalizer) {
              this.walk(node.finalizer, newCtx);
            }
            break;
          }
        }
      };

      /**
       * @param Object node  - Node to walk
       * @param Object ctx  - Context to use
       */
      _myTrait_.Identifier = function (node, ctx) {
        // just output the identifier name...
        this.out(node.name);
        node.eval_res = this.evalVariable(node.name, ctx);
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.IfStatement = function (node, ctx) {

        this.walk(node.test, ctx);
        if (node.test.eval_res) {
          this.walk(node.consequent, ctx);
        } else {
          this.walk(node.alternate, ctx);
        }
      };

      /**
       * @param int change  - Delta to modify the indent
       */
      _myTrait_.indent = function (change) {

        this._indent += change;
        if (this._indent < 0) this._indent = 0;
      };

      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit")) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
      _myTrait_.__traitInit.push(function (options) {

        this._structures = [];

        this._tabChar = "  ";
        this._codeStr = "";
        this._currentLine = "";
        this._indent = 0;

        this._options = options || {};

        if (!_isUndef) {
          _undefined = {};
          _isUndef = function (a) {
            return a === _undefined || typeof a === "undefined";
          };
          _isDeclared = function (a) {
            return typeof a != "undefined";
          };
          _wrapValue = function (v) {
            if (v === _undefined) return v;
            if (typeof v == "undefined") return _undefined;
            return v;
          };
          _toValue = function (v) {
            if (v === _undefined) return undefined;
            return v;
          };
        }
      });

      /**
       * Returns true if the process has been killed
       * @param float t
       */
      _myTrait_.isKilled = function (t) {

        if (this._isKilled) return true;

        var p = this.getParentProcess();
        if (p) return p.isKilled();
      };

      /**
       * @param float t
       */
      _myTrait_.isPaused = function (t) {

        if (this._isPaused) return true;

        var p = this.getParentProcess();
        if (p) return p.isPaused();
      };

      /**
       * @param float t
       */
      _myTrait_.kill = function (t) {

        this._isKilled = true;
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.LabeledStatement = function (node, ctx) {
        this.nlIfNot();
        this.walk(node.label, ctx);
        this.out(":", true);
        this.indent(1);
        if (node.body) this.walk(node.body, ctx);
        this.indent(-1);
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.Literal = function (node, ctx) {
        this.out(node.raw);

        // set evaluated values to the node to be used later if necessary
        node.eval_res = node.value;
        node.eval_type = typeof node.value;
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.LogicalExpression = function (node, ctx) {
        var bLeftNeedsPar = true,
            bRightNeedsPar = true;
        if (node.left.type == "Identifier" || node.left.type == "Literal") {
          bLeftNeedsPar = false;
        }
        if (node.right.type == "Identifier" || node.right.type == "Literal") {
          bRightNeedsPar = false;
        }

        if (bLeftNeedsPar) this.out("(");
        this.walk(node.left, ctx);
        if (bLeftNeedsPar) this.out(")");

        if (node.operator) {
          this.out(" " + node.operator + " ");
        }
        if (bRightNeedsPar) this.out("(");
        this.walk(node.right, ctx);
        if (bRightNeedsPar) this.out(")");

        /*
        interface LogicalExpression <: Expression {
        type: "LogicalExpression";
        operator: LogicalOperator;
        left: Expression;
        right: Expression;
        }
        */
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.MemberExpression = function (node, ctx) {

        this.walk(node.object, ctx);

        if (node.computed) {
          this.walk(node.property, ctx);
        } else {
          this.walk(node.property, ctx);
        }

        //
        var oo;
        if (node.object.type == "ThisExpression") {
          oo = this.findThis(ctx);
        } else {
          oo = this.evalVariable(node.object, ctx); // <-- Identifier, literal should be ok
        }
        var prop;
        if (node.computed) {
          var prop = this.evalVariable(node.property.name, ctx);
        } else {
          prop = node.property.name;
        }

        if (!_isUndef(oo)) {
          try {
            node.eval_res = oo[prop];
          } catch (e) {}
        }
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.MethodDefinition = function (node, ctx) {

        if (node.key) {
          this.__insideMethod = true;

          if (node.kind == "constructor") {
            this.trigger("ClassConstructor", node);
          }

          if (node["static"]) this.out("static ");

          this.walk(node.key, ctx);
          this.walk(node.value, ctx);
          this.out("", true);
          this.__insideMethod = false;
        }
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.NewExpression = function (node, ctx) {

        if (node.callee) {
          this.out(" new ");
          this.trigger("NewExpressionClass", node.callee);
          this.walk(node.callee, ctx);
          this.out("(");
          if (node.arguments) {
            var me = this,
                cnt = 0;
            node.arguments.forEach(function (n) {
              me.trigger("NewExpressionArgument", n);
              if (cnt++ > 0) me.out(", ");
              me.walk(n, ctx);
            });
          }
          this.out(")");
        }
      };

      /**
       * @param float t
       */
      _myTrait_.nlIfNot = function (t) {
        var len = this._currentLine.length;
        if (len > 0) {
          // {
          if (this._currentLine[len - 1] == "{" || this._currentLine[len - 1] == ";") {
            this.out("", true);
          } else {
            this.out(";", true);
          }
        }
      };

      /**
       * @param Object node
       * @param float ctx
       */
      _myTrait_.ObjectExpression = function (node, ctx) {

        var me = this;
        try {
          me.out("{");
          var cnt = 0;
          if (node && node.properties) {
            if (node.properties.length > 1) me.out("", true);
            me.indent(1);
            node.properties.forEach(function (p) {
              if (cnt++ > 0) me.out(",", true);
              me.trigger("ObjectExpressionProperty", p);
              me.walk(p, ctx);
            });
            me.indent(-1);
          }
          me.out("}");

          node.eval_res = {};
          if (node.properties) {
            node.properties.forEach(function (e) {
              var v = e.value.eval_res || me.evalVariable(e.value, ctx);

              var keyName = e.key.eval_res;
              if (typeof keyName == "undefined") {
                keyName = me.evalVariable(e.key, ctx);
              }

              node.eval_res[keyName] = v;
            });
          }
        } catch (e) {
          console.error(e.message);
        }
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.ObjectPattern = function (node, ctx) {
        var me = this;
        try {
          me.out("{");
          var cnt = 0;
          if (node && node.properties) {
            //if(node.properties.length>1) me.out("", true);
            node.properties.forEach(function (p) {
              if (cnt++ > 0) me.out(",");
              me.trigger("ObjectExpressionProperty", p);
              me.walk(p, ctx);
            });
          }
          me.out("}");
        } catch (e) {
          console.error(e.message);
        }
      };

      /**
       * @param String str  - Code to output
       * @param Boolean newline  - if ends with newline
       */
      _myTrait_.out = function (str, newline) {

        if (this._options.noOutput) return;

        if (this._collecting) {
          if (str) {
            if (this._collectLine.length == 0) {
              for (var i = 0; i < this._indent; i++) {
                this._collectLine += this._tabChar;
              }
            }
            this._collectLine += str;
          }

          if (newline) {
            this._collectStr += this._collectLine + "\n";
            this._collectLine = "";
            this._collectStr += "\n";
          }
          return;
        }
        if (str) {
          if (this._currentLine.length == 0) {
            for (var i = 0; i < this._indent; i++) {
              this._currentLine += this._tabChar;
            }
          }
          this._currentLine += str;
        }

        if (newline) {
          this._codeStr += this._currentLine + "\n";
          this._currentLine = "";
        }
      };

      /**
       * @param float t
       */
      _myTrait_.prevChar = function (t) {
        var len = this._currentLine.length;
        if (len > 0) {
          return this._currentLine[len - 1];
        } else {
          return "\n";
        }
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.Program = function (node, ctx) {

        this.walk(node.body, ctx, true);
      };

      /**
       * @param Object node
       * @param float ctx
       */
      _myTrait_.Property = function (node, ctx) {

        // kind: "init" | "get" | "set";

        this.trigger("ObjectPropertyKey", node.key);
        this.walk(node.key, ctx);
        if (!node.shorthand) {
          this.out(":");
          this.trigger("ObjectPropertyValue", node.value);
          this.walk(node.value, ctx);
        }

        if (node.key.computed) {
          var value = this.evalVariable(node.key, ctx);
          if (typeof value != "undefined") {
            node.key.eval_res = value;
          }
        } else {
          node.key.eval_res = node.key.name;
        }
      };

      /**
       * @param Object def  - Structure definition
       */
      _myTrait_.pushStructure = function (def) {

        if (!this._structures) this._structures = [];
        this._structures.push(def);
      };

      /**
       * @param Object node
       * @param float ctx
       */
      _myTrait_.RestElement = function (node, ctx) {
        if (node.argument) this.trigger("RestArgument", node.argument);

        this.out(" ...");
        this.walk(node.argument, ctx);
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.ReturnStatement = function (node, ctx) {
        this.nlIfNot();
        this.out("return ");
        this.trigger("ReturnValue", node.argument);
        this.walk(node.argument, ctx);
        this.out(";");

        // setting the return value

        var fnCtx = ctx;
        if (fnCtx.block) {
          while (fnCtx && fnCtx.block) {
            fnCtx = fnCtx.parentCtx;
          }
        }

        fnCtx.return_value = node.argument.eval_res;
      };

      /**
       * @param Object node
       * @param float ctx
       */
      _myTrait_.SequenceExpression = function (node, ctx) {
        if (node.expressions) {
          var me = this;
          var cnt = 0;
          this.out("(");
          node.expressions.forEach(function (n) {
            if (cnt++ > 0) me.out(",");
            me.walk(n, ctx);
          });
          this.out(")");
        }
      };

      /**
       * @param Object p  - ASTEval
       */
      _myTrait_.setParentProcess = function (p) {
        this._parentProcess = p;

        if (!p._childProcess) {
          p._childProcess = [];
        }
        if (p._childProcess.indexOf(this) < 0) {
          p._childProcess.push(p);
        }
      };

      /**
       * @param Bool trueOrFalse  - If paused or not
       */
      _myTrait_.setPaused = function (trueOrFalse) {
        this._isPaused = trueOrFalse;
      };

      /**
       * @param float t
       */
      _myTrait_.skip = function (t) {
        this._skipWalk = true;
      };

      /**
       * @param float t
       */
      _myTrait_.startBlock = function (t) {

        this.out("{", true);
        this.indent(1);
      };

      /**
       * @param float t
       */
      _myTrait_.startCollecting = function (t) {
        this._collecting = true;
      };

      /**
       * Starts the walking of AST tree
       * @param Node node  - AST Node
       * @param Object ctx
       */
      _myTrait_.startWalk = function (node, ctx) {

        this._breakWalk = false;
        this._path = [];

        this._codeStr = "";
        this._currentLine = "";

        this.walk(node, ctx);
        this.out("", true);
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.Super = function (node, ctx) {
        this.out("super");
      };

      /**
       * @param Object node
       * @param float ctx
       */
      _myTrait_.SwitchCase = function (node, ctx) {
        this.nlIfNot();
        if (node.test) {
          this.out("case ");
          this.walk(node.test, ctx);
          this.out(" : ", true);
        } else {
          this.out("default: ", true);
        }

        if (node.consequent) {
          var me = this;
          node.consequent.forEach(function (c) {
            me.walk(c, ctx);
          });
        }
      };

      /**
       * @param Object node
       * @param float ctx
       */
      _myTrait_.SwitchStatement = function (node, ctx) {
        this.nlIfNot();
        this.out("switch(");

        this.walk(node.discriminant, ctx);
        this.out(")");
        this.out("{", true);

        this.indent(1);
        var me = this;
        node.cases.forEach(function (c) {
          me.walk(c, ctx);
        });
        this.indent(-1);
        this.out("}", true);
        /*
        interface SwitchStatement <: Statement {
        type: "SwitchStatement";
        discriminant: Expression;
        cases: [ SwitchCase ];
        lexical: boolean;
        }
        */
      };

      /**
       * @param float node
       */
      _myTrait_.ThisExpression = function (node) {
        this.out("this");
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.ThrowStatement = function (node, ctx) {
        this.nlIfNot();
        this.out("throw ");
        this.trigger("ThrowArgument", node.argument);
        this.walk(node.argument, ctx);

        var value = node.argument.eval_res;
        if (typeof value == "undefined") value = this.evalVariable(node.argument, ctx);
        this.handleException(value);
      };

      /**
       * @param Object node
       * @param float ctx
       */
      _myTrait_.TryStatement = function (node, ctx) {

        this.out("try ");

        // node._exceptionHandler = node;
        node._exceptionHandlerCtx = ctx;
        this.walk(node.block, ctx);

        // Walked only in the case of an exception...
        /*
        if(node.handler) {
        this.walk(node.handler, ctx);
        }
        if(node.finalizer) {
        this.out(" finally ");
        this.walk(node.finalizer, ctx);
        }
        */
        /*
        interface TryStatement <: Statement {
        type: "TryStatement";
        block: BlockStatement;
        handler: CatchClause | null;
        guardedHandlers: [ CatchClause ];
        finalizer: BlockStatement | null;
        }
        */
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.UnaryExpression = function (node, ctx) {
        var bNeedsPar = true;
        if (node.argument.type == "Identifier" || node.argument.type == "Literal") {
          bNeedsPar = false;
        }
        this.out(node.operator);
        if (node.operator != "!") this.out(" ");

        if (bNeedsPar) this.out("(");
        this.trigger("UnaryExpressionArgument", node.argument);
        this.walk(node.argument, ctx);
        if (bNeedsPar) this.out(")");

        var value = node.argument.eval_res || this.evalVariable(node.argument, ctx);

        if (typeof value != "undefined") {
          if (node.operator == "-") {
            node.eval_res = -1 * value;
          }
          if (node.operator == "!") {
            node.eval_res = !value;
          }
          if (node.operator == "+") {
            node.eval_res = +value;
          }
          if (node.operator == "delete") {
            // node.eval_res = +value;
            console.error("Delete unary operator not defined");
          }
          if (node.operator == "typeof") {
            // node.eval_res = +value;
            node.eval_res = typeof value;
          }
          if (node.operator == "void") {
            // node.eval_res = +value;
            node.eval_res = void value;
          }
        }
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.UpdateExpression = function (node, ctx) {

        this.trigger("UpdateExpressionArgument", node.argument);
        this.walk(node.argument, ctx);
        this.out(node.operator);

        var value = node.argument.eval_value;
        if (typeof value == "undefined") value = this.evalVariable(node.argument, ctx);

        var me = this;
        var node_assign = function node_assign(node, ctx, value) {
          if (node.type == "MemberExpression") {
            var obj, prop;
            if (typeof node.object.eval_res != "undefined") {
              obj = node.object.eval_res;
            } else {
              obj = this.evalVariable(node.object, ctx);
            }
            if (node.computed) {
              if (typeof node.property.eval_res != "undefined") {
                prop = this.evalVariable(node.property.eval_res, ctx);
              } else {
                prop = this.evalVariable(node.property.name, ctx);
              }
            } else {
              prop = node.property.name;
            }
            if (obj && prop) {
              obj[prop] = value;
            }
            return;
          }
          me.assignTo(node, ctx, value);
        };

        if (node.operator == "++" && typeof value != "undefined") {
          if (!node.prefix) node.eval_res = value;
          value++;
          if (node.prefix) node.eval_res = value;

          node_assign(node.argument, ctx, value);
          // this.assignTo(node.argument, ctx, value);
        }
      };

      /**
       * @param Object node  - Object to use to create a variable declaration
       * @param Object ctx  - Context of the node
       */
      _myTrait_.VariableDeclaration = function (node, ctx) {

        var me = this;
        var cnt = 0;
        if (node.kind == "var") me.out("var ");
        if (node.kind == "let") me.out("let ");
        if (node.kind == "const") me.out("const ");
        var indent = 0;
        ctx._varKind = node.kind;
        node.declarations.forEach(function (vd) {
          if (cnt++ > 0) {
            if (cnt == 2) {
              indent += 2;
              me.indent(indent);
            }
            me.out(",", true); // always a new declaration
          }
          me.walk(vd, ctx);
        });
        this.indent(-1 * indent);
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.VariableDeclarator = function (node, ctx) {
        var me = this;

        if (node.id) me.walk(node.id, ctx);

        if (node.init) {
          this.out(" = ");
          me.walk(node.init, ctx);
          if (node.id.name && typeof node.init.eval_res != "undefined") {
            if (!ctx.variables) ctx.variables = {};
            if (ctx._varKind == "var") {
              ctx.variables[node.id.name] = node.init.eval_res;
            }
            if (ctx._varKind == "let") {
              if (!ctx.letVars) ctx.letVars = {};
              ctx.letVars[node.id.name] = node.init.eval_res;
            }
            if (ctx._varKind == "const") {
              if (!ctx.constVars) ctx.constVars = {};
              ctx.constVars[node.id.name] = node.init.eval_res;
            }
          }
        } else {
          if (node.id.name) {
            if (!ctx.variables) ctx.variables = {};
            if (ctx._varKind == "var") {
              ctx.variables[node.id.name] = _undefined;
            }
            if (ctx._varKind == "let") {
              if (!ctx.letVars) ctx.letVars = {};
              ctx.letVars[node.id.name] = _undefined;
            }
            if (ctx._varKind == "const") {
              if (!ctx.constVars) ctx.constVars = {};
              ctx.constVars[node.id.name] = _undefined;
            }
          }
        }
      };

      /**
       * @param Object node  - The object to walk the AST with
       * @param Object ctx  - The current context
       * @param float newLine
       */
      _myTrait_.walk = function (node, ctx, newLine) {

        if (!node) return;
        if (this.isKilled()) return;
        if (this._break) return;

        if (!ctx) {
          console.log("ERROR: no context defined for ", node);
          console.trace();
          return;
        }

        // What is going on here then...
        if (node instanceof Array) {
          var me = this;
          var index = 0;
          var parent = this._path[this._path.length - 1];
          if (!parent && this._breakState) {
            if (this._breakState.path) {
              parent = this._breakState.path[this._breakState.path.length - 1];
            }
          }
          if (parent && typeof parent._activeIndex != "undefined") {
            index = parent._activeIndex + 1; // if continue, continue from next statement
          }

          // parent of this node...
          for (var i = index; i < node.length; i++) {
            if (parent) parent._activeIndex = i;
            me.walk(node[i], ctx);
            if (this._break) {
              return;
            }
          }
          delete parent._activeIndex;
        } else {
          if (node.type) {
            var runTime = {
              node: node,
              ctx: ctx
            };
            this.trigger("node", runTime);
            this.trigger(node.type, runTime);

            if (this._skipWalk) {
              this._skipWalk = false;
              return;
            }
            // if break command has been issued for the process
            if (this._break) {
              // Save the state of the machine and exit
              if (this._breakState) {
                var stack_array = this._breakState.path;
                this._path.forEach(function (node) {
                  stack_array.push(node);
                });
                this._breakState.node = node;
                this._breakState.ctx = ctx;
                this._breakState.process = this;
              } else {
                this._breakState = {
                  node: node,
                  ctx: ctx,
                  process: this,
                  path: this._path
                };
              }
              return;
            }

            if (this._wCb) this._wCb(node);

            if (this[node.type]) {
              this._path.push(node);

              // NEW: the context of the node is also saved
              node._activeCtx = ctx;

              this[node.type](node, ctx);

              if (this._break) return;

              this._path.pop();

              // if this execution walk is over, but we have a break state available from
              // some previous execution context, continue from that...
              if (this._path.length == 0) {
                if (this._breakState && this._breakState.path && this._breakState.path.length) {
                  var returnTo = this._breakState.path.pop();
                  if (returnTo) {
                    this.walk(returnTo, returnTo._activeCtx);
                  }
                }
              }
            } else {
              console.log("Did not find " + node.type);
              console.log(node);
            }
          }
        }
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.walkAsString = function (node, ctx) {

        var str = "";
        try {
          this.startCollecting();
          this._collectStr = "";
          this._collectLine = "";

          this.walk(node, ctx);

          str = this._collectStr;

          this.endCollecting();
        } catch (e) {}
        return str;
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.WhileStatement = function (node, ctx) {
        this.nlIfNot();
        this.out("while ");

        if (node.test) {
          this.trigger("WhileTest", node.test);
          this.out("(");
          this.walk(node.test, ctx);
          this.out(")");
        }
        if (node.body) {
          var bNeedsPar = false;
          if (node.body.type != "BlockStatement" && node.body.type.indexOf("Statement") >= 0) {
            bNeedsPar = true;
          }
          if (bNeedsPar) {
            this.out("{");
            this.indent(1);
          }
          this.walk(node.body, ctx);
          if (bNeedsPar) {
            this.indent(-1);
            this.out("}");
          }
        }

        this.out("", true);
      };

      /**
       * @param Object node
       * @param float ctx
       */
      _myTrait_.WithStatement = function (node, ctx) {
        console.error("With statement is not supported");
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.YieldExpression = function (node, ctx) {

        this.out("yield ");
        this.walk(node.argument, ctx);

        /*
        interface YieldExpression <: Expression {
        type: "YieldExpression";
        argument: Expression | null;
        }
        */
      };
    })(this);
  };

  var ASTEval = function ASTEval(a, b, c, d, e, f, g, h) {
    var m = this,
        res;
    if (m instanceof ASTEval) {
      var args = [a, b, c, d, e, f, g, h];
      if (m.__factoryClass) {
        m.__factoryClass.forEach(function (initF) {
          res = initF.apply(m, args);
        });
        if (typeof res == "function") {
          if (res._classInfo.name != ASTEval._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (m.__traitInit) {
        m.__traitInit.forEach(function (initF) {
          initF.apply(m, args);
        });
      } else {
        if (typeof m.init == "function") m.init.apply(m, args);
      }
    } else return new ASTEval(a, b, c, d, e, f, g, h);
  };
  // inheritance is here

  ASTEval._classInfo = {
    name: "ASTEval"
  };
  ASTEval.prototype = new ASTEval_prototype();

  (function () {
    if (typeof define !== "undefined" && define !== null && define.amd != null) {
      __amdDefs__["ASTEval"] = ASTEval;
      this.ASTEval = ASTEval;
    } else if (typeof module !== "undefined" && module !== null && module.exports != null) {
      module.exports["ASTEval"] = ASTEval;
    } else {
      this.ASTEval = ASTEval;
    }
  }).call(new Function("return this")());

  if (typeof define !== "undefined" && define !== null && define.amd != null) {
    define(__amdDefs__);
  }
}).call(new Function("return this")());