package sn.douanes.services;

import sn.douanes.entities.FonctionAgent;

import java.util.List;

public interface FonctionAgentService {

    FonctionAgent saveFonctionAgent(FonctionAgent f);
    FonctionAgent updateFonctionAgent(FonctionAgent f);

    void deleteFonctionAgentById(String id);
    FonctionAgent getFonctionAgentById(String id);
    List<FonctionAgent> getAllFonctionAgents();


}
