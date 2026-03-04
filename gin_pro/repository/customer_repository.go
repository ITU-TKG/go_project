// repository/customer.go として新規作成

package repository

import (
    "gin_pro/models"
    "gin_pro/db"
)

func GetAllCustomers() ([]models.Customer, error) {
    rows, err := db.DB.Query("SELECT id, name, jender FROM customers")
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    customers := []models.Customer{}
    for rows.Next() {
        var c models.Customer
        rows.Scan(&c.ID, &c.Name, &c.Jender)
        customers = append(customers, c)
    }
    return customers, nil
}

func InsertCustomer(c models.Customer) (models.Customer, error) {
    res, err := db.DB.Exec("INSERT INTO customers(name, jender) VALUES(?, ?)", c.Name, c.Jender)
    if err != nil {
        return c, err
    }
    id, _ := res.LastInsertId()
    c.ID = int(id)
    return c, nil
}

func UpdateCustomer(c models.Customer) error {
    _, err := db.DB.Exec("UPDATE customers SET name=?, jender=? WHERE id=?", c.Name, c.Jender, c.ID)
    return err
}

func DeleteCustomer(id int) error {
    _, err := db.DB.Exec("DELETE FROM customers WHERE id=?", id)
    return err
}