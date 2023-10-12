***Settings***
Library    SeleniumLibrary
Library    XML
Library    String
Library    Telnet

***Variables***

${u1}   xpath://*[@id="userName"]
${u2}   xpath://*[@id="userName"]
${u3}   xpath://*[@id="userName"]
${u4}   xpath://*[@id="userName"]
${u7}   xpath://*[@id="userName"]
${login}   xpath://*[@id="userName"]
${u5}   xpath://*[@id="userName"]
${u6}   xpath://*[@id="userName"]
@{v1-[v1, v2, v3, v4]}   u1
@{v2-[v1, v2, v3, v4]}   u2
@{v3-[v1, v2, v3, v4]}   u3
@{v4-[v1, v2, v3, v4]}   u4
@{v1-[v1, v2, v3]}   v11
@{v2-[v1, v2, v3]}   v21
@{v3-[v1, v2, v3]}   v31
@{v1-[v1, v2, v4]}   v11
@{v2-[v1, v2, v4]}   v21
@{v4-[v1, v2, v4]}   v31
@{v1-[v1, v4]}   u11
@{v4-[v1, v4]}   u21
@{v1-[v1, v3, v4]}   v11
@{v3-[v1, v3, v4]}   v21
@{v4-[v1, v3, v4]}   v31
@{v1-[v1, v3]}   u11
@{v3-[v1, v3]}   u21
@{v2-[v2, v3, v4]}   v11
@{v3-[v2, v3, v4]}   v21
@{v4-[v2, v3, v4]}   v31
@{v2-[v2, v3]}   u11
@{v3-[v2, v3]}   u21
@{v2-[v2, v4]}   u11
@{v4-[v2, v4]}   u21
@{v7}   u1   u2   
@{v5-[v5, v6]}   u11   u11
@{v6-[v5, v6]}   u21   u12
@{v1-[v1, v2]}   u11   u11
@{v2-[v1, v2]}   u21   u12
@{v5}   u1   u2   u3   
@{v6}   u1   u2   u3   u4   


***Test Cases***
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${v5-[v5, v6]}[0]
   Input Text   ${u6}   ${v6-[v5, v6]}[0]
   Input Text   ${u5}   ${v5}[0]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${v5-[v5, v6]}[0]
   Input Text   ${u6}   ${v6-[v5, v6]}[0]
   Input Text   ${u5}   ${v5}[0]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${v5-[v5, v6]}[1]
   Input Text   ${u6}   ${v6-[v5, v6]}[1]
   Input Text   ${u5}   ${v5}[0]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${v5-[v5, v6]}[1]
   Input Text   ${u6}   ${v6-[v5, v6]}[1]
   Input Text   ${u5}   ${v5}[0]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${v5}[0]
   Input Text   ${u6}   ${EMPTY}
   Input Text   ${u5}   ${v5}[0]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${v5}[0]
   Input Text   ${u6}   ${EMPTY}
   Input Text   ${u5}   ${v5}[0]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${v5}[1]
   Input Text   ${u6}   ${EMPTY}
   Input Text   ${u5}   ${v5}[0]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${v5}[1]
   Input Text   ${u6}   ${EMPTY}
   Input Text   ${u5}   ${v5}[0]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${v5}[2]
   Input Text   ${u6}   ${EMPTY}
   Input Text   ${u5}   ${v5}[0]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${v5}[2]
   Input Text   ${u6}   ${EMPTY}
   Input Text   ${u5}   ${v5}[0]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${v5}[3]
   Input Text   ${u6}   ${EMPTY}
   Input Text   ${u5}   ${v5}[0]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${v5}[3]
   Input Text   ${u6}   ${EMPTY}
   Input Text   ${u5}   ${v5}[0]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[0]
   Input Text   ${u5}   ${v5}[0]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[0]
   Input Text   ${u5}   ${v5}[0]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[1]
   Input Text   ${u5}   ${v5}[0]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[1]
   Input Text   ${u5}   ${v5}[0]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[2]
   Input Text   ${u5}   ${v5}[0]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[2]
   Input Text   ${u5}   ${v5}[0]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[3]
   Input Text   ${u5}   ${v5}[0]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[3]
   Input Text   ${u5}   ${v5}[0]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[4]
   Input Text   ${u5}   ${v5}[0]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[4]
   Input Text   ${u5}   ${v5}[0]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${v5-[v5, v6]}[0]
   Input Text   ${u6}   ${v6-[v5, v6]}[0]
   Input Text   ${u5}   ${v5}[1]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${v5-[v5, v6]}[0]
   Input Text   ${u6}   ${v6-[v5, v6]}[0]
   Input Text   ${u5}   ${v5}[1]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${v5-[v5, v6]}[1]
   Input Text   ${u6}   ${v6-[v5, v6]}[1]
   Input Text   ${u5}   ${v5}[1]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${v5-[v5, v6]}[1]
   Input Text   ${u6}   ${v6-[v5, v6]}[1]
   Input Text   ${u5}   ${v5}[1]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${v5}[0]
   Input Text   ${u6}   ${EMPTY}
   Input Text   ${u5}   ${v5}[1]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${v5}[0]
   Input Text   ${u6}   ${EMPTY}
   Input Text   ${u5}   ${v5}[1]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${v5}[1]
   Input Text   ${u6}   ${EMPTY}
   Input Text   ${u5}   ${v5}[1]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${v5}[1]
   Input Text   ${u6}   ${EMPTY}
   Input Text   ${u5}   ${v5}[1]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${v5}[2]
   Input Text   ${u6}   ${EMPTY}
   Input Text   ${u5}   ${v5}[1]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${v5}[2]
   Input Text   ${u6}   ${EMPTY}
   Input Text   ${u5}   ${v5}[1]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${v5}[3]
   Input Text   ${u6}   ${EMPTY}
   Input Text   ${u5}   ${v5}[1]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${v5}[3]
   Input Text   ${u6}   ${EMPTY}
   Input Text   ${u5}   ${v5}[1]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[0]
   Input Text   ${u5}   ${v5}[1]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[0]
   Input Text   ${u5}   ${v5}[1]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[1]
   Input Text   ${u5}   ${v5}[1]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[1]
   Input Text   ${u5}   ${v5}[1]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[2]
   Input Text   ${u5}   ${v5}[1]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[2]
   Input Text   ${u5}   ${v5}[1]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[3]
   Input Text   ${u5}   ${v5}[1]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[3]
   Input Text   ${u5}   ${v5}[1]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[4]
   Input Text   ${u5}   ${v5}[1]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[4]
   Input Text   ${u5}   ${v5}[1]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${v5-[v5, v6]}[0]
   Input Text   ${u6}   ${v6-[v5, v6]}[0]
   Input Text   ${u5}   ${v5}[2]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${v5-[v5, v6]}[0]
   Input Text   ${u6}   ${v6-[v5, v6]}[0]
   Input Text   ${u5}   ${v5}[2]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${v5-[v5, v6]}[1]
   Input Text   ${u6}   ${v6-[v5, v6]}[1]
   Input Text   ${u5}   ${v5}[2]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${v5-[v5, v6]}[1]
   Input Text   ${u6}   ${v6-[v5, v6]}[1]
   Input Text   ${u5}   ${v5}[2]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${v5}[0]
   Input Text   ${u6}   ${EMPTY}
   Input Text   ${u5}   ${v5}[2]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${v5}[0]
   Input Text   ${u6}   ${EMPTY}
   Input Text   ${u5}   ${v5}[2]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${v5}[1]
   Input Text   ${u6}   ${EMPTY}
   Input Text   ${u5}   ${v5}[2]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${v5}[1]
   Input Text   ${u6}   ${EMPTY}
   Input Text   ${u5}   ${v5}[2]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${v5}[2]
   Input Text   ${u6}   ${EMPTY}
   Input Text   ${u5}   ${v5}[2]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${v5}[2]
   Input Text   ${u6}   ${EMPTY}
   Input Text   ${u5}   ${v5}[2]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${v5}[3]
   Input Text   ${u6}   ${EMPTY}
   Input Text   ${u5}   ${v5}[2]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${v5}[3]
   Input Text   ${u6}   ${EMPTY}
   Input Text   ${u5}   ${v5}[2]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[0]
   Input Text   ${u5}   ${v5}[2]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[0]
   Input Text   ${u5}   ${v5}[2]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[1]
   Input Text   ${u5}   ${v5}[2]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[1]
   Input Text   ${u5}   ${v5}[2]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[2]
   Input Text   ${u5}   ${v5}[2]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[2]
   Input Text   ${u5}   ${v5}[2]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[3]
   Input Text   ${u5}   ${v5}[2]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[3]
   Input Text   ${u5}   ${v5}[2]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[4]
   Input Text   ${u5}   ${v5}[2]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[4]
   Input Text   ${u5}   ${v5}[2]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${v5-[v5, v6]}[0]
   Input Text   ${u6}   ${v6-[v5, v6]}[0]
   Input Text   ${u5}   ${v5}[3]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${v5-[v5, v6]}[0]
   Input Text   ${u6}   ${v6-[v5, v6]}[0]
   Input Text   ${u5}   ${v5}[3]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${v5-[v5, v6]}[1]
   Input Text   ${u6}   ${v6-[v5, v6]}[1]
   Input Text   ${u5}   ${v5}[3]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${v5-[v5, v6]}[1]
   Input Text   ${u6}   ${v6-[v5, v6]}[1]
   Input Text   ${u5}   ${v5}[3]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${v5}[0]
   Input Text   ${u6}   ${EMPTY}
   Input Text   ${u5}   ${v5}[3]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${v5}[0]
   Input Text   ${u6}   ${EMPTY}
   Input Text   ${u5}   ${v5}[3]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${v5}[1]
   Input Text   ${u6}   ${EMPTY}
   Input Text   ${u5}   ${v5}[3]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${v5}[1]
   Input Text   ${u6}   ${EMPTY}
   Input Text   ${u5}   ${v5}[3]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${v5}[2]
   Input Text   ${u6}   ${EMPTY}
   Input Text   ${u5}   ${v5}[3]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${v5}[2]
   Input Text   ${u6}   ${EMPTY}
   Input Text   ${u5}   ${v5}[3]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${v5}[3]
   Input Text   ${u6}   ${EMPTY}
   Input Text   ${u5}   ${v5}[3]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${v5}[3]
   Input Text   ${u6}   ${EMPTY}
   Input Text   ${u5}   ${v5}[3]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[0]
   Input Text   ${u5}   ${v5}[3]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[0]
   Input Text   ${u5}   ${v5}[3]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[1]
   Input Text   ${u5}   ${v5}[3]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[1]
   Input Text   ${u5}   ${v5}[3]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[2]
   Input Text   ${u5}   ${v5}[3]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[2]
   Input Text   ${u5}   ${v5}[3]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[3]
   Input Text   ${u5}   ${v5}[3]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[3]
   Input Text   ${u5}   ${v5}[3]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[0]
   Input Text   ${u2}   ${v2-[v1, v2]}[0]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[4]
   Input Text   ${u5}   ${v5}[3]
   Click Element   ${login}
   Close Browser
Valid-Test1
   Open Browser   https://demoqa.com/login   Edge
   Input Text   ${u1}   ${v1-[v1, v2]}[1]
   Input Text   ${u2}   ${v2-[v1, v2]}[1]
   Input Text   ${u5}   ${EMPTY}
   Input Text   ${u6}   ${v6}[4]
   Input Text   ${u5}   ${v5}[3]
   Click Element   ${login}
   Close Browser
