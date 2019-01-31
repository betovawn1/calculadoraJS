class CalcController {
    constructor() {
        this._operation = [];
        this._locale = 'pt-BR';
        this._dispEl = document.querySelector('#display');
        this._dateEl = document.querySelector('#data');
        this._timeEl = document.querySelector('#hora');
        this._currentDate;
        this.init();
        this.initButtonsEvents();
    }

    init() {
        this.setDisplayDateTime();
        setInterval(()=>{
            this.setDisplayDateTime();
        }, 1000);
    }

    addEventListenerAll(element, events, fn) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn);
        });
    }

    clearAll() {
        this._operation = [];
    }

    clearEntry() {
        this._operation.pop();
    }

    setLastOperation(value) {
        this._operation[this._operation.length-1] = value;
    }

    setError() {
        this.displayCalc = 'Error';
    }

    isOperator(value) {
        return (['+', '-', '/', '*', '%'].indexOf(value) > -1);
    }

    pushOperation(value) {
        this._operation.push(value);

        if (this._operation.length > 3) {
            this.calc();
        }
    }

    calc() {
        console.log('passou de 3 ---> ', this._operation);
        let last = this._operation.pop();
        console.log('last element in the operation ---> ', last);
        let result = eval(this._operation.join(""));
        console.log('result is ==== ' + result);
        this._operation = [result, last];
        console.log('operation com ---> ' + this._operation);
        this.setLastNumberInDisplay();
    }

    setLastNumberInDisplay() {
        let lastNumber, i;
        for (i = this._operation.length-1; i >= 0; i--) {
            if (!this.isOperator(this._operation[i])) {
                lastNumber = this._operation[i];
                break;
            }
        }
        this.displayCalc = lastNumber;
    }

    addOperation(value) {
        console.log(String(value));
        console.log(this.isOperator(String(value)));
        if (isNaN(this.getLastOperation())) {
            if (this.isOperator(value)) {
                this.setLastOperation(value);
                console.log(this._operation);
            } else if (isNaN(value)) {
                console.log('outra coisa ---> ' + value);
            } else {
                this.pushOperation(value);
                console.log(this._operation);
                this.setLastNumberInDisplay();
            }
        } else {
            if (this.isOperator(value)) {
                this.pushOperation(value);
                console.log(this._operation);
            } else {
                let newValueOperation = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValueOperation));
                this.setLastNumberInDisplay();
                console.log(this._operation);
            }
        }
    }

    getLastOperation() {
        return this._operation[this._operation.length-1];
    }

    execBtn(value) {
        switch(value) {
            // cancel entry or all clear
            case 'ac':
                this.clearAll();
                break;
            // cancel entry or the last entry
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperation('+');
                break;
            case 'igual':
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'divsao':
                this.addOperation('/');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'ponto':
                this.addOperation('.');
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
            default:
                this.setError();
                break;
        }
    }

    initButtonsEvents() {
        let buttons = document.querySelectorAll('#buttons > g, #parts > g');

        buttons.forEach((btn, id)=>{
            this.addEventListenerAll(btn, 'click drag', e => {
                let textBtn = btn.className.baseVal.replace('btn-', '');

                this.execBtn(textBtn);
            });


            this.addEventListenerAll(btn, 'mouseover mousedown mouseup', e => {
                btn.style.cursor = 'pointer';
            });
        });
    }

    setDisplayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
        this.displayTime = this.currentTime.toLocaleTimeString(this._locale);
    }

    get displayTime() {
        return this._timeEl.innerHTML;
    }

    set displayTime(value) {
        this._timeEl.innerHTML = value;
    }

    get displayDate() {
        return this._dateEl.innerHTML;
    }

    set displayDate(value) {
        this._dateEl.innerHTML = value;
    }

    get displayCalc() {
        return this._dispEl.innerHTML;
    }

    set displayCalc(value) {
        this._dispEl.innerHTML = value;
    }

    get currentDate() {
        return new Date;
    }

    set currentDate(value) {
        this._currentDate = value;
    }

    get currentTime() {
        return new Date;
    }

    set currentTime(value) {
        this._currentTime = value;
    }
}