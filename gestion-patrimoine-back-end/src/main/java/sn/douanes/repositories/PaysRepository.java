package sn.douanes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sn.douanes.entities.Pays;


@Repository
public interface PaysRepository extends JpaRepository<Pays, String> {

}
