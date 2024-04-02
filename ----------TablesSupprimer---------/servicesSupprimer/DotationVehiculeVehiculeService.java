package sn.douanes.servicesSupprimer;


import sn.douanes.entities.DotationVehicule;
import sn.douanes.entities.Vehicule;

import java.util.List;

public interface DotationVehiculeVehiculeService {

    DotationVehiculeVehicule saveDotationVehiculeVehicule(DotationVehiculeVehicule d);
    DotationVehiculeVehicule updateDotationVehiculeVehicule(DotationVehiculeVehicule d);
    void deleteDotationVehiculeVehicule(DotationVehiculeVehicule d);
    void deleteDotationVehiculeVehiculeById(Vehicule numeroSerie, DotationVehicule identifiantDV);
    DotationVehiculeVehicule getDotationVehiculeVehiculeById(Vehicule numeroSerie, DotationVehicule identifiantDV);
    List<DotationVehiculeVehicule> getAllDotationVehiculeVehicule();

    DotationVehiculeVehicule getDotationVehiculeVehiculeById(Vehicule numeroSerie);


    DotationVehiculeVehicule ajouterDotationVehiculeVehicule(Vehicule numeroSerie, DotationVehicule identifiantDV);
}
