package sn.douanes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sn.douanes.entities.Fonctions;


@Repository
public interface FonctionsRepository extends JpaRepository<Fonctions, String> {

}