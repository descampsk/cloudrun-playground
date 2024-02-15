# Use the official Caddy image
FROM caddy:2-alpine

# Copy the Caddyfile into the image
COPY Caddyfile /etc/caddy/Caddyfile

# Expose port 80
EXPOSE 80

# Run Caddy
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
