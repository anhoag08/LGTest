***Settings***
Library    SeleniumLibrary
Library    XML
Library    String
Library    Telnet

***Variables***

${UserName}   xpath://html/body/div[2]/div/div/div[2]/div[2]/div[2]/form/div[2]/div[2]/input
${PassWord}   xpath://html/body/div[2]/div/div/div[2]/div[2]/div[2]/form/div[3]/div[2]/input
${login_button}   xpath://html/body/div[2]/div/div/div[2]/div[2]/div[2]/form/div[4]/div[1]/button
@{password-[password, username]}   demouser   user1   user2
@{username-[password, username]}   DemoPass@@123   Userdemo@1   Userdemo@2
@{username}   demouser   user1
@{password}   DemoPass@@123   Userdemo@1


***Test Cases***
Valid-login-1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${PassWord}   ${password-[password, username]}[0]
   Input Text   ${UserName}   ${username-[password, username]}[0]
   Input Text   ${UserName}   ${username}[0]
   Input Text   ${PassWord}   ${password}[0]
   Click Element   ${login_button}
   Close Browser
Valid-login-2
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${PassWord}   ${password-[password, username]}[1]
   Input Text   ${UserName}   ${username-[password, username]}[1]
   Input Text   ${UserName}   ${username}[0]
   Input Text   ${PassWord}   ${password}[0]
   Click Element   ${login_button}
   Close Browser
Valid-login-3
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${PassWord}   ${password-[password, username]}[2]
   Input Text   ${UserName}   ${username-[password, username]}[2]
   Input Text   ${UserName}   ${username}[0]
   Input Text   ${PassWord}   ${password}[0]
   Click Element   ${login_button}
   Close Browser
Valid-login-4
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${PassWord}   ${password-[password, username]}[0]
   Input Text   ${UserName}   ${username-[password, username]}[0]
   Input Text   ${UserName}   ${username}[1]
   Input Text   ${PassWord}   ${password}[0]
   Click Element   ${login_button}
   Close Browser
Valid-login-5
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${PassWord}   ${password-[password, username]}[1]
   Input Text   ${UserName}   ${username-[password, username]}[1]
   Input Text   ${UserName}   ${username}[1]
   Input Text   ${PassWord}   ${password}[0]
   Click Element   ${login_button}
   Close Browser
Valid-login-6
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${PassWord}   ${password-[password, username]}[2]
   Input Text   ${UserName}   ${username-[password, username]}[2]
   Input Text   ${UserName}   ${username}[1]
   Input Text   ${PassWord}   ${password}[0]
   Click Element   ${login_button}
   Close Browser
Valid-login-7
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${PassWord}   ${password-[password, username]}[0]
   Input Text   ${UserName}   ${username-[password, username]}[0]
   Input Text   ${UserName}   ${username}[0]
   Input Text   ${PassWord}   ${password}[1]
   Click Element   ${login_button}
   Close Browser
Valid-login-8
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${PassWord}   ${password-[password, username]}[1]
   Input Text   ${UserName}   ${username-[password, username]}[1]
   Input Text   ${UserName}   ${username}[0]
   Input Text   ${PassWord}   ${password}[1]
   Click Element   ${login_button}
   Close Browser
Valid-login-9
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${PassWord}   ${password-[password, username]}[2]
   Input Text   ${UserName}   ${username-[password, username]}[2]
   Input Text   ${UserName}   ${username}[0]
   Input Text   ${PassWord}   ${password}[1]
   Click Element   ${login_button}
   Close Browser
Valid-login-10
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${PassWord}   ${password-[password, username]}[0]
   Input Text   ${UserName}   ${username-[password, username]}[0]
   Input Text   ${UserName}   ${username}[1]
   Input Text   ${PassWord}   ${password}[1]
   Click Element   ${login_button}
   Close Browser
Valid-login-11
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${PassWord}   ${password-[password, username]}[1]
   Input Text   ${UserName}   ${username-[password, username]}[1]
   Input Text   ${UserName}   ${username}[1]
   Input Text   ${PassWord}   ${password}[1]
   Click Element   ${login_button}
   Close Browser
Valid-login-12
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${PassWord}   ${password-[password, username]}[2]
   Input Text   ${UserName}   ${username-[password, username]}[2]
   Input Text   ${UserName}   ${username}[1]
   Input Text   ${PassWord}   ${password}[1]
   Click Element   ${login_button}
   Close Browser
