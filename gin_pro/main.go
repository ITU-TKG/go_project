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
	// DB 初期化
    if err := db.InitDB(); err != nil {
        panic(err)
	}
	r := gin.Default()

	 r.Use(cors.New(cors.Config{
        AllowOrigins: []string{"http://localhost:3000"},
        AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},
        AllowHeaders: []string{"Content-Type"},
    }))


    r.GET("/tasks", handlers.GetTasks)
    r.POST("/tasks", handlers.CreateTask)
    r.PUT("/tasks/:id", handlers.UpdateTask)
    r.DELETE("/tasks/:id", handlers.DeleteTask)

	r.GET("/customers", handlers.GetCustomers)
	r.POST("/customers", handlers.InsertCustomers)
	r.PUT("/customers", handlers.UpdateCustomer)
	r.PUT("/customers/:id", handlers.UpdateCustomer)
	r.DELETE("/customers/:id", handlers.DeleteCustomer)

    r.Run(":8080")

	fmt.Println("HOST:", os.Getenv("DB_HOST"))
fmt.Println("PORT:", os.Getenv("DB_PORT"))
}
