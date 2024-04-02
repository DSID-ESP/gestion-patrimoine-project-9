package sn.douanes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sn.douanes.entities.MarqueVehicule;

@Repository
public interface MarqueVehiculeRepository extends JpaRepository<MarqueVehicule, String> {

}
