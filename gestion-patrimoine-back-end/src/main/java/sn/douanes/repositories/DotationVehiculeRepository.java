package sn.douanes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sn.douanes.entities.Agent;
import sn.douanes.entities.DotationVehicule;
import sn.douanes.entities.Utilisateur;
import sn.douanes.entities.Vehicule;

@Repository
public interface DotationVehiculeRepository extends JpaRepository<DotationVehicule, String> {

    DotationVehicule findByNumeroSerie(Vehicule numeroSerie);
}
