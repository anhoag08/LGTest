grammar HelloWorld

entry Model: (stmts+=Stmt)*;

Stmt: On | Valid | Invalid | Locators | Values;
Locators: 'LOCATOR:' LocBlock;
Values: 'VALUE:' ValBlock;
On: 'On'  value=URL ':';
Valid: 'Valid:' body+=Do+;
Invalid: 'Invalid:' body+=Do+;
Do: 'Do:' name=MSTR Block;

Action: SendText | Click;


SendText: '-' 'SendText' expr=Expr;
Click: '-' 'Click' locator=MSTR;
Loc: name=MSTR ':'  value=XPATH;
Val: SingleVal | Bundle | Tuple;

SingleVal: name=MSTR ':' value=MSTR;
Bundle: name=MSTR ':' '(' values+=MSTR (',' values+=MSTR)* ')';
Tuple: '[' names+=MSTR (',' names+=MSTR)* ']:' '(' values+=MSTR (',' values+=MSTR)* ')' (',' '(' values+=MSTR (',' values+=MSTR)* ')')*;

Expr: Or;

Or infers Expr:
    And ({infer LogicExpr.e1=current} op='|' e2=And)*;
And infers Expr:
    Primary ({infer LogicExpr.e1=current} op='&' e2=Primary)*;

Primary: Group | Lit;
Lit: value=MSTR 'to' locator=MSTR;
Group: '(' ge=Expr ')';

fragment Block: body+=Action+;
fragment LocBlock: body+=Loc+;
fragment ValBlock: body+=Val+;

// Terminals

terminal URL:  /[\w]*:[\w\.\?\/\=\-\%\[\]\"\@\*]+/;
terminal XPATH: /xpath=\/\/\w+\[[\w\@\=\'\ \-\(\)\.]+\]/;
terminal MSTR: /[\w\_\@]+/;

hidden terminal WS:             /\s+/;
hidden terminal ML_COMMENT:     /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT:     /\/\/[^\n\r]*/;
