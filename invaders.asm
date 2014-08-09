		
				ORG	0000h
		
0000	00 	.	L_0000	nop
0001	00 	.		nop
0002	00 	.		nop
0003	C3 18D4	CT.		jmp	L_18D4
0006	00 	.		nop
0007	00 	.		nop
0008	F5 	u		push	psw
0009	C5 	E		push	bc
000A	D5 	U		push	de
000B	E5 	e		push	hl
000C	C3 008C	C..		jmp	L_008C
000F	00 	.		nop
0010	F5 	u		push	psw
0011	C5 	E		push	bc
0012	D5 	U		push	de
0013	E5 	e		push	hl
0014	3E 80	>.		mvi	a,&H80
0016	32 2072	2r 		sta	&H2072
0019	21 20C0	!@ 		lxi	hl,&H20C0
001C	35 	5	L_001C	dcr	m
001D	CD 17CD	MM.		call	L_17CD
0020	DB 01	[.		in	&H01
0022	0F 	.		rrc
0023	DA 0067	Zg.		jc	L_0067
0026	3A 20EA	:j 		lda	&H20EA
0029	A7 	'		ana	a
002A	CA 0042	JB.		jz	L_0042
002D	3A 20EB	:k 		lda	&H20EB
0030	FE 99	~.		cmpi	&H99
0032	CA 003E	J>.		jz	L_003E
0035	C6 01	F.		adi	&H01
0037	27 	'		daa
0038	32 20EB	2k 		sta	&H20EB
003B	CD 1947	MG.		call	L_1947
003E	AF 	/	L_003E	xra	a
003F	32 20EA	2j 	L_003F	sta	&H20EA
0042	3A 20E9	:i 	L_0042	lda	&H20E9
0045	A7 	'		ana	a
0046	CA 0082	J..		jz	L_0082
0049	3A 20EF	:o 		lda	&H20EF
004C	A7 	'		ana	a
004D	C2 006F	Bo.		jnz	L_006F
0050	3A 20EB	:k 		lda	&H20EB
0053	A7 	'		ana	a
0054	C2 005D	B].		jnz	L_005D
0057	CD 0ABF	M?.		call	L_0ABF
005A	C3 0082	C..		jmp	L_0082
005D	3A 2093	:. 	L_005D	lda	&H2093
0060	A7 	'		ana	a
0061	C2 0082	B..		jnz	L_0082
0064	C3 0765	Ce.		jmp	L_0765
0067	3E 01	>.	L_0067	mvi	a,&H01
0069	32 20EA	2j 		sta	&H20EA
006C	C3 003F	C?.		jmp	L_003F
006F	CD 1740	M@.	L_006F	call	L_1740
0072	3A 2032	:2 	L_0072	lda	&H2032
0075	32 2080	2. 		sta	&H2080
0078	CD 0100	M..		call	L_0100
007B	CD 0248	MH.		call	L_0248
007E	CD 0913	M..		call	L_0913
0081	00 	.		nop
0082	E1 	a	L_0082	pop	hl
0083	D1 	Q		pop	de
0084	C1 	A		pop	bc
0085	F1 	q		pop	psw
0086	FB 	{		ei
0087	C9 	I		ret
0088	00 	.		nop
0089	00 	.		nop
008A	00 	.		nop
008B	00 	.		nop
008C	AF 	/	L_008C	xra	a
008D	32 2072	2r 		sta	&H2072
0090	3A 20E9	:i 		lda	&H20E9
0093	A7 	'		ana	a
0094	CA 0082	J..		jz	L_0082
0097	3A 20EF	:o 		lda	&H20EF
009A	A7 	'		ana	a
009B	C2 00A5	B%.		jnz	L_00A5
009E	3A 20C1	:A 		lda	&H20C1
00A1	0F 	.		rrc
00A2	D2 0082	R..		jnc	L_0082
00A5	21 2020	! .	L_00A5	lxi	hl,&H2020
00A8	CD 024B	MK.		call	L_024B
00AB	CD 0141	MA.		call	L_0141
00AE	C3 0082	C..		jmp	L_0082
00B1	CD 0886	M..	L_00B1	call	L_0886
00B4	E5 	e		push	hl
00B5	7E 	~		mov	a,m
00B6	23 	#		inx	hl
00B7	66 	f		mov	h,m
00B8	6F 	o		mov	l,a
00B9	22 2009	". 		shld	&H2009
00BC	22 200B	". 		shld	&H200B
00BF	E1 	a		pop	hl
00C0	2B 	+		dcx	hl
00C1	7E 	~		mov	a,m
00C2	FE 03	~.		cmpi	&H03
00C4	C2 00C8	BH.		jnz	L_00C8
00C7	3D 	=		dcr	a
00C8	32 2008	2. 	L_00C8	sta	&H2008
00CB	FE FE	~~		cmpi	&HFE
00CD	3E 00	>.		mvi	a,&H00
00CF	C2 00D3	BS.		jnz	L_00D3
00D2	3C 	<		inr	a
00D3	32 200D	2. 	L_00D3	sta	&H200D
00D6	C9 	I		ret
00D7	3E 02	>.	L_00D7	mvi	a,&H02
00D9	32 21FB	2{!		sta	&H21FB
00DC	32 22FB	2{"		sta	&H22FB
00DF	C3 08E4	Cd.		jmp	L_08E4
00E2	00 	.		nop
00E3	00 	.		nop
00E4	00 	.		nop
00E5	00 	.		nop
00E6	00 	.		nop
00E7	00 	.		nop
00E8	00 	.		nop
00E9	00 	.		nop
00EA	00 	.		nop
00EB	00 	.		nop
00EC	00 	.		nop
00ED	00 	.		nop
00EE	00 	.		nop
00EF	00 	.		nop
00F0	00 	.		nop
00F1	00 	.		nop
00F2	00 	.		nop
00F3	00 	.		nop
00F4	00 	.		nop
00F5	00 	.		nop
00F6	00 	.		nop
00F7	00 	.		nop
00F8	00 	.		nop
00F9	00 	.		nop
00FA	00 	.		nop
00FB	00 	.		nop
00FC	00 	.		nop
00FD	00 	.		nop
00FE	00 	.		nop
00FF	00 	.		nop
0100	21 2002	!..	L_0100	lxi	hl,&H2002
0103	7E 	~		mov	a,m
0104	A7 	'		ana	a
0105	C2 1538	B8.		jnz	L_1538
0108	E5 	e		push	hl
0109	3A 2006	:. 		lda	&H2006
010C	6F 	o		mov	l,a
010D	3A 2067	:g 		lda	&H2067
0110	67 	g		mov	h,a
0111	7E 	~		mov	a,m
0112	A7 	'		ana	a
0113	E1 	a		pop	hl
0114	CA 0136	J6.		jz	L_0136
0117	23 	#		inx	hl
0118	23 	#		inx	hl
0119	7E 	~		mov	a,m
011A	23 	#		inx	hl
011B	46 	F		mov	b,m
011C	E6 FE	f~		ani	&HFE
011E	07 	.		rlc
011F	07 	.		rlc
0120	07 	.		rlc
0121	5F 	_		mov	e,a
0122	16 00	..		mvi	d,&H00
0124	21 1C00	!.~		lxi	hl,&H1C00
0127	19 	.		dad	de
0128	EB 	k		xchg
0129	78 	x		mov	a,b
012A	A7 	'		ana	a
012B	C4 013B	D;.		cnz	L_013B
012E	2A 200B	*. 		lhld	&H200B
0131	06 10	..		mvi	b,&H10
0133	CD 15D3	MS.		call	L_15D3
0136	AF 	/	L_0136	xra	a
0137	32 2000	2. 		sta	L_2000
013A	C9 	I		ret
013B	21 0030	!0 	L_013B	lxi	hl,&H0030
013E	19 	.		dad	de
013F	EB 	k		xchg
0140	C9 	I		ret
0141	3A 2068	:h 	L_0141	lda	&H2068
0144	A7 	'		ana	a
0145	C8 	H		rz
0146	3A 2000	:. 		lda	L_2000
0149	A7 	'		ana	a
014A	C0 	@		rnz
014B	3A 2067	:g 		lda	&H2067
014E	67 	g		mov	h,a
014F	3A 2006	:. 		lda	&H2006
0152	16 02	..		mvi	d,&H02
0154	3C 	<	L_0154	inr	a
0155	FE 37	~7		cmpi	&H37
0157	CC 01A1	L!.		cz	L_01A1
015A	6F 	o		mov	l,a
015B	46 	F		mov	b,m
015C	05 	.		dcr	b
015D	C2 0154	BT.		jnz	L_0154
0160	32 2006	2. 		sta	&H2006
0163	CD 017A	Mz.		call	L_017A
0166	61 	a		mov	h,c
0167	22 200B	". 		shld	&H200B
016A	7D 	}		mov	a,l
016B	FE 28	~(		cmpi	&H28
016D	DA 1971	Zq.		jc	L_1971
0170	7A 	z		mov	a,d
0171	32 2004	2. 		sta	&H2004
0174	3E 01	>.		mvi	a,&H01
0176	32 2000	2. 		sta	L_2000
0179	C9 	I		ret
017A	16 00	..	L_017A	mvi	d,&H00
017C	7D 	}		mov	a,l
017D	21 2009	!. 		lxi	hl,&H2009
0180	46 	F		mov	b,m
0181	23 	#		inx	hl
0182	4E 	N		mov	c,m
0183	FE 0B	~.	L_0183	cmpi	&H0B
0185	FA 0194	z..		jm	L_0194
0188	DE 0B	^.		sbi	&H0B
018A	5F 	_		mov	e,a
018B	78 	x		mov	a,b
018C	C6 10	F.		adi	&H10
018E	47 	G		mov	b,a
018F	7B 	{		mov	a,e
0190	14 	.		inr	d
0191	C3 0183	C..		jmp	L_0183
0194	68 	h	L_0194	mov	l,b
0195	A7 	'	L_0195	ana	a
0196	C8 	H		rz
0197	5F 	_		mov	e,a
0198	79 	y		mov	a,c
0199	C6 10	F.		adi	&H10
019B	4F 	O		mov	c,a
019C	7B 	{		mov	a,e
019D	3D 	=		dcr	a
019E	C3 0195	C..		jmp	L_0195
01A1	15 	.	L_01A1	dcr	d
01A2	CA 01CD	JM.		jz	L_01CD
01A5	21 2006	!..		lxi	hl,&H2006
01A8	36 00	6.		mvi	m,&H00
01AA	23 	#		inx	hl
01AB	4E 	N		mov	c,m
01AC	36 00	6.		mvi	m,&H00
01AE	CD 01D9	MY.		call	L_01D9
01B1	21 2005	!..		lxi	hl,&H2005
01B4	7E 	~		mov	a,m
01B5	3C 	<		inr	a
01B6	E6 01	f.		ani	&H01
01B8	77 	w		mov	m,a
01B9	AF 	/		xra	a
01BA	21 2067	!g.		lxi	hl,&H2067
01BD	66 	f		mov	h,m
01BE	C9 	I		ret
01BF	00 	.		nop
01C0	21 2100	!..	L_01C0	lxi	hl,&H2100
01C3	06 37	.7	L_01C3	mvi	b,&H37
01C5	36 01	6.	L_01C5	mvi	m,&H01
01C7	23 	#		inx	hl
01C8	05 	.		dcr	b
01C9	C2 01C5	BE.		jnz	L_01C5
01CC	C9 	I		ret
01CD	E1 	a	L_01CD	pop	hl
01CE	C9 	I		ret
01CF	3E 01	>.	L_01CF	mvi	a,&H01
01D1	06 E0	.`		mvi	b,&HE0
01D3	21 2402	!..		lxi	hl,&H2402
01D6	C3 14CC	CL.		jmp	L_14CC
01D9	23 	#	L_01D9	inx	hl
01DA	46 	F		mov	b,m
01DB	23 	#		inx	hl
01DC	79 	y		mov	a,c
01DD	86 	.		add	m
01DE	77 	w		mov	m,a
01DF	23 	#		inx	hl
01E0	78 	x		mov	a,b
01E1	86 	.		add	m
01E2	77 	w		mov	m,a
01E3	C9 	I		ret
01E4	06 C0	.@	L_01E4	mvi	b,&HC0
01E6	11 1B00	...	L_01E6	lxi	de,&H1B00
01E9	21 2000	!..		lxi	hl,&H2000
01EC	C3 1A32	C2.		jmp	L_1A32
01EF	21 2142	!B.	L_01EF	lxi	hl,&H2142
01F2	C3 01F8	Cx.		jmp	L_01F8
01F5	21 2242	!B.	L_01F5	lxi	hl,&H2242
01F8	0E 04	..	L_01F8	mvi	c,&H04
01FA	11 1D20	. .		lxi	de,&H1D20
01FD	D5 	U	L_01FD	push	de
01FE	06 2C	.,		mvi	b,&H2C
0200	CD 1A32	M2.		call	L_1A32
0203	D1 	Q		pop	de
0204	0D 	.		dcr	c
0205	C2 01FD	B}.		jnz	L_01FD
0208	C9 	I		ret
0209	3E 01	>.	L_0209	mvi	a,&H01
020B	C3 021B	C..		jmp	L_021B
020E	3E 01	>.	L_020E	mvi	a,&H01
0210	C3 0214	C..		jmp	L_0214
0213	AF 	/	L_0213	xra	a
0214	11 2242	.B.	L_0214	lxi	de,&H2242
0217	C3 021E	C..		jmp	L_021E
021A	AF 	/	L_021A	xra	a
021B	11 2142	.B.	L_021B	lxi	de,&H2142
021E	32 2081	2. 	L_021E	sta	&H2081
0221	01 1602	.. 		lxi	bc,&H1602
0224	21 2806	!. 		lxi	hl,&H2806
0227	3E 04	>.		mvi	a,&H04
0229	F5 	u	L_0229	push	psw
022A	C5 	E		push	bc
022B	3A 2081	:. 		lda	&H2081
022E	A7 	'		ana	a
022F	C2 0242	BB.		jnz	L_0242
0232	CD 1A69	Mi.		call	L_1A69
0235	C1 	A	L_0235	pop	bc
0236	F1 	q		pop	psw
0237	3D 	=		dcr	a
0238	C8 	H		rz
0239	D5 	U		push	de
023A	11 02E0	.`.		lxi	de,&H02E0
023D	19 	.		dad	de
023E	D1 	Q		pop	de
023F	C3 0229	C).		jmp	L_0229
0242	CD 147C	M|.	L_0242	call	L_147C
0245	C3 0235	C5.		jmp	L_0235
0248	21 2010	!..	L_0248	lxi	hl,&H2010
024B	7E 	~	L_024B	mov	a,m
024C	FE FF	~.		cmpi	&HFF
024E	C8 	H		rz
024F	FE FE	~~		cmpi	&HFE
0251	CA 0281	J..		jz	L_0281
0254	23 	#		inx	hl
0255	46 	F		mov	b,m
0256	4F 	O		mov	c,a
0257	B0 	0		ora	b
0258	79 	y		mov	a,c
0259	C2 0277	Bw.		jnz	L_0277
025C	23 	#		inx	hl
025D	7E 	~		mov	a,m
025E	A7 	'		ana	a
025F	C2 0288	B..		jnz	L_0288
0262	23 	#		inx	hl
0263	5E 	^		mov	e,m
0264	23 	#		inx	hl
0265	56 	V		mov	d,m
0266	E5 	e		push	hl
0267	EB 	k		xchg
0268	E5 	e		push	hl
0269	21 026F	!o.		lxi	hl,&H026F
026C	E3 	c		xthl
026D	D5 	U		push	de
026E	E9 	i		pchl
026F	E1 	a		pop	hl
0270	11 000C	...		lxi	de,&H000C
0273	19 	.		dad	de
0274	C3 024B	CK.		jmp	L_024B
0277	05 	.	L_0277	dcr	b
0278	04 	.		inr	b
0279	C2 027D	B}.		jnz	L_027D
027C	3D 	=		dcr	a
027D	05 	.	L_027D	dcr	b
027E	70 	p		mov	m,b
027F	2B 	+		dcx	hl
0280	77 	w		mov	m,a
0281	11 0010	...	L_0281	lxi	de,&H0010
0284	19 	.		dad	de
0285	C3 024B	CK.		jmp	L_024B
0288	35 	5	L_0288	dcr	m
0289	2B 	+		dcx	hl
028A	2B 	+		dcx	hl
028B	C3 0281	C..		jmp	L_0281
028E	E1 	a		pop	hl
028F	23 	#		inx	hl
0290	7E 	~		mov	a,m
0291	FE FF	~.		cmpi	&HFF
0293	CA 033B	J;.		jz	L_033B
0296	23 	#		inx	hl
0297	35 	5		dcr	m
0298	C0 	@		rnz
0299	47 	G		mov	b,a
029A	AF 	/		xra	a
029B	32 2068	2h 		sta	&H2068
029E	32 2069	2i 		sta	&H2069
02A1	3E 30	>0		mvi	a,&H30
02A3	32 206A	2j 		sta	&H206A
02A6	78 	x		mov	a,b
02A7	36 05	6.		mvi	m,&H05
02A9	23 	#		inx	hl
02AA	35 	5		dcr	m
02AB	C2 039B	B..		jnz	L_039B
02AE	2A 201A	*. 		lhld	&H201A
02B1	06 10	..		mvi	b,&H10
02B3	CD 1424	M$.		call	L_1424
02B6	21 2010	!..		lxi	hl,&H2010
02B9	11 1B10	...		lxi	de,&H1B10
02BC	06 10	..		mvi	b,&H10
02BE	CD 1A32	M2.		call	L_1A32
02C1	06 00	..		mvi	b,&H00
02C3	CD 19DC	M\.		call	L_19DC
02C6	3A 206D	:m 		lda	&H206D
02C9	A7 	'		ana	a
02CA	C0 	@		rnz
02CB	3A 20EF	:o 		lda	&H20EF
02CE	A7 	'		ana	a
02CF	C8 	H		rz
02D0	31 2400	1. 		lxi	sp,&H2400
02D3	FB 	{		ei
02D4	CD 19D7	MW.		call	L_19D7
02D7	CD 092E	M..		call	L_092E
02DA	A7 	'		ana	a
02DB	CA 166D	Jm.		jz	L_166D
02DE	CD 18E7	Mg.		call	L_18E7
02E1	7E 	~		mov	a,m
02E2	A7 	'		ana	a
02E3	CA 032C	J,.		jz	L_032C
02E6	3A 20CE	:N 		lda	&H20CE
02E9	A7 	'		ana	a
02EA	CA 032C	J,.		jz	L_032C
02ED	3A 2067	:g 	L_02ED	lda	&H2067
02F0	F5 	u		push	psw
02F1	0F 	.		rrc
02F2	DA 0332	Z2.		jc	L_0332
02F5	CD 020E	M..		call	L_020E
02F8	CD 0878	Mx.	L_02F8	call	L_0878
02FB	73 	s		mov	m,e
02FC	23 	#		inx	hl
02FD	72 	r		mov	m,d
02FE	2B 	+		dcx	hl
02FF	2B 	+		dcx	hl
0300	70 	p		mov	m,b
0301	00 	.		nop
0302	CD 01E4	Md.		call	L_01E4
0305	F1 	q		pop	psw
0306	0F 	.		rrc
0307	3E 21	>!		mvi	a,&H21
0309	06 00	..		mvi	b,&H00
030B	D2 0312	R..		jnc	L_0312
030E	06 20	. 		mvi	b,&H20
0310	3E 22	>"		mvi	a,&H22
0312	32 2067	2g 	L_0312	sta	&H2067
0315	CD 0AB6	M6.		call	L_0AB6
0318	AF 	/		xra	a
0319	32 2011	2. 		sta	&H2011
031C	78 	x		mov	a,b
031D	D3 05	S.		out	&H05
031F	3C 	<		inr	a
0320	32 2098	2. 		sta	&H2098
0323	CD 09D6	MV.		call	L_09D6
0326	CD 1A7F	M..		call	L_1A7F
0329	C3 07F9	Cy.		jmp	L_07F9
032C	CD 1A7F	M..	L_032C	call	L_1A7F
032F	C3 0817	C..		jmp	L_0817
0332	CD 0209	M..	L_0332	call	L_0209
0335	C3 02F8	Cx.		jmp	L_02F8
0338	00 	.		nop
0339	00 	.		nop
033A	00 	.		nop
033B	21 2068	!h.	L_033B	lxi	hl,&H2068
033E	36 01	6.		mvi	m,&H01
0340	23 	#		inx	hl
0341	7E 	~		mov	a,m
0342	A7 	'		ana	a
0343	C3 03B0	C0.		jmp	L_03B0
0346	00 	.	L_0346	nop
0347	2B 	+		dcx	hl
0348	36 01	6.		mvi	m,&H01
034A	3A 201B	:. 	L_034A	lda	&H201B
034D	47 	G		mov	b,a
034E	3A 20EF	:o 		lda	&H20EF
0351	A7 	'		ana	a
0352	C2 0363	Bc.		jnz	L_0363
0355	3A 201D	:. 		lda	&H201D
0358	0F 	.		rrc
0359	DA 0381	Z..		jc	L_0381
035C	0F 	.		rrc
035D	DA 038E	Z..		jc	L_038E
0360	C3 036F	Co.		jmp	L_036F
0363	CD 17C0	M@.	L_0363	call	L_17C0
0366	07 	.		rlc
0367	07 	.		rlc
0368	DA 0381	Z..		jc	L_0381
036B	07 	.		rlc
036C	DA 038E	Z..		jc	L_038E
036F	21 2018	!..	L_036F	lxi	hl,&H2018
0372	CD 1A3B	M;.		call	L_1A3B
0375	CD 1A47	MG.		call	L_1A47
0378	CD 1439	M9.		call	L_1439
037B	3E 00	>.		mvi	a,&H00
037D	32 2012	2. 		sta	&H2012
0380	C9 	I		ret
0381	78 	x	L_0381	mov	a,b
0382	FE D9	~Y		cmpi	&HD9
0384	CA 036F	Jo.		jz	L_036F
0387	3C 	<		inr	a
0388	32 201B	2. 		sta	&H201B
038B	C3 036F	Co.		jmp	L_036F
038E	78 	x	L_038E	mov	a,b
038F	FE 30	~0		cmpi	&H30
0391	CA 036F	Jo.		jz	L_036F
0394	3D 	=		dcr	a
0395	32 201B	2. 		sta	&H201B
0398	C3 036F	Co.		jmp	L_036F
039B	3C 	<	L_039B	inr	a
039C	E6 01	f.		ani	&H01
039E	32 2015	2. 		sta	&H2015
03A1	07 	.		rlc
03A2	07 	.		rlc
03A3	07 	.		rlc
03A4	07 	.		rlc
03A5	21 1C70	!p 		lxi	hl,&H1C70
03A8	85 	.		add	l
03A9	6F 	o		mov	l,a
03AA	22 2018	". 		shld	&H2018
03AD	C3 036F	Co.		jmp	L_036F
03B0	C2 034A	BJ.	L_03B0	jnz	L_034A
03B3	23 	#		inx	hl
03B4	35 	5		dcr	m
03B5	C2 034A	BJ.		jnz	L_034A
03B8	C3 0346	CF.		jmp	L_0346
03BB	11 202A	.*.		lxi	de,&H202A
03BE	CD 1A06	M..		call	L_1A06
03C1	E1 	a		pop	hl
03C2	D0 	P		rnc
03C3	23 	#		inx	hl
03C4	7E 	~		mov	a,m
03C5	A7 	'		ana	a
03C6	C8 	H		rz
03C7	FE 01	~.		cmpi	&H01
03C9	CA 03FA	Jz.		jz	L_03FA
03CC	FE 02	~.		cmpi	&H02
03CE	CA 040A	J..		jz	L_040A
03D1	23 	#		inx	hl
03D2	FE 03	~.		cmpi	&H03
03D4	C2 042A	B*.		jnz	L_042A
03D7	35 	5		dcr	m
03D8	CA 0436	J6.		jz	L_0436
03DB	7E 	~		mov	a,m
03DC	FE 0F	~.		cmpi	&H0F
03DE	C0 	@		rnz
03DF	E5 	e		push	hl
03E0	CD 0430	M0.		call	L_0430
03E3	CD 1452	MR.		call	L_1452
03E6	E1 	a		pop	hl
03E7	23 	#		inx	hl
03E8	34 	4		inr	m
03E9	23 	#		inx	hl
03EA	23 	#		inx	hl
03EB	35 	5		dcr	m
03EC	35 	5		dcr	m
03ED	23 	#		inx	hl
03EE	35 	5		dcr	m
03EF	35 	5		dcr	m
03F0	35 	5		dcr	m
03F1	23 	#		inx	hl
03F2	36 08	6.		mvi	m,&H08
03F4	CD 0430	M0.		call	L_0430
03F7	C3 1400	C..		jmp	L_1400
03FA	3C 	<	L_03FA	inr	a
03FB	77 	w		mov	m,a
03FC	3A 201B	:. 		lda	&H201B
03FF	C6 08	F.		adi	&H08
0401	32 202A	2* 		sta	&H202A
0404	CD 0430	M0.		call	L_0430
0407	C3 1400	C..		jmp	L_1400
040A	CD 0430	M0.	L_040A	call	L_0430
040D	D5 	U		push	de
040E	E5 	e		push	hl
040F	C5 	E		push	bc
0410	CD 1452	MR.		call	L_1452
0413	C1 	A		pop	bc
0414	E1 	a		pop	hl
0415	D1 	Q		pop	de
0416	3A 202C	:, 		lda	&H202C
0419	85 	.		add	l
041A	6F 	o		mov	l,a
041B	32 2029	2) 		sta	&H2029
041E	CD 1491	M..		call	L_1491
0421	3A 2061	:a 		lda	&H2061
0424	A7 	'		ana	a
0425	C8 	H		rz
0426	32 2002	2. 		sta	&H2002
0429	C9 	I		ret
042A	FE 05	~.	L_042A	cmpi	&H05
042C	C8 	H		rz
042D	C3 0436	C6.		jmp	L_0436
0430	21 2027	!'.	L_0430	lxi	hl,&H2027
0433	C3 1A3B	C;.		jmp	L_1A3B
0436	CD 0430	M0.	L_0436	call	L_0430
0439	CD 1452	MR.		call	L_1452
043C	21 2025	!%.		lxi	hl,&H2025
043F	11 1B25	.%.		lxi	de,&H1B25
0442	06 07	..		mvi	b,&H07
0444	CD 1A32	M2.		call	L_1A32
0447	2A 208D	*. 		lhld	&H208D
044A	2C 	,		inr	l
044B	7D 	}		mov	a,l
044C	FE 63	~c		cmpi	&H63
044E	DA 0453	ZS.		jc	L_0453
0451	2E 54	.T		mvi	l,&H54
0453	22 208D	". 	L_0453	shld	&H208D
0456	2A 208F	*. 		lhld	&H208F
0459	2C 	,		inr	l
045A	22 208F	". 		shld	&H208F
045D	3A 2084	:. 		lda	&H2084
0460	A7 	'		ana	a
0461	C0 	@		rnz
0462	7E 	~		mov	a,m
0463	E6 01	f.		ani	&H01
0465	01 0229	.).		lxi	bc,&H0229
0468	C2 046E	Bn.		jnz	L_046E
046B	01 FEE0	.`.		lxi	bc,&HFEE0
046E	21 208A	!..	L_046E	lxi	hl,&H208A
0471	71 	q		mov	m,c
0472	23 	#		inx	hl
0473	23 	#		inx	hl
0474	70 	p		mov	m,b
0475	C9 	I		ret
0476	E1 	a		pop	hl
0477	3A 1B32	:2.		lda	L_1B32
047A	32 2032	22 		sta	&H2032
047D	2A 2038	*8 		lhld	&H2038
0480	7D 	}		mov	a,l
0481	B4 	4		ora	h
0482	C2 048A	B..		jnz	L_048A
0485	2B 	+		dcx	hl
0486	22 2038	"8 		shld	&H2038
0489	C9 	I		ret
048A	11 2035	.5 	L_048A	lxi	de,&H2035
048D	3E F9	>y		mvi	a,&HF9
048F	CD 0550	MP.		call	L_0550
0492	3A 2046	:F 		lda	&H2046
0495	32 2070	2p 		sta	&H2070
0498	3A 2056	:V 		lda	&H2056
049B	32 2071	2q 		sta	&H2071
049E	CD 0563	Mc.		call	L_0563
04A1	3A 2078	:x 		lda	&H2078
04A4	A7 	'		ana	a
04A5	21 2035	!5 		lxi	hl,&H2035
04A8	C2 055B	B[.		jnz	L_055B
04AB	11 1B30	.0.		lxi	de,&H1B30
04AE	21 2030	!0.		lxi	hl,&H2030
04B1	06 10	..		mvi	b,&H10
04B3	C3 1A32	C2.		jmp	L_1A32
04B6	E1 	a		pop	hl
04B7	3A 206E	:n 		lda	&H206E
04BA	A7 	'		ana	a
04BB	C0 	@		rnz
04BC	3A 2080	:. 		lda	&H2080
04BF	FE 01	~.		cmpi	&H01
04C1	C0 	@		rnz
04C2	11 2045	.E.		lxi	de,&H2045
04C5	3E ED	>m		mvi	a,&HED
04C7	CD 0550	MP.		call	L_0550
04CA	3A 2036	:6 		lda	&H2036
04CD	32 2070	2p 		sta	&H2070
04D0	3A 2056	:V 		lda	&H2056
04D3	32 2071	2q 		sta	&H2071
04D6	CD 0563	Mc.		call	L_0563
04D9	3A 2076	:v 		lda	&H2076
04DC	FE 10	~.		cmpi	&H10
04DE	DA 04E7	Zg.		jc	L_04E7
04E1	3A 1B48	:H.		lda	&H1B48
04E4	32 2076	2v 		sta	&H2076
04E7	3A 2078	:x 	L_04E7	lda	&H2078
04EA	A7 	'		ana	a
04EB	21 2045	!E 		lxi	hl,&H2045
04EE	C2 055B	B[.		jnz	L_055B
04F1	11 1B40	.@.		lxi	de,&H1B40
04F4	21 2040	!@.		lxi	hl,&H2040
04F7	06 10	..		mvi	b,&H10
04F9	CD 1A32	M2.		call	L_1A32
04FC	3A 2082	:. 		lda	&H2082
04FF	3D 	=		dcr	a
0500	C2 0508	B..		jnz	L_0508
0503	3E 01	>.		mvi	a,&H01
0505	32 206E	2n 		sta	&H206E
0508	2A 2076	*v 	L_0508	lhld	&H2076
050B	C3 067E	C~.		jmp	L_067E
050E	E1 	a		pop	hl
050F	11 2055	.U.	L_050F	lxi	de,&H2055
0512	3E DB	>[		mvi	a,&HDB
0514	CD 0550	MP.		call	L_0550
0517	3A 2046	:F 		lda	&H2046
051A	32 2070	2p 		sta	&H2070
051D	3A 2036	:6 		lda	&H2036
0520	32 2071	2q 		sta	&H2071
0523	CD 0563	Mc.		call	L_0563
0526	3A 2076	:v 		lda	&H2076
0529	FE 15	~.		cmpi	&H15
052B	DA 0534	Z4.		jc	L_0534
052E	3A 1B58	:X.		lda	&H1B58
0531	32 2076	2v 		sta	&H2076
0534	3A 2078	:x 	L_0534	lda	&H2078
0537	A7 	'		ana	a
0538	21 2055	!U 		lxi	hl,&H2055
053B	C2 055B	B[.		jnz	L_055B
053E	11 1B50	.P.		lxi	de,&H1B50
0541	21 2050	!P.		lxi	hl,&H2050
0544	06 10	..		mvi	b,&H10
0546	CD 1A32	M2.		call	L_1A32
0549	2A 2076	*v 		lhld	&H2076
054C	22 2058	"X 		shld	&H2058
054F	C9 	I		ret
0550	32 207F	2. 	L_0550	sta	&H207F
0553	21 2073	!s 		lxi	hl,&H2073
0556	06 0B	..		mvi	b,&H0B
0558	C3 1A32	C2.		jmp	L_1A32
055B	11 2073	.s.	L_055B	lxi	de,&H2073
055E	06 0B	..		mvi	b,&H0B
0560	C3 1A32	C2.		jmp	L_1A32
0563	21 2073	!s.	L_0563	lxi	hl,&H2073
0566	7E 	~		mov	a,m
0567	E6 80	f.		ani	&H80
0569	C2 05C1	BA.		jnz	L_05C1
056C	3A 20C1	:A 		lda	&H20C1
056F	FE 04	~.		cmpi	&H04
0571	3A 2069	:i 		lda	&H2069
0574	CA 05B7	J7.		jz	L_05B7
0577	A7 	'		ana	a
0578	C8 	H		rz
0579	23 	#		inx	hl
057A	36 00	6.		mvi	m,&H00
057C	3A 2070	:p 		lda	&H2070
057F	A7 	'		ana	a
0580	CA 0589	J..		jz	L_0589
0583	47 	G		mov	b,a
0584	3A 20CF	:O 		lda	&H20CF
0587	B8 	8		cmp	b
0588	D0 	P		rnc
0589	3A 2071	:q 	L_0589	lda	&H2071
058C	A7 	'		ana	a
058D	CA 0596	J..		jz	L_0596
0590	47 	G		mov	b,a
0591	3A 20CF	:O 		lda	&H20CF
0594	B8 	8		cmp	b
0595	D0 	P		rnc
0596	23 	#	L_0596	inx	hl
0597	7E 	~		mov	a,m
0598	A7 	'		ana	a
0599	CA 061B	J..		jz	L_061B
059C	2A 2076	*v 		lhld	&H2076
059F	4E 	N		mov	c,m
05A0	23 	#		inx	hl
05A1	00 	.		nop
05A2	22 2076	"v 		shld	&H2076
05A5	CD 062F	M/.	L_05A5	call	L_062F
05A8	D0 	P		rnc
05A9	CD 017A	Mz.		call	L_017A
05AC	79 	y		mov	a,c
05AD	C6 07	F.		adi	&H07
05AF	67 	g		mov	h,a
05B0	7D 	}		mov	a,l
05B1	D6 0A	V.		sui	&H0A
05B3	6F 	o		mov	l,a
05B4	22 207B	"{ 		shld	&H207B
05B7	21 2073	!s 	L_05B7	lxi	hl,&H2073
05BA	7E 	~		mov	a,m
05BB	F6 80	v.		ori	&H80
05BD	77 	w		mov	m,a
05BE	23 	#		inx	hl
05BF	34 	4		inr	m
05C0	C9 	I		ret
05C1	11 207C	.|.	L_05C1	lxi	de,&H207C
05C4	CD 1A06	M..		call	L_1A06
05C7	D0 	P		rnc
05C8	23 	#		inx	hl
05C9	7E 	~		mov	a,m
05CA	E6 01	f.		ani	&H01
05CC	C2 0644	BD.		jnz	L_0644
05CF	23 	#		inx	hl
05D0	34 	4		inr	m
05D1	CD 0675	Mu.		call	L_0675
05D4	3A 2079	:y 		lda	&H2079
05D7	C6 03	F.		adi	&H03
05D9	21 207F	!..		lxi	hl,&H207F
05DC	BE 	>		cmp	m
05DD	DA 05E2	Zb.		jc	L_05E2
05E0	D6 0C	V.		sui	&H0C
05E2	32 2079	2y 	L_05E2	sta	&H2079
05E5	3A 207B	:{ 		lda	&H207B
05E8	47 	G		mov	b,a
05E9	3A 207E	:~ 		lda	&H207E
05EC	80 	.		add	b
05ED	32 207B	2{ 		sta	&H207B
05F0	CD 066C	Ml.		call	L_066C
05F3	3A 207B	:{ 		lda	&H207B
05F6	FE 15	~.		cmpi	&H15
05F8	DA 0612	Z..		jc	L_0612
05FB	3A 2061	:a 		lda	&H2061
05FE	A7 	'		ana	a
05FF	C8 	H		rz
0600	3A 207B	:{ 		lda	&H207B
0603	FE 1E	~.		cmpi	&H1E
0605	DA 0612	Z..		jc	L_0612
0608	FE 27	~'		cmpi	&H27
060A	00 	.		nop
060B	D2 0612	R..		jnc	L_0612
060E	97 	.		sub	a
060F	32 2015	2. 		sta	&H2015
0612	3A 2073	:s 	L_0612	lda	&H2073
0615	F6 01	v.		ori	&H01
0617	32 2073	2s 		sta	&H2073
061A	C9 	I		ret
061B	3A 201B	:. 	L_061B	lda	&H201B
061E	C6 08	F.		adi	&H08
0620	67 	g		mov	h,a
0621	CD 156F	Mo.		call	L_156F
0624	79 	y		mov	a,c
0625	FE 0C	~.		cmpi	&H0C
0627	DA 05A5	Z%.		jc	L_05A5
062A	0E 0B	..		mvi	c,&H0B
062C	C3 05A5	C%.		jmp	L_05A5
062F	0D 	.	L_062F	dcr	c
0630	3A 2067	:g 		lda	&H2067
0633	67 	g		mov	h,a
0634	69 	i		mov	l,c
0635	16 05	..		mvi	d,&H05
0637	7E 	~	L_0637	mov	a,m
0638	A7 	'		ana	a
0639	37 	7		stc
063A	C0 	@		rnz
063B	7D 	}		mov	a,l
063C	C6 0B	F.		adi	&H0B
063E	6F 	o		mov	l,a
063F	15 	.		dcr	d
0640	C2 0637	B7.		jnz	L_0637
0643	C9 	I		ret
0644	21 2078	!x.	L_0644	lxi	hl,&H2078
0647	35 	5		dcr	m
0648	7E 	~		mov	a,m
0649	FE 03	~.		cmpi	&H03
064B	C2 0667	Bg.		jnz	L_0667
064E	CD 0675	Mu.		call	L_0675
0651	21 1CDC	!\.		lxi	hl,&H1CDC
0654	22 2079	"y 		shld	&H2079
0657	21 207C	!| 		lxi	hl,&H207C
065A	35 	5		dcr	m
065B	35 	5		dcr	m
065C	2B 	+		dcx	hl
065D	35 	5		dcr	m
065E	35 	5		dcr	m
065F	3E 06	>.		mvi	a,&H06
0661	32 207D	2} 		sta	&H207D
0664	C3 066C	Cl.		jmp	L_066C
0667	A7 	'	L_0667	ana	a
0668	C0 	@		rnz
0669	C3 0675	Cu.		jmp	L_0675
066C	21 2079	!y.	L_066C	lxi	hl,&H2079
066F	CD 1A3B	M;.		call	L_1A3B
0672	C3 1491	C..		jmp	L_1491
0675	21 2079	!y.	L_0675	lxi	hl,&H2079
0678	CD 1A3B	M;.		call	L_1A3B
067B	C3 1452	CR.		jmp	L_1452
067E	22 2048	"H 	L_067E	shld	&H2048
0681	C9 	I		ret
0682	E1 	a		pop	hl
0683	3A 2080	:. 		lda	&H2080
0686	FE 02	~.		cmpi	&H02
0688	C0 	@		rnz
0689	21 2083	!..		lxi	hl,&H2083
068C	7E 	~		mov	a,m
068D	A7 	'		ana	a
068E	CA 050F	J..		jz	L_050F
0691	3A 2056	:V 		lda	&H2056
0694	A7 	'		ana	a
0695	C2 050F	B..		jnz	L_050F
0698	23 	#		inx	hl
0699	7E 	~		mov	a,m
069A	A7 	'		ana	a
069B	C2 06AB	B+.		jnz	L_06AB
069E	3A 2082	:. 		lda	&H2082
06A1	FE 08	~.		cmpi	&H08
06A3	DA 050F	Z..		jc	L_050F
06A6	36 01	6.		mvi	m,&H01
06A8	CD 073C	M<.		call	L_073C
06AB	11 208A	...	L_06AB	lxi	de,&H208A
06AE	CD 1A06	M..		call	L_1A06
06B1	D0 	P		rnc
06B2	21 2085	!..		lxi	hl,&H2085
06B5	7E 	~		mov	a,m
06B6	A7 	'		ana	a
06B7	C2 06D6	BV.		jnz	L_06D6
06BA	21 208A	!..		lxi	hl,&H208A
06BD	7E 	~		mov	a,m
06BE	23 	#		inx	hl
06BF	23 	#		inx	hl
06C0	86 	.		add	m
06C1	32 208A	2. 		sta	&H208A
06C4	CD 073C	M<.		call	L_073C
06C7	21 208A	!..		lxi	hl,&H208A
06CA	7E 	~		mov	a,m
06CB	FE 28	~(		cmpi	&H28
06CD	DA 06F9	Zy.		jc	L_06F9
06D0	FE E1	~a		cmpi	&HE1
06D2	D2 06F9	Ry.		jnc	L_06F9
06D5	C9 	I		ret
06D6	06 FE	.~	L_06D6	mvi	b,&HFE
06D8	CD 19DC	M\.		call	L_19DC
06DB	23 	#		inx	hl
06DC	35 	5		dcr	m
06DD	7E 	~		mov	a,m
06DE	FE 1F	~.		cmpi	&H1F
06E0	CA 074B	JK.		jz	L_074B
06E3	FE 18	~.		cmpi	&H18
06E5	CA 070C	J..		jz	L_070C
06E8	A7 	'		ana	a
06E9	C0 	@		rnz
06EA	06 EF	.o		mvi	b,&HEF
06EC	21 2098	!..		lxi	hl,&H2098
06EF	7E 	~		mov	a,m
06F0	A0 	 		ana	b
06F1	77 	w		mov	m,a
06F2	E6 20	f 		ani	&H20
06F4	D3 05	S.		out	&H05
06F6	00 	.		nop
06F7	00 	.		nop
06F8	00 	.		nop
06F9	CD 0742	MB.	L_06F9	call	L_0742
06FC	CD 14CB	MK.		call	L_14CB
06FF	21 2083	!..		lxi	hl,&H2083
0702	06 0A	..		mvi	b,&H0A
0704	CD 075F	M_.		call	L_075F
0707	06 FE	.~	L_0707	mvi	b,&HFE
0709	C3 19DC	C\.		jmp	L_19DC
070C	3E 01	>.	L_070C	mvi	a,&H01
070E	32 20F1	2q 		sta	&H20F1
0711	2A 208D	*. 		lhld	&H208D
0714	46 	F		mov	b,m
0715	0E 04	..		mvi	c,&H04
0717	21 1D50	!P 		lxi	hl,&H1D50
071A	11 1D4C	.L 		lxi	de,&H1D4C
071D	1A 	.	L_071D	ldax	de
071E	B8 	8		cmp	b
071F	CA 0728	J(.		jz	L_0728
0722	23 	#		inx	hl
0723	13 	.		inx	de
0724	0D 	.		dcr	c
0725	C2 071D	B..		jnz	L_071D
0728	7E 	~	L_0728	mov	a,m
0729	32 2087	2. 		sta	&H2087
072C	26 00	&.		mvi	h,&H00
072E	68 	h		mov	l,b
072F	29 	)		dad	hl
0730	29 	)		dad	hl
0731	29 	)		dad	hl
0732	29 	)		dad	hl
0733	22 20F2	"r 		shld	&H20F2
0736	CD 0742	MB.		call	L_0742
0739	C3 08F1	Cq.		jmp	L_08F1
073C	CD 0742	MB.	L_073C	call	L_0742
073F	C3 1439	C9.		jmp	L_1439
0742	21 2087	!..	L_0742	lxi	hl,&H2087
0745	CD 1A3B	M;.		call	L_1A3B
0748	C3 1A47	CG.		jmp	L_1A47
074B	06 10	..	L_074B	mvi	b,&H10
074D	21 2098	!..		lxi	hl,&H2098
0750	7E 	~		mov	a,m
0751	B0 	0		ora	b
0752	77 	w		mov	m,a
0753	CD 1770	Mp.		call	L_1770
0756	21 1D7C	!|.		lxi	hl,&H1D7C
0759	22 2087	". 		shld	&H2087
075C	C3 073C	C<.		jmp	L_073C
075F	11 1B83	...	L_075F	lxi	de,&H1B83
0762	C3 1A32	C2.		jmp	L_1A32
0765	3E 01	>.	L_0765	mvi	a,&H01
0767	32 2093	2. 		sta	&H2093
076A	31 2400	1. 		lxi	sp,&H2400
076D	FB 	{		ei
076E	CD 1979	My.		call	L_1979
0771	CD 09D6	MV.		call	L_09D6
0774	21 3013	!..		lxi	hl,&H3013
0777	11 1FF3	.s.		lxi	de,&H1FF3
077A	0E 04	..		mvi	c,&H04
077C	CD 08F3	Ms.		call	L_08F3
077F	3A 20EB	:k 	L_077F	lda	&H20EB
0782	3D 	=		dcr	a
0783	21 2810	!. 		lxi	hl,&H2810
0786	0E 14	..		mvi	c,&H14
0788	C2 0857	BW.		jnz	L_0857
078B	11 1ACF	.O.		lxi	de,&H1ACF
078E	CD 08F3	Ms.		call	L_08F3
0791	DB 01	[.		in	&H01
0793	E6 04	f.		ani	&H04
0795	CA 077F	J..		jz	L_077F
0798	06 99	..	L_0798	mvi	b,&H99
079A	AF 	/		xra	a
079B	32 20CE	2N 	L_079B	sta	&H20CE
079E	3A 20EB	:k 		lda	&H20EB
07A1	80 	.		add	b
07A2	27 	'		daa
07A3	32 20EB	2k 		sta	&H20EB
07A6	CD 1947	MG.		call	L_1947
07A9	21 0000	!..		lxi	hl,&H0000
07AC	22 20F8	"x 		shld	&H20F8
07AF	22 20FC	"| 		shld	&H20FC
07B2	CD 1925	M%.		call	L_1925
07B5	CD 192B	M+.		call	L_192B
07B8	CD 19D7	MW.		call	L_19D7
07BB	21 0101	!..		lxi	hl,&H0101
07BE	7C 	|		mov	a,h
07BF	32 20EF	2o 		sta	&H20EF
07C2	22 20E7	"g 		shld	&H20E7
07C5	22 20E5	"e 		shld	&H20E5
07C8	CD 1956	MV.		call	L_1956
07CB	CD 01EF	Mo.		call	L_01EF
07CE	CD 01F5	Mu.		call	L_01F5
07D1	CD 08D1	MQ.		call	L_08D1
07D4	32 21FF	2.!		sta	&H21FF
07D7	32 22FF	2."		sta	&H22FF
07DA	CD 00D7	MW.		call	L_00D7
07DD	AF 	/		xra	a
07DE	32 21FE	2~!		sta	&H21FE
07E1	32 22FE	2~"		sta	&H22FE
07E4	CD 01C0	M@.		call	L_01C0
07E7	CD 1904	M..		call	L_1904
07EA	21 3878	!x.		lxi	hl,&H3878
07ED	22 21FC	"|!		shld	&H21FC
07F0	22 22FC	"|"		shld	&H22FC
07F3	CD 01E4	Md.		call	L_01E4
07F6	CD 1A7F	M..		call	L_1A7F
07F9	CD 088D	M..	L_07F9	call	L_088D
07FC	CD 09D6	MV.		call	L_09D6
07FF	00 	.		nop
0800	AF 	/		xra	a
0801	32 20C1	2A 		sta	&H20C1
0804	CD 01CF	MO.	L_0804	call	L_01CF
0807	3A 2067	:g 		lda	&H2067
080A	0F 	.		rrc
080B	DA 0872	Zr.		jc	L_0872
080E	CD 0213	M..		call	L_0213
0811	CD 01CF	MO.		call	L_01CF
0814	CD 00B1	M1.	L_0814	call	L_00B1
0817	CD 19D1	MQ.	L_0817	call	&H19D1
081A	06 20	. 		mvi	b,&H20
081C	CD 18FA	Mz.		call	L_18FA
081F	CD 1618	M..	L_081F	call	L_1618
0822	CD 190A	M..		call	L_190A
0825	CD 15F3	Ms.		call	L_15F3
0828	CD 0988	M..		call	L_0988
082B	3A 2082	:. 		lda	&H2082
082E	A7 	'		ana	a
082F	CA 09EF	Jo.		jz	L_09EF
0832	CD 170E	M..		call	L_170E
0835	CD 0935	M5.		call	L_0935
0838	CD 08D8	MX.		call	L_08D8
083B	CD 172C	M,.		call	L_172C
083E	CD 0A59	MY.		call	L_0A59
0841	CA 0849	JI.		jz	L_0849
0844	06 04	..		mvi	b,&H04
0846	CD 18FA	Mz.		call	L_18FA
0849	CD 1775	Mu.	L_0849	call	L_1775
084C	D3 06	S.		out	&H06
084E	CD 1804	M..		call	L_1804
0851	C3 081F	C..		jmp	L_081F
0854	00 	.		nop
0855	00 	.		nop
0856	00 	.		nop
0857	11 1ABA	.:.	L_0857	lxi	de,&H1ABA
085A	CD 08F3	Ms.		call	L_08F3
085D	06 98	..		mvi	b,&H98
085F	DB 01	[.		in	&H01
0861	0F 	.		rrc
0862	0F 	.		rrc
0863	DA 086D	Zm.		jc	L_086D
0866	0F 	.		rrc
0867	DA 0798	Z..		jc	L_0798
086A	C3 077F	C..		jmp	L_077F
086D	3E 01	>.	L_086D	mvi	a,&H01
086F	C3 079B	C..		jmp	L_079B
0872	CD 021A	M..	L_0872	call	L_021A
0875	C3 0814	C..		jmp	L_0814
0878	3A 2008	:. 	L_0878	lda	&H2008
087B	47 	G		mov	b,a
087C	2A 2009	*. 		lhld	&H2009
087F	EB 	k		xchg
0880	C3 0886	C..		jmp	L_0886
0883	00 	.		nop
0884	00 	.		nop
0885	00 	.		nop
0886	3A 2067	:g 	L_0886	lda	&H2067
0889	67 	g		mov	h,a
088A	2E FC	.|		mvi	l,&HFC
088C	C9 	I		ret
088D	21 2B11	!. 	L_088D	lxi	hl,&H2B11
0890	11 1B70	.p 		lxi	de,&H1B70
0893	0E 0E	..		mvi	c,&H0E
0895	CD 08F3	Ms.		call	L_08F3
0898	3A 2067	:g 		lda	&H2067
089B	0F 	.		rrc
089C	3E 1C	>.		mvi	a,&H1C
089E	21 3711	!. 		lxi	hl,&H3711
08A1	D4 08FF	T..		cnc	L_08FF
08A4	3E B0	>0		mvi	a,&HB0
08A6	32 20C0	2@ 		sta	&H20C0
08A9	3A 20C0	:@ 	L_08A9	lda	&H20C0
08AC	A7 	'		ana	a
08AD	C8 	H		rz
08AE	E6 04	f.		ani	&H04
08B0	C2 08BC	B<.		jnz	L_08BC
08B3	CD 09CA	MJ.		call	L_09CA
08B6	CD 1931	M1.		call	L_1931
08B9	C3 08A9	C).		jmp	L_08A9
08BC	06 20	. 	L_08BC	mvi	b,&H20
08BE	21 271C	!..		lxi	hl,&H271C
08C1	3A 2067	:g 		lda	&H2067
08C4	0F 	.		rrc
08C5	DA 08CB	ZK.		jc	L_08CB
08C8	21 391C	!..		lxi	hl,&H391C
08CB	CD 14CB	MK.	L_08CB	call	L_14CB
08CE	C3 08A9	C).		jmp	L_08A9
08D1	DB 02	[.	L_08D1	in	&H02
08D3	E6 03	f.		ani	&H03
08D5	C6 03	F.		adi	&H03
08D7	C9 	I		ret
08D8	3A 2082	:. 	L_08D8	lda	&H2082
08DB	FE 09	~.		cmpi	&H09
08DD	D0 	P		rnc
08DE	3E FB	>{		mvi	a,&HFB
08E0	32 207E	2~ 		sta	&H207E
08E3	C9 	I		ret
08E4	3A 20CE	:N 	L_08E4	lda	&H20CE
08E7	A7 	'		ana	a
08E8	C0 	@		rnz
08E9	21 391C	!. 		lxi	hl,&H391C
08EC	06 20	. 		mvi	b,&H20
08EE	C3 14CB	CK.		jmp	L_14CB
08F1	0E 03	..	L_08F1	mvi	c,&H03
08F3	1A 	.	L_08F3	ldax	de
08F4	D5 	U		push	de
08F5	CD 08FF	M..		call	L_08FF
08F8	D1 	Q		pop	de
08F9	13 	.		inx	de
08FA	0D 	.		dcr	c
08FB	C2 08F3	Bs.		jnz	L_08F3
08FE	C9 	I		ret
08FF	11 1E00	...	L_08FF	lxi	de,&H1E00
0902	E5 	e		push	hl
0903	26 00	&.		mvi	h,&H00
0905	6F 	o		mov	l,a
0906	29 	)		dad	hl
0907	29 	)		dad	hl
0908	29 	)		dad	hl
0909	19 	.		dad	de
090A	EB 	k		xchg
090B	E1 	a		pop	hl
090C	06 08	..		mvi	b,&H08
090E	D3 06	S.		out	&H06
0910	C3 1439	C9.		jmp	L_1439
0913	3A 2009	:. 	L_0913	lda	&H2009
0916	FE 78	~x		cmpi	&H78
0918	D0 	P		rnc
0919	2A 2091	*. 		lhld	&H2091
091C	7D 	}		mov	a,l
091D	B4 	4		ora	h
091E	C2 0929	B).		jnz	L_0929
0921	21 0600	!..		lxi	hl,&H0600
0924	3E 01	>.		mvi	a,&H01
0926	32 2083	2. 		sta	&H2083
0929	2B 	+	L_0929	dcx	hl
092A	22 2091	". 		shld	&H2091
092D	C9 	I		ret
092E	CD 1611	M..	L_092E	call	L_1611
0931	2E FF	..		mvi	l,&HFF
0933	7E 	~		mov	a,m
0934	C9 	I		ret
0935	CD 1910	M..	L_0935	call	L_1910
0938	2B 	+		dcx	hl
0939	2B 	+		dcx	hl
093A	7E 	~		mov	a,m
093B	A7 	'		ana	a
093C	C8 	H		rz
093D	06 15	..		mvi	b,&H15
093F	DB 02	[.		in	&H02
0941	E6 08	f.		ani	&H08
0943	CA 0948	JH.		jz	L_0948
0946	06 10	..		mvi	b,&H10
0948	CD 09CA	MJ.	L_0948	call	L_09CA
094B	23 	#		inx	hl
094C	7E 	~		mov	a,m
094D	B8 	8		cmp	b
094E	D8 	X		rc
094F	CD 092E	M..		call	L_092E
0952	34 	4		inr	m
0953	7E 	~		mov	a,m
0954	F5 	u		push	psw
0955	21 2501	!..		lxi	hl,&H2501
0958	24 	$	L_0958	inr	h
0959	24 	$		inr	h
095A	3D 	=		dcr	a
095B	C2 0958	BX.		jnz	L_0958
095E	06 10	..		mvi	b,&H10
0960	11 1C60	.`.		lxi	de,&H1C60
0963	CD 1439	M9.		call	L_1439
0966	F1 	q		pop	psw
0967	3C 	<		inr	a
0968	CD 1A8B	M..		call	L_1A8B
096B	CD 1910	M..		call	L_1910
096E	2B 	+		dcx	hl
096F	2B 	+		dcx	hl
0970	36 00	6.		mvi	m,&H00
0972	3E FF	>.		mvi	a,&HFF
0974	32 2099	2. 		sta	&H2099
0977	06 10	..		mvi	b,&H10
0979	C3 18FA	Cz.		jmp	L_18FA
097C	21 1DA0	! .	L_097C	lxi	hl,&H1DA0
097F	FE 02	~.		cmpi	&H02
0981	D8 	X		rc
0982	23 	#		inx	hl
0983	FE 04	~.		cmpi	&H04
0985	D8 	X		rc
0986	23 	#		inx	hl
0987	C9 	I		ret
0988	CD 09CA	MJ.	L_0988	call	L_09CA
098B	3A 20F1	:q 		lda	&H20F1
098E	A7 	'		ana	a
098F	C8 	H		rz
0990	AF 	/		xra	a
0991	32 20F1	2q 		sta	&H20F1
0994	E5 	e		push	hl
0995	2A 20F2	*r 		lhld	&H20F2
0998	EB 	k		xchg
0999	E1 	a		pop	hl
099A	7E 	~		mov	a,m
099B	83 	.		add	e
099C	27 	'		daa
099D	77 	w		mov	m,a
099E	5F 	_		mov	e,a
099F	23 	#		inx	hl
09A0	7E 	~		mov	a,m
09A1	8A 	.		adc	d
09A2	27 	'		daa
09A3	77 	w		mov	m,a
09A4	57 	W		mov	d,a
09A5	23 	#		inx	hl
09A6	7E 	~		mov	a,m
09A7	23 	#		inx	hl
09A8	66 	f		mov	h,m
09A9	6F 	o		mov	l,a
09AA	C3 09AD	C-.		jmp	L_09AD
09AD	7A 	z	L_09AD	mov	a,d
09AE	CD 09B2	M2.		call	L_09B2
09B1	7B 	{		mov	a,e
09B2	D5 	U	L_09B2	push	de
09B3	F5 	u		push	psw
09B4	0F 	.		rrc
09B5	0F 	.		rrc
09B6	0F 	.		rrc
09B7	0F 	.		rrc
09B8	E6 0F	f.		ani	&H0F
09BA	CD 09C5	ME.		call	L_09C5
09BD	F1 	q		pop	psw
09BE	E6 0F	f.		ani	&H0F
09C0	CD 09C5	ME.		call	L_09C5
09C3	D1 	Q		pop	de
09C4	C9 	I		ret
09C5	C6 1A	F.	L_09C5	adi	&H1A
09C7	C3 08FF	C..		jmp	L_08FF
09CA	3A 2067	:g 	L_09CA	lda	&H2067
09CD	0F 	.		rrc
09CE	21 20F8	!x 		lxi	hl,&H20F8
09D1	D8 	X		rc
09D2	21 20FC	!| 		lxi	hl,&H20FC
09D5	C9 	I		ret
09D6	21 2402	!. 	L_09D6	lxi	hl,&H2402
09D9	36 00	6.	L_09D9	mvi	m,&H00
09DB	23 	#		inx	hl
09DC	7D 	}		mov	a,l
09DD	E6 1F	f.		ani	&H1F
09DF	FE 1C	~.		cmpi	&H1C
09E1	DA 09E8	Zh.		jc	L_09E8
09E4	11 0006	...		lxi	de,&H0006
09E7	19 	.		dad	de
09E8	7C 	|	L_09E8	mov	a,h
09E9	FE 40	~@		cmpi	&H40
09EB	DA 09D9	ZY.		jc	L_09D9
09EE	C9 	I		ret
09EF	CD 0A3C	M<.	L_09EF	call	L_0A3C
09F2	AF 	/		xra	a
09F3	32 20E9	2i 		sta	&H20E9
09F6	CD 09D6	MV.		call	L_09D6
09F9	3A 2067	:g 		lda	&H2067
09FC	F5 	u		push	psw
09FD	CD 01E4	Md.		call	L_01E4
0A00	F1 	q		pop	psw
0A01	32 2067	2g 		sta	&H2067
0A04	3A 2067	:g 		lda	&H2067
0A07	67 	g		mov	h,a
0A08	E5 	e		push	hl
0A09	2E FE	.~		mvi	l,&HFE
0A0B	7E 	~		mov	a,m
0A0C	E6 07	f.		ani	&H07
0A0E	3C 	<		inr	a
0A0F	77 	w		mov	m,a
0A10	21 1DA2	!".		lxi	hl,&H1DA2
0A13	23 	#	L_0A13	inx	hl
0A14	3D 	=		dcr	a
0A15	C2 0A13	B..		jnz	L_0A13
0A18	7E 	~		mov	a,m
0A19	E1 	a		pop	hl
0A1A	2E FC	.|		mvi	l,&HFC
0A1C	77 	w		mov	m,a
0A1D	23 	#		inx	hl
0A1E	36 38	68		mvi	m,&H38
0A20	7C 	|		mov	a,h
0A21	0F 	.		rrc
0A22	DA 0A33	Z3.		jc	L_0A33
0A25	3E 21	>!		mvi	a,&H21
0A27	32 2098	2. 		sta	&H2098
0A2A	CD 01F5	Mu.		call	L_01F5
0A2D	CD 1904	M..		call	L_1904
0A30	C3 0804	C..		jmp	L_0804
0A33	CD 01EF	Mo.	L_0A33	call	L_01EF
0A36	CD 01C0	M@.		call	L_01C0
0A39	C3 0804	C..		jmp	L_0804
0A3C	CD 0A59	MY.	L_0A3C	call	L_0A59
0A3F	C2 0A52	BR.		jnz	L_0A52
0A42	3E 30	>0		mvi	a,&H30
0A44	32 20C0	2@ 		sta	&H20C0
0A47	3A 20C0	:@ 	L_0A47	lda	&H20C0
0A4A	A7 	'		ana	a
0A4B	C8 	H		rz
0A4C	CD 0A59	MY.		call	L_0A59
0A4F	CA 0A47	JG.		jz	L_0A47
0A52	CD 0A59	MY.	L_0A52	call	L_0A59
0A55	C2 0A52	BR.		jnz	L_0A52
0A58	C9 	I		ret
0A59	3A 2015	:. 	L_0A59	lda	&H2015
0A5C	FE FF	~.		cmpi	&HFF
0A5E	C9 	I		ret
0A5F	3A 20EF	:o 	L_0A5F	lda	&H20EF
0A62	A7 	'		ana	a
0A63	CA 0A7C	J|.		jz	L_0A7C
0A66	48 	H		mov	c,b
0A67	06 08	..		mvi	b,&H08
0A69	CD 18FA	Mz.		call	L_18FA
0A6C	41 	A		mov	b,c
0A6D	78 	x		mov	a,b
0A6E	CD 097C	M|.		call	L_097C
0A71	7E 	~		mov	a,m
0A72	21 20F3	!s.		lxi	hl,&H20F3
0A75	36 00	6.		mvi	m,&H00
0A77	2B 	+		dcx	hl
0A78	77 	w		mov	m,a
0A79	2B 	+		dcx	hl
0A7A	36 01	6.		mvi	m,&H01
0A7C	21 2062	!b.	L_0A7C	lxi	hl,&H2062
0A7F	C9 	I		ret
0A80	3E 02	>.	L_0A80	mvi	a,&H02
0A82	32 20C1	2A 		sta	&H20C1
0A85	D3 06	S.	L_0A85	out	&H06
0A87	3A 20CB	:K 		lda	&H20CB
0A8A	A7 	'		ana	a
0A8B	CA 0A85	J..		jz	L_0A85
0A8E	AF 	/		xra	a
0A8F	32 20C1	2A 		sta	&H20C1
0A92	C9 	I		ret
0A93	D5 	U	L_0A93	push	de
0A94	1A 	.		ldax	de
0A95	CD 08FF	M..		call	L_08FF
0A98	D1 	Q		pop	de
0A99	3E 07	>.		mvi	a,&H07
0A9B	32 20C0	2@ 		sta	&H20C0
0A9E	3A 20C0	:@ 	L_0A9E	lda	&H20C0
0AA1	3D 	=		dcr	a
0AA2	C2 0A9E	B..		jnz	L_0A9E
0AA5	13 	.		inx	de
0AA6	0D 	.		dcr	c
0AA7	C2 0A93	B..		jnz	L_0A93
0AAA	C9 	I		ret
0AAB	21 2050	!P.	L_0AAB	lxi	hl,&H2050
0AAE	C3 024B	CK.		jmp	L_024B
0AB1	3E 40	>@	L_0AB1	mvi	a,&H40
0AB3	C3 0AD7	CW.		jmp	L_0AD7
0AB6	3E 80	>.	L_0AB6	mvi	a,&H80
0AB8	C3 0AD7	CW.		jmp	L_0AD7
0ABB	E1 	a	L_0ABB	pop	hl
0ABC	C3 0072	Cr.		jmp	L_0072
0ABF	3A 20C1	:A 	L_0ABF	lda	&H20C1
0AC2	0F 	.		rrc
0AC3	DA 0ABB	Z;.		jc	L_0ABB
0AC6	0F 	.		rrc
0AC7	DA 1868	Zh.		jc	L_1868
0ACA	0F 	.		rrc
0ACB	DA 0AAB	Z+.		jc	L_0AAB
0ACE	C9 	I		ret
0ACF	21 2B14	!..	L_0ACF	lxi	hl,&H2B14
0AD2	0E 0F	..		mvi	c,&H0F
0AD4	C3 0A93	C..		jmp	L_0A93
0AD7	32 20C0	2@ 	L_0AD7	sta	&H20C0
0ADA	3A 20C0	:@ 	L_0ADA	lda	&H20C0
0ADD	A7 	'		ana	a
0ADE	C2 0ADA	BZ.		jnz	L_0ADA
0AE1	C9 	I		ret
0AE2	21 20C2	!B.	L_0AE2	lxi	hl,&H20C2
0AE5	06 0C	..		mvi	b,&H0C
0AE7	C3 1A32	C2.		jmp	L_1A32
0AEA	AF 	/	L_0AEA	xra	a
0AEB	D3 03	S.		out	&H03
0AED	D3 05	S.		out	&H05
0AEF	CD 1982	M..		call	L_1982
0AF2	FB 	{		ei
0AF3	CD 0AB1	M1.		call	L_0AB1
0AF6	3A 20EC	:l 		lda	&H20EC
0AF9	A7 	'		ana	a
0AFA	21 3017	!. 		lxi	hl,&H3017
0AFD	0E 04	..		mvi	c,&H04
0AFF	C2 0BE8	Bh.		jnz	L_0BE8
0B02	11 1CFA	.z.		lxi	de,&H1CFA
0B05	CD 0A93	M..		call	L_0A93
0B08	11 1DAF	./.		lxi	de,&H1DAF
0B0B	CD 0ACF	MO.	L_0B0B	call	L_0ACF
0B0E	CD 0AB1	M1.		call	L_0AB1
0B11	CD 1815	M..		call	L_1815
0B14	CD 0AB6	M6.		call	L_0AB6
0B17	3A 20EC	:l 		lda	&H20EC
0B1A	A7 	'		ana	a
0B1B	C2 0B4A	BJ.		jnz	L_0B4A
0B1E	11 1A95	...		lxi	de,&H1A95
0B21	CD 0AE2	Mb.		call	L_0AE2
0B24	CD 0A80	M..		call	L_0A80
0B27	11 1BB0	.0.		lxi	de,&H1BB0
0B2A	CD 0AE2	Mb.		call	L_0AE2
0B2D	CD 0A80	M..		call	L_0A80
0B30	CD 0AB1	M1.		call	L_0AB1
0B33	11 1FC9	.I.		lxi	de,&H1FC9
0B36	CD 0AE2	Mb.		call	L_0AE2
0B39	CD 0A80	M..		call	L_0A80
0B3C	CD 0AB1	M1.		call	L_0AB1
0B3F	21 33B7	!7.		lxi	hl,&H33B7
0B42	06 0A	..		mvi	b,&H0A
0B44	CD 14CB	MK.		call	L_14CB
0B47	CD 0AB6	M6.		call	L_0AB6
0B4A	CD 09D6	MV.	L_0B4A	call	L_09D6
0B4D	3A 21FF	:.!		lda	&H21FF
0B50	A7 	'		ana	a
0B51	C2 0B5D	B].		jnz	L_0B5D
0B54	CD 08D1	MQ.		call	L_08D1
0B57	32 21FF	2.!		sta	&H21FF
0B5A	CD 1A7F	M..		call	L_1A7F
0B5D	CD 01E4	Md.	L_0B5D	call	L_01E4
0B60	CD 01C0	M@.		call	L_01C0
0B63	CD 01EF	Mo.		call	L_01EF
0B66	CD 021A	M..		call	L_021A
0B69	3E 01	>.		mvi	a,&H01
0B6B	32 20C1	2A 		sta	&H20C1
0B6E	CD 01CF	MO.		call	L_01CF
0B71	CD 1618	M..	L_0B71	call	L_1618
0B74	CD 0BF1	Mq.		call	L_0BF1
0B77	D3 06	S.		out	&H06
0B79	CD 0A59	MY.		call	L_0A59
0B7C	CA 0B71	Jq.		jz	L_0B71
0B7F	AF 	/		xra	a
0B80	32 2025	2% 		sta	&H2025
0B83	CD 0A59	MY.	L_0B83	call	L_0A59
0B86	C2 0B83	B..		jnz	L_0B83
0B89	AF 	/	L_0B89	xra	a
0B8A	32 20C1	2A 		sta	&H20C1
0B8D	CD 0AB1	M1.		call	L_0AB1
0B90	CD 1988	M..		call	L_1988
0B93	0E 0C	..		mvi	c,&H0C
0B95	21 2C11	!..		lxi	hl,&H2C11
0B98	11 1F90	...		lxi	de,&H1F90
0B9B	CD 08F3	Ms.		call	L_08F3
0B9E	3A 20EC	:l 		lda	&H20EC
0BA1	FE 00	~.		cmpi	&H00
0BA3	C2 0BAE	B..		jnz	L_0BAE
0BA6	21 3311	!..		lxi	hl,&H3311
0BA9	3E 02	>.		mvi	a,&H02
0BAB	CD 08FF	M..		call	L_08FF
0BAE	01 1F9C	...	L_0BAE	lxi	bc,&H1F9C
0BB1	CD 1856	MV.		call	L_1856
0BB4	CD 184C	ML.		call	L_184C
0BB7	DB 02	[.		in	&H02
0BB9	07 	.		rlc
0BBA	DA 0BC3	ZC.		jc	L_0BC3
0BBD	01 1FA0	. .		lxi	bc,&H1FA0
0BC0	CD 183A	M:.		call	L_183A
0BC3	CD 0AB6	M6.	L_0BC3	call	L_0AB6
0BC6	3A 20EC	:l 		lda	&H20EC
0BC9	FE 00	~.		cmpi	&H00
0BCB	C2 0BDA	BZ.		jnz	L_0BDA
0BCE	11 1FD5	.U.		lxi	de,&H1FD5
0BD1	CD 0AE2	Mb.		call	L_0AE2
0BD4	CD 0A80	M..		call	L_0A80
0BD7	CD 189E	M..		call	L_189E
0BDA	21 20EC	!l.	L_0BDA	lxi	hl,&H20EC
0BDD	7E 	~		mov	a,m
0BDE	3C 	<		inr	a
0BDF	E6 01	f.		ani	&H01
0BE1	77 	w		mov	m,a
0BE2	CD 09D6	MV.		call	L_09D6
0BE5	C3 18DF	C_.		jmp	L_18DF
0BE8	11 1DAB	.+.	L_0BE8	lxi	de,&H1DAB
0BEB	CD 0A93	M..		call	L_0A93
0BEE	C3 0B0B	C..		jmp	L_0B0B
0BF1	CD 190A	M..	L_0BF1	call	L_190A
0BF4	C3 199A	C..		jmp	L_199A
0BF7	13 	.		inx	de
0BF8	00 	.		nop
0BF9	08 	.		exaf
0BFA	13 	.		inx	de
0BFB	0E 26	.&		mvi	c,&H26
0BFD	02 	.		stax	bc
0BFE	0E 0F	..		mvi	c,&H0F
0C00	00 	.		nop
0C01	00 	.		nop
0C02	00 	.		nop
0C03	00 	.		nop
0C04	00 	.		nop
0C05	00 	.		nop
0C06	00 	.		nop
0C07	00 	.		nop
0C08	00 	.		nop
0C09	00 	.		nop
0C0A	00 	.		nop
0C0B	00 	.		nop
0C0C	00 	.		nop
0C0D	00 	.		nop
0C0E	00 	.		nop
0C0F	00 	.		nop
0C10	00 	.		nop
0C11	00 	.		nop
0C12	00 	.		nop
0C13	00 	.		nop
0C14	00 	.		nop
0C15	00 	.		nop
0C16	00 	.		nop
0C17	00 	.		nop
0C18	00 	.		nop
0C19	00 	.		nop
0C1A	00 	.		nop
0C1B	00 	.		nop
0C1C	00 	.		nop
0C1D	00 	.		nop
0C1E	00 	.		nop
0C1F	00 	.		nop
0C20	00 	.		nop
0C21	00 	.		nop
0C22	00 	.		nop
0C23	00 	.		nop
0C24	00 	.		nop
0C25	00 	.		nop
0C26	00 	.		nop
0C27	00 	.		nop
0C28	00 	.		nop
0C29	00 	.		nop
0C2A	00 	.		nop
0C2B	00 	.		nop
0C2C	00 	.		nop
0C2D	00 	.		nop
0C2E	00 	.		nop
0C2F	00 	.		nop
0C30	00 	.		nop
0C31	00 	.		nop
0C32	00 	.		nop
0C33	00 	.		nop
0C34	00 	.		nop
0C35	00 	.		nop
0C36	00 	.		nop
0C37	00 	.		nop
0C38	00 	.		nop
0C39	00 	.		nop
0C3A	00 	.		nop
0C3B	00 	.		nop
0C3C	00 	.		nop
0C3D	00 	.		nop
0C3E	00 	.		nop
0C3F	00 	.		nop
0C40	00 	.		nop
0C41	00 	.		nop
0C42	00 	.		nop
0C43	00 	.		nop
0C44	00 	.		nop
0C45	00 	.		nop
0C46	00 	.		nop
0C47	00 	.		nop
0C48	00 	.		nop
0C49	00 	.		nop
0C4A	00 	.		nop
0C4B	00 	.		nop
0C4C	00 	.		nop
0C4D	00 	.		nop
0C4E	00 	.		nop
0C4F	00 	.		nop
0C50	00 	.		nop
0C51	00 	.		nop
0C52	00 	.		nop
0C53	00 	.		nop
0C54	00 	.		nop
0C55	00 	.		nop
0C56	00 	.		nop
0C57	00 	.		nop
0C58	00 	.		nop
0C59	00 	.		nop
0C5A	00 	.		nop
0C5B	00 	.		nop
0C5C	00 	.		nop
0C5D	00 	.		nop
0C5E	00 	.		nop
0C5F	00 	.		nop
0C60	00 	.		nop
0C61	00 	.		nop
0C62	00 	.		nop
0C63	00 	.		nop
0C64	00 	.		nop
0C65	00 	.		nop
0C66	00 	.		nop
0C67	00 	.		nop
0C68	00 	.		nop
0C69	00 	.		nop
0C6A	00 	.		nop
0C6B	00 	.		nop
0C6C	00 	.		nop
0C6D	00 	.		nop
0C6E	00 	.		nop
0C6F	00 	.		nop
0C70	00 	.		nop
0C71	00 	.		nop
0C72	00 	.		nop
0C73	00 	.		nop
0C74	00 	.		nop
0C75	00 	.		nop
0C76	00 	.		nop
0C77	00 	.		nop
0C78	00 	.		nop
0C79	00 	.		nop
0C7A	00 	.		nop
0C7B	00 	.		nop
0C7C	00 	.		nop
0C7D	00 	.		nop
0C7E	00 	.		nop
0C7F	00 	.		nop
0C80	00 	.		nop
0C81	00 	.		nop
0C82	00 	.		nop
0C83	00 	.		nop
0C84	00 	.		nop
0C85	00 	.		nop
0C86	00 	.		nop
0C87	00 	.		nop
0C88	00 	.		nop
0C89	00 	.		nop
0C8A	00 	.		nop
0C8B	00 	.		nop
0C8C	00 	.		nop
0C8D	00 	.		nop
0C8E	00 	.		nop
0C8F	00 	.		nop
0C90	00 	.		nop
0C91	00 	.		nop
0C92	00 	.		nop
0C93	00 	.		nop
0C94	00 	.		nop
0C95	00 	.		nop
0C96	00 	.		nop
0C97	00 	.		nop
0C98	00 	.		nop
0C99	00 	.		nop
0C9A	00 	.		nop
0C9B	00 	.		nop
0C9C	00 	.		nop
0C9D	00 	.		nop
0C9E	00 	.		nop
0C9F	00 	.		nop
0CA0	00 	.		nop
0CA1	00 	.		nop
0CA2	00 	.		nop
0CA3	00 	.		nop
0CA4	00 	.		nop
0CA5	00 	.		nop
0CA6	00 	.		nop
0CA7	00 	.		nop
0CA8	00 	.		nop
0CA9	00 	.		nop
0CAA	00 	.		nop
0CAB	00 	.		nop
0CAC	00 	.		nop
0CAD	00 	.		nop
0CAE	00 	.		nop
0CAF	00 	.		nop
0CB0	00 	.		nop
0CB1	00 	.		nop
0CB2	00 	.		nop
0CB3	00 	.		nop
0CB4	00 	.		nop
0CB5	00 	.		nop
0CB6	00 	.		nop
0CB7	00 	.		nop
0CB8	00 	.		nop
0CB9	00 	.		nop
0CBA	00 	.		nop
0CBB	00 	.		nop
0CBC	00 	.		nop
0CBD	00 	.		nop
0CBE	00 	.		nop
0CBF	00 	.		nop
0CC0	00 	.		nop
0CC1	00 	.		nop
0CC2	00 	.		nop
0CC3	00 	.		nop
0CC4	00 	.		nop
0CC5	00 	.		nop
0CC6	00 	.		nop
0CC7	00 	.		nop
0CC8	00 	.		nop
0CC9	00 	.		nop
0CCA	00 	.		nop
0CCB	00 	.		nop
0CCC	00 	.		nop
0CCD	00 	.		nop
0CCE	00 	.		nop
0CCF	00 	.		nop
0CD0	00 	.		nop
0CD1	00 	.		nop
0CD2	00 	.		nop
0CD3	00 	.		nop
0CD4	00 	.		nop
0CD5	00 	.		nop
0CD6	00 	.		nop
0CD7	00 	.		nop
0CD8	00 	.		nop
0CD9	00 	.		nop
0CDA	00 	.		nop
0CDB	00 	.		nop
0CDC	00 	.		nop
0CDD	00 	.		nop
0CDE	00 	.		nop
0CDF	00 	.		nop
0CE0	00 	.		nop
0CE1	00 	.		nop
0CE2	00 	.		nop
0CE3	00 	.		nop
0CE4	00 	.		nop
0CE5	00 	.		nop
0CE6	00 	.		nop
0CE7	00 	.		nop
0CE8	00 	.		nop
0CE9	00 	.		nop
0CEA	00 	.		nop
0CEB	00 	.		nop
0CEC	00 	.		nop
0CED	00 	.		nop
0CEE	00 	.		nop
0CEF	00 	.		nop
0CF0	00 	.		nop
0CF1	00 	.		nop
0CF2	00 	.		nop
0CF3	00 	.		nop
0CF4	00 	.		nop
0CF5	00 	.		nop
0CF6	00 	.		nop
0CF7	00 	.		nop
0CF8	00 	.		nop
0CF9	00 	.		nop
0CFA	00 	.		nop
0CFB	00 	.		nop
0CFC	00 	.		nop
0CFD	00 	.		nop
0CFE	00 	.		nop
0CFF	00 	.		nop
0D00	00 	.		nop
0D01	00 	.		nop
0D02	00 	.		nop
0D03	00 	.		nop
0D04	00 	.		nop
0D05	00 	.		nop
0D06	00 	.		nop
0D07	00 	.		nop
0D08	00 	.		nop
0D09	00 	.		nop
0D0A	00 	.		nop
0D0B	00 	.		nop
0D0C	00 	.		nop
0D0D	00 	.		nop
0D0E	00 	.		nop
0D0F	00 	.		nop
0D10	00 	.		nop
0D11	00 	.		nop
0D12	00 	.		nop
0D13	00 	.		nop
0D14	00 	.		nop
0D15	00 	.		nop
0D16	00 	.		nop
0D17	00 	.		nop
0D18	00 	.		nop
0D19	00 	.		nop
0D1A	00 	.		nop
0D1B	00 	.		nop
0D1C	00 	.		nop
0D1D	00 	.		nop
0D1E	00 	.		nop
0D1F	00 	.		nop
0D20	00 	.		nop
0D21	00 	.		nop
0D22	00 	.		nop
0D23	00 	.		nop
0D24	00 	.		nop
0D25	00 	.		nop
0D26	00 	.		nop
0D27	00 	.		nop
0D28	00 	.		nop
0D29	00 	.		nop
0D2A	00 	.		nop
0D2B	00 	.		nop
0D2C	00 	.		nop
0D2D	00 	.		nop
0D2E	00 	.		nop
0D2F	00 	.		nop
0D30	00 	.		nop
0D31	00 	.		nop
0D32	00 	.		nop
0D33	00 	.		nop
0D34	00 	.		nop
0D35	00 	.		nop
0D36	00 	.		nop
0D37	00 	.		nop
0D38	00 	.		nop
0D39	00 	.		nop
0D3A	00 	.		nop
0D3B	00 	.		nop
0D3C	00 	.		nop
0D3D	00 	.		nop
0D3E	00 	.		nop
0D3F	00 	.		nop
0D40	00 	.		nop
0D41	00 	.		nop
0D42	00 	.		nop
0D43	00 	.		nop
0D44	00 	.		nop
0D45	00 	.		nop
0D46	00 	.		nop
0D47	00 	.		nop
0D48	00 	.		nop
0D49	00 	.		nop
0D4A	00 	.		nop
0D4B	00 	.		nop
0D4C	00 	.		nop
0D4D	00 	.		nop
0D4E	00 	.		nop
0D4F	00 	.		nop
0D50	00 	.		nop
0D51	00 	.		nop
0D52	00 	.		nop
0D53	00 	.		nop
0D54	00 	.		nop
0D55	00 	.		nop
0D56	00 	.		nop
0D57	00 	.		nop
0D58	00 	.		nop
0D59	00 	.		nop
0D5A	00 	.		nop
0D5B	00 	.		nop
0D5C	00 	.		nop
0D5D	00 	.		nop
0D5E	00 	.		nop
0D5F	00 	.		nop
0D60	00 	.		nop
0D61	00 	.		nop
0D62	00 	.		nop
0D63	00 	.		nop
0D64	00 	.		nop
0D65	00 	.		nop
0D66	00 	.		nop
0D67	00 	.		nop
0D68	00 	.		nop
0D69	00 	.		nop
0D6A	00 	.		nop
0D6B	00 	.		nop
0D6C	00 	.		nop
0D6D	00 	.		nop
0D6E	00 	.		nop
0D6F	00 	.		nop
0D70	00 	.		nop
0D71	00 	.		nop
0D72	00 	.		nop
0D73	00 	.		nop
0D74	00 	.		nop
0D75	00 	.		nop
0D76	00 	.		nop
0D77	00 	.		nop
0D78	00 	.		nop
0D79	00 	.		nop
0D7A	00 	.		nop
0D7B	00 	.		nop
0D7C	00 	.		nop
0D7D	00 	.		nop
0D7E	00 	.		nop
0D7F	00 	.		nop
0D80	00 	.		nop
0D81	00 	.		nop
0D82	00 	.		nop
0D83	00 	.		nop
0D84	00 	.		nop
0D85	00 	.		nop
0D86	00 	.		nop
0D87	00 	.		nop
0D88	00 	.		nop
0D89	00 	.		nop
0D8A	00 	.		nop
0D8B	00 	.		nop
0D8C	00 	.		nop
0D8D	00 	.		nop
0D8E	00 	.		nop
0D8F	00 	.		nop
0D90	00 	.		nop
0D91	00 	.		nop
0D92	00 	.		nop
0D93	00 	.		nop
0D94	00 	.		nop
0D95	00 	.		nop
0D96	00 	.		nop
0D97	00 	.		nop
0D98	00 	.		nop
0D99	00 	.		nop
0D9A	00 	.		nop
0D9B	00 	.		nop
0D9C	00 	.		nop
0D9D	00 	.		nop
0D9E	00 	.		nop
0D9F	00 	.		nop
0DA0	00 	.		nop
0DA1	00 	.		nop
0DA2	00 	.		nop
0DA3	00 	.		nop
0DA4	00 	.		nop
0DA5	00 	.		nop
0DA6	00 	.		nop
0DA7	00 	.		nop
0DA8	00 	.		nop
0DA9	00 	.		nop
0DAA	00 	.		nop
0DAB	00 	.		nop
0DAC	00 	.		nop
0DAD	00 	.		nop
0DAE	00 	.		nop
0DAF	00 	.		nop
0DB0	00 	.		nop
0DB1	00 	.		nop
0DB2	00 	.		nop
0DB3	00 	.		nop
0DB4	00 	.		nop
0DB5	00 	.		nop
0DB6	00 	.		nop
0DB7	00 	.		nop
0DB8	00 	.		nop
0DB9	00 	.		nop
0DBA	00 	.		nop
0DBB	00 	.		nop
0DBC	00 	.		nop
0DBD	00 	.		nop
0DBE	00 	.		nop
0DBF	00 	.		nop
0DC0	00 	.		nop
0DC1	00 	.		nop
0DC2	00 	.		nop
0DC3	00 	.		nop
0DC4	00 	.		nop
0DC5	00 	.		nop
0DC6	00 	.		nop
0DC7	00 	.		nop
0DC8	00 	.		nop
0DC9	00 	.		nop
0DCA	00 	.		nop
0DCB	00 	.		nop
0DCC	00 	.		nop
0DCD	00 	.		nop
0DCE	00 	.		nop
0DCF	00 	.		nop
0DD0	00 	.		nop
0DD1	00 	.		nop
0DD2	00 	.		nop
0DD3	00 	.		nop
0DD4	00 	.		nop
0DD5	00 	.		nop
0DD6	00 	.		nop
0DD7	00 	.		nop
0DD8	00 	.		nop
0DD9	00 	.		nop
0DDA	00 	.		nop
0DDB	00 	.		nop
0DDC	00 	.		nop
0DDD	00 	.		nop
0DDE	00 	.		nop
0DDF	00 	.		nop
0DE0	00 	.		nop
0DE1	00 	.		nop
0DE2	00 	.		nop
0DE3	00 	.		nop
0DE4	00 	.		nop
0DE5	00 	.		nop
0DE6	00 	.		nop
0DE7	00 	.		nop
0DE8	00 	.		nop
0DE9	00 	.		nop
0DEA	00 	.		nop
0DEB	00 	.		nop
0DEC	00 	.		nop
0DED	00 	.		nop
0DEE	00 	.		nop
0DEF	00 	.		nop
0DF0	00 	.		nop
0DF1	00 	.		nop
0DF2	00 	.		nop
0DF3	00 	.		nop
0DF4	00 	.		nop
0DF5	00 	.		nop
0DF6	00 	.		nop
0DF7	00 	.		nop
0DF8	00 	.		nop
0DF9	00 	.		nop
0DFA	00 	.		nop
0DFB	00 	.		nop
0DFC	00 	.		nop
0DFD	00 	.		nop
0DFE	00 	.		nop
0DFF	00 	.		nop
0E00	00 	.		nop
0E01	00 	.		nop
0E02	00 	.		nop
0E03	00 	.		nop
0E04	00 	.		nop
0E05	00 	.		nop
0E06	00 	.		nop
0E07	00 	.		nop
0E08	00 	.		nop
0E09	00 	.		nop
0E0A	00 	.		nop
0E0B	00 	.		nop
0E0C	00 	.		nop
0E0D	00 	.		nop
0E0E	00 	.		nop
0E0F	00 	.		nop
0E10	00 	.		nop
0E11	00 	.		nop
0E12	00 	.		nop
0E13	00 	.		nop
0E14	00 	.		nop
0E15	00 	.		nop
0E16	00 	.		nop
0E17	00 	.		nop
0E18	00 	.		nop
0E19	00 	.		nop
0E1A	00 	.		nop
0E1B	00 	.		nop
0E1C	00 	.		nop
0E1D	00 	.		nop
0E1E	00 	.		nop
0E1F	00 	.		nop
0E20	00 	.		nop
0E21	00 	.		nop
0E22	00 	.		nop
0E23	00 	.		nop
0E24	00 	.		nop
0E25	00 	.		nop
0E26	00 	.		nop
0E27	00 	.		nop
0E28	00 	.		nop
0E29	00 	.		nop
0E2A	00 	.		nop
0E2B	00 	.		nop
0E2C	00 	.		nop
0E2D	00 	.		nop
0E2E	00 	.		nop
0E2F	00 	.		nop
0E30	00 	.		nop
0E31	00 	.		nop
0E32	00 	.		nop
0E33	00 	.		nop
0E34	00 	.		nop
0E35	00 	.		nop
0E36	00 	.		nop
0E37	00 	.		nop
0E38	00 	.		nop
0E39	00 	.		nop
0E3A	00 	.		nop
0E3B	00 	.		nop
0E3C	00 	.		nop
0E3D	00 	.		nop
0E3E	00 	.		nop
0E3F	00 	.		nop
0E40	00 	.		nop
0E41	00 	.		nop
0E42	00 	.		nop
0E43	00 	.		nop
0E44	00 	.		nop
0E45	00 	.		nop
0E46	00 	.		nop
0E47	00 	.		nop
0E48	00 	.		nop
0E49	00 	.		nop
0E4A	00 	.		nop
0E4B	00 	.		nop
0E4C	00 	.		nop
0E4D	00 	.		nop
0E4E	00 	.		nop
0E4F	00 	.		nop
0E50	00 	.		nop
0E51	00 	.		nop
0E52	00 	.		nop
0E53	00 	.		nop
0E54	00 	.		nop
0E55	00 	.		nop
0E56	00 	.		nop
0E57	00 	.		nop
0E58	00 	.		nop
0E59	00 	.		nop
0E5A	00 	.		nop
0E5B	00 	.		nop
0E5C	00 	.		nop
0E5D	00 	.		nop
0E5E	00 	.		nop
0E5F	00 	.		nop
0E60	00 	.		nop
0E61	00 	.		nop
0E62	00 	.		nop
0E63	00 	.		nop
0E64	00 	.		nop
0E65	00 	.		nop
0E66	00 	.		nop
0E67	00 	.		nop
0E68	00 	.		nop
0E69	00 	.		nop
0E6A	00 	.		nop
0E6B	00 	.		nop
0E6C	00 	.		nop
0E6D	00 	.		nop
0E6E	00 	.		nop
0E6F	00 	.		nop
0E70	00 	.		nop
0E71	00 	.		nop
0E72	00 	.		nop
0E73	00 	.		nop
0E74	00 	.		nop
0E75	00 	.		nop
0E76	00 	.		nop
0E77	00 	.		nop
0E78	00 	.		nop
0E79	00 	.		nop
0E7A	00 	.		nop
0E7B	00 	.		nop
0E7C	00 	.		nop
0E7D	00 	.		nop
0E7E	00 	.		nop
0E7F	00 	.		nop
0E80	00 	.		nop
0E81	00 	.		nop
0E82	00 	.		nop
0E83	00 	.		nop
0E84	00 	.		nop
0E85	00 	.		nop
0E86	00 	.		nop
0E87	00 	.		nop
0E88	00 	.		nop
0E89	00 	.		nop
0E8A	00 	.		nop
0E8B	00 	.		nop
0E8C	00 	.		nop
0E8D	00 	.		nop
0E8E	00 	.		nop
0E8F	00 	.		nop
0E90	00 	.		nop
0E91	00 	.		nop
0E92	00 	.		nop
0E93	00 	.		nop
0E94	00 	.		nop
0E95	00 	.		nop
0E96	00 	.		nop
0E97	00 	.		nop
0E98	00 	.		nop
0E99	00 	.		nop
0E9A	00 	.		nop
0E9B	00 	.		nop
0E9C	00 	.		nop
0E9D	00 	.		nop
0E9E	00 	.		nop
0E9F	00 	.		nop
0EA0	00 	.		nop
0EA1	00 	.		nop
0EA2	00 	.		nop
0EA3	00 	.		nop
0EA4	00 	.		nop
0EA5	00 	.		nop
0EA6	00 	.		nop
0EA7	00 	.		nop
0EA8	00 	.		nop
0EA9	00 	.		nop
0EAA	00 	.		nop
0EAB	00 	.		nop
0EAC	00 	.		nop
0EAD	00 	.		nop
0EAE	00 	.		nop
0EAF	00 	.		nop
0EB0	00 	.		nop
0EB1	00 	.		nop
0EB2	00 	.		nop
0EB3	00 	.		nop
0EB4	00 	.		nop
0EB5	00 	.		nop
0EB6	00 	.		nop
0EB7	00 	.		nop
0EB8	00 	.		nop
0EB9	00 	.		nop
0EBA	00 	.		nop
0EBB	00 	.		nop
0EBC	00 	.		nop
0EBD	00 	.		nop
0EBE	00 	.		nop
0EBF	00 	.		nop
0EC0	00 	.		nop
0EC1	00 	.		nop
0EC2	00 	.		nop
0EC3	00 	.		nop
0EC4	00 	.		nop
0EC5	00 	.		nop
0EC6	00 	.		nop
0EC7	00 	.		nop
0EC8	00 	.		nop
0EC9	00 	.		nop
0ECA	00 	.		nop
0ECB	00 	.		nop
0ECC	00 	.		nop
0ECD	00 	.		nop
0ECE	00 	.		nop
0ECF	00 	.		nop
0ED0	00 	.		nop
0ED1	00 	.		nop
0ED2	00 	.		nop
0ED3	00 	.		nop
0ED4	00 	.		nop
0ED5	00 	.		nop
0ED6	00 	.		nop
0ED7	00 	.		nop
0ED8	00 	.		nop
0ED9	00 	.		nop
0EDA	00 	.		nop
0EDB	00 	.		nop
0EDC	00 	.		nop
0EDD	00 	.		nop
0EDE	00 	.		nop
0EDF	00 	.		nop
0EE0	00 	.		nop
0EE1	00 	.		nop
0EE2	00 	.		nop
0EE3	00 	.		nop
0EE4	00 	.		nop
0EE5	00 	.		nop
0EE6	00 	.		nop
0EE7	00 	.		nop
0EE8	00 	.		nop
0EE9	00 	.		nop
0EEA	00 	.		nop
0EEB	00 	.		nop
0EEC	00 	.		nop
0EED	00 	.		nop
0EEE	00 	.		nop
0EEF	00 	.		nop
0EF0	00 	.		nop
0EF1	00 	.		nop
0EF2	00 	.		nop
0EF3	00 	.		nop
0EF4	00 	.		nop
0EF5	00 	.		nop
0EF6	00 	.		nop
0EF7	00 	.		nop
0EF8	00 	.		nop
0EF9	00 	.		nop
0EFA	00 	.		nop
0EFB	00 	.		nop
0EFC	00 	.		nop
0EFD	00 	.		nop
0EFE	00 	.		nop
0EFF	00 	.		nop
0F00	00 	.		nop
0F01	00 	.		nop
0F02	00 	.		nop
0F03	00 	.		nop
0F04	00 	.		nop
0F05	00 	.		nop
0F06	00 	.		nop
0F07	00 	.		nop
0F08	00 	.		nop
0F09	00 	.		nop
0F0A	00 	.		nop
0F0B	00 	.		nop
0F0C	00 	.		nop
0F0D	00 	.		nop
0F0E	00 	.		nop
0F0F	00 	.		nop
0F10	00 	.		nop
0F11	00 	.		nop
0F12	00 	.		nop
0F13	00 	.		nop
0F14	00 	.		nop
0F15	00 	.		nop
0F16	00 	.		nop
0F17	00 	.		nop
0F18	00 	.		nop
0F19	00 	.		nop
0F1A	00 	.		nop
0F1B	00 	.		nop
0F1C	00 	.		nop
0F1D	00 	.		nop
0F1E	00 	.		nop
0F1F	00 	.		nop
0F20	00 	.		nop
0F21	00 	.		nop
0F22	00 	.		nop
0F23	00 	.		nop
0F24	00 	.		nop
0F25	00 	.		nop
0F26	00 	.		nop
0F27	00 	.		nop
0F28	00 	.		nop
0F29	00 	.		nop
0F2A	00 	.		nop
0F2B	00 	.		nop
0F2C	00 	.		nop
0F2D	00 	.		nop
0F2E	00 	.		nop
0F2F	00 	.		nop
0F30	00 	.		nop
0F31	00 	.		nop
0F32	00 	.		nop
0F33	00 	.		nop
0F34	00 	.		nop
0F35	00 	.		nop
0F36	00 	.		nop
0F37	00 	.		nop
0F38	00 	.		nop
0F39	00 	.		nop
0F3A	00 	.		nop
0F3B	00 	.		nop
0F3C	00 	.		nop
0F3D	00 	.		nop
0F3E	00 	.		nop
0F3F	00 	.		nop
0F40	00 	.		nop
0F41	00 	.		nop
0F42	00 	.		nop
0F43	00 	.		nop
0F44	00 	.		nop
0F45	00 	.		nop
0F46	00 	.		nop
0F47	00 	.		nop
0F48	00 	.		nop
0F49	00 	.		nop
0F4A	00 	.		nop
0F4B	00 	.		nop
0F4C	00 	.		nop
0F4D	00 	.		nop
0F4E	00 	.		nop
0F4F	00 	.		nop
0F50	00 	.		nop
0F51	00 	.		nop
0F52	00 	.		nop
0F53	00 	.		nop
0F54	00 	.		nop
0F55	00 	.		nop
0F56	00 	.		nop
0F57	00 	.		nop
0F58	00 	.		nop
0F59	00 	.		nop
0F5A	00 	.		nop
0F5B	00 	.		nop
0F5C	00 	.		nop
0F5D	00 	.		nop
0F5E	00 	.		nop
0F5F	00 	.		nop
0F60	00 	.		nop
0F61	00 	.		nop
0F62	00 	.		nop
0F63	00 	.		nop
0F64	00 	.		nop
0F65	00 	.		nop
0F66	00 	.		nop
0F67	00 	.		nop
0F68	00 	.		nop
0F69	00 	.		nop
0F6A	00 	.		nop
0F6B	00 	.		nop
0F6C	00 	.		nop
0F6D	00 	.		nop
0F6E	00 	.		nop
0F6F	00 	.		nop
0F70	00 	.		nop
0F71	00 	.		nop
0F72	00 	.		nop
0F73	00 	.		nop
0F74	00 	.		nop
0F75	00 	.		nop
0F76	00 	.		nop
0F77	00 	.		nop
0F78	00 	.		nop
0F79	00 	.		nop
0F7A	00 	.		nop
0F7B	00 	.		nop
0F7C	00 	.		nop
0F7D	00 	.		nop
0F7E	00 	.		nop
0F7F	00 	.		nop
0F80	00 	.		nop
0F81	00 	.		nop
0F82	00 	.		nop
0F83	00 	.		nop
0F84	00 	.		nop
0F85	00 	.		nop
0F86	00 	.		nop
0F87	00 	.		nop
0F88	00 	.		nop
0F89	00 	.		nop
0F8A	00 	.		nop
0F8B	00 	.		nop
0F8C	00 	.		nop
0F8D	00 	.		nop
0F8E	00 	.		nop
0F8F	00 	.		nop
0F90	00 	.		nop
0F91	00 	.		nop
0F92	00 	.		nop
0F93	00 	.		nop
0F94	00 	.		nop
0F95	00 	.		nop
0F96	00 	.		nop
0F97	00 	.		nop
0F98	00 	.		nop
0F99	00 	.		nop
0F9A	00 	.		nop
0F9B	00 	.		nop
0F9C	00 	.		nop
0F9D	00 	.		nop
0F9E	00 	.		nop
0F9F	00 	.		nop
0FA0	00 	.		nop
0FA1	00 	.		nop
0FA2	00 	.		nop
0FA3	00 	.		nop
0FA4	00 	.		nop
0FA5	00 	.		nop
0FA6	00 	.		nop
0FA7	00 	.		nop
0FA8	00 	.		nop
0FA9	00 	.		nop
0FAA	00 	.		nop
0FAB	00 	.		nop
0FAC	00 	.		nop
0FAD	00 	.		nop
0FAE	00 	.		nop
0FAF	00 	.		nop
0FB0	00 	.		nop
0FB1	00 	.		nop
0FB2	00 	.		nop
0FB3	00 	.		nop
0FB4	00 	.		nop
0FB5	00 	.		nop
0FB6	00 	.		nop
0FB7	00 	.		nop
0FB8	00 	.		nop
0FB9	00 	.		nop
0FBA	00 	.		nop
0FBB	00 	.		nop
0FBC	00 	.		nop
0FBD	00 	.		nop
0FBE	00 	.		nop
0FBF	00 	.		nop
0FC0	00 	.		nop
0FC1	00 	.		nop
0FC2	00 	.		nop
0FC3	00 	.		nop
0FC4	00 	.		nop
0FC5	00 	.		nop
0FC6	00 	.		nop
0FC7	00 	.		nop
0FC8	00 	.		nop
0FC9	00 	.		nop
0FCA	00 	.		nop
0FCB	00 	.		nop
0FCC	00 	.		nop
0FCD	00 	.		nop
0FCE	00 	.		nop
0FCF	00 	.		nop
0FD0	00 	.		nop
0FD1	00 	.		nop
0FD2	00 	.		nop
0FD3	00 	.		nop
0FD4	00 	.		nop
0FD5	00 	.		nop
0FD6	00 	.		nop
0FD7	00 	.		nop
0FD8	00 	.		nop
0FD9	00 	.		nop
0FDA	00 	.		nop
0FDB	00 	.		nop
0FDC	00 	.		nop
0FDD	00 	.		nop
0FDE	00 	.		nop
0FDF	00 	.		nop
0FE0	00 	.		nop
0FE1	00 	.		nop
0FE2	00 	.		nop
0FE3	00 	.		nop
0FE4	00 	.		nop
0FE5	00 	.		nop
0FE6	00 	.		nop
0FE7	00 	.		nop
0FE8	00 	.		nop
0FE9	00 	.		nop
0FEA	00 	.		nop
0FEB	00 	.		nop
0FEC	00 	.		nop
0FED	00 	.		nop
0FEE	00 	.		nop
0FEF	00 	.		nop
0FF0	00 	.		nop
0FF1	00 	.		nop
0FF2	00 	.		nop
0FF3	00 	.		nop
0FF4	00 	.		nop
0FF5	00 	.		nop
0FF6	00 	.		nop
0FF7	00 	.		nop
0FF8	00 	.		nop
0FF9	00 	.		nop
0FFA	00 	.		nop
0FFB	00 	.		nop
0FFC	00 	.		nop
0FFD	00 	.		nop
0FFE	00 	.		nop
0FFF	00 	.		nop
1000	00 	.		nop
1001	00 	.		nop
1002	00 	.		nop
1003	00 	.		nop
1004	00 	.	L_1004	nop
1005	00 	.		nop
1006	00 	.		nop
1007	00 	.		nop
1008	00 	.		nop
1009	00 	.		nop
100A	00 	.		nop
100B	00 	.		nop
100C	00 	.		nop
100D	00 	.		nop
100E	00 	.		nop
100F	00 	.		nop
1010	00 	.		nop
1011	00 	.		nop
1012	00 	.		nop
1013	00 	.		nop
1014	00 	.		nop
1015	00 	.		nop
1016	00 	.		nop
1017	00 	.		nop
1018	00 	.		nop
1019	00 	.		nop
101A	00 	.		nop
101B	00 	.		nop
101C	00 	.		nop
101D	00 	.		nop
101E	00 	.		nop
101F	00 	.		nop
1020	00 	.		nop
1021	00 	.		nop
1022	00 	.		nop
1023	00 	.		nop
1024	00 	.		nop
1025	00 	.		nop
1026	00 	.		nop
1027	00 	.		nop
1028	00 	.		nop
1029	00 	.		nop
102A	00 	.		nop
102B	00 	.		nop
102C	00 	.		nop
102D	00 	.		nop
102E	00 	.		nop
102F	00 	.		nop
1030	00 	.		nop
1031	00 	.		nop
1032	00 	.		nop
1033	00 	.		nop
1034	00 	.		nop
1035	00 	.		nop
1036	00 	.		nop
1037	00 	.		nop
1038	00 	.		nop
1039	00 	.		nop
103A	00 	.		nop
103B	00 	.		nop
103C	00 	.		nop
103D	00 	.		nop
103E	00 	.		nop
103F	00 	.		nop
1040	00 	.		nop
1041	00 	.		nop
1042	00 	.		nop
1043	00 	.		nop
1044	00 	.		nop
1045	00 	.		nop
1046	00 	.		nop
1047	00 	.		nop
1048	00 	.		nop
1049	00 	.		nop
104A	00 	.		nop
104B	00 	.		nop
104C	00 	.		nop
104D	00 	.		nop
104E	00 	.		nop
104F	00 	.		nop
1050	00 	.		nop
1051	00 	.		nop
1052	00 	.		nop
1053	00 	.		nop
1054	00 	.		nop
1055	00 	.		nop
1056	00 	.		nop
1057	00 	.		nop
1058	00 	.		nop
1059	00 	.		nop
105A	00 	.		nop
105B	00 	.		nop
105C	00 	.		nop
105D	00 	.		nop
105E	00 	.		nop
105F	00 	.		nop
1060	00 	.		nop
1061	00 	.		nop
1062	00 	.		nop
1063	00 	.		nop
1064	00 	.		nop
1065	00 	.		nop
1066	00 	.		nop
1067	00 	.		nop
1068	00 	.		nop
1069	00 	.		nop
106A	00 	.		nop
106B	00 	.		nop
106C	00 	.		nop
106D	00 	.		nop
106E	00 	.		nop
106F	00 	.		nop
1070	00 	.		nop
1071	00 	.		nop
1072	00 	.		nop
1073	00 	.		nop
1074	00 	.		nop
1075	00 	.		nop
1076	00 	.		nop
1077	00 	.		nop
1078	00 	.		nop
1079	00 	.		nop
107A	00 	.		nop
107B	00 	.		nop
107C	00 	.		nop
107D	00 	.		nop
107E	00 	.		nop
107F	00 	.		nop
1080	00 	.		nop
1081	00 	.		nop
1082	00 	.		nop
1083	00 	.		nop
1084	00 	.		nop
1085	00 	.		nop
1086	00 	.		nop
1087	00 	.		nop
1088	00 	.		nop
1089	00 	.		nop
108A	00 	.		nop
108B	00 	.		nop
108C	00 	.		nop
108D	00 	.		nop
108E	00 	.		nop
108F	00 	.		nop
1090	00 	.		nop
1091	00 	.		nop
1092	00 	.		nop
1093	00 	.		nop
1094	00 	.		nop
1095	00 	.		nop
1096	00 	.		nop
1097	00 	.		nop
1098	00 	.		nop
1099	00 	.		nop
109A	00 	.		nop
109B	00 	.		nop
109C	00 	.		nop
109D	00 	.		nop
109E	00 	.		nop
109F	00 	.		nop
10A0	00 	.		nop
10A1	00 	.		nop
10A2	00 	.		nop
10A3	00 	.		nop
10A4	00 	.		nop
10A5	00 	.		nop
10A6	00 	.		nop
10A7	00 	.		nop
10A8	00 	.		nop
10A9	00 	.		nop
10AA	00 	.		nop
10AB	00 	.		nop
10AC	00 	.		nop
10AD	00 	.		nop
10AE	00 	.		nop
10AF	00 	.		nop
10B0	00 	.		nop
10B1	00 	.		nop
10B2	00 	.		nop
10B3	00 	.		nop
10B4	00 	.		nop
10B5	00 	.		nop
10B6	00 	.		nop
10B7	00 	.		nop
10B8	00 	.		nop
10B9	00 	.		nop
10BA	00 	.		nop
10BB	00 	.		nop
10BC	00 	.		nop
10BD	00 	.		nop
10BE	00 	.		nop
10BF	00 	.		nop
10C0	00 	.		nop
10C1	00 	.		nop
10C2	00 	.		nop
10C3	00 	.		nop
10C4	00 	.		nop
10C5	00 	.		nop
10C6	00 	.		nop
10C7	00 	.		nop
10C8	00 	.		nop
10C9	00 	.		nop
10CA	00 	.		nop
10CB	00 	.		nop
10CC	00 	.		nop
10CD	00 	.		nop
10CE	00 	.		nop
10CF	00 	.		nop
10D0	00 	.		nop
10D1	00 	.		nop
10D2	00 	.		nop
10D3	00 	.		nop
10D4	00 	.		nop
10D5	00 	.		nop
10D6	00 	.		nop
10D7	00 	.		nop
10D8	00 	.		nop
10D9	00 	.		nop
10DA	00 	.		nop
10DB	00 	.		nop
10DC	00 	.		nop
10DD	00 	.		nop
10DE	00 	.		nop
10DF	00 	.		nop
10E0	00 	.		nop
10E1	00 	.		nop
10E2	00 	.		nop
10E3	00 	.		nop
10E4	00 	.		nop
10E5	00 	.		nop
10E6	00 	.		nop
10E7	00 	.		nop
10E8	00 	.		nop
10E9	00 	.		nop
10EA	00 	.		nop
10EB	00 	.		nop
10EC	00 	.		nop
10ED	00 	.		nop
10EE	00 	.		nop
10EF	00 	.		nop
10F0	00 	.		nop
10F1	00 	.		nop
10F2	00 	.		nop
10F3	00 	.		nop
10F4	00 	.		nop
10F5	00 	.		nop
10F6	00 	.		nop
10F7	00 	.		nop
10F8	00 	.		nop
10F9	00 	.		nop
10FA	00 	.		nop
10FB	00 	.		nop
10FC	00 	.		nop
10FD	00 	.		nop
10FE	00 	.		nop
10FF	00 	.		nop
1100	00 	.		nop
1101	00 	.		nop
1102	00 	.		nop
1103	00 	.		nop
1104	00 	.		nop
1105	00 	.		nop
1106	00 	.		nop
1107	00 	.		nop
1108	00 	.		nop
1109	00 	.		nop
110A	00 	.		nop
110B	00 	.		nop
110C	00 	.		nop
110D	00 	.		nop
110E	00 	.		nop
110F	00 	.		nop
1110	00 	.		nop
1111	00 	.		nop
1112	00 	.		nop
1113	00 	.		nop
1114	00 	.		nop
1115	00 	.		nop
1116	00 	.		nop
1117	00 	.		nop
1118	00 	.		nop
1119	00 	.		nop
111A	00 	.		nop
111B	00 	.		nop
111C	00 	.		nop
111D	00 	.		nop
111E	00 	.		nop
111F	00 	.		nop
1120	00 	.		nop
1121	00 	.		nop
1122	00 	.		nop
1123	00 	.		nop
1124	00 	.		nop
1125	00 	.		nop
1126	00 	.		nop
1127	00 	.		nop
1128	00 	.		nop
1129	00 	.		nop
112A	00 	.		nop
112B	00 	.		nop
112C	00 	.		nop
112D	00 	.		nop
112E	00 	.		nop
112F	00 	.		nop
1130	00 	.		nop
1131	00 	.		nop
1132	00 	.		nop
1133	00 	.		nop
1134	00 	.		nop
1135	00 	.		nop
1136	00 	.		nop
1137	00 	.		nop
1138	00 	.		nop
1139	00 	.		nop
113A	00 	.		nop
113B	00 	.		nop
113C	00 	.		nop
113D	00 	.		nop
113E	00 	.		nop
113F	00 	.		nop
1140	00 	.		nop
1141	00 	.		nop
1142	00 	.		nop
1143	00 	.		nop
1144	00 	.		nop
1145	00 	.		nop
1146	00 	.		nop
1147	00 	.		nop
1148	00 	.		nop
1149	00 	.		nop
114A	00 	.		nop
114B	00 	.		nop
114C	00 	.		nop
114D	00 	.		nop
114E	00 	.		nop
114F	00 	.		nop
1150	00 	.		nop
1151	00 	.		nop
1152	00 	.		nop
1153	00 	.		nop
1154	00 	.		nop
1155	00 	.		nop
1156	00 	.		nop
1157	00 	.		nop
1158	00 	.		nop
1159	00 	.		nop
115A	00 	.		nop
115B	00 	.		nop
115C	00 	.		nop
115D	00 	.		nop
115E	00 	.		nop
115F	00 	.		nop
1160	00 	.		nop
1161	00 	.		nop
1162	00 	.		nop
1163	00 	.		nop
1164	00 	.		nop
1165	00 	.		nop
1166	00 	.		nop
1167	00 	.		nop
1168	00 	.		nop
1169	00 	.		nop
116A	00 	.		nop
116B	00 	.		nop
116C	00 	.		nop
116D	00 	.		nop
116E	00 	.		nop
116F	00 	.		nop
1170	00 	.		nop
1171	00 	.		nop
1172	00 	.		nop
1173	00 	.		nop
1174	00 	.		nop
1175	00 	.		nop
1176	00 	.		nop
1177	00 	.		nop
1178	00 	.		nop
1179	00 	.		nop
117A	00 	.		nop
117B	00 	.		nop
117C	00 	.		nop
117D	00 	.		nop
117E	00 	.		nop
117F	00 	.		nop
1180	00 	.		nop
1181	00 	.		nop
1182	00 	.		nop
1183	00 	.		nop
1184	00 	.		nop
1185	00 	.		nop
1186	00 	.		nop
1187	00 	.		nop
1188	00 	.		nop
1189	00 	.		nop
118A	00 	.		nop
118B	00 	.		nop
118C	00 	.		nop
118D	00 	.		nop
118E	00 	.		nop
118F	00 	.		nop
1190	00 	.		nop
1191	00 	.		nop
1192	00 	.		nop
1193	00 	.		nop
1194	00 	.		nop
1195	00 	.		nop
1196	00 	.		nop
1197	00 	.		nop
1198	00 	.		nop
1199	00 	.		nop
119A	00 	.		nop
119B	00 	.		nop
119C	00 	.		nop
119D	00 	.		nop
119E	00 	.		nop
119F	00 	.		nop
11A0	00 	.		nop
11A1	00 	.		nop
11A2	00 	.		nop
11A3	00 	.		nop
11A4	00 	.		nop
11A5	00 	.		nop
11A6	00 	.		nop
11A7	00 	.		nop
11A8	00 	.		nop
11A9	00 	.		nop
11AA	00 	.		nop
11AB	00 	.		nop
11AC	00 	.		nop
11AD	00 	.		nop
11AE	00 	.		nop
11AF	00 	.		nop
11B0	00 	.		nop
11B1	00 	.		nop
11B2	00 	.		nop
11B3	00 	.		nop
11B4	00 	.		nop
11B5	00 	.		nop
11B6	00 	.		nop
11B7	00 	.		nop
11B8	00 	.		nop
11B9	00 	.		nop
11BA	00 	.		nop
11BB	00 	.		nop
11BC	00 	.		nop
11BD	00 	.		nop
11BE	00 	.		nop
11BF	00 	.		nop
11C0	00 	.		nop
11C1	00 	.		nop
11C2	00 	.		nop
11C3	00 	.		nop
11C4	00 	.		nop
11C5	00 	.		nop
11C6	00 	.		nop
11C7	00 	.		nop
11C8	00 	.		nop
11C9	00 	.		nop
11CA	00 	.		nop
11CB	00 	.		nop
11CC	00 	.		nop
11CD	00 	.		nop
11CE	00 	.		nop
11CF	00 	.		nop
11D0	00 	.		nop
11D1	00 	.		nop
11D2	00 	.		nop
11D3	00 	.		nop
11D4	00 	.		nop
11D5	00 	.		nop
11D6	00 	.		nop
11D7	00 	.		nop
11D8	00 	.		nop
11D9	00 	.		nop
11DA	00 	.		nop
11DB	00 	.		nop
11DC	00 	.		nop
11DD	00 	.		nop
11DE	00 	.		nop
11DF	00 	.		nop
11E0	00 	.		nop
11E1	00 	.		nop
11E2	00 	.		nop
11E3	00 	.		nop
11E4	00 	.		nop
11E5	00 	.		nop
11E6	00 	.		nop
11E7	00 	.		nop
11E8	00 	.		nop
11E9	00 	.		nop
11EA	00 	.		nop
11EB	00 	.		nop
11EC	00 	.		nop
11ED	00 	.		nop
11EE	00 	.		nop
11EF	00 	.		nop
11F0	00 	.		nop
11F1	00 	.		nop
11F2	00 	.		nop
11F3	00 	.		nop
11F4	00 	.		nop
11F5	00 	.		nop
11F6	00 	.		nop
11F7	00 	.		nop
11F8	00 	.		nop
11F9	00 	.		nop
11FA	00 	.		nop
11FB	00 	.		nop
11FC	00 	.		nop
11FD	00 	.		nop
11FE	00 	.		nop
11FF	00 	.		nop
1200	00 	.		nop
1201	00 	.		nop
1202	00 	.		nop
1203	00 	.		nop
1204	00 	.		nop
1205	00 	.		nop
1206	00 	.		nop
1207	00 	.		nop
1208	00 	.		nop
1209	00 	.		nop
120A	00 	.		nop
120B	00 	.		nop
120C	00 	.		nop
120D	00 	.		nop
120E	00 	.		nop
120F	00 	.		nop
1210	00 	.		nop
1211	00 	.		nop
1212	00 	.		nop
1213	00 	.		nop
1214	00 	.		nop
1215	00 	.		nop
1216	00 	.		nop
1217	00 	.		nop
1218	00 	.		nop
1219	00 	.		nop
121A	00 	.		nop
121B	00 	.		nop
121C	00 	.		nop
121D	00 	.		nop
121E	00 	.		nop
121F	00 	.		nop
1220	00 	.		nop
1221	00 	.		nop
1222	00 	.		nop
1223	00 	.		nop
1224	00 	.		nop
1225	00 	.		nop
1226	00 	.		nop
1227	00 	.		nop
1228	00 	.		nop
1229	00 	.		nop
122A	00 	.		nop
122B	00 	.		nop
122C	00 	.		nop
122D	00 	.		nop
122E	00 	.		nop
122F	00 	.		nop
1230	00 	.		nop
1231	00 	.		nop
1232	00 	.		nop
1233	00 	.		nop
1234	00 	.		nop
1235	00 	.		nop
1236	00 	.		nop
1237	00 	.		nop
1238	00 	.		nop
1239	00 	.		nop
123A	00 	.		nop
123B	00 	.		nop
123C	00 	.		nop
123D	00 	.		nop
123E	00 	.		nop
123F	00 	.		nop
1240	00 	.		nop
1241	00 	.		nop
1242	00 	.		nop
1243	00 	.		nop
1244	00 	.		nop
1245	00 	.		nop
1246	00 	.		nop
1247	00 	.		nop
1248	00 	.		nop
1249	00 	.		nop
124A	00 	.		nop
124B	00 	.		nop
124C	00 	.		nop
124D	00 	.		nop
124E	00 	.		nop
124F	00 	.		nop
1250	00 	.		nop
1251	00 	.		nop
1252	00 	.		nop
1253	00 	.		nop
1254	00 	.		nop
1255	00 	.		nop
1256	00 	.		nop
1257	00 	.		nop
1258	00 	.		nop
1259	00 	.		nop
125A	00 	.		nop
125B	00 	.		nop
125C	00 	.		nop
125D	00 	.		nop
125E	00 	.		nop
125F	00 	.		nop
1260	00 	.		nop
1261	00 	.		nop
1262	00 	.		nop
1263	00 	.		nop
1264	00 	.		nop
1265	00 	.		nop
1266	00 	.		nop
1267	00 	.		nop
1268	00 	.		nop
1269	00 	.		nop
126A	00 	.		nop
126B	00 	.		nop
126C	00 	.		nop
126D	00 	.		nop
126E	00 	.		nop
126F	00 	.		nop
1270	00 	.		nop
1271	00 	.		nop
1272	00 	.		nop
1273	00 	.		nop
1274	00 	.		nop
1275	00 	.		nop
1276	00 	.		nop
1277	00 	.		nop
1278	00 	.		nop
1279	00 	.		nop
127A	00 	.		nop
127B	00 	.		nop
127C	00 	.		nop
127D	00 	.		nop
127E	00 	.		nop
127F	00 	.		nop
1280	00 	.		nop
1281	00 	.		nop
1282	00 	.		nop
1283	00 	.		nop
1284	00 	.		nop
1285	00 	.		nop
1286	00 	.		nop
1287	00 	.		nop
1288	00 	.		nop
1289	00 	.		nop
128A	00 	.		nop
128B	00 	.		nop
128C	00 	.		nop
128D	00 	.		nop
128E	00 	.		nop
128F	00 	.		nop
1290	00 	.		nop
1291	00 	.		nop
1292	00 	.		nop
1293	00 	.		nop
1294	00 	.		nop
1295	00 	.		nop
1296	00 	.		nop
1297	00 	.		nop
1298	00 	.		nop
1299	00 	.		nop
129A	00 	.		nop
129B	00 	.		nop
129C	00 	.		nop
129D	00 	.		nop
129E	00 	.		nop
129F	00 	.		nop
12A0	00 	.		nop
12A1	00 	.		nop
12A2	00 	.		nop
12A3	00 	.		nop
12A4	00 	.		nop
12A5	00 	.		nop
12A6	00 	.		nop
12A7	00 	.		nop
12A8	00 	.		nop
12A9	00 	.		nop
12AA	00 	.		nop
12AB	00 	.		nop
12AC	00 	.		nop
12AD	00 	.		nop
12AE	00 	.		nop
12AF	00 	.		nop
12B0	00 	.		nop
12B1	00 	.		nop
12B2	00 	.		nop
12B3	00 	.		nop
12B4	00 	.		nop
12B5	00 	.		nop
12B6	00 	.		nop
12B7	00 	.		nop
12B8	00 	.		nop
12B9	00 	.		nop
12BA	00 	.		nop
12BB	00 	.		nop
12BC	00 	.		nop
12BD	00 	.		nop
12BE	00 	.		nop
12BF	00 	.		nop
12C0	00 	.		nop
12C1	00 	.		nop
12C2	00 	.		nop
12C3	00 	.		nop
12C4	00 	.		nop
12C5	00 	.		nop
12C6	00 	.		nop
12C7	00 	.		nop
12C8	00 	.		nop
12C9	00 	.		nop
12CA	00 	.		nop
12CB	00 	.		nop
12CC	00 	.		nop
12CD	00 	.		nop
12CE	00 	.		nop
12CF	00 	.		nop
12D0	00 	.		nop
12D1	00 	.		nop
12D2	00 	.		nop
12D3	00 	.		nop
12D4	00 	.		nop
12D5	00 	.		nop
12D6	00 	.		nop
12D7	00 	.		nop
12D8	00 	.		nop
12D9	00 	.		nop
12DA	00 	.		nop
12DB	00 	.		nop
12DC	00 	.		nop
12DD	00 	.		nop
12DE	00 	.		nop
12DF	00 	.		nop
12E0	00 	.		nop
12E1	00 	.		nop
12E2	00 	.		nop
12E3	00 	.		nop
12E4	00 	.		nop
12E5	00 	.		nop
12E6	00 	.		nop
12E7	00 	.		nop
12E8	00 	.		nop
12E9	00 	.		nop
12EA	00 	.		nop
12EB	00 	.		nop
12EC	00 	.		nop
12ED	00 	.		nop
12EE	00 	.		nop
12EF	00 	.		nop
12F0	00 	.		nop
12F1	00 	.		nop
12F2	00 	.		nop
12F3	00 	.		nop
12F4	00 	.		nop
12F5	00 	.		nop
12F6	00 	.		nop
12F7	00 	.		nop
12F8	00 	.		nop
12F9	00 	.		nop
12FA	00 	.		nop
12FB	00 	.		nop
12FC	00 	.		nop
12FD	00 	.		nop
12FE	00 	.		nop
12FF	00 	.		nop
1300	00 	.		nop
1301	00 	.		nop
1302	00 	.		nop
1303	00 	.		nop
1304	00 	.		nop
1305	00 	.		nop
1306	00 	.		nop
1307	00 	.		nop
1308	00 	.		nop
1309	00 	.		nop
130A	00 	.		nop
130B	00 	.		nop
130C	00 	.		nop
130D	00 	.		nop
130E	00 	.		nop
130F	00 	.		nop
1310	00 	.		nop
1311	00 	.		nop
1312	00 	.		nop
1313	00 	.		nop
1314	00 	.		nop
1315	00 	.		nop
1316	00 	.		nop
1317	00 	.		nop
1318	00 	.		nop
1319	00 	.		nop
131A	00 	.		nop
131B	00 	.		nop
131C	00 	.		nop
131D	00 	.		nop
131E	00 	.		nop
131F	00 	.		nop
1320	00 	.		nop
1321	00 	.		nop
1322	00 	.		nop
1323	00 	.		nop
1324	00 	.		nop
1325	00 	.		nop
1326	00 	.		nop
1327	00 	.		nop
1328	00 	.		nop
1329	00 	.		nop
132A	00 	.		nop
132B	00 	.		nop
132C	00 	.		nop
132D	00 	.		nop
132E	00 	.		nop
132F	00 	.		nop
1330	00 	.		nop
1331	00 	.		nop
1332	00 	.		nop
1333	00 	.		nop
1334	00 	.		nop
1335	00 	.		nop
1336	00 	.		nop
1337	00 	.		nop
1338	00 	.		nop
1339	00 	.		nop
133A	00 	.		nop
133B	00 	.		nop
133C	00 	.		nop
133D	00 	.		nop
133E	00 	.		nop
133F	00 	.		nop
1340	00 	.		nop
1341	00 	.		nop
1342	00 	.		nop
1343	00 	.		nop
1344	00 	.		nop
1345	00 	.		nop
1346	00 	.		nop
1347	00 	.		nop
1348	00 	.		nop
1349	00 	.		nop
134A	00 	.		nop
134B	00 	.		nop
134C	00 	.		nop
134D	00 	.		nop
134E	00 	.		nop
134F	00 	.		nop
1350	00 	.		nop
1351	00 	.		nop
1352	00 	.		nop
1353	00 	.		nop
1354	00 	.		nop
1355	00 	.		nop
1356	00 	.		nop
1357	00 	.		nop
1358	00 	.		nop
1359	00 	.		nop
135A	00 	.		nop
135B	00 	.		nop
135C	00 	.		nop
135D	00 	.		nop
135E	00 	.		nop
135F	00 	.		nop
1360	00 	.		nop
1361	00 	.		nop
1362	00 	.		nop
1363	00 	.		nop
1364	00 	.		nop
1365	00 	.		nop
1366	00 	.		nop
1367	00 	.		nop
1368	00 	.		nop
1369	00 	.		nop
136A	00 	.		nop
136B	00 	.		nop
136C	00 	.		nop
136D	00 	.		nop
136E	00 	.		nop
136F	00 	.		nop
1370	00 	.		nop
1371	00 	.		nop
1372	00 	.		nop
1373	00 	.		nop
1374	00 	.		nop
1375	00 	.		nop
1376	00 	.		nop
1377	00 	.		nop
1378	00 	.		nop
1379	00 	.		nop
137A	00 	.		nop
137B	00 	.		nop
137C	00 	.		nop
137D	00 	.		nop
137E	00 	.		nop
137F	00 	.		nop
1380	00 	.		nop
1381	00 	.		nop
1382	00 	.		nop
1383	00 	.		nop
1384	00 	.		nop
1385	00 	.		nop
1386	00 	.		nop
1387	00 	.		nop
1388	00 	.		nop
1389	00 	.		nop
138A	00 	.		nop
138B	00 	.		nop
138C	00 	.		nop
138D	00 	.		nop
138E	00 	.		nop
138F	00 	.		nop
1390	00 	.		nop
1391	00 	.		nop
1392	00 	.		nop
1393	00 	.		nop
1394	00 	.		nop
1395	00 	.		nop
1396	00 	.		nop
1397	00 	.		nop
1398	00 	.		nop
1399	00 	.		nop
139A	00 	.		nop
139B	00 	.		nop
139C	00 	.		nop
139D	00 	.		nop
139E	00 	.		nop
139F	00 	.		nop
13A0	00 	.		nop
13A1	00 	.		nop
13A2	00 	.		nop
13A3	00 	.		nop
13A4	00 	.		nop
13A5	00 	.		nop
13A6	00 	.		nop
13A7	00 	.		nop
13A8	00 	.		nop
13A9	00 	.		nop
13AA	00 	.		nop
13AB	00 	.		nop
13AC	00 	.		nop
13AD	00 	.		nop
13AE	00 	.		nop
13AF	00 	.		nop
13B0	00 	.		nop
13B1	00 	.		nop
13B2	00 	.		nop
13B3	00 	.		nop
13B4	00 	.		nop
13B5	00 	.		nop
13B6	00 	.		nop
13B7	00 	.		nop
13B8	00 	.		nop
13B9	00 	.		nop
13BA	00 	.		nop
13BB	00 	.		nop
13BC	00 	.		nop
13BD	00 	.		nop
13BE	00 	.		nop
13BF	00 	.		nop
13C0	00 	.		nop
13C1	00 	.		nop
13C2	00 	.		nop
13C3	00 	.		nop
13C4	00 	.		nop
13C5	00 	.		nop
13C6	00 	.		nop
13C7	00 	.		nop
13C8	00 	.		nop
13C9	00 	.		nop
13CA	00 	.		nop
13CB	00 	.		nop
13CC	00 	.		nop
13CD	00 	.		nop
13CE	00 	.		nop
13CF	00 	.		nop
13D0	00 	.		nop
13D1	00 	.		nop
13D2	00 	.		nop
13D3	00 	.		nop
13D4	00 	.		nop
13D5	00 	.		nop
13D6	00 	.		nop
13D7	00 	.		nop
13D8	00 	.		nop
13D9	00 	.		nop
13DA	00 	.		nop
13DB	00 	.		nop
13DC	00 	.		nop
13DD	00 	.		nop
13DE	00 	.		nop
13DF	00 	.		nop
13E0	00 	.		nop
13E1	00 	.		nop
13E2	00 	.		nop
13E3	00 	.		nop
13E4	00 	.		nop
13E5	00 	.		nop
13E6	00 	.		nop
13E7	00 	.		nop
13E8	00 	.		nop
13E9	00 	.		nop
13EA	00 	.		nop
13EB	00 	.		nop
13EC	00 	.		nop
13ED	00 	.		nop
13EE	00 	.		nop
13EF	00 	.		nop
13F0	00 	.		nop
13F1	00 	.		nop
13F2	00 	.		nop
13F3	00 	.		nop
13F4	00 	.		nop
13F5	00 	.		nop
13F6	00 	.		nop
13F7	00 	.		nop
13F8	00 	.		nop
13F9	00 	.		nop
13FA	00 	.		nop
13FB	00 	.		nop
13FC	00 	.		nop
13FD	00 	.		nop
13FE	00 	.		nop
13FF	00 	.		nop
1400	00 	.	L_1400	nop
1401	CD 1474	Mt.		call	L_1474
1404	00 	.		nop
1405	C5 	E	L_1405	push	bc
1406	E5 	e		push	hl
1407	1A 	.		ldax	de
1408	D3 04	S.		out	&H04
140A	DB 03	[.		in	&H03
140C	B6 	6		ora	m
140D	77 	w		mov	m,a
140E	23 	#		inx	hl
140F	13 	.		inx	de
1410	AF 	/		xra	a
1411	D3 04	S.		out	&H04
1413	DB 03	[.		in	&H03
1415	B6 	6		ora	m
1416	77 	w		mov	m,a
1417	E1 	a		pop	hl
1418	01 0020	. .		lxi	bc,&H0020
141B	09 	.		dad	bc
141C	C1 	A		pop	bc
141D	05 	.		dcr	b
141E	C2 1405	B..		jnz	L_1405
1421	C9 	I		ret
1422	00 	.		nop
1423	00 	.		nop
1424	CD 1474	Mt.	L_1424	call	L_1474
1427	C5 	E	L_1427	push	bc
1428	E5 	e		push	hl
1429	AF 	/		xra	a
142A	77 	w		mov	m,a
142B	23 	#		inx	hl
142C	77 	w		mov	m,a
142D	23 	#		inx	hl
142E	E1 	a		pop	hl
142F	01 0020	. .		lxi	bc,&H0020
1432	09 	.		dad	bc
1433	C1 	A		pop	bc
1434	05 	.		dcr	b
1435	C2 1427	B'.		jnz	L_1427
1438	C9 	I		ret
1439	C5 	E	L_1439	push	bc
143A	1A 	.		ldax	de
143B	77 	w		mov	m,a
143C	13 	.		inx	de
143D	01 0020	. .		lxi	bc,&H0020
1440	09 	.		dad	bc
1441	C1 	A		pop	bc
1442	05 	.		dcr	b
1443	C2 1439	B9.		jnz	L_1439
1446	C9 	I		ret
1447	00 	.		nop
1448	00 	.		nop
1449	00 	.		nop
144A	00 	.		nop
144B	00 	.		nop
144C	00 	.		nop
144D	00 	.		nop
144E	00 	.		nop
144F	00 	.		nop
1450	00 	.		nop
1451	00 	.		nop
1452	CD 1474	Mt.	L_1452	call	L_1474
1455	C5 	E	L_1455	push	bc
1456	E5 	e		push	hl
1457	1A 	.		ldax	de
1458	D3 04	S.		out	&H04
145A	DB 03	[.		in	&H03
145C	2F 	/		cma
145D	A6 	&		ana	m
145E	77 	w		mov	m,a
145F	23 	#		inx	hl
1460	13 	.		inx	de
1461	AF 	/		xra	a
1462	D3 04	S.		out	&H04
1464	DB 03	[.		in	&H03
1466	2F 	/		cma
1467	A6 	&		ana	m
1468	77 	w		mov	m,a
1469	E1 	a		pop	hl
146A	01 0020	. .		lxi	bc,&H0020
146D	09 	.		dad	bc
146E	C1 	A		pop	bc
146F	05 	.		dcr	b
1470	C2 1455	BU.		jnz	L_1455
1473	C9 	I		ret
1474	7D 	}	L_1474	mov	a,l
1475	E6 07	f.		ani	&H07
1477	D3 02	S.		out	&H02
1479	C3 1A47	CG.		jmp	L_1A47
147C	C5 	E	L_147C	push	bc
147D	E5 	e		push	hl
147E	7E 	~	L_147E	mov	a,m
147F	12 	.		stax	de
1480	13 	.		inx	de
1481	23 	#		inx	hl
1482	0D 	.		dcr	c
1483	C2 147E	B~.		jnz	L_147E
1486	E1 	a		pop	hl
1487	01 0020	. .		lxi	bc,&H0020
148A	09 	.		dad	bc
148B	C1 	A		pop	bc
148C	05 	.		dcr	b
148D	C2 147C	B|.		jnz	L_147C
1490	C9 	I		ret
1491	CD 1474	Mt.	L_1491	call	L_1474
1494	AF 	/		xra	a
1495	32 2061	2a 		sta	&H2061
1498	C5 	E	L_1498	push	bc
1499	E5 	e		push	hl
149A	1A 	.		ldax	de
149B	D3 04	S.		out	&H04
149D	DB 03	[.		in	&H03
149F	F5 	u		push	psw
14A0	A6 	&		ana	m
14A1	CA 14A9	J).		jz	L_14A9
14A4	3E 01	>.		mvi	a,&H01
14A6	32 2061	2a 		sta	&H2061
14A9	F1 	q	L_14A9	pop	psw
14AA	B6 	6		ora	m
14AB	77 	w		mov	m,a
14AC	23 	#		inx	hl
14AD	13 	.		inx	de
14AE	AF 	/		xra	a
14AF	D3 04	S.		out	&H04
14B1	DB 03	[.		in	&H03
14B3	F5 	u		push	psw
14B4	A6 	&		ana	m
14B5	CA 14BD	J=.		jz	L_14BD
14B8	3E 01	>.		mvi	a,&H01
14BA	32 2061	2a 		sta	&H2061
14BD	F1 	q	L_14BD	pop	psw
14BE	B6 	6		ora	m
14BF	77 	w		mov	m,a
14C0	E1 	a		pop	hl
14C1	01 0020	.  		lxi	bc,&H0020
14C4	09 	.		dad	bc
14C5	C1 	A		pop	bc
14C6	05 	.		dcr	b
14C7	C2 1498	B..		jnz	L_1498
14CA	C9 	I		ret
14CB	AF 	/	L_14CB	xra	a
14CC	C5 	E	L_14CC	push	bc
14CD	77 	w		mov	m,a
14CE	01 0020	. .		lxi	bc,&H0020
14D1	09 	.		dad	bc
14D2	C1 	A		pop	bc
14D3	05 	.		dcr	b
14D4	C2 14CC	BL.		jnz	L_14CC
14D7	C9 	I		ret
14D8	3A 2025	:% 	L_14D8	lda	&H2025
14DB	FE 05	~.		cmpi	&H05
14DD	C8 	H		rz
14DE	FE 02	~.		cmpi	&H02
14E0	C0 	@		rnz
14E1	3A 2029	:) 		lda	&H2029
14E4	FE D8	~X		cmpi	&HD8
14E6	47 	G		mov	b,a
14E7	D2 1530	R0.		jnc	L_1530
14EA	3A 2002	:. 		lda	&H2002
14ED	A7 	'		ana	a
14EE	C8 	H		rz
14EF	78 	x		mov	a,b
14F0	FE CE	~N		cmpi	&HCE
14F2	D2 1579	Ry.		jnc	L_1579
14F5	C6 06	F.		adi	&H06
14F7	47 	G		mov	b,a
14F8	3A 2009	:. 		lda	&H2009
14FB	FE 90	~.		cmpi	&H90
14FD	D2 1504	R..		jnc	L_1504
1500	B8 	8		cmp	b
1501	D2 1530	R0.		jnc	L_1530
1504	68 	h	L_1504	mov	l,b
1505	CD 1562	Mb.		call	L_1562
1508	3A 202A	:* 		lda	&H202A
150B	67 	g		mov	h,a
150C	CD 156F	Mo.		call	L_156F
150F	22 2064	"d 		shld	&H2064
1512	3E 05	>.		mvi	a,&H05
1514	32 2025	2% 		sta	&H2025
1517	CD 1581	M..		call	L_1581
151A	7E 	~		mov	a,m
151B	A7 	'		ana	a
151C	CA 1530	J0.		jz	L_1530
151F	36 00	6.		mvi	m,&H00
1521	CD 0A5F	M_.		call	L_0A5F
1524	CD 1A3B	M;.		call	L_1A3B
1527	CD 15D3	MS.		call	L_15D3
152A	3E 10	>.		mvi	a,&H10
152C	32 2003	2. 		sta	&H2003
152F	C9 	I		ret
1530	3E 03	>.	L_1530	mvi	a,&H03
1532	32 2025	2% 		sta	&H2025
1535	C3 154A	CJ.		jmp	L_154A
1538	21 2003	!..	L_1538	lxi	hl,&H2003
153B	35 	5		dcr	m
153C	C0 	@		rnz
153D	2A 2064	*d 		lhld	&H2064
1540	06 10	..		mvi	b,&H10
1542	CD 1424	M$.		call	L_1424
1545	3E 04	>.	L_1545	mvi	a,&H04
1547	32 2025	2% 		sta	&H2025
154A	AF 	/	L_154A	xra	a
154B	32 2002	2. 		sta	&H2002
154E	06 F7	.w		mvi	b,&HF7
1550	C3 19DC	C\.		jmp	L_19DC
1553	00 	.		nop
1554	0E 00	..	L_1554	mvi	c,&H00
1556	BC 	<		cmp	h
1557	D4 1590	T..		cnc	L_1590
155A	BC 	<	L_155A	cmp	h
155B	D0 	P		rnc
155C	C6 10	F.		adi	&H10
155E	0C 	.		inr	c
155F	C3 155A	CZ.		jmp	L_155A
1562	3A 2009	:. 	L_1562	lda	&H2009
1565	65 	e		mov	h,l
1566	CD 1554	MT.		call	L_1554
1569	41 	A		mov	b,c
156A	05 	.		dcr	b
156B	DE 10	^.		sbi	&H10
156D	6F 	o		mov	l,a
156E	C9 	I		ret
156F	3A 200A	:. 	L_156F	lda	&H200A
1572	CD 1554	MT.		call	L_1554
1575	DE 10	^.		sbi	&H10
1577	67 	g		mov	h,a
1578	C9 	I		ret
1579	3E 01	>.	L_1579	mvi	a,&H01
157B	32 2085	2. 		sta	&H2085
157E	C3 1545	CE.		jmp	L_1545
1581	78 	x	L_1581	mov	a,b
1582	07 	.		rlc
1583	07 	.		rlc
1584	07 	.		rlc
1585	80 	.		add	b
1586	80 	.		add	b
1587	80 	.		add	b
1588	81 	.		add	c
1589	3D 	=		dcr	a
158A	6F 	o		mov	l,a
158B	3A 2067	:g 		lda	&H2067
158E	67 	g		mov	h,a
158F	C9 	I		ret
1590	0C 	.	L_1590	inr	c
1591	C6 10	F.		adi	&H10
1593	FA 1590	z..		jm	L_1590
1596	C9 	I		ret
1597	3A 200D	:. 	L_1597	lda	&H200D
159A	A7 	'		ana	a
159B	C2 15B7	B7.		jnz	L_15B7
159E	21 3EA4	!$.		lxi	hl,&H3EA4
15A1	CD 15C5	ME.		call	L_15C5
15A4	D0 	P		rnc
15A5	06 FE	.~		mvi	b,&HFE
15A7	3E 01	>.		mvi	a,&H01
15A9	32 200D	2. 	L_15A9	sta	&H200D
15AC	78 	x		mov	a,b
15AD	32 2008	2. 		sta	&H2008
15B0	3A 200E	:. 		lda	&H200E
15B3	32 2007	2. 		sta	&H2007
15B6	C9 	I		ret
15B7	21 2524	!$ 	L_15B7	lxi	hl,&H2524
15BA	CD 15C5	ME.		call	L_15C5
15BD	D0 	P		rnc
15BE	CD 18F1	Mq.		call	L_18F1
15C1	AF 	/		xra	a
15C2	C3 15A9	C).		jmp	L_15A9
15C5	06 17	..	L_15C5	mvi	b,&H17
15C7	7E 	~	L_15C7	mov	a,m
15C8	A7 	'		ana	a
15C9	C2 166B	Bk.		jnz	L_166B
15CC	23 	#		inx	hl
15CD	05 	.		dcr	b
15CE	C2 15C7	BG.		jnz	L_15C7
15D1	C9 	I		ret
15D2	00 	.		nop
15D3	CD 1474	Mt.	L_15D3	call	L_1474
15D6	E5 	e		push	hl
15D7	C5 	E	L_15D7	push	bc
15D8	E5 	e		push	hl
15D9	1A 	.		ldax	de
15DA	D3 04	S.		out	&H04
15DC	DB 03	[.		in	&H03
15DE	77 	w		mov	m,a
15DF	23 	#		inx	hl
15E0	13 	.		inx	de
15E1	AF 	/		xra	a
15E2	D3 04	S.		out	&H04
15E4	DB 03	[.		in	&H03
15E6	77 	w		mov	m,a
15E7	E1 	a		pop	hl
15E8	01 0020	. .		lxi	bc,&H0020
15EB	09 	.		dad	bc
15EC	C1 	A		pop	bc
15ED	05 	.		dcr	b
15EE	C2 15D7	BW.		jnz	L_15D7
15F1	E1 	a		pop	hl
15F2	C9 	I		ret
15F3	CD 1611	M..	L_15F3	call	L_1611
15F6	01 3700	...		lxi	bc,&H3700
15F9	7E 	~	L_15F9	mov	a,m
15FA	A7 	'		ana	a
15FB	CA 15FF	J..		jz	L_15FF
15FE	0C 	.		inr	c
15FF	23 	#	L_15FF	inx	hl
1600	05 	.		dcr	b
1601	C2 15F9	By.		jnz	L_15F9
1604	79 	y		mov	a,c
1605	32 2082	2. 		sta	&H2082
1608	FE 01	~.		cmpi	&H01
160A	C0 	@		rnz
160B	21 206B	!k.		lxi	hl,&H206B
160E	36 01	6.		mvi	m,&H01
1610	C9 	I		ret
1611	2E 00	..	L_1611	mvi	l,&H00
1613	3A 2067	:g 		lda	&H2067
1616	67 	g		mov	h,a
1617	C9 	I		ret
1618	3A 2015	:. 	L_1618	lda	&H2015
161B	FE FF	~.		cmpi	&HFF
161D	C0 	@		rnz
161E	21 2010	!..		lxi	hl,&H2010
1621	7E 	~		mov	a,m
1622	23 	#		inx	hl
1623	46 	F		mov	b,m
1624	B0 	0		ora	b
1625	C0 	@		rnz
1626	3A 2025	:% 		lda	&H2025
1629	A7 	'		ana	a
162A	C0 	@		rnz
162B	3A 20EF	:o 		lda	&H20EF
162E	A7 	'		ana	a
162F	CA 1652	JR.		jz	L_1652
1632	3A 202D	:- 		lda	&H202D
1635	A7 	'		ana	a
1636	C2 1648	BH.		jnz	L_1648
1639	CD 17C0	M@.		call	L_17C0
163C	E6 10	f.		ani	&H10
163E	C8 	H		rz
163F	3E 01	>.		mvi	a,&H01
1641	32 2025	2% 		sta	&H2025
1644	32 202D	2- 		sta	&H202D
1647	C9 	I		ret
1648	CD 17C0	M@.	L_1648	call	L_17C0
164B	E6 10	f.		ani	&H10
164D	C0 	@		rnz
164E	32 202D	2- 		sta	&H202D
1651	C9 	I		ret
1652	21 2025	!% 	L_1652	lxi	hl,&H2025
1655	36 01	6.		mvi	m,&H01
1657	2A 20ED	*m 		lhld	&H20ED
165A	23 	#		inx	hl
165B	7D 	}		mov	a,l
165C	FE 7E	~~		cmpi	&H7E
165E	DA 1663	Zc.		jc	L_1663
1661	2E 74	.t		mvi	l,&H74
1663	22 20ED	"m 	L_1663	shld	&H20ED
1666	7E 	~		mov	a,m
1667	32 201D	2. 		sta	&H201D
166A	C9 	I		ret
166B	37 	7	L_166B	stc
166C	C9 	I		ret
166D	AF 	/	L_166D	xra	a
166E	CD 1A8B	M..		call	L_1A8B
1671	CD 1910	M..	L_1671	call	L_1910
1674	36 00	6.		mvi	m,&H00
1676	CD 09CA	MJ.		call	L_09CA
1679	23 	#		inx	hl
167A	11 20F5	.u.		lxi	de,&H20F5
167D	1A 	.		ldax	de
167E	BE 	>		cmp	m
167F	1B 	.		dcx	de
1680	2B 	+		dcx	hl
1681	1A 	.		ldax	de
1682	CA 168B	J..		jz	L_168B
1685	D2 1698	R..		jnc	L_1698
1688	C3 168F	C..		jmp	L_168F
168B	BE 	>	L_168B	cmp	m
168C	D2 1698	R..		jnc	L_1698
168F	7E 	~	L_168F	mov	a,m
1690	12 	.		stax	de
1691	13 	.		inx	de
1692	23 	#		inx	hl
1693	7E 	~		mov	a,m
1694	12 	.		stax	de
1695	CD 1950	MP.		call	L_1950
1698	3A 20CE	:N 	L_1698	lda	&H20CE
169B	A7 	'		ana	a
169C	CA 16C9	JI.		jz	L_16C9
169F	21 2803	!..		lxi	hl,&H2803
16A2	11 1AA6	.&.		lxi	de,&H1AA6
16A5	0E 14	..		mvi	c,&H14
16A7	CD 0A93	M..		call	L_0A93
16AA	25 	%		dcr	h
16AB	25 	%		dcr	h
16AC	06 1B	..		mvi	b,&H1B
16AE	3A 2067	:g 		lda	&H2067
16B1	0F 	.		rrc
16B2	DA 16B7	Z7.		jc	L_16B7
16B5	06 1C	..		mvi	b,&H1C
16B7	78 	x	L_16B7	mov	a,b
16B8	CD 08FF	M..		call	L_08FF
16BB	CD 0AB1	M1.		call	L_0AB1
16BE	CD 18E7	Mg.		call	L_18E7
16C1	7E 	~		mov	a,m
16C2	A7 	'		ana	a
16C3	CA 16C9	JI.		jz	L_16C9
16C6	C3 02ED	Cm.		jmp	L_02ED
16C9	21 2D18	!..	L_16C9	lxi	hl,&H2D18
16CC	11 1AA6	.&.		lxi	de,&H1AA6
16CF	0E 0A	..		mvi	c,&H0A
16D1	CD 0A93	M..		call	L_0A93
16D4	CD 0AB6	M6.		call	L_0AB6
16D7	CD 09D6	MV.		call	L_09D6
16DA	AF 	/		xra	a
16DB	32 20EF	2o 		sta	&H20EF
16DE	D3 05	S.		out	&H05
16E0	CD 19D1	MQ.		call	&H19D1
16E3	C3 0B89	C..		jmp	L_0B89
16E6	31 2400	1..	L_16E6	lxi	sp,&H2400
16E9	FB 	{		ei
16EA	AF 	/		xra	a
16EB	32 2015	2. 		sta	&H2015
16EE	CD 14D8	MX.	L_16EE	call	L_14D8
16F1	06 04	..		mvi	b,&H04
16F3	CD 18FA	Mz.		call	L_18FA
16F6	CD 0A59	MY.		call	L_0A59
16F9	C2 16EE	Bn.		jnz	L_16EE
16FC	CD 19D7	MW.		call	L_19D7
16FF	21 2701	!..		lxi	hl,&H2701
1702	CD 19FA	Mz.		call	L_19FA
1705	AF 	/		xra	a
1706	CD 1A8B	M..		call	L_1A8B
1709	06 FB	.{		mvi	b,&HFB
170B	C3 196B	Ck.		jmp	L_196B
170E	CD 09CA	MJ.	L_170E	call	L_09CA
1711	23 	#		inx	hl
1712	7E 	~		mov	a,m
1713	11 1CB8	.8.		lxi	de,&H1CB8
1716	21 1AA1	!!.		lxi	hl,&H1AA1
1719	0E 04	..		mvi	c,&H04
171B	47 	G		mov	b,a
171C	1A 	.	L_171C	ldax	de
171D	B8 	8		cmp	b
171E	D2 1727	R'.		jnc	L_1727
1721	23 	#		inx	hl
1722	13 	.		inx	de
1723	0D 	.		dcr	c
1724	C2 171C	B..		jnz	L_171C
1727	7E 	~	L_1727	mov	a,m
1728	32 20CF	2O 		sta	&H20CF
172B	C9 	I		ret
172C	3A 2025	:% 	L_172C	lda	&H2025
172F	FE 00	~.		cmpi	&H00
1731	C2 1739	B9.		jnz	L_1739
1734	06 FD	.}		mvi	b,&HFD
1736	C3 19DC	C\.		jmp	L_19DC
1739	06 02	..	L_1739	mvi	b,&H02
173B	C3 18FA	Cz.		jmp	L_18FA
173E	00 	.		nop
173F	00 	.		nop
1740	21 209B	!..	L_1740	lxi	hl,&H209B
1743	35 	5		dcr	m
1744	CC 176D	Lm.		cz	L_176D
1747	3A 2068	:h 		lda	&H2068
174A	A7 	'		ana	a
174B	CA 176D	Jm.		jz	L_176D
174E	21 2096	!..		lxi	hl,&H2096
1751	35 	5		dcr	m
1752	C0 	@		rnz
1753	21 2098	!..		lxi	hl,&H2098
1756	7E 	~		mov	a,m
1757	D3 05	S.		out	&H05
1759	3A 2082	:. 		lda	&H2082
175C	A7 	'		ana	a
175D	CA 176D	Jm.		jz	L_176D
1760	2B 	+		dcx	hl
1761	7E 	~		mov	a,m
1762	2B 	+		dcx	hl
1763	77 	w		mov	m,a
1764	2B 	+		dcx	hl
1765	36 01	6.		mvi	m,&H01
1767	3E 04	>.		mvi	a,&H04
1769	32 209B	2. 		sta	&H209B
176C	C9 	I		ret
176D	3A 2098	:. 	L_176D	lda	&H2098
1770	E6 30	f0	L_1770	ani	&H30
1772	D3 05	S.		out	&H05
1774	C9 	I		ret
1775	3A 2095	:. 	L_1775	lda	&H2095
1778	A7 	'		ana	a
1779	CA 17AA	J*.		jz	L_17AA
177C	21 1A11	!..		lxi	hl,&H1A11
177F	11 1A21	.!.		lxi	de,&H1A21
1782	3A 2082	:. 		lda	&H2082
1785	BE 	>	L_1785	cmp	m
1786	D2 178E	R..		jnc	L_178E
1789	23 	#		inx	hl
178A	13 	.		inx	de
178B	C3 1785	C..		jmp	L_1785
178E	1A 	.	L_178E	ldax	de
178F	32 2097	2. 		sta	&H2097
1792	21 2098	!. 		lxi	hl,&H2098
1795	7E 	~		mov	a,m
1796	E6 30	f0		ani	&H30
1798	47 	G		mov	b,a
1799	7E 	~		mov	a,m
179A	E6 0F	f.		ani	&H0F
179C	07 	.		rlc
179D	FE 10	~.		cmpi	&H10
179F	C2 17A4	B$.		jnz	L_17A4
17A2	3E 01	>.		mvi	a,&H01
17A4	B0 	0	L_17A4	ora	b
17A5	77 	w		mov	m,a
17A6	AF 	/		xra	a
17A7	32 2095	2. 		sta	&H2095
17AA	21 2099	!. 	L_17AA	lxi	hl,&H2099
17AD	35 	5		dcr	m
17AE	C0 	@		rnz
17AF	06 EF	.o		mvi	b,&HEF
17B1	C3 19DC	C\.		jmp	L_19DC
17B4	06 EF	.o		mvi	b,&HEF
17B6	21 2098	!..		lxi	hl,&H2098
17B9	7E 	~		mov	a,m
17BA	A0 	 		ana	b
17BB	77 	w		mov	m,a
17BC	D3 05	S.		out	&H05
17BE	C9 	I		ret
17BF	00 	.		nop
17C0	3A 2067	:g 	L_17C0	lda	&H2067
17C3	0F 	.		rrc
17C4	D2 17CA	RJ.		jnc	L_17CA
17C7	DB 01	[.		in	&H01
17C9	C9 	I		ret
17CA	DB 02	[.	L_17CA	in	&H02
17CC	C9 	I		ret
17CD	DB 02	[.	L_17CD	in	&H02
17CF	E6 04	f.		ani	&H04
17D1	C8 	H		rz
17D2	3A 209A	:. 		lda	&H209A
17D5	A7 	'		ana	a
17D6	C0 	@		rnz
17D7	31 2400	1. 		lxi	sp,&H2400
17DA	06 04	..		mvi	b,&H04
17DC	CD 09D6	MV.	L_17DC	call	L_09D6
17DF	05 	.		dcr	b
17E0	C2 17DC	B\.		jnz	L_17DC
17E3	3E 01	>.		mvi	a,&H01
17E5	32 209A	2. 		sta	&H209A
17E8	CD 19D7	MW.		call	L_19D7
17EB	FB 	{		ei
17EC	11 1CBC	.<.		lxi	de,&H1CBC
17EF	21 3016	!..		lxi	hl,&H3016
17F2	0E 04	..		mvi	c,&H04
17F4	CD 0A93	M..		call	L_0A93
17F7	CD 0AB1	M1.		call	L_0AB1
17FA	AF 	/		xra	a
17FB	32 209A	2. 		sta	&H209A
17FE	32 2093	2. 		sta	&H2093
1801	C3 16C9	CI.		jmp	L_16C9
1804	21 2084	!..	L_1804	lxi	hl,&H2084
1807	7E 	~		mov	a,m
1808	A7 	'		ana	a
1809	CA 0707	J..		jz	L_0707
180C	23 	#		inx	hl
180D	7E 	~		mov	a,m
180E	A7 	'		ana	a
180F	C0 	@		rnz
1810	06 01	..		mvi	b,&H01
1812	C3 18FA	Cz.		jmp	L_18FA
1815	21 2810	!..	L_1815	lxi	hl,&H2810
1818	11 1CA3	.#.		lxi	de,&H1CA3
181B	0E 15	..		mvi	c,&H15
181D	CD 08F3	Ms.		call	L_08F3
1820	3E 0A	>.		mvi	a,&H0A
1822	32 206C	2l 		sta	&H206C
1825	01 1DBE	.> 		lxi	bc,&H1DBE
1828	CD 1856	MV.	L_1828	call	L_1856
182B	DA 1837	Z7.		jc	L_1837
182E	CD 1844	MD.		call	L_1844
1831	C3 1828	C(.		jmp	L_1828
1834	CD 0AB1	M1.		call	L_0AB1
1837	01 1DCF	.O.	L_1837	lxi	bc,&H1DCF
183A	CD 1856	MV.	L_183A	call	L_1856
183D	D8 	X		rc
183E	CD 184C	ML.		call	L_184C
1841	C3 183A	C:.		jmp	L_183A
1844	C5 	E	L_1844	push	bc
1845	06 10	..		mvi	b,&H10
1847	CD 1439	M9.		call	L_1439
184A	C1 	A		pop	bc
184B	C9 	I		ret
184C	C5 	E	L_184C	push	bc
184D	3A 206C	:l 		lda	&H206C
1850	4F 	O		mov	c,a
1851	CD 0A93	M..		call	L_0A93
1854	C1 	A		pop	bc
1855	C9 	I		ret
1856	0A 	.	L_1856	ldax	bc
1857	FE FF	~.		cmpi	&HFF
1859	37 	7		stc
185A	C8 	H		rz
185B	6F 	o		mov	l,a
185C	03 	.		inx	bc
185D	0A 	.		ldax	bc
185E	67 	g		mov	h,a
185F	03 	.		inx	bc
1860	0A 	.		ldax	bc
1861	5F 	_		mov	e,a
1862	03 	.		inx	bc
1863	0A 	.		ldax	bc
1864	57 	W		mov	d,a
1865	03 	.		inx	bc
1866	A7 	'		ana	a
1867	C9 	I		ret
1868	21 20C2	!B.	L_1868	lxi	hl,&H20C2
186B	34 	4		inr	m
186C	23 	#		inx	hl
186D	4E 	N		mov	c,m
186E	CD 01D9	MY.		call	L_01D9
1871	47 	G		mov	b,a
1872	3A 20CA	:J 		lda	&H20CA
1875	B8 	8		cmp	b
1876	CA 1898	J..		jz	L_1898
1879	3A 20C2	:B 		lda	&H20C2
187C	E6 04	f.		ani	&H04
187E	2A 20CC	*L 		lhld	&H20CC
1881	C2 1888	B..		jnz	L_1888
1884	11 0030	.0.		lxi	de,&H0030
1887	19 	.		dad	de
1888	22 20C7	"G 	L_1888	shld	&H20C7
188B	21 20C5	!E 		lxi	hl,&H20C5
188E	CD 1A3B	M;.		call	L_1A3B
1891	EB 	k		xchg
1892	C3 15D3	CS.		jmp	L_15D3
1895	00 	.		nop
1896	00 	.		nop
1897	00 	.		nop
1898	3E 01	>.	L_1898	mvi	a,&H01
189A	32 20CB	2K 		sta	&H20CB
189D	C9 	I		ret
189E	21 2050	!P 	L_189E	lxi	hl,&H2050
18A1	11 1BC0	.@ 		lxi	de,&H1BC0
18A4	06 10	..		mvi	b,&H10
18A6	CD 1A32	M2.		call	L_1A32
18A9	3E 02	>.		mvi	a,&H02
18AB	32 2080	2. 		sta	&H2080
18AE	3E FF	>.		mvi	a,&HFF
18B0	32 207E	2~ 		sta	&H207E
18B3	3E 04	>.		mvi	a,&H04
18B5	32 20C1	2A 		sta	&H20C1
18B8	3A 2055	:U 	L_18B8	lda	&H2055
18BB	E6 01	f.		ani	&H01
18BD	CA 18B8	J8.		jz	L_18B8
18C0	3A 2055	:U 	L_18C0	lda	&H2055
18C3	E6 01	f.		ani	&H01
18C5	C2 18C0	B@.		jnz	L_18C0
18C8	21 3311	!..		lxi	hl,&H3311
18CB	3E 26	>&		mvi	a,&H26
18CD	00 	.		nop
18CE	CD 08FF	M..		call	L_08FF
18D1	C3 0AB6	C6.		jmp	L_0AB6
18D4	31 2400	1..	L_18D4	lxi	sp,&H2400
18D7	06 00	..		mvi	b,&H00
18D9	CD 01E6	Mf.		call	L_01E6
18DC	CD 1956	MV.		call	L_1956
18DF	3E 08	>.	L_18DF	mvi	a,&H08
18E1	32 20CF	2O 		sta	&H20CF
18E4	C3 0AEA	Cj.		jmp	L_0AEA
18E7	3A 2067	:g 	L_18E7	lda	&H2067
18EA	21 20E7	!g 		lxi	hl,&H20E7
18ED	0F 	.		rrc
18EE	D0 	P		rnc
18EF	23 	#		inx	hl
18F0	C9 	I		ret
18F1	06 02	..	L_18F1	mvi	b,&H02
18F3	3A 2082	:. 		lda	&H2082
18F6	3D 	=		dcr	a
18F7	C0 	@		rnz
18F8	04 	.		inr	b
18F9	C9 	I		ret
18FA	3A 2094	:. 	L_18FA	lda	&H2094
18FD	B0 	0		ora	b
18FE	32 2094	2. 		sta	&H2094
1901	D3 03	S.		out	&H03
1903	C9 	I		ret
1904	21 2200	!..	L_1904	lxi	hl,&H2200
1907	C3 01C3	CC.		jmp	L_01C3
190A	CD 14D8	MX.	L_190A	call	L_14D8
190D	C3 1597	C..		jmp	L_1597
1910	21 20E7	!g.	L_1910	lxi	hl,&H20E7
1913	3A 2067	:g 		lda	&H2067
1916	0F 	.		rrc
1917	D8 	X		rc
1918	23 	#		inx	hl
1919	C9 	I		ret
191A	0E 1C	..	L_191A	mvi	c,&H1C
191C	21 241E	!. 		lxi	hl,&H241E
191F	11 1AE4	.d 		lxi	de,&H1AE4
1922	C3 08F3	Cs.		jmp	L_08F3
1925	21 20F8	!x.	L_1925	lxi	hl,&H20F8
1928	C3 1931	C1.		jmp	L_1931
192B	21 20FC	!|.	L_192B	lxi	hl,&H20FC
192E	C3 1931	C1.		jmp	L_1931
1931	5E 	^	L_1931	mov	e,m
1932	23 	#		inx	hl
1933	56 	V		mov	d,m
1934	23 	#		inx	hl
1935	7E 	~		mov	a,m
1936	23 	#		inx	hl
1937	66 	f		mov	h,m
1938	6F 	o		mov	l,a
1939	C3 09AD	C-.		jmp	L_09AD
193C	0E 07	..	L_193C	mvi	c,&H07
193E	21 3501	!..		lxi	hl,&H3501
1941	11 1FA9	.).		lxi	de,&H1FA9
1944	C3 08F3	Cs.		jmp	L_08F3
1947	3A 20EB	:k 	L_1947	lda	&H20EB
194A	21 3C01	!. 		lxi	hl,&H3C01
194D	C3 09B2	C2.		jmp	L_09B2
1950	21 20F4	!t.	L_1950	lxi	hl,&H20F4
1953	C3 1931	C1.		jmp	L_1931
1956	CD 1A5C	M\.	L_1956	call	L_1A5C
1959	CD 191A	M..		call	L_191A
195C	CD 1925	M%.		call	L_1925
195F	CD 192B	M+.		call	L_192B
1962	CD 1950	MP.		call	L_1950
1965	CD 193C	M<.		call	L_193C
1968	C3 1947	CG.		jmp	L_1947
196B	CD 19DC	M\.	L_196B	call	L_19DC
196E	C3 1671	Cq.		jmp	L_1671
1971	3E 01	>.	L_1971	mvi	a,&H01
1973	32 206D	2m 		sta	&H206D
1976	C3 16E6	Cf.		jmp	L_16E6
1979	CD 19D7	MW.	L_1979	call	L_19D7
197C	CD 1947	MG.		call	L_1947
197F	C3 193C	C<.		jmp	L_193C
1982	32 20C1	2A 	L_1982	sta	&H20C1
1985	C9 	I		ret
1986	8B 	.		adc	e
1987	19 	.		dad	de
1988	C3 09D6	CV.	L_1988	jmp	L_09D6
198B	21 2803	!..		lxi	hl,&H2803
198E	11 19BE	.>.		lxi	de,&H19BE
1991	0E 13	..		mvi	c,&H13
1993	C3 08F3	Cs.		jmp	L_08F3
1996	00 	.		nop
1997	00 	.		nop
1998	00 	.		nop
1999	00 	.		nop
199A	3A 201E	:. 	L_199A	lda	&H201E
199D	A7 	'		ana	a
199E	C2 19AC	B,.		jnz	L_19AC
19A1	DB 01	[.		in	&H01
19A3	E6 76	fv		ani	&H76
19A5	D6 72	Vr		sui	&H72
19A7	C0 	@		rnz
19A8	3C 	<		inr	a
19A9	32 201E	2. 		sta	&H201E
19AC	DB 01	[.	L_19AC	in	&H01
19AE	E6 76	fv		ani	&H76
19B0	FE 34	~4		cmpi	&H34
19B2	C0 	@		rnz
19B3	21 2E1B	!.4		lxi	hl,&H2E1B
19B6	11 0BF7	.w4		lxi	de,&H0BF7
19B9	0E 09	..		mvi	c,&H09
19BB	C3 08F3	Cs.		jmp	L_08F3
19BE	28 13	(.		jrz	&H19D3
19C0	00 	.		nop
19C1	08 	.		exaf
19C2	13 	.		inx	de
19C3	0E 26	.&		mvi	c,&H26
19C5	02 	.		stax	bc
19C6	0E 11	..		mvi	c,&H11
19C8	0F 	.		rrc
19C9	0E 11	..		mvi	c,&H11
19CB	00 	.		nop
19CC	13 	.		inx	de
19CD	08 	.		exaf
19CE	0E 0D	..		mvi	c,&H0D
19D0	28 3E	(>		jrz	L_1A10
19D2	01 E932	.2.		lxi	bc,&HE932
19D5	20 C9	 I		jrnz	&H19A0
19D7	AF 	/	L_19D7	xra	a
19D8	C3 19D3	CS.		jmp	&H19D3
19DB	00 	.		nop
19DC	3A 2094	:. 	L_19DC	lda	&H2094
19DF	A0 	 		ana	b
19E0	32 2094	2. 		sta	&H2094
19E3	D3 03	S.		out	&H03
19E5	C9 	I		ret
19E6	21 2701	!..	L_19E6	lxi	hl,&H2701
19E9	CA 19FA	Jz.		jz	L_19FA
19EC	11 1C60	.`.	L_19EC	lxi	de,&H1C60
19EF	06 10	..		mvi	b,&H10
19F1	4F 	O		mov	c,a
19F2	CD 1439	M9.		call	L_1439
19F5	79 	y		mov	a,c
19F6	3D 	=		dcr	a
19F7	C2 19EC	Bl.		jnz	L_19EC
19FA	06 10	..	L_19FA	mvi	b,&H10
19FC	CD 14CB	MK.		call	L_14CB
19FF	7C 	|		mov	a,h
1A00	FE 35	~5		cmpi	&H35
1A02	C2 19FA	Bz.		jnz	L_19FA
1A05	C9 	I		ret
1A06	21 2072	!r.	L_1A06	lxi	hl,&H2072
1A09	46 	F		mov	b,m
1A0A	1A 	.		ldax	de
1A0B	E6 80	f.		ani	&H80
1A0D	A8 	(		xra	b
1A0E	C0 	@		rnz
1A0F	37 	7		stc
1A10	C9 	I	L_1A10	ret
1A11	32 242B	2+$		sta	&H242B
1A14	1C 	.		inr	e
1A15	16 11	..		mvi	d,&H11
1A17	0D 	.		dcr	c
1A18	0A 	.		ldax	bc
1A19	08 	.		exaf
1A1A	07 	.		rlc
1A1B	06 05	..		mvi	b,&H05
1A1D	04 	.		inr	b
1A1E	03 	.		inx	bc
1A1F	02 	.		stax	bc
1A20	01 2E34	.4$		lxi	bc,&H2E34
1A23	27 	'		daa
1A24	22 181C	"..		shld	&H181C
1A27	15 	.		dcr	d
1A28	13 	.		inx	de
1A29	10 0E	..		djnz	&H1A39
1A2B	0D 	.		dcr	c
1A2C	0C 	.		inr	c
1A2D	0B 	.		dcx	bc
1A2E	09 	.		dad	bc
1A2F	07 	.		rlc
1A30	05 	.		dcr	b
1A31	FF 	.		rst	7
1A32	1A 	.	L_1A32	ldax	de
1A33	77 	w		mov	m,a
1A34	23 	#		inx	hl
1A35	13 	.		inx	de
1A36	05 	.		dcr	b
1A37	C2 1A32	B2.		jnz	L_1A32
1A3A	C9 	I		ret
1A3B	5E 	^	L_1A3B	mov	e,m
1A3C	23 	#	L_1A3C	inx	hl
1A3D	56 	V		mov	d,m
1A3E	23 	#		inx	hl
1A3F	7E 	~		mov	a,m
1A40	23 	#		inx	hl
1A41	4E 	N		mov	c,m
1A42	23 	#		inx	hl
1A43	46 	F		mov	b,m
1A44	61 	a		mov	h,c
1A45	6F 	o		mov	l,a
1A46	C9 	I		ret
1A47	C5 	E	L_1A47	push	bc
1A48	06 03	..		mvi	b,&H03
1A4A	7C 	|	L_1A4A	mov	a,h
1A4B	1F 	.		rar
1A4C	67 	g		mov	h,a
1A4D	7D 	}		mov	a,l
1A4E	1F 	.		rar
1A4F	6F 	o		mov	l,a
1A50	05 	.		dcr	b
1A51	C2 1A4A	BJ.		jnz	L_1A4A
1A54	7C 	|		mov	a,h
1A55	E6 3F	f?		ani	&H3F
1A57	F6 20	v 		ori	&H20
1A59	67 	g		mov	h,a
1A5A	C1 	A		pop	bc
1A5B	C9 	I		ret
1A5C	21 2400	!. 	L_1A5C	lxi	hl,&H2400
1A5F	36 00	6.	L_1A5F	mvi	m,&H00
1A61	23 	#		inx	hl
1A62	7C 	|		mov	a,h
1A63	FE 40	~@		cmpi	&H40
1A65	C2 1A5F	B_.		jnz	L_1A5F
1A68	C9 	I		ret
1A69	C5 	E	L_1A69	push	bc
1A6A	E5 	e		push	hl
1A6B	1A 	.	L_1A6B	ldax	de
1A6C	B6 	6		ora	m
1A6D	77 	w		mov	m,a
1A6E	13 	.		inx	de
1A6F	23 	#		inx	hl
1A70	0D 	.		dcr	c
1A71	C2 1A6B	Bk.		jnz	L_1A6B
1A74	E1 	a		pop	hl
1A75	01 0020	. .		lxi	bc,&H0020
1A78	09 	.		dad	bc
1A79	C1 	A		pop	bc
1A7A	05 	.		dcr	b
1A7B	C2 1A69	Bi.		jnz	L_1A69
1A7E	C9 	I		ret
1A7F	CD 092E	M..	L_1A7F	call	L_092E
1A82	A7 	'		ana	a
1A83	C8 	H		rz
1A84	F5 	u		push	psw
1A85	3D 	=		dcr	a
1A86	77 	w		mov	m,a
1A87	CD 19E6	Mf.		call	L_19E6
1A8A	F1 	q		pop	psw
1A8B	21 2501	!..	L_1A8B	lxi	hl,&H2501
1A8E	E6 0F	f.		ani	&H0F
1A90	C3 09C5	CE.		jmp	L_09C5
1A93	00 	.		nop
1A94	00 	.		nop
1A95	00 	.		nop
1A96	00 	.		nop
1A97	FF 	.		rst	7
1A98	B8 	8		cmp	b
1A99	FE 20	~ 		cmpi	&H20
1A9B	1C 	.		inr	e
1A9C	10 9E	..		djnz	L_1A3C
1A9E	00 	.		nop
1A9F	20 1C	 .		jrnz	L_1ABD
1AA1	30 10	0.		jrnc	L_1AB3
1AA3	0B 	.		dcx	bc
1AA4	08 	.		exaf
1AA5	07 	.		rlc
1AA6	06 00	..		mvi	b,&H00
1AA8	0C 	.		inr	c
1AA9	04 	.		inr	b
1AAA	26 0E	&.		mvi	h,&H0E
1AAC	15 	.		dcr	d
1AAD	04 	.		inr	b
1AAE	11 2626	.& 		lxi	de,&H2626
1AB1	0F 	.		rrc
1AB2	0B 	.		dcx	bc
1AB3	00 	.	L_1AB3	nop
1AB4	18 04	..		jmpr	L_1ABA
1AB6	11 2624	.$ 		lxi	de,&H2624
1AB9	25 	%		dcr	h
1ABA	1B 	.	L_1ABA	dcx	de
1ABB	26 0E	&.		mvi	h,&H0E
1ABD	11 1C26	.& 	L_1ABD	lxi	de,&H1C26
1AC0	0F 	.		rrc
1AC1	0B 	.		dcx	bc
1AC2	00 	.		nop
1AC3	18 04	..		jmpr	&H1AC9
1AC5	11 2612	.. 		lxi	de,&H2612
1AC8	01 1314	.. 		lxi	bc,&H1314
1ACB	13 	.		inx	de
1ACC	0E 0D	..		mvi	c,&H0D
1ACE	26 0E	&.		mvi	h,&H0E
1AD0	0D 	.		dcr	c
1AD1	0B 	.		dcx	bc
1AD2	18 26	.&		jmpr	&H1AFA
1AD4	1B 	.		dcx	de
1AD5	0F 	.		rrc
1AD6	0B 	.		dcx	bc
1AD7	00 	.		nop
1AD8	18 04	..		jmpr	&H1ADE
1ADA	11 2626	.& 		lxi	de,&H2626
1ADD	01 1314	.. 		lxi	bc,&H1314
1AE0	13 	.		inx	de
1AE1	0E 0D	..		mvi	c,&H0D
1AE3	26 26	&&		mvi	h,&H26
1AE5	12 	.		stax	de
1AE6	02 	.		stax	bc
1AE7	0E 11	..		mvi	c,&H11
1AE9	04 	.		inr	b
1AEA	24 	$		inr	h
1AEB	1B 	.		dcx	de
1AEC	25 	%		dcr	h
1AED	26 07	&.		mvi	h,&H07
1AEF	08 	.		exaf
1AF0	3F 	?		cmc
1AF1	12 	.		stax	de
1AF2	02 	.		stax	bc
1AF3	0E 11	..		mvi	c,&H11
1AF5	04 	.		inr	b
1AF6	26 12	&.		mvi	h,&H12
1AF8	02 	.		stax	bc
1AF9	0E 11	..		mvi	c,&H11
1AFB	04 	.		inr	b
1AFC	24 	$		inr	h
1AFD	1C 	.		inr	e
1AFE	25 	%		dcr	h
1AFF	26 01	&.		mvi	h,&H01
1B01	00 	.		nop
1B02	00 	.		nop
1B03	10 00	..		djnz	L_1B05
1B05	00 	.	L_1B05	nop
1B06	00 	.		nop
1B07	00 	.		nop
1B08	02 	.		stax	bc
1B09	78 	x		mov	a,b
1B0A	38 78	8x		jrc	L_1B84
1B0C	38 00	8.		jrc	L_1B0E
1B0E	F8 	x	L_1B0E	rm
1B0F	00 	.		nop
1B10	00 	.		nop
1B11	80 	.		add	b
1B12	00 	.		nop
1B13	8E 	.		adc	m
1B14	02 	.		stax	bc
1B15	FF 	.		rst	7
1B16	05 	.		dcr	b
1B17	0C 	.		inr	c
1B18	60 	`		mov	h,b
1B19	1C 	.		inr	e
1B1A	20 30	 0		jrnz	&H1B4C
1B1C	10 01	..		djnz	L_1B1F
1B1E	00 	.		nop
1B1F	00 	.	L_1B1F	nop
1B20	00 	.		nop
1B21	00 	.		nop
1B22	00 	.		nop
1B23	BB 	;		cmp	e
1B24	03 	.		inx	bc
1B25	00 	.		nop
1B26	10 90	..		djnz	&H1AB8
1B28	1C 	.		inr	e
1B29	28 30	(0		jrz	L_1B5B
1B2B	01 0004	.. 		lxi	bc,&H0004
1B2E	FF 	.		rst	7
1B2F	FF 	.		rst	7
1B30	00 	.		nop
1B31	00 	.		nop
1B32	02 	.	L_1B32	stax	bc
1B33	76 	v		hlt
1B34	04 	.		inr	b
1B35	00 	.		nop
1B36	00 	.		nop
1B37	00 	.		nop
1B38	00 	.		nop
1B39	00 	.		nop
1B3A	04 	.		inr	b
1B3B	EE 1C	n.	L_1B3B	xri	&H1C
1B3D	00 	.		nop
1B3E	00 	.		nop
1B3F	03 	.		inx	bc
1B40	00 	.		nop
1B41	00 	.		nop
1B42	00 	.		nop
1B43	B6 	6		ora	m
1B44	04 	.		inr	b
1B45	00 	.		nop
1B46	00 	.		nop
1B47	01 1D00	...		lxi	bc,&H1D00
1B4A	04 	.		inr	b
1B4B	E2 001C	b..		jpo	L_001C
1B4E	00 	.		nop
1B4F	03 	.		inx	bc
1B50	00 	.		nop
1B51	00 	.		nop
1B52	00 	.		nop
1B53	82 	.		add	d
1B54	06 00	..		mvi	b,&H00
1B56	00 	.		nop
1B57	01 1D06	...		lxi	bc,&H1D06
1B5A	04 	.		inr	b
1B5B	D0 	P	L_1B5B	rnc
1B5C	1C 	.		inr	e
1B5D	00 	.		nop
1B5E	00 	.		nop
1B5F	03 	.		inx	bc
1B60	FF 	.		rst	7
1B61	00 	.		nop
1B62	C0 	@		rnz
1B63	1C 	.		inr	e
1B64	00 	.		nop
1B65	00 	.		nop
1B66	10 21	.!		djnz	L_1B89
1B68	01 3000	...		lxi	bc,&H3000
1B6B	00 	.		nop
1B6C	12 	.		stax	de
1B6D	00 	.		nop
1B6E	00 	.		nop
1B6F	00 	.		nop
1B70	0F 	.		rrc
1B71	0B 	.		dcx	bc
1B72	00 	.		nop
1B73	18 26	.&		jmpr	L_1B9B
1B75	0F 	.		rrc
1B76	0B 	.		dcx	bc
1B77	00 	.		nop
1B78	18 04	..		jmpr	L_1B7E
1B7A	11 1B24	.$.		lxi	de,&H1B24
1B7D	25 	%		dcr	h
1B7E	FC 0100	|..	L_1B7E	cm	L_0100
1B81	FF 	.		rst	7
1B82	FF 	.		rst	7
1B83	00 	.		nop
1B84	00 	.	L_1B84	nop
1B85	00 	.		nop
1B86	20 64	 d		jrnz	L_1BEC
1B88	1D 	.		dcr	e
1B89	D0 	P	L_1B89	rnc
1B8A	29 	)		dad	hl
1B8B	18 02	..		jmpr	L_1B8F
1B8D	54 	T		mov	d,h
1B8E	1D 	.		dcr	e
1B8F	00 	.	L_1B8F	nop
1B90	08 	.		exaf
1B91	00 	.		nop
1B92	06 00	..		mvi	b,&H00
1B94	00 	.		nop
1B95	01 0040	.@.		lxi	bc,&H0040
1B98	01 0000	...		lxi	bc,&H0000
1B9B	10 9E	..	L_1B9B	djnz	L_1B3B
1B9D	00 	.		nop
1B9E	20 1C	 .		jrnz	L_1BBC
1BA0	00 	.		nop
1BA1	03 	.		inx	bc
1BA2	04 	.		inr	b
1BA3	78 	x		mov	a,b
1BA4	14 	.		inr	d
1BA5	13 	.		inx	de
1BA6	08 	.		exaf
1BA7	1A 	.		ldax	de
1BA8	3D 	=		dcr	a
1BA9	68 	h		mov	l,b
1BAA	FC 68FC	||h		cm	&H68FC
1BAD	3D 	=		dcr	a
1BAE	1A 	.		ldax	de
1BAF	00 	.		nop
1BB0	00 	.		nop
1BB1	00 	.		nop
1BB2	01 98B8	.8h		lxi	bc,&H98B8
1BB5	A0 	 		ana	b
1BB6	1B 	.		dcx	de
1BB7	10 FF	..		djnz	&H1BB8
1BB9	00 	.		nop
1BBA	A0 	 		ana	b
1BBB	1B 	.		dcx	de
1BBC	00 	.	L_1BBC	nop
1BBD	00 	.		nop
1BBE	00 	.		nop
1BBF	00 	.		nop
1BC0	00 	.		nop
1BC1	10 00	..		djnz	L_1BC3
1BC3	0E 05	..	L_1BC3	mvi	c,&H05
1BC5	00 	.		nop
1BC6	00 	.		nop
1BC7	00 	.		nop
1BC8	00 	.		nop
1BC9	00 	.		nop
1BCA	07 	.		rlc
1BCB	D0 	P		rnc
1BCC	1C 	.		inr	e
1BCD	C8 	H		rz
1BCE	9B 	.		sbb	e
1BCF	03 	.		inx	bc
1BD0	00 	.		nop
1BD1	00 	.		nop
1BD2	03 	.		inx	bc
1BD3	04 	.		inr	b
1BD4	78 	x		mov	a,b
1BD5	14 	.		inr	d
1BD6	0B 	.		dcx	bc
1BD7	19 	.		dad	de
1BD8	3A FA6D	:mz		lda	&HFA6D
1BDB	FA 3A6D	zm:		jm	&H3A6D
1BDE	19 	.		dad	de
1BDF	00 	.		nop
1BE0	00 	.		nop
1BE1	00 	.		nop
1BE2	00 	.		nop
1BE3	00 	.		nop
1BE4	00 	.		nop
1BE5	00 	.		nop
1BE6	00 	.		nop
1BE7	00 	.		nop
1BE8	00 	.		nop
1BE9	01 0000	..:		lxi	bc,&H0000
1BEC	01 1F74	.t:	L_1BEC	lxi	bc,&H1F74
1BEF	00 	.		nop
1BF0	80 	.		add	b
1BF1	00 	.		nop
1BF2	00 	.		nop
1BF3	00 	.		nop
1BF4	00 	.		nop
1BF5	00 	.		nop
1BF6	1C 	.		inr	e
1BF7	2F 	/		cma
1BF8	00 	.		nop
1BF9	00 	.		nop
1BFA	1C 	.		inr	e
1BFB	27 	'		daa
1BFC	00 	.		nop
1BFD	00 	.		nop
1BFE	1C 	.		inr	e
1BFF	39 	9		dad	sp
1C00	00 	.		nop
1C01	00 	.		nop
1C02	39 	9		dad	sp
1C03	79 	y		mov	a,c
1C04	7A 	z		mov	a,d
1C05	6E 	n		mov	l,m
1C06	EC FAFA	lzz		cpe	&HFAFA
1C09	EC 7A6E	lnz		cpe	&H7A6E
1C0C	79 	y		mov	a,c
1C0D	39 	9		dad	sp
1C0E	00 	.		nop
1C0F	00 	.		nop
1C10	00 	.		nop
1C11	00 	.		nop
1C12	00 	.		nop
1C13	78 	x		mov	a,b
1C14	1D 	.		dcr	e
1C15	BE 	>		cmp	m
1C16	6C 	l		mov	l,h
1C17	3C 	<		inr	a
1C18	3C 	<		inr	a
1C19	3C 	<		inr	a
1C1A	6C 	l		mov	l,h
1C1B	BE 	>		cmp	m
1C1C	1D 	.		dcr	e
1C1D	78 	x		mov	a,b
1C1E	00 	.		nop
1C1F	00 	.		nop
1C20	00 	.		nop
1C21	00 	.		nop
1C22	00 	.		nop
1C23	00 	.		nop
1C24	19 	.		dad	de
1C25	3A FA6D	:mz		lda	&HFA6D
1C28	FA 3A6D	zm:		jm	&H3A6D
1C2B	19 	.		dad	de
1C2C	00 	.		nop
1C2D	00 	.		nop
1C2E	00 	.		nop
1C2F	00 	.		nop
1C30	00 	.		nop
1C31	00 	.		nop
1C32	38 7A	8z		jrc	L_1CAE
1C34	7F 	.		mov	a,a
1C35	6D 	m		mov	l,l
1C36	EC FAFA	lzz		cpe	&HFAFA
1C39	EC 7F6D	lm.		cpe	&H7F6D
1C3C	7A 	z		mov	a,d
1C3D	38 00	8.		jrc	L_1C3F
1C3F	00 	.	L_1C3F	nop
1C40	00 	.		nop
1C41	00 	.		nop
1C42	00 	.		nop
1C43	0E 18	..		mvi	c,&H18
1C45	BE 	>		cmp	m
1C46	6D 	m		mov	l,l
1C47	3D 	=		dcr	a
1C48	3C 	<		inr	a
1C49	3D 	=		dcr	a
1C4A	6D 	m		mov	l,l
1C4B	BE 	>		cmp	m
1C4C	18 0E	..		jmpr	L_1C5C
1C4E	00 	.		nop
1C4F	00 	.		nop
1C50	00 	.		nop
1C51	00 	.		nop
1C52	00 	.		nop
1C53	00 	.		nop
1C54	1A 	.		ldax	de
1C55	3D 	=		dcr	a
1C56	68 	h		mov	l,b
1C57	FC 68FC	||h		cm	&H68FC
1C5A	3D 	=		dcr	a
1C5B	1A 	.		ldax	de
1C5C	00 	.	L_1C5C	nop
1C5D	00 	.		nop
1C5E	00 	.		nop
1C5F	00 	.		nop
1C60	00 	.		nop
1C61	00 	.		nop
1C62	0F 	.		rrc
1C63	1F 	.		rar
1C64	1F 	.		rar
1C65	1F 	.		rar
1C66	1F 	.		rar
1C67	7F 	.		mov	a,a
1C68	FF 	.		rst	7
1C69	7F 	.		mov	a,a
1C6A	1F 	.		rar
1C6B	1F 	.		rar
1C6C	1F 	.		rar
1C6D	1F 	.		rar
1C6E	0F 	.		rrc
1C6F	00 	.		nop
1C70	00 	.		nop
1C71	04 	.		inr	b
1C72	01 0313	..h		lxi	bc,&H0313
1C75	07 	.		rlc
1C76	B3 	3		ora	e
1C77	0F 	.		rrc
1C78	2F 	/		cma
1C79	03 	.		inx	bc
1C7A	2F 	/		cma
1C7B	49 	I		mov	c,c
1C7C	04 	.		inr	b
1C7D	03 	.		inx	bc
1C7E	00 	.		nop
1C7F	01 0840	.@h		lxi	bc,&H0840
1C82	05 	.		dcr	b
1C83	A3 	#		ana	e
1C84	0A 	.		ldax	bc
1C85	03 	.		inx	bc
1C86	5B 	[		mov	e,e
1C87	0F 	.		rrc
1C88	27 	'		daa
1C89	27 	'		daa
1C8A	0B 	.		dcx	bc
1C8B	4B 	K		mov	c,e
1C8C	40 	@		mov	b,b
1C8D	84 	.		add	h
1C8E	11 0F48	.Hh		lxi	de,&H0F48
1C91	99 	.		sbb	c
1C92	3C 	<		inr	a
1C93	7E 	~		mov	a,m
1C94	3D 	=		dcr	a
1C95	BC 	<		cmp	h
1C96	3E 7C	>|		mvi	a,&H7C
1C98	99 	.		sbb	c
1C99	27 	'		daa
1C9A	1B 	.		dcx	de
1C9B	1A 	.		ldax	de
1C9C	26 0F	&.		mvi	h,&H0F
1C9E	0E 08	..		mvi	c,&H08
1CA0	0D 	.		dcr	c
1CA1	13 	.		inx	de
1CA2	12 	.		stax	de
1CA3	28 12	(.		jrz	L_1CB7
1CA5	02 	.		stax	bc
1CA6	0E 11	..		mvi	c,&H11
1CA8	04 	.		inr	b
1CA9	26 00	&.		mvi	h,&H00
1CAB	03 	.		inx	bc
1CAC	15 	.		dcr	d
1CAD	00 	.		nop
1CAE	0D 	.	L_1CAE	dcr	c
1CAF	02 	.		stax	bc
1CB0	04 	.		inr	b
1CB1	26 13	&.		mvi	h,&H13
1CB3	00 	.		nop
1CB4	01 040B	..h		lxi	bc,&H040B
1CB7	28 02	(.	L_1CB7	jrz	L_1CBB
1CB9	10 20	. 		djnz	&H1CDB
1CBB	30 13	0.	L_1CBB	jrnc	L_1CD0
1CBD	08 	.		exaf
1CBE	0B 	.		dcx	bc
1CBF	13 	.		inx	de
1CC0	00 	.		nop
1CC1	08 	.		exaf
1CC2	49 	I		mov	c,c
1CC3	22 8114	"..		shld	&H8114
1CC6	42 	B		mov	b,d
1CC7	00 	.		nop
1CC8	42 	B		mov	b,d
1CC9	81 	.		add	c
1CCA	14 	.		inr	d
1CCB	22 0849	"I.		shld	L_0849
1CCE	00 	.		nop
1CCF	00 	.		nop
1CD0	44 	D	L_1CD0	mov	b,h
1CD1	AA 	*		xra	d
1CD2	10 88	..		djnz	L_1C5C
1CD4	54 	T		mov	d,h
1CD5	22 AA10	".*		shld	&HAA10
1CD8	44 	D		mov	b,h
1CD9	22 8854	"T.		shld	&H8854
1CDC	4A 	J		mov	c,d
1CDD	15 	.		dcr	d
1CDE	BE 	>		cmp	m
1CDF	3F 	?		cmc
1CE0	5E 	^		mov	e,m
1CE1	25 	%		dcr	h
1CE2	04 	.		inr	b
1CE3	FC 1004	|..		cm	L_1004
1CE6	FC 2010	|. 		cm	&H2010
1CE9	FC 8020	| .		cm	&H8020
1CEC	FC 0080	|..		cm	&H0080
1CEF	FE 00	~.		cmpi	&H00
1CF1	24 	$		inr	h
1CF2	FE 12	~.		cmpi	&H12
1CF4	00 	.		nop
1CF5	FE 00	~.		cmpi	&H00
1CF7	48 	H		mov	c,b
1CF8	FE 90	~.		cmpi	&H90
1CFA	0F 	.		rrc
1CFB	0B 	.		dcx	bc
1CFC	00 	.		nop
1CFD	29 	)		dad	hl
1CFE	00 	.		nop
1CFF	00 	.		nop
1D00	01 0107	...		lxi	bc,&H0107
1D03	01 0401	...		lxi	bc,&H0401
1D06	0B 	.		dcx	bc
1D07	01 0306	...		lxi	bc,&H0306
1D0A	01 0B01	...		lxi	bc,&H0B01
1D0D	09 	.		dad	bc
1D0E	02 	.		stax	bc
1D0F	08 	.		exaf
1D10	02 	.		stax	bc
1D11	0B 	.		dcx	bc
1D12	04 	.		inr	b
1D13	07 	.		rlc
1D14	0A 	.		ldax	bc
1D15	05 	.		dcr	b
1D16	02 	.		stax	bc
1D17	05 	.		dcr	b
1D18	04 	.		inr	b
1D19	06 07	..		mvi	b,&H07
1D1B	08 	.		exaf
1D1C	0A 	.		ldax	bc
1D1D	06 0A	..		mvi	b,&H0A
1D1F	03 	.		inx	bc
1D20	FF 	.		rst	7
1D21	0F 	.		rrc
1D22	FF 	.		rst	7
1D23	1F 	.		rar
1D24	FF 	.		rst	7
1D25	3F 	?		cmc
1D26	FF 	.		rst	7
1D27	7F 	.		mov	a,a
1D28	FF 	.		rst	7
1D29	FF 	.		rst	7
1D2A	FC F8FF	|.x		cm	&HF8FF
1D2D	FF 	.		rst	7
1D2E	F0 	p		rp
1D2F	FF 	.		rst	7
1D30	F0 	p		rp
1D31	FF 	.		rst	7
1D32	F0 	p		rp
1D33	FF 	.		rst	7
1D34	F0 	p		rp
1D35	FF 	.		rst	7
1D36	F0 	p		rp
1D37	FF 	.		rst	7
1D38	F0 	p		rp
1D39	FF 	.		rst	7
1D3A	F0 	p		rp
1D3B	FF 	.		rst	7
1D3C	F8 	x		rm
1D3D	FF 	.		rst	7
1D3E	FC FFFF	|..		cm	&HFFFF
1D41	FF 	.		rst	7
1D42	FF 	.		rst	7
1D43	FF 	.		rst	7
1D44	FF 	.		rst	7
1D45	7F 	.		mov	a,a
1D46	FF 	.		rst	7
1D47	3F 	?		cmc
1D48	FF 	.		rst	7
1D49	1F 	.		rar
1D4A	FF 	.		rst	7
1D4B	0F 	.		rrc
1D4C	05 	.		dcr	b
1D4D	10 15	..		djnz	L_1D64
1D4F	30 94	0.		jrnc	&H1CE5
1D51	97 	.		sub	a
1D52	9A 	.		sbb	d
1D53	9D 	.		sbb	l
1D54	10 05	..		djnz	L_1D5B
1D56	05 	.		dcr	b
1D57	10 15	..		djnz	L_1D6E
1D59	10 10	..		djnz	&H1D6B
1D5B	05 	.	L_1D5B	dcr	b
1D5C	30 10	0.		jrnc	L_1D6E
1D5E	10 10	..		djnz	L_1D70
1D60	05 	.		dcr	b
1D61	15 	.		dcr	d
1D62	10 05	..		djnz	L_1D69
1D64	00 	.	L_1D64	nop
1D65	00 	.		nop
1D66	00 	.		nop
1D67	00 	.		nop
1D68	04 	.		inr	b
1D69	0C 	.	L_1D69	inr	c
1D6A	1E 37	.7		mvi	e,&H37
1D6C	3E 7C	>|		mvi	a,&H7C
1D6E	74 	t	L_1D6E	mov	m,h
1D6F	7E 	~		mov	a,m
1D70	7E 	~	L_1D70	mov	a,m
1D71	74 	t		mov	m,h
1D72	7C 	|		mov	a,h
1D73	3E 37	>7		mvi	a,&H37
1D75	1E 0C	..		mvi	e,&H0C
1D77	04 	.		inr	b
1D78	00 	.		nop
1D79	00 	.		nop
1D7A	00 	.		nop
1D7B	00 	.		nop
1D7C	00 	.		nop
1D7D	22 A500	".%		shld	&HA500
1D80	40 	@		mov	b,b
1D81	08 	.		exaf
1D82	98 	.		sbb	b
1D83	3D 	=		dcr	a
1D84	B6 	6		ora	m
1D85	3C 	<		inr	a
1D86	36 1D	6.		mvi	m,&H1D
1D88	10 48	.H		djnz	L_1DD2
1D8A	62 	b		mov	h,d
1D8B	B6 	6		ora	m
1D8C	1D 	.		dcr	e
1D8D	98 	.		sbb	b
1D8E	08 	.		exaf
1D8F	42 	B		mov	b,d
1D90	90 	.		sub	b
1D91	08 	.		exaf
1D92	00 	.		nop
1D93	00 	.		nop
1D94	26 1F	&.		mvi	h,&H1F
1D96	1A 	.		ldax	de
1D97	1B 	.		dcx	de
1D98	1A 	.		ldax	de
1D99	1A 	.		ldax	de
1D9A	1B 	.		dcx	de
1D9B	1F 	.		rar
1D9C	1A 	.		ldax	de
1D9D	1D 	.		dcr	e
1D9E	1A 	.		ldax	de
1D9F	1A 	.		ldax	de
1DA0	10 20	. 		djnz	L_1DC2
1DA2	30 60	0`		jrnc	L_1E04
1DA4	50 	P		mov	d,b
1DA5	48 	H		mov	c,b
1DA6	48 	H		mov	c,b
1DA7	48 	H		mov	c,b
1DA8	40 	@		mov	b,b
1DA9	40 	@		mov	b,b
1DAA	40 	@		mov	b,b
1DAB	0F 	.		rrc
1DAC	0B 	.		dcx	bc
1DAD	00 	.		nop
1DAE	18 12	..		jmpr	L_1DC2
1DB0	0F 	.		rrc
1DB1	00 	.		nop
1DB2	02 	.		stax	bc
1DB3	04 	.		inr	b
1DB4	26 26	&&		mvi	h,&H26
1DB6	08 	.		exaf
1DB7	0D 	.		dcr	c
1DB8	15 	.		dcr	d
1DB9	00 	.		nop
1DBA	03 	.		inx	bc
1DBB	04 	.		inr	b
1DBC	11 0E12	..%		lxi	de,&H0E12
1DBF	2C 	,		inr	l
1DC0	68 	h		mov	l,b
1DC1	1D 	.		dcr	e
1DC2	0C 	.	L_1DC2	inr	c
1DC3	2C 	,		inr	l
1DC4	20 1C	 .		jrnz	&H1DE2
1DC6	0A 	.		ldax	bc
1DC7	2C 	,		inr	l
1DC8	40 	@		mov	b,b
1DC9	1C 	.		inr	e
1DCA	08 	.		exaf
1DCB	2C 	,		inr	l
1DCC	00 	.		nop
1DCD	1C 	.		inr	e
1DCE	FF 	.		rst	7
1DCF	0E 2E	..		mvi	c,&H2E
1DD1	E0 	`		rpo
1DD2	1D 	.	L_1DD2	dcr	e
1DD3	0C 	.		inr	c
1DD4	2E EA	.j		mvi	l,&HEA
1DD6	1D 	.		dcr	e
1DD7	0A 	.		ldax	bc
1DD8	2E F4	.t		mvi	l,&HF4
1DDA	1D 	.		dcr	e
1DDB	08 	.		exaf
1DDC	2E 99	..		mvi	l,&H99
1DDE	1C 	.		inr	e
1DDF	FF 	.		rst	7
1DE0	27 	'		daa
1DE1	38 26	8&		jrc	L_1E09
1DE3	0C 	.		inr	c
1DE4	18 12	..		jmpr	&H1DF8
1DE6	13 	.		inx	de
1DE7	04 	.		inr	b
1DE8	11 2718	..%		lxi	de,&H2718
1DEB	1D 	.		dcr	e
1DEC	1A 	.		ldax	de
1DED	26 0F	&.		mvi	h,&H0F
1DEF	0E 08	..		mvi	c,&H08
1DF1	0D 	.		dcr	c
1DF2	13 	.		inx	de
1DF3	12 	.		stax	de
1DF4	27 	'		daa
1DF5	1C 	.		inr	e
1DF6	1A 	.		ldax	de
1DF7	26 0F	&.		mvi	h,&H0F
1DF9	0E 08	..		mvi	c,&H08
1DFB	0D 	.		dcr	c
1DFC	13 	.		inx	de
1DFD	12 	.		stax	de
1DFE	00 	.		nop
1DFF	00 	.		nop
1E00	00 	.		nop
1E01	1F 	.		rar
1E02	24 	$		inr	h
1E03	44 	D		mov	b,h
1E04	24 	$	L_1E04	inr	h
1E05	1F 	.		rar
1E06	00 	.		nop
1E07	00 	.		nop
1E08	00 	.		nop
1E09	7F 	.	L_1E09	mov	a,a
1E0A	49 	I		mov	c,c
1E0B	49 	I		mov	c,c
1E0C	49 	I		mov	c,c
1E0D	36 00	6.		mvi	m,&H00
1E0F	00 	.		nop
1E10	00 	.		nop
1E11	3E 41	>A		mvi	a,&H41
1E13	41 	A		mov	b,c
1E14	41 	A		mov	b,c
1E15	22 0000	"..		shld	L_0000
1E18	00 	.		nop
1E19	7F 	.		mov	a,a
1E1A	41 	A		mov	b,c
1E1B	41 	A		mov	b,c
1E1C	41 	A		mov	b,c
1E1D	3E 00	>.		mvi	a,&H00
1E1F	00 	.		nop
1E20	00 	.		nop
1E21	7F 	.		mov	a,a
1E22	49 	I		mov	c,c
1E23	49 	I		mov	c,c
1E24	49 	I		mov	c,c
1E25	41 	A		mov	b,c
1E26	00 	.		nop
1E27	00 	.		nop
1E28	00 	.		nop
1E29	7F 	.		mov	a,a
1E2A	48 	H		mov	c,b
1E2B	48 	H		mov	c,b
1E2C	48 	H		mov	c,b
1E2D	40 	@		mov	b,b
1E2E	00 	.		nop
1E2F	00 	.		nop
1E30	00 	.		nop
1E31	3E 41	>A		mvi	a,&H41
1E33	41 	A		mov	b,c
1E34	45 	E		mov	b,l
1E35	47 	G		mov	b,a
1E36	00 	.		nop
1E37	00 	.		nop
1E38	00 	.		nop
1E39	7F 	.		mov	a,a
1E3A	08 	.		exaf
1E3B	08 	.		exaf
1E3C	08 	.		exaf
1E3D	7F 	.		mov	a,a
1E3E	00 	.		nop
1E3F	00 	.		nop
1E40	00 	.		nop
1E41	00 	.		nop
1E42	41 	A		mov	b,c
1E43	7F 	.		mov	a,a
1E44	41 	A		mov	b,c
1E45	00 	.		nop
1E46	00 	.		nop
1E47	00 	.		nop
1E48	00 	.		nop
1E49	02 	.		stax	bc
1E4A	01 0101	...		lxi	bc,&H0101
1E4D	7E 	~		mov	a,m
1E4E	00 	.		nop
1E4F	00 	.		nop
1E50	00 	.		nop
1E51	7F 	.		mov	a,a
1E52	08 	.		exaf
1E53	14 	.		inr	d
1E54	22 0041	"A.		shld	&H0041
1E57	00 	.		nop
1E58	00 	.		nop
1E59	7F 	.		mov	a,a
1E5A	01 0101	...		lxi	bc,&H0101
1E5D	01 0000	...		lxi	bc,&H0000
1E60	00 	.		nop
1E61	7F 	.		mov	a,a
1E62	20 18	 .		jrnz	L_1E7C
1E64	20 7F	 .		jrnz	L_1EE5
1E66	00 	.		nop
1E67	00 	.		nop
1E68	00 	.		nop
1E69	7F 	.		mov	a,a
1E6A	10 08	..		djnz	L_1E74
1E6C	04 	.		inr	b
1E6D	7F 	.		mov	a,a
1E6E	00 	.		nop
1E6F	00 	.		nop
1E70	00 	.		nop
1E71	3E 41	>A		mvi	a,&H41
1E73	41 	A		mov	b,c
1E74	41 	A	L_1E74	mov	b,c
1E75	3E 00	>.		mvi	a,&H00
1E77	00 	.		nop
1E78	00 	.		nop
1E79	7F 	.		mov	a,a
1E7A	48 	H		mov	c,b
1E7B	48 	H		mov	c,b
1E7C	48 	H	L_1E7C	mov	c,b
1E7D	30 00	0.		jrnc	L_1E7F
1E7F	00 	.	L_1E7F	nop
1E80	00 	.		nop
1E81	3E 41	>A		mvi	a,&H41
1E83	45 	E		mov	b,l
1E84	42 	B		mov	b,d
1E85	3D 	=		dcr	a
1E86	00 	.		nop
1E87	00 	.		nop
1E88	00 	.		nop
1E89	7F 	.		mov	a,a
1E8A	48 	H		mov	c,b
1E8B	4C 	L		mov	c,h
1E8C	4A 	J		mov	c,d
1E8D	31 0000	1..		lxi	sp,&H0000
1E90	00 	.		nop
1E91	32 4949	2II		sta	&H4949
1E94	49 	I		mov	c,c
1E95	26 00	&.		mvi	h,&H00
1E97	00 	.		nop
1E98	00 	.		nop
1E99	40 	@		mov	b,b
1E9A	40 	@		mov	b,b
1E9B	7F 	.		mov	a,a
1E9C	40 	@		mov	b,b
1E9D	40 	@		mov	b,b
1E9E	00 	.		nop
1E9F	00 	.		nop
1EA0	00 	.		nop
1EA1	7E 	~		mov	a,m
1EA2	01 0101	..I		lxi	bc,&H0101
1EA5	7E 	~		mov	a,m
1EA6	00 	.		nop
1EA7	00 	.		nop
1EA8	00 	.		nop
1EA9	7C 	|		mov	a,h
1EAA	02 	.		stax	bc
1EAB	01 7C02	..I		lxi	bc,&H7C02
1EAE	00 	.		nop
1EAF	00 	.		nop
1EB0	00 	.		nop
1EB1	7F 	.		mov	a,a
1EB2	02 	.		stax	bc
1EB3	0C 	.		inr	c
1EB4	02 	.		stax	bc
1EB5	7F 	.		mov	a,a
1EB6	00 	.		nop
1EB7	00 	.		nop
1EB8	00 	.		nop
1EB9	63 	c		mov	h,e
1EBA	14 	.		inr	d
1EBB	08 	.		exaf
1EBC	14 	.		inr	d
1EBD	63 	c		mov	h,e
1EBE	00 	.		nop
1EBF	00 	.		nop
1EC0	00 	.		nop
1EC1	60 	`		mov	h,b
1EC2	10 0F	..		djnz	L_1ED3
1EC4	10 60	.`		djnz	L_1F26
1EC6	00 	.		nop
1EC7	00 	.		nop
1EC8	00 	.		nop
1EC9	43 	C		mov	b,e
1ECA	45 	E		mov	b,l
1ECB	49 	I		mov	c,c
1ECC	51 	Q		mov	d,c
1ECD	61 	a		mov	h,c
1ECE	00 	.		nop
1ECF	00 	.		nop
1ED0	00 	.		nop
1ED1	3E 45	>E		mvi	a,&H45
1ED3	49 	I	L_1ED3	mov	c,c
1ED4	51 	Q		mov	d,c
1ED5	3E 00	>.		mvi	a,&H00
1ED7	00 	.		nop
1ED8	00 	.		nop
1ED9	00 	.		nop
1EDA	21 017F	!.I		lxi	hl,&H017F
1EDD	00 	.		nop
1EDE	00 	.		nop
1EDF	00 	.		nop
1EE0	00 	.		nop
1EE1	23 	#		inx	hl
1EE2	45 	E		mov	b,l
1EE3	49 	I		mov	c,c
1EE4	49 	I		mov	c,c
1EE5	31 0000	1.I	L_1EE5	lxi	sp,&H0000
1EE8	00 	.		nop
1EE9	42 	B		mov	b,d
1EEA	41 	A		mov	b,c
1EEB	49 	I		mov	c,c
1EEC	59 	Y		mov	e,c
1EED	66 	f		mov	h,m
1EEE	00 	.		nop
1EEF	00 	.		nop
1EF0	00 	.		nop
1EF1	0C 	.		inr	c
1EF2	14 	.		inr	d
1EF3	24 	$		inr	h
1EF4	7F 	.		mov	a,a
1EF5	04 	.		inr	b
1EF6	00 	.		nop
1EF7	00 	.		nop
1EF8	00 	.		nop
1EF9	72 	r		mov	m,d
1EFA	51 	Q		mov	d,c
1EFB	51 	Q		mov	d,c
1EFC	51 	Q		mov	d,c
1EFD	4E 	N		mov	c,m
1EFE	00 	.		nop
1EFF	00 	.		nop
1F00	00 	.		nop
1F01	1E 29	.)		mvi	e,&H29
1F03	49 	I		mov	c,c
1F04	49 	I		mov	c,c
1F05	46 	F		mov	b,m
1F06	00 	.		nop
1F07	00 	.		nop
1F08	00 	.		nop
1F09	40 	@		mov	b,b
1F0A	47 	G		mov	b,a
1F0B	48 	H		mov	c,b
1F0C	50 	P		mov	d,b
1F0D	60 	`		mov	h,b
1F0E	00 	.		nop
1F0F	00 	.		nop
1F10	00 	.		nop
1F11	36 49	6I		mvi	m,&H49
1F13	49 	I		mov	c,c
1F14	49 	I		mov	c,c
1F15	36 00	6.		mvi	m,&H00
1F17	00 	.		nop
1F18	00 	.		nop
1F19	31 4949	1II		lxi	sp,&H4949
1F1C	4A 	J		mov	c,d
1F1D	3C 	<		inr	a
1F1E	00 	.		nop
1F1F	00 	.		nop
1F20	00 	.		nop
1F21	08 	.		exaf
1F22	14 	.		inr	d
1F23	22 0041	"A.		shld	&H0041
1F26	00 	.	L_1F26	nop
1F27	00 	.		nop
1F28	00 	.		nop
1F29	00 	.		nop
1F2A	41 	A		mov	b,c
1F2B	22 0814	"..		shld	L_0814
1F2E	00 	.		nop
1F2F	00 	.		nop
1F30	00 	.		nop
1F31	00 	.		nop
1F32	00 	.		nop
1F33	00 	.		nop
1F34	00 	.		nop
1F35	00 	.		nop
1F36	00 	.		nop
1F37	00 	.		nop
1F38	00 	.		nop
1F39	14 	.		inr	d
1F3A	14 	.		inr	d
1F3B	14 	.		inr	d
1F3C	14 	.		inr	d
1F3D	14 	.		inr	d
1F3E	00 	.		nop
1F3F	00 	.		nop
1F40	00 	.		nop
1F41	22 7F14	"..		shld	&H7F14
1F44	14 	.		inr	d
1F45	22 0000	"..		shld	L_0000
1F48	00 	.		nop
1F49	03 	.		inx	bc
1F4A	04 	.		inr	b
1F4B	78 	x		mov	a,b
1F4C	04 	.		inr	b
1F4D	03 	.		inx	bc
1F4E	00 	.		nop
1F4F	00 	.		nop
1F50	24 	$	L_1F50	inr	h
1F51	1B 	.		dcx	de
1F52	26 0E	&.		mvi	h,&H0E
1F54	11 1C26	.&.		lxi	de,&H1C26
1F57	26 0F	&.		mvi	h,&H0F
1F59	0B 	.		dcx	bc
1F5A	00 	.		nop
1F5B	18 04	..		jmpr	&H1F61
1F5D	11 2512	...		lxi	de,&H2512
1F60	26 26	&&		mvi	h,&H26
1F62	28 1B	(.	L_1F62	jrz	&H1F7F
1F64	26 0F	&.		mvi	h,&H0F
1F66	0B 	.		dcx	bc
1F67	00 	.		nop
1F68	18 04	..		jmpr	L_1F6E
1F6A	11 2626	.&.		lxi	de,&H2626
1F6D	1B 	.		dcx	de
1F6E	26 02	&.	L_1F6E	mvi	h,&H02
1F70	0E 08	..		mvi	c,&H08
1F72	0D 	.	L_1F72	dcr	c
1F73	26 01	&.		mvi	h,&H01
1F75	01 0000	...		lxi	bc,&H0000
1F78	01 0200	...		lxi	bc,&H0200
1F7B	01 0200	...		lxi	bc,&H0200
1F7E	01 6000	...		lxi	bc,&H6000
1F81	10 0F	..		djnz	L_1F92
1F83	10 60	.`		djnz	L_1FE5
1F85	30 18	0.		jrnc	&H1F9F
1F87	1A 	.		ldax	de
1F88	3D 	=		dcr	a
1F89	68 	h		mov	l,b
1F8A	FC 68FC	||h		cm	&H68FC
1F8D	3D 	=		dcr	a
1F8E	1A 	.		ldax	de
1F8F	00 	.		nop
1F90	08 	.		exaf
1F91	0D 	.		dcr	c
1F92	12 	.	L_1F92	stax	de
1F93	04 	.		inr	b
1F94	11 2613	..h		lxi	de,&H2613
1F97	26 02	&.		mvi	h,&H02
1F99	0E 08	..		mvi	c,&H08
1F9B	0D 	.		dcr	c
1F9C	0D 	.		dcr	c
1F9D	2A 1F50	*P.		lhld	L_1F50
1FA0	0A 	.		ldax	bc
1FA1	2A 1F62	*b.		lhld	L_1F62
1FA4	07 	.		rlc
1FA5	2A 1FE1	*a.		lhld	L_1FE1
1FA8	FF 	.		rst	7
1FA9	02 	.		stax	bc
1FAA	11 0304	...		lxi	de,&H0304
1FAD	08 	.		exaf
1FAE	13 	.		inx	de
1FAF	26 00	&.		mvi	h,&H00
1FB1	60 	`		mov	h,b
1FB2	10 0F	..		djnz	L_1FC3
1FB4	10 60	.`		djnz	&H2016
1FB6	38 19	8.		jrc	&H1FD1
1FB8	3A FA6D	:mz		lda	&HFA6D
1FBB	FA 3A6D	zm:		jm	&H3A6D
1FBE	19 	.		dad	de
1FBF	00 	.		nop
1FC0	00 	.		nop
1FC1	20 40	 @		jrnz	&H2003
1FC3	4D 	M	L_1FC3	mov	c,l
1FC4	50 	P		mov	d,b
1FC5	20 00	 .		jrnz	L_1FC7
1FC7	00 	.	L_1FC7	nop
1FC8	00 	.		nop
1FC9	00 	.		nop
1FCA	00 	.		nop
1FCB	FF 	.		rst	7
1FCC	B8 	8		cmp	b
1FCD	FF 	.		rst	7
1FCE	80 	.		add	b
1FCF	1F 	.		rar
1FD0	10 97	..		djnz	&H1F69
1FD2	00 	.		nop
1FD3	80 	.		add	b
1FD4	1F 	.		rar
1FD5	00 	.		nop
1FD6	00 	.		nop
1FD7	01 22D0	.P:		lxi	bc,&H22D0
1FDA	20 1C	 .		jrnz	&H1FF8
1FDC	10 94	..		djnz	L_1F72
1FDE	00 	.		nop
1FDF	20 1C	 .		jrnz	L_1FFD
1FE1	28 1C	(.	L_1FE1	jrz	L_1FFF
1FE3	26 0F	&.		mvi	h,&H0F
1FE5	0B 	.	L_1FE5	dcx	bc
1FE6	00 	.		nop
1FE7	18 04	..		jmpr	L_1FED
1FE9	11 2612	..:		lxi	de,&H2612
1FEC	1C 	.		inr	e
1FED	26 02	&.	L_1FED	mvi	h,&H02
1FEF	0E 08	..		mvi	c,&H08
1FF1	0D 	.		dcr	c
1FF2	12 	.		stax	de
1FF3	0F 	.		rrc
1FF4	14 	.		inr	d
1FF5	12 	.		stax	de
1FF6	07 	.		rlc
1FF7	26 00	&.		mvi	h,&H00
1FF9	08 	.		exaf
1FFA	08 	.		exaf
1FFB	08 	.		exaf
1FFC	08 	.		exaf
1FFD	08 	.	L_1FFD	exaf
1FFE	00 	.		nop
1FFF	00 	.	L_1FFF	nop
2000	00 	.	L_2000	nop
