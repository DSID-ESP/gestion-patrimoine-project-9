package sn.douanes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sn.douanes.entities.FonctionAgent;


@Repository
public interface FonctionAgentRepository extends JpaRepository<FonctionAgent, String> {

}