package sn.douanes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import sn.douanes.entities.Agent;
import sn.douanes.entities.Utilisateur;
import org.springframework.stereotype.Repository;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Integer> {


    Utilisateur findByMatriculeAgent(Agent matriculeAgent);

    Utilisateur findByUserName(String userName);
    
}
