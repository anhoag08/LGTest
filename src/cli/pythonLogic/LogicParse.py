# pythonScript.py
import sys
import json
from pyeda.boolalg.expr import *


# Receive arguments from TypeScript
args = sys.argv[1:]
arg1 = args[0]

e = expr(arg1);

# # Process arguments (replace this with your logic)
result_data = f'{e.to_dnf()}'

# e = expr("(a1 & (a2 | a3)) & ( B4 | c3 ) & (c1 | c2 | c4)")
# e.simplify()

# print(e.to_dnf());




# # Send the result back to TypeScript as JSON
print(result_data)
