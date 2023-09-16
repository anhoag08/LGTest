; Autoexecute
    #NoEnv
    #SingleInstance force
return
#t::
    run cmd.exe
    WinWait, ahk_exe cmd.exe ; Wait for CMD to start
    Send c:{enter} ; Go to C drive
    Send cd C:\Users\Lenovo\Desktop\CODE PROJECTS\LGTest\hello-world\{enter} ; go to script's folder
    Send python test.py{enter}
return

#r::
    run cmd.exe
    WinWait, ahk_exe cmd.exe ; Wait for CMD to start
    Send c:{enter} ; Go to C drive
    Send cd C:\Users\Lenovo\Desktop\CODE PROJECTS\LGTest\hello-world\{enter} ; go to script's folder
    Send python res.py{enter}
return