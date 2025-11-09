import { BankTransaction } from './bankTransaction.js';

const transactions = [
    new BankTransaction(100, 'debit', 'USD', false),
    new BankTransaction(500, 'credit', 'EUR', true)
];

console.log('Первая транзакция:');
transactions[0].show();

console.log('\nВторая транзакция:');
transactions[1].show();

console.log('\n=== Дополнительная демонстрация ===');

console.log('\nИзменение суммы первой транзакции:');
transactions[0].amount = 200;
transactions[0].show();

console.log('\nПопытка установить неверную сумму:');
transactions[0].amount = -50;

console.log('\nСоздание копии:');
const copy = transactions[0].copy();
copy.show();

console.log('\nКлонирование через статичный метод:');
const clone = BankTransaction.clone(transactions[1]);
clone.show();

console.log('\nПроверка ссылок:');
console.log('transactions[1] === clone:', transactions[1] === clone);
console.log('transactions[1].amount === clone.amount:', transactions[1].amount === clone.amount);

console.log('\nДемонстрация метода delete:');
const tempTransaction = new BankTransaction(300, 'debit', 'RUB', false);
tempTransaction.show();
tempTransaction.delete();

console.log('\nПопытка использовать удаленную транзакцию:');
try {
    tempTransaction.show();
} catch (error) {
    console.log('Транзакция недоступна после удаления');
}