***Settings***
Library    SeleniumLibrary
Library    XML
Library    String
Library    Telnet

***Variables***
${login_button}   xpath=//button[@id='login' and @type='button' and normalize-space()='Login']
${password_loc}   xpath=//input[@placeholder='Password' and @type='password' and @id='password']
${username_loc}   xpath=//input[@placeholder='UserName' and @id='userName']
@{password-[password, username]}   DemoPass@@123   Userdemo@1   Userdemo@2
@{username-[password, username]}   demouser   user1   user2


***Test Cases***
Valid-login-1
   Open Browser   https://demoqa.com/login   Edge
   Maximize Browser Window
   Input Text   ${password_loc}   ${password-[password, username]}[0]
   Input Text   ${username_loc}   ${username-[password, username]}[0]
   Click Element   ${login_button}
   Close Browser
Valid-login-2
   Open Browser   https://demoqa.com/login   Edge
   Maximize Browser Window
   Input Text   ${password_loc}   ${password-[password, username]}[1]
   Input Text   ${username_loc}   ${username-[password, username]}[1]
   Click Element   ${login_button}
   Close Browser
Valid-login-3
   Open Browser   https://demoqa.com/login   Edge
   Maximize Browser Window
   Input Text   ${password_loc}   ${password-[password, username]}[2]
   Input Text   ${username_loc}   ${username-[password, username]}[2]
   Click Element   ${login_button}
   Close Browser
