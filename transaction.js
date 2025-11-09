export class Transaction {
    #amount;
    #type;
    #timestamp;
    #currency;

    constructor(amount = 0, type = 'debit', currency = 'USD') {
        this.#amount = amount;
        this.#type = type;
        this.#currency = currency;
        this.#timestamp = new Date();
    }

    get amount() {
        return this.#amount;
    }

    get type() {
        return this.#type;
    }

    get timestamp() {
        return this.#timestamp;
    }

    get currency() {
        return this.#currency;
    }

    set amount(value) {
        if (typeof value === 'number' && value >= 0) {
            this.#amount = value;
        } else {
            console.error('Ошибка: Сумма должна быть неотрицательным числом');
        }
    }

    set type(value) {
        if (['debit', 'credit'].includes(value)) {
            this.#type = value;
        } else {
            console.error('Ошибка: Тип должен быть "debit" или "credit"');
        }
    }

    set currency(value) {
        if (typeof value === 'string' && value.length === 3) {
            this.#currency = value.toUpperCase();
        } else {
            console.error('Ошибка: Валюта должна быть 3-буквенным кодом');
        }
    }

    show() {
        console.log('Детали транзакции:');
        console.log(`Сумма: ${this.#amount} ${this.#currency}`);
        console.log(`Тип: ${this.#type}`);
        console.log(`Время: ${this.#timestamp.toLocaleString('ru-RU')}`);
        console.log(`Комиссия: ${this.getFee()} ${this.#currency}`);
    }

    delete() {
        this.#amount = null;
        this.#type = null;
        this.#timestamp = null;
        this.#currency = null;
        
        Object.freeze(this);
        console.log('Экземпляр транзакции был удален');
    }

    copy() {
        return this;
    }

    #calculateFee() {
        const feeRate = this.#type === 'credit' ? 0.02 : 0.01;
        return this.#amount * feeRate;
    }

    static clone(transaction) {
        return new Transaction(
            transaction.#amount,
            transaction.#type,
            transaction.#currency
        );
    }

    getFee() {
        return this.#calculateFee();
    }
}