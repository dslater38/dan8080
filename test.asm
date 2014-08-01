0100 mvi a, &h9F
0102 mov b, a
0103 lxi sp, &h1000
label:
0104 dcr a
0105 jnz label


