package sn.douanes.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.entities.Agent;
import sn.douanes.entities.Sections;
import sn.douanes.entities.UniteDouaniere;
import sn.douanes.repositories.AgentRepository;
import sn.douanes.services.AgentService;

import java.util.List;


@Service
public class AgentServiceImpl implements AgentService {

    @Autowired
    AgentRepository agentRepository;

    @Override
    public Agent saveAgent(Agent a) {
        return agentRepository.save(a);
    }

    @Override
    public Agent updateAgent(Agent a) {
        return agentRepository.save(a);
    }

    @Override
    public void deleteAgent(Agent a) {
        agentRepository.delete(a);
    }

    @Override
    public void deleteAgentById(String matriculeAgent) {
        agentRepository.deleteById(matriculeAgent);
    }

    @Override
    public Agent getAgentById(String matriculeAgent) {
        return agentRepository.findById(matriculeAgent).isPresent() ? agentRepository.findById(matriculeAgent).get() : null;
    }

    @Override
    public Agent getAgentByMatriculeAgent(String matriculeAgent) {
        return agentRepository.findByMatriculeAgent(matriculeAgent);
    }

    @Override
    public List<Agent> getAllAgents() {
        return agentRepository.findAll();
    }


    @Override
    public Agent ajouterAgent(
            String matriculeAgent,
            String codeAgent,
            String nomAgent,
            String prenomAgent,
            Integer numeroTelephoneAgent,
            String emailAgent,
            UniteDouaniere codeUniteDouaniere,
            Sections codeSection
    ) {

        Agent agent = new Agent();

        agent.setMatriculeAgent(matriculeAgent);
        agent.setCodeAgent(codeAgent);
        agent.setNomAgent(nomAgent);
        agent.setPrenomAgent(prenomAgent);
        agent.setNumeroTelephoneAgent(numeroTelephoneAgent);
        agent.setEmailAgent(emailAgent);
        agent.setCodeUniteDouaniere(codeUniteDouaniere);
        agent.setCodeSection(codeSection);

        return agentRepository.save(agent);
    }


}
