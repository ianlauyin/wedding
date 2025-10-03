# Multi-stage build for Wedding App
# Stage 1: Build Frontend
FROM node:20-alpine AS frontend-builder

WORKDIR /app

# Copy workspace configuration files
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY frontend/package.json ./frontend/package.json
COPY interface/package.json ./interface/package.json

# Install pnpm
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Copy source code
COPY frontend/ ./frontend/
COPY interface/ ./interface/

# Build frontend
WORKDIR /app/frontend
RUN pnpm run build

# Stage 2: Build Rust Backend
FROM rust:1-bookworm AS backend-builder

WORKDIR /app

# Add Confluent repository for latest librdkafka
RUN curl https://packages.confluent.io/deb/7.9/archive.key | gpg --dearmor > /usr/share/keyrings/confluent.gpg \
    && echo "deb [signed-by=/usr/share/keyrings/confluent.gpg] https://packages.confluent.io/clients/deb bookworm main" | tee /etc/apt/sources.list.d/confluent.list

# Install build dependencies
RUN apt-get update && apt-get install -y \
    librdkafka-dev \
    libclang-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy workspace Cargo files
COPY Cargo.toml Cargo.lock ./

# Copy all crate manifests for dependency caching
COPY backend/Cargo.toml ./backend/
COPY backend/macros/Cargo.toml ./backend/macros/
COPY interface/Cargo.toml ./interface/

# Copy all source code
COPY backend/ ./backend/
COPY interface/ ./interface/

# Copy frontend build to backend assets
COPY --from=frontend-builder /app/frontend/dist ./backend/assets/web

# Build backend in release mode
WORKDIR /app/backend
RUN cargo build --release

# Stage 3: Runtime
FROM debian:bookworm-slim

WORKDIR /app

# Copy Confluent repository config from builder
COPY --from=backend-builder /etc/apt/sources.list.d/confluent.list /etc/apt/sources.list.d/confluent.list
COPY --from=backend-builder /usr/share/keyrings/confluent.gpg /usr/share/keyrings/confluent.gpg

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    ca-certificates \
    libssl3 \
    librdkafka1 \
    && rm -rf /var/lib/apt/lists/*

# Copy binary from builder
COPY --from=backend-builder /app/target/release/wedding_backend ./wedding_backend

# Copy web assets
COPY --from=frontend-builder /app/frontend/dist ./assets/web

# Create non-root user
RUN useradd -m -u 1000 wedding && \
    chown -R wedding:wedding /app

USER wedding

# Expose port
EXPOSE 8080

# Run the application
CMD ["./wedding_backend"]

