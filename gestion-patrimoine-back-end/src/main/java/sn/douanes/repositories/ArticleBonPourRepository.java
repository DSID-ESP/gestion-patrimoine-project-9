package sn.douanes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sn.douanes.entities.ArticleBonPour;
import sn.douanes.entities.keys.ArticleBonPourId;

@Repository
public interface ArticleBonPourRepository extends JpaRepository<ArticleBonPour, ArticleBonPourId> {

}
