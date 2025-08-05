package uy.gub.sicetwo.catalog.domain;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;

@Entity
public class CatalogItem extends PanacheEntity {

    public String name;
    public String description;
    public String code; // e.g., UNSPSC code

    public CatalogItem() {
    }

    public CatalogItem(String name, String description, String code) {
        this.name = name;
        this.description = description;
        this.code = code;
    }
}