# Application
quarkus.application.name=catalog-service
quarkus.application.version=1.0.0-SNAPSHOT

# Datasource (PostgreSQL)
# Replace with your actual database configuration
quarkus.datasource.db-kind=postgresql
quarkus.datasource.username=user
quarkus.datasource.password=password
quarkus.datasource.jdbc.url=jdbc:postgresql://localhost:5432/catalog_db

# Hibernate
quarkus.hibernate-orm.database.generation=drop-and-create
quarkus.hibernate-orm.log.sql=true

# Security (Keycloak OIDC)
# Replace with your actual Keycloak configuration
quarkus.oidc.auth-server-url=http://localhost:8080/realms/sicetwo
quarkus.oidc.client-id=catalog-service-client
# quarkus.oidc.credentials.secret=your-client-secret

# HTTP
quarkus.http.cors=true

# Observability
quarkus.log.console.json=true
quarkus.micrometer.export.prometheus.enabled=true
quarkus.micrometer.binder.http-server.enabled=true