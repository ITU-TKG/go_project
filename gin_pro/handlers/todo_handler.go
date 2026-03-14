package handlers

import (
    "net/http"
    "strconv"

    "github.com/gin-gonic/gin"
    "gin_pro/models"
    "gin_pro/repository"
)

func GetTodos(c *gin.Context) {
    todos, _ := repository.GetAllTodos()
    c.JSON(http.StatusOK, todos)
}

func CreateTodo(c *gin.Context) {
    var t models.Todo
    if err := c.BindJSON(&t); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    todo, _ := repository.CreateTodo(t)
    c.JSON(http.StatusCreated, todo)
}

func UpdateTodo(c *gin.Context) {
    id, _ := strconv.Atoi(c.Param("id"))
    var t models.Todo
    if err := c.BindJSON(&t); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    t.ID = id
    repository.UpdateTodo(t)
    c.JSON(http.StatusOK, t)
}

func DeleteTodo(c *gin.Context) {
    id, _ := strconv.Atoi(c.Param("id"))
    repository.DeleteTodo(id)
    c.JSON(http.StatusOK, gin.H{"message": "deleted"})
}