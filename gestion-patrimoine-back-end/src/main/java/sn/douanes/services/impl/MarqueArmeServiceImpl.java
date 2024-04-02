package sn.douanes.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.entities.MarqueArme;
import sn.douanes.repositories.MarqueArmeRepository;
import sn.douanes.services.MarqueArmeService;

import java.util.List;


@Service
public class MarqueArmeServiceImpl implements MarqueArmeService {

    @Autowired
    MarqueArmeRepository marqueArmeRepository;

    @Override
    public MarqueArme saveMarqueArme(MarqueArme m) {
        return marqueArmeRepository.save(m);
    }

    @Override
    public MarqueArme updateMarqueArme(MarqueArme m) {
        return marqueArmeRepository.save(m);
    }

    @Override
    public void deleteMarqueArme(MarqueArme m) {
        marqueArmeRepository.delete(m);
    }

    @Override
    public void deleteMarqueArmeById(String id) {
        marqueArmeRepository.deleteById(id);
    }

    @Override
    public MarqueArme getMarqueArme(String id) {
        return marqueArmeRepository.findById(id).get();
    }

    @Override
    public List<MarqueArme> getAllMarqueArmes() {
        return marqueArmeRepository.findAll();
    }



}
