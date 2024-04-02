package sn.douanes.services;


import sn.douanes.entities.Agent;
import sn.douanes.entities.BonPour;
import sn.douanes.entities.Sections;
import sn.douanes.entities.UniteDouaniere;

import java.sql.Date;
import java.util.List;

public interface BonPourService {

    BonPour saveBonPour(BonPour b);
    BonPour updateBonPour(BonPour b);
    void deleteBonPour(BonPour b);
    void deleteBonPourById(String id);
    BonPour getBonPourById(String id);
    List<BonPour> getAllBonPours();

    BonPour ajouterBonPour(String descriptionBonPour, String etatBonPour,Sections codeSection,UniteDouaniere codeUniteDouaniere, Integer numeroCourrielOrigine, Date dateCourrielOrigine, String objectCourrielOrigine,Agent matriculeAgent,Integer numeroArriveBLM, Integer numeroArriveDLF, Integer numeroArriveSection,Date dateArriveBLM, Date dateArriveDLF,Date dateArriveSection,String observationBLM, String observationDLF, String observationSection);


}
