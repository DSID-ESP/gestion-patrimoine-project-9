package sn.douanes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sn.douanes.entities.DotationVehicule;

@Repository
public interface DotationVehiculeRepository extends JpaRepository<DotationVehicule, String> {

}
