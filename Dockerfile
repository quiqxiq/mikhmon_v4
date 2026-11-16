# ==========================================
# Mikhmon V4 Production Dockerfile
# Base: PHP 8.2 FPM Alpine (Lightweight & Secure)
# ==========================================
FROM php:8.2-fpm-alpine

# Set maintainer metadata
LABEL maintainer="Mikhmon V4 Team"
LABEL description="Production Docker image for Mikhmon V4 Hotspot Management"

# Install system dependencies and PHP build requirements
RUN apk add --no-cache \
    curl \
    libcurl \
    curl-dev \
    oniguruma-dev \
    tzdata \
    && docker-php-ext-install -j$(nproc) \
        sockets \
        curl \
        mbstring \
        opcache \
    && apk del --purge curl-dev oniguruma-dev \
    && rm -rf /var/cache/apk/*

# Apply production PHP configuration
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini" \
    && sed -i 's/upload_max_filesize = 2M/upload_max_filesize = 25M/g' "$PHP_INI_DIR/php.ini" \
    && sed -i 's/post_max_size = 8M/post_max_size = 30M/g' "$PHP_INI_DIR/php.ini" \
    && sed -i 's/memory_limit = 128M/memory_limit = 256M/g' "$PHP_INI_DIR/php.ini" \
    && sed -i 's/max_execution_time = 30/max_execution_time = 120/g' "$PHP_INI_DIR/php.ini"

# Configure OPcache for production
RUN { \
    echo 'opcache.enable=1'; \
    echo 'opcache.memory_consumption=128'; \
    echo 'opcache.interned_strings_buffer=8'; \
    echo 'opcache.max_accelerated_files=4000'; \
    echo 'opcache.revalidate_freq=2'; \
    echo 'opcache.fast_shutdown=1'; \
    echo 'opcache.enable_cli=1'; \
} > "$PHP_INI_DIR/conf.d/opcache-recommended.ini"

# Set application working directory
WORKDIR /var/www/html

# Copy application files
COPY . /var/www/html

# Set appropriate directory permissions for www-data
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html \
    && chmod -R 775 /var/www/html/config

EXPOSE 9000

CMD ["php-fpm"]
