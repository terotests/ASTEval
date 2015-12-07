(function(){var e={},t=function(){!function(e){e.on=function(e,t){return this._ev||(this._ev={}),this._ev[e]||(this._ev[e]=[]),this._ev[e].push(t),this},e.removeListener=function(e,t){if(this._ev&&this._ev[e])for(var r=this._ev[e],a=0;a<r.length;a++)if(r[a]==t)return void r.splice(a,1)},e.trigger=function(e,t,r){if(this._ev&&this._ev[e]){return this._ev[e].forEach(function(e){e(t,r)}),this}}}(this),function(e){var t,a,i,n,s;e.ArrayExpression=function(e,t){var r=this;if(e.elements&&e.elements.length>=0){this.out("[");var a=0;e.elements.forEach(function(e){a++>0&&r.out(","),r.trigger("ArrayElement",e),r.walk(e,t)}),this.out("]"),e.eval_res=[],e.elements.forEach(function(a){var i=a.eval_res||r.evalVariable(a,t);e.eval_res.push(i)})}},e.ArrayPattern=function(e,t){var r=this;if(e.elements&&e.elements.length>0){this.out("[");var a=0;e.elements.forEach(function(e){a++>0&&r.out(","),r.trigger("ArrayElement",e),r.walk(e,t)}),this.out("]")}},e.ArrowExpression=function(){},e.ArrowFunctionExpression=function(e,t){var a=this,i=this.findThis(t);e.eval_res=function(){if(!a.isKilled()){var n=[],s=arguments.length,o=arguments,l={functions:{},vars:{},variables:{},parentCtx:t};l["this"]=i;for(var u=new r,h=0;s>h;h++)n[h]=arguments[h];var h=0;e.params.forEach(function(r){"undefined"!=typeof o[h]?l.variables[r.name]=o[h]:e.defaults&&e.defaults[h]&&(a.walk(e.defaults[h],t),l.variables[r.name]=e.defaults[h].eval_res),h++});try{u.startWalk(e.body,l)}catch(f){if("return"!=f.type)throw f}return e.expression&&(l.return_value=e.body.eval_res),l.return_value}},e.id&&e.id.name&&(t.variables[e.id.name]=e.eval_res)},e.AssignmentExpression=function(e,t){function r(t,r,a){if("MemberExpression"==t.type){var i,s;return i="undefined"!=typeof t.object.eval_res?t.object.eval_res:u.evalVariable(t.object,r),s=t.computed?"undefined"!=typeof t.property.eval_res?u.evalVariable(t.property.eval_res,r):u.evalVariable(t.property.name,r):t.property.name,void(i&&s&&(i[s]=n(a),e.eval_res=n(a)))}e.eval_res=n(a),u.assignTo(t.name,r,a)}var a=e;this.walk(a.right,t),this.walk(a.left,t);var o=a.right.eval_res;i(o)||(o=this.evalVariable(a.right,t));var l=a.left.eval_res;i(l)||(l=this.evalVariable(a.left,t)),o=s(o),l=s(l);var u=this;"="==a.operator&&r(a.left,t,o),"+="==a.operator&&r(a.left,t,l+o),"-="==a.operator&&r(a.left,t,l-o),"*="==a.operator&&r(a.left,t,l*o),"/="==a.operator&&r(a.left,t,l/o),"%="==a.operator&&r(a.left,t,l%o),"**="==a.operator&&r(a.left,t,Math.pow(l,o)),"<<="==a.operator&&r(a.left,t,l<<o),">>="==a.operator&&r(a.left,t,l>>o),">>>="==a.operator&&r(a.left,t,l>>>o),"&="==a.operator&&r(a.left,t,l&o),"^="==a.operator&&r(a.left,t,l^o),"|="==a.operator&&r(a.left,t,l|o)},e.assignTo=function(e,t,r){var a;if("object"==typeof e){var s=e;"Identifier"==s.type&&(a=s.name),"Literal"==s.type&&(a=s.value)}else a=e;this.findAndSetLet(a,t,r)||(i(t.variables[a])?t.variables[a]=n(r):t.parentCtx&&this.assignTo(a,t.parentCtx,r))},e.BinaryExpression=function(e,t){this.walk(e.left,t),this.walk(e.right,t);var r=e.left.eval_res,a=e.right.eval_res;i(r)||(r=this.evalVariable(e.left,t)),i(a)||(a=this.evalVariable(e.right,t)),r=s(r),a=s(a),"+"==e.operator&&(e.eval_res=r+a),"-"==e.operator&&(e.eval_res=r-a),"*"==e.operator&&(e.eval_res=r*a),"/"==e.operator&&(e.eval_res=r/a),"<"==e.operator&&(e.eval_res=a>r),"<="==e.operator&&(e.eval_res=a>=r),">"==e.operator&&(e.eval_res=r>a),">="==e.operator&&(e.eval_res=r>=a),"&"==e.operator&&(e.eval_res=r&a),"|"==e.operator&&(e.eval_res=r|a),"<<"==e.operator&&(e.eval_res=r<<a),">>"==e.operator&&(e.eval_res=r>>a),">>>"==e.operator&&(e.eval_res=r>>>a),"=="==e.operator&&(e.eval_res=r==a),"!="==e.operator&&(e.eval_res=r!=a),"==="==e.operator&&(e.eval_res=r===a),"!=="==e.operator&&(e.eval_res=r!==a),"%"==e.operator&&(e.eval_res=r%a),"instanceof"==e.operator&&(e.eval_res=r instanceof a)},e.BlockStatement=function(e,t){for(var r={block:!0,functions:{},vars:{},letVars:{},constVars:{},parentCtx:t},a=t;a&&a.block;)a=a.parentCtx;Object.defineProperty(r,"variables",{enumerable:!0,configurable:!0,writable:!0,value:a.variables}),this.out(" {",!0),this.indent(1),this.walk(e.body,r,!0),this.indent(-1),this.out("}")},e.BreakStatement=function(e,t){throw this.nlIfNot(),this.out("break "),e.label&&this.walk(e.label,t),this.out("",!0),{type:"break"}},e.breakWalk=function(){this._breakWalk=!0},e.CallExpression=function(e,r){if(e.callee){if("FunctionExpression"==e.callee.type&&this.out("("),this.walk(e.callee,r),"FunctionExpression"==e.callee.type&&this.out(")"),this.out("("),e.arguments){var a=this,i=0;e.arguments.forEach(function(e){i++>0&&a.out(", "),a.walk(e,r)})}this.out(")");var a=this;if(!t(e.callee.eval_res)){var n=[],o=e.callee.eval_res;e.arguments&&e.arguments.forEach(function(e){a.walk(e,r),n.push("undefined"!=typeof e.eval_res?s(e.eval_res):s(a.evalVariable(e,r)))});var l=r["this"];"MemberExpression"==e.callee.type&&(this.walk(e.callee,r),l=e.callee.object.eval_res),"ThisExpression"==e.callee.type&&r.parentCtx&&(l=r.parentCtx["this"]),"function"==typeof o&&(e.eval_res=o.apply(l,n))}}},e.CatchClause=function(e,t){this.out(" catch "),e.param&&(this.out("("),this.walk(e.param,t),this.out(")")),e.body&&this.walk(e.body,t)},e.ClassBody=function(e,t){this.out("{",!0),this.indent(1),this.walk(e.body,t),this.indent(-1),this.out("}",!0)},e.ClassDeclaration=function(e,t){this.out("class "),e.id&&(this.walk(e.id,t),this.out(" ")),e.superClass&&(this.trigger("Extends",e.superClass),this.out(" extends "),this.walk(e.superClass,t)),e.body&&this.walk(e.body,t)},e.ConditionalExpression=function(e,t){this.walk(e.test,t),e.test.eval_res?(this.walk(e.consequent,t),e.eval_res=e.consequent.eval_res):(this.walk(e.alternate,t),e.eval_res=e.alternate.eval_res)},e.continueAfterBreak=function(){var e=this._breakState;e&&this._break&&(this._break=!1,this._path=[],this.walk(e.node,e.ctx))},e.ContinueStatement=function(){throw{type:"continue"}},e.createContext=function(e,t){for(var r={functions:{},vars:{},parentCtx:e,block:t},a=e;a&&a.block;)a=a.parentCtx;return t?Object.defineProperty(r,"variables",{enumerable:!0,configurable:!0,writable:!0,value:a.variables}):r.variables={},r},e.DebuggerStatement=function(){},e.DoWhileStatement=function(e,t){var r=1e6;do try{if(e.body&&this.walk(e.body,t),r--,!e.test)break;if(this.walk(e.test,t),!e.test.eval_res)break}catch(a){if(a&&"continue"==a.type)continue;if(a&&"break"==a.type)break;throw a}while(r>0)},e.EmptyStatement=function(){},e.endBlock=function(){this.out("}",!0),this.indent(-1)},e.endCollecting=function(){this._collecting=!1},e.evalVariable=function(e,r){var a;if(null==e||"null"==e)return null;if("object"==typeof e){if("undefined"!=typeof e.eval_res)return e.eval_res;var n=e;if("Identifier"==n.type&&(a=n.name),"Literal"==n.type)return n.value}else a=e;if("number"==typeof e)return e;var s=this.findLetVar(a,r);if(i(s))return t(s)?void 0:s;var o=this.findConstVar(a,r);return i(o)?t(o)?void 0:o:i(r.variables[a])?t(r.variables[a])?void 0:r.variables[a]:r.parentCtx?this.evalVariable(a,r.parentCtx):window[a]},e.ExpressionStatement=function(e,t){this.nlIfNot(),this.walk(e.expression,t),this.out(";",!0),e.eval_res=e.expression.eval_res},e.findAndSetLet=function(e,t,r){return t.letVars&&i(t.letVars[e])?(t.letVars[e]=n(r),!0):t.parentCtx?this.findAndSetLet(e,t.parentCtx,r):void 0},e.findConstVar=function(e,t){return t.constVars&&i(t.constVars[e])?t.constVars[e]:t.parentCtx?this.findConstVar(e,t.parentCtx):void 0},e.findLetVar=function(e,t){return t.letVars&&i(t.letVars[e])?t.letVars[e]:t.parentCtx?this.findLetVar(e,t.parentCtx):void 0},e.findThis=function(e){return e["this"]?e["this"]:e.parentCtx?this.findThis(e.parentCtx):window},e.ForInStatement=function(e,t){var r=this.createContext(t,!0);if(e.left&&(this.walk(e.left,r),e.right)){this.walk(e.right,r);var a,i,n,s=e.right.eval_res;if("VariableDeclaration"==e.left.type?(i=e.left.declarations[0],n=i.kind,a=i.name||i.id.name):a="Identifier"==e.left.type?e.name:e.left.eval_res,a&&s)for(var o in s)try{i?this.assignTo(a,r,o):this.assignTo(a,r,o),this.walk(e.body,r)}catch(l){if(l&&"continue"==l.type)continue;if(l&&"break"==l.type)break;throw l}}},e.ForOfStatement=function(e,t){var r=this.createContext(t,!0);if(e.left&&(this.walk(e.left,r),e.right)){this.walk(e.right,r);var a,i,n,s=e.right.eval_res;if("VariableDeclaration"==e.left.type?(i=e.left.declarations[0],n=i.kind,a=i.name||i.id.name):a="Identifier"==e.left.type?e.name:e.left.eval_res,a&&s){var o=this;s.every(function(t){try{return i?o.assignTo(a,r,t):o.assignTo(a,r,t),o.walk(e.body,r),!0}catch(n){if(n&&"continue"==n.type)return!0;if(n&&"break"==n.type)return!1;throw n}})}}},e.ForStatement=function(e,t){var r=this.createContext(t,!0);e.init&&this.walk(e.init,r);for(var a=1e6;a>0;)try{if(!e.test)break;if(this.walk(e.test,r),!e.test.eval_res)break;e.body&&this.walk(e.body,r),e.update&&this.walk(e.update,r),a--}catch(i){if(i&&"continue"==i.type)continue;if(i&&"break"==i.type)break;throw i}},e.FunctionDeclaration=function(e,t){var a=this;e.eval_res=function(){if(!a.isKilled()){var i=[],n=arguments.length,s=arguments,o={functions:{},vars:{},variables:{},parentCtx:t};o["this"]=this,o.variables.arguments=arguments;for(var l=new r,u=0;n>u;u++)i[u]=arguments[u];var u=0;e.params.forEach(function(r){"undefined"!=typeof s[u]?o.variables[r.name]=s[u]:e.defaults&&e.defaults[u]&&(a.walk(e.defaults[u],t),o.variables[r.name]=e.defaults[u].eval_res),u++});try{l.startWalk(e.body,o)}catch(h){if("return"!=h.type)throw h}return o.return_value}},e.id&&e.id.name&&(t.variables[e.id.name]=e.eval_res)},e.FunctionExpression=function(e,t){var a=this;e.eval_res=function(){if(!a.isKilled()){var i=[],n=arguments.length,s=arguments,o={functions:{},vars:{},variables:{},parentCtx:t};o["this"]=this,o.variables.arguments=arguments;for(var l=new r,u=0;n>u;u++)i[u]=arguments[u];var u=0;e.params.forEach(function(r){"undefined"!=typeof s[u]?o.variables[r.name]=s[u]:e.defaults&&e.defaults[u]&&(a.walk(e.defaults[u],t),o.variables[r.name]=e.defaults[u].eval_res),u++});try{l.startWalk(e.body,o)}catch(h){if("return"!=h.type)throw h}return o.return_value}},e.id&&e.id.name&&(t.variables[e.id.name]=e.eval_res)},e.getCode=function(){return this._codeStr},e.getParentProcess=function(){return this._parentProcess},e.getStructures=function(){return this._structures},e.handleException=function(e){for(var t=this._path.length-1;t>=0;t--){var r=this._path[t];if("TryStatement"==r.type){var a=r,i=r._exceptionHandlerCtx;if(i.variables[a.handler.param.name]=e,a.handler)try{this.walk(a.handler.body,i)}catch(e){}a.finalizer&&this.walk(a.finalizer,i);break}}},e.Identifier=function(e,t){return"undefined"==e.name?void(e.eval_res=a):void(e.eval_res=this.evalVariable(e.name,t))},e.IfStatement=function(e,t){this.walk(e.test,t),e.test.eval_res?this.walk(e.consequent,t):this.walk(e.alternate,t)},e.indent=function(e){this._indent+=e,this._indent<0&&(this._indent=0)},e.__traitInit&&!e.hasOwnProperty("__traitInit")&&(e.__traitInit=e.__traitInit.slice()),e.__traitInit||(e.__traitInit=[]),e.__traitInit.push(function(e){this._structures=[],this._tabChar="  ",this._codeStr="",this._currentLine="",this._indent=0,this._options=e||{},t||(a={},t=function(e){return e===a||"undefined"==typeof e},i=function(e){return"undefined"!=typeof e},n=function(e){return e===a?e:void 0===e?a:"undefined"==typeof e?a:e},s=function(e){return e===a?void 0:e})}),e.isKilled=function(){if(this._isKilled)return!0;var e=this.getParentProcess();return e?e.isKilled():void 0},e.isPaused=function(){if(this._isPaused)return!0;var e=this.getParentProcess();return e?e.isPaused():void 0},e.kill=function(){this._isKilled=!0},e.LabeledStatement=function(e,t){this.nlIfNot(),this.walk(e.label,t),this.out(":",!0),this.indent(1),e.body&&this.walk(e.body,t),this.indent(-1)},e.listify=function(e,t){if(e){e._parent=t;for(var r in e)if(e.hasOwnProperty(r)){if("_next"==r)continue;if("_prev"==r)continue;if("_parent"==r)continue;if("range"==r)continue;if("comments"==r)continue;var a=e[r];if(a instanceof Array)for(var i=0;i<a.length;i++){var n=a[i];"object"==typeof n&&(i<a.length-1&&(n._next=a[i+1]),i>0&&(n._prev=a[i-1]),this.listify(n,e))}else"object"==typeof a&&this.listify(a,e)}}},e.Literal=function(e){this.out(e.raw),e.eval_res=e.value,e.eval_type=typeof e.value},e.LogicalExpression=function(e,t){this.walk(e.left,t);var r=e.left.eval_res;if(i(r)||(r=this.evalVariable(e.left,t)),r=s(r),"&&"==e.operator&&!r)return void(e.eval_res=r);if("||"==e.operator&&r)return void(e.eval_res=r);this.walk(e.right,t);var a=e.right.eval_res;i(a)||(a=this.evalVariable(e.right,t)),a=s(a),e.eval_res=a},e.MemberExpression=function(e,r){this.walk(e.object,r),e.computed?this.walk(e.property,r):this.walk(e.property,r);var a;a="ThisExpression"==e.object.type?this.findThis(r):this.evalVariable(e.object,r),e.object.eval_res=a;var i;if(e.computed?("Literal"==e.property.type&&(i=e.property.value),"Identifier"==e.property.type&&(i=e.property.eval_res),"undefined"==typeof i&&(i=this.evalVariable(e.property,r))):i=e.property.name,!t(a))try{e.eval_res=a[i]}catch(n){}},e.MethodDefinition=function(e,t){e.key&&(this.__insideMethod=!0,"constructor"==e.kind&&this.trigger("ClassConstructor",e),e.static&&this.out("static "),this.walk(e.key,t),this.walk(e.value,t),this.out("",!0),this.__insideMethod=!1)},e.NewExpression=function(e,r){if(e.arguments){var a=this,i=0;e.arguments.forEach(function(e){i++>0&&a.out(", "),a.walk(e,r)})}if(e.callee&&(this.walk(e.callee,r),!t(e.callee.eval_res))){var n=[];if(e.arguments){var o=e.callee.eval_res;e.arguments.forEach(function(e){n.push("undefined"!=typeof e.eval_res?s(e.eval_res):s(a.evalVariable(e,r)))});var l;0==n.length&&(l=new o),1==n.length&&(l=new o(n[0])),2==n.length&&(l=new o(n[0],n[1])),3==n.length&&(l=new o(n[0],n[1],n[2])),4==n.length&&(l=new o(n[0],n[1],n[2],n[3])),5==n.length&&(l=new o(n[0],n[1],n[2],n[3],n[4])),6==n.length&&(l=new o(n[0],n[1],n[2],n[3],n[4],n[5])),e.eval_res=l}}},e.nlIfNot=function(){var e=this._currentLine.length;e>0&&("{"==this._currentLine[e-1]||";"==this._currentLine[e-1]?this.out("",!0):this.out(";",!0))},e.ObjectExpression=function(e,t){var r=this;try{r.out("{");var a=0;e&&e.properties&&(e.properties.length>1&&r.out("",!0),r.indent(1),e.properties.forEach(function(e){a++>0&&r.out(",",!0),r.trigger("ObjectExpressionProperty",e),r.walk(e,t)}),r.indent(-1)),r.out("}"),e.eval_res={},e.properties&&e.properties.forEach(function(a){var i=a.value.eval_res||r.evalVariable(a.value,t),n=a.key.eval_res;"undefined"==typeof n&&(n=r.evalVariable(a.key,t)),e.eval_res[n]=i})}catch(i){console.error(i.message)}},e.ObjectPattern=function(e,t){var r=this;try{r.out("{");var a=0;e&&e.properties&&e.properties.forEach(function(e){a++>0&&r.out(","),r.trigger("ObjectExpressionProperty",e),r.walk(e,t)}),r.out("}")}catch(i){console.error(i.message)}},e.out=function(){},e.prevChar=function(){var e=this._currentLine.length;return e>0?this._currentLine[e-1]:"\n"},e.Program=function(e,t){this.walk(e.body,t,!0)},e.Property=function(e,t){if(this.trigger("ObjectPropertyKey",e.key),this.walk(e.key,t),e.shorthand||(this.out(":"),this.trigger("ObjectPropertyValue",e.value),this.walk(e.value,t)),e.key.computed){var r=this.evalVariable(e.key,t);"undefined"!=typeof r&&(e.key.eval_res=r)}else e.key.eval_res=e.key.name},e.pushStructure=function(e){this._structures||(this._structures=[]),this._structures.push(e)},e.RestElement=function(e,t){e.argument&&this.trigger("RestArgument",e.argument),this.out(" ..."),this.walk(e.argument,t)},e.ReturnStatement=function(e,t){this.nlIfNot(),this.out("return "),this.trigger("ReturnValue",e.argument),this.walk(e.argument,t),this.out(";");var r=t;if(r.block)for(;r&&r.block;)r=r.parentCtx;throw r.return_value=e.argument.eval_res,{type:"return"}},e.SequenceExpression=function(e,t){if(e.expressions){var r=this,a=0;this.out("("),e.expressions.forEach(function(i){a++>0&&r.out(","),r.walk(i,t),e.eval_res=i.eval_res}),this.out(")")}},e.setParentProcess=function(e){this._parentProcess=e,e._childProcess||(e._childProcess=[]),e._childProcess.indexOf(this)<0&&e._childProcess.push(e)},e.setPaused=function(e){this._isPaused=e},e.skip=function(){this._skipWalk=!0},e.startBlock=function(){this.out("{",!0),this.indent(1)},e.startCollecting=function(){this._collecting=!0},e.startWalk=function(e,t){this._breakWalk=!1,this._path=[],this._codeStr="",this._currentLine="",this.walk(e,t),this.out("",!0)},e.Super=function(){this.out("super")},e.SwitchCase=function(e,t){e.test&&(this.walk(e.test,t),e.test.eval_res==t._switchTest.eval_res&&(t._switchMatch=!0),t._switchMatch&&e.consequent&&this.walk(e.consequent,t))},e.SwitchStatement=function(e,t){this.walk(e.discriminant,t);try{t._switchTest=e.discriminant,t._switchMatch=!1,this.walk(e.cases,t)}catch(r){if("break"!=r.type)throw r}},e.ThisExpression=function(e,t){this.out("this"),e.eval_res=this.findThis(t)},e.ThrowStatement=function(e,t){this.nlIfNot(),this.out("throw "),this.trigger("ThrowArgument",e.argument),this.walk(e.argument,t);var r=e.argument.eval_res;throw"undefined"==typeof r&&(r=this.evalVariable(e.argument,t)),{type:"throw",node:e,value:r}},e.TryStatement=function(e,t){this.out("try ");try{this.walk(e.block,t)}catch(r){if("throw"!=r.type)throw r;if(e.finalizer&&this.walk(e.finalizer,t),!e.handler)throw r;var a=this.createContext(t);e.handler&&e.handler.param.name&&(a.variables[e.handler.param.name]=r.value),this.walk(e.handler.body,a)}},e.UnaryExpression=function(e,t){var r=!0;("Identifier"==e.argument.type||"Literal"==e.argument.type)&&(r=!1),this.out(e.operator),"!"!=e.operator&&this.out(" "),r&&this.out("("),this.trigger("UnaryExpressionArgument",e.argument),this.walk(e.argument,t),r&&this.out(")");var a=s(e.argument.eval_res||this.evalVariable(e.argument,t));"-"==e.operator&&(e.eval_res=-1*a),"~"==e.operator&&(e.eval_res=~a),"!"==e.operator&&(e.eval_res=!a),"+"==e.operator&&(e.eval_res=+a),"delete"==e.operator&&console.error("Delete unary operator not defined"),"typeof"==e.operator&&(e.eval_res=typeof a),"void"==e.operator&&(e.eval_res=void a)},e.UpdateExpression=function(e,t){this.trigger("UpdateExpressionArgument",e.argument),this.walk(e.argument,t),this.out(e.operator);var r=e.argument.eval_value;"undefined"==typeof r&&(r=this.evalVariable(e.argument,t));var a=this,i=function(e,t,r){if("MemberExpression"==e.type){var i,n;return i="undefined"!=typeof e.object.eval_res?e.object.eval_res:this.evalVariable(e.object,t),n=e.computed?"undefined"!=typeof e.property.eval_res?this.evalVariable(e.property.eval_res,t):this.evalVariable(e.property.name,t):e.property.name,void(i&&n&&(i[n]=r))}a.assignTo(e,t,r)};"++"==e.operator&&"undefined"!=typeof r&&(e.prefix||(e.eval_res=r),r++,e.prefix&&(e.eval_res=r),i(e.argument,t,r)),"--"==e.operator&&"undefined"!=typeof r&&(e.prefix||(e.eval_res=r),r--,e.prefix&&(e.eval_res=r),i(e.argument,t,r))},e.VariableDeclaration=function(e,t){var r=this,a=0;"var"==e.kind&&r.out("var "),"let"==e.kind&&r.out("let "),"const"==e.kind&&r.out("const ");var i=0;t._varKind=e.kind,e.declarations.forEach(function(e){a++>0&&(2==a&&(i+=2,r.indent(i)),r.out(",",!0)),r.walk(e,t)}),this.indent(-1*i)},e.VariableDeclarator=function(e,t){var r=this;e.id&&r.walk(e.id,t),e.init?(this.out(" = "),r.walk(e.init,t),e.id.name&&"undefined"!=typeof e.init.eval_res&&(t.variables||(t.variables={}),"var"==t._varKind&&(t.variables[e.id.name]=n(e.init.eval_res)),"let"==t._varKind&&(t.letVars||(t.letVars={}),t.letVars[e.id.name]=n(e.init.eval_res)),"const"==t._varKind&&(t.constVars||(t.constVars={}),t.constVars[e.id.name]=n(e.init.eval_res)))):e.id.name&&(t.variables||(t.variables={}),"var"==t._varKind&&(t.variables[e.id.name]=a),"let"==t._varKind&&(t.letVars||(t.letVars={}),t.letVars[e.id.name]=a),"const"==t._varKind&&(t.constVars||(t.constVars={}),t.constVars[e.id.name]=a))},e.walk=function(e,t){if(e&&!this.isKilled()&&!this._break){if(!t)return console.log("ERROR: no context defined for ",e),void console.trace();if(e instanceof Array){var r=e[0];if(!r)return;this.walk(r,t)}else if(e.type){this._processingNode=e;var a={node:e,ctx:t};if(this.trigger("node",a),this.trigger(e.type,a),this._skipWalk)return void(this._skipWalk=!1);if(this._break){if(this._breakState){var i=this._breakState.path;this._path.forEach(function(e){i.push(e)}),this._breakState.node=e,this._breakState.ctx=t,this._breakState.process=this}else this._breakState={node:e,ctx:t,process:this,path:this._path};return}if(this._wCb&&this._wCb(e),this[e.type]){if(this._path.push(e),e._activeCtx=t,this[e.type](e,t),this._break)return;this._path.pop();var n=e._next;n?this.walk(n,t):0==this._path.length}else console.log("Did not find "+e.type),console.log(e)}}},e.walkAsString=function(e,t){var r="";try{this.startCollecting(),this._collectStr="",this._collectLine="",this.walk(e,t),r=this._collectStr,this.endCollecting()}catch(a){}return r},e.WhileStatement=function(e,t){for(var r=1e6;r>0;)try{if(!e.test)break;if(this.walk(e.test,t),!e.test.eval_res)break;e.body&&this.walk(e.body,t),r--}catch(a){if(a&&"continue"==a.type)continue;if(a&&"break"==a.type)break;throw a}},e.WithStatement=function(){console.error("With statement is not supported")},e.YieldExpression=function(e,t){this.out("yield "),this.walk(e.argument,t)}}(this)},r=function(e,t,a,i,n,s,o,l){var u,h=this;if(!(h instanceof r))return new r(e,t,a,i,n,s,o,l);var f=[e,t,a,i,n,s,o,l];if(h.__factoryClass)if(h.__factoryClass.forEach(function(e){u=e.apply(h,f)}),"function"==typeof u){if(u._classInfo.name!=r._classInfo.name)return new u(e,t,a,i,n,s,o,l)}else if(u)return u;h.__traitInit?h.__traitInit.forEach(function(e){e.apply(h,f)}):"function"==typeof h.init&&h.init.apply(h,f)};r._classInfo={name:"ASTEval"},r.prototype=new t,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(e.ASTEval=r,this.ASTEval=r):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports.ASTEval=r:this.ASTEval=r}.call(new Function("return this")()),"undefined"!=typeof define&&null!==define&&null!=define.amd&&define(e)}).call(new Function("return this")());