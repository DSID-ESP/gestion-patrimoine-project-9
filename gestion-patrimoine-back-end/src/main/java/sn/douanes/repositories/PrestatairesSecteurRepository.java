package sn.douanes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sn.douanes.entities.PrestatairesSecteur;
import sn.douanes.entities.keys.PrestatairesSecteurId;

@Repository
public interface PrestatairesSecteurRepository extends JpaRepository<PrestatairesSecteur, PrestatairesSecteurId> {

}
