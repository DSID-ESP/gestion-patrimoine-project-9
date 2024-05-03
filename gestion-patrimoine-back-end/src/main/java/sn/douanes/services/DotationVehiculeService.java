package sn.douanes.services;


import sn.douanes.entities.Agent;
import sn.douanes.entities.ArticleBonSortie;
import sn.douanes.entities.DotationVehicule;
import sn.douanes.entities.Vehicule;

import java.sql.Date;
import java.util.List;

public interface DotationVehiculeService {

    DotationVehicule saveDotationVehicule(DotationVehicule d);
    DotationVehicule updateDotationVehicule(DotationVehicule d);
    void deleteDotationVehicule(DotationVehicule d);
    void deleteDotationVehiculeById(String id);
    DotationVehicule getDotationVehiculeById(String id);
    DotationVehicule getDotationVehiculeByNumeroSerie(Vehicule numeroSerie);
    List<DotationVehicule> getAllDotationVehicules();

    DotationVehicule ajouterDotationVehicule(String identifiantDV, Vehicule numeroSerie, Date dateDotation, Agent matriculeAgent, ArticleBonSortie codeArticleBonSortie);




}
