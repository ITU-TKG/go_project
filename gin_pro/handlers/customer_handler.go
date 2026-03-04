package handlers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gin_pro/models"
	"gin_pro/repository"
)

func GetCustomers(c *gin.Context) {
	customers, _ := repository.GetAllCustomers()
	c.JSON(http.StatusOK, customers)
}

func InsertCustomers(c *gin.Context) {
	var t models.Customer
	if err := c.BindJSON(&t); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	customer, _ := repository.InsertCustomer(t)
	c.JSON(http.StatusCreated, customer)
}

func UpdateCustomer(c *gin.Context) {
    id, _ := strconv.Atoi(c.Param("id"))
    var t models.Customer
    if err := c.BindJSON(&t); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    t.ID = id
    repository.UpdateCustomer(t)
    c.JSON(http.StatusOK, t)
}

func DeleteCustomer(c *gin.Context) {
    id, _ := strconv.Atoi(c.Param("id"))
    repository.DeleteCustomer(id)
    c.JSON(http.StatusOK, gin.H{"message": "deleted"})
}