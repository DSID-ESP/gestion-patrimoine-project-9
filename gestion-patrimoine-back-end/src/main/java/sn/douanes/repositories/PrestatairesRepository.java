package sn.douanes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import sn.douanes.entities.Prestataires;

import java.util.List;


@Repository
public interface PrestatairesRepository extends JpaRepository<Prestataires, String> {

    @Query("SELECT DISTINCT p FROM Prestataires p LEFT JOIN FETCH p.secteurActivite")
    List<Prestataires> findAllWithSecteursActivite();
}
