package uy.gub.sicetwo.catalog.api;

import io.quarkus.security.Authenticated;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import uy.gub.sicetwo.catalog.domain.CatalogItem;
import uy.gub.sicetwo.catalog.infrastructure.persistence.CatalogItemRepository;

import java.util.List;

@Path("/api/v1/catalog-items")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@ApplicationScoped
@Authenticated // All methods require authentication
public class CatalogResource {

    @Inject
    CatalogItemRepository repository;

    @GET
    public List<CatalogItem> getAll() {
        return repository.listAll();
    }

    @GET
    @Path("/{id}")
    public CatalogItem getById(@PathParam("id") Long id) {
        return repository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Item with id " + id + " not found."));
    }

    @POST
    @Transactional
    // @RolesAllowed("catalog-admin") // Example of role-based access
    public Response create(CatalogItem item) {
        repository.persist(item);
        return Response.status(Response.Status.CREATED).entity(item).build();
    }

    // Implement PUT and DELETE methods similarly
    // ...
}