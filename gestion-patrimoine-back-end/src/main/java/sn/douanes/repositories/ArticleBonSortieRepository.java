package sn.douanes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sn.douanes.entities.ArticleBonSortie;
import sn.douanes.entities.keys.ArticleBonSortieId;

@Repository
public interface ArticleBonSortieRepository extends JpaRepository<ArticleBonSortie, ArticleBonSortieId> {

}
