package repository

import (
	"database/sql"
	"gin_pro/db"
	"gin_pro/models"
)

func GetAllTodos() ([]models.Todo, error) {
	rows, err := db.DB.Query("SELECT id, title, name, jender, done, due_date FROM todos")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	todo := []models.Todo{}
	for rows.Next() {
		var t models.Todo
		var dueDate sql.NullString
		rows.Scan(&t.ID, &t.Title, &t.Name, &t.Jender, &t.Done, &dueDate)
		if dueDate.Valid {
			t.DueDate = dueDate.String[:10] //yyyy-mm-dd形式に
		}
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
	_, err := db.DB.Exec("UPDATE todos SET title=?, name=?, jender=?, done=?, due_date=? WHERE id=?", t.Title, t.Name, t.Jender, t.Done, t.ID)
	return err
}

func DeleteTodo(id int) error {
	_, err := db.DB.Exec("DELETE FROM todos WHERE id=?", id)
	return err
}
