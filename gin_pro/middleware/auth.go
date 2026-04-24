package middleware

import (
	"net/http"
	"strings"

	"os"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// HeaderからTokenを取得
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "トークンがありません"})
			return
		}

		// "Bearer eyJhbGci..." → "eyJhbGci..." に変換
		tokenStr := strings.TrimPrefix(authHeader, "Bearer ")

		// トークンを検証
		token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
			return []byte(os.Getenv("JWT_SECRET")), nil
		})

		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "トークンが無効です"})
			c.Abort()
			return
		}

		// 次の処理へ
		c.Next()
	}
}
