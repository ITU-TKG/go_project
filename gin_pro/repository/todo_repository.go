package repository

import (
	"gin_pro/models"
	"gin_pro/db"
)

func GetAllTodos() ([]models.Todo, error) {
    rows, err := db.DB.Query("SELECT id, title, name, jender, done FROM todos")
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    todo := []models.Todo{}
    for rows.Next() {
        var t models.Todo
        rows.Scan(&t.ID, &t.Title, &t.Name, &t.Jender, &t.Done)
        todo = append(todo, t)
    }
    return todo, nil
}

func CreateTodo(t models.Todo) (models.Todo, error) {
    res, err := db.DB.Exec("INSERT INTO todos(title, name, jender, done) VALUES(?, ?, ?, ?)", t.Title, t.Name, t.Jender, t.Done)
    if err != nil {
        return t, err
    }
    id, _ := res.LastInsertId()
    t.ID = int(id)
    return t, nil
}

func UpdateTodo(t models.Todo) error {
    _, err := db.DB.Exec("UPDATE todos SET title=?, name=?, jender=?, done=? WHERE id=?", t.Title, t.Name, t.Jender, t.Done, t.ID)
    return err
}

func DeleteTodo(id int) error {
    _, err := db.DB.Exec("DELETE FROM todos WHERE id=?", id)
    return err
}