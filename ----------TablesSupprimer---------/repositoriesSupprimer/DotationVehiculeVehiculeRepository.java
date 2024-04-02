package sn.douanes.repositoriesSupprimer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sn.douanes.entities.Vehicule;

@Repository
public interface DotationVehiculeVehiculeRepository extends JpaRepository<DotationVehiculeVehicule, DotationVehiculeVehiculeId> {

    DotationVehiculeVehicule findByNumeroSerie(Vehicule numeroSerie);
}
