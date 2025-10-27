# ---------- Build stage ----------
    FROM golang:1.23-alpine AS builder

    ENV CGO_ENABLED=0 GOOS=linux GOARCH=amd64
    WORKDIR /app
    
    COPY go.mod ./
# Only copy go.sum if it exists
RUN [ -f go.sum ] && cp go.sum . || touch go.sum
RUN go mod download

    
    COPY . .
    RUN go build -o analytics-service .
    
    # ---------- Run stage ----------
    FROM alpine:3.20
    
    RUN apk add --no-cache ca-certificates
    
    WORKDIR /root/
    COPY --from=builder /app/analytics-service .
    
    EXPOSE 8081
    CMD ["./analytics-service"]
    