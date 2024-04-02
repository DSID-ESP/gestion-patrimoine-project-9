package sn.douanes.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.entities.Controle;
import sn.douanes.entities.Vehicule;
import sn.douanes.entities.keys.ControleId;
import sn.douanes.repositories.ControleRepository;
import sn.douanes.services.ControleService;

import java.sql.Timestamp;
import java.util.List;


@Service
public class ControleServiceImpl implements ControleService {

    @Autowired
    ControleRepository controleRepository;

    @Override
    public Controle saveControle(Controle c) {
        return controleRepository.save(c);
    }

    @Override
    public Controle updateControle(Controle c) {
        return controleRepository.save(c);
    }

    @Override
    public void deleteControleById(String numeroSerie, Timestamp dateControle) {
        controleRepository.deleteById(new ControleId(numeroSerie, dateControle));
    }

    @Override
    public Controle getControle(String numeroSerie, Timestamp dateControle) {
        return controleRepository.findById(new ControleId(numeroSerie, dateControle)).get();
    }

    @Override
    public List<Controle> getAllControles() {
        return controleRepository.findAll();
    }



}
