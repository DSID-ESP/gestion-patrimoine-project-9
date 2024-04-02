package sn.douanes.services;


import sn.douanes.entities.*;

import java.sql.Date;
import java.util.List;

public interface VehiculeService {

    Vehicule saveVehicule(Vehicule v);
    Vehicule updateVehicule(Vehicule v);
    void deleteVehicule(Vehicule v);
    void deleteVehiculeById(String id);
    Vehicule getVehiculeById(String id);
    List<Vehicule> getAllVehicules();


    Vehicule ajouterVehicule(String numeroSerie, String numeroImmatriculation, ArticleBonEntree codeArticleBonEntree, MarqueVehicule codeMarque, TypeEnergie codeTypeEnergie, String numeroCarteGrise, TypeVehicule codeTypeVehicule, String modele, Pays codePays, Date dateMiseEnCirculation);


}
