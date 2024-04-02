package sn.douanes.services;


import sn.douanes.entities.Agent;
import sn.douanes.entities.Sections;
import sn.douanes.entities.UniteDouaniere;

import java.util.List;

public interface AgentService {

    Agent saveAgent(Agent a);
    Agent updateAgent(Agent a);
    void deleteAgent(Agent a);
    void deleteAgentById(String matriculeAgent);
    Agent getAgentById(String matriculeAgent);

    Agent getAgentByMatriculeAgent(String matriculeAgent);
    List<Agent> getAllAgents();

    Agent ajouterAgent(String matriculeAgent, String codeAgent, String nomAgent, String prenomAgent, Integer numeroTelephoneAgent, String emailAgent, UniteDouaniere codeUniteDouaniere, Sections codeSection);
}
