package db

import (
	"database/sql"
	"fmt"
	"os"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func InitDB() error {
	
	// 環境変数から取得
	user := os.Getenv("DB_USER")
	pass := os.Getenv("DB_PASSWORD")
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	name := os.Getenv("DB_NAME")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true&charset=utf8mb4",
		user, pass, host, port, name)

	var err error
	DB, err = sql.Open("mysql", dsn)
	if err != nil {
		return err
	}

	 for i := 0; i < 10; i++ {
        if err = DB.Ping(); err == nil {
            fmt.Println("MySQL connected")
            return nil
        }
        fmt.Println("DB接続失敗、リトライ中...", err)
        time.Sleep(3 * time.Second)
    }

    return fmt.Errorf("DB接続できません: %w", err)
}