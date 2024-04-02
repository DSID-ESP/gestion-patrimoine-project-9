package sn.douanes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sn.douanes.entities.Accident;

@Repository
public interface AccidentRepository extends JpaRepository<Accident, String> {


}
