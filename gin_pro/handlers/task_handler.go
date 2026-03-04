package handlers

import (
    "net/http"
    "strconv"

    "github.com/gin-gonic/gin"
    "gin_pro/models"
    "gin_pro/repository"
)

func GetTasks(c *gin.Context) {
    tasks, _ := repository.GetAllTasks()
    c.JSON(http.StatusOK, tasks)
}

func CreateTask(c *gin.Context) {
    var t models.Task
    if err := c.BindJSON(&t); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    task, _ := repository.CreateTask(t)
    c.JSON(http.StatusCreated, task)
}

func UpdateTask(c *gin.Context) {
    id, _ := strconv.Atoi(c.Param("id"))
    var t models.Task
    if err := c.BindJSON(&t); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    t.ID = id
    repository.UpdateTask(t)
    c.JSON(http.StatusOK, t)
}

func DeleteTask(c *gin.Context) {
    id, _ := strconv.Atoi(c.Param("id"))
    repository.DeleteTask(id)
    c.JSON(http.StatusOK, gin.H{"message": "deleted"})
}