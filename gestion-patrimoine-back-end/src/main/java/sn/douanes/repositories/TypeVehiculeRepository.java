package sn.douanes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sn.douanes.entities.TypeVehicule;


@Repository
public interface TypeVehiculeRepository extends JpaRepository<TypeVehicule, String> {

}
