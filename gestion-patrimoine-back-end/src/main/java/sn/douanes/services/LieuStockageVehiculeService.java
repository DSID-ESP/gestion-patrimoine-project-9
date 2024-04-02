package sn.douanes.services;


import sn.douanes.entities.LieuStockageVehicule;

import java.util.List;

public interface LieuStockageVehiculeService {

    LieuStockageVehicule saveLieuStockageVehicule(LieuStockageVehicule l);
    LieuStockageVehicule updateLieuStockageVehicule(LieuStockageVehicule l);
    void deleteLieuStockageVehicule(LieuStockageVehicule l);
    void deleteLieuStockageVehiculeById(String id);
    LieuStockageVehicule getLieuStockageVehiculeById(String id);
    List<LieuStockageVehicule> getAllLieuStockageVehicules();


}
