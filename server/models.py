from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

metadata = MetaData(naming_convention=convention)

db = SQLAlchemy(metadata=metadata)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)

    # Add relationship

    # Add serialization rules

class Bill(db.Model, SerializerMixin):
    __tablename__ = 'bills'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String)
    lender_name = db.Column(db.String)
    description = db.Column(db.String)
    pay_date = db.Column(db.DateTime)
    bill_type = db.Column(db.String)
    balance_init = db.Column(db.Float)
    balance_remain = db.Column(db.Float)
    min_pay_value = db.Column(db.Float)
    apr_rate = db.Column(db.Float)

    # Add relationship

    # Add serialization rules


class Bank(db.Model, SerializerMixin):
    __tablename__ = 'banks'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String)
    balance = db.Column(db.Float)

    # Add relationship

    # Add serialization rules

class Income(db.Model, SerializerMixin):
    __tablename__ = 'incomes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    bank_id = db.Column(db.Integer, db.ForeignKey('banks.id'))
    pay_value = db.Column(db.Integer)
    pay_freq = db.Column(db.Integer)

    # Add relationship

    # Add serialization rules

class Payment(db.Model, SerializerMixin):
    __tablename__ = 'payments'

    id = db.Column(db.Integer, primary_key=True)
    bank_id = db.Column(db.Integer, db.ForeignKey('banks.id'))
    bill_id = db.Column(db.Integer, db.ForeignKey('bills.id'))
    pay_date = db.Column(db.DateTime)
    pay_value = db.Column(db.Decimal)

    # Add relationship

    # Add serialization rules