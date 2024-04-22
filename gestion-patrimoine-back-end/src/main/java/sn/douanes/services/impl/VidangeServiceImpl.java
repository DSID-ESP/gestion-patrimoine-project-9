package sn.douanes.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.entities.Huile;
import sn.douanes.entities.Vidange;
import sn.douanes.repositories.VidangeRepository;
import sn.douanes.services.VidangeService;

import java.util.List;

@Service
public class VidangeServiceImpl implements VidangeService {

    @Autowired
    VidangeRepository vidangeRepository;

    @Override
    public Vidange saveVidange(Vidange v) {
        return vidangeRepository.save(v);
    }

    @Override
    public Vidange updateVidange(Vidange v) {
        return vidangeRepository.save(v);
    }

    @Override
    public void deleteVidange(Vidange v) {
        vidangeRepository.delete(v);
    }

    @Override
    public void deleteVidangeById(String id) {
        vidangeRepository.deleteById(id);
    }

    @Override
    public Vidange getVidangeById(String id) {
        return vidangeRepository.findById(id).orElse(null);
    }

    @Override
    public List<Vidange> getAllVidanges() {
        return vidangeRepository.findAll();
    }

    @Override
    public Vidange ajouterVidange(
            String identifiantMaintenance,
            Huile identifiantHuile,
            int quantite
    ) {

        Vidange Vidange = new Vidange();

        Vidange.setIdentifiantMaintenance(identifiantMaintenance);
        Vidange.setIdentifiantHuile(identifiantHuile);
        Vidange.setQuantite(quantite);

        return vidangeRepository.save(Vidange);
    }

}
