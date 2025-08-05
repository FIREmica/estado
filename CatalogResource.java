package uy.gub.sicetwo.catalog.infrastructure.persistence;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import uy.gub.sicetwo.catalog.domain.CatalogItem;

@ApplicationScoped
public class CatalogItemRepository implements PanacheRepository<CatalogItem> {
    // Panache provides all basic CRUD operations out of the box.
}