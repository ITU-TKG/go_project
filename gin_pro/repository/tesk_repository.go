package repository

import (
	"gin_pro/models"
	"gin_pro/db"
)

func GetAllTasks() ([]models.Task, error) {
    rows, err := db.DB.Query("SELECT id, title, done FROM tasks")
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    tasks := []models.Task{}
    for rows.Next() {
        var t models.Task
        rows.Scan(&t.ID, &t.Title, &t.Done)
        tasks = append(tasks, t)
    }
    return tasks, nil
}

func CreateTask(t models.Task) (models.Task, error) {
    res, err := db.DB.Exec("INSERT INTO tasks(title, done) VALUES(?, ?)", t.Title, t.Done)
    if err != nil {
        return t, err
    }
    id, _ := res.LastInsertId()
    t.ID = int(id)
    return t, nil
}

func UpdateTask(t models.Task) error {
    _, err := db.DB.Exec("UPDATE tasks SET title=?, done=? WHERE id=?", t.Title, t.Done, t.ID)
    return err
}

func DeleteTask(id int) error {
    _, err := db.DB.Exec("DELETE FROM tasks WHERE id=?", id)
    return err
}