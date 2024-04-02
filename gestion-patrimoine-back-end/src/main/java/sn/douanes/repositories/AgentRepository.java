package sn.douanes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sn.douanes.entities.Agent;

@Repository
public interface AgentRepository extends JpaRepository<Agent, String> {
    Agent findByMatriculeAgent(String matriculeAgent);
    Agent findByEmailAgent(String emailAgent);
}
