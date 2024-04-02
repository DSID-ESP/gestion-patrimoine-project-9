package sn.douanes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sn.douanes.entities.BonEntree;

@Repository
public interface BonEntreeRepository extends JpaRepository<BonEntree, String> {

}
