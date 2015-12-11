
TODO:

mutta ainakin 3 virhekategoriaa löytyi 
1) eval koodin suoritus 
2) joidenkin erikoismuuttujien delete etc. operaatiot 
3) strict moden säännöt
4) this variablen assignointi
5) ReferenceError undfined vars

```javascript

var rawAST = esprima.parse(codeStr, {});
var evl = new ASTEval({
            globals : {
                JSON : window.JSON,
                console : window.console
            },
            accessDenied : [window]
        });

``` 
















   

 


   
#### Class ASTEval


- [_eval](README.md#ASTEval__eval)
- [_getUndefined](README.md#ASTEval__getUndefined)
- [ArrayExpression](README.md#ASTEval_ArrayExpression)
- [ArrayPattern](README.md#ASTEval_ArrayPattern)
- [ArrowExpression](README.md#ASTEval_ArrowExpression)
- [ArrowFunctionExpression](README.md#ASTEval_ArrowFunctionExpression)
- [AssignmentExpression](README.md#ASTEval_AssignmentExpression)
- [assignTo](README.md#ASTEval_assignTo)
- [BinaryExpression](README.md#ASTEval_BinaryExpression)
- [BlockStatement](README.md#ASTEval_BlockStatement)
- [BreakStatement](README.md#ASTEval_BreakStatement)
- [breakWalk](README.md#ASTEval_breakWalk)
- [CallExpression](README.md#ASTEval_CallExpression)
- [canAccess](README.md#ASTEval_canAccess)
- [CatchClause](README.md#ASTEval_CatchClause)
- [ClassBody](README.md#ASTEval_ClassBody)
- [ClassDeclaration](README.md#ASTEval_ClassDeclaration)
- [collectVarsAndFns](README.md#ASTEval_collectVarsAndFns)
- [compileIdentifier](README.md#ASTEval_compileIdentifier)
- [ConditionalExpression](README.md#ASTEval_ConditionalExpression)
- [continueAfterBreak](README.md#ASTEval_continueAfterBreak)
- [ContinueStatement](README.md#ASTEval_ContinueStatement)
- [createChildProcess](README.md#ASTEval_createChildProcess)
- [createContext](README.md#ASTEval_createContext)
- [DebuggerStatement](README.md#ASTEval_DebuggerStatement)
- [DoWhileStatement](README.md#ASTEval_DoWhileStatement)
- [EmptyStatement](README.md#ASTEval_EmptyStatement)
- [endBlock](README.md#ASTEval_endBlock)
- [endCollecting](README.md#ASTEval_endCollecting)
- [evalVariable](README.md#ASTEval_evalVariable)
- [ExpressionStatement](README.md#ASTEval_ExpressionStatement)
- [findAndSetLet](README.md#ASTEval_findAndSetLet)
- [findConstVar](README.md#ASTEval_findConstVar)
- [findLetVar](README.md#ASTEval_findLetVar)
- [findThis](README.md#ASTEval_findThis)
- [ForInStatement](README.md#ASTEval_ForInStatement)
- [ForOfStatement](README.md#ASTEval_ForOfStatement)
- [ForStatement](README.md#ASTEval_ForStatement)
- [FunctionDeclaration](README.md#ASTEval_FunctionDeclaration)
- [FunctionExpression](README.md#ASTEval_FunctionExpression)
- [getCode](README.md#ASTEval_getCode)
- [getCoverage](README.md#ASTEval_getCoverage)
- [getParentProcess](README.md#ASTEval_getParentProcess)
- [getStructures](README.md#ASTEval_getStructures)
- [getTrace](README.md#ASTEval_getTrace)
- [handleException](README.md#ASTEval_handleException)
- [Identifier](README.md#ASTEval_Identifier)
- [IfStatement](README.md#ASTEval_IfStatement)
- [indent](README.md#ASTEval_indent)
- [isKilled](README.md#ASTEval_isKilled)
- [isPaused](README.md#ASTEval_isPaused)
- [kill](README.md#ASTEval_kill)
- [LabeledStatement](README.md#ASTEval_LabeledStatement)
- [listify](README.md#ASTEval_listify)
- [Literal](README.md#ASTEval_Literal)
- [LogicalExpression](README.md#ASTEval_LogicalExpression)
- [MemberExpression](README.md#ASTEval_MemberExpression)
- [MetaProperty](README.md#ASTEval_MetaProperty)
- [MethodDefinition](README.md#ASTEval_MethodDefinition)
- [NewExpression](README.md#ASTEval_NewExpression)
- [nlIfNot](README.md#ASTEval_nlIfNot)
- [node_assign](README.md#ASTEval_node_assign)
- [node_assign_update](README.md#ASTEval_node_assign_update)
- [ObjectExpression](README.md#ASTEval_ObjectExpression)
- [ObjectPattern](README.md#ASTEval_ObjectPattern)
- [out](README.md#ASTEval_out)
- [prevChar](README.md#ASTEval_prevChar)
- [Program](README.md#ASTEval_Program)
- [Property](README.md#ASTEval_Property)
- [pushStructure](README.md#ASTEval_pushStructure)
- [RestElement](README.md#ASTEval_RestElement)
- [ReturnStatement](README.md#ASTEval_ReturnStatement)
- [SequenceExpression](README.md#ASTEval_SequenceExpression)
- [setParentProcess](README.md#ASTEval_setParentProcess)
- [setPaused](README.md#ASTEval_setPaused)
- [skip](README.md#ASTEval_skip)
- [startBlock](README.md#ASTEval_startBlock)
- [startCollecting](README.md#ASTEval_startCollecting)
- [startWalk](README.md#ASTEval_startWalk)
- [Super](README.md#ASTEval_Super)
- [SwitchCase](README.md#ASTEval_SwitchCase)
- [SwitchStatement](README.md#ASTEval_SwitchStatement)
- [TemplateElement](README.md#ASTEval_TemplateElement)
- [TemplateLiteral](README.md#ASTEval_TemplateLiteral)
- [ThisExpression](README.md#ASTEval_ThisExpression)
- [ThrowStatement](README.md#ASTEval_ThrowStatement)
- [TryStatement](README.md#ASTEval_TryStatement)
- [UnaryExpression](README.md#ASTEval_UnaryExpression)
- [UpdateExpression](README.md#ASTEval_UpdateExpression)
- [VariableDeclaration](README.md#ASTEval_VariableDeclaration)
- [VariableDeclarator](README.md#ASTEval_VariableDeclarator)
- [walk](README.md#ASTEval_walk)
- [walkAsString](README.md#ASTEval_walkAsString)
- [WhileStatement](README.md#ASTEval_WhileStatement)
- [WithStatement](README.md#ASTEval_WithStatement)
- [YieldExpression](README.md#ASTEval_YieldExpression)



   
    
##### trait events

- [on](README.md#_on)
- [removeListener](README.md#_removeListener)
- [trigger](README.md#_trigger)


    
    


   
      
    





   
# Class ASTEval


The class has following internal singleton variables:
        
* _cnt
        
* _eventLoop
        
* _isUndef
        
* _undefined
        
* _isDeclared
        
* _wrapValue
        
* _toValue
        
* _globalCtx
        
* _accessDenied
        
        
### <a name="ASTEval__eval"></a>ASTEval::_eval(codeStr, ctx)
`codeStr` The code string to run
 
`ctx` The context to run the code 
 


```javascript
try {
    
    var rawAST = esprima.parse(codeStr, { });
    var evl = new ASTEval({
        globals : _globalCtx,
        accessDenied : _accessDenied
    });
    
    evl._strictMode = this._strictMode;
    
    evl.listify( rawAST );
    evl.startWalk(rawAST, ctx);
        
} catch(e) {
    
}
```

### <a name="ASTEval__getUndefined"></a>ASTEval::_getUndefined(t)


```javascript
return _undefined;
```

### <a name="ASTEval_ArrayExpression"></a>ASTEval::ArrayExpression(node, ctx)


```javascript

var me = this;

// Check values...
if( node.elements && node.elements.length>=0) {
    // Walk the array elements
    
    var cnt=0;
    this.walk(node.elements, ctx);

    node.eval_res = [];
    node.elements.forEach( function(e) {
        var v = e.eval_res || me.evalVariable(e, ctx);
        node.eval_res.push(v);
    });
    
}




```

### <a name="ASTEval_ArrayPattern"></a>ASTEval::ArrayPattern(node, ctx)


```javascript
var me = this;

// Check values...
if( node.elements && node.elements.length>0) {
    // Walk the array elements
    this.out("[");
    var cnt=0;
    node.elements.forEach( function(e) {
        if(cnt++>0) me.out(",");
        me.trigger("ArrayElement", e);
        me.walk(e, ctx);
    })
    this.out("]");
}

```

### <a name="ASTEval_ArrowExpression"></a>ASTEval::ArrowExpression(node, ctx)


```javascript

```

### <a name="ASTEval_ArrowFunctionExpression"></a>ASTEval::ArrowFunctionExpression(node, ctx)


```javascript

var me = this;
var bind_this = this.findThis( ctx );
node.eval_res = function() {
    // ArrowFunctionExpression
    if(me.isKilled()) return;

    var args = [], arg_len = arguments.length,
        origArgs = arguments;
    // function ctx is the parent ctx.
 
    // defining the "this" is left open, perhaps only overriden when needed...
    var fnCtx = { functions : {}, vars : {}, variables : {}, parentCtx : ctx};    
    fnCtx["this"] = bind_this;
    var evl = me.createChildProcess();
    // evl._strictMode = me._strictMode;
    
    for(var i=0; i<arg_len; i++) {
        args[i] = arguments[i];
    }
    // Going the node body with set values or variables...
    var i = 0;
    node.params.forEach(function(p) {
        if(p.type=="RestElement") {
            // should be the rest of the string...
            fnCtx.variables[p.argument.name] =  args.slice(i);
            i++;
            return;
        }        
        if(typeof(origArgs[i]) != "undefined") {
            fnCtx.variables[p.name] =  origArgs[i];
        } else {
            if(node.defaults && node.defaults[i]) {
                me.walk(node.defaults[i], ctx);
                fnCtx.variables[p.name] =  node.defaults[i].eval_res;
            }
        }
        i++;
    });
    
    try {
        evl.startWalk(node.body, fnCtx);
    } catch(msg) {
        if(msg.type=="return") {
            // ok
        } else {
            throw msg;
        }
    }
    
    if(node.expression) {
        fnCtx.return_value = node.body.eval_res;
    }
    
    // returned value is simply
    return fnCtx.return_value;
    
}

// the fn can then be called
if(node.id && node.id.name) {
    ctx.variables[node.id.name] = node.eval_res;
}

```

### <a name="ASTEval_AssignmentExpression"></a>ASTEval::AssignmentExpression(assignNode, ctx)


```javascript

var node = assignNode;

this.walk(node.right, ctx);
this.walk(node.left, ctx);

var value = node.right.eval_res;
if(!_isDeclared(value)) value = this.evalVariable(node.right, ctx);
var left_value = node.left.eval_res;
if(!_isDeclared(left_value)) left_value = this.evalVariable(node.left, ctx);

value = _toValue( value );
left_value = _toValue( left_value );

var me = this;

if(node.operator=="=") {
    return this.node_assign(node.left, ctx, value, assignNode)
}
if(node.operator=="+=") {
    return this.node_assign(node.left, ctx, left_value+value, assignNode)
}
if(node.operator=="-=") {
    return this.node_assign(node.left, ctx, left_value-value, assignNode)
}
if(node.operator=="*=") {
    return this.node_assign(node.left, ctx, left_value*value, assignNode)
}
if(node.operator=="/=") {
    return this.node_assign(node.left, ctx, left_value/value, assignNode)
}
if(node.operator=="%=") {
    return this.node_assign(node.left, ctx, left_value%value, assignNode)
}
if(node.operator=="**=") {
    return this.node_assign(node.left, ctx, Math.pow( left_value, value) , assignNode);
}
if(node.operator=="<<=") {
    return this.node_assign(node.left, ctx, left_value << value , assignNode);
}
if(node.operator==">>=") {
    return this.node_assign(node.left, ctx, left_value >> value , assignNode);
}
if(node.operator==">>>=") {
    return this.node_assign(node.left, ctx, left_value >>> value , assignNode);
}
if(node.operator=="&=") {
    return this.node_assign(node.left, ctx, left_value & value , assignNode);
}
if(node.operator=="^=") {
    return this.node_assign(node.left, ctx, left_value ^ value , assignNode);
}
if(node.operator=="|=") {
    return this.node_assign(node.left, ctx, left_value | value , assignNode);
}

console.error("Unknown assigment ",node.operator);

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

```

### <a name="ASTEval_assignTo"></a>ASTEval::assignTo(varName, ctx, value)


```javascript
var name;
if(typeof(varName)=="object") {
    var node = varName;
    if(node.type == "Identifier") {
        name = node.name;
    }
    if( node.type == "Literal") {
        name = node.value;
    }    
} else {
    name = varName;
}

if(this.findAndSetLet(name, ctx, value)) {
    return;
}

// does the context have this variable?
if(_isDeclared( ctx.variables[name] )) {
    ctx.variables[name] = _wrapValue(value);
} else {
    if(ctx.parentCtx) {
        this.assignTo(name, ctx.parentCtx, value);
    }
}
```

### <a name="ASTEval_BinaryExpression"></a>ASTEval::BinaryExpression(node, ctx)


```javascript

var a,b;
this.walk(node.left, ctx);
a = node.left.eval_res;
if(!_isDeclared(a)) a = this.evalVariable(node.left, ctx);

this.walk(node.right, ctx);
b = node.right.eval_res;
if(!_isDeclared(b)) b = this.evalVariable(node.right, ctx);

a = _toValue(a);
b = _toValue(b);

       // ?? should result be object with value ?

if(node.operator=="+") return node.eval_res = a + b;
if(node.operator=="-") return node.eval_res = a - b;
if(node.operator=="*") return node.eval_res = a * b;
if(node.operator=="/") return node.eval_res = a / b;
if(node.operator=="<") return node.eval_res = a < b;
if(node.operator=="<=") return node.eval_res = a <= b;
if(node.operator==">") return node.eval_res = a > b;
if(node.operator==">=") return node.eval_res = a >= b;
if(node.operator=="&") return node.eval_res = a & b;
if(node.operator=="|") return node.eval_res = a | b;
if(node.operator=="<<") return node.eval_res = a << b;
if(node.operator==">>") return node.eval_res = a >> b;
if(node.operator==">>>") return node.eval_res = a >>> b;

if(node.operator=="^") return node.eval_res = a ^ b;
if(node.operator=="==") return node.eval_res = a == b;
if(node.operator=="!=") return node.eval_res = a != b;
if(node.operator=="===") return node.eval_res = a === b;
if(node.operator=="!==") return node.eval_res = a !== b;
if(node.operator=="%") return node.eval_res = a % b;
if(node.operator=="instanceof" ) return node.eval_res = a instanceof b;
if(node.operator=="in" ) return node.eval_res = a in b;

console.error("Undefined variable "+node.operator+" in BinaryExpression");

```

### <a name="ASTEval_BlockStatement"></a>ASTEval::BlockStatement(node, ctx)


```javascript

// keeps at the same context right now I guess....

var blockCtx = { 
    block : true,
    parentCtx : ctx
};    

var pCtx = ctx;
while(pCtx && pCtx.block) {
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

```

### <a name="ASTEval_BreakStatement"></a>ASTEval::BreakStatement(node, ctx)


```javascript
if(node.label) this.walk(node.label, ctx);
throw { type : "break", label : node.label };
```

### <a name="ASTEval_breakWalk"></a>ASTEval::breakWalk(t)


```javascript

this._breakWalk = true;
```

### <a name="ASTEval_CallExpression"></a>ASTEval::CallExpression(node, ctx)


```javascript
if(node.callee) {
    if(node.callee.type=="FunctionExpression") this.out("(");
    this.walk(node.callee, ctx);
    if(node.callee.type=="FunctionExpression") this.out(")");
    this.out("(");
    if(node.arguments) {
        var me = this,
            cnt=0;
        this.walk(node.arguments,ctx);
         /*forEach(function(n) {
            if(cnt++>0) me.out(", ");
            me.walk(n,ctx); 
        });
        */
    }
    this.out(")");
    
    // Parts have been evaluated, then perform the function call..
    
    var me = this;
    if(!_isUndef(node.callee.eval_res)) {
        var args = [];
        var fnToCall = node.callee.eval_res;
        if(node.arguments) {
            node.arguments.forEach(function(n) {
                // me.walk(n,ctx);
                if(typeof( n.eval_res ) != "undefined") {
                    args.push(_toValue(n.eval_res));
                } else {
                    args.push( _toValue(me.evalVariable(n, ctx) ) );
                }
            });
        }     
        // Todo : define calls to 'this'
        
        var this_pointer = ctx["this"]; // <- or global this perhaps 
        var b_is_member = false;
        if(node.callee.type=="MemberExpression") {
            // this.walk(node.callee, ctx);
            this_pointer = node.callee.object.eval_res;
            if(!this.canAccess(this_pointer)) {
                console.error("Access denied for object ", this_pointer);
                node.eval_res = _undefined;
                return;
            }    
            b_is_member = true;
        }
        if(node.callee.type=="ThisExpression") {
            if(ctx.parentCtx) this_pointer = ctx.parentCtx["this"];
        }        
        
        // in case we are calling eval
        if(node.callee.name && node.callee.name=="eval") {
            if(!b_is_member) {
                
                // the eval call is special...
                var evalCtx = me.createContext(ctx);
                if(me._strictMode) {
                    evalCtx["this"] = _undefined;
                } else {
                    evalCtx["this"] = _globalCtx;
                }
                me._eval(args[0], evalCtx);
                node.eval_res = undefined;
                return;
            }
        }
        
        if(typeof(fnToCall) == "function") {
            node.eval_res = fnToCall.apply( this_pointer, args);
        }
        
        
    }
    
    
}
```

### <a name="ASTEval_canAccess"></a>ASTEval::canAccess(obj)
`obj` The object pointer
 

Tests if Object can be directly accessed using property accessor
```javascript

if(_accessDenied) {
    for(var i=0; i<_accessDenied.length;i++) {
        if(_accessDenied[i] === obj) return false;
    }
}
return true;
```

### <a name="ASTEval_CatchClause"></a>ASTEval::CatchClause(node, ctx)


```javascript
this.out(" catch ");

if(node.param) {
    this.out("(");
    this.walk(node.param, ctx);
    this.out(")");
}
if(node.body) {
    this.walk(node.body, ctx);
}
```

### <a name="ASTEval_ClassBody"></a>ASTEval::ClassBody(node, ctx)


```javascript
this.out("{", true);

// walk the class body
this.indent(1);
this.walk(node.body, ctx);
this.indent(-1);

this.out("}", true);

```

### <a name="ASTEval_ClassDeclaration"></a>ASTEval::ClassDeclaration(node, ctx)


```javascript

this.out("class ");

if(node.id) {
    this.walk( node.id, ctx );
    this.out(" ");
}

if(node.superClass) {
    this.trigger("Extends", node.superClass);
    this.out(" extends ");
    this.walk( node.superClass, ctx);
}

if(node.body) {
    this.walk( node.body,ctx);
}


```

### <a name="ASTEval_collectVarsAndFns"></a>ASTEval::collectVarsAndFns(node, ctx, cb)
`node` AST node to start from
 
`ctx` Context to save the findings...
 
`cb` callback when found
 


```javascript
if(!node) return;
if(!node.type) return;
if(node._fnc) return;

if(node.type=="FunctionExpression") {
    return;
}

if(node.type=="FunctionDeclaration") {
    cb(node);
    return;
}
if(node.type=="VariableDeclaration") {
    cb(node);
    return;
}
node._fnc = true;
for(var n in node) {
    if(node.hasOwnProperty(n)) {
        if(n=="_next") continue;
        if(n=="_prev") continue;
        if(n=="_parent") continue;
        if(n=="range") continue;
        if(n=="comments") continue;
        var item = node[n];
        if(item instanceof Array) {
            for(var i=0; i<item.length;i++) {
                var ii = item[i];
                if(typeof(ii)=="object") {
                    this.collectVarsAndFns( ii, ctx, cb );
                }
            }
        } else {
            if(typeof(item) == "object") {
                this.collectVarsAndFns(item, ctx, cb);
            }
        }
    }
}
```

### <a name="ASTEval_compileIdentifier"></a>ASTEval::compileIdentifier(name, ctx)


```javascript

if(name===null || name=="null") return [true,null];
// if(name=="undefined") return [true, _undefined];
// if(typeof(name)=="number") return [true,name];

if(ctx.letVars && _isDeclared( ctx.letVars[name] ))  return [false, ctx.letVars, name];

if(ctx.constVars && _isDeclared( ctx.constVars[name] ) ) return [false, ctx.constVars, name];
if(ctx.variables && _isDeclared( ctx.variables[name] ))  return [false, ctx.variables, name];

var pc = ctx.parentCtx;
while(pc) {
    if(pc.letVars && _isDeclared( pc.letVars[name] ))  return [false, pc.letVars, name];
    if(pc.constVars && _isDeclared( pc.constVars[name] ) ) return [false, pc.constVars, name];
    if(pc.variables && _isDeclared( pc.variables[name] ))  return [false, pc.variables, name];  
    pc = pc.parentCtx;
}
if(_globalCtx && (typeof(_globalCtx[name])!="undefined")) return [false, _globalCtx, name];

```

### <a name="ASTEval_ConditionalExpression"></a>ASTEval::ConditionalExpression(node, ctx)


```javascript

this.walk(node.test, ctx);
if(_toValue(node.test.eval_res)) {
    this.walk(node.consequent,ctx);
    node.eval_res = node.consequent.eval_res;
} else {
    this.walk(node.alternate,ctx);
    node.eval_res = node.alternate.eval_res;
}

```

### <a name="ASTEval_continueAfterBreak"></a>ASTEval::continueAfterBreak(t)


```javascript
/*            this._breakState = {
                node : node,
                ctx : ctx,
                process : this,
                path : this._path
            }
*/
var state = this._breakState;
if(state && this._break) {
    
    this._break = false;
    this._path = [];
    this.walk( state.node, state.ctx  );
}

```

### <a name="ASTEval_ContinueStatement"></a>ASTEval::ContinueStatement(node, ctx)


```javascript

throw { type : "continue", label : node.label };
```

### <a name="ASTEval_createChildProcess"></a>ASTEval::createChildProcess(options)


```javascript

if(!options) {
    options = {};
}

var evl = new ASTEval();
evl._strictMode = this._strictMode;
evl._trace = this._trace;
if(this._trace) {
    evl._traceRes = this._traceRes;
}

return evl;
```

### <a name="ASTEval_createContext"></a>ASTEval::createContext(ctx, isBlock)
`ctx` Parent Context
 


```javascript
var newCtx = {     
                  parentCtx : ctx,
                  block : isBlock
              };   

var pCtx = ctx;
while(pCtx && pCtx.block) {
    pCtx = pCtx.parentCtx;
}

if(isBlock) {
    newCtx.variables = pCtx.variables;
} else {
    newCtx.variables = {};   
}

return newCtx;
```

### <a name="ASTEval_DebuggerStatement"></a>ASTEval::DebuggerStatement(node, ctx)


```javascript
/*this.nlIfNot();
this.out("debugger;");

throw {
    msg : "debugger",
    node : node,
}
*/

debugger;
```

### <a name="ASTEval_DoWhileStatement"></a>ASTEval::DoWhileStatement(node, ctx)


```javascript
var max_cnt = 1000*1000; // <-- maximum loop count, temporary setting...

do {
    try {
        if(node.body) {
            this.walk(node.body,ctx);
        }    
        max_cnt--;
        if(node.test) {
            this.walk(node.test,ctx);
            if(!_toValue(node.test.eval_res)) {
                break;
            }
        } else {
            // do not allow eternal loop at this point...
            break;
        }    
    } catch(msg) {
            // --> continue from here then
            if(msg && msg.type=="continue") {
                if(msg.label && msg.label.name) {
                    if(node._label && node._label.name==msg.label.name) {
                        continue;
                    }
                } else {
                    continue;
                }
            }
            if(msg && msg.type=="break") {
                if(msg.label && msg.label.name) {
                    if(node._label && node._label.name==msg.label.name) {
                        break;
                    }
                } else {
                    break;
                }
            }
            throw msg;
        }    
} while(max_cnt>0);

```

### <a name="ASTEval_EmptyStatement"></a>ASTEval::EmptyStatement(t)


```javascript

```

### <a name="ASTEval_endBlock"></a>ASTEval::endBlock(t)


```javascript
this.out("}", true);
this.indent(-1);
```

### <a name="ASTEval_endCollecting"></a>ASTEval::endCollecting(t)


```javascript
this._collecting = false;
```

### <a name="ASTEval_evalVariable"></a>ASTEval::evalVariable(varName, ctx)


```javascript
var name;
if(varName===null || varName=="null") return null;
if(!ctx) return _undefined;

if(typeof(varName)=="number") return name;

if(typeof(varName)=="object") {

    if(typeof(varName.eval_res)!="undefined") return varName.eval_res;
    var node = varName;

    if(node.type == "Identifier") {
        name = varName.name;
    } else {
        if( node.type == "Literal") {
            return node.value; 
        } else {
            return _undefined;
        }    
    }
} else {
    name = varName;
}

if(ctx.letVars && _isDeclared( ctx.letVars[name] ))  return ctx.letVars[name];
if(ctx.constVars && _isDeclared( ctx.constVars[name] ) ) return ctx.constVars[name];
if(ctx.variables && _isDeclared( ctx.variables[name] ))  return ctx.variables[name];

if(ctx.parentCtx) {
    var pc = ctx.parentCtx;
    if(pc.letVars && _isDeclared( pc.letVars[name] ))  return pc.letVars[name];
    if(pc.constVars && _isDeclared( pc.constVars[name] ) ) return pc.constVars[name];
    if(pc.variables && _isDeclared( pc.variables[name] ))  return pc.variables[name];    
}

var letVar = this.findLetVar(name, ctx);
if(_isDeclared(letVar)) {
    if(_isUndef(letVar)) return undefined;
    return letVar;
}
var constVar = this.findConstVar(name, ctx);
if(_isDeclared(constVar)) {
    if(_isUndef(constVar)) return undefined;
    return constVar;
}

if(_isDeclared( ctx.variables[name]))  {
    if(_isUndef(ctx.variables[name])) return undefined;
    return ctx.variables[name];
} else {
    if(ctx.parentCtx) {
        return this.evalVariable(name, ctx.parentCtx);
    } else {
        // unfortunate constant :/ 
        if(_globalCtx) {
            if(_isDeclared(_globalCtx[name])) {
                return _globalCtx[name];
            } else {
                // throw new ReferenceError(name+" is not defined");
            }
            
        }
        // return window[name];
    }
}
```

### <a name="ASTEval_ExpressionStatement"></a>ASTEval::ExpressionStatement(node, ctx)


```javascript
this.nlIfNot();
this.walk(node.expression, ctx);
this.out(";", true);

node.eval_res = node.expression.eval_res;
```

### <a name="ASTEval_findAndSetLet"></a>ASTEval::findAndSetLet(name, ctx, value)


```javascript
// does the context have this variable?
if(ctx.letVars && _isDeclared( ctx.letVars[name] )  ) {
    ctx.letVars[name] = _wrapValue(value);
    return true;
} else {
    if(ctx.parentCtx) {
        return this.findAndSetLet(name, ctx.parentCtx, value);
    }
}
```

### <a name="ASTEval_findConstVar"></a>ASTEval::findConstVar(name, ctx)


```javascript
if(ctx.constVars && _isDeclared( ctx.constVars[name] ) )  {
    return ctx.constVars[name];
} else {
    if(ctx.parentCtx) {
        return this.findConstVar(name, ctx.parentCtx);
    } 
}
```

### <a name="ASTEval_findLetVar"></a>ASTEval::findLetVar(name, ctx)


```javascript

if(ctx.letVars && _isDeclared( ctx.letVars[name] ))  {
    return ctx.letVars[name];
} else {
    if(ctx.parentCtx) {
        return this.findLetVar(name, ctx.parentCtx);
    } 
}
```

### <a name="ASTEval_findThis"></a>ASTEval::findThis(ctx)
`ctx` Context to use
 


```javascript

if(ctx["this"]) return ctx["this"];
if(ctx.parentCtx) return this.findThis( ctx.parentCtx );

if(!this.canAccess(_globalCtx)) {
    console.error("Can not access ", _globalCtx);
    return _undefined;
}

return _globalCtx;
```

### <a name="ASTEval_ForInStatement"></a>ASTEval::ForInStatement(node, ctx)


```javascript

var myCtx = this.createContext( ctx, true );

if(node.left) {
    this.walk(node.left,myCtx);
} else {
    return;
}
if(node.right) {
    this.walk(node.right,myCtx);
} else {
    return;
}

var obj = node.right.eval_res;
var propName;
var decl, kind; //  = "var";
if(node.left.type=="VariableDeclaration") {
    decl = node.left.declarations[0];
    kind = decl.kind;
    propName = decl.name || decl.id.name;
} else {
    if(node.left.type=="Identifier") {
        propName = node.left.name;
    } else {
        propName = node.left.eval_res;
    }
}

if(!propName || ! obj) return;

for(var xx in obj) {
    // must set the variable ...
    try {
        if(decl) {
            // ??? declaration ??? 
            this.assignTo( propName, myCtx, xx);
        } else {
            this.assignTo( propName, myCtx, xx);
        }
        // Then... ready to go???
        this.walk(node.body, myCtx);
    } catch(msg) {
                    // --> continue from here then
                    if(msg && msg.type=="continue") {
                        if(msg.label && msg.label.name) {
                            if(node._label && node._label.name==msg.label.name) {
                                continue;
                            }
                        } else {
                            continue;
                        }
                    }
                    if(msg && msg.type=="break") {
                        if(msg.label && msg.label.name) {
                            if(node._label && node._label.name==msg.label.name) {
                                break;
                            }
                        } else {
                            break;
                        }
                    }
                    throw msg;
                }      
}

```

### <a name="ASTEval_ForOfStatement"></a>ASTEval::ForOfStatement(node, ctx)


```javascript

var myCtx = this.createContext( ctx, true );

if(node.left) {
    this.walk(node.left,myCtx);
} else {
    return;
}
if(node.right) {
    this.walk(node.right,myCtx);
} else {
    return;
}

var obj = node.right.eval_res;
var propName;
var decl, kind; //  = "var";
if(node.left.type=="VariableDeclaration") {
    decl = node.left.declarations[0];
    kind = decl.kind;
    propName = decl.name || decl.id.name;
} else {
    if(node.left.type=="Identifier") {
        propName = node.name;
    } else {
        propName = node.left.eval_res;
    }
}

if(!propName || ! obj) return;

var me = this;
obj.every( function(xx) {
    // must set the variable ...
    try {
        if(decl) {
            // ??? declaration ??? 
            me.assignTo( propName, myCtx, xx);
        } else {
            me.assignTo( propName, myCtx, xx);
        }
        // Then... ready to go???
        me.walk(node.body, myCtx);
        return true;
    } catch(msg) {
                    // --> continue from here then
                    if(msg && msg.type=="continue") {
                        if(msg.label && msg.label.name) {
                            if(node._label && node._label.name==msg.label.name) {
                                return true;
                            }
                        } else {
                            return true;
                        }
                    }
                    if(msg && msg.type=="break") {
                        if(msg.label && msg.label.name) {
                            if(node._label && node._label.name==msg.label.name) {
                                return false;
                            }
                        } else {
                            return false;
                        }
                    }
                    throw msg;
                }      
});

```

### <a name="ASTEval_ForStatement"></a>ASTEval::ForStatement(node, ctx)


```javascript

var myCtx = this.createContext( ctx, true );

if(node.init) {
    this.walk(node.init,myCtx);
}

var max_cnt = 1000*1000; // <-- maximum loop count, temporary setting...

while(max_cnt>0) {
    try {
        if(node.test) {
            this.walk(node.test,myCtx);
            if(!_toValue( node.test.eval_res) ) {
                break;
            }
        } else {
            // do not allow eternal loop at this point...
            break;
        }
        if(node.body) {
            this.walk(node.body,myCtx);
        }    
        if(node.update) {
            this.walk(node.update,myCtx);
        }
        max_cnt--;
    } catch(msg) {
                // --> continue from here then
            if(msg && msg.type=="continue") {
                if(msg.label && msg.label.name) {
                    if(node._label && node._label.name==msg.label.name) {
                        if(node.update) {
                            this.walk(node.update,myCtx);
                        }                        
                        continue;
                    }
                } else {
                    if(node.update) {
                        this.walk(node.update,myCtx);
                    }                         
                    continue;
                }
            }
            if(msg && msg.type=="break") {
                if(msg.label && msg.label.name) {
                    if(node._label && node._label.name==msg.label.name) {
                        break;
                    }
                } else {
                    break;
                }
            }
                throw msg;
            }    
}
```

### <a name="ASTEval_FunctionDeclaration"></a>ASTEval::FunctionDeclaration(node, ctx)


```javascript

// Do not declare the function again...
if(node.eval_res) return;

var me = this;

if(node.id) this.walk(node.id, ctx);

node.eval_res = function() {
    // FunctionDeclaration statement
    if(me.isKilled()) return;
    var args = [], arg_len = arguments.length,
        origArgs = arguments;

    var fnCtx = { functions : {}, vars : {}, variables : {}, parentCtx : ctx};
    fnCtx["this"] = this;
    fnCtx.variables["arguments"] = arguments;
    if (this instanceof node.eval_res) {
        fnCtx.variables["new.target"] = node.eval_res;
    }      
    var evl = me.createChildProcess();
    evl._strictMode = me._strictMode;
    
    for(var i=0; i<arg_len; i++) {
        args[i] = arguments[i];
    }
    // Going the node body with set values or variables...
    var i = 0;
    node.params.forEach(function(p) {
        if(p.type=="RestElement") {
            // should be the rest of the string...
            fnCtx.variables[p.argument.name] =  args.slice(i);
            i++;
            return;
        }        
        if(typeof(origArgs[i]) != "undefined") {
            fnCtx.variables[p.name] =  origArgs[i];
        } else {
            fnCtx.variables[p.name] =  _undefined;
            if(node.defaults && node.defaults[i]) {
                me.walk(node.defaults[i], ctx);
                fnCtx.variables[p.name] =  node.defaults[i].eval_res;
            }
        }
        i++;
    });
    
    try {
        evl.startWalk(node.body, fnCtx);
    } catch(msg) {
        if(msg.type=="return") {
            // ok
        } else {
            throw msg;
        }
    }
    
    // returned value is simply
    return fnCtx.return_value;
    
}
node.eval_res.__$$pLength__ = node.params.length;
node.params.forEach( function(p) {
    if(p.type=="RestElement") node.eval_res.__$$pLength__--;
});

// the fn can then be called
if(node.id && node.id.name) {
    node.eval_res.__$$name__ = node.id.name;
    ctx.variables[node.id.name] = node.eval_res;
}


```

### <a name="ASTEval_FunctionExpression"></a>ASTEval::FunctionExpression(node, ctx)


```javascript

var me = this;
if(node.id) this.walk(node.id, ctx);

node.eval_res = function() {
    
    // FunctionExpression
    if(me.isKilled()) return;
    var args = [], arg_len = arguments.length,
        origArgs = arguments;
    // function ctx is the parent ctx.
 
    // defining the "this" is left open, perhaps only overriden when needed...
    var fnCtx = { functions : {}, vars : {}, variables : {}, parentCtx : ctx};    
    fnCtx["this"] = this;
    fnCtx.variables["arguments"] = arguments;
    if (this instanceof node.eval_res) {
        fnCtx.variables["new.target"] = node.eval_res;
    }    
    var evl = me.createChildProcess();

    for(var i=0; i<arg_len; i++) {
        args[i] = arguments[i];
    }
    // Going the node body with set values or variables...
    var i = 0;
    node.params.forEach(function(p) {

        if(p.type=="RestElement") {
            // should be the rest of the string...
            fnCtx.variables[p.argument.name] =  args.slice(i);
            i++;
            if(!p._ecnt) p._cnt=0;
            p._ecnt++;            
            return;
        }
        if(typeof(origArgs[i]) != "undefined") {
            fnCtx.variables[p.name] =  origArgs[i];
            if(!p._ecnt) p._ecnt=0;
            p._ecnt++;                        
        } else {
            fnCtx.variables[p.name] =  _undefined;
            if(node.defaults && node.defaults[i]) {
                me.walk(node.defaults[i], ctx);
                fnCtx.variables[p.name] =  node.defaults[i].eval_res;
                if(!node.defaults._cnt) node.defaults._ecnt=0;
                node.defaults._ecnt++;                            
            }
        }
        i++;
    });
    try {
        evl.startWalk(node.body, fnCtx);
    } catch(msg) {
        if(msg.type=="return") {
            // ok
        } else {
            throw msg;
        }
    }
    
    // returned value is simply
    return fnCtx.return_value;
    
}

// TODO: disallow rest param...
node.eval_res.__$$pLength__ = node.params.length;
node.params.forEach( function(p) {
    if(p.type=="RestElement") node.eval_res.__$$pLength__--;
});

// the fn can then be called
if(node.id && node.id.name) {
    node.eval_res.__$$name__ = node.id.name;
    ctx.variables[node.id.name] = node.eval_res;
}

```

### <a name="ASTEval_getCode"></a>ASTEval::getCode(t)


```javascript
return this._codeStr;
```

### <a name="ASTEval_getCoverage"></a>ASTEval::getCoverage(node, options)
`node` AST node to calc coverage
 

Get code coverage prosents
```javascript
var total_cnt = 0,
    covered_cnt = 0;
var walkTree = function(tree) {
    if(!tree) return;
    if(tree.type) {
        if(tree._ecnt) covered_cnt++;
        if(options && options.notCoveredCb) {
            if(!tree._ecnt) options.notCoveredCb( tree );
        }
        total_cnt++;
    }
    for(var n in tree) {
        if(tree.hasOwnProperty(n)) {
            if(n=="_next") continue;
            if(n=="range") continue;
            if(n=="eval_res") continue;
            if(n=="loc") continue;
            
            if(n=="comments") continue;
            var item = tree[n];
            if(item instanceof Array) {
                
                for(var i=0; i<item.length;i++) {
                    var ii = item[i];
                    if(typeof(ii)=="object") {
                        if(i < (item.length-1)) ii._next = item[i+1];
                        //if(i>0) ii._prev = item[i-1];
                        walkTree( ii, tree );
                    }
                }
            } else {
                if(typeof(item) == "object") {
                    walkTree(item, tree);
                }
            }
        }
    }
}
walkTree( node );

return {
    coverage : covered_cnt / total_cnt,
    total_cnt : total_cnt,
    covered_cnt : covered_cnt
}
```

### <a name="ASTEval_getParentProcess"></a>ASTEval::getParentProcess(t)


```javascript
return this._parentProcess;
```

### <a name="ASTEval_getStructures"></a>ASTEval::getStructures(t)


```javascript
return this._structures;
```

### <a name="ASTEval_getTrace"></a>ASTEval::getTrace(t)


```javascript
return this._traceRes;
```

### <a name="ASTEval_handleException"></a>ASTEval::handleException(e)
`e` Exception object
 


```javascript

// Do something to try to find the exception handler for this...

// this._exceptionHandler

// should reverse the exception to some line...
for( var i=this._path.length-1; i>=0 ; i-- ) {
    
    var n = this._path[i];
    if(n.type=="TryStatement") {
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
        if(node.handler) {
            try {
                this.walk(node.handler.body, newCtx);
            } catch(e) {
                
            }
        }
        if(node.finalizer) {
            this.walk(node.finalizer, newCtx);
        }       
        break;
    }
}
```

### <a name="ASTEval_Identifier"></a>ASTEval::Identifier(node, ctx)
`node` Node to walk
 
`ctx` Context to use
 


```javascript

if(node.name=="undefined") {
    node.eval_res = _undefined;
    return;
}
node.eval_res = this.evalVariable( node.name, ctx );


```

### <a name="ASTEval_IfStatement"></a>ASTEval::IfStatement(node, ctx)


```javascript

this.walk(node.test, ctx);
if(_toValue(node.test.eval_res)) {
    this.walk(node.consequent,ctx);
} else {
    this.walk(node.alternate,ctx);
}

```

### <a name="ASTEval_indent"></a>ASTEval::indent(change)
`change` Delta to modify the indent
 


```javascript

this._indent += change;
if(this._indent<0) this._indent = 0;
```

### ASTEval::constructor( options )
Walks the AST tree, creates events on walk steps
```javascript

this._structures = [];

this._tabChar = "  ";
this._codeStr = "";
this._currentLine = "";
this._indent = 0;
this._traceRes = [];

this._options = options || {};

if(this._options.globals) {
    _globalCtx = this._options.globals;
}
if(this._options.accessDenied) {
    _accessDenied = this._options.accessDenied;
}

if(this._options.trace) {
    this._trace = this._options.trace;
}

if(!_globalCtx) _globalCtx = {};

if(!_isUndef) {
    _undefined = {};
    _isUndef = function(a) {
        return (a === _undefined) || (typeof(a)==="undefined");
    }
    _isDeclared = function(a) {
        return (typeof(a)!="undefined");
    }    
    _wrapValue = function(v) {
        if(v === _undefined) return v;
        if(v === undefined) return _undefined;
        if(typeof(v)=="undefined") return _undefined;
        return v;
    }
    _toValue = function(v) {
        if(v === _undefined) return undefined;
        return v;
    }    
}
```
        
### <a name="ASTEval_isKilled"></a>ASTEval::isKilled(t)

Returns true if the process has been killed
```javascript

if( this._isKilled ) return true;

var p = this.getParentProcess();
if(p) return p.isKilled();
```

### <a name="ASTEval_isPaused"></a>ASTEval::isPaused(t)


```javascript

if( this._isPaused ) return true;

var p = this.getParentProcess();
if(p) return p.isPaused();
```

### <a name="ASTEval_kill"></a>ASTEval::kill(t)


```javascript

this._isKilled = true;
```

### <a name="ASTEval_LabeledStatement"></a>ASTEval::LabeledStatement(node, ctx)


```javascript
this.walk(node.label, ctx);
if(node.body) {
    if(node.label && node.label) {
        node.body._label = node.label;        
    }
    this.walk(node.body, ctx);
}

```

### <a name="ASTEval_listify"></a>ASTEval::listify(tree, parentTree)
`tree` AST tree to make as &quot;list&quot;
 

Marks _next, _prev and _parent to the AST nodes to make easier to evaluate
```javascript

if(!tree) return;

// tree._parent = parentTree;

for(var n in tree) {
    if(tree.hasOwnProperty(n)) {
        if(n=="_next") continue;
        if(n=="range") continue;
        if(n=="comments") continue;
        if(n=="loc") continue;
        if(n=="eval_res") continue;
        
        var item = tree[n];
        
        if(typeof(item) == "function") continue;
        
        if(item instanceof Array) {
            
            for(var i=0; i<item.length;i++) {
                var ii = item[i];
                if(typeof(ii)=="object") {
                    if(i < (item.length-1)) ii._next = item[i+1];
                    //if(i>0) ii._prev = item[i-1];
                    this.listify( ii, tree );
                }
            }
        } else {
            if(typeof(item) == "object") {
                this.listify(item, tree);
            }
        }
    }
}
```

### <a name="ASTEval_Literal"></a>ASTEval::Literal(node, ctx)


```javascript

// set evaluated values to the node to be used later if necessary
node.eval_res = node.value;
node.eval_type = typeof(node.value);

// The strict mode is used from now on...
if(node.value=="use strict") {
    this._strictMode = true;
}
```

### <a name="ASTEval_LogicalExpression"></a>ASTEval::LogicalExpression(node, ctx)


```javascript

this.walk(node.left, ctx);

var a = node.left.eval_res;
if(!_isDeclared(a)) a = this.evalVariable(node.left, ctx);

a = _toValue(a);

if(node.operator == "&&") {
    if(!a) {
        node.eval_res = a;
        return;
    }
}

if(node.operator == "||") {
    if(a) {
        node.eval_res = a;
        return;
    }
}

// evaluate the right expression
this.walk(node.right, ctx);

var b = node.right.eval_res;
if(!_isDeclared(b)) b = this.evalVariable(node.right, ctx);
b = _toValue(b);

node.eval_res = b;

```

### <a name="ASTEval_MemberExpression"></a>ASTEval::MemberExpression(node, ctx)


```javascript

this.walk(node.object,ctx);

if(node.computed) {
    this.walk(node.property, ctx);    
} else {
    // TODO: to make possible rising reference errors, walk only computed side
    // and mark this as exectued
    this.walk(node.property, ctx);    
}

// 
var oo;
if( node.object.type == "ThisExpression" ) {
    oo = this.findThis( ctx );
} else {
    oo = this.evalVariable(node.object, ctx); // <-- Identifier, literal should be ok
}
node.object.eval_res = oo;

var prop;
if(node.computed) {
    if(node.property.type=="Literal") prop = node.property.value;
    if(node.property.type=="Identifier") prop = node.property.eval_res;
    if(typeof(prop)=="undefined") prop = this.evalVariable(node.property, ctx);
} else {
    prop = node.property.name;
}

if(!_isUndef(oo)) {
    try {
        if(!this.canAccess(oo)) {
            console.error("Access denied for object ", oo);
            node.eval_res = _undefined;
            return;
        }
        if(prop=="length" && (typeof(oo)=="function") && typeof(oo.__$$pLength__)!="undefined") {
            node.eval_res = oo.__$$pLength__;
        } else {
            node.eval_res = oo[prop];
        }
        
    } catch(e) {
        
    }
} else {
    // throw new ReferenceError("Trying to evaluate property of undefined");
}


```

### <a name="ASTEval_MetaProperty"></a>ASTEval::MetaProperty(node, ctx)


```javascript

var vname = node.meta+"."+node.property;

node.eval_res = this.evalVariable(vname, ctx);
```

### <a name="ASTEval_MethodDefinition"></a>ASTEval::MethodDefinition(node, ctx)


```javascript

if(node.key) {
    this.__insideMethod = true;
    
    if(node.kind=="constructor") {
        this.trigger("ClassConstructor", node);
    }
    
    if(node.static) this.out("static ");
    
    this.walk(node.key,ctx);
    this.walk(node.value, ctx);
    this.out("", true);
    this.__insideMethod = false;
}
```

### <a name="ASTEval_NewExpression"></a>ASTEval::NewExpression(node, ctx)


```javascript
if(node.arguments) {
    var me = this,
        cnt=0;
    node.arguments.forEach(function(n) {
        if(cnt++>0) me.out(", ");
        me.walk(n,ctx); 
    });
}
if(node.callee) {
    
    this.walk(node.callee, ctx);
    if(!_isUndef(node.callee.eval_res)) {
        var a = [];
        if(node.arguments) {
            var fnToCall = node.callee.eval_res;
            node.arguments.forEach(function(n) {
                if(typeof( n.eval_res ) != "undefined") {
                    a.push(_toValue(n.eval_res));
                } else {
                    a.push( _toValue(me.evalVariable(n, ctx) ) );
                }
            });
            
            // special case for new Function expression, to create new function...
            if( node.callee.name == "Function") {
                // --> creating a new function declaration
                var codeStr ="function newFn(";
                for(var aa = 0; aa < node.arguments.length-1; aa++) {
                    if(aa>0) codeStr+=",";
                    codeStr+=a[aa];
                }
                codeStr+="){";
                codeStr+= a[aa];
                codeStr+="}";                
                
                var fnAST = esprima.parse(codeStr, { }).body[0];
                var evl = me.createChildProcess({
                    globals : _globalCtx,
                    accessDenied : _accessDenied
                });
                // evl._strictMode = this._strictMode;
                evl.listify( fnAST );              

                node.eval_res = function() {
                    // FunctionDeclaration statement
                    if(me.isKilled()) return;
                    var args = [], arg_len = arguments.length,
                        origArgs = arguments;
                
                    // NOTE: running in the global context ...
                    var fnCtx = { functions : {}, vars : {}, variables : {}, parentCtx : _globalCtx};
                    fnCtx["this"] = this;
                    fnCtx.variables["arguments"] = arguments;
                    if (this instanceof node.eval_res) {
                        fnCtx.variables["new.target"] = node.eval_res;
                    }      
                    var evl = new ASTEval();
                    evl._strictMode = me._strictMode;
                    
                    for(var i=0; i<arg_len; i++) {
                        args[i] = arguments[i];
                    }
                    // Going the node body with set values or variables...
                    var i = 0;
                    fnAST.params.forEach(function(p) {
                        if(p.type=="RestElement") {
                            // should be the rest of the string...
                            fnCtx.variables[p.argument.name] =  args.slice(i);
                            i++;
                            return;
                        }        
                        if(typeof(origArgs[i]) != "undefined") {
                            fnCtx.variables[p.name] =  origArgs[i];
                        } else {
                            fnCtx.variables[p.name] =  _undefined;
                            if(fnAST.defaults && fnAST.defaults[i]) {
                                me.walk(fnAST.defaults[i], ctx);
                                fnCtx.variables[p.name] =  fnAST.defaults[i].eval_res;
                            }
                        }
                        i++;
                    });
                    
                    try {
                        evl.startWalk(fnAST.body, fnCtx);
                    } catch(msg) {
                        if(msg.type=="return") {
                            // ok
                        } else {
                            throw msg;
                        }
                    }
                    
                    // returned value is simply
                    return fnCtx.return_value;
                    
                }
                node.eval_res.__$$pLength__ = fnAST.params.length;
                fnAST.params.forEach( function(p) {
                    if(p.type=="RestElement") node.eval_res.__$$pLength__--;
                });                
            
                return;    
            }
            
            if(!me.canAccess(fnToCall)) {
                node.eval_res = _undefined;
                return;
            }
            
            var newObj;
            if(a.length==0) newObj = new fnToCall();
            if(a.length==1) newObj = new fnToCall(a[0]);
            if(a.length==2) newObj = new fnToCall(a[0],a[1]);
            if(a.length==3) newObj = new fnToCall(a[0],a[1],a[2]);
            if(a.length==4) newObj = new fnToCall(a[0],a[1],a[2],a[3]);
            if(a.length==5) newObj = new fnToCall(a[0],a[1],a[2],a[3],a[4]);
            if(a.length==6) newObj = new fnToCall(a[0],a[1],a[2],a[3],a[4],a[5]);
            
            node.eval_res = newObj;
            
        } 
    }

}

```

### <a name="ASTEval_nlIfNot"></a>ASTEval::nlIfNot(t)


```javascript
var len = this._currentLine.length; 
if(len > 0) {
    // {
    if((this._currentLine[len-1] =="{") || (this._currentLine[len-1] ==";")) {
        this.out("", true);
    } else {
        this.out(";", true);
    }
}
```

### <a name="ASTEval_node_assign"></a>ASTEval::node_assign(node, ctx, value, assignNode)


```javascript
if(!this.canAccess(value)) {
    assignNode.eval_res = _undefined;
    return;
}      
var me = this;
if(node.type=="MemberExpression") {
    
    var obj, prop;
    if(typeof( node.object.eval_res  ) !=  "undefined") {
        obj = node.object.eval_res;
    } else {
        obj = me.evalVariable(node.object, ctx);
    }
    if(!me.canAccess(obj)) {
        console.error("Access denied for object ", obj);
        assignNode.eval_res = _undefined;
        return;
    }          
    if(node.computed) {
        if(typeof( node.property.eval_res  ) !=  "undefined") {
            // --> Assigment 
            prop = node.property.eval_res; // me.evalVariable( node.property.eval_res, ctx ) ;
        } else {
            prop = me.evalVariable( node.property.name, ctx ) ;
        }            
    } else {
        prop = node.property.name;
    }
    if(obj && (typeof(prop)!="undefined")) {
        obj[prop] = _wrapValue( value );
        assignNode.eval_res = _wrapValue( value );
    }
    return;
}
assignNode.eval_res = _wrapValue( value );
me.assignTo(node.name, ctx, value); 
```

### <a name="ASTEval_node_assign_update"></a>ASTEval::node_assign_update(node, ctx, value)


```javascript
if(node.type=="MemberExpression") {
    var obj, prop;
    if(typeof( node.object.eval_res  ) !=  "undefined") {
        obj = node.object.eval_res;
    } else {
        obj = this.evalVariable(node.object, ctx);
    }
    if(node.computed) {
        if(typeof( node.property.eval_res  ) !=  "undefined") {
            prop = node.property.eval_res; // this.evalVariable( node.property.eval_res, ctx ) ;
        } else {
            prop = this.evalVariable( node.property.name, ctx ) ;
        }            
    } else {
        prop = node.property.name;
    }
    if(obj && prop) {
        obj[prop] = value;
    }
    return;
}    
this.assignTo(node, ctx, value);
```

### <a name="ASTEval_ObjectExpression"></a>ASTEval::ObjectExpression(node, ctx)


```javascript

var me = this;
try {
    var cnt=0;
    if(node && node.properties) {
        me.walk(node.properties, ctx);
        /*
        node.properties.forEach( function(p) {
            me.trigger("ObjectExpressionProperty", p);
            
        });
        */
    } 

    node.eval_res = {};
    if(node.properties) {
        node.properties.forEach( function(e) {
            var v = e.value.eval_res || me.evalVariable(e.value, ctx);

            var keyName = e.key.eval_res;
            if(typeof(keyName)=="undefined") {
                keyName = me.evalVariable( e.key, ctx );
            }

            node.eval_res[keyName] = _toValue(v);
        });    
    }
} catch(e) {
    console.error(e.message);
}


```

### <a name="ASTEval_ObjectPattern"></a>ASTEval::ObjectPattern(node, ctx)


```javascript
var me = this;
try {
    me.out("{");
    var cnt=0;
    if(node && node.properties) {
        //if(node.properties.length>1) me.out("", true);
        node.properties.forEach( function(p) {
            if(cnt++>0) me.out(",");
            me.trigger("ObjectExpressionProperty", p);
            me.walk(p, ctx);
        });
    } 
    me.out("}");
} catch(e) {
    console.error(e.message);
}

```

### <a name="ASTEval_out"></a>ASTEval::out(str, newline)
`str` Code to output
 
`newline` if ends with newline 
 


```javascript

```

### <a name="ASTEval_prevChar"></a>ASTEval::prevChar(t)


```javascript
var len = this._currentLine.length; 
if(len > 0) {
    return this._currentLine[len-1];
} else {
    return "\n";
}
```

### <a name="ASTEval_Program"></a>ASTEval::Program(node, ctx)


```javascript

this.walk(node.body,ctx, true);
```

### <a name="ASTEval_Property"></a>ASTEval::Property(node, ctx)


```javascript

// kind: "init" | "get" | "set";

this.trigger("ObjectPropertyKey", node.key);
this.walk(node.key, ctx);
if(!node.shorthand) {
    this.out(":");
    this.trigger("ObjectPropertyValue", node.value);
    this.walk(node.value, ctx);
}

if(node.key.computed) {
    var value = this.evalVariable(node.key, ctx );
    if(typeof(value) != "undefined") {
        node.key.eval_res = value;
    }   
} else {
    node.key.eval_res = node.key.name;
}


```

### <a name="ASTEval_pushStructure"></a>ASTEval::pushStructure(def)
`def` Structure definition
 


```javascript

if(!this._structures) this._structures = [];
this._structures.push( def );
```

### <a name="ASTEval_RestElement"></a>ASTEval::RestElement(node, ctx)


```javascript
//if(node.argument) this.trigger("RestArgument", node.argument);
//this.out(" ...");
//this.walk(node.argument, ctx);

```

### <a name="ASTEval_ReturnStatement"></a>ASTEval::ReturnStatement(node, ctx)


```javascript
this.nlIfNot();
this.out("return ");
this.trigger("ReturnValue", node.argument);
this.walk(node.argument, ctx);
this.out(";");

// setting the return value

var fnCtx = ctx;
if(fnCtx.block) {
    while(fnCtx && fnCtx.block) {
        fnCtx = fnCtx.parentCtx;
    }
}

if(node.argument) {
    fnCtx.return_value = node.argument.eval_res;
} else {
    fnCtx.return_value = _undefined;
}
throw { type : "return" };
```

### <a name="ASTEval_SequenceExpression"></a>ASTEval::SequenceExpression(node, ctx)


```javascript
if(node.expressions) {
    this.walk(node.expressions[0], ctx);
    var last = node.expressions[node.expressions.length-1];
    node.eval_res = last.eval_res;
    /*
    node.expressions.forEach( function(n) {
        if(cnt++>0) me.out(",");
        me.walk( n, ctx );
        node.eval_res = n.eval_res;
    })
    */
}
```

### <a name="ASTEval_setParentProcess"></a>ASTEval::setParentProcess(p)
`p` ASTEval
 


```javascript
this._parentProcess = p;

if(!p._childProcess) {
    p._childProcess = [];
}
if(p._childProcess.indexOf(this) < 0 ) {
    p._childProcess.push(p);   
}
```

### <a name="ASTEval_setPaused"></a>ASTEval::setPaused(trueOrFalse)
`trueOrFalse` If paused or not
 


```javascript
this._isPaused = trueOrFalse;

```

### <a name="ASTEval_skip"></a>ASTEval::skip(t)


```javascript
this._skipWalk = true;
```

### <a name="ASTEval_startBlock"></a>ASTEval::startBlock(t)


```javascript

this.out("{", true);
this.indent(1);
```

### <a name="ASTEval_startCollecting"></a>ASTEval::startCollecting(t)


```javascript
this._collecting = true;

```

### <a name="ASTEval_startWalk"></a>ASTEval::startWalk(node, ctx)
`node` AST Node 
 

Starts the walking of AST tree
```javascript

this._breakWalk = false;
this._path = [];

this._codeStr = "";
this._currentLine = "";

if(!ctx.letVars) ctx.letVars = {};
if(!ctx.constVars) ctx.constVars = {};
if(!ctx.variables) ctx.variables = {};

var me = this;
this.collectVarsAndFns(node,ctx, function(node) {
    if(node.type=="VariableDeclaration") {
        node.declarations.forEach( function(d) {
            ctx.variables[d.id.name] = _undefined;
        })
    }
    
    if(node.type=="FunctionDeclaration") {

        if(!node._ecnt) node._ecnt = 0;
        node._ecnt++;
        
        if(node.id) {
            if(!node.id._ecnt) node.id._ecnt=0;
            node.id._ecnt++;
        }
        
        node.eval_res = function() {
            
            // FunctionDeclaration
            if(me.isKilled()) return;
            
            // NOTE: if(node.generator) this.out("*");
            // 
            var args = [], arg_len = arguments.length,
                origArgs = arguments;
            // function ctx is the parent ctx.
         
            // defining the "this" is left open, perhaps only overriden when needed...
            var fnCtx = { functions : {}, vars : {}, variables : {}, parentCtx : ctx};
            fnCtx["this"] = this;
            fnCtx.variables["arguments"] = arguments;
            var evl = me.createChildProcess();
            
            for(var i=0; i<arg_len; i++) {
                args[i] = arguments[i];
            }
            // Going the node body with set values or variables...
            var i = 0;
            node.params.forEach(function(p) {
        
                if(p.type=="RestElement") {
                    // should be the rest of the string...
                    fnCtx.variables[p.argument.name] =  args.slice(i);
                    i++;
                    if(!p._ecnt) p._cnt=0;
                    p._ecnt++;            
                    return;
                }
                if(typeof(origArgs[i]) != "undefined") {
                    fnCtx.variables[p.name] =  origArgs[i];
                    if(!p._ecnt) p._ecnt=0;
                    p._ecnt++;                        
                } else {
                    fnCtx.variables[p.name] =  _undefined;
                    if(node.defaults && node.defaults[i]) {
                        me.walk(node.defaults[i], ctx);
                        fnCtx.variables[p.name] =  node.defaults[i].eval_res;
                        if(!node.defaults._cnt) node.defaults._ecnt=0;
                        node.defaults._ecnt++;                            
                    }
                }
                i++;
            });
            
            try {
                evl.startWalk(node.body, fnCtx);
            } catch(msg) {
                if(msg.type=="return") {
                    // ok
                } else {
                    throw msg;
                }
            }
            
            // returned value is simply
            return fnCtx.return_value;
            
        }
        node.eval_res.__$$pLength__ = node.params.length;
        // the fn can then be called
        if(node.id && node.id.name) {
            node.eval_res.__$$name__ = node.id.name;
            ctx.variables[node.id.name] = node.eval_res;
        }

        return;
    }    
    //console.log("Found variable or fn declaration");
    //console.log(node);
})
this.walk(node, ctx);
this.out("",true);
```

### <a name="ASTEval_Super"></a>ASTEval::Super(node, ctx)


```javascript
this.out("super");
```

### <a name="ASTEval_SwitchCase"></a>ASTEval::SwitchCase(node, ctx)


```javascript
if(node.test) {
    this.walk(node.test, ctx);
    
    if(_toValue(node.test.eval_res) == _toValue(ctx._switchTest.eval_res)) {
        ctx._switchMatch = true;        
    }
    if(ctx._switchMatch) {
        if(node.consequent) {
            this.walk( node.consequent, ctx );
        }        
    }
}

// ctx._switchTest
```

### <a name="ASTEval_SwitchStatement"></a>ASTEval::SwitchStatement(node, ctx)


```javascript

this.walk( node.discriminant, ctx );

// Switch statment expressions...
try {
    var me = this;
    ctx._switchTest = node.discriminant;
    ctx._switchMatch = false;

    this.walk(node.cases, ctx);

} catch(msg) {
    if(msg.type=="break") {
        
    } else {
        throw msg;
    }
}

```

### <a name="ASTEval_TemplateElement"></a>ASTEval::TemplateElement(node, ctx)


```javascript

```

### <a name="ASTEval_TemplateLiteral"></a>ASTEval::TemplateLiteral(node, ctx)


```javascript


// ----
this.walk(node.expressions, ctx);

var strOut ="";
for(var i=0; i<node.quasis.length;i++) {
    if(i>0) {
        var epr = node.expressions[i-1];
        strOut+=_toValue( epr.eval_res );
    }
    
    var q = node.quasis[i];
    strOut+=q.value.cooked;
    // this.walk(q, ctx);
}

node.eval_res = strOut;
```

### <a name="ASTEval_ThisExpression"></a>ASTEval::ThisExpression(node, ctx)


```javascript
this.out("this");

node.eval_res = this.findThis(ctx);
```

### <a name="ASTEval_ThrowStatement"></a>ASTEval::ThrowStatement(node, ctx)


```javascript
this.nlIfNot();
this.out("throw ");
this.trigger("ThrowArgument", node.argument);
this.walk( node.argument, ctx );

var value = node.argument.eval_res;
if(typeof(value)=="undefined") value = this.evalVariable( node.argument, ctx );

throw { type : "throw", node : node, value : value };
```

### <a name="ASTEval_TryStatement"></a>ASTEval::TryStatement(node, ctx)


```javascript

// node._exceptionHandler = node;
// node._exceptionHandlerCtx = ctx;
try {
    this.walk(node.block, ctx);
} catch(msg) {
    // throw { type : "throw", node : node, value };
    var eValue;
    
    // if some system message...
    if(msg && msg.type) {
        if(msg.type=="return" || msg.type=="break" || msg.type=="continue") {
            throw(msg);
            return;
        }
    }

    if(msg && msg.type=="throw") {
        eValue = msg.value
    } else {
        eValue = msg;
    }
        
    if (node.finalizer) {
      this.walk(node.finalizer, ctx);
    }
    
    if (node.handler) {
        var newCtx = this.createContext(ctx);
        // set the exception handler param
        if(node.handler && node.handler.param.name) {
            newCtx.variables[node.handler.param.name] = eValue;
        }              
        this.walk(node.handler.body, newCtx);
    } else {
        throw(msg)
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
```

### <a name="ASTEval_UnaryExpression"></a>ASTEval::UnaryExpression(node, ctx)


```javascript
var bNeedsPar = true;
if(node.argument.type == "Identifier" || node.argument.type == "Literal") {
    bNeedsPar = false;
}
this.out(node.operator);
if(node.operator!="!") this.out(" ");

if(bNeedsPar) this.out("(");
this.trigger("UnaryExpressionArgument", node.argument);
this.walk(node.argument,ctx);
if(bNeedsPar) this.out(")");

var value = _toValue( node.argument.eval_res || this.evalVariable( node.argument, ctx ) );

if(true) {
    if(node.operator == "-") {
        node.eval_res = -1 * value;
        return;
    }
    if(node.operator == "~") {
        node.eval_res = ~value;
        return;
    }
    if(node.operator == "!") {
        node.eval_res = !value;
        return;
    }  
    if(node.operator == "+") {
        node.eval_res = +value;
        return;
    }      
    if(node.operator == "delete") {
        var argNode = node.argument;
        if(argNode.type=="MemberExpression") {
            var obj, prop;
            if(typeof( argNode.object.eval_res  ) !=  "undefined") {
                obj = argNode.object.eval_res;
            } else {
                obj = this.evalVariable(argNode.object, ctx);
            }
            if(!this.canAccess(obj)) {
                console.error("Access denied for object ", obj);
                node.eval_res = _undefined;
                return;
            }              
            if(argNode.computed) {
                if(typeof( argNode.property.eval_res  ) !=  "undefined") {
                    // --> Assigment 
                    prop = argNode.property.eval_res; // me.evalVariable( node.property.eval_res, ctx ) ;
                } else {
                    prop = this.evalVariable( argNode.property.name, ctx ) ;
                }            
            } else {
                prop = argNode.property.name;
            }
            if(obj && prop) {
                node.eval_res = delete obj[prop];
            } else {
                node.eval_res = false;
            }
            return;
        } else {
            node.eval_res = delete _globalCtx[value];
        }
        return;
    }   
    if(node.operator == "typeof") {
        // node.eval_res = +value;
        node.eval_res = typeof(value);
        return;
    }
    if(node.operator == "void") {
        // node.eval_res = +value;
        node.eval_res = void(value);
        return;
    }     
    console.error("Unknown UnaryExpression ",node.operator);
}

```

### <a name="ASTEval_UpdateExpression"></a>ASTEval::UpdateExpression(node, ctx)


```javascript

var value;

this.walk(node.argument, ctx);
var value = node.argument.eval_value;
if(typeof(value) == "undefined") value = this.evalVariable( node.argument, ctx);

if(node.operator=="++" && typeof(value)!="undefined") {
    if(!node.prefix) node.eval_res = value;
    value++;
    if(node.prefix) node.eval_res = value;
    this.node_assign_update( node.argument, ctx, value);
    return;
}
if(node.operator=="--" && typeof(value)!="undefined") {
    if(!node.prefix) node.eval_res = value;
    value--;
    if(node.prefix) node.eval_res = value;
    this.node_assign_update( node.argument, ctx, value);

}

```

### <a name="ASTEval_VariableDeclaration"></a>ASTEval::VariableDeclaration(node, ctx)
`node` Object to use to create a variable declaration
 
`ctx` Context of the node
 


```javascript

var me = this;
var cnt=0;

ctx._varKind = node.kind;
me.walk(node.declarations, ctx);
/*
node.declarations.forEach( function(vd) {
    me.walk(vd,ctx);
});
*/



```

### <a name="ASTEval_VariableDeclarator"></a>ASTEval::VariableDeclarator(node, ctx)


```javascript
var me = this;

if(node.id) me.walk(node.id, ctx);

if(node.init) {
    this.out(" = ");
    me.walk( node.init, ctx );
    if(node.id.name) {
        if(!ctx.variables) ctx.variables = {};
        if(ctx._varKind=="var"){
            ctx.variables[node.id.name] = _wrapValue( node.init.eval_res );
        } 
        if(ctx._varKind=="let"){
            if(!ctx.letVars) ctx.letVars = {};
            ctx.letVars[node.id.name] = _wrapValue(node.init.eval_res);
        }
        if(ctx._varKind=="const"){
            if(!ctx.constVars) ctx.constVars = {};
            ctx.constVars[node.id.name] = _wrapValue(node.init.eval_res);
        }        
    }    
} else {
    if(node.id.name) {
        if(!ctx.variables) ctx.variables = {};
        if(ctx._varKind=="var"){
            ctx.variables[node.id.name] = _undefined;
        } 
        if(ctx._varKind=="let"){
            if(!ctx.letVars) ctx.letVars = {};
            ctx.letVars[node.id.name] = _undefined;
        }
        if(ctx._varKind=="const"){
            if(!ctx.constVars) ctx.constVars = {};
            ctx.constVars[node.id.name] = _undefined;
        }        
    }     
}

```

### <a name="ASTEval_walk"></a>ASTEval::walk(node, ctx, newLine)
`node` The object to walk the AST with
 
`ctx` The current context
 


```javascript

if(this._fast) {
    if(!node) return;
    if(node instanceof Array) {
        var firstItem = node[0];
        this.walk( firstItem, ctx );
        return;
    } else {
        var t = node.type;
        if(!node._ecnt) node._ecnt = 0;
        node._ecnt++;
        this[t](node, ctx);
        if(node._next) {
            this.walk( node._next, ctx );
        } 
        return;
    }
    return;
}

if(!node) return;
if(this.isKilled()) return;

if(!ctx) {
    console.log("ERROR: no context defined for ", node);
    console.trace();
    return;
}

// walking using prev & next pointers makes detaching the process probably easier
if(node instanceof Array) {

    var firstItem = node[0];
    if(!firstItem) return;
    this.walk( firstItem, ctx );

} else {
    var t = node.type;
    if(t) {
        if(this[t]) {
            if(!node._ecnt) node._ecnt = 0;
            node._ecnt++;
            if(this["Before"+t]) {
                this["Before"+t](node,ctx);
            }
            if(this._trace) {
                var start_time = (new Date()).getTime();
            }
            this[t](node, ctx);
            if(this._trace) {
                var end_time = (new Date()).getTime();
                this._traceRes.push([node, node.eval_res, start_time, end_time, end_time-start_time]);
            }
            if(this["After"+t]) {
                this["After"+t](node,ctx);
            }            
            //-- then either next or parent...
            var next = node._next;
            if(next) {
                this.walk( next, ctx );
            } 
        } else {
            console.log("Did not find "+t);
            console.log(node);
        }
    }
}
```

### <a name="ASTEval_walkAsString"></a>ASTEval::walkAsString(node, ctx)


```javascript

var str="";
try {
    this.startCollecting();
    this._collectStr = "";
    this._collectLine = "";
    
    this.walk(node, ctx);
    
    str = this._collectStr;
    
    this.endCollecting();
} catch(e) {
    
}
return str;
```

### <a name="ASTEval_WhileStatement"></a>ASTEval::WhileStatement(node, ctx)


```javascript

var max_cnt = 1000*1000; // <-- maximum loop count, temporary setting...


    while(max_cnt>0) {
        try {
            if(node.test) {
                this.walk(node.test,ctx);
                if(!_toValue(node.test.eval_res)) {
                    break;
                }
            } else {
                // do not allow eternal loop at this point...
                break;
            }
            if(node.body) {
                this.walk(node.body,ctx);
            }    
            max_cnt--;
        } catch(msg) {
            // --> continue from here then
            
            if(msg && msg.type=="continue") {
                if(msg.label && msg.label.name) {
                    if(node._label && node._label.name==msg.label.name) {
                        continue;
                    }
                } else {
                    continue;
                }
            }
            if(msg && msg.type=="break") {
                if(msg.label && msg.label.name) {
                    if(node._label && node._label.name==msg.label.name) {
                        break;
                    }
                } else {
                    break;
                }
            }
            throw msg;
        }
    }

```

### <a name="ASTEval_WithStatement"></a>ASTEval::WithStatement(node, ctx)


```javascript
console.error("With statement is not supported");
```

### <a name="ASTEval_YieldExpression"></a>ASTEval::YieldExpression(node, ctx)


```javascript

this.out("yield ");
this.walk(node.argument, ctx);

/*
interface YieldExpression <: Expression {
    type: "YieldExpression";
    argument: Expression | null;
}
*/
```



   
    
## trait events

The class has following internal singleton variables:
        
        
### <a name="_on"></a>::on(en, ef)
`en` Event name
 

Binds event name to event function
```javascript
if(!this._ev) this._ev = {};
if(!this._ev[en]) this._ev[en] = [];

this._ev[en].push(ef);
return this;
```

### <a name="_removeListener"></a>::removeListener(name, fn)


```javascript
if(!this._ev) return;
if(!this._ev[name]) return;

var list = this._ev[name];

for(var i=0; i<list.length; i++) {
    if(list[i]==fn) {
        list.splice(i,1);
        return;
    }
}

```

### <a name="_trigger"></a>::trigger(en, data, fn)

triggers event with data and optional function
```javascript

if(!this._ev) return;
if(!this._ev[en]) return;
var me = this;
this._ev[en].forEach( function(cb) { cb( data, fn) } );    
return this;
```


    
    


   
      
    




