package sn.douanes.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.entities.FonctionAgent;
import sn.douanes.repositories.FonctionAgentRepository;
import sn.douanes.services.FonctionAgentService;

import java.util.List;


@Service
public class FonctionAgentServiceImpl implements FonctionAgentService {

    @Autowired
    FonctionAgentRepository fonctionAgentRepository;

    @Override
    public FonctionAgent saveFonctionAgent(FonctionAgent f) {
        return fonctionAgentRepository.save(f);
    }

    @Override
    public FonctionAgent updateFonctionAgent(FonctionAgent f) {
        return fonctionAgentRepository.save(f);
    }


    @Override
    public void deleteFonctionAgentById(String id) {
        fonctionAgentRepository.deleteById(id);
    }

    @Override
    public FonctionAgent getFonctionAgentById(String id) {
        return fonctionAgentRepository.findById(id).isPresent() ? fonctionAgentRepository.findById(id).get() : null;
    }

    @Override
    public List<FonctionAgent> getAllFonctionAgents() {
        return fonctionAgentRepository.findAll();
    }


}
