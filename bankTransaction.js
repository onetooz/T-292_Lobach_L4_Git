import { Transaction } from './transaction.js';

export class BankTransaction extends Transaction {
    #isInternational;

    constructor(amount = 0, type = 'debit', currency = 'USD', isInternational = false) {
        super(amount, type, currency);
        this.#isInternational = isInternational;
    }

    get isInternational() {
        return this.#isInternational;
    }

    set isInternational(value) {
        if (typeof value === 'boolean') {
            this.#isInternational = value;
        } else {
            console.error('Ошибка: isInternational должен быть логическим значением');
        }
    }

    show() {
        console.log('Детали банковской транзакции:');
        console.log(`Сумма: ${this.amount} ${this.currency}`);
        console.log(`Тип: ${this.type}`);
        console.log(`Время: ${this.timestamp.toLocaleString('ru-RU')}`);
        console.log(`Международная: ${this.#isInternational ? 'Да' : 'Нет'}`);
        console.log(`Комиссия: ${this.getFee()} ${this.currency}`);
    }

    delete() {
        this.#isInternational = null;
        super.delete();
        console.log('Экземпляр банковской транзакции был полностью удален');
    }

    copy() {
        const copy = new BankTransaction(
            this.amount,
            this.type,
            this.currency,
            this.#isInternational
        );
        return copy;
    }

    static clone(transaction) {
        return new BankTransaction(
            transaction.amount,
            transaction.type,
            transaction.currency,
            transaction.isInternational
        );
    }

    getFee() {
        const baseFee = super.getFee();
        return this.#isInternational ? baseFee * 2 : baseFee;
    }
}