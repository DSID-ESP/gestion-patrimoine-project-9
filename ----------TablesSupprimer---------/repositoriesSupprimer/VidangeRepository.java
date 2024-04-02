package sn.douanes.repositoriesSupprimer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sn.douanes.EntitiesSupprimer.Vidange;


@Repository
public interface VidangeRepository extends JpaRepository<Vidange, String> {
}
