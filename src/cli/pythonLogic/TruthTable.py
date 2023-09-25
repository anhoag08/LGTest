# pythonScript.py
import sys
import json
from pyeda.boolalg.expr import *


# Receive arguments from TypeScript
args = sys.argv[1:]
arg1 = args[0]

temp = expr(arg1)
e = expr(temp)

result_data = list(e.satisfy_all())

print(result_data)
