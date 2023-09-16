***Settings***
Library    SeleniumLibrary
Library    XML
Library    String
Library    Telnet

***Variables***

${username}   xpath://*[@id="userName"]
${login}   xpath://*[@id="login"]
${password}   xpath://*[@id="password"]
${uservalid}   demouser
${passvalid}   DemoPass@@123
${userinvalid}   demo
${passinvalid}   demo@@123


***Test Cases***
Test1
   Open Browser   https://demoqa.com/login   Edge
   Maximize Browser Window
   Input Text   ${username}   ${uservalid}
   Input Text   ${password}   ${passvalid}
   Click Element   ${login}


Test2
   Open Browser   https://demoqa.com/login   Edge
   Maximize Browser Window
   Input Text   ${username}   ${userinvalid}
   Input Text   ${password}   ${passinvalid}
   Click Element   ${login}


