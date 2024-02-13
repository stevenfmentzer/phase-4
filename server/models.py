from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import datetime
#Import database and bcrypt from config.py
from config import db, bcrypt


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    username = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String)

    # Add relationship
    bills = db.relationship('Bill', back_populates='user', cascade ='all, delete-orphan')
    incomes = db.relationship('Income', back_populates='user', cascade ='all, delete-orphan')
    banks = db.relationship('BankAccount', back_populates='user', cascade ='all, delete-orphan')

    # Add serialization rules
    serialize_rules=('-bills.user', '-incomes.user', '-banks.user')

    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    @validates('first_name', 'last_name')
    def validate_name(self, key, value):
        value = value.strip()
        if not 1 <= len(value) <= 20:
            raise ValueError(f"{key} must be a String between 1-20 characters")
        return value 
    


    def __repr__(self):
        return f'<User id: {self.id}\n \
                    name: {self.first_name} {self.last_name}\n \
                    username: {self.username}\n \
                    password: {self._password_hash}\n \
                    >'

class Bill(db.Model, SerializerMixin):
    __tablename__ = 'bills'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String)
    lender_name = db.Column(db.String)
    description = db.Column(db.String)
    pay_date = db.Column(db.Date)
    bill_type = db.Column(db.String)
    balance_init = db.Column(db.Float)
    balance_remain = db.Column(db.Float)
    min_pay_value = db.Column(db.Float)
    apr_rate = db.Column(db.Float)

    # Add relationship
    user = db.relationship('User', back_populates='bills')
    payments = db.relationship('Payment', back_populates='bill', cascade='all, delete-orphan')

    # Add serialization rules
    serialize_rules=('-user.bills','-payments.bill')
    
    @validates('name','lender_name','description')
    def validate_bill_string(self, key, value):
        if key == 'name':
            if not 0 < len(value) <= 20: 
                raise ValueError(f"{key} must be between 1-20 characters")
        elif key == 'lender_name': 
            if key and not 0 < len(value) <= 30: 
                raise ValueError(f"{key} must be between 1-30 characters")
        elif key == 'description':
            if key and not 0 < len(value) <= 50: 
                raise ValueError(f"{key} must be between 1-50 characters")
        return value

    @validates('bill_type','pay_date')
    def validate_bill_info(self, key, value):
        if key == 'bill_type':
            pass
        elif key == 'pay_date':
            if isinstance(value, str): 
                value = datetime.strptime(value, '%m-%d-%Y').date()
            elif isinstance(value, datetime):
                value = value.date()
            else: 
                raise ValueError(f"ERROR : {key} must be of type DateTime")
        return value

    @validates('balance_init','balance_remain','min_pay_value','apr_rate')
    def validates_bill_numbers(self, key, value):
        if value is None:
            return value
        if key == 'apr_rate':
            value = float(value)
            try:
                apr_rate = float(value)
                if not 0 <= apr_rate:
                    raise ValueError(f"{key} must be a positive float")
                # Check if the number has more than two decimal places after the dot
                if '.' in str(apr_rate) and len(str(apr_rate).split('.')[1]) > 2:
                    raise ValueError(f"{key} must have a maximum of two decimal points")
            except ValueError:
                raise ValueError(f"{key} must be a valid float value")
        else:
            if not 0 < value: 
                raise ValueError(f"{key} must be a positive Float")
        return value

    def __repr__(self):
        return f'<Bill\n \
            id:{self.id}\n \
            user_id:{self.user_id}\n \
            name: {self.name}\n \
            lender_name: {self.lender_name}\n \
            description: {self.description}\n \
            pay_date: {self.pay_date}\n \
            bill_type: {self.bill_type}\n \
            balance_init: {self.balance_init}\n \
            balance_remain: {self.balance_remain}\n \
            min_pay_value: {self.min_pay_value}\n \
            apr_rate: {self.apr_rate}\n \
            >'

class BankAccount(db.Model, SerializerMixin):
    __tablename__ = 'bank_accounts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String)
    balance = db.Column(db.Float)

    # Add relationship
    user = db.relationship('User', back_populates='banks')
    payments = db.relationship('Payment', back_populates='bank', cascade='all, delete-orphan')
    incomes = db.relationship('Income', back_populates='bank', cascade='all, delete-orphan')

    # Add serialization rules
    serialize_rules=('-user.banks','-payments.bank', '-incomes.bank')

    @validates('name', 'balance')
    def validate_bank_account(self, key, value):
        if key == 'name':
            value = value.strip()
            if not 1 <= len(value) <= 20:
                raise ValueError(f"{key} must be a String between 1-20 characters")
        elif key == 'balance':
            value = float(value)
            if not 0 < value:
                raise ValueError(f"{key} must be greater than 0")
        return value
    
    def __repr__(self):
        return f'<BankAccount\n \
                    id: {self.id}\n \
                    user_id: {self.user_id}\n \
                    name: {self.name}\n \
                    balance: {self.balance}\n \
                    >'

class Income(db.Model, SerializerMixin):
    __tablename__ = 'incomes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    bank_account_id = db.Column(db.Integer, db.ForeignKey('bank_accounts.id'))
    pay_value = db.Column(db.Float)
    pay_freq = db.Column(db.Integer)

    # Add relationship
    user = db.relationship('User', back_populates='incomes')
    bank = db.relationship('BankAccount', back_populates='incomes')

    # Add serialization rules
    serialize_rules=('-user', '-bank')

    @validates('pay_value', 'pay_freq')
    def validate_income(self, key, value):
        if key == 'pay_value':
            value = float(value)
            if not 0 < value:
                raise ValueError(f"{key} must be greater than 0")
        elif key == 'pay_freq':
            if value and not 1 <= value <= 4: 
                raise ValueError(f"{key} must be between 1-4")
        return value
    
    def __repr__(self):
        return f'<Income\n \
                    id: {self.id}\n \
                    user_id: {self.user_id}\n \
                    bank_account_id: {self.bank_account_id}\n \
                    pay_value: {self.pay_value}\n \
                    pay_freq: {self.pay_freq}\n \
                    >'

class Payment(db.Model, SerializerMixin):
    __tablename__ = 'payments'

    id = db.Column(db.Integer, primary_key=True)
    bank_account_id = db.Column(db.Integer, db.ForeignKey('bank_accounts.id'))
    bill_id = db.Column(db.Integer, db.ForeignKey('bills.id'))
    pay_date = db.Column(db.Date)
    pay_value = db.Column(db.Float)

    # Add relationship
    bill = db.relationship('Bill', back_populates='payments')
    bank = db.relationship('BankAccount', back_populates='payments')

    # Add serialization rules
    serialize_rules=('-bill', '-bank')

    @validates('pay_value')
    def validate_payment(self, key, value):
        if not isinstance(value, float):
            value = float(value)
        if not 0 < value: 
            raise ValueError(f"{key} must be greater than 0")
        return value
    
    @validates('pay_date')
    def validate_pay_date(self, key, value):
        if key == 'pay_date':
            if isinstance(value, str): 
                value = datetime.strptime(value, '%m-%d-%Y').date()
            elif isinstance(value, datetime):
                value = value.date()
            else: 
                raise ValueError(f"ERROR : {key} must be of type DateTime")
        return value
    
    def __repr__(self):
        return f'<Payment\n \
                    id: {self.id}\n \
                    bank_account_id: {self.bank_account_id}\n \
                    bill_id: {self.bill_id }\n \
                    pay_date: {self.pay_date}\n \
                    pay_value: {self.pay_value}\n \
                    >'
    
