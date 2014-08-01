0100 mvi a, &h9F
0102 mov b, a
0103 lxi sp, &h1000
label:
0106 dcr a
0107 jnz label


