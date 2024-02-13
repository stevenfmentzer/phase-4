from random import randint, choice as rc
from faker import Faker
from app import app
from models import db, User, Bill, BankAccount, Income, Payment

fake = Faker()

def create_user_object():
    new_user = User(
        first_name=fake.first_name(),
        last_name=fake.last_name(),
        username=fake.user_name(),
    )
    # Set the password using the setter method
    password = fake.password()
    user_passwords.append(password)
    new_user.password_hash = password
    return new_user

def create_bills(user):
    bills = []
    for _ in range(randint(1, 5)):
        bill = Bill(
            user_id=user.id,
            name=fake.word(),
            lender_name=fake.text(max_nb_chars=30),
            description=fake.text(max_nb_chars=50),
            pay_date=fake.date_this_year(),
            bill_type=rc(['Utility', 'Subscription', 'Credit Card']),
            balance_init=randint(50, 500),
            balance_remain=randint(0, 500),
            min_pay_value=randint(10, 100),
            apr_rate=randint(1, 25) / 100
        )
        bills.append(bill)
    return bills

def create_bank_account(user):
    return BankAccount(
        user_id=user.id,
        name=fake.word(),
        balance=randint(100, 10000)
    )

def create_incomes(user, bank_account):
    incomes = []
    for _ in range(randint(1, 3)):
        income = Income(
            user_id=user.id,
            bank_account_id=bank_account.id,
            pay_value=randint(500, 2000),
            pay_freq=randint(1, 4)
        )
        incomes.append(income)
    return incomes

def create_payments(user, bills, bank_account):
    payments = []
    for _ in range(randint(1, 5)):
        random_bill = rc(bills)
        payment = Payment(
            bank_account_id=bank_account.id,
            bill_id=random_bill.id,
            pay_date=random_bill.pay_date,
            pay_value=randint(10, 100)
        )
        payments.append(payment)
    return payments

if __name__ == '__main__':
    with app.app_context():
        print(app)
        models = [User, Bill, BankAccount, Income, Payment]

        print("Clearing db...")
        for model in models:
            model.query.delete()

        print("Seeding Tables")
        user_passwords = []
        for _ in range(10):
            user = create_user_object()
            db.session.add(user)
            db.session.commit()

            bills = create_bills(user)
            db.session.add_all(bills)
            db.session.commit()

            bank_account = create_bank_account(user)
            db.session.add(bank_account)
            db.session.commit()

            incomes = create_incomes(user, bank_account)
            db.session.add_all(incomes)
            db.session.commit()

            payments = create_payments(user, bills, bank_account)
            db.session.add_all(payments)
            db.session.commit()

        # Write passwords to a file
        with open('user_passwords.txt', 'w') as f:
            for password in user_passwords:
                f.write(password + '\n')
        print("Done seeding!")