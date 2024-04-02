package sn.douanes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sn.douanes.entities.ArticleBonEntree;
import sn.douanes.entities.keys.ArticleBonEntreeId;


@Repository
public interface ArticleBonEntreeRepository extends JpaRepository<ArticleBonEntree, ArticleBonEntreeId> {

}
