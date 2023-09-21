***Settings***
Library    SeleniumLibrary
Library    XML
Library    String
Library    Telnet

***Variables***

${username}   xpath://*[@id="userName"]
${login}   xpath://*[@id="login"]
${password}   xpath://*[@id="password"]
${logininvalid}   b3
${uservalid}   demouser
${passvalid}   DemoPass@@123
${userinvalid}   demo
${passinvalid}   demo@@123


***Test Cases***
Test1
   Open Browser   https://demoqa.com/login   Edge
   Maximize Browser Window

   Click Element   ${login}


Test2
   Open Browser   https://demoqa.com/login   Edge
   Maximize Browser Window


   Click Element   ${login}


