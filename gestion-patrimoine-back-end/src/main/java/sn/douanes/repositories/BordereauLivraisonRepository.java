package sn.douanes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sn.douanes.entities.BordereauLivraison;
import sn.douanes.entities.Prestataires;

import java.util.List;


@Repository
public interface BordereauLivraisonRepository extends JpaRepository<BordereauLivraison, String> {
    List<BordereauLivraison> findAllByNinea(Prestataires ninea);
}
