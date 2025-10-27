# ---------- Build stage ----------
    FROM golang:1.23-alpine AS builder

    # Set environment variables for Go
    ENV CGO_ENABLED=0 GOOS=linux GOARCH=amd64
    
    # Set working directory
    WORKDIR /app
    
    # Copy go.mod and go.sum first for dependency caching
    COPY go.mod ./
    # Only copy go.sum if it exists
    RUN [ -f go.sum ] && cp go.sum . || touch go.sum
    RUN go mod download
    
    
    # Copy the rest of the source code
    COPY . .
    
    # Build the Go binary
    RUN go build -o payment-service .
    
    # ---------- Run stage ----------
    FROM alpine:3.20
    
    # Add SSL root certificates (for HTTPS calls)
    RUN apk add --no-cache ca-certificates
    
    WORKDIR /root/
    
    # Copy binary from builder
    COPY --from=builder /app/payment-service .
    
    # Expose service port
    EXPOSE 8080
    
    # Start the service
    CMD ["./payment-service"]
    