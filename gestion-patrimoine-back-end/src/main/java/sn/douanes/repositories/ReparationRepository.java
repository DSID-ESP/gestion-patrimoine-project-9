package sn.douanes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sn.douanes.entities.Reparation;

@Repository
public interface ReparationRepository extends JpaRepository<Reparation, String> {

}
