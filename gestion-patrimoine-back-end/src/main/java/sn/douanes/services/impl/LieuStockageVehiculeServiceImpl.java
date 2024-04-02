package sn.douanes.services.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.entities.LieuStockageVehicule;
import sn.douanes.repositories.LieuStockageVehiculeRepository;
import sn.douanes.services.LieuStockageVehiculeService;

import java.util.List;


@Service
public class LieuStockageVehiculeServiceImpl implements LieuStockageVehiculeService {

    @Autowired
    LieuStockageVehiculeRepository lieuStockageVehiculeRepository;

    @Override
    public LieuStockageVehicule saveLieuStockageVehicule(LieuStockageVehicule l) {
        return lieuStockageVehiculeRepository.save(l);
    }

    @Override
    public LieuStockageVehicule updateLieuStockageVehicule(LieuStockageVehicule l) {
        return lieuStockageVehiculeRepository.save(l);
    }

    @Override
    public void deleteLieuStockageVehicule(LieuStockageVehicule l) {
        lieuStockageVehiculeRepository.delete(l);
    }

    @Override
    public void deleteLieuStockageVehiculeById(String id) {
        lieuStockageVehiculeRepository.deleteById(id);
    }

    @Override
    public LieuStockageVehicule getLieuStockageVehiculeById(String id) {
        return lieuStockageVehiculeRepository.findById(id).isPresent() ? lieuStockageVehiculeRepository.findById(id).get() : null;
    }

    @Override
    public List<LieuStockageVehicule> getAllLieuStockageVehicules() {
        return lieuStockageVehiculeRepository.findAll();
    }


//    @Override
//    public LieuStockageVehicule ajouterLieuStockageVehicule(
//            String codeLieuVH,
//            String libellleLieuVH,
//            Integer nombreLimiteStockageVH
//    ) {
//
//        LieuStockageVehicule lieuStockageVehicule = new LieuStockageVehicule();
//
//        lieuStockageVehicule.setCodeLieuVH(codeLieuVH);
//        lieuStockageVehicule.setLibellleLieuVH(libellleLieuVH);
//        lieuStockageVehicule.setNombreLimiteStockageVH(nombreLimiteStockageVH);
//
//
//        return lieuStockageVehiculeRepository.save(lieuStockageVehicule);
//    }

}

