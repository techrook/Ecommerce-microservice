package model

import "time"

type Event struct {
	ID        string    `json:"id"`
	EventType string    `json:"eventType"`
	UserID    string    `json:"userId"`
	Data      string    `json:"data"` // can store JSON string
	CreatedAt time.Time `json:"createdAt"`
}
