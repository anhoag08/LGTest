***Settings***
Library    SeleniumLibrary
Library    XML
Library    String
Library    Telnet

***Variables***

${u1}   xpath://*[@id="userName"]
${u2}   xpath://*[@id="userName"]
${u3}   xpath://*[@id="userName"]
${login}   xpath://*[@id="userName"]
${username}   xpath://*[@id="userName"]
${password}   xpath://*[@id="userName"]
@{v2}   u11   u12
@{v3}   u21   u22
@{v1}   u12
@{v3}   u22
${userinvalid}   place
${passinvalid}   place
@{values}   v1   v2   v3   v4


***Test Cases***
Test1
   Open Browser   https://demoqa.com/login   Edge
   Maximize Browser Window
   Input Text   ${u1}   ${v1}[0]
   Input Text   ${u2}   ${v2}[0]
   Input Text   ${u3}   ${v3}[0]
   Click Element   ${login}
   Input Text   ${u1}   ${EMPTY}
   Input Text   ${u2}   ${v2}[0]
   Input Text   ${u3}   ${EMPTY}
   Click Element   ${login}
   Input Text   ${u1}   ${v1}[0]
   Input Text   ${u2}   ${EMPTY}
   Input Text   ${u3}   ${v3}[0]
   Click Element   ${login}


Test2
   Open Browser   https://demoqa.com/login   Edge
   Maximize Browser Window


