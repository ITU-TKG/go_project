package main

import (
    "gin_pro/handlers"
    "fmt"
    "os"

    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
    "gin_pro/db"
)

func main() {
    if err := db.InitDB(); err != nil {
        panic(err)
    }

    r := gin.Default()

    r.Use(cors.New(cors.Config{
        AllowOrigins: []string{
			"http://localhost:3000",
			"http://localhost:3001",
		},
        AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},
        AllowHeaders: []string{"Content-Type"},
    }))


    fmt.Println("HOST:", os.Getenv("DB_HOST"))
    fmt.Println("PORT:", os.Getenv("DB_PORT"))

    r.GET("/todos", handlers.GetTodos)
    r.POST("/todos", handlers.CreateTodo)
    r.PUT("/todos/:id", handlers.UpdateTodo)
    r.DELETE("/todos/:id", handlers.DeleteTodo)

    r.Run(":8080")
}