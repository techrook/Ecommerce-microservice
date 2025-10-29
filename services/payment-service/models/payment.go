package model

import "time"

type Payment struct {
	ID         string    `json:"id"`
	OrderID    string    `json:"orderId"`
	UserID     string    `json:"userId"`
	Amount     float64   `json:"amount"`
	Status     string    `json:"status"` // pending, completed, failed
	CreatedAt  time.Time `json:"createdAt"`
	UpdatedAt  time.Time `json:"updatedAt"`
}
