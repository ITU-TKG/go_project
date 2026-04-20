package main

import (
	"fmt"
	"gin_pro/handlers"
	"os"

	"gin_pro/db"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
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
	r.POST("/register", handlers.Register)
	r.POST("/login", handlers.Login)

	r.Run(":8080")
}
