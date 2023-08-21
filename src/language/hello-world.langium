grammar HelloWorld

entry Model: (stmts+=Stmt)*;

// Statements
Stmt:   On | Input;
On:     'On' '"'url=URL'"';
Input:  'Do' Block | 'Response' Block | 'Keyword' Block;
Cmd:    Click | SendText | GoTo | Keyword;

Click: 'Click' keyword=STRING;
SendText: 'SendText' keyword=STRING '"'text=STRING'"' (('&' keyword=STRING '"'text=STRING'"')*)? (('|' keyword=STRING '"'text=STRING'"''"')*)?;
GoTo: 'GoTo' '"'url=URL'"';
Keyword: keyword=STRING '"'locator=LOCATOR'"';

fragment Block: ('-' cmd=Cmd)*;





// Terminals
terminal STRING returns string: /[\w\@][\w\@]*/;
terminal URL returns string:    /[\w|\.|\:|\/|\?|\=]+/;
terminal LOCATOR returns string: /[\w\[\]\/][\w\[\]\/]*/;
hidden terminal WS:             /\s+/;
hidden terminal ML_COMMENT:     /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT:     /\/\/[^\n\r]*/;
