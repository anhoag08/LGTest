***Settings***
Library    SeleniumLibrary
Library    XML
Library    String
Library    Telnet

***Variables***

${username}   xpath://*[@id="userName"]
${password}   xpath://*[@id="password"]
${login}   xpath://*[@id="login"]
@{uservalid-And(uservalid, passvalid)}   demouser   user1   user2
@{passvalid-And(uservalid, passvalid)}   DemoPass@@123   Userdemo@1   Userdemo@2
${uservalid}   demouser
${passvalid}   DemoPass@@123


***Test Cases***
Test1-1-1
   Open Browser   https://demoqa.com/login   Edge
   Maximize Browser Window
   Input Text   ${username}   ${uservalid-And(uservalid, passvalid)}[0]
   Input Text   ${password}   ${passvalid-And(uservalid, passvalid)}[0]
   Click Element   ${login}
Test1-1-2
   Open Browser   https://demoqa.com/login   Edge
   Maximize Browser Window
   Input Text   ${username}   ${uservalid-And(uservalid, passvalid)}[1]
   Input Text   ${password}   ${passvalid-And(uservalid, passvalid)}[1]
   Click Element   ${login}
Test1-1-3
   Open Browser   https://demoqa.com/login   Edge
   Maximize Browser Window
   Input Text   ${username}   ${uservalid-And(uservalid, passvalid)}[2]
   Input Text   ${password}   ${passvalid-And(uservalid, passvalid)}[2]
   Click Element   ${login}
Test2
   Open Browser   https://demoqa.com/login   Edge
   Maximize Browser Window
   Input Text   ${username}   ${uservalid}
   Input Text   ${password}   ${passvalid}
   Click Element   ${login}
