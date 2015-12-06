

```javascript

   // Undocumented so far...

``` 
















   

 


   
#### Class ASTEval


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
- [CatchClause](README.md#ASTEval_CatchClause)
- [ClassBody](README.md#ASTEval_ClassBody)
- [ClassDeclaration](README.md#ASTEval_ClassDeclaration)
- [ConditionalExpression](README.md#ASTEval_ConditionalExpression)
- [continueAfterBreak](README.md#ASTEval_continueAfterBreak)
- [ContinueStatement](README.md#ASTEval_ContinueStatement)
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
- [getParentProcess](README.md#ASTEval_getParentProcess)
- [getStructures](README.md#ASTEval_getStructures)
- [handleException](README.md#ASTEval_handleException)
- [Identifier](README.md#ASTEval_Identifier)
- [IfStatement](README.md#ASTEval_IfStatement)
- [indent](README.md#ASTEval_indent)
- [isKilled](README.md#ASTEval_isKilled)
- [isPaused](README.md#ASTEval_isPaused)
- [kill](README.md#ASTEval_kill)
- [LabeledStatement](README.md#ASTEval_LabeledStatement)
- [Literal](README.md#ASTEval_Literal)
- [LogicalExpression](README.md#ASTEval_LogicalExpression)
- [MemberExpression](README.md#ASTEval_MemberExpression)
- [MethodDefinition](README.md#ASTEval_MethodDefinition)
- [NewExpression](README.md#ASTEval_NewExpression)
- [nlIfNot](README.md#ASTEval_nlIfNot)
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
        
        
### <a name="ASTEval_ArrayExpression"></a>ASTEval::ArrayExpression(node, ctx)


```javascript

var me = this;

// Check values...
if( node.elements && node.elements.length>=0) {
    // Walk the array elements
    this.out("[");
    var cnt=0;
    node.elements.forEach( function(e) {
        if(cnt++>0) me.out(",");
        me.trigger("ArrayElement", e);
        me.walk(e, ctx);
    })
    this.out("]");
    
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

this.out("function");

if(node.generator) {
    this.trigger("FunctionGenerator", node);
    this.out("* ");
}

if(node.id && node.id.name) {
    console.log("ERROR: ArrowFunctionExpression should not have name");
    this.trigger("FunctionName", node);
    this.out(" "+node.id.name+" "); 
} else {
    this.trigger("FunctionAnonymous", node);
}

var me = this;
this.out("(");
var cnt=0;

node.params.forEach(function(p) {
    if(cnt++>0) me.out(",");
    me.trigger("FunctionParam", p);
    me.walk(p,ctx);   
    if(node.defaults && node.defaults[cnt-1]) {
        var defP = node.defaults[cnt-1];
        me.out("=");
        me.trigger("FunctionDefaultParam", defP);
        me.walk( defP, ctx);
    }
})   

this.out(")");
me.trigger("FunctionBody", node.body);
this.walk(node.body, ctx);    

```

### <a name="ASTEval_AssignmentExpression"></a>ASTEval::AssignmentExpression(node, ctx)


```javascript

this.trigger("AssigmentLeft", node.left);
this.walk(node.left, ctx);
this.out(" "+node.operator+" ");
this.trigger("AssigmentRight", node.right);
this.walk(node.right, ctx);

var value = node.right.eval_res;
if(!_isDeclared(value)) value = this.evalVariable(node.right, ctx);

if(node.operator=="=") {
    // does have name???
    
    if(node.left.type=="MemberExpression") {
        
        var obj, prop;
        if(typeof( node.left.object.eval_res  ) !=  "undefined") {
            obj = node.left.object.eval_res;
        } else {
            obj = this.evalVariable(node.left.object, ctx);
        }
        if(node.left.computed) {
            if(typeof( node.left.property.eval_res  ) !=  "undefined") {
                prop = this.evalVariable( node.left.property.eval_res, ctx ) ;
            } else {
                prop = this.evalVariable( node.left.property.name, ctx ) ;
            }            
        } else {
            prop = node.left.property.name;
        }
        if(obj && prop) {
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

this.walk(node.left, ctx);
this.walk(node.right, ctx);

// evaluate the binary expression
var a = node.left.eval_res,
    b = node.right.eval_res;

if(!_isDeclared(a)) a = this.evalVariable(node.left, ctx);
if(!_isDeclared(b)) b = this.evalVariable(node.right, ctx);

if(!_isUndef(a) && !_isUndef(b) ) {

       // ?? should result be object with value ?

       if(node.operator=="+") node.eval_res = a + b;
       if(node.operator=="-") node.eval_res = a - b;
       if(node.operator=="*") node.eval_res = a * b;
       if(node.operator=="/") node.eval_res = a / b;
       if(node.operator=="<") node.eval_res = a < b;
       if(node.operator=="<=") node.eval_res = a <= b;
       if(node.operator==">") node.eval_res = a > b;
       if(node.operator==">=") node.eval_res = a >= b;
       if(node.operator=="&") node.eval_res = a & b;
       if(node.operator=="|") node.eval_res = a | b;
       if(node.operator=="<<") node.eval_res = a << b;
       if(node.operator==">>") node.eval_res = a >> b;
       if(node.operator==">>>") node.eval_res = a >>> b;
       
       if(node.operator=="==") node.eval_res = a == b;
       if(node.operator=="!=") node.eval_res = a != b;
       if(node.operator=="===") node.eval_res = a === b;
       if(node.operator=="!==") node.eval_res = a !== b;
       if(node.operator=="%") node.eval_res = a % b;
       
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
```

### <a name="ASTEval_BlockStatement"></a>ASTEval::BlockStatement(node, ctx)


```javascript

// keeps at the same context right now I guess....

var blockCtx = { 
    block : true,
    functions : {}, 
    vars : {}, 
    letVars : {}, 
    constVars : {}, 
    parentCtx : ctx
};    

var pCtx = ctx;
while(pCtx && pCtx.block) {
    pCtx = pCtx.parentCtx;
}

Object.defineProperty(blockCtx, 'variables', {
  enumerable: true,
  configurable: true,
  writable: true,
  value: pCtx.variables
});

this.out(" {",true);
this.indent(1);
this.walk(node.body, blockCtx, true);
this.indent(-1);
this.out("}");
```

### <a name="ASTEval_BreakStatement"></a>ASTEval::BreakStatement(node, ctx)


```javascript
this.nlIfNot();
this.out("break ");
if(node.label) this.walk(node.label, ctx);
this.out("", true);
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
        node.arguments.forEach(function(n) {
            if(cnt++>0) me.out(", ");
            me.walk(n,ctx); 
        });
    }
    this.out(")");
    
    // Parts have been evaluated, then perform the function call..
    
    var me = this;
    if(!_isUndef(node.callee.eval_res)) {
        var args = [];
        var fnToCall = node.callee.eval_res;
        if(node.arguments) {
            node.arguments.forEach(function(n) {
                if(typeof( n.eval_res ) != "undefined") {
                    args.push(_toValue(n.eval_res));
                } else {
                    args.push( _toValue(me.evalVariable(n, ctx) ) );
                }
            });
        }     
        // Todo : define calls to 'this'
        
        var this_pointer = ctx["this"]; // <- or global this perhaps 
        if(node.callee.type=="MemberExpression") {
            this_pointer = node.callee.object.eval_res;
        }
        if(node.callee.type=="ThisExpression") {
            if(ctx.parentCtx) this_pointer = ctx.parentCtx["this"];
        }        
        
        if(typeof(fnToCall) == "function") {
            node.eval_res = fnToCall.apply( this_pointer, args);
        }
        
        
    }
    
    
}
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

### <a name="ASTEval_ConditionalExpression"></a>ASTEval::ConditionalExpression(node, ctx)


```javascript

this.walk(node.test, ctx);
if(node.test.eval_res) {
    this.walk(node.consequent,ctx);
} else {
    this.walk(node.alternate,ctx);
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
this.nlIfNot();
this.out("continue ");
if(node.label) this.walk(node.label, ctx);
this.out("", true);
```

### <a name="ASTEval_createContext"></a>ASTEval::createContext(ctx, isBlock)
`ctx` Parent Context
 


```javascript
var newCtx = { functions : {}, 
              vars : {}, 
              parentCtx : ctx,
              block : isBlock
              };   

var pCtx = ctx;
while(pCtx && pCtx.block) {
    pCtx = pCtx.parentCtx;
}

Object.defineProperty(newCtx, 'variables', {
  enumerable: true,
  configurable: true,
  writable: true,
  value: pCtx.variables
});

return newCtx;
```

### <a name="ASTEval_DebuggerStatement"></a>ASTEval::DebuggerStatement(node, ctx)


```javascript
this.nlIfNot();
this.out("debugger;");
```

### <a name="ASTEval_DoWhileStatement"></a>ASTEval::DoWhileStatement(node, ctx)


```javascript
var max_cnt = 1000*1000; // <-- maximum loop count, temporary setting...

do {
    if(node.body) {
        this.walk(node.body,ctx);
    }    
    max_cnt--;
    if(node.test) {
        this.walk(node.test,ctx);
        if(!node.test.eval_res) {
            break;
        }
    } else {
        // do not allow eternal loop at this point...
        break;
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
if(typeof(varName)=="object") {
    if(varName.eval_res) return varName.eval_res;
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

// TODO: ERROR if letvar is undefined does not work!!!!
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
        return window[name];
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

return window;
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
        propName = node.name;
    } else {
        propName = node.left.eval_res;
    }
}

if(!propName || ! obj) return;

for(var xx in obj) {
    // must set the variable ...
    if(decl) {
        // ??? declaration ??? 
        this.assignTo( propName, myCtx, xx);
    } else {
        this.assignTo( propName, myCtx, xx);
    }
    // Then... ready to go???
    this.walk(node.body, myCtx);
}

```

### <a name="ASTEval_ForOfStatement"></a>ASTEval::ForOfStatement(node, ctx)


```javascript
this.nlIfNot();
this.out("for(");

if(node.left) {
    this.trigger("ForOfLeft", node.left);
    this.walk(node.left,ctx);
}
this.out(" of ");
if(node.right) {
    this.trigger("ForOfRight", node.right);
    this.walk(node.right,ctx);
}
this.out(")");

if(node.body) {
    this.trigger("ForOfBody", node.body);
    var bNeedsPar = false;
    if(node.body.type != "BlockStatement" && ( node.body.type.indexOf("Statement")>=0) ) {
        bNeedsPar = true;
    }
    if(bNeedsPar) {
        this.out("{");
        this.indent(1);
    }
    this.walk(node.body,ctx);
    if(bNeedsPar) {
        this.indent(-1);
        this.out("}");
    }
}

this.out("", true);
```

### <a name="ASTEval_ForStatement"></a>ASTEval::ForStatement(node, ctx)


```javascript

var myCtx = this.createContext( ctx, true );

if(node.init) {
    this.walk(node.init,myCtx);
}

var max_cnt = 1000*1000; // <-- maximum loop count, temporary setting...

while(max_cnt>0) {
    if(node.test) {
        this.walk(node.test,myCtx);
        if(!node.test.eval_res) {
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
}
```

### <a name="ASTEval_FunctionDeclaration"></a>ASTEval::FunctionDeclaration(node, ctx)


```javascript

var me = this;
node.eval_res = function() {
    
    if(me.isKilled()) return;
    
    // NOTE: if(node.generator) this.out("*");
    // 
    var args = [], arg_len = arguments.length,
        origArgs = arguments;
    // function ctx is the parent ctx.
 
    // defining the "this" is left open, perhaps only overriden when needed...
    var fnCtx = { functions : {}, vars : {}, variables : {}, parentCtx : ctx};    
    var evl = new ASTEval();
    
    for(var i=0; i<arg_len; i++) {
        args[i] = arguments[i];
    }
    // Going the node body with set values or variables...
    var i = 0;
    node.params.forEach(function(p) {
        
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
    
    evl.startWalk(node.body, fnCtx);
    
    // returned value is simply
    return fnCtx.return_value;
    
}

// the fn can then be called
if(node.id && node.id.name) {
    ctx.variables[node.id.name] = node.eval_res;
}


```

### <a name="ASTEval_FunctionExpression"></a>ASTEval::FunctionExpression(node, ctx)


```javascript

var me = this;
node.eval_res = function() {
    if(me.isKilled()) return;
    // NOTE: if(node.generator) this.out("*");
    // 
    var args = [], arg_len = arguments.length,
        origArgs = arguments;
    // function ctx is the parent ctx.
 
    // defining the "this" is left open, perhaps only overriden when needed...
    var fnCtx = { functions : {}, vars : {}, variables : {}, parentCtx : ctx};    
    var evl = new ASTEval();
    
    for(var i=0; i<arg_len; i++) {
        args[i] = arguments[i];
    }
    // Going the node body with set values or variables...
    var i = 0;
    node.params.forEach(function(p) {
        
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
    
    evl.startWalk(node.body, fnCtx);
    
    // returned value is simply
    return fnCtx.return_value;
    
}

// the fn can then be called
if(node.id && node.id.name) {
    ctx.variables[node.id.name] = node.eval_res;
}

```

### <a name="ASTEval_getCode"></a>ASTEval::getCode(t)


```javascript
return this._codeStr;
```

### <a name="ASTEval_getParentProcess"></a>ASTEval::getParentProcess(t)


```javascript
return this._parentProcess;
```

### <a name="ASTEval_getStructures"></a>ASTEval::getStructures(t)


```javascript
return this._structures;
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
// just output the identifier name...
this.out(node.name);
node.eval_res = this.evalVariable( node.name, ctx );


```

### <a name="ASTEval_IfStatement"></a>ASTEval::IfStatement(node, ctx)


```javascript

this.walk(node.test, ctx);
if(node.test.eval_res) {
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

this._options = options || {};

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
this.nlIfNot();
this.walk(node.label, ctx);
this.out(":", true);
this.indent(1);
if(node.body) this.walk(node.body, ctx);
this.indent(-1);
```

### <a name="ASTEval_Literal"></a>ASTEval::Literal(node, ctx)


```javascript
this.out(node.raw);

// set evaluated values to the node to be used later if necessary
node.eval_res = node.value;
node.eval_type = typeof(node.value);
```

### <a name="ASTEval_LogicalExpression"></a>ASTEval::LogicalExpression(node, ctx)


```javascript

this.walk(node.left, ctx);
this.walk(node.right, ctx);

// evaluate the binary expression
var a = node.left.eval_res,
    b = node.right.eval_res;

if(!_isDeclared(a)) a = this.evalVariable(node.left, ctx);
if(!_isDeclared(b)) b = this.evalVariable(node.right, ctx);

if(!_isUndef(a) && !_isUndef(b) ) {

       if(node.operator=="&&") node.eval_res = a && b;
       if(node.operator=="||") node.eval_res = a || b;

   } else {
       console.error("Undefined variable in BinaryExpression");
   }


```

### <a name="ASTEval_MemberExpression"></a>ASTEval::MemberExpression(node, ctx)


```javascript

this.walk(node.object,ctx);

if(node.computed) {
    this.walk(node.property, ctx);    
} else {
    this.walk(node.property, ctx);    
}

// 
var oo;
if( node.object.type == "ThisExpression" ) {
    oo = this.findThis( ctx );
} else {
    oo = this.evalVariable(node.object, ctx); // <-- Identifier, literal should be ok
}
var prop;
if(node.computed) {
    var prop = this.evalVariable(node.property.name, ctx);
} else {
    prop = node.property.name;
}

if(!_isUndef(oo)) {
    try {
        node.eval_res = oo[prop];
    } catch(e) {
        
    }
}


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
            // --> there is no this pointer for the functions
            
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

### <a name="ASTEval_ObjectExpression"></a>ASTEval::ObjectExpression(node, ctx)


```javascript

var me = this;
try {
    me.out("{");
    var cnt=0;
    if(node && node.properties) {
        if(node.properties.length>1) me.out("", true);
        me.indent(1);
        node.properties.forEach( function(p) {
            if(cnt++>0) me.out(",", true);
            me.trigger("ObjectExpressionProperty", p);
            me.walk(p, ctx);
        });
        me.indent(-1);
    } 
    me.out("}");
    
    node.eval_res = {};
    if(node.properties) {
        node.properties.forEach( function(e) {
            var v = e.value.eval_res || me.evalVariable(e.value, ctx);
            
            var keyName = e.key.eval_res;
            if(typeof(keyName)=="undefined") {
                keyName = me.evalVariable( e.key, ctx );
            }
            
            node.eval_res[keyName] = v;
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
if(node.argument) this.trigger("RestArgument", node.argument);

this.out(" ...");
this.walk(node.argument, ctx);

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

fnCtx.return_value = node.argument.eval_res;
```

### <a name="ASTEval_SequenceExpression"></a>ASTEval::SequenceExpression(node, ctx)


```javascript
if(node.expressions) {
    var me = this;
    var cnt = 0;
    this.out("(");
    node.expressions.forEach( function(n) {
        if(cnt++>0) me.out(",");
        me.walk( n, ctx );
        node.eval_res = n.eval_res;
    })
    this.out(")");
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

this.walk(node, ctx);
this.out("",true);
```

### <a name="ASTEval_Super"></a>ASTEval::Super(node, ctx)


```javascript
this.out("super");
```

### <a name="ASTEval_SwitchCase"></a>ASTEval::SwitchCase(node, ctx)


```javascript
this.nlIfNot();
if(node.test) {
    this.out("case ");
    this.walk(node.test, ctx);
    this.out(" : ", true);
} else {
    this.out("default: ", true);
}

if(node.consequent) {
    var me = this;
    node.consequent.forEach( function(c) {
        me.walk(c, ctx);
    })
}
```

### <a name="ASTEval_SwitchStatement"></a>ASTEval::SwitchStatement(node, ctx)


```javascript

console.error("Switch statement is not supported...");

// ---> IF
/*
this.walk(node.test, ctx);
if(node.test.eval_res) {
    this.walk(node.consequent,ctx);
} else {
    this.walk(node.alternate,ctx);
}
*/


/*
this.nlIfNot();
this.out("switch(");

this.walk( node.discriminant, ctx );
this.out(")");
this.out("{",true);

this.indent(1);
var me = this;
node.cases.forEach(function(c) {
    me.walk(c,ctx);
})
this.indent(-1);
this.out("}",true);
*/

/*
interface SwitchStatement <: Statement {
    type: "SwitchStatement";
    discriminant: Expression;
    cases: [ SwitchCase ];
    lexical: boolean;
}
*/
```

### <a name="ASTEval_ThisExpression"></a>ASTEval::ThisExpression(node)


```javascript
this.out("this");
```

### <a name="ASTEval_ThrowStatement"></a>ASTEval::ThrowStatement(node, ctx)


```javascript
this.nlIfNot();
this.out("throw ");
this.trigger("ThrowArgument", node.argument);
this.walk( node.argument, ctx );

var value = node.argument.eval_res;
if(typeof(value)=="undefined") value = this.evalVariable( node.argument, ctx );
this.handleException( value );
```

### <a name="ASTEval_TryStatement"></a>ASTEval::TryStatement(node, ctx)


```javascript

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

var value = node.argument.eval_res || this.evalVariable( node.argument, ctx );

if(typeof(value) != "undefined") {
    if(node.operator == "-") {
        node.eval_res = -1 * value;
    }
    if(node.operator == "~") {
        node.eval_res = ~value;
    }
    if(node.operator == "!") {
        node.eval_res = !value;
    }  
    if(node.operator == "+") {
        node.eval_res = +value;
    }      
    if(node.operator == "delete") {
        // node.eval_res = +value;
        console.error("Delete unary operator not defined");
    }   
    if(node.operator == "typeof") {
        // node.eval_res = +value;
        node.eval_res = typeof(value);
    }
    if(node.operator == "void") {
        // node.eval_res = +value;
        node.eval_res = void(value);
    }     
}

```

### <a name="ASTEval_UpdateExpression"></a>ASTEval::UpdateExpression(node, ctx)


```javascript

this.trigger("UpdateExpressionArgument", node.argument);
this.walk(node.argument, ctx);
this.out(node.operator);

var value = node.argument.eval_value;
if(typeof(value) == "undefined") value = this.evalVariable( node.argument, ctx);

var me = this;
var node_assign = function(node, ctx, value) {
    if(node.type=="MemberExpression") {
        var obj, prop;
        if(typeof( node.object.eval_res  ) !=  "undefined") {
            obj = node.object.eval_res;
        } else {
            obj = this.evalVariable(node.object, ctx);
        }
        if(node.computed) {
            if(typeof( node.property.eval_res  ) !=  "undefined") {
                prop = this.evalVariable( node.property.eval_res, ctx ) ;
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
    me.assignTo(node, ctx, value);
}

if(node.operator=="++" && typeof(value)!="undefined") {
    if(!node.prefix) node.eval_res = value;
    value++;
    if(node.prefix) node.eval_res = value;
    node_assign( node.argument, ctx, value);
}
if(node.operator=="--" && typeof(value)!="undefined") {
    if(!node.prefix) node.eval_res = value;
    value--;
    if(node.prefix) node.eval_res = value;
    node_assign( node.argument, ctx, value);

}

```

### <a name="ASTEval_VariableDeclaration"></a>ASTEval::VariableDeclaration(node, ctx)
`node` Object to use to create a variable declaration
 
`ctx` Context of the node
 


```javascript

var me = this;
var cnt=0;
if(node.kind=="var")  me.out("var ");
if(node.kind=="let") me.out("let ");   
if(node.kind=="const") me.out("const ");   
var indent=0;
ctx._varKind = node.kind;
node.declarations.forEach( function(vd) {
    if(cnt++>0) {
        if(cnt==2) {
            indent+=2;
            me.indent(indent);
        }
        me.out(",", true); // always a new declaration
    }
    me.walk(vd,ctx);
});
this.indent(-1*indent);


```

### <a name="ASTEval_VariableDeclarator"></a>ASTEval::VariableDeclarator(node, ctx)


```javascript
var me = this;

if(node.id) me.walk(node.id, ctx);

if(node.init) {
    this.out(" = ");
    me.walk( node.init, ctx );
    if(node.id.name && (typeof( node.init.eval_res) != "undefined" ) ) {
        if(!ctx.variables) ctx.variables = {};
        if(ctx._varKind=="var"){
            ctx.variables[node.id.name] = node.init.eval_res;
        } 
        if(ctx._varKind=="let"){
            if(!ctx.letVars) ctx.letVars = {};
            ctx.letVars[node.id.name] = node.init.eval_res;
        }
        if(ctx._varKind=="const"){
            if(!ctx.constVars) ctx.constVars = {};
            ctx.constVars[node.id.name] = node.init.eval_res;
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

if(!node) return;
if(this.isKilled()) return;
if(this._break) return;

if(!ctx) {
    console.log("ERROR: no context defined for ", node);
    console.trace();
    return;
}

// What is going on here then...
if(node instanceof Array) {
    var me = this;
    var index = 0;
    var parent = this._path[this._path.length-1];
    if(!parent && this._breakState) {
        if(this._breakState.path) {
            parent = this._breakState.path[this._breakState.path.length-1];
        }    
    }    
    if(parent && typeof( parent._activeIndex ) != "undefined")  {
        index = parent._activeIndex+1; // if continue, continue from next statement
    }

    // parent of this node...
    for( var i=index; i<node.length;i++) {
        if(parent) parent._activeIndex = i;
        me.walk( node[i], ctx );
        if(this._break) {
            return;
        }        
    }
    delete parent._activeIndex;

} else {
    if(node.type) {
        var runTime = {
            node : node,
            ctx : ctx
        };
        this.trigger("node", runTime);
        this.trigger(node.type, runTime);
        
        if(this._skipWalk) {
            this._skipWalk = false;
            return;
        }
        // if break command has been issued for the process
        if(this._break) {
            // Save the state of the machine and exit
            if(this._breakState) {
                var stack_array = this._breakState.path;
                this._path.forEach( function(node) {
                    stack_array.push(node);
                })
                this._breakState.node = node;
                this._breakState.ctx = ctx;
                this._breakState.process = this;
            } else {
                this._breakState = {
                    node : node,
                    ctx : ctx,
                    process : this,
                    path : this._path
                }
            }
            return;
        }       
        
        if(this._wCb) this._wCb(node);
        
        if(this[node.type]) {
            this._path.push(node);
            
            // NEW: the context of the node is also saved
            node._activeCtx = ctx;
            
            this[node.type](node, ctx);
            
            if(this._break) return;
            
            this._path.pop();

            
            
            // if this execution walk is over, but we have a break state available from
            // some previous execution context, continue from that...
            if(this._path.length==0) {
                if(this._breakState && this._breakState.path && this._breakState.path.length) {
                    var returnTo = this._breakState.path.pop();
                    if(returnTo) {
                        this.walk( returnTo, returnTo._activeCtx );
                    }
                }
            }
        } else {
            console.log("Did not find "+node.type);
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
    if(node.test) {
        this.walk(node.test,ctx);
        if(!node.test.eval_res) {
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


    
    


   
      
    




