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
      var _globalCtx;
      var _accessDenied;

      // Initialize static variables here...

      /**
       * @param float t
       */
      _myTrait_._getUndefined = function (t) {
        return _undefined;
      };

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

        var me = this;
        var bind_this = this.findThis(ctx);
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
          fnCtx["this"] = bind_this;
          var evl = new ASTEval();

          for (var i = 0; i < arg_len; i++) {
            args[i] = arguments[i];
          }
          // Going the node body with set values or variables...
          var i = 0;
          node.params.forEach(function (p) {
            if (p.type == "RestElement") {
              // should be the rest of the string...
              fnCtx.variables[p.argument.name] = args.slice(i);
              i++;
              return;
            }
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

          try {
            evl.startWalk(node.body, fnCtx);
          } catch (msg) {
            if (msg.type == "return") {} else {
              throw msg;
            }
          }

          if (node.expression) {
            fnCtx.return_value = node.body.eval_res;
          }

          // returned value is simply
          return fnCtx.return_value;
        };

        // the fn can then be called
        if (node.id && node.id.name) {
          ctx.variables[node.id.name] = node.eval_res;
        }
      };

      /**
       * @param float assignNode
       * @param float ctx
       */
      _myTrait_.AssignmentExpression = function (assignNode, ctx) {

        var node = assignNode;

        this.walk(node.right, ctx);
        this.walk(node.left, ctx);

        var value = node.right.eval_res;
        if (!_isDeclared(value)) value = this.evalVariable(node.right, ctx);
        var left_value = node.left.eval_res;
        if (!_isDeclared(left_value)) left_value = this.evalVariable(node.left, ctx);

        value = _toValue(value);
        left_value = _toValue(left_value);

        var me = this;

        if (node.operator == "=") {
          return this.node_assign(node.left, ctx, value, assignNode);
        }
        if (node.operator == "+=") {
          return this.node_assign(node.left, ctx, left_value + value, assignNode);
        }
        if (node.operator == "-=") {
          return this.node_assign(node.left, ctx, left_value - value, assignNode);
        }
        if (node.operator == "*=") {
          return this.node_assign(node.left, ctx, left_value * value, assignNode);
        }
        if (node.operator == "/=") {
          return this.node_assign(node.left, ctx, left_value / value, assignNode);
        }
        if (node.operator == "%=") {
          return this.node_assign(node.left, ctx, left_value % value, assignNode);
        }
        if (node.operator == "**=") {
          return this.node_assign(node.left, ctx, Math.pow(left_value, value), assignNode);
        }
        if (node.operator == "<<=") {
          return this.node_assign(node.left, ctx, left_value << value, assignNode);
        }
        if (node.operator == ">>=") {
          return this.node_assign(node.left, ctx, left_value >> value, assignNode);
        }
        if (node.operator == ">>>=") {
          return this.node_assign(node.left, ctx, left_value >>> value, assignNode);
        }
        if (node.operator == "&=") {
          return this.node_assign(node.left, ctx, left_value & value, assignNode);
        }
        if (node.operator == "^=") {
          return this.node_assign(node.left, ctx, left_value ^ value, assignNode);
        }
        if (node.operator == "|=") {
          return this.node_assign(node.left, ctx, left_value | value, assignNode);
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

        this.walk(node.left, ctx);
        this.walk(node.right, ctx);

        // evaluate the binary expression
        var a = node.left.eval_res,
            b = node.right.eval_res;

        if (!_isDeclared(a)) a = this.evalVariable(node.left, ctx);
        if (!_isDeclared(b)) b = this.evalVariable(node.right, ctx);

        a = _toValue(a);
        b = _toValue(b);

        // ?? should result be object with value ?

        if (node.operator == "+") return node.eval_res = a + b;
        if (node.operator == "-") return node.eval_res = a - b;
        if (node.operator == "*") return node.eval_res = a * b;
        if (node.operator == "/") return node.eval_res = a / b;
        if (node.operator == "<") return node.eval_res = a < b;
        if (node.operator == "<=") return node.eval_res = a <= b;
        if (node.operator == ">") return node.eval_res = a > b;
        if (node.operator == ">=") return node.eval_res = a >= b;
        if (node.operator == "&") return node.eval_res = a & b;
        if (node.operator == "|") return node.eval_res = a | b;
        if (node.operator == "<<") return node.eval_res = a << b;
        if (node.operator == ">>") return node.eval_res = a >> b;
        if (node.operator == ">>>") return node.eval_res = a >>> b;

        if (node.operator == "==") return node.eval_res = a == b;
        if (node.operator == "!=") return node.eval_res = a != b;
        if (node.operator == "===") return node.eval_res = a === b;
        if (node.operator == "!==") return node.eval_res = a !== b;
        if (node.operator == "%") return node.eval_res = a % b;
        if (node.operator == "instanceof") return node.eval_res = a instanceof b;

        console.error("Undefined variable in BinaryExpression");
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
        blockCtx.variables = pCtx.variables;
        /*
        Object.defineProperty(blockCtx, 'variables', {
        enumerable: true,
        configurable: true,
        writable: true,
        value: pCtx.variables
        });
        */

        this.walk(node.body, blockCtx, true);
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.BreakStatement = function (node, ctx) {
        if (node.label) this.walk(node.label, ctx);
        throw {
          type: "break",
          label: node.label
        };
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
            this.walk(node.arguments, ctx);
            /*forEach(function(n) {
            if(cnt++>0) me.out(", ");
            me.walk(n,ctx); 
            });
            */
          }
          this.out(")");

          // Parts have been evaluated, then perform the function call..

          var me = this;
          if (!_isUndef(node.callee.eval_res)) {
            var args = [];
            var fnToCall = node.callee.eval_res;
            if (node.arguments) {
              node.arguments.forEach(function (n) {
                // me.walk(n,ctx);
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
              // this.walk(node.callee, ctx);
              this_pointer = node.callee.object.eval_res;
              if (!this.canAccess(this_pointer)) {
                console.error("Access denied for object ", this_pointer);
                node.eval_res = _undefined;
                return;
              }
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
       * Tests if Object can be directly accessed using property accessor
       * @param Object obj  - The object pointer
       */
      _myTrait_.canAccess = function (obj) {

        if (_accessDenied) {
          for (var i = 0; i < _accessDenied.length; i++) {
            if (_accessDenied[i] === obj) return false;
          }
        }
        return true;
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
       * @param Object node  - AST node to start from
       * @param Object ctx  - Context to save the findings...
       * @param Function  cb  - callback when found
       */
      _myTrait_.collectVarsAndFns = function (node, ctx, cb) {
        if (!node) return;
        if (!node.type) return;
        if (node._fnc) return;

        if (node.type == "FunctionExpression") {
          return;
        }

        if (node.type == "FunctionDeclaration") {
          cb(node);
          return;
        }
        if (node.type == "VariableDeclaration") {
          cb(node);
          return;
        }
        node._fnc = true;
        for (var n in node) {
          if (node.hasOwnProperty(n)) {
            if (n == "_next") continue;
            if (n == "_prev") continue;
            if (n == "_parent") continue;
            if (n == "range") continue;
            if (n == "comments") continue;
            var item = node[n];
            if (item instanceof Array) {
              for (var i = 0; i < item.length; i++) {
                var ii = item[i];
                if (typeof ii == "object") {
                  this.collectVarsAndFns(ii, ctx, cb);
                }
              }
            } else {
              if (typeof item == "object") {
                this.collectVarsAndFns(item, ctx, cb);
              }
            }
          }
        }
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.ConditionalExpression = function (node, ctx) {

        this.walk(node.test, ctx);
        if (node.test.eval_res) {
          this.walk(node.consequent, ctx);
          node.eval_res = node.consequent.eval_res;
        } else {
          this.walk(node.alternate, ctx);
          node.eval_res = node.alternate.eval_res;
        }
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

        throw {
          type: "continue",
          label: node.label
        };
      };

      /**
       * @param Object ctx  - Parent Context
       * @param float isBlock
       */
      _myTrait_.createContext = function (ctx, isBlock) {
        var newCtx = {
          functions: {},
          vars: {},
          parentCtx: ctx,
          block: isBlock
        };

        var pCtx = ctx;
        while (pCtx && pCtx.block) {
          pCtx = pCtx.parentCtx;
        }

        if (isBlock) {
          newCtx.variables = pCtx.variables;
        } else {
          newCtx.variables = {};
        }

        return newCtx;
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.DebuggerStatement = function (node, ctx) {
        /*this.nlIfNot();
        this.out("debugger;");
        throw {
        msg : "debugger",
        node : node,
        }
        */

        debugger;
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.DoWhileStatement = function (node, ctx) {
        var max_cnt = 1000 * 1000; // <-- maximum loop count, temporary setting...

        do {
          try {
            if (node.body) {
              this.walk(node.body, ctx);
            }
            max_cnt--;
            if (node.test) {
              this.walk(node.test, ctx);
              if (!node.test.eval_res) {
                break;
              }
            } else {
              // do not allow eternal loop at this point...
              break;
            }
          } catch (msg) {
            // --> continue from here then
            if (msg && msg.type == "continue") {
              if (msg.label && msg.label.name) {
                if (node._label && node._label.name == msg.label.name) {
                  continue;
                }
              } else {
                continue;
              }
            }
            if (msg && msg.type == "break") {
              if (msg.label && msg.label.name) {
                if (node._label && node._label.name == msg.label.name) {
                  break;
                }
              } else {
                break;
              }
            }
            throw msg;
          }
        } while (max_cnt > 0);
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

        if (varName == null || varName == "null") return null;
        if (!ctx) return _undefined;

        if (typeof varName == "object") {
          if (typeof varName.eval_res != "undefined") return varName.eval_res;
          var node = varName;
          if (node.type == "Identifier") {
            name = node.name;
          }
          if (node.type == "Literal") {
            return node.value; // ???
          }
        } else {
          name = varName;
        }
        if (typeof varName == "number") return varName;

        if (ctx.letVars && _isDeclared(ctx.letVars[name])) return ctx.letVars[name];
        if (ctx.constVars && _isDeclared(ctx.constVars[name])) return ctx.constVars[name];
        if (ctx.variables && _isDeclared(ctx.variables[name])) return ctx.variables[name];

        if (ctx.parentCtx) {
          var pc = ctx.parentCtx;
          if (pc.letVars && _isDeclared(pc.letVars[name])) return pc.letVars[name];
          if (pc.constVars && _isDeclared(pc.constVars[name])) return pc.constVars[name];
          if (pc.variables && _isDeclared(pc.variables[name])) return pc.variables[name];
        }

        // TODO: ERROR if letvar is undefined does not work!!!!

        console.log("-slow find-");

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
            if (_globalCtx) return _globalCtx[name];
            // return window[name];
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

        if (!this.canAccess(_globalCtx)) {
          console.error("Can not access ", _globalCtx);
          return _undefined;
        }

        return _globalCtx;
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
          try {
            if (decl) {
              // ??? declaration ???
              this.assignTo(propName, myCtx, xx);
            } else {
              this.assignTo(propName, myCtx, xx);
            }
            // Then... ready to go???
            this.walk(node.body, myCtx);
          } catch (msg) {
            // --> continue from here then
            if (msg && msg.type == "continue") {
              if (msg.label && msg.label.name) {
                if (node._label && node._label.name == msg.label.name) {
                  continue;
                }
              } else {
                continue;
              }
            }
            if (msg && msg.type == "break") {
              if (msg.label && msg.label.name) {
                if (node._label && node._label.name == msg.label.name) {
                  break;
                }
              } else {
                break;
              }
            }
            throw msg;
          }
        }
      };

      /**
       * @param Object node
       * @param Object ctx
       */
      _myTrait_.ForOfStatement = function (node, ctx) {

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

        var me = this;
        obj.every(function (xx) {
          // must set the variable ...
          try {
            if (decl) {
              // ??? declaration ???
              me.assignTo(propName, myCtx, xx);
            } else {
              me.assignTo(propName, myCtx, xx);
            }
            // Then... ready to go???
            me.walk(node.body, myCtx);
            return true;
          } catch (msg) {
            // --> continue from here then
            if (msg && msg.type == "continue") {
              if (msg.label && msg.label.name) {
                if (node._label && node._label.name == msg.label.name) {
                  return true;
                }
              } else {
                return true;
              }
            }
            if (msg && msg.type == "break") {
              if (msg.label && msg.label.name) {
                if (node._label && node._label.name == msg.label.name) {
                  return false;
                }
              } else {
                return false;
              }
            }
            throw msg;
          }
        });
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
          try {
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
          } catch (msg) {
            // --> continue from here then
            if (msg && msg.type == "continue") {
              if (msg.label && msg.label.name) {
                if (node._label && node._label.name == msg.label.name) {
                  if (node.update) {
                    this.walk(node.update, myCtx);
                  }
                  continue;
                }
              } else {
                if (node.update) {
                  this.walk(node.update, myCtx);
                }
                continue;
              }
            }
            if (msg && msg.type == "break") {
              if (msg.label && msg.label.name) {
                if (node._label && node._label.name == msg.label.name) {
                  break;
                }
              } else {
                break;
              }
            }
            throw msg;
          }
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
          fnCtx["this"] = this;
          fnCtx.variables["arguments"] = arguments;
          if (this instanceof node.eval_res) {
            fnCtx.variables["new.target"] = node.eval_res;
          }
          var evl = new ASTEval();

          for (var i = 0; i < arg_len; i++) {
            args[i] = arguments[i];
          }
          // Going the node body with set values or variables...
          var i = 0;
          node.params.forEach(function (p) {
            if (p.type == "RestElement") {
              // should be the rest of the string...
              fnCtx.variables[p.argument.name] = args.slice(i);
              i++;
              return;
            }
            if (typeof origArgs[i] != "undefined") {
              fnCtx.variables[p.name] = origArgs[i];
            } else {
              fnCtx.variables[p.name] = _undefined;
              if (node.defaults && node.defaults[i]) {
                me.walk(node.defaults[i], ctx);
                fnCtx.variables[p.name] = node.defaults[i].eval_res;
              }
            }
            i++;
          });

          try {
            evl.startWalk(node.body, fnCtx);
          } catch (msg) {
            if (msg.type == "return") {} else {
              throw msg;
            }
          }

          // returned value is simply
          return fnCtx.return_value;
        };
        node.eval_res.__$$pLength__ = node.params.length;
        node.params.forEach(function (p) {
          if (p.type == "RestElement") node.eval_res.__$$pLength__--;
        });

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
          fnCtx["this"] = this;
          fnCtx.variables["arguments"] = arguments;
          if (this instanceof node.eval_res) {
            fnCtx.variables["new.target"] = node.eval_res;
          }
          var evl = new ASTEval();

          for (var i = 0; i < arg_len; i++) {
            args[i] = arguments[i];
          }
          // Going the node body with set values or variables...
          var i = 0;
          node.params.forEach(function (p) {
            if (p.type == "RestElement") {
              // should be the rest of the string...
              fnCtx.variables[p.argument.name] = args.slice(i);
              i++;
              return;
            }
            if (typeof origArgs[i] != "undefined") {
              fnCtx.variables[p.name] = origArgs[i];
            } else {
              fnCtx.variables[p.name] = _undefined;
              if (node.defaults && node.defaults[i]) {
                me.walk(node.defaults[i], ctx);
                fnCtx.variables[p.name] = node.defaults[i].eval_res;
              }
            }
            i++;
          });
          try {
            evl.startWalk(node.body, fnCtx);
          } catch (msg) {
            if (msg.type == "return") {} else {
              throw msg;
            }
          }

          // returned value is simply
          return fnCtx.return_value;
        };

        // TODO: disallow rest param...
        node.eval_res.__$$pLength__ = node.params.length;
        node.params.forEach(function (p) {
          if (p.type == "RestElement") node.eval_res.__$$pLength__--;
        });

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

        // accessing the ASTEval is forbidden
        if (node.name == "ASTEval") {
          node.eval_res = _undefined;
          return;
        }
        if (node.name == "undefined") {
          node.eval_res = _undefined;
          return;
        }
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

        if (this._options.globals) {
          _globalCtx = this._options.globals;
        }
        if (this._options.accessDenied) {
          _accessDenied = this._options.accessDenied;
        }

        if (!_globalCtx) _globalCtx = {};

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
            if (v === undefined) return _undefined;
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
        this.walk(node.label, ctx);
        if (node.body) {
          if (node.label && node.label) {
            node.body._label = node.label;
          }
          this.walk(node.body, ctx);
        }
      };

      /**
       * Marks _next, _prev and _parent to the AST nodes to make easier to evaluate
       * @param Object tree  - AST tree to make as &quot;list&quot;
       * @param float parentTree
       */
      _myTrait_.listify = function (tree, parentTree) {

        if (!tree) return;

        tree._parent = parentTree;

        for (var n in tree) {
          if (tree.hasOwnProperty(n)) {
            if (n == "_next") continue;
            if (n == "_prev") continue;
            if (n == "_parent") continue;
            if (n == "range") continue;
            if (n == "comments") continue;
            var item = tree[n];
            if (item instanceof Array) {

              for (var i = 0; i < item.length; i++) {
                var ii = item[i];
                if (typeof ii == "object") {
                  if (i < item.length - 1) ii._next = item[i + 1];
                  if (i > 0) ii._prev = item[i - 1];
                  this.listify(ii, tree);
                }
              }
            } else {
              if (typeof item == "object") {
                this.listify(item, tree);
              }
            }
          }
        }
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

        this.walk(node.left, ctx);

        var a = node.left.eval_res;
        if (!_isDeclared(a)) a = this.evalVariable(node.left, ctx);

        a = _toValue(a);

        if (node.operator == "&&") {
          if (!a) {
            node.eval_res = a;
            return;
          }
        }

        if (node.operator == "||") {
          if (a) {
            node.eval_res = a;
            return;
          }
        }

        // evaluate the right expression
        this.walk(node.right, ctx);

        var b = node.right.eval_res;
        if (!_isDeclared(b)) b = this.evalVariable(node.right, ctx);
        b = _toValue(b);

        node.eval_res = b;
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
        node.object.eval_res = oo;

        var prop;
        if (node.computed) {
          if (node.property.type == "Literal") prop = node.property.value;
          if (node.property.type == "Identifier") prop = node.property.eval_res;
          if (typeof prop == "undefined") prop = this.evalVariable(node.property, ctx);
        } else {
          prop = node.property.name;
        }

        if (!_isUndef(oo)) {
          try {
            if (!this.canAccess(oo)) {
              console.error("Access denied for object ", oo);
              node.eval_res = _undefined;
              return;
            }
            if (prop == "length" && typeof oo == "function" && typeof oo.__$$pLength__ != "undefined") {
              node.eval_res = oo.__$$pLength__;
            } else {
              node.eval_res = oo[prop];
            }
          } catch (e) {}
        }
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.MetaProperty = function (node, ctx) {

        var vname = node.meta + "." + node.property;

        node.eval_res = this.evalVariable(vname, ctx);
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
        if (node.arguments) {
          var me = this,
              cnt = 0;
          node.arguments.forEach(function (n) {
            if (cnt++ > 0) me.out(", ");
            me.walk(n, ctx);
          });
        }
        if (node.callee) {

          this.walk(node.callee, ctx);
          if (!_isUndef(node.callee.eval_res)) {
            var a = [];
            if (node.arguments) {
              var fnToCall = node.callee.eval_res;
              node.arguments.forEach(function (n) {
                if (typeof n.eval_res != "undefined") {
                  a.push(_toValue(n.eval_res));
                } else {
                  a.push(_toValue(me.evalVariable(n, ctx)));
                }
              });

              // --> there is no this pointer for the functions
              // fnToCall.__newTarget__ = fnToCall;

              if (!me.canAccess(fnToCall)) {
                node.eval_res = _undefined;
                return;
              }

              var newObj;
              if (a.length == 0) newObj = new fnToCall();
              if (a.length == 1) newObj = new fnToCall(a[0]);
              if (a.length == 2) newObj = new fnToCall(a[0], a[1]);
              if (a.length == 3) newObj = new fnToCall(a[0], a[1], a[2]);
              if (a.length == 4) newObj = new fnToCall(a[0], a[1], a[2], a[3]);
              if (a.length == 5) newObj = new fnToCall(a[0], a[1], a[2], a[3], a[4]);
              if (a.length == 6) newObj = new fnToCall(a[0], a[1], a[2], a[3], a[4], a[5]);

              node.eval_res = newObj;
            }
          }
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
       * @param float node
       * @param float ctx
       * @param float value
       * @param float assignNode
       */
      _myTrait_.node_assign = function (node, ctx, value, assignNode) {
        if (!this.canAccess(value)) {
          assignNode.eval_res = _undefined;
          return;
        }
        var me = this;
        if (node.type == "MemberExpression") {

          var obj, prop;
          if (typeof node.object.eval_res != "undefined") {
            obj = node.object.eval_res;
          } else {
            obj = me.evalVariable(node.object, ctx);
          }
          if (!me.canAccess(obj)) {
            console.error("Access denied for object ", obj);
            assignNode.eval_res = _undefined;
            return;
          }
          if (node.computed) {
            if (typeof node.property.eval_res != "undefined") {
              // --> Assigment
              prop = node.property.eval_res; // me.evalVariable( node.property.eval_res, ctx ) ;
            } else {
              prop = me.evalVariable(node.property.name, ctx);
            }
          } else {
            prop = node.property.name;
          }
          if (obj && typeof prop != "undefined") {
            obj[prop] = _wrapValue(value);
            assignNode.eval_res = _wrapValue(value);
          }
          return;
        }
        assignNode.eval_res = _wrapValue(value);
        me.assignTo(node.name, ctx, value);
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
      _myTrait_.out = function (str, newline) {};

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
      _myTrait_.RestElement = function (node, ctx) {};

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

        if (node.argument) {
          fnCtx.return_value = node.argument.eval_res;
        } else {
          fnCtx.return_value = _undefined;
        }
        throw {
          type: "return"
        };
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
            node.eval_res = n.eval_res;
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

        var me = this;
        this.collectVarsAndFns(node, ctx, function (node) {
          if (node.type == "VariableDeclaration") {
            node.declarations.forEach(function (d) {
              ctx.variables[d.id.name] = _undefined;
            });
          }

          if (node.type == "FunctionDeclaration") {

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
              fnCtx["this"] = this;
              fnCtx.variables["arguments"] = arguments;
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
                  fnCtx.variables[p.name] = _undefined;
                  if (node.defaults && node.defaults[i]) {
                    me.walk(node.defaults[i], ctx);
                    fnCtx.variables[p.name] = node.defaults[i].eval_res;
                  }
                }
                i++;
              });

              try {
                evl.startWalk(node.body, fnCtx);
              } catch (msg) {
                if (msg.type == "return") {} else {
                  throw msg;
                }
              }

              // returned value is simply
              return fnCtx.return_value;
            };
            node.eval_res.__$$pLength__ = node.params.length;
            // the fn can then be called
            if (node.id && node.id.name) {
              ctx.variables[node.id.name] = node.eval_res;
            }

            return;
          }
          //console.log("Found variable or fn declaration");
          //console.log(node);
        });
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
        if (node.test) {
          this.walk(node.test, ctx);

          if (node.test.eval_res == ctx._switchTest.eval_res) {
            ctx._switchMatch = true;
          }
          if (ctx._switchMatch) {
            if (node.consequent) {
              this.walk(node.consequent, ctx);
            }
          }
        }

        // ctx._switchTest
      };

      /**
       * @param Object node
       * @param float ctx
       */
      _myTrait_.SwitchStatement = function (node, ctx) {

        this.walk(node.discriminant, ctx);

        // Switch statment expressions...
        try {
          var me = this;
          ctx._switchTest = node.discriminant;
          ctx._switchMatch = false;

          this.walk(node.cases, ctx);
        } catch (msg) {
          if (msg.type == "break") {} else {
            throw msg;
          }
        }
      };

      /**
       * @param Object node
       * @param float ctx
       */
      _myTrait_.TemplateElement = function (node, ctx) {};

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.TemplateLiteral = function (node, ctx) {

        // ----
        this.walk(node.expressions, ctx);

        var strOut = "";
        for (var i = 0; i < node.quasis.length; i++) {
          if (i > 0) {
            var epr = node.expressions[i - 1];
            strOut += _toValue(epr.eval_res);
          }

          var q = node.quasis[i];
          strOut += q.value.cooked;
          // this.walk(q, ctx);
        }

        node.eval_res = strOut;
      };

      /**
       * @param float node
       * @param float ctx
       */
      _myTrait_.ThisExpression = function (node, ctx) {
        this.out("this");

        node.eval_res = this.findThis(ctx);
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

        throw {
          type: "throw",
          node: node,
          value: value
        };
      };

      /**
       * @param Object node
       * @param float ctx
       */
      _myTrait_.TryStatement = function (node, ctx) {

        // node._exceptionHandler = node;
        // node._exceptionHandlerCtx = ctx;
        try {
          this.walk(node.block, ctx);
        } catch (msg) {
          // throw { type : "throw", node : node, value };
          var eValue;

          // if some system message...
          if (msg && msg.type) {
            if (msg.type == "return" || msg.type == "break" || msg.type == "continue") {
              throw msg;
              return;
            }
          }

          if (msg && msg.type == "throw") {
            eValue = msg.value;
          } else {
            eValue = msg;
          }

          if (node.finalizer) {
            this.walk(node.finalizer, ctx);
          }

          if (node.handler) {
            var newCtx = this.createContext(ctx);
            // set the exception handler param
            if (node.handler && node.handler.param.name) {
              newCtx.variables[node.handler.param.name] = eValue;
            }
            this.walk(node.handler.body, newCtx);
          } else {
            throw msg;
          }
        }

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

        var value = _toValue(node.argument.eval_res || this.evalVariable(node.argument, ctx));

        if (true) {
          if (node.operator == "-") {
            node.eval_res = -1 * value;
          }
          if (node.operator == "~") {
            node.eval_res = ~value;
          }
          if (node.operator == "!") {
            node.eval_res = !value;
          }
          if (node.operator == "+") {
            node.eval_res = +value;
          }
          if (node.operator == "delete") {
            var argNode = node.argument;
            if (argNode.type == "MemberExpression") {
              var obj, prop;
              if (typeof argNode.object.eval_res != "undefined") {
                obj = argNode.object.eval_res;
              } else {
                obj = this.evalVariable(argNode.object, ctx);
              }
              if (!this.canAccess(obj)) {
                console.error("Access denied for object ", obj);
                node.eval_res = _undefined;
                return;
              }
              if (argNode.computed) {
                if (typeof argNode.property.eval_res != "undefined") {
                  // --> Assigment
                  prop = argNode.property.eval_res; // me.evalVariable( node.property.eval_res, ctx ) ;
                } else {
                  prop = this.evalVariable(argNode.property.name, ctx);
                }
              } else {
                prop = argNode.property.name;
              }
              if (obj && prop) {
                node.eval_res = delete obj[prop];
              } else {
                node.eval_res = false;
              }
              return;
            } else {
              node.eval_res = delete _globalCtx[value];
            }
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

        this.walk(node.argument, ctx);

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
                prop = node.property.eval_res; // this.evalVariable( node.property.eval_res, ctx ) ;
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
          return;
        }
        if (node.operator == "--" && typeof value != "undefined") {
          if (!node.prefix) node.eval_res = value;
          value--;
          if (node.prefix) node.eval_res = value;
          node_assign(node.argument, ctx, value);
        }
      };

      /**
       * @param Object node  - Object to use to create a variable declaration
       * @param Object ctx  - Context of the node
       */
      _myTrait_.VariableDeclaration = function (node, ctx) {

        var me = this;
        var cnt = 0;

        ctx._varKind = node.kind;
        me.walk(node.declarations, ctx);
        /*
        node.declarations.forEach( function(vd) {
        me.walk(vd,ctx);
        });
        */
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
              ctx.variables[node.id.name] = _wrapValue(node.init.eval_res);
            }
            if (ctx._varKind == "let") {
              if (!ctx.letVars) ctx.letVars = {};
              ctx.letVars[node.id.name] = _wrapValue(node.init.eval_res);
            }
            if (ctx._varKind == "const") {
              if (!ctx.constVars) ctx.constVars = {};
              ctx.constVars[node.id.name] = _wrapValue(node.init.eval_res);
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

        // walking using prev & next pointers makes detaching the process probably easier
        if (node instanceof Array) {

          var firstItem = node[0];
          if (!firstItem) return;
          this.walk(firstItem, ctx);
        } else {
          if (node.type) {
            if (this[node.type]) {
              this[node.type](node, ctx);
              //-- then either next or parent...
              var next = node._next;
              if (next) {
                this.walk(next, ctx);
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

        var max_cnt = 1000 * 1000; // <-- maximum loop count, temporary setting...

        while (max_cnt > 0) {
          try {
            if (node.test) {
              this.walk(node.test, ctx);
              if (!node.test.eval_res) {
                break;
              }
            } else {
              // do not allow eternal loop at this point...
              break;
            }
            if (node.body) {
              this.walk(node.body, ctx);
            }
            max_cnt--;
          } catch (msg) {
            // --> continue from here then

            if (msg && msg.type == "continue") {
              if (msg.label && msg.label.name) {
                if (node._label && node._label.name == msg.label.name) {
                  continue;
                }
              } else {
                continue;
              }
            }
            if (msg && msg.type == "break") {
              if (msg.label && msg.label.name) {
                if (node._label && node._label.name == msg.label.name) {
                  break;
                }
              } else {
                break;
              }
            }
            throw msg;
          }
        }
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

// ok

// ok

// ok

//if(node.argument) this.trigger("RestArgument", node.argument);
//this.out(" ...");
//this.walk(node.argument, ctx);

// ok