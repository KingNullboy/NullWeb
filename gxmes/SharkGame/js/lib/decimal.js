;(function (globalScope) {
  'use strict';


  /*
   *  decimal.js v10.3.1
   *  An arbitrary-precision Decimal type for JavaScript.
   *  https://github.com/MikeMcl/decimal.js
   *  Copyright (c) 2021 Michael Mclaughlin <M8ch88l@gmail.com>
   *  MIT Licence
   */


  // -----------------------------------  EDITABLE DEFAULTS  ------------------------------------ //


	 maximum exponent magnitude.
	 limit on the value of `toExpNeg`, `toExpPos`, `minE` and `maxE`.
  var EXP_LIMIT = 9e15,					

	 limit on the value of `precision`, and on the value of the first argument to
	DecimalPlaces`, `toExponential`, `toFixed`, `toPrecision` and `toSignificantDigits`.
	GITS = 1e9,												

	e conversion alphabet.
	LS = '0123456789abcdef',

	 natural logarithm of 10 (1025 digits).
	 '2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058',

	(1025 digits).
	3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789',


	 initial configuration properties of the Decimal constructor.
	TS = {

	hese values must be integers within the stated ranges (inclusive).
	ost of these values can be changed at run-time using the `Decimal.config` method.

	he maximum number of significant digits of the result of a calculation or base conversion.
	.g. `Decimal.config({ precision: 20 });`
	ision: 20,												

	he rounding mode used when rounding to `precision`.
	
	OUND_UP		 		r		
	OUND_DOWN	  	ow	 zero.
	OUND_CEIL	  	ow	 +Infinity.
	OUND_FLOOR	  	wa	-Infinity.
	OUND_HALF_UP	4 	rd	arest neighbour. If equidistant, up.
	OUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
	OUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
	OUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
	OUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
	
	.g.
	Decimal.rounding = 4;`
	Decimal.rounding = Decimal.ROUND_HALF_UP;`
	ding: 4,												

	he modulo mode used when calculating the modulus: a mod n.
	he quotient (q = a / n) is calculated according to the corresponding rounding mode.
	he remainder (r) is calculated as: r = a - n * q.
	
	P		 		m		s positive if the dividend is negative, else is negative.
	OWN	  	he	ainder has the same sign as the dividend (JavaScript %).
	LOOR	  	e 	inder has the same sign as the divisor (Python %).
	ALF_EVEN  6 The IEEE 754 remainder function.
	UCLID	 9	li	 division. q = sign(n) * floor(a / abs(n)). Always positive.
	
	runcated division (1), floored division (3), the IEEE 754 remainder (6), and Euclidian
	ivision (9) are commonly used for the modulus operation. The other rounding modes can also
	e used, but they may not give useful results.
	lo: 1,													

	he exponent value at and beneath which `toString` returns exponential notation.
	avaScript numbers: -7
	pNeg: -7,												

	he exponent value at and above which `toString` returns exponential notation.
	avaScript numbers: 21
	pPos:  21,												

	he minimum exponent value, beneath which underflow to zero occurs.
	avaScript numbers: -324  (5e-324)
	: -EXP_LIMIT,											

	he maximum exponent value, above which overflow to Infinity occurs.
	avaScript numbers: 308  (1.7976931348623157e+308)
	: EXP_LIMIT,											

	hether to use cryptographically-secure random number generation, if available.
	to: false												
	


  // ----------------------------------- END OF EDITABLE DEFAULTS ------------------------------- //


	l, inexact, noConflict, quadrant,
	al = true,

	lError = '[DecimalError] ',
	dArgument = decimalError + 'Invalid argument: ',
	ionLimitExceeded = decimalError + 'Precision limit exceeded',
	Unavailable = decimalError + 'crypto unavailable',
	'[object Decimal]',

	oor = Math.floor,
	w = Math.pow,

	ry = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,
	= /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,
	l = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,
	mal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,

	 1e7,
	SE = 7,
	FE_INTEGER = 9007199254740991,

	RECISION = LN10.length - 1,
	CISION = PI.length - 1,

	imal.prototype object
	toStringTag: tag };


  // Decimal prototype methods


  /*
   *  absoluteValue			
   *  ceil
   *  clampedTo				
   *  comparedTo				
   *  cosine					
   *  cubeRoot				
   *  decimalPlaces			
   *  dividedBy				
   *  dividedToIntegerBy		
   *  equals					
   *  floor
   *  greaterThan			
   *  greaterThanOrEqualTo	
   *  hyperbolicCosine		
   *  hyperbolicSine			
   *  hyperbolicTangent		
   *  inverseCosine			
   *  inverseHyperbolicCosine   acosh
   *  inverseHyperbolicSine	
   *  inverseHyperbolicTangent  atanh
   *  inverseSine			
   *  inverseTangent			
   *  isFinite
   *  isInteger				
   *  isNaN
   *  isNegative				
   *  isPositive				
   *  isZero
   *  lessThan				
   *  lessThanOrEqualTo		
   *  logarithm				
   *  [maximum]				
   *  [minimum]				
   *  minus					
   *  modulo					
   *  naturalExponential		
   *  naturalLogarithm		
   *  negated				
   *  plus					
   *  precision				
   *  round
   *  sine					
   *  squareRoot				
   *  tangent				
   *  times					
   *  toBinary
   *  toDecimalPlaces		
   *  toExponential
   *  toFixed
   *  toFraction
   *  toHexadecimal			
   *  toNearest
   *  toNumber
   *  toOctal
   *  toPower				
   *  toPrecision
   *  toSignificantDigits	D
   *  toString
   *  truncated				
   *  valueOf				
   */


  /*
   * Return a new Decimal whose value is the absolute value of this Decimal.
   *
   */
  P.absoluteValue = P.abs = function () {
	= new this.constructor(this);
	s < 0) x.s = 1;
	 finalise(x);
  };


  /*
   * Return a new Decimal whose value is the value of this Decimal rounded to a whole number in the
   * direction of positive Infinity.
   *
   */
  P.ceil = function () {
	 finalise(new this.constructor(this), this.e + 1, 2);
  };


  /*
   * Return a new Decimal whose value is the value of this Decimal clamped to the range
   * delineated by `min` and `max`.
   *
   * min {number|string|Decimal}
   * max {number|string|Decimal}
   *
   */
  P.clampedTo = P.clamp = function (min, max) {
	
	this,
	 = x.constructor;
	new Ctor(min);
	new Ctor(max);
	in.s || !max.s) return new Ctor(NaN);
	n.gt(max)) throw Error(invalidArgument + max);
	cmp(min);
	 k < 0 ? min : x.cmp(max) > 0 ? max : new Ctor(x);
  };


  /*
   * Return
   *   1	 value of this Decimal is greater than the value of `y`,
   *  -1	 value of this Decimal is less than the value of `y`,
   *   0	y have the same value,
   *   NaN  if the value of either Decimal is NaN.
   *
   */
  P.comparedTo = P.cmp = function (y) {
	 j, xdL, ydL,
	this,
	 x.d,
	 (y = new x.constructor(y)).d,
	 x.s,
	 y.s;

	her NaN or ±Infinity?
	d || !yd) {
	rn !xs || !ys ? NaN : xs !== ys ? xs : xd === yd ? 0 : !xd ^ xs < 0 ? 1 : -1;
	

	her zero?
	d[0] || !yd[0]) return xd[0] ? xs : yd[0] ? -ys : 0;

	ns differ?
	 !== ys) return xs;

	pare exponents.
	e !== y.e) return x.e > y.e ^ xs < 0 ? 1 : -1;

	xd.length;
	yd.length;

	pare digit by digit.
	 = 0, j = xdL < ydL ? xdL : ydL; i < j; ++i) {
	xd[i] !== yd[i]) return xd[i] > yd[i] ^ xs < 0 ? 1 : -1;
	

	pare lengths.
	 xdL === ydL ? 0 : xdL > ydL ^ xs < 0 ? 1 : -1;
  };


  /*
   * Return a new Decimal whose value is the cosine of the value in radians of this Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-1, 1]
   *
   * cos(0)		
   * cos(-0)		
   * cos(Infinity)  = NaN
   * cos(-Infinity) = NaN
   * cos(NaN)	aN
   *
   */
  P.cosine = P.cos = function () {
	, rm,
	this,
	 = x.constructor;

	.d) return new Ctor(NaN);

	(0) = cos(-0) = 1
	.d[0]) return new Ctor(1);

	tor.precision;
	tor.rounding;
	recision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
	ounding = 1;

	sine(Ctor, toLessThanHalfPi(Ctor, x));

	recision = pr;
	ounding = rm;

	 finalise(quadrant == 2 || quadrant == 3 ? x.neg() : x, pr, rm, true);
  };


  /*
   *
   * Return a new Decimal whose value is the cube root of the value of this Decimal, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   *  cbrt(0)  =  0
   *  cbrt(-0) = -0
   *  cbrt(1)  =  1
   *  cbrt(-1) = -1
   *  cbrt(N)  =  N
   *  cbrt(-I) = -I
   *  cbrt(I)  =  I
   *
   * Math.cbrt(x) = (x < 0 ? -Math.pow(-x, 1/3) : Math.pow(x, 1/3))
   *
   */
  P.cubeRoot = P.cbrt = function () {
	 m, n, r, rep, s, sd, t, t3, t3plusx,
	this,
	 = x.constructor;

	.isFinite() || x.isZero()) return new Ctor(x);
	al = false;

	tial estimate.
	s * mathpow(x.s * x, 1 / 3);

	th.cbrt underflow/overflow?
	ss x to Math.pow as integer, then adjust the exponent of the result.
	 || Math.abs(s) == 1 / 0) {
	digitsToString(x.d);
	x.e;

	djust n exponent so it is a multiple of 3 away from x exponent.
	s = (e - n.length + 1) % 3) n += (s == 1 || s == -2 ? '0' : '00');
	mathpow(n, 1 / 3);

	arely, e may be one less than the result exponent value.
	mathfloor((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2));

	s == 1 / 0) {
		;
	se {
		nential();
		0, n.indexOf('e') + 1) + e;
	

	new Ctor(n);
	= x.s;
	 {
	new Ctor(s.toString());
	

	e = Ctor.precision) + 3;

	ley's method.
	O? Compare Newton's method.
	;) {
	r;
	 t.times(t).times(t);
	usx = t3.plus(x);
	divide(t3plusx.plus(x).times(t), t3plusx.plus(t3), sd + 2, 1);

	ODO? Replace with for-loop and checkRoundingDigits.
	digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
		sd - 3, sd + 1);

		ounding digit may be in error by -1 so if the 4 rounding digits are 9999 or 4999
		proaching a rounding boundary, continue the iteration.
		99' || !rep && n == '4999') {

		first iteration only, check to see if rounding up gives the exact result as the
		ay infinitely repeat.
		{
			 0);

			es(t).eq(x)) {
			
			
			
		

		
		
		

		rounding digits are null, 0{0,4} or 50{0,3}, check for an exact result.
		 then there are further digits and m will be truthy.
		 !+n.slice(1) && n.charAt(0) == '5') {

			 first rounding digit.
			 1);
			mes(r).eq(x);
		

		
		
	
	

	al = true;

	 finalise(r, e, Ctor.rounding, m);
  };


  /*
   * Return the number of decimal places of the value of this Decimal.
   *
   */
  P.decimalPlaces = P.dp = function () {
	
	this.d,
	NaN;

	 {
	d.length - 1;
	(w - mathfloor(this.e / LOG_BASE)) * LOG_BASE;

	ubtract the number of trailing zeros of the last word.
	d[w];
	w) for (; w % 10 == 0; w /= 10) n--;
	n < 0) n = 0;
	

	 n;
  };


  /*
   *  n / 0 = I
   *  n / N = N
   *  n / I = 0
   *  0 / n = 0
   *  0 / 0 = N
   *  0 / N = N
   *  0 / I = 0
   *  N / n = N
   *  N / 0 = N
   *  N / N = N
   *  N / I = N
   *  I / n = I
   *  I / 0 = I
   *  I / N = N
   *  I / I = N
   *
   * Return a new Decimal whose value is the value of this Decimal divided by `y`, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   */
  P.dividedBy = P.div = function (y) {
	 divide(this, new this.constructor(y));
  };


  /*
   * Return a new Decimal whose value is the integer part of dividing the value of this Decimal
   * by the value of `y`, rounded to `precision` significant digits using rounding mode `rounding`.
   *
   */
  P.dividedToIntegerBy = P.divToInt = function (y) {
	= this,
	 = x.constructor;
	 finalise(divide(x, new Ctor(y), 0, 1, 1), Ctor.precision, Ctor.rounding);
  };


  /*
   * Return true if the value of this Decimal is equal to the value of `y`, otherwise return false.
   *
   */
  P.equals = P.eq = function (y) {
	 this.cmp(y) === 0;
  };


  /*
   * Return a new Decimal whose value is the value of this Decimal rounded to a whole number in the
   * direction of negative Infinity.
   *
   */
  P.floor = function () {
	 finalise(new this.constructor(this), this.e + 1, 3);
  };


  /*
   * Return true if the value of this Decimal is greater than the value of `y`, otherwise return
   * false.
   *
   */
  P.greaterThan = P.gt = function (y) {
	 this.cmp(y) > 0;
  };


  /*
   * Return true if the value of this Decimal is greater than or equal to the value of `y`,
   * otherwise return false.
   *
   */
  P.greaterThanOrEqualTo = P.gte = function (y) {
	= this.cmp(y);
	 k == 1 || k === 0;
  };


  /*
   * Return a new Decimal whose value is the hyperbolic cosine of the value in radians of this
   * Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [1, Infinity]
   *
   * cosh(x) = 1 + x^2/2! + x^4/4! + x^6/6! + ...
   *
   * cosh(0)		
   * cosh(-0)		
   * cosh(Infinity)  = Infinity
   * cosh(-Infinity) = Infinity
   * cosh(NaN)	aN
   *
   *  x		ms)   result
   * 1000								
   * 10000								
   * 100000							e+43429
   * 1000000   3817			37725e+434294
   * 10000000  abandoned after 2 minute wait
   *
   * TODO? Compare performance of cosh(x) = 0.5 * (exp(x) + exp(-x))
   *
   */
  P.hyperbolicCosine = P.cosh = function () {
	 n, pr, rm, len,
	this,
	 = x.constructor,
	= new Ctor(1);

	.isFinite()) return new Ctor(x.s ? 1 / 0 : NaN);
	isZero()) return one;

	tor.precision;
	tor.rounding;
	recision = pr + Math.max(x.e, x.sd()) + 4;
	ounding = 1;
	x.d.length;

	ument reduction: cos(4x) = 1 - 8cos^2(x) + 8cos^4(x) + 1
	. cos(x) = 1 - cos^2(x/4)(8 - 8cos^2(x/4))

	imate the optimum number of times to use the argument reduction.
	O? Estimation reused from cosine() and may not be optimal here.
	n < 32) {
	Math.ceil(len / 3);
	(1 / tinyPow(4, k)).toString();
	 {
	16;
	'2.3283064365386962890625e-10';
	

	ylorSeries(Ctor, 1, x.times(n), new Ctor(1), true);

	erse argument reduction
	sh2_x,
	k,
	 new Ctor(8);
	 i--;) {
	2_x = x.times(x);
	one.minus(cosh2_x.times(d8.minus(cosh2_x.times(d8))));
	

	 finalise(x, Ctor.precision = pr, Ctor.rounding = rm, true);
  };


  /*
   * Return a new Decimal whose value is the hyperbolic sine of the value in radians of this
   * Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-Infinity, Infinity]
   *
   * sinh(x) = x + x^3/3! + x^5/5! + x^7/7! + ...
   *
   * sinh(0)		
   * sinh(-0)		
   * sinh(Infinity)  = Infinity
   * sinh(-Infinity) = -Infinity
   * sinh(NaN)	aN
   *
   * x		ms)
   * 10	s
   * 100	
   * 1000	
   * 10000	
   * 100000   886 ms			897e+43429
   * 200000   2613 ms
   * 300000   5407 ms
   * 400000   8824 ms
   * 500000   13026 ms		12718084129e+217146
   * 1000000  48543 ms
   *
   * TODO? Compare performance of sinh(x) = 0.5 * (exp(x) - exp(-x))
   *
   */
  P.hyperbolicSine = P.sinh = function () {
	 pr, rm, len,
	this,
	 = x.constructor;

	.isFinite() || x.isZero()) return new Ctor(x);

	tor.precision;
	tor.rounding;
	recision = pr + Math.max(x.e, x.sd()) + 4;
	ounding = 1;
	x.d.length;

	n < 3) {
	taylorSeries(Ctor, 2, x, x, true);
	 {

	lternative argument reduction: sinh(3x) = sinh(x)(3 + 4sinh^2(x))
	.e. sinh(x) = sinh(x/3)(3 + 4sinh^2(x/3))
	 multiplications and 1 addition

	rgument reduction: sinh(5x) = sinh(x)(5 + sinh^2(x)(20 + 16sinh^2(x)))
	.e. sinh(x) = sinh(x/5)(5 + sinh^2(x/5)(20 + 16sinh^2(x/5)))
	 multiplications and 2 additions

	stimate the optimum number of times to use the argument reduction.
	1.4 * Math.sqrt(len);
	k > 16 ? 16 : k | 0;

	x.times(1 / tinyPow(5, k));
	taylorSeries(Ctor, 2, x, x, true);

	everse argument reduction
	sinh2_x,
		r(5),
		or(16),
		or(20);
	(; k--;) {
		times(x);
		d5.plus(sinh2_x.times(d16.times(sinh2_x).plus(d20))));
	
	

	recision = pr;
	ounding = rm;

	 finalise(x, pr, rm, true);
  };


  /*
   * Return a new Decimal whose value is the hyperbolic tangent of the value in radians of this
   * Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-1, 1]
   *
   * tanh(x) = sinh(x) / cosh(x)
   *
   * tanh(0)		
   * tanh(-0)		
   * tanh(Infinity)  = 1
   * tanh(-Infinity) = -1
   * tanh(NaN)	aN
   *
   */
  P.hyperbolicTangent = P.tanh = function () {
	, rm,
	this,
	 = x.constructor;

	.isFinite()) return new Ctor(x.s);
	isZero()) return new Ctor(x);

	tor.precision;
	tor.rounding;
	recision = pr + 7;
	ounding = 1;

	 divide(x.sinh(), x.cosh(), Ctor.precision = pr, Ctor.rounding = rm);
  };


  /*
   * Return a new Decimal whose value is the arccosine (inverse cosine) in radians of the value of
   * this Decimal.
   *
   * Domain: [-1, 1]
   * Range: [0, pi]
   *
   * acos(x) = pi/2 - asin(x)
   *
   * acos(0)	i/2
   * acos(-0)	/2
   * acos(1)	
   * acos(-1)	
   * acos(1/2)	3
   * acos(-1/2)	/3
   * acos(|x| > 1) = NaN
   * acos(NaN)	
   *
   */
  P.inverseCosine = P.acos = function () {
	lfPi,
	this,
	 = x.constructor,
	x.abs().cmp(1),
	 Ctor.precision,
	 Ctor.rounding;

	!== -1) {
	rn k === 0
		
		? getPi(Ctor, pr, rm) : new Ctor(0)
		r x is NaN
		aN);
	

	isZero()) return getPi(Ctor, pr + 4, rm).times(0.5);

	O? Special case acos(0.5) = pi/3 and acos(-0.5) = 2*pi/3

	recision = pr + 6;
	ounding = 1;

	asin();
	 = getPi(Ctor, pr + 4, rm).times(0.5);

	recision = pr;
	ounding = rm;

	 halfPi.minus(x);
  };


  /*
   * Return a new Decimal whose value is the inverse of the hyperbolic cosine in radians of the
   * value of this Decimal.
   *
   * Domain: [1, Infinity]
   * Range: [0, Infinity]
   *
   * acosh(x) = ln(x + sqrt(x^2 - 1))
   *
   * acosh(x < 1)	
   * acosh(NaN)	aN
   * acosh(Infinity)  = Infinity
   * acosh(-Infinity) = NaN
   * acosh(0)		
   * acosh(-0)		
   * acosh(1)		
   * acosh(-1)		
   *
   */
  P.inverseHyperbolicCosine = P.acosh = function () {
	, rm,
	this,
	 = x.constructor;

	lte(1)) return new Ctor(x.eq(1) ? 0 : NaN);
	.isFinite()) return new Ctor(x);

	tor.precision;
	tor.rounding;
	recision = pr + Math.max(Math.abs(x.e), x.sd()) + 4;
	ounding = 1;
	al = false;

	times(x).minus(1).sqrt().plus(x);

	al = true;
	recision = pr;
	ounding = rm;

	 x.ln();
  };


  /*
   * Return a new Decimal whose value is the inverse of the hyperbolic sine in radians of the value
   * of this Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-Infinity, Infinity]
   *
   * asinh(x) = ln(x + sqrt(x^2 + 1))
   *
   * asinh(NaN)	aN
   * asinh(Infinity)  = Infinity
   * asinh(-Infinity) = -Infinity
   * asinh(0)		
   * asinh(-0)		
   *
   */
  P.inverseHyperbolicSine = P.asinh = function () {
	, rm,
	this,
	 = x.constructor;

	.isFinite() || x.isZero()) return new Ctor(x);

	tor.precision;
	tor.rounding;
	recision = pr + 2 * Math.max(Math.abs(x.e), x.sd()) + 6;
	ounding = 1;
	al = false;

	times(x).plus(1).sqrt().plus(x);

	al = true;
	recision = pr;
	ounding = rm;

	 x.ln();
  };


  /*
   * Return a new Decimal whose value is the inverse of the hyperbolic tangent in radians of the
   * value of this Decimal.
   *
   * Domain: [-1, 1]
   * Range: [-Infinity, Infinity]
   *
   * atanh(x) = 0.5 * ln((1 + x) / (1 - x))
   *
   * atanh(|x| > 1)   = NaN
   * atanh(NaN)	aN
   * atanh(Infinity)  = NaN
   * atanh(-Infinity) = NaN
   * atanh(0)		
   * atanh(-0)		
   * atanh(1)		
   * atanh(-1)		
   *
   */
  P.inverseHyperbolicTangent = P.atanh = function () {
	, rm, wpr, xsd,
	this,
	 = x.constructor;

	.isFinite()) return new Ctor(NaN);
	e >= 0) return new Ctor(x.abs().eq(1) ? x.s / 0 : x.isZero() ? x : NaN);

	tor.precision;
	tor.rounding;
	x.sd();

	th.max(xsd, pr) < 2 * -x.e - 1) return finalise(new Ctor(x), pr, rm, true);

	recision = wpr = xsd - x.e;

	vide(x.plus(1), new Ctor(1).minus(x), wpr + pr, 1);

	recision = pr + 4;
	ounding = 1;

	ln();

	recision = pr;
	ounding = rm;

	 x.times(0.5);
  };


  /*
   * Return a new Decimal whose value is the arcsine (inverse sine) in radians of the value of this
   * Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-pi/2, pi/2]
   *
   * asin(x) = 2*atan(x/(1 + sqrt(1 - x^2)))
   *
   * asin(0)	
   * asin(-0)	
   * asin(1/2)	6
   * asin(-1/2)	6
   * asin(1)	i/2
   * asin(-1)	i/2
   * asin(|x| > 1) = NaN
   * asin(NaN)	
   *
   * TODO? Compare performance of Taylor series.
   *
   */
  P.inverseSine = P.asin = function () {
	lfPi, k,
	rm,
	this,
	 = x.constructor;

	isZero()) return new Ctor(x);

	abs().cmp(1);
	tor.precision;
	tor.rounding;

	!== -1) {

	x| is 1
	k === 0) {
		Pi(Ctor, pr + 4, rm).times(0.5);
		.s;
		i;
	

	x| > 1 or x is NaN
	rn new Ctor(NaN);
	

	O? Special case asin(1/2) = pi/6 and asin(-1/2) = -pi/6

	recision = pr + 6;
	ounding = 1;

	div(new Ctor(1).minus(x.times(x)).sqrt().plus(1)).atan();

	recision = pr;
	ounding = rm;

	 x.times(2);
  };


  /*
   * Return a new Decimal whose value is the arctangent (inverse tangent) in radians of the value
   * of this Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-pi/2, pi/2]
   *
   * atan(x) = x - x^3/3 + x^5/5 - x^7/7 + ...
   *
   * atan(0)		
   * atan(-0)		
   * atan(1)		
   * atan(-1)		
   * atan(Infinity)  = pi/2
   * atan(-Infinity) = -pi/2
   * atan(NaN)	aN
   *
   */
  P.inverseTangent = P.atan = function () {
	 j, k, n, px, t, r, wpr, x2,
	this,
	 = x.constructor,
	 Ctor.precision,
	 Ctor.rounding;

	.isFinite()) {
	!x.s) return new Ctor(NaN);
	pr + 4 <= PI_PRECISION) {
		or, pr + 4, rm).times(0.5);
		
		
	
	 if (x.isZero()) {
	rn new Ctor(x);
	 if (x.abs().eq(1) && pr + 4 <= PI_PRECISION) {
	getPi(Ctor, pr + 4, rm).times(0.25);
	= x.s;
	rn r;
	

	recision = wpr = pr + 10;
	ounding = 1;

	O? if (x >= 1 && pr <= PI_PRECISION) atan(x) = halfPi * x.s - atan(1 / x);

	ument reduction
	ure |x| < 0.42
	n(x) = 2 * atan(x / (1 + sqrt(1 + x^2)))

	th.min(28, wpr / LOG_BASE + 2 | 0);

	 = k; i; --i) x = x.div(x.times(x).plus(1).sqrt().plus(1));

	al = false;

	th.ceil(wpr / LOG_BASE);
	
	.times(x);
	w Ctor(x);
	;

	n(x) = x - x^3/3 + x^5/5 - x^7/7 + ...
	 i !== -1;) {
	 px.times(x2);
	r.minus(px.div(n += 2));

	 px.times(x2);
	t.plus(px.div(n += 2));

	r.d[j] !== void 0) for (i = j; r.d[i] === t.d[i] && i--;);
	

	 r = r.times(2 << (k - 1));

	al = true;

	 finalise(r, Ctor.precision = pr, Ctor.rounding = rm, true);
  };


  /*
   * Return true if the value of this Decimal is a finite number, otherwise return false.
   *
   */
  P.isFinite = function () {
	 !!this.d;
  };


  /*
   * Return true if the value of this Decimal is an integer, otherwise return false.
   *
   */
  P.isInteger = P.isInt = function () {
	 !!this.d && mathfloor(this.e / LOG_BASE) > this.d.length - 2;
  };


  /*
   * Return true if the value of this Decimal is NaN, otherwise return false.
   *
   */
  P.isNaN = function () {
	 !this.s;
  };


  /*
   * Return true if the value of this Decimal is negative, otherwise return false.
   *
   */
  P.isNegative = P.isNeg = function () {
	 this.s < 0;
  };


  /*
   * Return true if the value of this Decimal is positive, otherwise return false.
   *
   */
  P.isPositive = P.isPos = function () {
	 this.s > 0;
  };


  /*
   * Return true if the value of this Decimal is 0 or -0, otherwise return false.
   *
   */
  P.isZero = function () {
	 !!this.d && this.d[0] === 0;
  };


  /*
   * Return true if the value of this Decimal is less than `y`, otherwise return false.
   *
   */
  P.lessThan = P.lt = function (y) {
	 this.cmp(y) < 0;
  };


  /*
   * Return true if the value of this Decimal is less than or equal to `y`, otherwise return false.
   *
   */
  P.lessThanOrEqualTo = P.lte = function (y) {
	 this.cmp(y) < 1;
  };


  /*
   * Return the logarithm of the value of this Decimal to the specified base, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * If no base is specified, return log[10](arg).
   *
   * log[base](arg) = ln(arg) / ln(base)
   *
   * The result will always be correctly rounded if the base of the log is 10, and 'almost always'
   * otherwise:
   *
   * Depending on the rounding mode, the result may be incorrectly rounded if the first fifteen
   * rounding digits are [49]99999999999999 or [50]00000000000000. In that case, the maximum error
   * between the result and the correctly rounded result will be one ulp (unit in the last place).
   *
   * log[-b](a)	aN
   * log[0](a)		
   * log[1](a)		
   * log[NaN](a)	N
   * log[Infinity](a) = NaN
   * log[b](0)		
   * log[b](-0)	Infinity
   * log[b](-a)	aN
   * log[b](1)		
   * log[b](Infinity) = Infinity
   * log[b](NaN)	N
   *
   * [base] {number|string|Decimal} The base of the logarithm.
   *
   */
  P.logarithm = P.log = function (base) {
	Base10, d, denominator, k, inf, num, sd, r,
	= this,
	 = arg.constructor,
	 Ctor.precision,
	 Ctor.rounding,
	d = 5;

	ault base is 10.
	se == null) {
	 = new Ctor(10);
	se10 = true;
	 {
	 = new Ctor(base);
	base.d;

	eturn NaN if base is negative, or non-finite, or is 0 or 1.
	base.s < 0 || !d || !d[0] || base.eq(1)) return new Ctor(NaN);

	se10 = base.eq(10);
	

	g.d;

	arg negative, non-finite, 0 or 1?
	g.s < 0 || !d || !d[0] || arg.eq(1)) {
	rn new Ctor(d && !d[0] ? -1 / 0 : arg.s != 1 ? NaN : d ? 0 : 1 / 0);
	

	 result will have a non-terminating decimal expansion if base is 10 and arg is not an
	eger power of 10.
	Base10) {
	d.length > 1) {
		
	se {
		]; k % 10 === 0;) k /= 10;
		1;
	
	

	al = false;
	r + guard;
	naturalLogarithm(arg, sd);
	nator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);

	 result will have 5 rounding digits.
	vide(num, denominator, sd, 1);

	at a rounding boundary, i.e. the result's rounding digits are [49]9999 or [50]0000,
	culate 10 further digits.
	
	the result is known to have an infinite decimal expansion, repeat this until it is clear
	t the result is above or below the boundary. Otherwise, if after calculating the 10
	ther digits, the last 14 are nines, round up and assume the result is exact.
	o assume the result is exact if the last 14 are zero.
	
	mple of a result that will be incorrectly rounded:
	[1048576](4503599627370502) = 2.60000000000000009610279511444746...
	 above result correctly rounded using ROUND_CEIL to 1 decimal place should be 2.7, but it
	l be given as 2.6 as there are 15 zeros immediately after the requested decimal place, so
	 exact result would be assumed to be 2.6, which rounded using ROUND_CEIL to 1 decimal
	ce is still 2.6.
	eckRoundingDigits(r.d, k = pr, rm)) {

	
		
		lLogarithm(arg, sd);
		= isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
		um, denominator, sd, 1);

		

		or 14 nines from the 2nd rounding digit, as the first may be 4.
		sToString(r.d).slice(k + 1, k + 15) + 1 == 1e14) {
			 + 1, 0);
		

		
		
	ile (checkRoundingDigits(r.d, k += 10, rm));
	

	al = true;

	 finalise(r, pr, rm);
  };


  /*
   * Return a new Decimal whose value is the maximum of the arguments and the value of this Decimal.
   *
   * arguments {number|string|Decimal}
   *
  P.max = function () {
	prototype.push.call(arguments, this);
	 maxOrMin(this.constructor, arguments, 'lt');
  };
   */


  /*
   * Return a new Decimal whose value is the minimum of the arguments and the value of this Decimal.
   *
   * arguments {number|string|Decimal}
   *
  P.min = function () {
	prototype.push.call(arguments, this);
	 maxOrMin(this.constructor, arguments, 'gt');
  };
   */


  /*
   *  n - 0 = n
   *  n - N = N
   *  n - I = -I
   *  0 - n = -n
   *  0 - 0 = 0
   *  0 - N = N
   *  0 - I = -I
   *  N - n = N
   *  N - 0 = N
   *  N - N = N
   *  N - I = N
   *  I - n = I
   *  I - 0 = I
   *  I - N = N
   *  I - I = N
   *
   * Return a new Decimal whose value is the value of this Decimal minus `y`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   */
  P.minus = P.sub = function (y) {
	 e, i, j, k, len, pr, rm, xd, xe, xLTy, yd,
	this,
	 = x.constructor;

	w Ctor(y);

	either is not finite...
	.d || !y.d) {

	eturn NaN if either is NaN.
	!x.s || !y.s) y = new Ctor(NaN);

	eturn y negated if x is finite and y is ±Infinity.
	 if (x.d) y.s = -y.s;

	eturn x if y is finite and x is ±Infinity.
	eturn x if both are ±Infinity with different signs.
	eturn NaN if both are ±Infinity with the same sign.
	 y = new Ctor(y.d || x.s !== y.s ? x : NaN);

	rn y;
	

	signs differ...
	s != y.s) {
	= -y.s;
	rn x.plus(y);
	

	.d;
	.d;
	tor.precision;
	tor.rounding;

	either is zero...
	d[0] || !yd[0]) {

	eturn y negated if x is zero and y is non-zero.
	yd[0]) y.s = -y.s;

	eturn x if y is zero and x is non-zero.
	 if (xd[0]) y = new Ctor(x);

	eturn zero if both are zero.
	rom IEEE 754 (2008) 6.3: 0 - 0 = -0 - -0 = -0 when rounding to -Infinity.
	 return new Ctor(rm === 3 ? -0 : 0);

	rn external ? finalise(y, pr, rm) : y;
	

	nd y are finite, non-zero numbers with the same sign.

	culate base 1e7 exponents.
	thfloor(y.e / LOG_BASE);
	athfloor(x.e / LOG_BASE);

	d.slice();
	 - e;

	base 1e7 exponents differ...
	 {
	 = k < 0;

	xLTy) {
		
		
		gth;
	se {
		
		
		gth;
	

	umbers with massively different exponents would result in a very high number of
	eros needing to be prepended, but this can be avoided while still ensuring correct
	ounding by limiting the number of zeros to `Math.ceil(pr / LOG_BASE) + 2`.
	Math.max(Math.ceil(pr / LOG_BASE), len) + 2;

	k > i) {
		
		;
	

	repend zeros to equalise exponents.
	verse();
	(i = k; i--;) d.push(0);
	verse();

	e 1e7 exponents equal.
	 {

	heck digits to determine which is the bigger number.

	xd.length;
	= yd.length;
	 = i < len;
	xLTy) len = i;

	(i = 0; i < len; i++) {
		 yd[i]) {
		i] < yd[i];
		
		
	

	0;
	

	Ty) {
	xd;
	 yd;
	 d;
	= -y.s;
	

	xd.length;

	end zeros to `xd` if shorter.
	't add zeros to `yd` if shorter as subtraction only needs to start at `yd` length.
	 = yd.length - len; i > 0; --i) xd[len++] = 0;

	tract yd from xd.
	 = yd.length; i > k;) {

	xd[--i] < yd[i]) {
		j && xd[--j] === 0;) xd[j] = BASE - 1;
		
		E;
	

	] -= yd[i];
	

	ove trailing zeros.
	 xd[--len] === 0;) xd.pop();

	ove leading zeros and adjust exponent accordingly.
	 xd[0] === 0; xd.shift()) --e;

	o?
	d[0]) return new Ctor(rm === 3 ? -0 : 0);

	xd;
	getBase10Exponent(xd, e);

	 external ? finalise(y, pr, rm) : y;
  };


  /*
   *   n % 0 =  N
   *   n % N =  N
   *   n % I =  n
   *   0 % n =  0
   *  -0 % n = -0
   *   0 % 0 =  N
   *   0 % N =  N
   *   0 % I =  0
   *   N % n =  N
   *   N % 0 =  N
   *   N % N =  N
   *   N % I =  N
   *   I % n =  N
   *   I % 0 =  N
   *   I % N =  N
   *   I % I =  N
   *
   * Return a new Decimal whose value is the value of this Decimal modulo `y`, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   * The result depends on the modulo mode.
   *
   */
  P.modulo = P.mod = function (y) {
	
	this,
	 = x.constructor;

	w Ctor(y);

	urn NaN if x is ±Infinity or NaN, or y is NaN or ±0.
	.d || !y.s || y.d && !y.d[0]) return new Ctor(NaN);

	urn x if y is ±Infinity or x is ±0.
	.d || x.d && !x.d[0]) {
	rn finalise(new Ctor(x), Ctor.precision, Ctor.rounding);
	

	vent rounding of intermediate calculations.
	al = false;

	or.modulo == 9) {

	uclidian division: q = sign(y) * floor(x / abs(y))
	esult = x - q * y	wh	 0	result < abs(y)
	divide(x, y.abs(), 0, 3, 1);
	*= y.s;
	 {
	divide(x, y, 0, Ctor.modulo, 1);
	

	times(y);

	al = true;

	 x.minus(q);
  };


  /*
   * Return a new Decimal whose value is the natural exponential of the value of this Decimal,
   * i.e. the base e raised to the power the value of this Decimal, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   */
  P.naturalExponential = P.exp = function () {
	 naturalExponential(this);
  };


  /*
   * Return a new Decimal whose value is the natural logarithm of the value of this Decimal,
   * rounded to `precision` significant digits using rounding mode `rounding`.
   *
   */
  P.naturalLogarithm = P.ln = function () {
	 naturalLogarithm(this);
  };


  /*
   * Return a new Decimal whose value is the value of this Decimal negated, i.e. as if multiplied by
   * -1.
   *
   */
  P.negated = P.neg = function () {
	= new this.constructor(this);
	-x.s;
	 finalise(x);
  };


  /*
   *  n + 0 = n
   *  n + N = N
   *  n + I = I
   *  0 + n = n
   *  0 + 0 = 0
   *  0 + N = N
   *  0 + I = I
   *  N + n = N
   *  N + 0 = N
   *  N + N = N
   *  N + I = N
   *  I + n = I
   *  I + 0 = I
   *  I + N = N
   *  I + I = I
   *
   * Return a new Decimal whose value is the value of this Decimal plus `y`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   */
  P.plus = P.add = function (y) {
	rry, d, e, i, k, len, pr, rm, xd, yd,
	this,
	 = x.constructor;

	w Ctor(y);

	either is not finite...
	.d || !y.d) {

	eturn NaN if either is NaN.
	!x.s || !y.s) y = new Ctor(NaN);

	eturn x if y is finite and x is ±Infinity.
	eturn x if both are ±Infinity with the same sign.
	eturn NaN if both are ±Infinity with different signs.
	eturn y if x is finite and y is ±Infinity.
	 if (!x.d) y = new Ctor(y.d || x.s === y.s ? x : NaN);

	rn y;
	

	 signs differ...
	s != y.s) {
	= -y.s;
	rn x.minus(y);
	

	.d;
	.d;
	tor.precision;
	tor.rounding;

	either is zero...
	d[0] || !yd[0]) {

	eturn x if y is zero.
	eturn y if y is non-zero.
	!yd[0]) y = new Ctor(x);

	rn external ? finalise(y, pr, rm) : y;
	

	nd y are finite, non-zero numbers with the same sign.

	culate base 1e7 exponents.
	thfloor(x.e / LOG_BASE);
	thfloor(y.e / LOG_BASE);

	d.slice();
	- e;

	base 1e7 exponents differ...
	 {

	i < 0) {
		
		
		gth;
	se {
		
		
		gth;
	

	imit number of zeros prepended to max(ceil(pr / LOG_BASE), len) + 1.
	Math.ceil(pr / LOG_BASE);
	= k > len ? k + 1 : len + 1;

	i > len) {
		
		;
	

	repend zeros to equalise exponents. Note: Faster to use reverse then do unshifts.
	verse();
	(; i--;) d.push(0);
	verse();
	

	xd.length;
	.length;

	yd is longer than xd, swap xd and yd so xd points to the longer array.
	n - i < 0) {
	len;
	yd;
	 xd;
	 d;
	

	y start adding at yd.length - 1 as the further digits of xd can be left as they are.
	arry = 0; i;) {
	y = (xd[--i] = xd[i] + yd[i] + carry) / BASE | 0;
	] %= BASE;
	

	rry) {
	nshift(carry);
	
	

	ove trailing zeros.
	need to check for zero, as +x + +y != 0 && -x + -y != 0
	en = xd.length; xd[--len] == 0;) xd.pop();

	xd;
	getBase10Exponent(xd, e);

	 external ? finalise(y, pr, rm) : y;
  };


  /*
   * Return the number of significant digits of the value of this Decimal.
   *
   * [z] {boolean|number} Whether to count integer-part trailing zeros: true, false, 1 or 0.
   *
   */
  P.precision = P.sd = function (z) {
	
	this;

	!== void 0 && z !== !!z && z !== 1 && z !== 0) throw Error(invalidArgument + z);

	d) {
	getPrecision(x.d);
	z && x.e + 1 > k) k = x.e + 1;
	 {
	NaN;
	

	 k;
  };


  /*
   * Return a new Decimal whose value is the value of this Decimal rounded to a whole number using
   * rounding mode `rounding`.
   *
   */
  P.round = function () {
	= this,
	 = x.constructor;

	 finalise(new Ctor(x), x.e + 1, Ctor.rounding);
  };


  /*
   * Return a new Decimal whose value is the sine of the value in radians of this Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-1, 1]
   *
   * sin(x) = x - x^3/3! + x^5/5! - ...
   *
   * sin(0)		
   * sin(-0)		
   * sin(Infinity)  = NaN
   * sin(-Infinity) = NaN
   * sin(NaN)	aN
   *
   */
  P.sine = P.sin = function () {
	, rm,
	this,
	 = x.constructor;

	.isFinite()) return new Ctor(NaN);
	isZero()) return new Ctor(x);

	tor.precision;
	tor.rounding;
	recision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
	ounding = 1;

	ne(Ctor, toLessThanHalfPi(Ctor, x));

	recision = pr;
	ounding = rm;

	 finalise(quadrant > 2 ? x.neg() : x, pr, rm, true);
  };


  /*
   * Return a new Decimal whose value is the square root of this Decimal, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   *  sqrt(-n) =  N
   *  sqrt(N)  =  N
   *  sqrt(-I) =  N
   *  sqrt(I)  =  I
   *  sqrt(0)  =  0
   *  sqrt(-0) = -0
   *
   */
  P.squareRoot = P.sqrt = function () {
	 n, sd, r, rep, t,
	this,
	x.d,
	x.e,
	x.s,
	 = x.constructor;

	ative/NaN/Infinity/zero?
	!== 1 || !d || !d[0]) {
	rn new Ctor(!s || s < 0 && (!d || d[0]) ? NaN : d ? x : 1 / 0);
	

	al = false;

	tial estimate.
	th.sqrt(+x);

	h.sqrt underflow/overflow?
	s x to Math.sqrt as integer, then adjust the exponent of the result.
	== 0 || s == 1 / 0) {
	digitsToString(d);

	(n.length + e) % 2 == 0) n += '0';
	Math.sqrt(n);
	mathfloor((e + 1) / 2) - (e < 0 || e % 2);

	s == 1 / 0) {
		;
	se {
		nential();
		0, n.indexOf('e') + 1) + e;
	

	new Ctor(n);
	 {
	new Ctor(s.toString());
	

	e = Ctor.precision) + 3;

	ton-Raphson iteration.
	;) {
	r;
	t.plus(divide(x, t, sd + 2, 1)).times(0.5);

	ODO? Replace with for-loop and checkRoundingDigits.
	digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
		sd - 3, sd + 1);

		ounding digit may be in error by -1 so if the 4 rounding digits are 9999 or
		. approaching a rounding boundary, continue the iteration.
		99' || !rep && n == '4999') {

		first iteration only, check to see if rounding up gives the exact result as the
		ay infinitely repeat.
		{
			 0);

			x)) {
			
			
			
		

		
		
		

		rounding digits are null, 0{0,4} or 50{0,3}, check for an exact result.
		 then there are further digits and m will be truthy.
		 !+n.slice(1) && n.charAt(0) == '5') {

			 first rounding digit.
			 1);
			(x);
		

		
		
	
	

	al = true;

	 finalise(r, e, Ctor.rounding, m);
  };


  /*
   * Return a new Decimal whose value is the tangent of the value in radians of this Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-Infinity, Infinity]
   *
   * tan(0)		
   * tan(-0)		
   * tan(Infinity)  = NaN
   * tan(-Infinity) = NaN
   * tan(NaN)	aN
   *
   */
  P.tangent = P.tan = function () {
	, rm,
	this,
	 = x.constructor;

	.isFinite()) return new Ctor(NaN);
	isZero()) return new Ctor(x);

	tor.precision;
	tor.rounding;
	recision = pr + 10;
	ounding = 1;

	sin();
	1;
	vide(x, new Ctor(1).minus(x.times(x)).sqrt(), pr + 10, 0);

	recision = pr;
	ounding = rm;

	 finalise(quadrant == 2 || quadrant == 4 ? x.neg() : x, pr, rm, true);
  };


  /*
   *  n * 0 = 0
   *  n * N = N
   *  n * I = I
   *  0 * n = 0
   *  0 * 0 = 0
   *  0 * N = N
   *  0 * I = N
   *  N * n = N
   *  N * 0 = N
   *  N * N = N
   *  N * I = N
   *  I * n = I
   *  I * 0 = N
   *  I * N = N
   *  I * I = I
   *
   * Return a new Decimal whose value is this Decimal times `y`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   */
  P.times = P.mul = function (y) {
	rry, e, i, k, r, rL, t, xdL, ydL,
	this,
	 = x.constructor,
	 x.d,
	 (y = new Ctor(y)).d;

	 x.s;

	 either is NaN, ±Infinity or ±0...
	d || !xd[0] || !yd || !yd[0]) {

	rn new Ctor(!y.s || xd && !xd[0] && !yd || yd && !yd[0] && !xd

		N if either is NaN.
		N if x is ±0 and y is ±Infinity, or y is ±0 and x is ±Infinity.
		

		nfinity if either is ±Infinity.
		 if either is ±0.
		 ? y.s / 0 : y.s * 0);
	

	thfloor(x.e / LOG_BASE) + mathfloor(y.e / LOG_BASE);
	xd.length;
	yd.length;

	ure xd points to the longer array.
	L < ydL) {
	xd;
	 yd;
	 r;
	 xdL;
	= ydL;
	= rL;
	

	tialise the result array with zeros.
	;
	dL + ydL;
	 = rL; i--;) r.push(0);

	tiply!
	 = ydL; --i >= 0;) {
	y = 0;
	(k = xdL + i; k > i;) {
		d[i] * xd[k - i - 1] + carry;
		 BASE | 0;
		BASE | 0;
	

	 = (r[k] + carry) % BASE | 0;
	

	ove trailing zeros.
	 !r[--rL];) r.pop();

	rry) ++e;
	.shift();

	r;
	getBase10Exponent(r, e);

	 external ? finalise(y, Ctor.precision, Ctor.rounding) : y;
  };


  /*
   * Return a string representing the value of this Decimal in base 2, round to `sd` significant
   * digits using rounding mode `rm`.
   *
   * If the optional `sd` argument is present then return binary exponential notation.
   *
   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */
  P.toBinary = function (sd, rm) {
	 toStringBinary(this, 2, sd, rm);
  };


  /*
   * Return a new Decimal whose value is the value of this Decimal rounded to a maximum of `dp`
   * decimal places using rounding mode `rm` or `rounding` if `rm` is omitted.
   *
   * If `dp` is omitted, return a new Decimal whose value is the value of this Decimal.
   *
   * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */
  P.toDecimalPlaces = P.toDP = function (dp, rm) {
	= this,
	 = x.constructor;

	w Ctor(x);
	 === void 0) return x;

	nt32(dp, 0, MAX_DIGITS);

	 === void 0) rm = Ctor.rounding;
	heckInt32(rm, 0, 8);

	 finalise(x, dp + x.e + 1, rm);
  };


  /*
   * Return a string representing the value of this Decimal in exponential notation rounded to
   * `dp` fixed decimal places using rounding mode `rounding`.
   *
   * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */
  P.toExponential = function (dp, rm) {
	r,
	this,
	 = x.constructor;

	 === void 0) {
	= finiteToString(x, true);
	 {
	kInt32(dp, 0, MAX_DIGITS);

	rm === void 0) rm = Ctor.rounding;
	 checkInt32(rm, 0, 8);

	finalise(new Ctor(x), dp + 1, rm);
	= finiteToString(x, true, dp + 1);
	

	 x.isNeg() && !x.isZero() ? '-' + str : str;
  };


  /*
   * Return a string representing the value of this Decimal in normal (fixed-point) notation to
   * `dp` fixed decimal places and rounded using rounding mode `rm` or `rounding` if `rm` is
   * omitted.
   *
   * As with JavaScript numbers, (-0).toFixed(0) is '0', but e.g. (-0.00001).toFixed(0) is '-0'.
   *
   * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * (-0).toFixed(0) is '0', but (-0.1).toFixed(0) is '-0'.
   * (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
   * (-0).toFixed(3) is '0.000'.
   * (-0.5).toFixed(0) is '-0'.
   *
   */
  P.toFixed = function (dp, rm) {
	r, y,
	this,
	 = x.constructor;

	 === void 0) {
	= finiteToString(x);
	 {
	kInt32(dp, 0, MAX_DIGITS);

	rm === void 0) rm = Ctor.rounding;
	 checkInt32(rm, 0, 8);

	finalise(new Ctor(x), dp + x.e + 1, rm);
	= finiteToString(y, false, dp + y.e + 1);
	

	determine whether to add the minus sign look at the value before it was rounded,
	. look at `x` rather than `y`.
	 x.isNeg() && !x.isZero() ? '-' + str : str;
  };


  /*
   * Return an array representing the value of this Decimal as a simple fraction with an integer
   * numerator and an integer denominator.
   *
   * The denominator will be a positive non-zero value less than or equal to the specified maximum
   * denominator. If a maximum denominator is not specified, the denominator will be the lowest
   * value necessary to represent the number exactly.
   *
   * [maxD] {number|string|Decimal} Maximum denominator. Integer >= 1 and < Infinity.
   *
   */
  P.toFraction = function (maxD) {
	 d0, d1, d2, e, k, n, n0, n1, pr, q, r,
	this,
	 x.d,
	 = x.constructor;

	d) return new Ctor(x);

	0 = new Ctor(1);
	0 = new Ctor(0);

	w Ctor(d1);
	e = getPrecision(xd) - x.e - 1;
	% LOG_BASE;
	 = mathpow(10, k < 0 ? LOG_BASE + k : k);

	xD == null) {

	 is 10**e, the minimum max-denominator needed.
	 = e > 0 ? d : n1;
	 {
	new Ctor(maxD);
	!n.isInt() || n.lt(n1)) throw Error(invalidArgument + n);
	 = n.gt(d) ? (e > 0 ? d : n1) : n;
	

	al = false;
	w Ctor(digitsToString(xd));
	tor.precision;
	recision = e = xd.length * LOG_BASE * 2;

	;)  {
	divide(n, d, 0, 1, 1);
	 d0.plus(q.times(d1));
	d2.cmp(maxD) == 1) break;
	 d1;
	 d2;
	 n1;
	 n0.plus(q.times(d2));
	 d2;
	 d;
	n.minus(q.times(d2));
	d2;
	

	ivide(maxD.minus(d0), d1, 0, 1, 1);
	0.plus(d2.times(n1));
	0.plus(d2.times(d1));
	 n1.s = x.s;

	ermine which fraction is closer to x, n0/d0 or n1/d1?
	vide(n1, d1, e, 1).minus(x).abs().cmp(divide(n0, d0, e, 1).minus(x).abs()) < 1
		 [n0, d0];

	recision = pr;
	al = true;

	 r;
  };


  /*
   * Return a string representing the value of this Decimal in base 16, round to `sd` significant
   * digits using rounding mode `rm`.
   *
   * If the optional `sd` argument is present then return binary exponential notation.
   *
   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */
  P.toHexadecimal = P.toHex = function (sd, rm) {
	 toStringBinary(this, 16, sd, rm);
  };


  /*
   * Returns a new Decimal whose value is the nearest multiple of `y` in the direction of rounding
   * mode `rm`, or `Decimal.rounding` if `rm` is omitted, to the value of this Decimal.
   *
   * The return value will always have the same sign as this Decimal, unless either this Decimal
   * or `y` is NaN, in which case the return value will be also be NaN.
   *
   * The return value is not affected by the value of `precision`.
   *
   * y {number|string|Decimal} The magnitude to round to a multiple of.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * 'toNearest() rounding mode not an integer: {rm}'
   * 'toNearest() rounding mode out of range: {rm}'
   *
   */
  P.toNearest = function (y, rm) {
	= this,
	 = x.constructor;

	w Ctor(x);

	== null) {

	f x is not finite, return x.
	!x.d) return x;

	new Ctor(1);
	 Ctor.rounding;
	 {
	new Ctor(y);
	rm === void 0) {
		unding;
	se {
		m, 0, 8);
	

	f x is not finite, return x if y is not NaN, else NaN.
	!x.d) return y.s ? x : y;

	f y is not finite, return Infinity with the sign of x if y is Infinity, else NaN.
	!y.d) {
		 = x.s;
		
	
	

	y is not zero, calculate the nearest multiple of y to x.
	d[0]) {
	rnal = false;
	divide(x, y, 0, rm, 1).times(y);
	rnal = true;
	lise(x);

	y is zero, return zero with the sign of x.
	 {
	= x.s;
	y;
	

	 x;
  };


  /*
   * Return the value of this Decimal converted to a number primitive.
   * Zero keeps its sign.
   *
   */
  P.toNumber = function () {
	 +this;
  };


  /*
   * Return a string representing the value of this Decimal in base 8, round to `sd` significant
   * digits using rounding mode `rm`.
   *
   * If the optional `sd` argument is present then return binary exponential notation.
   *
   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */
  P.toOctal = function (sd, rm) {
	 toStringBinary(this, 8, sd, rm);
  };


  /*
   * Return a new Decimal whose value is the value of this Decimal raised to the power `y`, rounded
   * to `precision` significant digits using rounding mode `rounding`.
   *
   * ECMAScript compliant.
   *
   *   pow(x, NaN)						
   *   pow(x, ±0)							

   *   pow(NaN, non-zero)					
   *   pow(abs(x) > 1, +Infinity)			
   *   pow(abs(x) > 1, -Infinity)			
   *   pow(abs(x) == 1, ±Infinity)		
   *   pow(abs(x) < 1, +Infinity)			
   *   pow(abs(x) < 1, -Infinity)			
   *   pow(+Infinity, y > 0)				
   *   pow(+Infinity, y < 0)				
   *   pow(-Infinity, odd integer > 0)	Infinity
   *   pow(-Infinity, even integer > 0)	nfinity
   *   pow(-Infinity, odd integer < 0)	0
   *   pow(-Infinity, even integer < 0)	
   *   pow(+0, y > 0)						
   *   pow(+0, y < 0)						
   *   pow(-0, odd integer > 0)			
   *   pow(-0, even integer > 0)			
   *   pow(-0, odd integer < 0)			
   *   pow(-0, even integer < 0)			
   *   pow(finite x < 0, finite non-integer) = NaN
   *
   * For non-integer or very large exponents pow(x, y) is calculated using
   *
   *   x^y = exp(y*ln(x))
   *
   * Assuming the first 15 rounding digits are each equally likely to be any digit 0-9, the
   * probability of an incorrectly rounded result
   * P([49]9{14} | [50]0{14}) = 2 * 0.2 * 10^-14 = 4e-15 = 1/2.5e+14
   * i.e. 1 in 250,000,000,000,000
   *
   * If a result is incorrectly rounded the maximum error will be 1 ulp (unit in last place).
   *
   * y {number|string|Decimal} The power to which to raise this Decimal.
   *
   */
  P.toPower = P.pow = function (y) {
	 k, pr, r, rm, s,
	this,
	 = x.constructor,
	 +(y = new Ctor(y));

	her ±Infinity, NaN or ±0?
	.d || !y.d || !x.d[0] || !y.d[0]) return new Ctor(mathpow(+x, yn));

	w Ctor(x);

	eq(1)) return x;

	tor.precision;
	tor.rounding;

	eq(1)) return finalise(x, pr, rm);

	xponent
	thfloor(y.e / LOG_BASE);

	y is a small integer use the 'exponentiation by squaring' algorithm.
	>= y.d.length - 1 && (k = yn < 0 ? -yn : yn) <= MAX_SAFE_INTEGER) {
	intPow(Ctor, x, k, pr);
	rn y.s < 0 ? new Ctor(1).div(r) : finalise(r, pr, rm);
	

	s;

	x is negative
	< 0) {

	f y is not an integer
	e < y.d.length - 1) return new Ctor(NaN);

	esult is positive if x is negative and the last digit of integer y is even.
	(y.d[e] & 1) == 0) s = 1;

	f x.eq(-1)
	x.e == 0 && x.d[0] == 1 && x.d.length == 1) {
		
		
	
	

	imate result exponent.
	 = 10^e,  where e = y * log10(x)
	10(x) = log10(x_significand) + x_exponent
	10(x_significand) = ln(x_significand) / ln(10)
	thpow(+x, yn);
	== 0 || !isFinite(k)
	thfloor(yn * (Math.log('0.' + digitsToString(x.d)) / Math.LN10 + x.e + 1))
	w Ctor(k + '').e;

	onent estimate may be incorrect e.g. x: 0.999999999999999999, y: 2.29, e: 0, r.e: -1.

	rflow/underflow?
	> Ctor.maxE + 1 || e < Ctor.minE - 1) return new Ctor(e > 0 ? s / 0 : 0);

	al = false;
	ounding = x.s = 1;

	imate the extra guard digits needed to ensure five correct rounding digits from
	uralLogarithm(x). Example of failure without these extra digits (precision: 10):
	 Decimal(2.32456).pow('2087987436534566.46411')
	uld be 1.162377823e+764914905173815, but is 1.162355823e+764914905173815
	th.min(12, (e + '').length);

	 x^y = exp(y*ln(x))
	turalExponential(y.times(naturalLogarithm(x, pr + k)), pr);

	ay be Infinity, e.g. (0.9999999999999999).pow(-1e+40)
	d) {

	runcate to the required precision plus five rounding digits.
	finalise(r, pr + 5, 1);

	f the rounding digits are [49]9999 or [50]0000 increase the precision by 10 and recalculate
	he result.
	checkRoundingDigits(r.d, pr, rm)) {
		

		to the increased precision plus five rounding digits.
		(naturalExponential(y.times(naturalLogarithm(x, e + k)), e), e + 5, 1);

		 14 nines from the 2nd rounding digit (the first rounding digit may be 4 or 9).
		oString(r.d).slice(pr + 1, pr + 15) + 1 == 1e14) {
		se(r, pr + 1, 0);
		
	
	

	s;
	al = true;
	ounding = rm;

	 finalise(r, pr, rm);
  };


  /*
   * Return a string representing the value of this Decimal rounded to `sd` significant digits
   * using rounding mode `rounding`.
   *
   * Return exponential notation if `sd` is less than the number of digits necessary to represent
   * the integer part of the value in normal notation.
   *
   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */
  P.toPrecision = function (sd, rm) {
	r,
	this,
	 = x.constructor;

	 === void 0) {
	= finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
	 {
	kInt32(sd, 1, MAX_DIGITS);

	rm === void 0) rm = Ctor.rounding;
	 checkInt32(rm, 0, 8);

	finalise(new Ctor(x), sd, rm);
	= finiteToString(x, sd <= x.e || x.e <= Ctor.toExpNeg, sd);
	

	 x.isNeg() && !x.isZero() ? '-' + str : str;
  };


  /*
   * Return a new Decimal whose value is the value of this Decimal rounded to a maximum of `sd`
   * significant digits using rounding mode `rm`, or to `precision` and `rounding` respectively if
   * omitted.
   *
   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * 'toSD() digits out of range: {sd}'
   * 'toSD() digits not an integer: {sd}'
   * 'toSD() rounding mode not an integer: {rm}'
   * 'toSD() rounding mode out of range: {rm}'
   *
   */
  P.toSignificantDigits = P.toSD = function (sd, rm) {
	= this,
	 = x.constructor;

	 === void 0) {
	 Ctor.precision;
	 Ctor.rounding;
	 {
	kInt32(sd, 1, MAX_DIGITS);

	rm === void 0) rm = Ctor.rounding;
	 checkInt32(rm, 0, 8);
	

	 finalise(new Ctor(x), sd, rm);
  };


  /*
   * Return a string representing the value of this Decimal.
   *
   * Return exponential notation if this Decimal has a positive exponent equal to or greater than
   * `toExpPos`, or a negative exponent equal to or less than `toExpNeg`.
   *
   */
  P.toString = function () {
	= this,
	 = x.constructor,
	= finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);

	 x.isNeg() && !x.isZero() ? '-' + str : str;
  };


  /*
   * Return a new Decimal whose value is the value of this Decimal truncated to a whole number.
   *
   */
  P.truncated = P.trunc = function () {
	 finalise(new this.constructor(this), this.e + 1, 1);
  };


  /*
   * Return a string representing the value of this Decimal.
   * Unlike `toString`, negative zero will include the minus sign.
   *
   */
  P.valueOf = P.toJSON = function () {
	= this,
	 = x.constructor,
	= finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);

	 x.isNeg() ? '-' + str : str;
  };


  // Helper functions for Decimal.prototype (P) and/or Decimal methods, and their callers.


  /*
   *  digitsToString		t, P.logarithm, P.squareRoot, P.toFraction, P.toPower,
   *						l, naturalLogarithm
   *  checkInt32			es, P.toExponential, P.toFixed, P.toNearest,
   *						its, toStringBinary, random
   *  checkRoundingDigits	garithm, P.toPower, naturalExponential, naturalLogarithm
   *  convertBase			parseOther
   *  cos					
   *  divide				P.dividedBy, P.dividedToIntegerBy,
   *						ot, P.tan, P.tanh, P.toFraction,
   *						ralExponential, naturalLogarithm,
   *						
   *  finalise				, P.atanh, P.ceil, P.cos, P.cosh,
   *						 P.floor, P.logarithm, P.minus,
   *						und, P.sin, P.sinh, P.squareRoot,
   *						, P.toExponential, P.toFixed,
   *						sion, P.toSignificantDigits,
   *						Pi, naturalExponential,
   *						und, trunc
   *  finiteToString		ential, P.toFixed, P.toPrecision, P.toString, P.valueOf,
   *						
   *  getBase10Exponent		lus, P.times, parseOther
   *  getLn10				garithm
   *  getPi					ThanHalfPi, atan2
   *  getPrecision			Fraction
   *  getZeroString			niteToString
   *  intPow				
   *  isOdd					
   *  maxOrMin				
   *  naturalExponential	aturalExponential, P.toPower
   *  naturalLogarithm		asinh, P.atanh, P.logarithm, P.naturalLogarithm,
   *						
   *  nonFiniteToString		ng, toStringBinary
   *  parseDecimal			
   *  parseOther			
   *  sin					
   *  taylorSeries			os, sin
   *  toLessThanHalfPi		n
   *  toStringBinary		y, P.toHexadecimal, P.toOctal
   *  truncate				
   *
   *  Throws:				on, P.toFraction, checkInt32, getLn10, getPi,
   *						her, random, Decimal
   */


  function digitsToString(d) {
	 k, ws,
	xOfLastWord = d.length - 1,
	= '',
	d[0];

	dexOfLastWord > 0) {
	+= w;
	(i = 1; i < indexOfLastWord; i++) {
		'';
		 - ws.length;
		= getZeroString(k);
		
	

	d[i];
	 w + '';
	LOG_BASE - ws.length;
	k) str += getZeroString(k);
	 if (w === 0) {
	rn '0';
	

	ove trailing zeros of last w.
	 w % 10 === 0;) w /= 10;

	 str + w;
  }


  function checkInt32(i, min, max) {
	!== ~~i || i < min || i > max) {
	w Error(invalidArgument + i);
	
  }


  /*
   * Check 5 rounding digits if `repeating` is null, 4 otherwise.
   * `repeating == null` if caller is `log` or `pow`,
   * `repeating != null` if caller is `naturalLogarithm` or `naturalExponential`.
   */
  function checkRoundingDigits(d, i, rm, repeating) {
	, k, r, rd;

	 the length of the first word of the array d.
	 = d[0]; k >= 10; k /= 10) --i;

	the rounding digit in the first word of d?
	i < 0) {
	 LOG_BASE;
	 0;
	 {
	 Math.ceil((i + 1) / LOG_BASE);
	 LOG_BASE;
	

	s the index (0 - 6) of the rounding digit.
	. if within the word 3487563 the first rounding digit is 5,
	n i = 4, k = 1000, rd = 3487563 % 1000 = 563
	thpow(10, LOG_BASE - i);
	[di] % k | 0;

	peating == null) {
	i < 3) {
		rd = rd / 100 | 0;
		= 1) rd = rd / 10 | 0;
		& rd == 99999 || rm > 3 && rd == 49999 || rd == 50000 || rd == 0;
	se {
		&& rd + 1 == k || rm > 3 && rd + 1 == k / 2) &&
		 / k / 100 | 0) == mathpow(10, i - 2) - 1 ||
			 == 0) && (d[di + 1] / k / 100 | 0) == 0;
	
	 {
	i < 4) {
		rd = rd / 1000 | 0;
		= 1) rd = rd / 100 | 0;
		= 2) rd = rd / 10 | 0;
		ng || rm < 4) && rd == 9999 || !repeating && rm > 3 && rd == 4999;
	se {
		ing || rm < 4) && rd + 1 == k ||
		&& rm > 3) && rd + 1 == k / 2) &&
		 / k / 1000 | 0) == mathpow(10, i - 3) - 1;
	
	

	 r;
  }


  // Convert string of `baseIn` to an array of numbers of `baseOut`.
  // Eg. convertBase('255', 10, 16) returns [15, 15].
  // Eg. convertBase('ff', 16, 10) returns [2, 5, 5].
  function convertBase(str, baseIn, baseOut) {
	
	= [0],
	,
	0,
	 = str.length;

	 i < strL;) {
	(arrL = arr.length; arrL--;) arr[arrL] *= baseIn;
	0] += NUMERALS.indexOf(str.charAt(i++));
	(j = 0; j < arr.length; j++) {
		 baseOut - 1) {
		+ 1] === void 0) arr[j + 1] = 0;
		 += arr[j] / baseOut | 0;
		baseOut;
		
	
	

	 arr.reverse();
  }


  /*
   * cos(x) = 1 - x^2/2! + x^4/4! - ...
   * |x| < pi/2
   *
   */
  function cosine(Ctor, x) {
	 len, y;

	isZero()) return x;

	ument reduction: cos(4x) = 8*(cos^4(x) - cos^2(x)) + 1
	. cos(x) = 8*(cos^4(x/4) - cos^2(x/4)) + 1

	imate the optimum number of times to use the argument reduction.
	x.d.length;
	n < 32) {
	Math.ceil(len / 3);
	(1 / tinyPow(4, k)).toString();
	 {
	16;
	'2.3283064365386962890625e-10';
	

	recision += k;

	ylorSeries(Ctor, 1, x.times(y), new Ctor(1));

	erse argument reduction
	ar i = k; i--;) {
	cos2x = x.times(x);
	cos2x.times(cos2x).minus(cos2x).times(8).plus(1);
	

	recision -= k;

	 x;
  }


  /*
   * Perform division in the specified base.
   */
  var divide = (function () {

	umes non-zero x and k, and hence non-zero result.
	on multiplyInteger(x, k, base) {
	temp,
		
		;

	(x = x.slice(); i--;) {
		* k + carry;
		% base | 0;
		 / base | 0;
	

	carry) x.unshift(carry);

	rn x;
	

	on compare(a, b, aL, bL) {
	i, r;

	aL != bL) {
		? 1 : -1;
	se {
		 0; i < aL; i++) {
		= b[i]) {
			1 : -1;
			
		
		
	

	rn r;
	

	on subtract(a, b, aL, base) {
	i = 0;

	ubtract b from a.
	(; aL--;) {
		
		b[aL] ? 1 : 0;
		base + a[aL] - b[aL];
	

	emove leading zeros.
	(; !a[0] && a.length > 1;) a.shift();
	

	 function (x, y, pr, rm, dp, base) {
	cmp, e, i, k, logBase, more, prod, prodL, q, qd, rem, remL, rem0, sd, t, xi, xL, yd0,
		
		structor,
		= y.s ? 1 : -1,
		
		

	ither NaN, Infinity or 0?
	!xd || !xd[0] || !yd || !yd[0]) {

		tor(// Return NaN if either NaN, or both Infinity or 0.
		.s || (xd ? yd && xd[0] == yd[0] : !yd) ? NaN :

		±0 if x is 0 or y is ±Infinity, or return ±Infinity as y is 0.
		] == 0 || !yd ? sign * 0 : sign / 0);
	

	base) {
		
		e;
	se {
		
		G_BASE;
		r(x.e / logBase) - mathfloor(y.e / logBase);
	

	 yd.length;
	 xd.length;
	new Ctor(sign);
	 q.d = [];

	esult exponent may be one less than e.
	he digit array of a Decimal from toStringBinary may have trailing zeros.
	(i = 0; yd[i] == (xd[i] || 0); i++);

	yd[i] > (xd[i] || 0)) e--;

	pr == null) {
		or.precision;
		unding;
	se if (dp) {
		.e - y.e) + 1;
	se {
		
	

	sd < 0) {
		
		
	se {

		recision in number of base 10 digits to base 1e7 digits.
		gBase + 2 | 0;
		

		 1e7
		 {
		
		;
		

		e carry.
		< xL || k) && sd--; i++) {
			[i] || 0);
			;
			
		

		| i < xL;

		= 1e7
		

		se xd and yd so highest order digit of yd is >= base/2
		 (yd[0] + 1) | 0;

		 {
			er(yd, k, base);
			er(xd, k, base);
			
			
		

		
		lice(0, yL);
		.length;

		os to make remainder as long as divisor.
		L < yL;) rem[remL++] = 0;

		ice();
		(0);
		];

		>= base / 2) ++yd0;

		
			

			 and remainder.
			rem, yL, remL);

			mainder.
			

			al digit, k.
			
			rem0 = rem0 * base + (rem[1] || 0);

			 many times the divisor goes into the current remainder.
			 0;

			
			 divisor * trial digit (k)
			t > remainder: product -= divisor, k--
			 -= product
			t was < remainder at 2:
			emai	 and divisor
			> di	r: remainder -= divisor, k++

			
				- 1;

				rial digit.
				d, k, base);
				
				

				emainder.
				 prodL, remL);

				
				
				

				om product.
				odL ? yz : yd, prodL, base);
				
			

				
				o need to compare yd and rem again below, so change cmp to 1
				1 there is a need to compare yd and rem again below.
				
				
			

			gth;
			) prod.unshift(0);

			uct from remainder.
			od, remL, base);

			s < previous remainder.
			
				

				ew remainder.
				L, remL);

				inder, subtract divisor from remainder.
				
				

				om remainder.
				L ? yz : yd, remL, base);
				
			

			h;
			 0) {
			
			
			w	be 0

			git, k, to the result array.
			

			inder.
			 {
			[xi] || 0;
			
			
			
			

		xi++ < xL || rem[0] !== void 0) && sd--);

		[0] !== void 0;
		

		ero?
		qd.shift();
	

	ogBase is 1 when divide is being used for base conversion.
	logBase == 1) {
		
		re;
	se {

		ate q.e, first get the number of digits of qd[0].
		k = qd[0]; k >= 10; k /= 10) i++;
		* logBase - 1;

		dp ? pr + q.e + 1 : pr, rm, more);
	

	rn q;
	
  })();


  /*
   * Round `x` to `sd` significant digits using rounding mode `rm`.
   * Check for over/under-flow.
   */
   function finalise(x, sd, rm, isTruncated) {
	gits, i, j, k, rd, roundUp, w, xd, xdi,
	 = x.constructor;

	't round if sd is null or undefined.
	f (sd != null) {
	 x.d;

	nfinity/NaN.
	!xd) return x;

	d: the rounding digit, i.e. the digit after the digit that may be rounded up.
	: the word of xd containing rd, a base 1e7 number.
	di: the index of w within xd.
	igits: the number of digits of w.
	: what would be the index of rd within w if all the numbers were 7 digits long (i.e. if
	hey had leading zeros)
	: if > 0, the actual index of rd within w (if < 0, rd is a leading zero).

	et the length of the first word of the digits array xd.
	(digits = 1, k = xd[0]; k >= 10; k /= 10) digits++;
	sd - digits;

	s the rounding digit in the first word of xd?
	i < 0) {
		E;
		
		 0];

		ounding digit at index j of w.
		hpow(10, digits - j - 1) % 10 | 0;
	se {
		eil((i + 1) / LOG_BASE);
		h;
		) {
		cated) {

			ralExponential`, `naturalLogarithm` and `squareRoot`.
			) xd.push(0);
			
			
			
			 1;
		
			
		
		
		[xdi];

		 number of digits of w.
		s = 1; k >= 10; k /= 10) digits++;

		 index of rd within w.
		ASE;

		 index of rd within w, adjusted for leading zeros.
		ber of leading zeros of w is given by LOG_BASE - digits.
		G_BASE + digits;

		 rounding digit at index j of w.
		 ? 0 : w / mathpow(10, digits - j - 1) % 10 | 0;
		
	

	re there any non-zero digits after the rounding digit?
	uncated = isTruncated || sd < 0 ||
		!== void 0 || (j < 0 ? w : w % mathpow(10, digits - j - 1));

	he expression `w % mathpow(10, digits - j - 1)` returns all the digits of w to the right
	f the digit at (left-to-right) index j, e.g. if w is 908714 and j is 2, the expression
	ill give 714.

	dUp = rm < 4
		runcated) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
		rd == 5 && (rm == 4 || isTruncated || rm == 6 &&

		hether the digit to the left of the rounding digit is odd.
		j > 0 ? w / mathpow(10, digits - j) : 0 : xd[xdi - 1]) % 10) & 1 ||
			 : 7));

	sd < 1 || !xd[0]) {
		0;
		 {

		 sd to decimal places.
		+ 1;

		 0.01, 0.001, 0.0001 etc.
		thpow(10, (LOG_BASE - sd % LOG_BASE) % LOG_BASE);
		|| 0;
		

		
		e = 0;
		

		
	

	emove excess digits.
	i == 0) {
		xdi;
		
		
	se {
		xdi + 1;
		10, LOG_BASE - i);

		0 becomes 56000 if 7 is the rounding digit.
		ns i > number of leading zeros of w.
		> 0 ? (w / mathpow(10, digits - j) % mathpow(10, j) | 0) * k : 0;
	

	roundUp) {
		

		digit to be rounded up in the first word of xd?
		 0) {

			ength of xd[0] before k is added.
			[0]; j >= 10; j /= 10) i++;
			
			0; j /= 10) k++;

			ength has increased.
			
			
			E) xd[0] = 1;
			

			
		
			
			E) break;
			
			
		
		
	

	emove trailing zeros.
	(i = xd.length; xd[--i] === 0;) xd.pop();
	

	ternal) {

	verflow?
	x.e > Ctor.maxE) {

		
		
		

	nderflow?
	se if (x.e < Ctor.minE) {

		
		
		
		rflow = true;
	 else Ctor.underflow = false;
	

	 x;
  }


  function finiteToString(x, isExp, sd) {
	.isFinite()) return nonFiniteToString(x);
	
	x.e,
	= digitsToString(x.d),
	= str.length;

	Exp) {
	sd && (k = sd - len) > 0) {
		arAt(0) + '.' + str.slice(1) + getZeroString(k);
	se if (len > 1) {
		arAt(0) + '.' + str.slice(1);
	

	= str + (x.e < 0 ? 'e' : 'e+') + x.e;
	 if (e < 0) {
	= '0.' + getZeroString(-e - 1) + str;
	sd && (k = sd - len) > 0) str += getZeroString(k);
	 if (e >= len) {
	+= getZeroString(e + 1 - len);
	sd && (k = sd - e - 1) > 0) str = str + '.' + getZeroString(k);
	 {
	(k = e + 1) < len) str = str.slice(0, k) + '.' + str.slice(k);
	sd && (k = sd - len) > 0) {
		= len) str += '.';
		roString(k);
	
	

	 str;
  }


  // Calculate the base 10 exponent from the base 1e7 exponent.
  function getBase10Exponent(digits, e) {
	= digits[0];

	 the number of digits of the first word of the digits array.
	e *= LOG_BASE; w >= 10; w /= 10) e++;
	 e;
  }


  function getLn10(Ctor, sd, pr) {
	 > LN10_PRECISION) {

	eset global state in case the exception is caught.
	rnal = true;
	pr) Ctor.precision = pr;
	w Error(precisionLimitExceeded);
	
	 finalise(new Ctor(LN10), sd, 1, true);
  }


  function getPi(Ctor, sd, rm) {
	 > PI_PRECISION) throw Error(precisionLimitExceeded);
	 finalise(new Ctor(PI), sd, rm, true);
  }


  function getPrecision(digits) {
	= digits.length - 1,
	= w * LOG_BASE + 1;

	gits[w];

	non-zero...
	 {

	ubtract the number of trailing zeros of the last word.
	(; w % 10 == 0; w /= 10) len--;

	dd the number of digits of the first word.
	(w = digits[0]; w >= 10; w /= 10) len++;
	

	 len;
  }


  function getZeroString(k) {
	 = '';
	 k--;) zs += '0';
	 zs;
  }


  /*
   * Return a new Decimal whose value is the value of Decimal `x` to the power `n`, where `n` is an
   * integer of type number.
   *
   * Implements 'exponentiation by squaring'. Called by `pow` and `parseOther`.
   *
   */
  function intPow(Ctor, x, n, pr) {
	Truncated,
	new Ctor(1),

	ax n of 9007199254740991 takes 53 loop iterations.
	aximum digits array length; leaves [28, 34] guard digits.
	Math.ceil(pr / LOG_BASE + 4);

	al = false;

	;) {
	n % 2) {
		x);
		(r.d, k)) isTruncated = true;
	

	mathfloor(n / 2);
	n === 0) {

		 correct rounding when r.d is truncated, increment the last word if it is zero.
		th - 1;
		ted && r.d[n] === 0) ++r.d[n];
		
	

	x.times(x);
	cate(x.d, k);
	

	al = true;

	 r;
  }


  function isOdd(n) {
	 n.d[n.d.length - 1] & 1;
  }


  /*
   * Handle `max` and `min`. `ltgt` is 'lt' or 'gt'.
   */
  function maxOrMin(Ctor, args, ltgt) {
	
	new Ctor(args[0]),
	0;

	 ++i < args.length;) {
	new Ctor(args[i]);
	!y.s) {
		
		
	se if (x[ltgt](y)) {
		
	
	

	 x;
  }


  /*
   * Return a new Decimal whose value is the natural exponential of `x` rounded to `sd` significant
   * digits.
   *
   * Taylor/Maclaurin series.
   *
   * exp(x) = x^0/0! + x^1/1! + x^2/2! + x^3/3! + ...
   *
   * Argument reduction:
   *   Repeat x = x / 32, k += 5, until |x| < 0.1
   *   exp(x) = exp(x / 2^k)^(2^k)
   *
   * Previously, the argument was initially reduced by
   * exp(x) = exp(r) * 10^k  where r = x - k * ln10, k = floor(x / ln10)
   * to first put r in the range [0, ln10], before dividing by 32 until |x| < 0.1, but this was
   * found to be slower than just dividing repeatedly by 32 as above.
   *
   * Max integer argument: exp('20723265836946413') = 6.3e+9000000000000000
   * Min integer argument: exp('-20723265836946411') = 1.2e-9000000000000000
   * (Math object integer min/max: Math.exp(709) = 8.2e+307, Math.exp(-745) = 5e-324)
   *
   *  exp(Infinity)  = Infinity
   *  exp(-Infinity) = 0
   *  exp(NaN)	aN
   *  exp(±0)		
   *
   *  exp(x) is non-terminating for any finite, non-zero x.
   *
   *  The result will always be correctly rounded.
   *
   */
  function naturalExponential(x, sd) {
	nominator, guard, j, pow, sum, t, wpr,
	= 0,
	0,
	0,
	 = x.constructor,
	 Ctor.rounding,
	 Ctor.precision;

	aN/Infinity?
	.d || !x.d[0] || x.e > 17) {

	rn new Ctor(x.d
		1 : x.s < 0 ? 0 : 1 / 0
		< 0 ? 0 : x : 0 / 0);
	

	 == null) {
	rnal = false;
	= pr;
	 {
	= sd;
	

	w Ctor(0.03125);

	le abs(x) >= 0.1
	(x.e > -2) {

	 = x / 2^5
	x.times(t);
	 5;
	

	 2 * log10(2^k) + 5 (empirically derived) to estimate the increase in precision
	essary to ensure the first 4 rounding digits are correct.
	= Math.log(mathpow(2, k)) / Math.LN10 * 2 + 5 | 0;
	 guard;
	nator = pow = sum = new Ctor(1);
	recision = wpr;

	;) {
	= finalise(pow.times(x), wpr, 1);
	minator = denominator.times(++i);
	sum.plus(divide(pow, denominator, wpr, 1));

	digitsToString(t.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
		
		sum = finalise(sum.times(sum), wpr, 1);

		see if the first 4 rounding digits are [49]999.
		peat the summation with a higher precision, otherwise
		 precision: 18, rounding: 1
		4272462595034083567793919843761) = 98372560.1229999999 (should be 98372560.123)
		ard` is the index of first rounding digit.
		ll) {

		3 && checkRoundingDigits(sum.d, wpr - guard, rm, rep)) {
			pr += 10;
			= t = new Ctor(1);
			
			
		
			m, Ctor.precision = pr, rm, external = true);
		
		
		sion = pr;
		;
		
	

	= t;
	
  }


  /*
   * Return a new Decimal whose value is the natural logarithm of `x` rounded to `sd` significant
   * digits.
   *
   *  ln(-n)		
   *  ln(0)		
   *  ln(-0)		
   *  ln(1)		
   *  ln(Infinity)  = Infinity
   *  ln(-Infinity) = NaN
   *  ln(NaN)	aN
   *
   *  ln(n) (n != 1) is non-terminating.
   *
   */
  function naturalLogarithm(y, sd) {
	 c0, denominator, e, numerator, rep, sum, t, wpr, x1, x2,
	1,
	d = 10,
	y,
	 x.d,
	 = x.constructor,
	 Ctor.rounding,
	 Ctor.precision;

	x negative or Infinity, NaN, 0 or 1?
	s < 0 || !xd || !xd[0] || !x.e && xd[0] == 1 && xd.length == 1) {
	rn new Ctor(xd && !xd[0] ? -1 / 0 : x.s != 1 ? NaN : xd ? 0 : x);
	

	 == null) {
	rnal = false;
	= pr;
	 {
	= sd;
	

	recision = wpr += guard;
	gitsToString(xd);
	.charAt(0);

	th.abs(e = x.e) < 1.5e15) {

	rgument reduction.
	he series converges faster the closer the argument is to 1, so using
	n(a^b) = b * ln(a),   ln(a) = ln(a^b) / b
	ultiply the argument by itself until the leading digits of the significand are 7, 8, 9,
	0, 11, 12 or 13, recording the number of multiplications so the sum of the series can
	ater be divided by this number, then separate out the power of 10 using
	n(a*10^b) = ln(a) + b*ln(10).

	ax n is 21 (gives 0.9, 1.0 or 1.1) (9e15 / 21 = 4.2e14).
	ile (c0 < 9 && c0 != 1 || c0 == 1 && c.charAt(1) > 1) {
	ax n is 6 (gives 0.7 - 1.3)
	e (c0 < 7 && c0 != 1 || c0 == 1 && c.charAt(1) > 3) {
		y);
		String(x.d);
		t(0);
		
	

	x.e;

	c0 > 1) {
		('0.' + c);
		
	se {
		(c0 + '.' + c.slice(1));
	
	 {

	he argument reduction method above may result in overflow if the argument y is a massive
	umber with exponent >= 1500000000000000 (9e15 / 6 = 1.5e15), so instead recall this
	unction using ln(x*10^e) = ln(x) + e*ln(10).
	getLn10(Ctor, wpr + 2, pr).times(e + '');
	naturalLogarithm(new Ctor(c0 + '.' + c.slice(1)), wpr - guard).plus(t);
	.precision = pr;

	rn sd == null ? finalise(x, pr, rm, external = true) : x;
	

	is x reduced to a value near 1.
	;

	lor series.
	y) = ln((1 + x)/(1 - x)) = 2(x + x^3/3 + x^5/5 + x^7/7 + ...)
	re x = (y - 1)/(y + 1)	(|	 1	
	numerator = x = divide(x.minus(1), x.plus(1), wpr, 1);
	inalise(x.times(x), wpr, 1);
	nator = 3;

	;) {
	rator = finalise(numerator.times(x2), wpr, 1);
	sum.plus(divide(numerator, new Ctor(denominator), wpr, 1));

	digitsToString(t.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
		mes(2);

		he argument reduction. Check that e is not 0 because, besides preventing an
		ry calculation, -0 + 0 = +0 and to ensure correct rounding -0 needs to stay -0.
		 sum = sum.plus(getLn10(Ctor, wpr + 2, pr).times(e + ''));
		(sum, new Ctor(n), wpr, 1);

		 and the first 4 rounding digits 4999, or rm < 4 (or the summation has
		ated previously) and the first 4 rounding digits 9999?
		start the summation with a higher precision, otherwise
		 precision: 12, rounding: 1
		028.6126091714265381533) = 18.7246299999 when it should be 18.72463.
		ard` is the index of first rounding digit.
		ll) {
		oundingDigits(sum.d, wpr - guard, rm, rep)) {
			pr += guard;
			= divide(x1.minus(1), x1.plus(1), wpr, 1);
			mes(x), wpr, 1);
			= 1;
		
			m, Ctor.precision = pr, rm, external = true);
		
		
		sion = pr;
		;
		
	

	= t;
	minator += 2;
	
  }


  // ±Infinity, NaN.
  function nonFiniteToString(x) {
	igned.
	 String(x.s * x.s / 0);
  }


  /*
   * Parse the value of a new Decimal `x` from string `str`.
   */
  function parseDecimal(x, str) {
	 i, len;

	imal point?
	 = str.indexOf('.')) > -1) str = str.replace('.', '');

	onential form?
	 = str.search(/e/i)) > 0) {

	etermine exponent.
	e < 0) e = i;
	 +str.slice(i + 1);
	= str.substring(0, i);
	 if (e < 0) {

	nteger.
	str.length;
	

	ermine leading zeros.
	 = 0; str.charCodeAt(i) === 48; i++);

	ermine trailing zeros.
	en = str.length; str.charCodeAt(len - 1) === 48; --len);
	str.slice(i, len);

	r) {
	-= i;
	= e = e - i - 1;
	= [];

	ransform base

	 is the base 10 exponent.
	 is where to slice str to get the first word of the digits array.
	(e + 1) % LOG_BASE;
	e < 0) i += LOG_BASE;

	i < len) {
		ush(+str.slice(0, i));
		LOG_BASE; i < len;) x.d.push(+str.slice(i, i += LOG_BASE));
		ice(i);
		 - str.length;
	se {
		
	

	(; i--;) str += '0';
	push(+str);

	external) {

		
		constructor.maxE) {

		y.
		;
		

		?
		.e < x.constructor.minE) {

		
		
		
		ructor.underflow = true;
		constructor.underflow = false;
	
	 {

	ero.
	= 0;
	= [0];
	

	 x;
  }


  /*
   * Parse the value of a new Decimal `x` from a string `str`, which is not a decimal value.
   */
  function parseOther(x, str) {
	se, Ctor, divisor, i, isFloat, len, p, xd, xe;

	r.indexOf('_') > -1) {
	= str.replace(/(\d)_(?=\d)/g, '$1');
	isDecimal.test(str)) return parseDecimal(x, str);
	 if (str === 'Infinity' || str === 'NaN') {
	!+str) x.s = NaN;
	= NaN;
	= null;
	rn x;
	

	Hex.test(str))  {
	 = 16;
	= str.toLowerCase();
	 if (isBinary.test(str))  {
	 = 2;
	 if (isOctal.test(str))  {
	 = 8;
	 {
	w Error(invalidArgument + str);
	

	there a binary exponent part?
	r.search(/p/i);

	> 0) {
	+str.slice(i + 1);
	= str.substring(2, i);
	 {
	= str.slice(2);
	

	vert `str` as an integer then divide the result by `base` raised to a power such that the
	ction part will be restored.
	r.indexOf('.');
	t = i >= 0;
	 x.constructor;

	Float) {
	= str.replace('.', '');
	= str.length;
	len - i;

	og[10](16) = 1.2041... , log[10](88) = 1.9444....
	sor = intPow(Ctor, new Ctor(base), i, i * 2);
	

	onvertBase(str, base, BASE);
	d.length - 1;

	ove trailing zeros.
	 = xe; xd[i] === 0; --i) xd.pop();
	< 0) return new Ctor(x.s * 0);
	getBase10Exponent(xd, xe);
	xd;
	al = false;

	what precision to perform the division to ensure exact conversion?
	DecimalIntegerPartDigitCount = ceil(log[10](b) * otherBaseIntegerPartDigitCount)
	[10](2) = 0.30103, log[10](8) = 0.90309, log[10](16) = 1.20412
	. ceil(1.2 * 3) = 4, so up to 4 decimal digits are needed to represent 3 hex int digits.
	DecimalFractionPartDigitCount = {Hex:4|Oct:3|Bin:1} * otherBaseFractionPartDigitCount
	refore using 4 * the number of digits of str will always be enough.
	Float) x = divide(x, divisor, len * 4);

	tiply by the binary exponent part if present.
	 x = x.times(Math.abs(p) < 54 ? mathpow(2, p) : Decimal.pow(2, p));
	al = true;

	 x;
  }


  /*
   * sin(x) = x - x^3/3! + x^5/5! - ...
   * |x| < pi/2
   *
   */
  function sine(Ctor, x) {
	
	= x.d.length;

	n < 3) {
	rn x.isZero() ? x : taylorSeries(Ctor, 2, x, x);
	

	ument reduction: sin(5x) = 16*sin^5(x) - 20*sin^3(x) + 5*sin(x)
	. sin(x) = 16*sin^5(x/5) - 20*sin^3(x/5) + 5*sin(x/5)
	  sin(x) = sin(x/5)(5 + sin^2(x/5)(16sin^2(x/5) - 20))

	imate the optimum number of times to use the argument reduction.
	4 * Math.sqrt(len);
	> 16 ? 16 : k | 0;

	times(1 / tinyPow(5, k));
	ylorSeries(Ctor, 2, x, x);

	erse argument reduction
	n2_x,
	 new Ctor(5),
	= new Ctor(16),
	= new Ctor(20);
	 k--;) {
	_x = x.times(x);
	x.times(d5.plus(sin2_x.times(d16.times(sin2_x).minus(d20))));
	

	 x;
  }


  // Calculate Taylor series for `cos`, `cosh`, `sin` and `sinh`.
  function taylorSeries(Ctor, n, x, y, isHyperbolic) {
	 t, u, x2,
	1,
	 Ctor.precision,
	Math.ceil(pr / LOG_BASE);

	al = false;
	.times(x);
	w Ctor(y);

	;) {
	divide(u.times(x2), new Ctor(n++ * n++), pr, 1);
	isHyperbolic ? y.plus(t) : y.minus(t);
	divide(t.times(x2), new Ctor(n++ * n++), pr, 1);
	u.plus(y);

	t.d[k] !== void 0) {
		t.d[j] === u.d[j] && j--;);
		 break;
	

	u;
	y;
	t;
	j;
	
	

	al = true;
	ngth = k + 1;

	 t;
  }


  // Exponent e must be positive and non-zero.
  function tinyPow(b, e) {
	= b;
	(--e) n *= b;
	 n;
  }


  // Return the absolute value of `x` reduced to less than or equal to half pi.
  function toLessThanHalfPi(Ctor, x) {
	
	g = x.s < 0,
	 getPi(Ctor, Ctor.precision, 1),
	Pi = pi.times(0.5);

	abs();

	lte(halfPi)) {
	rant = isNeg ? 4 : 1;
	rn x;
	

	divToInt(pi);

	isZero()) {
	rant = isNeg ? 3 : 2;
	 {
	x.minus(t.times(pi));

	 <= x < pi
	x.lte(halfPi)) {
		sOdd(t) ? (isNeg ? 2 : 3) : (isNeg ? 4 : 1);
		
	

	rant = isOdd(t) ? (isNeg ? 1 : 4) : (isNeg ? 3 : 2);
	

	 x.minus(pi).abs();
  }


  /*
   * Return the value of Decimal `x` as a string in base `baseOut`.
   *
   * If the optional `sd` argument is present include a binary exponent suffix.
   */
  function toStringBinary(x, baseOut, sd, rm) {
	se, e, i, k, len, roundUp, str, xd, y,
	 = x.constructor,
	p = sd !== void 0;

	Exp) {
	kInt32(sd, 1, MAX_DIGITS);
	rm === void 0) rm = Ctor.rounding;
	 checkInt32(rm, 0, 8);
	 {
	 Ctor.precision;
	 Ctor.rounding;
	

	.isFinite()) {
	= nonFiniteToString(x);
	 {
	= finiteToString(x);
	str.indexOf('.');

	se exponential notation according to `toExpPos` and `toExpNeg`? No, but if required:
	axBinaryExponent = floor((decimalExponent + 1) * log[2](10))
	inBinaryExponent = floor(decimalExponent * log[2](10))
	og[2](10) = 3.321928094887362347870319429489390175864

	isExp) {
		
		== 16) {
		4 - 3;
		aseOut == 8) {
		3 - 2;
		
	se {
		ut;
	

	onvert the number as an integer then divide the result by its base raised to a power such
	hat the fraction part will be restored.

	on-integer.
	i >= 0) {
		place('.', '');
		(1);
		ngth - i;
		tBase(finiteToString(y), 10, base);
		ngth;
	

	 convertBase(str, 10, base);
	len = xd.length;

	emove trailing zeros.
	(; xd[--len] == 0;) xd.pop();

	!xd[0]) {
		? '0p+0' : '0';
	se {
		
		
		
		or(x);
		
		
		(x, y, sd, rm, 0, base);
		
		
		inexact;
		

		ing digit, i.e. the digit after the digit that may be rounded up.
		
		;
		undUp || xd[sd + 1] !== void 0;

		 < 4
		oid 0 || roundUp) && (rm === 0 || rm === (x.s < 0 ? 3 : 2))
		 i === k && (rm === 4 || roundUp || rm === 6 && xd[sd - 1] & 1 ||
			8 : 7));

		sd;

		 {

		g up may mean the previous digit has to be rounded up and so on.
		d[--sd] > base - 1;) {
			
			
			
			
			
		
		

		 trailing zeros.
		d.length; !xd[len - 1]; --len);

		11, 15] becomes 4bf.
		str = ''; i < len; i++) str += NUMERALS.charAt(xd[i]);

		y exponent suffix?
		
		1) {
			|| baseOut == 8) {
			6 ? 4 : 3;
			% i; len++) str += '0';
			(str, base, baseOut);
			ngth; !xd[len - 1]; --len);

			ways be be 1
			= '1.'; i < len; i++) str += NUMERALS.charAt(xd[i]);
			
			(0) + '.' + str.slice(1);
			
		

		 + (e < 0 ? 'p' : 'p+') + e;
		 < 0) {
		;) str = '0' + str;
		 + str;
		
		len) for (e -= len; e-- ;) str += '0';
		 < len) str = str.slice(0, e) + '.' + str.slice(e);
		
	

	= (baseOut == 16 ? '0x' : baseOut == 2 ? '0b' : baseOut == 8 ? '0o' : '') + str;
	

	 x.s < 0 ? '-' + str : str;
  }


  // Does not strip trailing zeros.
  function truncate(arr, len) {
	r.length > len) {
	length = len;
	rn true;
	
  }


  // Decimal methods


  /*
   *  abs
   *  acos
   *  acosh
   *  add
   *  asin
   *  asinh
   *  atan
   *  atanh
   *  atan2
   *  cbrt
   *  ceil
   *  clamp
   *  clone
   *  config
   *  cos
   *  cosh
   *  div
   *  exp
   *  floor
   *  hypot
   *  ln
   *  log
   *  log2
   *  log10
   *  max
   *  min
   *  mod
   *  mul
   *  pow
   *  random
   *  round
   *  set
   *  sign
   *  sin
   *  sinh
   *  sqrt
   *  sub
   *  sum
   *  tan
   *  tanh
   *  trunc
   */


  /*
   * Return a new Decimal whose value is the absolute value of `x`.
   *
   * x {number|string|Decimal}
   *
   */
  function abs(x) {
	 new this(x).abs();
  }


  /*
   * Return a new Decimal whose value is the arccosine in radians of `x`.
   *
   * x {number|string|Decimal}
   *
   */
  function acos(x) {
	 new this(x).acos();
  }


  /*
   * Return a new Decimal whose value is the inverse of the hyperbolic cosine of `x`, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */
  function acosh(x) {
	 new this(x).acosh();
  }


  /*
   * Return a new Decimal whose value is the sum of `x` and `y`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   * y {number|string|Decimal}
   *
   */
  function add(x, y) {
	 new this(x).plus(y);
  }


  /*
   * Return a new Decimal whose value is the arcsine in radians of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */
  function asin(x) {
	 new this(x).asin();
  }


  /*
   * Return a new Decimal whose value is the inverse of the hyperbolic sine of `x`, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */
  function asinh(x) {
	 new this(x).asinh();
  }


  /*
   * Return a new Decimal whose value is the arctangent in radians of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */
  function atan(x) {
	 new this(x).atan();
  }


  /*
   * Return a new Decimal whose value is the inverse of the hyperbolic tangent of `x`, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */
  function atanh(x) {
	 new this(x).atanh();
  }


  /*
   * Return a new Decimal whose value is the arctangent in radians of `y/x` in the range -pi to pi
   * (inclusive), rounded to `precision` significant digits using rounding mode `rounding`.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-pi, pi]
   *
   * y {number|string|Decimal} The y-coordinate.
   * x {number|string|Decimal} The x-coordinate.
   *
   * atan2(±0, -0)			
   * atan2(±0, +0)			
   * atan2(±0, -x)			
   * atan2(±0, x)				
   * atan2(-y, ±0)			 0
   * atan2(y, ±0)				
   * atan2(±y, -Infinity)		nite y > 0
   * atan2(±y, +Infinity)		ite y > 0
   * atan2(±Infinity, x)		 finite x
   * atan2(±Infinity, -Infinity) = ±3*pi/4
   * atan2(±Infinity, +Infinity) = ±pi/4
   * atan2(NaN, x) = NaN
   * atan2(y, NaN) = NaN
   *
   */
  function atan2(y, x) {
	w this(y);
	w this(x);
	
	 this.precision,
	 this.rounding,
	= pr + 4;

	her NaN
	.s || !x.s) {
	new this(NaN);

	h ±Infinity
	 if (!y.d && !x.d) {
	getPi(this, wpr, 1).times(x.s > 0 ? 0.25 : 0.75);
	= y.s;

	s ±Infinity or y is ±0
	 if (!x.d || y.isZero()) {
	x.s < 0 ? getPi(this, pr, rm) : new this(0);
	= y.s;

	s ±Infinity or x is ±0
	 if (!y.d || x.isZero()) {
	getPi(this, wpr, 1).times(0.5);
	= y.s;

	h non-zero and finite
	 if (x.s < 0) {
	.precision = wpr;
	.rounding = 1;
	this.atan(divide(y, x, wpr, 1));
	getPi(this, wpr, 1);
	.precision = pr;
	.rounding = rm;
	y.s < 0 ? r.minus(x) : r.plus(x);
	 {
	this.atan(divide(y, x, wpr, 1));
	

	 r;
  }


  /*
   * Return a new Decimal whose value is the cube root of `x`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */
  function cbrt(x) {
	 new this(x).cbrt();
  }


  /*
   * Return a new Decimal whose value is `x` rounded to an integer using `ROUND_CEIL`.
   *
   * x {number|string|Decimal}
   *
   */
  function ceil(x) {
	 finalise(x = new this(x), x.e + 1, 2);
  }


  /*
   * Return a new Decimal whose value is `x` clamped to the range delineated by `min` and `max`.
   *
   * x {number|string|Decimal}
   * min {number|string|Decimal}
   * max {number|string|Decimal}
   *
   */
  function clamp(x, min, max) {
	 new this(x).clamp(min, max);
  }


  /*
   * Configure global settings for a Decimal constructor.
   *
   * `obj` is an object with one or more of the following properties,
   *
   *   precision  {number}
   *   rounding   {number}
   *   toExpNeg   {number}
   *   toExpPos   {number}
   *   maxE	mber}
   *   minE	mber}
   *   modulo	er}
   *   crypto	ean|number}
   *   defaults   {true}
   *
   * E.g. Decimal.config({ precision: 20, rounding: 4 })
   *
   */
  function config(obj) {
	bj || typeof obj !== 'object') throw Error(decimalError + 'Object expected');
	 p, v,
	efaults = obj.defaults === true,
	 [
		 1, MAX_DIGITS,
		0, 8,
		-EXP_LIMIT, 0,
		0, EXP_LIMIT,
		XP_LIMIT,
		_LIMIT, 0,
		 9
	

	 = 0; i < ps.length; i += 3) {
	p = ps[i], useDefaults) this[p] = DEFAULTS[p];
	(v = obj[p]) !== void 0) {
		r(v) === v && v >= ps[i + 1] && v <= ps[i + 2]) this[p] = v;
		rror(invalidArgument + p + ': ' + v);
	
	

	= 'crypto', useDefaults) this[p] = DEFAULTS[p];
	 = obj[p]) !== void 0) {
	v === true || v === false || v === 0 || v === 1) {
		
		 crypto != 'undefined' && crypto &&
			alues || crypto.randomBytes)) {
			
		
			Unavailable);
		
		
		false;
		
	se {
		invalidArgument + p + ': ' + v);
	
	

	 this;
  }


  /*
   * Return a new Decimal whose value is the cosine of `x`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */
  function cos(x) {
	 new this(x).cos();
  }


  /*
   * Return a new Decimal whose value is the hyperbolic cosine of `x`, rounded to precision
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */
  function cosh(x) {
	 new this(x).cosh();
  }


  /*
   * Create and return a Decimal constructor with the same configuration properties as this Decimal
   * constructor.
   *
   */
  function clone(obj) {
	 p, ps;

	
	 Decimal constructor and exported function.
	urn a new Decimal instance.
	
	number|string|Decimal} A numeric value.
	
	
	on Decimal(v) {
	e, i, t,
		

	ecimal called without new.
	!(x instanceof Decimal)) return new Decimal(v);

	etain a reference to this Decimal constructor, and shadow Decimal.prototype.constructor
	hich points to Object.
	nstructor = Decimal;

	uplicate.
	isDecimalInstance(v)) {
		

		) {
		| v.e > Decimal.maxE) {

			
			
			
		(v.e < Decimal.minE) {

			
			
			
		
			
			
		
		
		
		? v.d.slice() : v.d;
		

		
	

	typeof v;

	t === 'number') {
		 {
		v < 0 ? -1 : 1;
		
		
		
		

		
		
		
		
		
		

		 for small integers.
		v && v < 1e7) {
		, i = v; i >= 10; i /= 10) e++;

		al) {
			xE) {
			
			
			imal.minE) {
			
			
			
			
			
			
		
			
			
		

		

		 NaN.
		 * 0 !== 0) {
		s = NaN;
		
		;
		
		

		Decimal(x, v.toString());

	se if (t !== 'string') {
		invalidArgument + v);
	

	inus sign?
	(i = v.charCodeAt(0)) === 45) {
		1);
		
	se {
		?
		) v = v.slice(1);
		
	

	rn isDecimal.test(v) ? parseDecimal(x, v) : parseOther(x, v);
	

	l.prototype = P;

	l.ROUND_UP = 0;
	l.ROUND_DOWN = 1;
	l.ROUND_CEIL = 2;
	l.ROUND_FLOOR = 3;
	l.ROUND_HALF_UP = 4;
	l.ROUND_HALF_DOWN = 5;
	l.ROUND_HALF_EVEN = 6;
	l.ROUND_HALF_CEIL = 7;
	l.ROUND_HALF_FLOOR = 8;
	l.EUCLID = 9;

	l.config = Decimal.set = config;
	l.clone = clone;
	l.isDecimal = isDecimalInstance;

	l.abs = abs;
	l.acos = acos;
	l.acosh = acosh;		/				
	l.add = add;
	l.asin = asin;
	l.asinh = asinh;		/				
	l.atan = atan;
	l.atanh = atanh;		/				
	l.atan2 = atan2;
	l.cbrt = cbrt;		 				
	l.ceil = ceil;
	l.clamp = clamp;
	l.cos = cos;
	l.cosh = cosh;		 				
	l.div = div;
	l.exp = exp;
	l.floor = floor;
	l.hypot = hypot;		/				
	l.ln = ln;
	l.log = log;
	l.log10 = log10;		/				
	l.log2 = log2;		 				
	l.max = max;
	l.min = min;
	l.mod = mod;
	l.mul = mul;
	l.pow = pow;
	l.random = random;
	l.round = round;
	l.sign = sign;		 				
	l.sin = sin;
	l.sinh = sinh;		 				
	l.sqrt = sqrt;
	l.sub = sub;
	l.sum = sum;
	l.tan = tan;
	l.tanh = tanh;		 				
	l.trunc = trunc;		/				

	j === void 0) obj = {};
	j) {
	obj.defaults !== true) {
		sion', 'rounding', 'toExpNeg', 'toExpPos', 'maxE', 'minE', 'modulo', 'crypto'];
		i < ps.length;) if (!obj.hasOwnProperty(p = ps[i++])) obj[p] = this[p];
	
	

	l.config(obj);

	 Decimal;
  }


  /*
   * Return a new Decimal whose value is `x` divided by `y`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   * y {number|string|Decimal}
   *
   */
  function div(x, y) {
	 new this(x).div(y);
  }


  /*
   * Return a new Decimal whose value is the natural exponential of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} The power to which to raise the base of the natural log.
   *
   */
  function exp(x) {
	 new this(x).exp();
  }


  /*
   * Return a new Decimal whose value is `x` round to an integer using `ROUND_FLOOR`.
   *
   * x {number|string|Decimal}
   *
   */
  function floor(x) {
	 finalise(x = new this(x), x.e + 1, 3);
  }


  /*
   * Return a new Decimal whose value is the square root of the sum of the squares of the arguments,
   * rounded to `precision` significant digits using rounding mode `rounding`.
   *
   * hypot(a, b, ...) = sqrt(a^2 + b^2 + ...)
   *
   * arguments {number|string|Decimal}
   *
   */
  function hypot() {
	 n,
	new this(0);

	al = false;

	 = 0; i < arguments.length;) {
	new this(arguments[i++]);
	!n.d) {
		
		 true;
		 this(1 / 0);
		
		
	se if (t.d) {
		.times(n));
	
	

	al = true;

	 t.sqrt();
  }


  /*
   * Return true if object is a Decimal instance (where Decimal is any Decimal constructor),
   * otherwise return false.
   *
   */
  function isDecimalInstance(obj) {
	 obj instanceof Decimal || obj && obj.toStringTag === tag || false;
  }


  /*
   * Return a new Decimal whose value is the natural logarithm of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */
  function ln(x) {
	 new this(x).ln();
  }


  /*
   * Return a new Decimal whose value is the log of `x` to the base `y`, or to base 10 if no base
   * is specified, rounded to `precision` significant digits using rounding mode `rounding`.
   *
   * log[y](x)
   *
   * x {number|string|Decimal} The argument of the logarithm.
   * y {number|string|Decimal} The base of the logarithm.
   *
   */
  function log(x, y) {
	 new this(x).log(y);
  }


  /*
   * Return a new Decimal whose value is the base 2 logarithm of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */
  function log2(x) {
	 new this(x).log(2);
  }


  /*
   * Return a new Decimal whose value is the base 10 logarithm of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */
  function log10(x) {
	 new this(x).log(10);
  }


  /*
   * Return a new Decimal whose value is the maximum of the arguments.
   *
   * arguments {number|string|Decimal}
   *
   */
  function max() {
	 maxOrMin(this, arguments, 'lt');
  }


  /*
   * Return a new Decimal whose value is the minimum of the arguments.
   *
   * arguments {number|string|Decimal}
   *
   */
  function min() {
	 maxOrMin(this, arguments, 'gt');
  }


  /*
   * Return a new Decimal whose value is `x` modulo `y`, rounded to `precision` significant digits
   * using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   * y {number|string|Decimal}
   *
   */
  function mod(x, y) {
	 new this(x).mod(y);
  }


  /*
   * Return a new Decimal whose value is `x` multiplied by `y`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   * y {number|string|Decimal}
   *
   */
  function mul(x, y) {
	 new this(x).mul(y);
  }


  /*
   * Return a new Decimal whose value is `x` raised to the power `y`, rounded to precision
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} The base.
   * y {number|string|Decimal} The exponent.
   *
   */
  function pow(x, y) {
	 new this(x).pow(y);
  }


  /*
   * Returns a new Decimal with a random value equal to or greater than 0 and less than 1, and with
   * `sd`, or `Decimal.precision` if `sd` is omitted, significant digits (or less if trailing zeros
   * are produced).
   *
   * [sd] {number} Significant digits. Integer, 0 to MAX_DIGITS inclusive.
   *
   */
  function random(sd) {
	 e, k, n,
	0,
	new this(1),
	 [];

	 === void 0) sd = this.precision;
	heckInt32(sd, 1, MAX_DIGITS);

	th.ceil(sd / LOG_BASE);

	his.crypto) {
	(; i < k;) rd[i++] = Math.random() * 1e7 | 0;

	wsers supporting crypto.getRandomValues.
	 if (crypto.getRandomValues) {
	crypto.getRandomValues(new Uint32Array(k));

	(; i < k;) {
		

		4294967296
		ty n >= 4.29e9, is 4967296 / 4294967296 = 0.00116 (1 in 865).
		9e9) {
		pto.getRandomValues(new Uint32Array(1))[0];
		

		<= 4289999999
		 % 1e7) <= 9999999
		n % 1e7;
		
	

	e.js supporting crypto.randomBytes.
	 if (crypto.randomBytes) {

	uffer
	crypto.randomBytes(k *= 4);

	(; i < k;) {

		2147483648
		d[i + 1] << 8) + (d[i + 2] << 16) + ((d[i + 3] & 0x7f) << 24);

		ty n >= 2.14e9, is 7483648 / 2147483648 = 0.0035 (1 in 286).
		4e9) {
		domBytes(4).copy(d, i);
		

		<= 2139999999
		 % 1e7) <= 9999999
		% 1e7);
		
		
	

	k / 4;
	 {
	w Error(cryptoUnavailable);
	

	[--i];
	LOG_BASE;

	vert trailing digits to zeros according to sd.
	&& sd) {
	mathpow(10, LOG_BASE - sd);
	] = (k / n | 0) * n;
	

	ove trailing words which are zero.
	 rd[i] === 0; i--) rd.pop();

	o?
	< 0) {
	0;
	 [0];
	 {
	-1;

	emove leading words which are zero and adjust exponent accordingly.
	(; rd[0] === 0; e -= LOG_BASE) rd.shift();

	ount the digits of the first word of rd to determine leading zeros.
	(k = 1, n = rd[0]; n >= 10; n /= 10) k++;

	djust the exponent for leading zeros of the first word of rd.
	k < LOG_BASE) e -= LOG_BASE - k;
	

	e;
	rd;

	 r;
  }


  /*
   * Return a new Decimal whose value is `x` rounded to an integer using rounding mode `rounding`.
   *
   * To emulate `Math.round`, set rounding to 7 (ROUND_HALF_CEIL).
   *
   * x {number|string|Decimal}
   *
   */
  function round(x) {
	 finalise(x = new this(x), x.e + 1, this.rounding);
  }


  /*
   * Return
   *   1	 0,
   *  -1	 0,
   *   0	s 0,
   *  -0	s -0,
   *   NaN  otherwise
   *
   * x {number|string|Decimal}
   *
   */
  function sign(x) {
	w this(x);
	 x.d ? (x.d[0] ? x.s : 0 * x.s) : x.s || NaN;
  }


  /*
   * Return a new Decimal whose value is the sine of `x`, rounded to `precision` significant digits
   * using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */
  function sin(x) {
	 new this(x).sin();
  }


  /*
   * Return a new Decimal whose value is the hyperbolic sine of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */
  function sinh(x) {
	 new this(x).sinh();
  }


  /*
   * Return a new Decimal whose value is the square root of `x`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */
  function sqrt(x) {
	 new this(x).sqrt();
  }


  /*
   * Return a new Decimal whose value is `x` minus `y`, rounded to `precision` significant digits
   * using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   * y {number|string|Decimal}
   *
   */
  function sub(x, y) {
	 new this(x).sub(y);
  }


  /*
   * Return a new Decimal whose value is the sum of the arguments, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * Only the result is rounded, not the intermediate calculations.
   *
   * arguments {number|string|Decimal}
   *
   */
  function sum() {
	= 0,
	 = arguments,
	new this(args[i]);

	al = false;
	 x.s && ++i < args.length;) x = x.plus(args[i]);
	al = true;

	 finalise(x, this.precision, this.rounding);
  }


  /*
   * Return a new Decimal whose value is the tangent of `x`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */
  function tan(x) {
	 new this(x).tan();
  }


  /*
   * Return a new Decimal whose value is the hyperbolic tangent of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */
  function tanh(x) {
	 new this(x).tanh();
  }


  /*
   * Return a new Decimal whose value is `x` truncated to an integer.
   *
   * x {number|string|Decimal}
   *
   */
  function trunc(x) {
	 finalise(x = new this(x), x.e + 1, 1);
  }


  // Create and configure initial Decimal constructor.
  Decimal = clone(DEFAULTS);
  Decimal.prototype.constructor = Decimal;
  Decimal['default'] = Decimal.Decimal = Decimal;

  // Create the internal constants from their string values.
  LN10 = new Decimal(LN10);
  PI = new Decimal(PI);


  // Export.


  // AMD.
  if (typeof define == 'function' && define.amd) {
	(function () {
	rn Decimal;
	

  // Node and other environments that support module.exports.
  } else if (typeof module != 'undefined' && module.exports) {
	peof Symbol == 'function' && typeof Symbol.iterator == 'symbol') {
	mbol['for']('nodejs.util.inspect.custom')] = P.toString;
	mbol.toStringTag] = 'Decimal';
	

	.exports = Decimal;

  // Browser.
  } else {
	lobalScope) {
	alScope = typeof self != 'undefined' && self && self.self == self ? self : window;
	

	lict = globalScope.Decimal;
	l.noConflict = function () {
	alScope.Decimal = noConflict;
	rn Decimal;
	

	Scope.Decimal = Decimal;
  }
})(this);
