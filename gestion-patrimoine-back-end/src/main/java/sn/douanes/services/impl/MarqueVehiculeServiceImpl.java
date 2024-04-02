package sn.douanes.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.entities.MarqueVehicule;
import sn.douanes.repositories.MarqueVehiculeRepository;
import sn.douanes.services.MarqueVehiculeService;

import java.util.List;


@Service
public class MarqueVehiculeServiceImpl implements MarqueVehiculeService {

    @Autowired
    MarqueVehiculeRepository marqueVehiculeRepository;

    @Override
    public MarqueVehicule saveMarqueVehicule(MarqueVehicule t) {
        return marqueVehiculeRepository.save(t);
    }

    @Override
    public MarqueVehicule updateMarqueVehicule(MarqueVehicule t) {
        return marqueVehiculeRepository.save(t);
    }

    @Override
    public void deleteMarqueVehicule(MarqueVehicule t) {
        marqueVehiculeRepository.delete(t);
    }

    @Override
    public void deleteMarqueVehiculeById(String id) {
        marqueVehiculeRepository.deleteById(id);
    }

    @Override
    public MarqueVehicule getMarqueVehiculeById(String id) {
        return marqueVehiculeRepository.findById(id).isPresent() ? marqueVehiculeRepository.findById(id).get() : null;
    }

    @Override
    public List<MarqueVehicule> getAllMarqueVehicules() {
        return marqueVehiculeRepository.findAll();
    }


//    @Override
//    public MarqueVehicule ajouterMarqueVehicule(
//            String codeMarque,
//            String libelleMarque
//    ) {
//
//        MarqueVehicule marqueVehicule = new MarqueVehicule();
//
//        marqueVehicule.setCodeMarque(codeMarque);
//        marqueVehicule.setLibelleMarque(libelleMarque);
//
//        return marqueVehiculeRepository.save(marqueVehicule);
//    }


}
