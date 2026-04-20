package repository

import (
	"gin_pro/db"
	"gin_pro/models"
)

// メールアドレスでユーザーを検索
func GetUserByEmail(email string) (models.User, error) {
	var u models.User
	row := db.DB.QueryRow("SELECT id, email, password FROM users WHERE email = ?", email)
	err := row.Scan(&u.ID, &u.Email, &u.Password)
	return u, err
}

// ユーザー登録
func CreateUser(u models.User) (models.User, error) {
	res, err := db.DB.Exec("INSERT INTO users(email, password) VALUES(?, ?)", u.Email, u.Password)
	if err != nil {
		return u, err
	}
	id, _ := res.LastInsertId()
	u.ID = int(id)
	return u, nil
}
