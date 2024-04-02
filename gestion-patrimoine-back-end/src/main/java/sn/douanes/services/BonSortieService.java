package sn.douanes.services;


import sn.douanes.entities.Agent;
import sn.douanes.entities.BonPour;
import sn.douanes.entities.BonSortie;

import java.sql.Date;
import java.util.List;

public interface BonSortieService {

    BonSortie saveBonSortie(BonSortie b);
    BonSortie updateBonSortie(BonSortie b);
    void deleteBonSortie(BonSortie b);
    void deleteBonSortieById(String id);
    BonSortie getBonSortieById(String id);
    List<BonSortie> getAllBonSorties();

    BonSortie ajouterBonSortie(String numeroBonSortie, String descriptionBonSortie, Date dateBonSortie, Agent matriculeAgent, BonPour identifiantBonPour);


}
