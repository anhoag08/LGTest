# pythonScript.py
import sys
import json
from pyeda.boolalg.expr import *
from pyeda.inter import *


# Receive arguments from TypeScript
args = sys.argv[1:]
arg1 = args[0]

e = expr(arg1)

result_data = expr2truthtable(e)

print(result_data)
