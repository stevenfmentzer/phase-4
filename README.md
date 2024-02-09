# CreditScape
<sup> Creator: Steven Mentzer </sup>

### Discover a financial management platform that offers you a panoramic view of your credit landscape, guiding your journey through credit cards, loans, and mortgage payments with ease.

Transform your finances with a dynamic and interactive payment strategy. Integrate a versatile payment plan encompassing all your bills, tailored to your needs. List all your bank accounts, providing an insightful overview of your financial reservoir as your various income sources and scheduled payments traverse through it. Incorporate your monthly expenses, spanning from mortgage payments to grocery allocations, to ensure comprehensive coverage. Visualize your daily bank balance, empowering you to meticulously plan your expenditures and identify surplus funds to accelerate debt repayment while evading unnecessary interest charges. With this enhanced approach, you'll navigate your financial landscape with confidence, swiftly eliminating debts and fostering financial stability.


## Installation Instructions

1. Fork and clone Git repository
2. Navigate to base directory in your terminal and run the following code: 

    ```insert instructions```
   
    ```insert instructions```

    ```insert instructions```

4. Enjoy the program!

## Backend (API)
### Models
#### One to Many - User: Bills, Banks, Incomes
* A `User` has many `Bills`, `Banks`, and `Incomes`
* A `User` has many `Payments` through `Bills` and `Banks`
* A `Bill` belongs to a `User`
* A `Bank` belongs to a `User`
* A `Income` belongs to a `User`

#### Many to Many - Bills, Banks: Payments
* A `Bill` has many `Payments` through the payments table.
* A `Bank` has many `Payments` through the payments table.
* A `Payment` belongs to `Bill` and `Bank`

### Validations

#### Users
* must have `first_name` and `last_name`

#### Banks
* `name` and `balance`must exist

#### Incomes
* `pay_value` must be greater than 0
* `pay_freq` must be between 1-4 (payouts per month)

#### Bills
* `name` is under 20 characters
* `lender_name` is an optional String less than 20 characters
* `description` is an optional String less than 50 characters
* `bill_type`, and `pay_date` must exist
* `balance_init`, `balance_remain`, `min_pay_value`, and `apr_rate` must all be positive Floats

#### Payments
* `pay_value` must be a Decimal(?)

## Controllers
### API routes RESTful conventions
#### Users
```
    GET/users
    POST/users
```
```
    GET/user/<int:id>
    PATCH/user/<int:id>
    DELETE/user/<int:id>
```
#### Bills
```
    GET/bills
    POST/bills
```
```
    GET/bill/<int:id>
    PATCH/bill/<int:id>
    DELETE/bill/<int:id>
```
#### Banks
```
    GET/banks
    POST/banks
```
```
    GET/bank/<int:id>
    PATCH/bank/<int:id>
    DELETE/bank/<int:id>
```
#### Incomes
```
    GET/incomes
    POST/incomes
```
```
    GET/income/<int:id>
    PATCH/income/<int:id>
    DELETE/income/<int:id>
```
#### Payments
```
    GET/payments
    POST/payments
```
```
    GET/payment/<int:id>
    PATCH/payment/<int:id>
    DELETE/payment/<int:id>
```
## Data flow visualizations

 ### ERD Database Table: 
 The entity relationship database is illustrated here: 

![cli](./CreditScape_ORD.png)


 ### CLI data schema flow chart: 
 The command line interface has a structured user iterface flow: 

![demo](./cli_flow.svg) 

## Libraries Utilized

1. SQLite
2. OS
3. PrettyTable
4. Datetime
5. Drawio
6. dbdiagram.io
