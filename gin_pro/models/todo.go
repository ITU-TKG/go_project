package models

type Todo struct {
	ID      int    `json:"id"`
	Title   string `json:"title"`
	Name    string `json:"name"`
	Jender  string `json:"jender"`
	Done    bool   `json:"done"`
	DueDate string `json:"due_date"`
}
