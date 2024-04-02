package sn.douanes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sn.douanes.entities.UniteDouaniere;


@Repository
public interface UniteDouaniereRepository extends JpaRepository<UniteDouaniere, String> {

}
