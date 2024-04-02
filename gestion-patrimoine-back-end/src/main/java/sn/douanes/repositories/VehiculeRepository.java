package sn.douanes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sn.douanes.entities.Vehicule;

@Repository
public interface VehiculeRepository extends JpaRepository<Vehicule, String> {

}
