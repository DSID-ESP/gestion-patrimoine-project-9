package sn.douanes.services;

import sn.douanes.entities.MarqueVehicule;

import java.util.List;

public interface MarqueVehiculeService {

    MarqueVehicule saveMarqueVehicule(MarqueVehicule m);
    MarqueVehicule updateMarqueVehicule(MarqueVehicule m);
    void deleteMarqueVehicule(MarqueVehicule m);
    void deleteMarqueVehiculeById(String id);
    MarqueVehicule getMarqueVehiculeById(String id);
    List<MarqueVehicule> getAllMarqueVehicules();


}
