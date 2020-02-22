export default class Calculator {
    constructor() {
        this.wynik = 0.0;
        this.liczba = 0.0;
        this.operacja = '';
        this.oper_end = '';
        this.str_liczba = '';
        this.operacje = '';
        this.wyswietl = '0';
        this.stan = false;
    }

     logGamma(x) {
        let tmp = (x - 0.5) * Math.log(x + 4.5) - (x + 4.5);
        let ser = 1.0 + 76.18009173    / (x + 0)   - 86.50532033    / (x + 1)
            + 24.01409822    / (x + 2)   -  1.231739516   / (x + 3)
            +  0.00120858003 / (x + 4)   -  0.00000536382 / (x + 5);
        return tmp + Math.log(ser * Math.sqrt(2 * Math.PI));
    }

    gamma(x) {
        let lc = parseInt(Math.exp(this.logGamma(x))) + 1;
        if (Math.abs(Math.exp(this.logGamma(x)) - lc) < 0.0001) {
            return lc;
        } else {
            return Math.exp(this.logGamma(x));
        }
    }

    numer(cyfra) {

        if (this.stan || '0' === (this.str_liczba)) {
            this.str_liczba = '';
        }
        if ('' === (this.str_liczba) && '.' === (cyfra)) {
            this.str_liczba = '0';
        }

        if (!('.' === (cyfra) && this.str_liczba.indexOf('.') != -1)) {
            this.str_liczba += cyfra;
        }
        this.stan = false;
        this.wyswietl = this.str_liczba;
    }

    oper(op) {
        if ('%' === (op) || 'log' == (op) || 's' == (op) || 'p' == (op) || 'x2' == (op) || 'x3' == (op) || 'ln' == (op) || '10x' == (op) || 'ex' == (op)) {
            this.stan = true;
            if ('' === (this.str_liczba)) {
                this.liczba = this.wynik;
            } else {
                this.liczba = Number(this.str_liczba);
            }

            switch (op) {
                case 'p': //pierwiastek
                    if (this.liczba < 0) {
                        this.stan = false;
                    } else {
                        this.str_liczba = (Math.sqrt(this.liczba).toString());
                    }
                    break;
                case 'log': // logarytm 10
                    if (this.liczba <= 0) {
                        this.stan = false;
                    } else {
                        this.str_liczba = (Math.log10(this.liczba).toString());
                    }
                    break;
                case 'ln': // logarytm naturalny
                    if (this.liczba <= 0) {
                        this.stan = false;
                    } else {
                        this.str_liczba = (Math.log(this.liczba).toString());
                    }
                    break;
                case '%': //procent
                    this.str_liczba = (this.wynik * (this.liczba / 100)).toString();
                    break;
                case 's': //silnia
                    if (this.liczba < 0) {
                        this.stan = false;
                    } else {
                        this.str_liczba = (this.gamma(this.liczba + 1)).toString();
                    }
                    break;
                case 'x2': //kwadrat
                    this.str_liczba = (Math.pow(this.liczba, 2)).toString();
                    break;
                case 'x3': //szescian
                    this.str_liczba = (Math.pow(this.liczba, 3)).toString();
                    break;
                case '10x': //potega 10
                    this.str_liczba = (Math.pow(10, this.liczba)).toString();
                    break;
                case 'ex': //potega e
                    this.str_liczba = (Math.pow(Math.E, this.liczba)).toString();
                    break;
            }

            if (this.stan) {
                this.wyswietl = this.str_liczba;
            } else {
                this.operacje = '';
                this.wyswietl = 'Nieprawidłowe dane';
                this.str_liczba = '';
                this.operacja = '';
                this.stan = true;
            }

        } else {
            this.stan = false;
            if ('' === (this.str_liczba)) {
                if ('=' === (op)) {
                    this.operacje = '';
                    this.wyswietl = this.wynik.toString();
                    this.str_liczba = this.wyswietl;
                    this.oper_end = this.operacja;
                    this.operacja = '';
                    this.stan = true;
                }

                if (!('' === (this.operacje)) && ('+' === (op) || '-' === (op) || '*' === (op) || '/' === (op) || 'v' == (op))) {
                    this.operacja = op;
                    let tmp = this.operacje.substring(0, this.operacje.length - 1) + op;
                    this.operacje = tmp;
                }

            } else {
                if ('=' === (op) && '' === (this.operacja)) {
                    this.operacja = this.oper_end;
                } else {
                    if ('0.' === (this.str_liczba)) {
                        this.str_liczba = '0';
                    }
                    this.liczba = Number(this.str_liczba);
                }
                switch (this.operacja) {
                    case '+':
                        this.wynik += this.liczba;
                        break;
                    case '-':
                        this.wynik -= this.liczba;
                        break;
                    case '*':
                        this.wynik *= this.liczba;
                        break;
                    case '/':
                        if (this.liczba == 0) {
                            this.stan = true;
                        } else {
                            this.wynik /= this.liczba;
                        }
                        break;
                    case "v": // pierwiastek y stopnia
                        this.wynik = Math.pow(this.liczba, (1/this.wynik));
                        break;
                    case '':
                        this.wynik = this.liczba;
                        break;
                }

                if ('/' === (this.operacja) && this.stan) {
                    this.operacje = '';
                    this.wyswietl = 'Dzielenie przez zero';
                    this.str_liczba = '';
                    this.operacja = '';
                } else {

                    if ('=' === (op)) {
                        this.wyswietl = this.wynik.toString();
                        this.str_liczba = this.wyswietl;
                        this.oper_end = this.operacja;
                        this.operacja = '';
                        this.operacje = '';
                        this.stan = true;
                    } else {
                        this.operacje = this.operacje + (this.str_liczba + op);
                        this.wyswietl = this.wynik.toString();
                        this.str_liczba = '';
                        this.operacja = op;
                    }
                }
            }
        }
    }

    backspace() {
        if (this.stan) {
            this.str_liczba = '';
        }
        if (this.str_liczba.length > 1) {
            this.str_liczba = this.str_liczba.substring(0, this.str_liczba.length - 1);
        } else {
            this.str_liczba = '0';
        }
    }

    plusminus() {
        if ('0' !== (this.str_liczba) && '' !== (this.str_liczba)) {
            let c = this.str_liczba.charAt(0);
            if (c !== '-') {
                this.str_liczba = '-' + this.str_liczba;
            } else {
                this.str_liczba = this.str_liczba.substring(1);
            }
            this.wyswietl = this.str_liczba;
        }
    }

    clear() {
        this.wynik = 0.0;
        this.operacja = '';
        this.oper_end = '';
        this.str_liczba = '0';
        this.operacje = '';
        this.wyswietl = '0';
        this.liczba = 0;
    }

    getStr_liczba() {
        return this.str_liczba.toString().replace('.',',');
    }

    getOperacje() {
        return this.operacje.toString().replace('.', ',');
    }

    getWyswietl() {
        let p = this.wyswietl.indexOf('000000000000');
        if (p != -1) {
            this.wyswietl = this.wyswietl.substring(0, p);
            p = this.wyswietl.indexOf('.');
            if (p == this.wyswietl.length - 1) {
                this.wyswietl = this.wyswietl.substring(0, p);
            }
        }
        p = this.wyswietl.indexOf('999999999999');
        if (p != -1) {
            this.wyswietl = this.wyswietl.substring(0, p);
            p = this.wyswietl.indexOf('.');
            if (p == this.wyswietl.length - 1) {
                this.wyswietl = this.wyswietl.substring(0, p);
            }
            let l = this.wyswietl.substring(this.wyswietl.length - 1);
            l++;
            this.wyswietl = this.wyswietl.substring(0, this.wyswietl.length - 1) + l.toString();
        }
        p = this.wyswietl.indexOf('.0');
        if (p == this.wyswietl.length - 2 && p > 0) {
            this.wyswietl = this.wyswietl.substring(0, p);
        }
        return this.wyswietl.toString().replace('.', ',');
    }

};
