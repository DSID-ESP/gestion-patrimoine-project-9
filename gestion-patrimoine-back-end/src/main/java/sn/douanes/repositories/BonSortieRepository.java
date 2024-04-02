package sn.douanes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sn.douanes.entities.BonSortie;


@Repository
public interface BonSortieRepository extends JpaRepository<BonSortie, String> {

}
