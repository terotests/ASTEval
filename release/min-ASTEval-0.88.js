(function(){var e={},t=function(){!function(e){e.on=function(e,t){return this._ev||(this._ev={}),this._ev[e]||(this._ev[e]=[]),this._ev[e].push(t),this},e.removeListener=function(e,t){if(this._ev&&this._ev[e])for(var a=this._ev[e],r=0;r<a.length;r++)if(a[r]==t)return void a.splice(r,1)},e.trigger=function(e,t,a){if(this._ev&&this._ev[e]){return this._ev[e].forEach(function(e){e(t,a)}),this}}}(this),function(e){var t,r,i,n,s,l,o;e._getUndefined=function(){return r},e.ArrayExpression=function(e,t){var a=this;if(e.elements&&e.elements.length>=0){this.out("[");var r=0;e.elements.forEach(function(e){r++>0&&a.out(","),a.trigger("ArrayElement",e),a.walk(e,t)}),this.out("]"),e.eval_res=[],e.elements.forEach(function(r){var i=r.eval_res||a.evalVariable(r,t);e.eval_res.push(i)})}},e.ArrayPattern=function(e,t){var a=this;if(e.elements&&e.elements.length>0){this.out("[");var r=0;e.elements.forEach(function(e){r++>0&&a.out(","),a.trigger("ArrayElement",e),a.walk(e,t)}),this.out("]")}},e.ArrowExpression=function(){},e.ArrowFunctionExpression=function(e,t){var r=this,i=this.findThis(t);e.eval_res=function(){if(!r.isKilled()){var n=[],s=arguments.length,l=arguments,o={functions:{},vars:{},variables:{},parentCtx:t};o["this"]=i;for(var u=new a,f=0;s>f;f++)n[f]=arguments[f];var f=0;e.params.forEach(function(a){return"RestElement"==a.type?(o.variables[a.argument.name]=n.slice(f),void f++):("undefined"!=typeof l[f]?o.variables[a.name]=l[f]:e.defaults&&e.defaults[f]&&(r.walk(e.defaults[f],t),o.variables[a.name]=e.defaults[f].eval_res),void f++)});try{u.startWalk(e.body,o)}catch(c){if("return"!=c.type)throw c}return e.expression&&(o.return_value=e.body.eval_res),o.return_value}},e.id&&e.id.name&&(t.variables[e.id.name]=e.eval_res)},e.AssignmentExpression=function(e,t){function a(t,a,i){if(!f.canAccess(i))return console.error("Access denied for object ",i),void(e.eval_res=r);if("MemberExpression"==t.type){var s,l;return s="undefined"!=typeof t.object.eval_res?t.object.eval_res:f.evalVariable(t.object,a),f.canAccess(s)?(l=t.computed?"undefined"!=typeof t.property.eval_res?t.property.eval_res:f.evalVariable(t.property.name,a):t.property.name,void(s&&"undefined"!=typeof l&&(s[l]=n(i),e.eval_res=n(i)))):(console.error("Access denied for object ",s),void(e.eval_res=r))}e.eval_res=n(i),f.assignTo(t.name,a,i)}var l=e;this.walk(l.right,t),this.walk(l.left,t);var o=l.right.eval_res;i(o)||(o=this.evalVariable(l.right,t));var u=l.left.eval_res;i(u)||(u=this.evalVariable(l.left,t)),o=s(o),u=s(u);var f=this;"="==l.operator&&a(l.left,t,o),"+="==l.operator&&a(l.left,t,u+o),"-="==l.operator&&a(l.left,t,u-o),"*="==l.operator&&a(l.left,t,u*o),"/="==l.operator&&a(l.left,t,u/o),"%="==l.operator&&a(l.left,t,u%o),"**="==l.operator&&a(l.left,t,Math.pow(u,o)),"<<="==l.operator&&a(l.left,t,u<<o),">>="==l.operator&&a(l.left,t,u>>o),">>>="==l.operator&&a(l.left,t,u>>>o),"&="==l.operator&&a(l.left,t,u&o),"^="==l.operator&&a(l.left,t,u^o),"|="==l.operator&&a(l.left,t,u|o)},e.assignTo=function(e,t,a){var r;if("object"==typeof e){var s=e;"Identifier"==s.type&&(r=s.name),"Literal"==s.type&&(r=s.value)}else r=e;this.findAndSetLet(r,t,a)||(i(t.variables[r])?t.variables[r]=n(a):t.parentCtx&&this.assignTo(r,t.parentCtx,a))},e.BinaryExpression=function(e,t){this.walk(e.left,t),this.walk(e.right,t);var a=e.left.eval_res,r=e.right.eval_res;i(a)||(a=this.evalVariable(e.left,t)),i(r)||(r=this.evalVariable(e.right,t)),a=s(a),r=s(r),"+"==e.operator&&(e.eval_res=a+r),"-"==e.operator&&(e.eval_res=a-r),"*"==e.operator&&(e.eval_res=a*r),"/"==e.operator&&(e.eval_res=a/r),"<"==e.operator&&(e.eval_res=r>a),"<="==e.operator&&(e.eval_res=r>=a),">"==e.operator&&(e.eval_res=a>r),">="==e.operator&&(e.eval_res=a>=r),"&"==e.operator&&(e.eval_res=a&r),"|"==e.operator&&(e.eval_res=a|r),"<<"==e.operator&&(e.eval_res=a<<r),">>"==e.operator&&(e.eval_res=a>>r),">>>"==e.operator&&(e.eval_res=a>>>r),"=="==e.operator&&(e.eval_res=a==r),"!="==e.operator&&(e.eval_res=a!=r),"==="==e.operator&&(e.eval_res=a===r),"!=="==e.operator&&(e.eval_res=a!==r),"%"==e.operator&&(e.eval_res=a%r),"instanceof"==e.operator&&(e.eval_res=a instanceof r)},e.BlockStatement=function(e,t){for(var a={block:!0,functions:{},vars:{},letVars:{},constVars:{},parentCtx:t},r=t;r&&r.block;)r=r.parentCtx;Object.defineProperty(a,"variables",{enumerable:!0,configurable:!0,writable:!0,value:r.variables}),this.out(" {",!0),this.indent(1),this.walk(e.body,a,!0),this.indent(-1),this.out("}")},e.BreakStatement=function(e,t){throw this.nlIfNot(),this.out("break "),e.label&&this.walk(e.label,t),this.out("",!0),{type:"break",label:e.label}},e.breakWalk=function(){this._breakWalk=!0},e.CallExpression=function(e,a){if(e.callee){if("FunctionExpression"==e.callee.type&&this.out("("),this.walk(e.callee,a),"FunctionExpression"==e.callee.type&&this.out(")"),this.out("("),e.arguments){var i=this;this.walk(e.arguments,a)}this.out(")");var i=this;if(!t(e.callee.eval_res)){var n=[],l=e.callee.eval_res;e.arguments&&e.arguments.forEach(function(e){n.push("undefined"!=typeof e.eval_res?s(e.eval_res):s(i.evalVariable(e,a)))});var o=a["this"];if("MemberExpression"==e.callee.type&&(o=e.callee.object.eval_res,!this.canAccess(o)))return console.error("Access denied for object ",o),void(e.eval_res=r);"ThisExpression"==e.callee.type&&a.parentCtx&&(o=a.parentCtx["this"]),"function"==typeof l&&(e.eval_res=l.apply(o,n))}}},e.canAccess=function(e){if(o)for(var t=0;t<o.length;t++)if(o[t]===e)return!1;return!0},e.CatchClause=function(e,t){this.out(" catch "),e.param&&(this.out("("),this.walk(e.param,t),this.out(")")),e.body&&this.walk(e.body,t)},e.ClassBody=function(e,t){this.out("{",!0),this.indent(1),this.walk(e.body,t),this.indent(-1),this.out("}",!0)},e.ClassDeclaration=function(e,t){this.out("class "),e.id&&(this.walk(e.id,t),this.out(" ")),e.superClass&&(this.trigger("Extends",e.superClass),this.out(" extends "),this.walk(e.superClass,t)),e.body&&this.walk(e.body,t)},e.collectVarsAndFns=function(e,t,a){if(e&&e.type&&!e._fnc&&"FunctionExpression"!=e.type){if("FunctionDeclaration"==e.type)return void a(e);if("VariableDeclaration"==e.type)return void a(e);e._fnc=!0;for(var r in e)if(e.hasOwnProperty(r)){if("_next"==r)continue;if("_prev"==r)continue;if("_parent"==r)continue;if("range"==r)continue;if("comments"==r)continue;var i=e[r];if(i instanceof Array)for(var n=0;n<i.length;n++){var s=i[n];"object"==typeof s&&this.collectVarsAndFns(s,t,a)}else"object"==typeof i&&this.collectVarsAndFns(i,t,a)}}},e.ConditionalExpression=function(e,t){this.walk(e.test,t),e.test.eval_res?(this.walk(e.consequent,t),e.eval_res=e.consequent.eval_res):(this.walk(e.alternate,t),e.eval_res=e.alternate.eval_res)},e.continueAfterBreak=function(){var e=this._breakState;e&&this._break&&(this._break=!1,this._path=[],this.walk(e.node,e.ctx))},e.ContinueStatement=function(e){throw{type:"continue",label:e.label}},e.createContext=function(e,t){for(var a={functions:{},vars:{},parentCtx:e,block:t},r=e;r&&r.block;)r=r.parentCtx;return t?Object.defineProperty(a,"variables",{enumerable:!0,configurable:!0,writable:!0,value:r.variables}):a.variables={},a},e.DebuggerStatement=function(){},e.DoWhileStatement=function(e,t){var a=1e6;do try{if(e.body&&this.walk(e.body,t),a--,!e.test)break;if(this.walk(e.test,t),!e.test.eval_res)break}catch(r){if(r&&"continue"==r.type){if(!r.label||!r.label.name)continue;if(e._label&&e._label.name==r.label.name)continue}if(r&&"break"==r.type){if(!r.label||!r.label.name)break;if(e._label&&e._label.name==r.label.name)break}throw r}while(a>0)},e.EmptyStatement=function(){},e.endBlock=function(){this.out("}",!0),this.indent(-1)},e.endCollecting=function(){this._collecting=!1},e.evalVariable=function(e,a){var r;if(null==e||"null"==e)return null;if("object"==typeof e){if("undefined"!=typeof e.eval_res)return e.eval_res;var n=e;if("Identifier"==n.type&&(r=n.name),"Literal"==n.type)return n.value}else r=e;if("number"==typeof e)return e;var s=this.findLetVar(r,a);if(i(s))return t(s)?void 0:s;var o=this.findConstVar(r,a);return i(o)?t(o)?void 0:o:i(a.variables[r])?t(a.variables[r])?void 0:a.variables[r]:a.parentCtx?this.evalVariable(r,a.parentCtx):l?l[r]:void 0},e.ExpressionStatement=function(e,t){this.nlIfNot(),this.walk(e.expression,t),this.out(";",!0),e.eval_res=e.expression.eval_res},e.findAndSetLet=function(e,t,a){return t.letVars&&i(t.letVars[e])?(t.letVars[e]=n(a),!0):t.parentCtx?this.findAndSetLet(e,t.parentCtx,a):void 0},e.findConstVar=function(e,t){return t.constVars&&i(t.constVars[e])?t.constVars[e]:t.parentCtx?this.findConstVar(e,t.parentCtx):void 0},e.findLetVar=function(e,t){return t.letVars&&i(t.letVars[e])?t.letVars[e]:t.parentCtx?this.findLetVar(e,t.parentCtx):void 0},e.findThis=function(e){return e["this"]?e["this"]:e.parentCtx?this.findThis(e.parentCtx):this.canAccess(l)?l:(console.error("Can not access ",l),r)},e.ForInStatement=function(e,t){var a=this.createContext(t,!0);if(e.left&&(this.walk(e.left,a),e.right)){this.walk(e.right,a);var r,i,n,s=e.right.eval_res;if("VariableDeclaration"==e.left.type?(i=e.left.declarations[0],n=i.kind,r=i.name||i.id.name):r="Identifier"==e.left.type?e.name:e.left.eval_res,r&&s)for(var l in s)try{i?this.assignTo(r,a,l):this.assignTo(r,a,l),this.walk(e.body,a)}catch(o){if(o&&"continue"==o.type){if(!o.label||!o.label.name)continue;if(e._label&&e._label.name==o.label.name)continue}if(o&&"break"==o.type){if(!o.label||!o.label.name)break;if(e._label&&e._label.name==o.label.name)break}throw o}}},e.ForOfStatement=function(e,t){var a=this.createContext(t,!0);if(e.left&&(this.walk(e.left,a),e.right)){this.walk(e.right,a);var r,i,n,s=e.right.eval_res;if("VariableDeclaration"==e.left.type?(i=e.left.declarations[0],n=i.kind,r=i.name||i.id.name):r="Identifier"==e.left.type?e.name:e.left.eval_res,r&&s){var l=this;s.every(function(t){try{return i?l.assignTo(r,a,t):l.assignTo(r,a,t),l.walk(e.body,a),!0}catch(n){if(n&&"continue"==n.type){if(!n.label||!n.label.name)return!0;if(e._label&&e._label.name==n.label.name)return!0}if(n&&"break"==n.type){if(!n.label||!n.label.name)return!1;if(e._label&&e._label.name==n.label.name)return!1}throw n}})}}},e.ForStatement=function(e,t){var a=this.createContext(t,!0);e.init&&this.walk(e.init,a);for(var r=1e6;r>0;)try{if(!e.test)break;if(this.walk(e.test,a),!e.test.eval_res)break;e.body&&this.walk(e.body,a),e.update&&this.walk(e.update,a),r--}catch(i){if(i&&"continue"==i.type){if(!i.label||!i.label.name){e.update&&this.walk(e.update,a);continue}if(e._label&&e._label.name==i.label.name){e.update&&this.walk(e.update,a);continue}}if(i&&"break"==i.type){if(!i.label||!i.label.name)break;if(e._label&&e._label.name==i.label.name)break}throw i}},e.FunctionDeclaration=function(e,t){var i=this;e.eval_res=function(){if(!i.isKilled()){var n=[],s=arguments.length,l=arguments,o={functions:{},vars:{},variables:{},parentCtx:t};o["this"]=this,o.variables.arguments=arguments,this instanceof e.eval_res&&(o.variables["new.target"]=e.eval_res);for(var u=new a,f=0;s>f;f++)n[f]=arguments[f];var f=0;e.params.forEach(function(a){return"RestElement"==a.type?(o.variables[a.argument.name]=n.slice(f),void f++):("undefined"!=typeof l[f]?o.variables[a.name]=l[f]:(o.variables[a.name]=r,e.defaults&&e.defaults[f]&&(i.walk(e.defaults[f],t),o.variables[a.name]=e.defaults[f].eval_res)),void f++)});try{u.startWalk(e.body,o)}catch(c){if("return"!=c.type)throw c}return o.return_value}},e.eval_res.__$$pLength__=e.params.length,e.params.forEach(function(t){"RestElement"==t.type&&e.eval_res.__$$pLength__--}),e.id&&e.id.name&&(t.variables[e.id.name]=e.eval_res)},e.FunctionExpression=function(e,t){var i=this;e.eval_res=function(){if(!i.isKilled()){var n=[],s=arguments.length,l=arguments,o={functions:{},vars:{},variables:{},parentCtx:t};o["this"]=this,o.variables.arguments=arguments,this instanceof e.eval_res&&(o.variables["new.target"]=e.eval_res);for(var u=new a,f=0;s>f;f++)n[f]=arguments[f];var f=0;e.params.forEach(function(a){return"RestElement"==a.type?(o.variables[a.argument.name]=n.slice(f),void f++):("undefined"!=typeof l[f]?o.variables[a.name]=l[f]:(o.variables[a.name]=r,e.defaults&&e.defaults[f]&&(i.walk(e.defaults[f],t),o.variables[a.name]=e.defaults[f].eval_res)),void f++)});try{u.startWalk(e.body,o)}catch(c){if("return"!=c.type)throw c}return o.return_value}},e.eval_res.__$$pLength__=e.params.length,e.params.forEach(function(t){"RestElement"==t.type&&e.eval_res.__$$pLength__--}),e.id&&e.id.name&&(t.variables[e.id.name]=e.eval_res)},e.getCode=function(){return this._codeStr},e.getParentProcess=function(){return this._parentProcess},e.getStructures=function(){return this._structures},e.handleException=function(e){for(var t=this._path.length-1;t>=0;t--){var a=this._path[t];if("TryStatement"==a.type){var r=a,i=a._exceptionHandlerCtx;if(i.variables[r.handler.param.name]=e,r.handler)try{this.walk(r.handler.body,i)}catch(e){}r.finalizer&&this.walk(r.finalizer,i);break}}},e.Identifier=function(e,t){return"ASTEval"==e.name?void(e.eval_res=r):"undefined"==e.name?void(e.eval_res=r):void(e.eval_res=this.evalVariable(e.name,t))},e.IfStatement=function(e,t){this.walk(e.test,t),e.test.eval_res?this.walk(e.consequent,t):this.walk(e.alternate,t)},e.indent=function(e){this._indent+=e,this._indent<0&&(this._indent=0)},e.__traitInit&&!e.hasOwnProperty("__traitInit")&&(e.__traitInit=e.__traitInit.slice()),e.__traitInit||(e.__traitInit=[]),e.__traitInit.push(function(e){this._structures=[],this._tabChar="  ",this._codeStr="",this._currentLine="",this._indent=0,this._options=e||{},this._options.globals&&(l=this._options.globals),this._options.accessDenied&&(o=this._options.accessDenied),l||(l={}),t||(r={},t=function(e){return e===r||"undefined"==typeof e},i=function(e){return"undefined"!=typeof e},n=function(e){return e===r?e:void 0===e?r:"undefined"==typeof e?r:e},s=function(e){return e===r?void 0:e})}),e.isKilled=function(){if(this._isKilled)return!0;var e=this.getParentProcess();return e?e.isKilled():void 0},e.isPaused=function(){if(this._isPaused)return!0;var e=this.getParentProcess();return e?e.isPaused():void 0},e.kill=function(){this._isKilled=!0},e.LabeledStatement=function(e,t){this.walk(e.label,t),e.body&&(e.label&&e.label&&(e.body._label=e.label),this.walk(e.body,t))},e.listify=function(e,t){if(e){e._parent=t;for(var a in e)if(e.hasOwnProperty(a)){if("_next"==a)continue;if("_prev"==a)continue;if("_parent"==a)continue;if("range"==a)continue;if("comments"==a)continue;var r=e[a];if(r instanceof Array)for(var i=0;i<r.length;i++){var n=r[i];"object"==typeof n&&(i<r.length-1&&(n._next=r[i+1]),i>0&&(n._prev=r[i-1]),this.listify(n,e))}else"object"==typeof r&&this.listify(r,e)}}},e.Literal=function(e){this.out(e.raw),e.eval_res=e.value,e.eval_type=typeof e.value},e.LogicalExpression=function(e,t){this.walk(e.left,t);var a=e.left.eval_res;if(i(a)||(a=this.evalVariable(e.left,t)),a=s(a),"&&"==e.operator&&!a)return void(e.eval_res=a);if("||"==e.operator&&a)return void(e.eval_res=a);this.walk(e.right,t);var r=e.right.eval_res;i(r)||(r=this.evalVariable(e.right,t)),r=s(r),e.eval_res=r},e.MemberExpression=function(e,a){this.walk(e.object,a),e.computed?this.walk(e.property,a):this.walk(e.property,a);var i;i="ThisExpression"==e.object.type?this.findThis(a):this.evalVariable(e.object,a),e.object.eval_res=i;var n;if(e.computed?("Literal"==e.property.type&&(n=e.property.value),"Identifier"==e.property.type&&(n=e.property.eval_res),"undefined"==typeof n&&(n=this.evalVariable(e.property,a))):n=e.property.name,!t(i))try{if(!this.canAccess(i))return console.error("Access denied for object ",i),void(e.eval_res=r);e.eval_res="length"==n&&"function"==typeof i&&"undefined"!=typeof i.__$$pLength__?i.__$$pLength__:i[n]}catch(s){}},e.MetaProperty=function(e,t){var a=e.meta+"."+e.property;e.eval_res=this.evalVariable(a,t)},e.MethodDefinition=function(e,t){e.key&&(this.__insideMethod=!0,"constructor"==e.kind&&this.trigger("ClassConstructor",e),e.static&&this.out("static "),this.walk(e.key,t),this.walk(e.value,t),this.out("",!0),this.__insideMethod=!1)},e.NewExpression=function(e,a){if(e.arguments){var i=this,n=0;e.arguments.forEach(function(e){n++>0&&i.out(", "),i.walk(e,a)})}if(e.callee&&(this.walk(e.callee,a),!t(e.callee.eval_res))){var l=[];if(e.arguments){var o=e.callee.eval_res;if(e.arguments.forEach(function(e){l.push("undefined"!=typeof e.eval_res?s(e.eval_res):s(i.evalVariable(e,a)))}),!i.canAccess(o))return void(e.eval_res=r);var u;0==l.length&&(u=new o),1==l.length&&(u=new o(l[0])),2==l.length&&(u=new o(l[0],l[1])),3==l.length&&(u=new o(l[0],l[1],l[2])),4==l.length&&(u=new o(l[0],l[1],l[2],l[3])),5==l.length&&(u=new o(l[0],l[1],l[2],l[3],l[4])),6==l.length&&(u=new o(l[0],l[1],l[2],l[3],l[4],l[5])),e.eval_res=u}}},e.nlIfNot=function(){var e=this._currentLine.length;e>0&&("{"==this._currentLine[e-1]||";"==this._currentLine[e-1]?this.out("",!0):this.out(";",!0))},e.ObjectExpression=function(e,t){var a=this;try{a.out("{");var r=0;e&&e.properties&&(e.properties.length>1&&a.out("",!0),a.indent(1),e.properties.forEach(function(e){r++>0&&a.out(",",!0),a.trigger("ObjectExpressionProperty",e),a.walk(e,t)}),a.indent(-1)),a.out("}"),e.eval_res={},e.properties&&e.properties.forEach(function(r){var i=r.value.eval_res||a.evalVariable(r.value,t),n=r.key.eval_res;"undefined"==typeof n&&(n=a.evalVariable(r.key,t)),e.eval_res[n]=i})}catch(i){console.error(i.message)}},e.ObjectPattern=function(e,t){var a=this;try{a.out("{");var r=0;e&&e.properties&&e.properties.forEach(function(e){r++>0&&a.out(","),a.trigger("ObjectExpressionProperty",e),a.walk(e,t)}),a.out("}")}catch(i){console.error(i.message)}},e.out=function(){},e.prevChar=function(){var e=this._currentLine.length;return e>0?this._currentLine[e-1]:"\n"},e.Program=function(e,t){this.walk(e.body,t,!0)},e.Property=function(e,t){if(this.trigger("ObjectPropertyKey",e.key),this.walk(e.key,t),e.shorthand||(this.out(":"),this.trigger("ObjectPropertyValue",e.value),this.walk(e.value,t)),e.key.computed){var a=this.evalVariable(e.key,t);"undefined"!=typeof a&&(e.key.eval_res=a)}else e.key.eval_res=e.key.name},e.pushStructure=function(e){this._structures||(this._structures=[]),this._structures.push(e)},e.RestElement=function(){},e.ReturnStatement=function(e,t){this.nlIfNot(),this.out("return "),this.trigger("ReturnValue",e.argument),this.walk(e.argument,t),this.out(";");var a=t;if(a.block)for(;a&&a.block;)a=a.parentCtx;throw a.return_value=e.argument?e.argument.eval_res:r,{type:"return"}},e.SequenceExpression=function(e,t){if(e.expressions){var a=this,r=0;this.out("("),e.expressions.forEach(function(i){r++>0&&a.out(","),a.walk(i,t),e.eval_res=i.eval_res}),this.out(")")}},e.setParentProcess=function(e){this._parentProcess=e,e._childProcess||(e._childProcess=[]),e._childProcess.indexOf(this)<0&&e._childProcess.push(e)},e.setPaused=function(e){this._isPaused=e},e.skip=function(){this._skipWalk=!0},e.startBlock=function(){this.out("{",!0),this.indent(1)},e.startCollecting=function(){this._collecting=!0},e.startWalk=function(e,t){this._breakWalk=!1,this._path=[],this._codeStr="",this._currentLine="",this.listify(e);var i=this;this.collectVarsAndFns(e,t,function(e){return"VariableDeclaration"==e.type&&e.declarations.forEach(function(e){t.variables[e.id.name]=r}),"FunctionDeclaration"==e.type?(e.eval_res=function(){if(!i.isKilled()){var n=[],s=arguments.length,l=arguments,o={functions:{},vars:{},variables:{},parentCtx:t};o["this"]=this,o.variables.arguments=arguments;for(var u=new a,f=0;s>f;f++)n[f]=arguments[f];var f=0;e.params.forEach(function(a){"undefined"!=typeof l[f]?o.variables[a.name]=l[f]:(o.variables[a.name]=r,e.defaults&&e.defaults[f]&&(i.walk(e.defaults[f],t),o.variables[a.name]=e.defaults[f].eval_res)),f++});try{u.startWalk(e.body,o)}catch(c){if("return"!=c.type)throw c}return o.return_value}},e.eval_res.__$$pLength__=e.params.length,void(e.id&&e.id.name&&(t.variables[e.id.name]=e.eval_res))):void 0}),this.walk(e,t),this.out("",!0)},e.Super=function(){this.out("super")},e.SwitchCase=function(e,t){e.test&&(this.walk(e.test,t),e.test.eval_res==t._switchTest.eval_res&&(t._switchMatch=!0),t._switchMatch&&e.consequent&&this.walk(e.consequent,t))},e.SwitchStatement=function(e,t){this.walk(e.discriminant,t);try{t._switchTest=e.discriminant,t._switchMatch=!1,this.walk(e.cases,t)}catch(a){if("break"!=a.type)throw a}},e.TemplateElement=function(){},e.TemplateLiteral=function(e,t){this.walk(e.expressions,t);for(var a="",r=0;r<e.quasis.length;r++){if(r>0){var i=e.expressions[r-1];a+=s(i.eval_res)}var n=e.quasis[r];a+=n.value.cooked}e.eval_res=a},e.ThisExpression=function(e,t){this.out("this"),e.eval_res=this.findThis(t)},e.ThrowStatement=function(e,t){this.nlIfNot(),this.out("throw "),this.trigger("ThrowArgument",e.argument),this.walk(e.argument,t);var a=e.argument.eval_res;throw"undefined"==typeof a&&(a=this.evalVariable(e.argument,t)),{type:"throw",node:e,value:a}},e.TryStatement=function(e,t){try{this.walk(e.block,t)}catch(a){var r;if(a&&a.type&&("return"==a.type||"break"==a.type||"continue"==a.type))throw a;if(r=a&&"throw"==a.type?a.value:a,e.finalizer&&this.walk(e.finalizer,t),!e.handler)throw a;var i=this.createContext(t);e.handler&&e.handler.param.name&&(i.variables[e.handler.param.name]=r),this.walk(e.handler.body,i)}},e.UnaryExpression=function(e,t){var a=!0;("Identifier"==e.argument.type||"Literal"==e.argument.type)&&(a=!1),this.out(e.operator),"!"!=e.operator&&this.out(" "),a&&this.out("("),this.trigger("UnaryExpressionArgument",e.argument),this.walk(e.argument,t),a&&this.out(")");var i=s(e.argument.eval_res||this.evalVariable(e.argument,t));if("-"==e.operator&&(e.eval_res=-1*i),"~"==e.operator&&(e.eval_res=~i),"!"==e.operator&&(e.eval_res=!i),"+"==e.operator&&(e.eval_res=+i),"delete"==e.operator){var n=e.argument;if("MemberExpression"==n.type){var o,u;return o="undefined"!=typeof n.object.eval_res?n.object.eval_res:this.evalVariable(n.object,t),this.canAccess(o)?(u=n.computed?"undefined"!=typeof n.property.eval_res?n.property.eval_res:this.evalVariable(n.property.name,t):n.property.name,void(e.eval_res=o&&u?delete o[u]:!1)):(console.error("Access denied for object ",o),void(e.eval_res=r))}e.eval_res=delete l[i]}"typeof"==e.operator&&(e.eval_res=typeof i),"void"==e.operator&&(e.eval_res=void i)},e.UpdateExpression=function(e,t){this.trigger("UpdateExpressionArgument",e.argument),this.walk(e.argument,t),this.out(e.operator);var a=e.argument.eval_value;"undefined"==typeof a&&(a=this.evalVariable(e.argument,t));var r=this,i=function(e,t,a){if("MemberExpression"==e.type){var i,n;return i="undefined"!=typeof e.object.eval_res?e.object.eval_res:this.evalVariable(e.object,t),n=e.computed?"undefined"!=typeof e.property.eval_res?e.property.eval_res:this.evalVariable(e.property.name,t):e.property.name,void(i&&n&&(i[n]=a))}r.assignTo(e,t,a)};"++"==e.operator&&"undefined"!=typeof a&&(e.prefix||(e.eval_res=a),a++,e.prefix&&(e.eval_res=a),i(e.argument,t,a)),"--"==e.operator&&"undefined"!=typeof a&&(e.prefix||(e.eval_res=a),a--,e.prefix&&(e.eval_res=a),i(e.argument,t,a))},e.VariableDeclaration=function(e,t){var a=this,r=0;"var"==e.kind&&a.out("var "),"let"==e.kind&&a.out("let "),"const"==e.kind&&a.out("const ");var i=0;t._varKind=e.kind,e.declarations.forEach(function(e){r++>0&&(2==r&&(i+=2,a.indent(i)),a.out(",",!0)),a.walk(e,t)}),this.indent(-1*i)},e.VariableDeclarator=function(e,t){var a=this;e.id&&a.walk(e.id,t),e.init?(this.out(" = "),a.walk(e.init,t),e.id.name&&"undefined"!=typeof e.init.eval_res&&(t.variables||(t.variables={}),"var"==t._varKind&&(t.variables[e.id.name]=n(e.init.eval_res)),"let"==t._varKind&&(t.letVars||(t.letVars={}),t.letVars[e.id.name]=n(e.init.eval_res)),"const"==t._varKind&&(t.constVars||(t.constVars={}),t.constVars[e.id.name]=n(e.init.eval_res)))):e.id.name&&(t.variables||(t.variables={}),"var"==t._varKind&&(t.variables[e.id.name]=r),"let"==t._varKind&&(t.letVars||(t.letVars={}),t.letVars[e.id.name]=r),"const"==t._varKind&&(t.constVars||(t.constVars={}),t.constVars[e.id.name]=r))},e.walk=function(e,t){if(e&&!this.isKilled()&&!this._break){if(!t)return console.log("ERROR: no context defined for ",e),void console.trace();if(e instanceof Array){var a=e[0];if(!a)return;this.walk(a,t)}else if(e.type){this._processingNode=e;var r={node:e,ctx:t};if(this.trigger("node",r),this.trigger(e.type,r),this._skipWalk)return void(this._skipWalk=!1);if(this._break){if(this._breakState){var i=this._breakState.path;this._path.forEach(function(e){i.push(e)}),this._breakState.node=e,this._breakState.ctx=t,this._breakState.process=this}else this._breakState={node:e,ctx:t,process:this,path:this._path};return}if(this._wCb&&this._wCb(e),this[e.type]){if(this._path.push(e),e._activeCtx=t,this[e.type](e,t),this._break)return;this._path.pop();var n=e._next;n?this.walk(n,t):0==this._path.length}else console.log("Did not find "+e.type),console.log(e)}}},e.walkAsString=function(e,t){var a="";try{this.startCollecting(),this._collectStr="",this._collectLine="",this.walk(e,t),a=this._collectStr,this.endCollecting()}catch(r){}return a},e.WhileStatement=function(e,t){for(var a=1e6;a>0;)try{if(!e.test)break;if(this.walk(e.test,t),!e.test.eval_res)break;e.body&&this.walk(e.body,t),a--}catch(r){if(r&&"continue"==r.type){if(!r.label||!r.label.name)continue;if(e._label&&e._label.name==r.label.name)continue}if(r&&"break"==r.type){if(!r.label||!r.label.name)break;if(e._label&&e._label.name==r.label.name)break}throw r}},e.WithStatement=function(){console.error("With statement is not supported")},e.YieldExpression=function(e,t){this.out("yield "),this.walk(e.argument,t)}}(this)},a=function(e,t,r,i,n,s,l,o){var u,f=this;if(!(f instanceof a))return new a(e,t,r,i,n,s,l,o);var c=[e,t,r,i,n,s,l,o];if(f.__factoryClass)if(f.__factoryClass.forEach(function(e){u=e.apply(f,c)}),"function"==typeof u){if(u._classInfo.name!=a._classInfo.name)return new u(e,t,r,i,n,s,l,o)}else if(u)return u;f.__traitInit?f.__traitInit.forEach(function(e){e.apply(f,c)}):"function"==typeof f.init&&f.init.apply(f,c)};a._classInfo={name:"ASTEval"},a.prototype=new t,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(e.ASTEval=a,this.ASTEval=a):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports.ASTEval=a:this.ASTEval=a}.call(new Function("return this")()),"undefined"!=typeof define&&null!==define&&null!=define.amd&&define(e)}).call(new Function("return this")());