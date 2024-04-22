package sn.douanes.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.entities.*;
import sn.douanes.repositories.ReparationRepository;
import sn.douanes.services.ReparationService;

import java.util.List;

@Service
public class ReparationServiceImpl implements ReparationService {

    @Autowired
    ReparationRepository reparationRepository;

    @Override
    public Reparation saveReparation(Reparation r) {
        return reparationRepository.save(r);
    }

    @Override
    public Reparation updateReparation(Reparation r) {
        return reparationRepository.save(r);
    }

    @Override
    public void deleteReparation(Reparation r) {
        reparationRepository.delete(r);
    }

    @Override
    public void deleteReparationById(String identifiantMaintenance) {
        reparationRepository.deleteById(identifiantMaintenance);
    }

    @Override
    public Reparation getReparationById(String identifiantMaintenance) {
        return reparationRepository.findById(identifiantMaintenance).orElse(null);
    }

    @Override
    public List<Reparation> getAllReparations() {
        return reparationRepository.findAll();
    }

    @Override
    public Reparation ajouterReparation(
            String identifiantMaintenance,
            String natureReparation
    ) {

        Reparation reparation = new Reparation();

        reparation.setIdentifiantMaintenance(identifiantMaintenance);
        reparation.setNatureReparation(natureReparation);

        return reparationRepository.save(reparation);
    }



}
